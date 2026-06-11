import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDocuments, updateDocumentStatus } from '../api';
import type { CustomerDocument, UpdateDocumentStatusPayload } from '../types';
import { emptyDocuments } from '../utils/document-utils';

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
    mutationFn: (payload: UpdateDocumentStatusPayload) => updateDocumentStatus(payload),
    onSuccess: (updatedDocument) => {
      queryClient.setQueryData<CustomerDocument[]>(documentsQueryKey, (currentDocuments = emptyDocuments) =>
        currentDocuments.map((document) => (document.id === updatedDocument.id ? updatedDocument : document))
      );
      onDocumentUpdated?.(updatedDocument);
    }
  });

  const error = documentsQuery.error instanceof Error ? documentsQuery.error.message : 'Falha ao carregar documentos';
  const updateError =
    updateStatusMutation.error instanceof Error ? updateStatusMutation.error.message : 'Falha ao atualizar documento';

  return {
    documents: documentsQuery.data ?? emptyDocuments,
    error,
    isError: documentsQuery.isError,
    isFetching: documentsQuery.isFetching,
    isLoading: documentsQuery.isPending,
    isUpdateError: updateStatusMutation.isError,
    isUpdatingStatus: updateStatusMutation.isPending,
    refetchDocuments: documentsQuery.refetch,
    updateError,
    updateStatus: updateStatusMutation.mutate
  };
}
