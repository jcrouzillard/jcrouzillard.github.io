---
nome: Ajuri
ordem: 6
slogan: Eu vim ajudar.
resumo: O barco mais novo, ainda saindo do estaleiro. Um app de Mac para líderes que não são técnicos montarem equipes de ajudantes de IA só conversando, usando a assinatura de IA que já pagam.
categoria: Agentes de IA · App de Mac
cor: '#f59e6b'
mascote: ../../assets/projects/ajuri/mascote.svg
mascoteFala: 'Ajuri, em tupi: eu vim ajudar.'
visibilidade: privado
novo: true
status: Nascendo · primeira versão no Mac
desde: out/2026
metricas:
  - { valor: '22', rotulo: 'pull requests na primeira semana' }
  - { valor: '1', rotulo: 'app de Mac (.dmg)' }
  - { valor: '0', rotulo: 'código para o líder escrever' }
fluxo:
  - { titulo: 'Conversa com o Arandu', detalhe: 'O Início é uma conversa, não um formulário', humano: true }
  - { titulo: 'Uma Oca nasce', detalhe: 'A equipe de ajudantes ganha carta e treino' }
  - { titulo: 'Primeiro resultado', detalhe: 'Algo útil antes mesmo de a Oca ficar pronta' }
  - { titulo: 'Painel do Início', detalhe: 'A saúde de cada equipe num olhar' }
  - { titulo: 'Revisão da semana', detalhe: 'O líder confere e ajusta o rumo', humano: true }
principios:
  - Feito para quem não é técnico. Tudo começa numa conversa.
  - Usa a assinatura de IA que a pessoa já paga, sem conta nova para abrir.
  - As Ocas moram no Google Drive da própria pessoa.
  - Critérios invioláveis escritos antes das telas, e protótipo navegável antes do código.
fases:
  - { nome: 'Marca, guia de desenho e protótipo navegável', status: feito }
  - { nome: 'MVP funcionando no Mac, com login do Google e Ocas no Drive', status: feito }
  - { nome: 'Ajustes depois do primeiro uso', status: agora }
  - { nome: 'O que vier dessa primeira travessia', status: depois }
stack: [App de Mac (.dmg), Google OAuth, Google Drive, Claude Code]
galeria: []
---

## O problema

Equipes de agentes de IA ainda são coisa de quem programa. Um líder de time, dono de pequeno negócio ou gestor sabe muito bem o que precisa ser feito, mas não quer abrir terminal, escrever prompt de sistema nem pagar mais uma assinatura para ter ajudantes de IA trabalhando por ele.

## A abordagem

O Ajuri leva o que aprendi montando equipes de agentes nos outros barcos para quem nunca escreveu uma linha de código. O líder **conversa com o Arandu**, e dessa conversa nasce uma **Oca**: uma equipe de ajudantes, com sua carta, seu treino e seus moradores. O Início mostra a saúde de cada equipe, e toda semana há uma revisão para o líder ajustar o rumo.

O nome vem do tupi, *"eu vim ajudar"*, e o vocabulário do app segue a mesma raiz.

## Decisões de engenharia

- **App de Mac empacotado em .dmg**, para instalar como qualquer outro programa.
- **Entrar com o Google é obrigatório**, e as Ocas ficam guardadas no Drive da própria pessoa.
- **Desenho antes do código**: guia de desenho, protótipos navegáveis, critérios invioláveis e fichas de cada tela vieram antes do MVP.
- **Desenvolvido por agentes**, como os outros barcos: cada mudança entra por pull request.
