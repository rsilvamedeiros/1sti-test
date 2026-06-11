import { memo } from 'react';
import type { CustomerDocument } from '../types';
import { formatDate, statusLabels } from '../utils/document-utils';

type DrawerProps = {
  document: CustomerDocument;
  onClose: () => void;
};

export const Drawer = memo(function Drawer({ document, onClose }: DrawerProps) {
  return (
    <aside
      aria-label="Detalhes do documento"
      className="fixed right-6 top-6 w-[340px] max-w-[calc(100vw-48px)] rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
    >
      <button
        aria-label="Fechar detalhes"
        className="float-right flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-slate-700"
        onClick={onClose}
      >
        ×
      </button>
      <h2 className="mb-4 pr-10 text-xl font-bold text-slate-900">{document.title}</h2>
      <p className="mb-2 text-sm text-slate-700">
        <strong className="text-slate-900">Cliente:</strong> {document.customerName}
      </p>
      <p className="mb-2 text-sm text-slate-700">
        <strong className="text-slate-900">Status:</strong> {statusLabels[document.status]}
      </p>
      <p className="mb-2 text-sm text-slate-700">
        <strong className="text-slate-900">Categoria:</strong> {document.category}
      </p>
      <p className="text-sm text-slate-700">
        <strong className="text-slate-900">Criado em:</strong> {formatDate(document.createdAt)}
      </p>
    </aside>
  );
});
