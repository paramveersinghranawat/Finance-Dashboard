import { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY_TRANSACTIONS = 'fd_transactions';
const STORAGE_KEY_ROLE = 'fd_role';
const STORAGE_KEY_DARK = 'fd_theme_dark_v2';

function loadFromStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

const initialState = {
  transactions: loadFromStorage(STORAGE_KEY_TRANSACTIONS, INITIAL_TRANSACTIONS),
  role: loadFromStorage(STORAGE_KEY_ROLE, 'viewer'),
  // Light is default, loads dark if previously saved
  darkMode: loadFromStorage(STORAGE_KEY_DARK, false), 
  filters: {
    search: '',
    type: 'all',      
    category: 'all',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date',   
    sortDir: 'desc',  
  },
  activePage: 'dashboard',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };

    case 'TOGGLE_DARK':
      return { ...state, darkMode: !state.darkMode };

    case 'SET_PAGE':
      return { ...state, activePage: action.payload };

    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };

    case 'ADD_TRANSACTION': {
      const newTx = {
        ...action.payload,
        id: Date.now(),
      };
      return { ...state, transactions: [newTx, ...state.transactions] };
    }

    case 'EDIT_TRANSACTION': {
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    }

    case 'DELETE_TRANSACTION': {
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persistence Effects
  useEffect(() => localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(state.transactions)), [state.transactions]);
  useEffect(() => localStorage.setItem(STORAGE_KEY_ROLE, JSON.stringify(state.role)), [state.role]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_DARK, JSON.stringify(state.darkMode));
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

// ─── Selectors ──────────────────────────────────────────────────────
export function getFilteredTransactions(transactions, filters) {
  let result = [...transactions];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || String(t.amount).includes(q));
  }
  if (filters.type !== 'all') result = result.filter(t => t.type === filters.type);
  if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);
  result.sort((a, b) => {
    const dir = filters.sortDir === 'asc' ? 1 : -1;
    if (filters.sortBy === 'amount') return dir * (a.amount - b.amount);
    return dir * (a.date > b.date ? 1 : -1);
  });
  return result;
}

export function getSummary(transactions) {
  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;
  const savingsRate = income > 0 ? Math.round(((income - expenses) / income) * 100) : 0;
  return { income, expenses, balance, savingsRate };
}

export function getMonthlyData(transactions) {
  const monthMap = {};
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!monthMap[month]) monthMap[month] = { month, income: 0, expenses: 0 };
    if (t.type === 'income') monthMap[month].income += t.amount;
    else monthMap[month].expenses += t.amount;
  });
  return Object.values(monthMap)
    .sort((a, b) => (a.month > b.month ? 1 : -1))
    .map(d => ({
      ...d,
      balance: d.income - d.expenses,
      label: new Date(d.month + '-01').toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
    }));
}

export function getCategoryBreakdown(transactions) {
  const map = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => map[t.category] = (map[t.category] || 0) + t.amount);
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}
