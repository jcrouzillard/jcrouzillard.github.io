---
nome: BeeFinance
ordem: 5
slogan: Finanças de casal, direto no WhatsApp.
resumo: Assistente financeiro com IA no WhatsApp para pessoas e casais. Registra gastos por texto, áudio e foto da nota, organiza receitas e compromissos e acompanha metas ligadas a propósitos de vida. Codinome; o nome comercial ainda está em aberto.
categoria: Fintech · WhatsApp · IA
cor: '#34d399'
mascote: ../../assets/projects/beefinance/mascote.svg
mascoteFala: 'Manda um áudio. O resto eu organizo.'
visibilidade: privado
status: Em concepção · spec do MVP em revisão
desde: set/2026
metricas:
  - { valor: '3', rotulo: 'formas de registrar: texto, áudio, foto' }
  - { valor: '2', rotulo: 'canais: WhatsApp e web' }
  - { valor: '1', rotulo: 'base financeira compartilhada' }
fluxo:
  - { titulo: 'WhatsApp', detalhe: 'Texto, áudio ou foto da nota', humano: true }
  - { titulo: 'BeeRelay', detalhe: 'Gateway: assinatura, tenant e mídia' }
  - { titulo: 'IA propõe', detalhe: 'Extrai dados estruturados do lançamento' }
  - { titulo: 'Backend decide', detalhe: 'Valida, calcula, aplica permissões e grava' }
  - { titulo: 'Confirmação', detalhe: 'Sucesso só depois do registro gravado' }
principios:
  - A IA interpreta, o backend decide. Nenhum valor é calculado pelo modelo.
  - Nenhuma resposta de sucesso antes do registro estar gravado.
  - O BeeFinance não fala com a Meta. O token do WhatsApp fica no BeeRelay.
  - Specs de produto e infra como fonte da verdade, com agentes do Claude Code por papel.
fases:
  - { nome: 'Especificação do MVP', status: agora }
  - { nome: 'Integração com o BeeRelay (tenant e mídias)', status: depois }
  - { nome: 'Registro por WhatsApp e plataforma web', status: depois }
  - { nome: 'Metas ligadas a propósitos de vida', status: depois }
stack: [Python 3.12, FastAPI, SQLModel, PostgreSQL 16, Next.js 14, Tailwind, shadcn/ui, GCP Cloud Run, BeeRelay]
galeria: []
---

## O problema

Apps de finanças pessoais pedem disciplina: abrir o app, achar a categoria, digitar o valor. A maioria das pessoas desiste em semanas. Para casais é pior, porque o dinheiro é compartilhado e o registro, não.

## A abordagem

Levar o registro para onde as pessoas já estão: **o WhatsApp**. Mandar um áudio ("gastei 80 no mercado"), uma foto da nota ou um texto já basta. A **plataforma web** concentra o que precisa de tela: receitas, compromissos, metas, privacidade e revisão de lançamentos. Os dois canais usam a mesma base e as mesmas regras.

## Decisões de engenharia

- **Mesma base técnica do BeeRelay**, para reaproveitar conhecimento, CI e infraestrutura.
- **Gateway em vez de integração direta**: o BeeRelay recebe e assina os eventos e o BeeFinance usa a API de tenant para enviar mensagens e baixar mídias.
- **Provedor de IA atrás de uma interface própria**, com o fornecedor ainda em aberto.
- **Começa pela especificação**, derivada do documento de MVP, antes de qualquer linha de código.
