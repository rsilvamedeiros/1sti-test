# Decisões técnicas

## Principais problemas identificados

- A tela principal concentrava busca de dados, filtros, cálculo de indicadores, atualização de status e renderização.
- O estado de servidor era controlado manualmente com `useEffect` e `useState`.
- A tipagem estava incompleta, com contratos de domínio pouco explícitos.
- Havia ausência de feedback para estado vazio e tratamento limitado de erro.
- Os testes cobriam apenas renderização básica, sem proteger fluxos importantes.
- As dependências usavam `latest`, reduzindo a reprodutibilidade da instalação.

## O que foi alterado

- Separei a tela em `pages`, `components`, `hooks` e `utils`.
- Centralizei os tipos de domínio em `types.ts`, incluindo status, filtros, payloads e respostas.
- Substituí o carregamento manual por TanStack Query em `useDocuments`.
- Separei estado local, estado de filtros e estado de servidor.
- Adicionei estados de loading, erro com retry, erro de atualização e empty state.
- Migrei a interface para Tailwind CSS, mantendo um visual simples e funcional.
- Fixei versões das dependências e mantive `package-lock.json`.
- Adicionei testes para listagem, filtros/empty state e atualização de status.

## Por que essas decisões foram tomadas

- A separação em componentes e hooks melhora legibilidade sem criar uma arquitetura grande demais para o escopo.
- TanStack Query é adequado porque os documentos e a atualização de status representam estado de servidor.
- Filtros e documento selecionado permaneceram como estado local, pois pertencem à interação da tela.
- Tailwind foi usado para acelerar ajustes visuais sem introduzir uma biblioteca de UI mais pesada.
- Os testes priorizam comportamentos que poderiam quebrar a operação da tela.

## Trade-offs

- Mantive a API simulada em memória, sem criar uma camada HTTP real, por ser suficiente para o desafio.
- Não implementei virtualização de tabela, pois o volume de dados mockado é pequeno.
- Usei `memo`, `useMemo` e `useCallback` apenas em pontos com props/cálculos derivados claros, evitando otimização excessiva.
- Não adicionei gerenciamento global de estado, porque TanStack Query e estado local resolvem o escopo atual.
- A estilização com Tailwind ficou diretamente nos componentes para preservar velocidade no timebox.

## O que eu faria com mais tempo

- Criaria documentação visual dos componentes em Storybook, cobrindo estados como loading, erro, vazio, status diferentes e ações desabilitadas.
- Ampliaria a suíte de testes automatizados com cenários de falha de carregamento, falha na atualização de status, retry e acessibilidade.
- Adicionaria testes de integração/e2e para os fluxos principais de operação, como filtrar, abrir detalhes e aprovar/rejeitar documentos.
- Melhoraria a acessibilidade do drawer com foco inicial, fechamento por `Esc`, retorno de foco ao elemento de origem e gerenciamento completo de foco.
- Avaliaria paginação, ordenação, debounce na busca e filtros mais avançados caso o volume de documentos aumentasse.
- Revisaria renderizações com React DevTools Profiler antes de adicionar novas otimizações, evitando `memo`/`useCallback` sem evidência.
- Separaria tokens visuais e padrões de UI caso a aplicação crescesse para mais telas.
- Criaria uma camada de API mais próxima de produção, com tratamento padronizado de erros, cancelamento de requests e contratos alinhados ao backend.
- Adicionaria observabilidade para erros e eventos relevantes da operação, como falha ao carregar documentos e alterações de status.
- Detalharia melhor a documentação técnica, incluindo decisões de arquitetura, padrões de componentes, estratégia de testes e critérios para evolução futura.

## Uso de IA assistiva

- Ferramentas utilizadas: Codex - GPT-5.5
- Como foram usadas: apoio na análise inicial do projeto, revisão dos scripts e dependências do `package.json`, criação e ajuste de testes, correções após falhas de `build`/`lint`/`test` e geração inicial deste `DECISIONS.md`.
- O que foi feito e revisado manualmente: definição da divisão de pastas, separação da tela em página/componentes/hooks/utils, organização do `App`, refinamento das funções auxiliares, escolhas de arquitetura, ajustes de UX, revisão dos outputs gerados e validação final com `npm run build`, `npm test` e `npm run lint`.
