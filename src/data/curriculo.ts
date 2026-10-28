// Currículo em formato simples, base da página /curriculo e do PDF baixável.
// Pensado para importadores de vagas (ATS): uma coluna, seções com nomes padrão, sem tabelas.
// Para regenerar o PDF depois de editar: abra /curriculo e use "Imprimir → Salvar como PDF"
// (margens padrão) ou peça para o Claude gerar de novo em public/julien-crouzillard-curriculo.pdf.
export const curriculo = {
  nome: 'Julien Crouzillard',
  titulo: 'Engenheiro Backend Sênior | Java · Go · Kafka | Plataforma | IA Aplicada',
  local: 'São Paulo, SP, Brasil',
  email: 'jcrouzillard@gmail.com',
  linkedin: 'linkedin.com/in/julien-crouzillard-34147a108',
  github: 'github.com/jcrouzillard',
  portfolio: 'jcrouzillard.github.io',
  pdf: 'julien-crouzillard-curriculo.pdf',

  resumo: [
    'Engenheiro backend sênior com mais de 20 anos em tecnologia e, desde 2009, em sistemas críticos de pagamento, banco e e-commerce de alto volume (Bradesco, Mercado Livre), com Java, Go, microsserviços e arquitetura orientada a eventos com Kafka.',
    'Hoje em Engenharia de Plataforma no Bradesco, com IA aplicada a automação, produtividade e developer experience. Fora do expediente, construo produtos próprios com squads de agentes de IA, um deles em produção na GCP.',
    'Busco posições de engenheiro sênior ou staff em backend, plataforma ou IA aplicada.',
  ],

  experiencia: [
    {
      cargo: 'Desenvolvedor Backend Java Sênior, Engenharia de Plataforma',
      empresa: 'Bradesco', local: 'São Paulo, SP', periodo: '09/2025 – Atual',
      itens: [
        'Integro o time que traz inovação ao banco e define as stacks e a forma de desenvolver de todos os devs do Bradesco, internos e terceiros.',
        'Avalio, proponho e padronizo tecnologias, ambientes e práticas de desenvolvimento, e levo sua adoção a times de desenvolvimento, arquitetura, infraestrutura e segurança.',
        'Desenvolvo produtos internos de Engenharia de Plataforma e Developer Experience, com IA aplicada a automação, produtividade e ao ciclo de desenvolvimento.',
      ],
    },
    {
      cargo: 'Analista de Sistemas Sênior',
      empresa: 'Mercado Livre', local: 'São Paulo, SP', periodo: '04/2021 – 07/2025',
      itens: [
        'Carrinho do Mercado Livre com split payment: um único pagamento do comprador dividido entre os vários vendedores do pedido.',
        'Core de pagamentos do Mercado Livre e do Mercado Pago, incluindo pagamentos e repasses aos vendedores, com foco em volume, latência e incidentes.',
        'Serviços com mensageria e arquitetura orientada a eventos (Kafka, Debezium), observabilidade, performance tuning e resposta a incidentes em serviços críticos.',
        'Decisões arquiteturais, desenho de soluções, documentação técnica, revisão de código e definição de padrões.',
      ],
      stack: 'Java, Quarkus, Go, Python, Kafka, Debezium, PostgreSQL, Oracle, MongoDB, Docker, Kubernetes, Jenkins, Git, Datadog, Grafana, Kibana',
    },
    {
      cargo: 'Desenvolvedor Full Stack',
      empresa: 'Lojas Riachuelo', local: 'São Paulo, SP', periodo: '07/2019 – 03/2021',
      itens: ['Aplicações web full stack para processos internos e soluções de varejo, com evolução de sistemas corporativos.'],
      stack: 'Java, HTML, JavaScript',
    },
    {
      cargo: 'Desenvolvedor Full Stack Java',
      empresa: 'CIDIC Consultoria de TI', local: 'São Paulo, SP', periodo: '02/2019 – 07/2019',
      itens: ['Soluções Java Web para clientes corporativos, com foco em integrações e aplicações internas.'],
    },
    {
      cargo: 'Desenvolvedor Full Stack',
      empresa: 'Prime IT Services (cliente Bradesco)', local: 'São Paulo, SP', periodo: '12/2017 – 02/2019',
      itens: ['Aplicações Java, sistemas financeiros e plataformas internas para o Bradesco.'],
    },
    {
      cargo: 'Líder Técnico / Analista Java Sênior',
      empresa: 'Foursys (cliente Bradesco)', local: 'São Paulo, SP', periodo: '07/2016 – 12/2017',
      itens: [
        'Liderança técnica do time de desenvolvimento: priorização, distribuição de demandas, revisão técnica e qualidade das entregas.',
        'Sistemas de crédito do Bradesco em Java Web, Desktop e Webservices: regras de crédito, consignado, limites operacionais e rating de clientes.',
      ],
      stack: 'Java, Struts, JSF, JSP, jQuery, WebSphere, Tomcat, JBoss, Jenkins, SonarQube, Git',
    },
    {
      cargo: 'Analista de Desenvolvimento (até Sênior)',
      empresa: 'Prime IT Services (cliente Bradesco)', local: 'São Paulo, SP', periodo: '07/2011 – 07/2016',
      itens: [
        'Abertura de contas (terminal financeiro e intranet), contratos PF e PJ, firmas e poderes e mensageria entre câmaras bancárias, com integração ao mainframe.',
      ],
      stack: 'Java, Spring, JSF, Struts, JSP, EJB, Swing, WebSphere, Tomcat',
    },
    {
      // começo de carreira num bloco só, para não picar o currículo
      cargo: 'Início de carreira: desenvolvedor web e Java',
      empresa: '2RP, Unifesp, SCA-Educandus, Cash & Market', local: 'São Paulo, SP', periodo: '06/2003 – 07/2011',
      itens: [
        'Web em PHP, MySQL, JavaScript e Flash: mais de 40 sites para pequenas empresas (2003–05) e portais para um projeto educacional e para a Unifesp (2005–08).',
        '2RP (12/2009 – 07/2011): Java Web para o Bradesco em autorizador de pagamentos, conciliação, lista restritiva e antifraude.',
      ],
      stack: 'Java, PHP, MySQL, JavaScript, XML/XSL, Flash/ActionScript',
    },
  ],

  projetos: {
    resumo: 'Produtos próprios com IA (2026), feitos com specs versionadas e squads de agentes (Claude Code), com aprovação humana em cada PR. Estudos de caso no portfólio.',
    itens: [
      'BeeRelay: CRM de marketing e gateway multi-tenant de WhatsApp em produção na GCP, com IA na criação, aprovação humana obrigatória e envio pela API oficial.',
      'Precedentia: motor verificável de precedentes jurídicos em Go e pgvector, em que toda resposta aponta para a decisão e a fonte oficial.',
      'Hermes: produtora de vídeos para o YouTube com 11 agentes de IA e aprovação humana nas etapas-chave, com cerca de 1h30 de trabalho humano por semana.',
      'FoxSteward e BeeFinance (fase inicial): governança de projetos feitos por agentes e finanças no WhatsApp.',
    ],
  },

  habilidades: [
    ['Linguagens', 'Java, Go, Python, TypeScript, JavaScript'],
    ['Backend', 'Quarkus, Spring, FastAPI, Node.js, JSF, Struts, JSP, Servlets'],
    ['Arquitetura', 'Microsserviços, arquitetura orientada a eventos, sistemas distribuídos, APIs e integrações'],
    ['Mensageria', 'Kafka, Debezium, publish/subscribe, event streaming'],
    ['Dados', 'PostgreSQL, pgvector, Oracle, MongoDB, modelagem e tuning de queries'],
    ['Observabilidade', 'Datadog, Grafana, Kibana, logs, métricas, traces, dashboards e alertas'],
    ['DevOps e nuvem', 'Docker, Kubernetes, Jenkins, GitHub Actions, GCP Cloud Run, OpenTofu, SonarQube, Git'],
    ['IA aplicada', 'Claude e Anthropic SDK, Claude Code, MCP, tool calling, evals, automação com agentes'],
    ['Plataforma', 'Engenharia de Plataforma, Developer Experience, ferramentas internas'],
  ],

  formacao: [
    { curso: 'Tecnólogo em Gestão de Sistemas de Informação', instituicao: 'FIAP', periodo: 'concluído em 2018' },
    { curso: 'Graduação em Sistemas de Informação', instituicao: 'Senac', periodo: 'concluída' },
  ],
};
