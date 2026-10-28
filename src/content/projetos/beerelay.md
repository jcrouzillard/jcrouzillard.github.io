---
nome: BeeRelay
ordem: 4
slogan: Assistente inteligente para campanhas de WhatsApp.
resumo: Um CRM de marketing para WhatsApp que percorre o ciclo completo, de importar contatos a registrar respostas, com IA como assistente de criação, aprovação humana obrigatória e envio pela API oficial. Também serve de gateway multi-tenant do WhatsApp para outros produtos.
categoria: CRM · WhatsApp · Multi-tenant
cor: '#facc15'
mascote: ../../assets/projects/beerelay/mascote.svg
mascoteFala: 'Só entrego para quem disse sim.'
visibilidade: privado
status: Infra em produção · aprovado pela Meta · sem clientes ainda
desde: mai/2026
metricas:
  - { valor: '170+', rotulo: 'pull requests' }
  - { valor: '150', rotulo: 'issues' }
  - { valor: '4 de 5', rotulo: 'fases concluídas' }
  - { valor: 'IaC', rotulo: 'infra em OpenTofu' }
fluxo:
  - { titulo: 'Importar contatos', detalhe: 'CSV, normalização e deduplicação' }
  - { titulo: 'Consentimento', detalhe: 'Histórico de permissão por contato' }
  - { titulo: 'Segmento', detalhe: 'Regras AND/OR, inclusive entre segmentos' }
  - { titulo: 'Gerar mensagem', detalhe: 'IA sugere texto e detecta spam' }
  - { titulo: 'Aprovar campanha', detalhe: 'Toda ação exige aprovação', humano: true }
  - { titulo: 'Enviar em lotes', detalhe: 'Lotes progressivos com pausa por risco' }
  - { titulo: 'Respostas', detalhe: 'Classificação e opt-out automático por webhook' }
principios:
  - Campanha de marketing só vai para contatos com permissão explícita.
  - A IA nunca envia sozinha. Toda ação requer aprovação humana.
  - Quem pediu SAIR jamais recebe propaganda de novo.
  - Dados pessoais enviados para a IA são reduzidos ao mínimo necessário.
fases:
  - { nome: 'MVP seguro: contatos, segmentos e campanhas', status: feito }
  - { nome: 'IA para campanha: geração, spam e imagem', status: feito }
  - { nome: 'Assistente conversacional com aprovação humana', status: feito }
  - { nome: 'WhatsApp Business Platform: envio real e webhooks', status: feito }
  - { nome: 'CRM: dashboard, respostas e métricas de entrega', status: agora }
stack: [Python 3.12, FastAPI, SQLModel, Alembic, PostgreSQL, Next.js 14, TypeScript, shadcn/ui, WhatsApp Cloud API, GCP Cloud Run, Cloud Trace, OpenTofu]
galeria: []
---

## O problema

Campanhas de WhatsApp costumam ser feitas no improviso: listas sem consentimento, mensagens disparadas de uma vez e números bloqueados. Para pequenos negócios, isso significa risco jurídico (LGPD) e perda do canal.

## A abordagem

O BeeRelay transforma a campanha num **fluxo controlado**: consentimento registrado, segmentação por regras, mensagem sugerida pela IA, aprovação humana e envio em lotes progressivos pela API oficial da Meta, com pausa automática quando o risco sobe.

Com o tempo, o BeeRelay virou também o **gateway de WhatsApp** de outros produtos. Ele recebe o webhook, valida a assinatura da Meta, resolve o tenant e encaminha os eventos assinados. O token do WhatsApp nunca sai do cofre do BeeRelay.

## Decisões de engenharia

- **RBAC** (admin / operator), sessão no servidor, convite e reset por e-mail.
- **Infraestrutura como código** em repositório próprio (OpenTofu), com deploy em Cloud Run e telemetria no Cloud Trace.
- **Ambientes de homologação e produção** com releases versionadas e badges de status.
- **Roteamento de webhook por tenant**, para servir vários produtos com um único número de integração.
