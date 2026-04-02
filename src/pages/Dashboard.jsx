import { useApp, getSummary } from '../context/AppContext';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { BalanceTrend, SpendingBreakdown } from '../components/dashboard/Charts';

export default function Dashboard() {
  const { state } = useApp();
  const summary = getSummary(state.transactions);

  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 transition-colors">Your financial summary at a glance.</p>
      </div>

      <SummaryCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BalanceTrend transactions={state.transactions} />
        </div>
        <div className="lg:col-span-1">
          <SpendingBreakdown transactions={state.transactions} />
        </div>
      </div>
    </div>
  );
}
