type HeaderProps = {
  onRefresh: () => void;
};

export function Header({ onRefresh }: HeaderProps) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Operação interna</p>
        <h1>Documentos de clientes</h1>
        <p className="subtitle">
          Revise documentos classificados automaticamente e acompanhe pendências da operação.
        </p>
      </div>
      <button onClick={onRefresh}>Recarregar</button>
    </section>
  );
}
