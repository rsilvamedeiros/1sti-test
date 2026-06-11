import { useMemo, useState } from 'react';
import { Drawer } from '../components/Drawer';
import { Filters } from '../components/Filters';
import { Header } from '../components/Header';
import { Stats } from '../components/Stats';
import { Table } from '../components/Table';
import { useDocuments } from '../hooks/useDocuments';
import type { CustomerDocument, DocumentStatus } from '../types';
import { filterDocuments, getDocumentStats, isStatusFilter, type StatusFilter } from '../utils/document-utils';

export function DocumentsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [selectedDocument, setSelectedDocument] = useState<CustomerDocument | null>(null);

  const {
    documents,
    error,
    isError,
    isLoading,
    isUpdatingStatus,
    refetchDocuments,
    updateStatus
  } = useDocuments({
    onDocumentUpdated: (updatedDocument) => {
      setSelectedDocument((currentDocument) =>
        currentDocument?.id === updatedDocument.id ? updatedDocument : currentDocument
      );
    }
  });

  const stats = useMemo(() => getDocumentStats(documents), [documents]);
  const filteredDocuments = useMemo(() => filterDocuments(documents, query, status), [documents, query, status]);

  function handleStatusFilterChange(value: string) {
    if (isStatusFilter(value)) {
      setStatus(value);
    }
  }

  function handleStatusChange(id: string, nextStatus: DocumentStatus) {
    updateStatus({ id, status: nextStatus });
  }

  return (
    <main className="page">
      <Header onRefresh={() => void refetchDocuments()} />

      <Stats stats={stats} />

      <Filters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={handleStatusFilterChange}
      />

      {isLoading && <p className="feedback">Carregando documentos...</p>}
      {isError && <p className="feedback error">{error}</p>}

      {!isLoading && !isError && (
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
