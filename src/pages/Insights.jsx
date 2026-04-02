import { useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useApp, getMonthlyData, getCategoryBreakdown } from '../context/AppContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function Insights() {
  const { state } = useApp();

  const insights = useMemo(() => {
    const tx = state.transactions;
    if (tx.length === 0) return null;

    const breakdown = getCategoryBreakdown(tx);
    const topCategory = breakdown.length > 0 ? breakdown[0] : null;
    
    // Calculate total expenses for percentage
    const totalExpenses = breakdown.reduce((sum, item) => sum + item.value, 0);

    const monthly = getMonthlyData(tx);
    let momChange = 0;
    
    if (monthly.length >= 2) {
      const curr = monthly[monthly.length - 1].expenses;
      const prev = monthly[monthly.length - 2].expenses;
      momChange = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
    }

    return { topCategory, totalExpenses, monthly, momChange };
  }, [state.transactions]);

  if (!insights) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-slate-500 dark:text-slate-400">
        <p>Not enough data to generate insights.</p>
      </div>
    );
  }

  const { topCategory, totalExpenses, monthly, momChange } = insights;
  const isSpendingUp = momChange > 0;

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">Insights</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Deep dive into your spending patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Top Spending Card */}
        {topCategory && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm transition-colors">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500 rounded-lg flex items-center justify-center mb-4 transition-colors">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Highest Spending Category</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2 truncate">
              {topCategory.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              You spent <span className="font-semibold text-slate-900 dark:text-slate-200">₹{topCategory.value.toLocaleString()}</span> on this, which is <span className="font-semibold text-slate-900 dark:text-slate-200">{Math.round((topCategory.value / totalExpenses) * 100)}%</span> of your total expenses.
            </p>
          </div>
        )}

        {/* MoM Change Card */}
        {monthly.length >= 2 && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm transition-colors">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
              isSpendingUp 
                ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-500' 
                : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500'
            }`}>
              {isSpendingUp ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Month over Month Spending</h3>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
              {isSpendingUp ? '+' : ''}{momChange.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Your expenses are {isSpendingUp ? 'up' : 'down'} compared to last month.
              {isSpendingUp ? ' Consider reviewing subscriptions.' : ' Great job saving!'}
            </p>
          </div>
        )}

      </div>

      {/* Income vs Expense Bar Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm transition-colors overflow-hidden">
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-6 transition-colors">Income vs Expenses</h3>
        <div className="h-[300px] sm:h-[350px] w-full -ml-4 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.4} />
              <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={val => `₹${val/1000}k`} />
              <RechartsTooltip 
                cursor={{ fill: 'rgba(51, 65, 85, 0.05)' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#fff', color: '#0f172a' }}
                itemStyle={{ color: '#0f172a' }}
                formatter={(value) => [`₹${value.toLocaleString()}`]}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '13px', color: '#64748b' }} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
