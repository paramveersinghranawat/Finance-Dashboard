import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  const { state, dispatch } = useApp();
  
  const pageTitles = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    insights: 'Insights',
  };

  return (
    <header className="h-14 flex items-center justify-between px-4 lg:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base font-semibold text-slate-900 dark:text-white">
          {pageTitles[state.activePage]}
        </h1>
      </div>

      {/* Responsive Role switcher toggle */}
      <button
        onClick={() => dispatch({ type: 'SET_ROLE', payload: state.role === 'admin' ? 'viewer' : 'admin' })}
        className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-lg border text-xs sm:text-sm font-medium transition-colors
          ${state.role === 'admin' 
            ? 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-900/40 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60' 
            : 'border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${state.role === 'admin' ? 'bg-indigo-500' : 'bg-slate-400'}`} />
        Role: {state.role === 'admin' ? 'Admin' : 'Viewer'}
      </button>
    </header>
  );
}
