import { useMemo, useState } from 'react';
import { Drawer } from '../components/Drawer';
import { Filters } from '../components/Filters';
import { Header } from '../components/Header';
import { Stats } from '../components/Stats';
import { Table } from '../components/Table';
import { useDocuments } from '../hooks/useDocuments';
import type { CustomerDocument, DocumentStatus, StatusFilter } from '../types';
import { filterDocuments, getDocumentStats, isStatusFilter } from '../utils/document-utils';

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
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Header onRefresh={() => void refetchDocuments()} />

      <Stats stats={stats} />

      <Filters
        query={query}
        status={status}
        onQueryChange={setQuery}
        onStatusChange={handleStatusFilterChange}
      />

      {isLoading && <p className="rounded-xl border border-slate-200 bg-white p-4 text-slate-700">Carregando documentos...</p>}
      {isError && <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{error}</p>}

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
