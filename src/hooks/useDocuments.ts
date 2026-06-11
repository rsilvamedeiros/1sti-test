import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDocuments, updateDocumentStatus } from '../api';
import type { CustomerDocument, DocumentStatus } from '../types';
import { emptyDocuments } from '../utils/document-utils';

type UpdateStatusPayload = {
  id: string;
  status: DocumentStatus;
};

const documentsQueryKey = ['documents'];

type UseDocumentsOptions = {
  onDocumentUpdated?: (document: CustomerDocument) => void;
};

export function useDocuments({ onDocumentUpdated }: UseDocumentsOptions = {}) {
  const queryClient = useQueryClient();

  const documentsQuery = useQuery({
    queryKey: documentsQueryKey,
    queryFn: fetchDocuments
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: UpdateStatusPayload) => updateDocumentStatus(id, status),
    onSuccess: (updatedDocument) => {
      queryClient.setQueryData<CustomerDocument[]>(documentsQueryKey, (currentDocuments = emptyDocuments) =>
        currentDocuments.map((document) => (document.id === updatedDocument.id ? updatedDocument : document))
      );
      onDocumentUpdated?.(updatedDocument);
    }
  });

  const error = documentsQuery.error instanceof Error ? documentsQuery.error.message : 'Falha ao carregar documentos';

  return {
    documents: documentsQuery.data ?? emptyDocuments,
    error,
    isError: documentsQuery.isError,
    isLoading: documentsQuery.isPending,
    isUpdatingStatus: updateStatusMutation.isPending,
    refetchDocuments: documentsQuery.refetch,
    updateStatus: updateStatusMutation.mutate
  };
}
