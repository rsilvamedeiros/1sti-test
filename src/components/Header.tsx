type HeaderProps = {
  isRefreshing: boolean;
  onRefresh: () => void;
};

export function Header({ isRefreshing, onRefresh }: HeaderProps) {
  return (
    <section className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Operação interna</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Documentos de clientes</h1>
        <p className="mt-3 max-w-2xl text-slate-500">
          Revise documentos classificados automaticamente e acompanhe pendências da operação.
        </p>
      </div>
      <button
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isRefreshing}
        onClick={onRefresh}
      >
        {isRefreshing ? 'Atualizando...' : 'Recarregar'}
      </button>
    </section>
  );
}
