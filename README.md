# React Document Review

Aplicação React/TypeScript para listagem e revisão de documentos enviados por clientes.

Esta solução evolui a base do desafio técnico com foco em organização, tipagem, estado assíncrono, feedbacks de interface, testes e documentação de decisões.

## Stack

- React
- TypeScript
- Vite
- TanStack Query
- Tailwind CSS
- Testing Library
- Vitest

## Como rodar

```bash
npm install
npm run dev
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm test
npm run test:watch
npm run lint
```

## O que foi trabalhado

- Separação da tela em `pages`, `components`, `hooks` e `utils`.
- Uso de TanStack Query para estado de servidor.
- Separação entre estado local, estado de filtros e estado de dados.
- Tipagem centralizada para documentos, status, filtros, payloads e respostas.
- Feedback para loading, erro, retry e estado vazio.
- Acessibilidade básica em filtros e drawer.
- Otimizações pontuais com `useMemo`, `useCallback` e `memo`.
- Testes cobrindo listagem, filtros/empty state e atualização de status.
- Dependências fixadas para instalação mais reprodutível.

## Testes

Os testes usam Vitest e Testing Library.

```bash
npm test
```

Coberturas principais:

- carregamento e exibição de documentos;
- filtro de documentos e estado vazio;
- atualização de status ao aprovar um documento.

## Decisões técnicas

As principais decisões, trade-offs e próximos passos estão documentados em [DECISIONS.md](./DECISIONS.md).

## Uso de IA assistiva

Foi utilizada IA assistiva como apoio na análise inicial do projeto, revisão de scripts/dependências, criação e ajuste de testes, correções após falhas de build/lint/test e geração inicial da documentação.

A divisão de pastas, organização da tela, escolhas de arquitetura, refinamentos de funções, ajustes de UX e revisão final foram conduzidos manualmente.
