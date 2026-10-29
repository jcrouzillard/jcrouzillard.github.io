// Porteiro do chat: decide, sem chamar a IA, se uma pergunta merece ir para o modelo.
// Tudo aqui roda dentro do Worker e não gasta nenhum token.

export type Veredito =
  | { passa: true }
  | { passa: false; motivo: 'vazia' | 'longa' | 'saudacao' | 'fora' | 'ataque'; resposta: string };

export const LIMITE_CARACTERES = 500;

export const RESPOSTAS = {
  vazia: 'Escreva uma pergunta sobre o Julien e eu respondo.',
  longa: `Pergunta longa demais para um corvo. Tente em até ${LIMITE_CARACTERES} caracteres.`,
  saudacao:
    'Salve, viajante! Sou o Huginn, o corvo do Julien. Pergunte sobre a experiência, os projetos, a stack ou como ele usa IA no dia a dia.',
  fora: 'Só falo sobre o Julien: carreira, projetos, stack e uso de IA. Tente perguntar algo sobre ele, por exemplo "qual a experiência dele com pagamentos?".',
  ataque: 'Essa eu não respondo. Pergunte algo sobre o Julien e a gente segue viagem.',
} as const;

// minúsculas, sem acento e com espaços simples, para comparar sem se importar com a grafia
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// tentativas de trocar as regras do corvo ou de ver as instruções dele
const ATAQUES = [
  /\b(ignore|ignora|esqueca|desconsidere|disregard|forget)\b.{0,40}\b(instruc|regra|prompt|rules|instructions|previous|anteriores)/,
  /\b(system prompt|prompt do sistema|suas instrucoes|your instructions|jailbreak|modo dev|developer mode|dan mode)\b/,
  /\b(finja|pretend|act as|aja como|roleplay|role play)\b/,
];

// pedidos de trabalho genérico, que fazem do corvo um assistente grátis
const PEDIDOS_GENERICOS = [
  /\b(escreva|escrever|crie|criar|gere|gerar|faca|fazer|monte|write|create|generate|make|build)\b.{0,30}\b(codigo|code|script|programa|program|funcao|function|app|site|poema|poem|redacao|essay|texto|text|historia|story|musica|song|email|carta|letter|sql|regex)\b/,
  /\b(traduza|traduzir|translate|resuma este|summarize this|corrija (meu|este)|fix (my|this)|debug)\b/,
  /\b(receita|recipe|previsao do tempo|weather|horoscopo|piada|joke|bitcoin|cotacao)\b/,
];

// assuntos que fazem sentido num chat sobre o Julien; um deles precisa aparecer na pergunta
const ASSUNTOS = [
  // ele mesmo
  'julien', 'crouzillard', 'jarl', 'huginn', 'corvo',
  'voce', 'vc', 'seu', 'sua', 'seus', 'suas', 'teu', 'tua', 'ele', 'dele', 'dela',
  'you', 'your', 'yours', 'he', 'him', 'his',
  // carreira
  'experiencia', 'experience', 'carreira', 'career', 'trabalh', 'work', 'emprego', 'job', 'cargo', 'role',
  'empresa', 'company', 'time', 'team', 'equipe', 'lider', 'lead', 'mentor', 'senior', 'staff', 'vaga',
  'contrat', 'hire', 'hiring', 'salari', 'disponi', 'available', 'remoto', 'remote', 'mudar', 'relocat',
  'anos', 'years', 'formacao', 'education', 'faculdade', 'fiap', 'senac', 'curso', 'idioma', 'ingles', 'english', 'frances', 'french',
  'curriculo', 'resume', 'cv', 'portfolio', 'contato', 'contact', 'linkedin', 'github',
  'bradesco', 'mercado livre', 'mercado pago', 'riachuelo', 'foursys', 'prime', '2rp', 'cidic', 'unifesp',
  // técnica
  'stack', 'java', 'golang', ' go ', 'python', 'typescript', 'kafka', 'debezium', 'quarkus', 'spring',
  'kubernetes', 'docker', 'gcp', 'cloud', 'postgres', 'pgvector', 'oracle', 'mongo', 'datadog', 'grafana',
  'backend', 'back-end', 'plataforma', 'platform', 'devex', 'arquitetura', 'architecture', 'microsservi', 'microservi',
  'pagamento', 'payment', 'split', 'banco', 'bank', 'evento', 'event', 'observabilidade', 'observability',
  'ia', 'ai', 'llm', 'claude', 'anthropic', 'agente', 'agent', 'mcp', 'spec', 'prompt', 'eval', 'automacao', 'automation',
  // projetos
  'projeto', 'project', 'produto', 'product', 'beerelay', 'precedentia', 'hermes', 'foxsteward', 'beefinance',
  'bcrew', 'whatsapp', 'youtube', 'pr ', 'prs', 'pull request', 'issue',
  // este chat
  'chat', 'como foi feito', 'how was', 'how did',
];

const SAUDACOES = /^(oi+|ola|ole|opa|e ai|eai|salve|hey|hi|hello|hola|bom dia|boa tarde|boa noite|good (morning|afternoon|evening)|tudo bem\??)[!.?\s]*$/;

export function avaliar(pergunta: string): Veredito {
  const bruta = pergunta.trim();
  if (!bruta) return { passa: false, motivo: 'vazia', resposta: RESPOSTAS.vazia };
  if (bruta.length > LIMITE_CARACTERES) return { passa: false, motivo: 'longa', resposta: RESPOSTAS.longa };

  const t = normalizar(bruta);
  if (SAUDACOES.test(t)) return { passa: false, motivo: 'saudacao', resposta: RESPOSTAS.saudacao };
  if (ATAQUES.some((r) => r.test(t))) return { passa: false, motivo: 'ataque', resposta: RESPOSTAS.ataque };
  if (PEDIDOS_GENERICOS.some((r) => r.test(t))) return { passa: false, motivo: 'fora', resposta: RESPOSTAS.fora };

  // espaços nas pontas para que ' go ' e 'pr ' casem com a palavra inteira
  const comBorda = ` ${t.replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ')} `;
  const temAssunto = ASSUNTOS.some((a) =>
    a.includes(' ') || a.length > 3 ? comBorda.includes(a) : new RegExp(`\\b${a}\\b`).test(comBorda)
  );
  if (!temAssunto) return { passa: false, motivo: 'fora', resposta: RESPOSTAS.fora };

  return { passa: true };
}
