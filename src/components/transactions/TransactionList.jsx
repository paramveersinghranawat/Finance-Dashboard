import { Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function TransactionRow({ tx, onEdit }) {
  const { state, dispatch } = useApp();
  const isIncome = tx.type === 'income';

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id });
    }
  };

  const formattedDate = new Date(tx.date).toLocaleDateString('en-IN', {
    dateStyle: 'medium'
  });

  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumSignificantDigits: 3
  }).format(tx.amount);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors px-4 rounded-lg -mx-2 sm:-mx-4 gap-3 sm:gap-0 group">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
          isIncome ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'
        }`}>
          <div className={`w-3 h-3 rounded-full ${
            isIncome ? 'bg-emerald-500' : 'bg-rose-500'
          }`} />
        </div>

        <div className="min-w-0">
          <p className="font-medium text-slate-900 dark:text-white mb-0.5 truncate">{tx.description}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="shrink-0">{formattedDate}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
            <span className="truncate">{tx.category}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 pl-14 sm:pl-0">
        <span className={`font-semibold ${
          isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
        }`}>
          {isIncome ? '+' : '-'}{formattedAmount}
        </span>

        {state.role === 'admin' && (
          <div className="flex items-center gap-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(tx)}
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-400 rounded-md transition-colors"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/50 dark:hover:text-rose-400 rounded-md transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function TransactionList({ transactions, onEdit }) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center mt-4 transition-colors">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
          <span className="text-slate-400 text-2xl cursor-default select-none">∅</span>
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">No transactions found</h3>
        <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-6 mt-4 shadow-sm transition-colors overflow-hidden">
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {transactions.map(tx => (
          <TransactionRow key={tx.id} tx={tx} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
