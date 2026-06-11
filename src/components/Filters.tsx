import { memo } from 'react';
import type { StatusFilter } from '../types';
import { statusFilters } from '../utils/document-utils';

type FiltersProps = {
  query: string;
  status: StatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: string) => void;
};

export const Filters = memo(function Filters({ query, status, onQueryChange, onStatusChange }: FiltersProps) {
  return (
    <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row">
      <label className="sr-only" htmlFor="document-search">
        Buscar documentos
      </label>
      <input
        id="document-search"
        className="min-h-11 flex-1 rounded-lg border border-slate-300 px-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        placeholder="Buscar por título, cliente ou categoria"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />

      <label className="sr-only" htmlFor="document-status">
        Filtrar por status
      </label>
      <select
        id="document-status"
        className="min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        {statusFilters.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
});
