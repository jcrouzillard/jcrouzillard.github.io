---
nome: Precedentia
ordem: 2
slogan: Search. Rank. Prove.
resumo: Um motor verificável de precedentes jurídicos. Toda resposta aponta para decisões, metadados e fontes oficiais que podem ser conferidos. A IA conversa, o backend sabe, os dados provam.
categoria: Legal tech · Busca semântica
cor: '#2dd4bf'
capa: ../../assets/projects/precedentia/precedentia-product-landing.png
mascote: ../../assets/projects/precedentia/precedentia.png
mascoteFala: 'Se não dá para provar na fonte, não é resposta.'
visibilidade: privado
status: MVP privado · Fase 1
desde: mai/2026
metricas:
  - { valor: '170+', rotulo: 'pull requests' }
  - { valor: '150', rotulo: 'issues planejadas' }
  - { valor: 'STJ', rotulo: 'fonte oficial inicial' }
  - { valor: '4', rotulo: 'interfaces: REST, UI, MCP, tools' }
fluxo:
  - { titulo: 'Pergunta ou caso', detalhe: 'Pergunta em linguagem natural ou peça anexada', humano: true }
  - { titulo: 'IA interpreta', detalhe: 'Organiza a intenção e o pedido' }
  - { titulo: 'Extração jurídica', detalhe: 'Backend extrai temas, teses e elementos relevantes' }
  - { titulo: 'Busca e ranking', detalhe: 'Base local com pgvector ou Dados Abertos do STJ' }
  - { titulo: 'Resposta com prova', detalhe: 'Fontes, confiança, aderência ao caso e rastreabilidade' }
principios:
  - A IA nunca responde sozinha. Ela só explica o que o backend encontrou e conseguiu provar.
  - Verificável significa auditável, rastreável e confirmável na fonte oficial.
  - Contratos públicos com JSON Schema para integrar aplicações e agentes.
  - Suite de evals com relatório pass/fail, e gitleaks no pre-commit.
fases:
  - { nome: 'Fundação: Go, Postgres + pgvector, observabilidade', status: feito }
  - { nome: 'Ingestão dos espelhos do STJ e lazy cache', status: agora }
  - { nome: 'API REST, busca híbrida e evals', status: agora }
  - { nome: 'Servidor MCP e integração com agentes', status: depois }
stack: [Go, PostgreSQL 16, pgvector, goose, Prometheus, slog, MCP, Tool Calling, JSON Schema, Docker]
galeria:
  - { src: ../../assets/projects/precedentia/precedentia.png, legenda: 'Identidade: grafo de precedentes, a letra P e o selo de validação' }
---

## O problema

Ferramentas jurídicas baseadas só em IA produzem respostas convincentes e difíceis de auditar. Para um advogado, uma citação inventada é um risco real: não basta a resposta parecer certa, ela precisa ser **provável**.

## A abordagem

A Precedentia separa os papéis. A IA é a **interface**: entende a pergunta e explica o resultado. Busca, ranking jurídico, cache, confiança e validação ficam no **backend**, sobre dados oficiais. O foco inicial é a jurisprudência do Superior Tribunal de Justiça, a partir dos Dados Abertos do STJ.

Além de perguntas, o advogado pode partir do caso concreto: anexa uma peça, decisão ou recurso, e a plataforma busca precedentes ligados àquele contexto.

## Decisões de engenharia

- **Go** pela previsibilidade, com binários separados para API, worker e servidor MCP.
- **Busca híbrida** (léxica + semântica) com embeddings no próprio Postgres, via pgvector.
- **Lazy cache** da fonte oficial: busca primeiro na base local e só vai ao STJ quando precisa.
- **Pensado para agentes**: REST, Tool Calling e MCP como portas de entrada de primeira classe.
