---
nome: FoxSteward
ordem: 3
slogan: Agent-governed IT management para projetos no GitHub.
resumo: Um IT Manager conectado ao GitHub. Aplica uma metodologia própria, governa projetos tradicionais ou feitos por agentes e transforma diagnóstico e aprendizado em specs, issues e adoção entre projetos, sem nunca escrever o código dos outros.
categoria: DevTools · Governança de agentes
cor: '#f97316'
mascote: ../../assets/projects/foxsteward/foxsteward-logo.png
mascoteFala: 'Eu governo o trabalho. Quem escreve o código é você.'
capa: ../../assets/projects/foxsteward/foxsteward-overview.png
visibilidade: privado
status: Fase 0 · fundação
desde: abr/2026
metricas:
  - { valor: '300+', rotulo: 'pull requests' }
  - { valor: '290+', rotulo: 'issues' }
  - { valor: '3', rotulo: 'ADRs de arquitetura' }
  - { valor: '0', rotulo: 'permissões de escrita no código' }
fluxo:
  - { titulo: 'Metodologia', detalhe: 'A organização define e treina o método', humano: true }
  - { titulo: 'FoxSteward governa', detalhe: 'Specs, issues, boards e políticas' }
  - { titulo: 'Responsável local', detalhe: 'Pessoa ou time conduz o trabalho', humano: true }
  - { titulo: 'Agentes implementam', detalhe: 'Dentro do projeto, por PR' }
  - { titulo: 'Evidências', detalhe: 'PR, CI e testes' }
  - { titulo: 'Aprende e propaga', detalhe: 'Melhorias viram nova versão do método' }
principios:
  - Separa control plane (método, políticas, evidências) de execution plane (código, PRs).
  - Coleta somente leitura via GitHub App, instalada só nos repositórios autorizados.
  - O LLM é substituível (Anthropic, OpenAI ou Gemini). O núcleo permanente é o método e o histórico de decisões.
  - Conteúdo de repositório é tratado como não confiável antes de chegar ao modelo.
fases:
  - { nome: 'Project Registry, autoridade e coleta read-only', status: feito }
  - { nome: 'Avaliação de qualidade e maturidade de agentes', status: agora }
  - { nome: 'Acompanhamento gerencial (MVP)', status: agora }
  - { nome: 'Aprendizado transversal e issues de adoção', status: depois }
stack: [TypeScript, Next.js, Node.js 24, PostgreSQL 17, GitHub App, Anthropic / OpenAI / Gemini, Docker Compose]
galeria: []
---

## O problema

Quando vários projetos passam a ser construídos por agentes de IA, cada um cria suas convenções, seus gates e seus atalhos. Uma boa prática descoberta num repositório raramente chega aos outros, e ninguém tem uma visão consolidada da maturidade de cada projeto.

## A abordagem

O FoxSteward **governa o trabalho, não o executa**. Ele observa os repositórios cadastrados, entende arquitetura, histórico, issues, PRs e CI, e administra specs, roadmap e dependências. Pessoas e agentes locais seguem fazendo a implementação.

Quando uma melhoria dá certo num projeto, ele a classifica (específica, reutilizável, candidata a padrão, obrigatória), propõe uma nova versão da metodologia e abre issues de adoção nos projetos onde ela se aplica.

## Decisões de engenharia

- **Fronteira explícita**: sem commits, merges ou releases em projetos governados. O conector não tem métodos de escrita.
- **Maturidade observada x declarada**: lê `.claude/agents`, `AGENTS.md`, instruções de Copilot e Cursor, specs e gates de CI.
- **Credenciais de modelo cifradas em repouso** e provedor configurável por tela.
- **ADRs** para stack, autenticação e o port de modelo com conteúdo não confiável.
