// Dados pessoais e textos gerais do site. Edite aqui.
export const site = {
  nome: 'Julien Crouzillard',
  titulo: 'Engenheiro de software · produtos com IA',
  epiteto: 'Jarl de uma tripulação de agentes', // o chefe do barco: decide, carimba, responde
  local: 'São Paulo, Brasil',
  github: 'https://github.com/jcrouzillard',
  linkedin: 'https://www.linkedin.com/in/julien-crouzillard-34147a108/',
  email: '', // deixe vazio para não expor
  descricao:
    'Portfólio de Julien Crouzillard: produtos com IA construídos com specs, squads de agentes e um backend que decide.',
};

export const principios = [
  {
    titulo: 'A IA interpreta, o backend decide',
    texto:
      'O modelo conversa, entende e propõe. Regras, cálculos, permissões e gravação ficam em código validado e testado.',
  },
  {
    titulo: 'Humano no circuito',
    texto:
      'Nada sai sem aprovação: campanha, vídeo ou mudança de método. A automação acelera, a decisão final continua sendo de uma pessoa.',
  },
  {
    titulo: 'Spec é a fonte da verdade',
    texto:
      'Cada produto começa em especificação versionada. Squads de agentes (Claude Code) implementam por issue, PR, CI e evidência.',
  },
  {
    titulo: 'Prova, não opinião',
    texto:
      'Fontes rastreáveis, testes, gates de CI e observabilidade. Se não dá para verificar, não está pronto.',
  },
];

// Linha do tempo: do garoto apaixonado por tecnologia ao maestro de squads de agentes
export const trajetoria = [
  { ano: '2017', titulo: 'O primeiro commit foi um chatbot', texto: 'joseph: um bot em Hubot para o Slack. A conversa com máquinas começou aqui.', maquina: 'hubot · coffeescript' },
  { ano: '2018–20', titulo: 'Front-end e o gosto por padrões', texto: 'Angular, React, guias de nomenclatura e filas em Node. Aprendendo a nomear as coisas.', maquina: 'angular · react · node · bull' },
  { ano: '2022–25', titulo: 'Back-end sério', texto: 'Java, Go e sistemas que precisam dar certo: saúde, pagamentos, notícias do STF.', maquina: 'java · go · postgres' },
  { ano: '2026', titulo: 'A oficina de agentes', texto: 'Quatro produtos em paralelo, cerca de 900 PRs no ano, cada um com sua equipe de agentes e um carimbo humano no fim.', maquina: 'claude code · mcp · gcp · opentofu' },
];
