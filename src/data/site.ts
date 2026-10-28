// Dados pessoais e textos gerais do site. Edite aqui.
export const site = {
  nome: 'Julien Crouzillard',
  titulo: 'Engenheiro backend sênior · Engenharia de Plataforma · IA aplicada',
  epiteto: 'Jarl de uma tripulação de agentes', // o chefe do barco: decide, carimba, responde
  local: 'São Paulo, Brasil',
  github: 'https://github.com/jcrouzillard',
  linkedin: 'https://www.linkedin.com/in/julien-crouzillard-34147a108/',
  email: '', // deixe vazio para não expor
  descricao:
    'Portfólio de Julien Crouzillard: engenheiro backend sênior (Java, Go) com mais de 20 anos em tecnologia, Engenharia de Plataforma e produtos com IA construídos com specs, squads de agentes e um backend que decide.',
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

// Linha do tempo: dos primeiros sites ao maestro de squads de agentes (fonte: currículo 2026)
export const trajetoria = [
  { ano: '2003–09', titulo: 'Os primeiros sites', texto: 'Mais de 40 sites para pequenas empresas e artistas, portais em PHP para um projeto educacional e para a Unifesp. Foi ali que virei programador.', maquina: 'php · mysql · javascript · flash' },
  { ano: '2009–11', titulo: 'Começo no coração dos pagamentos', texto: 'Na 2RP, Java Web para o Bradesco: autorizador de meios de pagamento, conciliação, antifraude e lista restritiva.', maquina: 'java web · awb · pdc' },
  { ano: '2011–17', titulo: 'O banco por dentro', texto: 'Prime IT e Foursys: abertura de contas, terminal financeiro, intranet e integrações com mainframe. De analista a líder técnico do time.', maquina: 'java · spring · jsf · struts · websphere' },
  { ano: '2017–21', titulo: 'Full stack, faculdade e o primeiro bot', texto: 'Aplicações web para banco e varejo (Prime IT, CIDIC, Riachuelo), Gestão de Sistemas de Informação na FIAP e um chatbot no Slack por diversão.', maquina: 'java · javascript · angular · react · hubot' },
  { ano: '2021–25', titulo: 'Escala de verdade', texto: 'No Mercado Livre, e-commerce, pagamentos e backoffice de alto volume: arquitetura orientada a eventos, decisões de arquitetura e incidentes resolvidos com observabilidade.', maquina: 'java · quarkus · go · kafka · debezium · k8s · datadog' },
  { ano: '2025–', titulo: 'Engenharia de Plataforma', texto: 'No Bradesco, avalio, proponho e evoluo tecnologias e ferramentas internas para os times de desenvolvimento, com IA aplicada à produtividade e à developer experience.', maquina: 'plataforma · devex · ia aplicada' },
  { ano: '2026', titulo: 'A oficina de agentes', texto: 'Fora do expediente, quatro produtos em paralelo, mais de 890 PRs no ano, cada um com sua equipe de agentes e um carimbo humano no fim.', maquina: 'claude code · mcp · gcp · opentofu' },
];
