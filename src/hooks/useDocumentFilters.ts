import { useMemo, useState } from 'react';
import type { CustomerDocument, StatusFilter } from '../types';
import { filterDocuments, isStatusFilter } from '../utils/document-utils';

export function useDocumentFilters(documents: CustomerDocument[]) {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');

  const filteredDocuments = useMemo(() => filterDocuments(documents, query, status), [documents, query, status]);

  function setStatusFilter(value: string) {
    if (isStatusFilter(value)) {
      setStatus(value);
    }
  }

  return {
    filteredDocuments,
    query,
    setQuery,
    setStatusFilter,
    status
  };
}
