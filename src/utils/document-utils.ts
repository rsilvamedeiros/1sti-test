import type { CustomerDocument, DocumentStatus } from '../types';

export type StatusFilter = DocumentStatus | 'all';

export type DocumentStats = {
  total: number;
  pending: number;
  reviewing: number;
  rejected: number;
};

export const emptyDocuments: CustomerDocument[] = [];

export const statusLabels: Record<DocumentStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  reviewing: 'Em análise'
};

export const statusFilters: Array<{ value: StatusFilter; label: string }> = [
  { value: 'all', label: 'Todos os status' },
  { value: 'pending', label: statusLabels.pending },
  { value: 'reviewing', label: statusLabels.reviewing },
  { value: 'approved', label: statusLabels.approved },
  { value: 'rejected', label: statusLabels.rejected }
];

export function isStatusFilter(value: string): value is StatusFilter {
  return statusFilters.some((option) => option.value === value);
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getDocumentStats(documents: CustomerDocument[]): DocumentStats {
  return {
    total: documents.length,
    pending: documents.filter((item) => item.status === 'pending').length,
    reviewing: documents.filter((item) => item.status === 'reviewing').length,
    rejected: documents.filter((item) => item.status === 'rejected').length
  };
}

export function filterDocuments(documents: CustomerDocument[], query: string, status: StatusFilter) {
  const normalizedQuery = query.trim().toLowerCase();

  return documents.filter((document) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      document.title.toLowerCase().includes(normalizedQuery) ||
      document.customerName.toLowerCase().includes(normalizedQuery) ||
      document.category.toLowerCase().includes(normalizedQuery);

    const matchesStatus = status === 'all' ? true : document.status === status;
    return matchesQuery && matchesStatus;
  });
}
