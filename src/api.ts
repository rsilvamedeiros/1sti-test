import { documents } from './data';
import type { CustomerDocument, DocumentsResponse, UpdateDocumentStatusPayload } from './types';

const FETCH_DELAY_MS = 600;
const UPDATE_DELAY_MS = 350;
const FETCH_FAILURE_RATE = 0.03;

let state = [...documents];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchDocuments(): Promise<DocumentsResponse> {
  await wait(FETCH_DELAY_MS);

  if (Math.random() < FETCH_FAILURE_RATE) {
    throw new Error('Falha ao carregar documentos');
  }

  return [...state];
}

export async function updateDocumentStatus({
  id,
  status
}: UpdateDocumentStatusPayload): Promise<CustomerDocument> {
  await wait(UPDATE_DELAY_MS);

  const document = state.find((item) => item.id === id);
  if (!document) {
    throw new Error('Documento não encontrado');
  }

  const updated: CustomerDocument = {
    ...document,
    status,
    updatedAt: new Date().toISOString()
  };

  state = state.map((item) => (item.id === id ? updated : item));
  return updated;
}
