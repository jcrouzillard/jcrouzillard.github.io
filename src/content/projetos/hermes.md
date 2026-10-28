---
nome: Hermes
ordem: 1
slogan: A mensagem certa, antes de todos.
resumo: Uma produtora de vídeos para o YouTube movida por uma equipe de agentes de IA. Encontra o assunto, pesquisa, confere as fontes, escreve, narra com voz clonada e monta o vídeo, com cerca de 1h30 de trabalho humano por semana.
categoria: Mídia · Agentes de IA
cor: '#8b8cf6'
mascote: ../../assets/projects/hermes/logo.svg
mascoteFala: 'Nada sai sem a palavra final do Zeus.'
capa: ../../assets/projects/hermes/painel-inicio.png
visibilidade: privado
status: Em uso · lançando o primeiro canal
desde: out/2026
metricas:
  - { valor: '240+', rotulo: 'pull requests' }
  - { valor: '11', rotulo: 'agentes na equipe' }
  - { valor: '28', rotulo: 'tabelas no banco' }
  - { valor: '~1h30', rotulo: 'humanas por semana' }
fluxo:
  - { titulo: 'Radar', detalhe: 'Argos sugere pautas para cada canal' }
  - { titulo: 'Você aprova', detalhe: 'Um clique decide a pauta', humano: true }
  - { titulo: 'Pesquisa e verificação', detalhe: 'Atena pesquisa, Alétheia confere as fontes' }
  - { titulo: 'Roteiro', detalhe: 'Calíope escreve no estilo do canal' }
  - { titulo: 'Você aprova', detalhe: 'Revisão do roteiro', humano: true }
  - { titulo: 'Voz, arte e montagem', detalhe: 'Eco narra, Apolo ilustra, Hefesto monta' }
  - { titulo: 'Você assiste', detalhe: 'Aprovação final do vídeo', humano: true }
  - { titulo: 'YouTube e números', detalhe: 'Envio, Shorts e desempenho do canal' }
principios:
  - Nada é publicado sem a palavra final de uma pessoa. No painel, o editor-chefe é o Zeus.
  - Os agentes ganham nível, aprendem com as correções e podem ser mandados estudar.
  - Teto de gasto mensal visível, com o custo de cada parte em tempo real.
  - Vozes clonadas cifradas (AES-256-GCM) na cópia de segurança.
fases:
  - { nome: 'Produzir: da notícia ao vídeo pronto', status: feito }
  - { nome: 'Lançar o primeiro canal', status: agora }
  - { nome: 'Publicar e agendar no YouTube', status: agora }
  - { nome: 'Acompanhar números e prever monetização', status: agora }
  - { nome: 'Rentabilizar: receita por vídeo e pautas que rendem', status: depois }
stack: [Python, FastAPI, Claude (Anthropic SDK), Claude Code, ffmpeg, SQLite/Turso, Backblaze B2, YouTube Data API, Google OAuth, macOS (pywebview)]
galeria:
  - { src: ../../assets/projects/hermes/painel-equipe.png, legenda: 'O Olimpo ao vivo: cada agente e o que está fazendo agora' }
  - { src: ../../assets/projects/hermes/painel-videos.png, legenda: 'Vídeo esperando aprovação, com versões e Shorts' }
  - { src: ../../assets/projects/hermes/painel-celular.png, legenda: 'O painel também funciona no celular, como app na tela inicial' }
---

## O problema

Canais "sem rosto" no YouTube exigem uma rotina pesada: achar o assunto antes dos outros, pesquisar, checar fontes, escrever, gravar, editar e publicar toda semana. Feito à mão, isso não escala. Feito só por IA, vira conteúdo genérico e às vezes errado.

## A abordagem

O Hermes trata a produção como uma **esteira com portões humanos**. Uma equipe de onze agentes, batizados com nomes do Olimpo, faz cada etapa, e o painel concentra tudo que precisa de decisão: pautas para aprovar, roteiros para revisar, vídeos para assistir.

Cada canal tem marca, estilo de vídeo, voz e conta do YouTube próprios. A verificação de fontes é uma etapa à parte, feita por um agente diferente do que pesquisa.

## Decisões de engenharia

- **App local no Mac**, com janela própria e ícone na barra de menus, sem servidor para manter. O arquivo pesado vai para um storage compatível com S3.
- **Fila de tarefas resiliente**: o trabalho interrompido volta para a fila quando o painel sobe de novo.
- **Atualização pelo próprio painel**, seguindo as versões lançadas ou a branch de desenvolvimento.
- **Desenvolvido por agentes**: o código entra por pull request com testes, e cada versão vem com changelog.
