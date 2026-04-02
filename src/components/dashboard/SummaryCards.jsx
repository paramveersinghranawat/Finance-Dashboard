import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react';

export function SummaryCards({ summary }) {
  const formatCur = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(val);

  const cards = [
    {
      title: 'Total Balance',
      value: formatCur(summary.balance),
      icon: Wallet,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    },
    {
      title: 'Total Income',
      value: formatCur(summary.income),
      icon: ArrowUpRight,
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
      title: 'Total Expenses',
      value: formatCur(summary.expenses),
      icon: ArrowDownRight,
      color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400',
    },
    {
      title: 'Savings Rate',
      value: `${summary.savingsRate}%`,
      icon: PiggyBank,
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${card.color} transition-colors`}>
              <card.icon size={24} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{card.title}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 truncate">{card.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
