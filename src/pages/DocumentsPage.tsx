import { useMemo, useState } from 'react';
import { Drawer } from '../components/Drawer';
import { EmptyState } from '../components/EmptyState';
import { Feedback } from '../components/Feedback';
import { Filters } from '../components/Filters';
import { Header } from '../components/Header';
import { Stats } from '../components/Stats';
import { Table } from '../components/Table';
import { useDocumentFilters } from '../hooks/useDocumentFilters';
import { useDocuments } from '../hooks/useDocuments';
import type { CustomerDocument, DocumentStatus } from '../types';
import { getDocumentStats } from '../utils/document-utils';

export function DocumentsPage() {
  const [selectedDocument, setSelectedDocument] = useState<CustomerDocument | null>(null);

  const {
    documents,
    error,
    isError,
    isFetching,
    isLoading,
    isUpdateError,
    isUpdatingStatus,
    refetchDocuments,
    updateError,
    updateStatus
  } = useDocuments({
    onDocumentUpdated: (updatedDocument) => {
      setSelectedDocument((currentDocument) =>
        currentDocument?.id === updatedDocument.id ? updatedDocument : currentDocument
      );
    }
  });

  const { filteredDocuments, query, setQuery, setStatusFilter, status } = useDocumentFilters(documents);

  const stats = useMemo(() => getDocumentStats(documents), [documents]);
  const hasActiveFilters = query.trim().length > 0 || status !== 'all';
  const isEmpty = !isLoading && !isError && filteredDocuments.length === 0;

  function handleStatusChange(id: string, nextStatus: DocumentStatus) {
    updateStatus({ id, status: nextStatus });
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Header isRefreshing={isFetching && !isLoading} onRefresh={() => void refetchDocuments()} />

      <Stats stats={stats} />

      <Filters query={query} status={status} onQueryChange={setQuery} onStatusChange={setStatusFilter} />

      {isLoading && <Feedback>Carregando documentos...</Feedback>}

      {isError && (
        <Feedback actionLabel="Tentar novamente" onAction={() => void refetchDocuments()} tone="error">
          {error}
        </Feedback>
      )}

      {isUpdateError && <Feedback tone="error">{updateError}</Feedback>}

      {isEmpty && <EmptyState hasActiveFilters={hasActiveFilters} />}

      {!isLoading && !isError && !isEmpty && (
        <Table
          documents={filteredDocuments}
          isUpdatingStatus={isUpdatingStatus}
          onDocumentSelect={setSelectedDocument}
          onStatusChange={handleStatusChange}
        />
      )}

      {selectedDocument && <Drawer document={selectedDocument} onClose={() => setSelectedDocument(null)} />}
    </main>
  );
}
