import type { CustomerDocument, DocumentStatus } from '../types';
import { formatDate } from '../utils/document-utils';
import { StatusBadge } from './StatusBadge';

type TableProps = {
  documents: CustomerDocument[];
  isUpdatingStatus: boolean;
  onDocumentSelect: (document: CustomerDocument) => void;
  onStatusChange: (id: string, status: DocumentStatus) => void;
};

export function Table({ documents, isUpdatingStatus, onDocumentSelect, onStatusChange }: TableProps) {
  return (
    <section className="table-card">
      <table>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Cliente</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Confiança IA</th>
            <th>Criado em</th>
            <th>Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr key={document.id} onClick={() => onDocumentSelect(document)}>
              <td>
                <strong>{document.title}</strong>
                <small>{document.id}</small>
              </td>
              <td>
                {document.customerName}
                <small>{document.customerEmail || 'Sem e-mail cadastrado'}</small>
              </td>
              <td>{document.category}</td>
              <td>
                <StatusBadge status={document.status} />
              </td>
              <td>{Math.round((document.confidence || 0) * 100)}%</td>
              <td>{formatDate(document.createdAt)}</td>
              <td>{document.assignedTo || 'Não atribuído'}</td>
              <td>
                <button
                  disabled={isUpdatingStatus}
                  onClick={(event) => {
                    event.stopPropagation();
                    onStatusChange(document.id, 'approved');
                  }}
                >
                  Aprovar
                </button>
                <button
                  disabled={isUpdatingStatus}
                  onClick={(event) => {
                    event.stopPropagation();
                    onStatusChange(document.id, 'rejected');
                  }}
                >
                  Rejeitar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
