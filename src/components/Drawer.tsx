import type { CustomerDocument } from '../types';
import { formatDate, statusLabels } from '../utils/document-utils';

type DrawerProps = {
  document: CustomerDocument;
  onClose: () => void;
};

export function Drawer({ document, onClose }: DrawerProps) {
  return (
    <aside className="drawer">
      <button className="close" onClick={onClose}>
        ×
      </button>
      <h2>{document.title}</h2>
      <p>
        <strong>Cliente:</strong> {document.customerName}
      </p>
      <p>
        <strong>Status:</strong> {statusLabels[document.status]}
      </p>
      <p>
        <strong>Categoria:</strong> {document.category}
      </p>
      <p>
        <strong>Criado em:</strong> {formatDate(document.createdAt)}
      </p>
    </aside>
  );
}
