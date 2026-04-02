import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Receipt,
  Lightbulb,
  TrendingUp,
  Moon,
  Sun,
  X,
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: Receipt },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { state, dispatch } = useApp();

  const navigate = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-20 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-30 w-64 flex flex-col
          bg-white dark:bg-slate-900
          border-r border-slate-200 dark:border-slate-800
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
          lg:translate-x-0 lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
              <TrendingUp size={16} className="text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white tracking-tight">
              Fintrack
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = state.activePage === id;
            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-all duration-200 text-left
                  ${active
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                  }
                `}
              >
                <Icon size={18} className={active ? 'text-indigo-600 dark:text-indigo-400' : 'opacity-70'} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Dark mode toggle */}
        <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_DARK' })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              text-slate-600 dark:text-slate-400
              hover:bg-slate-50 dark:hover:bg-slate-800/80
              hover:text-slate-900 dark:hover:text-slate-100
              transition-all duration-200"
          >
            {state.darkMode ? <Sun size={18} className="text-amber-500" /> : <Moon size={18} />}
            {state.darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>
    </>
  );
}
