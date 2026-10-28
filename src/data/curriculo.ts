// Currículo em formato simples, base da página /curriculo e do PDF baixável.
// Pensado para importadores de vagas (ATS): uma coluna, seções com nomes padrão, sem tabelas.
// Para regenerar o PDF depois de editar: abra /curriculo e use "Imprimir → Salvar como PDF"
// (margens padrão) ou peça para o Claude gerar de novo em public/julien-crouzillard-curriculo.pdf.
export const curriculo = {
  nome: 'Julien Crouzillard',
  titulo: 'Engenheiro Backend Sênior | Java · Go · Kafka | Engenharia de Plataforma | IA Aplicada',
  local: 'São Paulo, SP, Brasil',
  email: 'jcrouzillard@gmail.com',
  linkedin: 'linkedin.com/in/julien-crouzillard-34147a108',
  github: 'github.com/jcrouzillard',
  portfolio: 'jcrouzillard.github.io',
  pdf: 'julien-crouzillard-curriculo.pdf',

  resumo: [
    'Engenheiro backend sênior com mais de 20 anos em tecnologia e mais de 12 anos dedicados ao desenvolvimento de software para meios de pagamento, sistemas bancários, plataformas financeiras, e-commerce de alto volume e aplicações de alta criticidade.',
    'Atualmente em Engenharia de Plataforma no Bradesco, avaliando, propondo e evoluindo tecnologias, ambientes e produtos internos usados pelos times de desenvolvimento, com forte uso de Inteligência Artificial aplicada a automação, produtividade e developer experience.',
    'Experiência em microsserviços, arquitetura orientada a eventos, integrações corporativas, observabilidade, troubleshooting e sustentação de sistemas de alto volume, em colaboração com times de arquitetura, infraestrutura, segurança, produto e QA.',
  ],

  experiencia: [
    {
      cargo: 'Desenvolvedor Backend Java Sênior, Engenharia de Plataforma',
      empresa: 'Bradesco', local: 'São Paulo, SP', periodo: '09/2025 – Atual',
      itens: [
        'Avaliação, proposição e evolução de tecnologias, ambientes e padrões técnicos para uso corporativo.',
        'Desenvolvimento de produtos e soluções internas de Engenharia de Plataforma e Developer Experience.',
        'Uso aplicado de Inteligência Artificial para automação, produtividade técnica, apoio ao ciclo de desenvolvimento e criação de ferramentas internas.',
        'Colaboração com times de desenvolvimento, arquitetura, infraestrutura e segurança para adoção de tecnologias, ambientes e boas práticas.',
      ],
    },
    {
      cargo: 'Analista de Sistemas Sênior',
      empresa: 'Mercado Livre', local: 'São Paulo, SP', periodo: '04/2021 – 07/2025',
      itens: [
        'Serviços internos e integrações para e-commerce, meios de pagamento e backoffice de grande escala e alto tráfego.',
        'Participação em decisões arquiteturais, desenho de soluções, documentação técnica, revisão de código e definição de padrões.',
        'Serviços escaláveis com mensageria, filas, pipelines de eventos e arquitetura orientada a eventos (Kafka, Debezium).',
        'Análise de incidentes, troubleshooting, observabilidade, performance tuning e sustentação de serviços críticos.',
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
        'Aplicações Java Web, Desktop e Webservices, com Scrum e Kanban.',
      ],
      stack: 'Java, Struts, JSF, JSP, WebSphere, Tomcat, JBoss, Jenkins, SonarQube, Git',
    },
    {
      cargo: 'Analista de Desenvolvimento (até Sênior)',
      empresa: 'Prime IT Services (cliente Bradesco)', local: 'São Paulo, SP', periodo: '07/2011 – 07/2016',
      itens: ['Abertura de contas, terminal financeiro, intranet e integrações com mainframe e sistemas legados.'],
      stack: 'Java, Spring, JSF, Struts, JSP, Swing, WebSphere, Tomcat',
    },
    {
      cargo: 'Analista de Desenvolvimento Júnior',
      empresa: '2RP (cliente Bradesco)', local: 'São Paulo, SP', periodo: '12/2009 – 07/2011',
      itens: ['Java Web para sistemas financeiros: autorizador de meios de pagamento, conciliação, lista restritiva e antifraude.'],
    },
  ],

  projetos: [
    'Produtos próprios com IA (2026), construídos com especificações versionadas e squads de agentes (Claude Code), com aprovação humana e evidência em cada PR: Hermes (produtora de vídeos com 11 agentes), Precedentia (motor verificável de precedentes jurídicos em Go e pgvector), BeeRelay (CRM e gateway multi-tenant de WhatsApp em produção na GCP), FoxSteward e BeeFinance. Estudos de caso em jcrouzillard.github.io.',
  ],

  habilidades: [
    ['Linguagens', 'Java, Go, Python, TypeScript, JavaScript'],
    ['Backend', 'Quarkus, Spring, FastAPI, Node.js, JSF, Struts, JSP, Servlets'],
    ['Arquitetura', 'Microsserviços, arquitetura orientada a eventos, sistemas distribuídos, APIs, integrações corporativas'],
    ['Mensageria', 'Kafka, Debezium, publish/subscribe, event streaming'],
    ['Dados', 'PostgreSQL, pgvector, Oracle, MongoDB, modelagem e tuning de queries'],
    ['Observabilidade', 'Datadog, Grafana, Kibana, logs, métricas, traces, dashboards e alertas'],
    ['DevOps e nuvem', 'Docker, Kubernetes, Jenkins, GitHub Actions, GCP Cloud Run, OpenTofu, SonarQube, Git'],
    ['IA aplicada', 'Claude e Anthropic SDK, Claude Code, MCP, tool calling, evals, automação com agentes'],
    ['Plataforma', 'Engenharia de Plataforma, Developer Experience, ferramentas internas'],
  ],

  formacao: [{ curso: 'Bacharelado em Gestão de Sistemas de Informação', instituicao: 'FIAP', periodo: '2017 – 2018' }],

  competencias: 'Liderança técnica, revisão de código, definição de padrões, documentação técnica, análise de incidentes, troubleshooting, visão sistêmica e comunicação com produto, QA, arquitetura, infraestrutura e segurança.',
};
