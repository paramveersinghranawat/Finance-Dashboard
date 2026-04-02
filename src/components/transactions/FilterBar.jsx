import { Search, FilterX, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';

export function FilterBar({ onAddClick }) {
  const { state, dispatch } = useApp();
  const f = state.filters;

  const handleChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: { [e.target.name]: e.target.value } });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl mb-6 space-y-4 shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            name="search"
            value={f.search}
            onChange={handleChange}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:text-white transition-colors"
          />
        </div>
        {state.role === 'admin' && (
          <button
            onClick={onAddClick}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full sm:w-auto justify-center shadow-sm"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          name="type"
          value={f.type}
          onChange={handleChange}
          className="flex-1 sm:flex-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          name="category"
          value={f.category}
          onChange={handleChange}
          className="flex-1 sm:flex-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          name="sortBy"
          value={f.sortBy}
          onChange={handleChange}
          className="flex-1 sm:flex-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors cursor-pointer"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>

        <button
          onClick={() => dispatch({ type: 'SET_FILTER', payload: { sortDir: f.sortDir === 'asc' ? 'desc' : 'asc' } })}
          className="flex-1 sm:flex-none bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {f.sortDir === 'asc' ? '↑ Asc Order' : '↓ Desc Order'}
        </button>

        {(f.search || f.type !== 'all' || f.category !== 'all') && (
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm font-medium sm:ml-auto w-full sm:w-auto py-2 sm:py-0 transition-colors"
          >
            <FilterX size={14} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
