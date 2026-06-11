import type { DocumentStats as DocumentStatsData } from '../utils/document-utils';

type StatsProps = {
  stats: DocumentStatsData;
};

export function Stats({ stats }: StatsProps) {
  return (
    <section className="stats" aria-label="Indicadores">
      <div>
        <strong>{stats.total}</strong>
        <span>Total</span>
      </div>
      <div>
        <strong>{stats.pending}</strong>
        <span>Pendentes</span>
      </div>
      <div>
        <strong>{stats.reviewing}</strong>
        <span>Em análise</span>
      </div>
      <div>
        <strong>{stats.rejected}</strong>
        <span>Rejeitados</span>
      </div>
    </section>
  );
}
