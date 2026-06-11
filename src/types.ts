export const documentStatuses = ['pending', 'approved', 'rejected', 'reviewing'] as const;

export type DocumentStatus = (typeof documentStatuses)[number];

export type StatusFilter = DocumentStatus | 'all';

export type CustomerDocument = {
  id: string;
  title: string;
  customerName: string;
  customerEmail?: string;
  status: DocumentStatus;
  category: string;
  createdAt: string;
  updatedAt?: string;
  confidence?: number;
  assignedTo?: string | null;
};

export type DocumentsResponse = CustomerDocument[];

export type UpdateDocumentStatusPayload = {
  id: CustomerDocument['id'];
  status: DocumentStatus;
};

export type DocumentStats = {
  total: number;
  pending: number;
  reviewing: number;
  rejected: number;
};

export type StatusFilterOption = {
  value: StatusFilter;
  label: string;
};
