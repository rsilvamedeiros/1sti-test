import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../App';
import type { CustomerDocument, UpdateDocumentStatusPayload } from '../types';

const apiMock = vi.hoisted(() => {
  const documents: CustomerDocument[] = [
    {
      id: 'doc-001',
      title: 'Contrato Social - ACME LTDA',
      customerName: 'ACME LTDA',
      customerEmail: 'financeiro@acme.com',
      status: 'pending',
      category: 'Contrato',
      createdAt: '2026-05-26T10:30:00Z',
      confidence: 0.74,
      assignedTo: null
    },
    {
      id: 'doc-002',
      title: 'Comprovante de Endereço',
      customerName: 'João Pereira',
      customerEmail: 'joao@email.com',
      status: 'reviewing',
      category: 'Cadastro',
      createdAt: '2026-05-29T08:05:00Z',
      confidence: 0.62,
      assignedTo: 'Rafa'
    }
  ];

  return {
    documents,
    fetchDocuments: vi.fn(),
    updateDocumentStatus: vi.fn()
  };
});

vi.mock('../api', () => ({
  fetchDocuments: apiMock.fetchDocuments,
  updateDocumentStatus: apiMock.updateDocumentStatus
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      },
      mutations: {
        retry: false
      }
    }
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

describe('DocumentsPage', () => {
  beforeEach(() => {
    apiMock.fetchDocuments.mockResolvedValue(apiMock.documents);
    apiMock.updateDocumentStatus.mockImplementation(async ({ id, status }: UpdateDocumentStatusPayload) => {
      const document = apiMock.documents.find((item) => item.id === id);

      if (!document) {
        throw new Error('Documento não encontrado');
      }

      return {
        ...document,
        status,
        updatedAt: '2026-06-10T12:00:00Z'
      };
    });
  });

  test('loads and displays customer documents', async () => {
    renderApp();

    expect(screen.getByText('Carregando documentos...')).toBeInTheDocument();
    expect(await screen.findByText('Contrato Social - ACME LTDA')).toBeInTheDocument();
    expect(screen.getByText('Comprovante de Endereço')).toBeInTheDocument();
  });

  test('filters documents and shows an empty state when there are no matches', async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText('Contrato Social - ACME LTDA');
    await user.type(screen.getByLabelText('Buscar documentos'), 'sem resultado');

    expect(screen.getByText('Nenhum documento encontrado')).toBeInTheDocument();
    expect(screen.getByText('Tente ajustar a busca ou selecionar outro status.')).toBeInTheDocument();
  });

  test('updates document status when approving a pending document', async () => {
    const user = userEvent.setup();
    renderApp();

    const row = (await screen.findByText('Contrato Social - ACME LTDA')).closest('tr');
    expect(row).not.toBeNull();

    await user.click(within(row as HTMLTableRowElement).getByRole('button', { name: 'Aprovar' }));

    expect(apiMock.updateDocumentStatus).toHaveBeenCalledWith({
      id: 'doc-001',
      status: 'approved'
    });
    expect(await within(row as HTMLTableRowElement).findByText('Aprovado')).toBeInTheDocument();
  });
});
