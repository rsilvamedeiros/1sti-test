import type { DocumentStatus } from '../types';
import { statusLabels } from '../utils/document-utils';

type StatusBadgeProps = {
  status: DocumentStatus;
};

const badgeClasses: Record<DocumentStatus, string> = {
  pending: 'bg-amber-100 text-amber-800',
  reviewing: 'bg-blue-100 text-blue-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800'
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${badgeClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
