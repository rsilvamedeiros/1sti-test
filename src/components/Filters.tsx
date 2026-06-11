import { statusFilters, type StatusFilter } from '../utils/document-utils';

type FiltersProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: string) => void;
};

export function Filters({ query, status, onQueryChange, onStatusChange }: FiltersProps) {
  return (
    <section className="toolbar">
      <input
        placeholder="Buscar por título, cliente ou categoria"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <select value={status} onChange={(event) => onStatusChange(event.target.value)}>
        {statusFilters.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}
