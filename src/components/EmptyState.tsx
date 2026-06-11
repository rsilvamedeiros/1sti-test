type EmptyStateProps = {
  hasActiveFilters: boolean;
};

export function EmptyState({ hasActiveFilters }: EmptyStateProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Nenhum documento encontrado</h2>
      <p className="mt-2 text-sm text-slate-500">
        {hasActiveFilters
          ? 'Tente ajustar a busca ou selecionar outro status.'
          : 'Ainda não existem documentos disponíveis para revisão.'}
      </p>
    </section>
  );
}
