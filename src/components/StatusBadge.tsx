import type { DocumentStatus } from '../types';
import { statusLabels } from '../utils/document-utils';

type StatusBadgeProps = {
  status: DocumentStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge ${status}`}>{statusLabels[status]}</span>;
}
