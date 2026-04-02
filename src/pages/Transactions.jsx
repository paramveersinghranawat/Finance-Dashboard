import { useState } from 'react';
import { useApp, getFilteredTransactions } from '../context/AppContext';
import { FilterBar } from '../components/transactions/FilterBar';
import { TransactionList } from '../components/transactions/TransactionList';
import { AddEditModal } from '../components/transactions/AddEditModal';
import { Download } from 'lucide-react';

export default function Transactions() {
  const { state } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [txToEdit, setTxToEdit] = useState(null);

  const filtered = getFilteredTransactions(state.transactions, state.filters);

  const handleEdit = (tx) => {
    setTxToEdit(tx);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setTxToEdit(null);
    setIsModalOpen(true);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount (INR)'];
    const rows = filtered.map(t => [
      t.date,
      `"${t.description}"`,
      t.category,
      t.type,
      t.amount
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">Transactions</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Manage and track your full financial history.</p>
        </div>
        
        <button
          onClick={exportCSV}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <FilterBar onAddClick={handleOpenAdd} />
      
      <TransactionList transactions={filtered} onEdit={handleEdit} />

      <AddEditModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        txToEdit={txToEdit} 
      />
    </div>
  );
}
