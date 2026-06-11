import type { DocumentStats as DocumentStatsData } from '../types';

type StatsProps = {
  stats: DocumentStatsData;
};

const statItems = [
  { key: 'total', label: 'Total' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'reviewing', label: 'Em análise' },
  { key: 'rejected', label: 'Rejeitados' }
] as const;

export function Stats({ stats }: StatsProps) {
  return (
    <section className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Indicadores">
      {statItems.map((item) => (
        <div key={item.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <strong className="block text-3xl font-bold text-slate-900">{stats[item.key]}</strong>
          <span className="text-sm text-slate-500">{item.label}</span>
        </div>
      ))}
    </section>
  );
}
