import type { CustomerDocument, DocumentStatus } from '../types';
import { formatDate } from '../utils/document-utils';
import { StatusBadge } from './StatusBadge';

type TableProps = {
  documents: CustomerDocument[];
  isUpdatingStatus: boolean;
  onDocumentSelect: (document: CustomerDocument) => void;
  onStatusChange: (id: string, status: DocumentStatus) => void;
};

const headerClass = 'border-b border-slate-200 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500';
const cellClass = 'border-b border-slate-200 px-4 py-3 align-top text-sm text-slate-700';
const actionButtonClass =
  'rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50';

export function Table({ documents, isUpdatingStatus, onDocumentSelect, onStatusChange }: TableProps) {
  return (
    <section className="overflow-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={headerClass}>Documento</th>
            <th className={headerClass}>Cliente</th>
            <th className={headerClass}>Categoria</th>
            <th className={headerClass}>Status</th>
            <th className={headerClass}>Confiança IA</th>
            <th className={headerClass}>Criado em</th>
            <th className={headerClass}>Responsável</th>
            <th className={headerClass}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr
              key={document.id}
              className="cursor-pointer transition hover:bg-slate-50"
              onClick={() => onDocumentSelect(document)}
            >
              <td className={cellClass}>
                <strong className="block font-semibold text-slate-900">{document.title}</strong>
                <small className="mt-1 block text-slate-500">{document.id}</small>
              </td>
              <td className={cellClass}>
                {document.customerName}
                <small className="mt-1 block text-slate-500">{document.customerEmail || 'Sem e-mail cadastrado'}</small>
              </td>
              <td className={cellClass}>{document.category}</td>
              <td className={cellClass}>
                <StatusBadge status={document.status} />
              </td>
              <td className={cellClass}>{Math.round((document.confidence || 0) * 100)}%</td>
              <td className={cellClass}>{formatDate(document.createdAt)}</td>
              <td className={cellClass}>{document.assignedTo || 'Não atribuído'}</td>
              <td className={cellClass}>
                <div className="flex gap-2">
                  <button
                    className={actionButtonClass}
                    disabled={isUpdatingStatus}
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange(document.id, 'approved');
                    }}
                  >
                    Aprovar
                  </button>
                  <button
                    className={actionButtonClass}
                    disabled={isUpdatingStatus}
                    onClick={(event) => {
                      event.stopPropagation();
                      onStatusChange(document.id, 'rejected');
                    }}
                  >
                    Rejeitar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
