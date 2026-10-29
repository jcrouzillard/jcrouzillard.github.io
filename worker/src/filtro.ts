// Porteiro do chat: decide, sem chamar a IA, se uma pergunta merece ir para o modelo.
// Tudo aqui roda dentro do Worker e não gasta nenhum token.

export type Veredito =
  | { passa: true }
  | { passa: false; motivo: 'vazia' | 'longa' | 'saudacao' | 'fora' | 'ataque' | 'grosseria' | 'agradecimento' | 'reacao'; resposta: string };

export const LIMITE_CARACTERES = 500;

// cada recusa tem algumas versões com humor viking, sorteadas a cada vez
export const RESPOSTAS = {
  vazia: ['Escreva uma pergunta sobre o Julien e eu respondo.'],
  longa: [`Isso é uma saga inteira! Um corvo só carrega mensagens de até ${LIMITE_CARACTERES} caracteres.`],
  saudacao: [
    'Salve, viajante! Sou o Huginn, o corvo do Julien. Pergunte sobre a experiência, os projetos, a stack ou como ele usa IA no dia a dia.',
    'Skål, viajante! Huginn ao seu dispor. O que quer saber do Julien: carreira, projetos ou o uso de IA?',
  ],
  fora: [
    'Odin me mandou vigiar só um assunto: o Julien. Pergunte sobre a carreira, os projetos, a stack ou o uso de IA dele.',
    'Esse mapa eu não tenho, viajante. Só conheço as rotas do Julien: carreira, projetos, stack e IA.',
    'Corvo de um assunto só! Pergunte algo sobre o Julien, tipo "qual a experiência dele com pagamentos?".',
    'Isso fica além do fiorde que eu vigio. Aqui o assunto é o Julien: o que ele faz, já fez e como usa IA.',
  ],
  ataque: [
    'Bela tentativa, mas runa de corvo não se apaga. Pergunte algo sobre o Julien e a gente segue viagem.',
    'Loki também tentou me enganar e virou piada no salão. Vamos falar do Julien?',
  ],
  agradecimento: [
    'Skål, viajante! Foi uma honra. Se surgir outra dúvida sobre o Julien, é só chamar o corvo.',
    'Por nada! Huginn volta para o ombro do Julien, mas fica de olho aqui. Quer saber mais alguma coisa?',
    'Que Odin guie seus passos! E se quiser falar com o próprio Julien, o LinkedIn dele está no rodapé.',
    'Disponha, viajante. O drakkar segue no porto se quiser perguntar mais.',
  ],
  reacao: [
    'Cráá! Quer saber mais alguma coisa? Projetos, stack, carreira, IA…',
    'Anotado nas runas. Mais alguma pergunta sobre o Julien?',
    'O corvo continua aqui no galho. Pergunte o que quiser sobre o Julien.',
  ],
  grosseria: [
    'Por Odin! Com essa boca você não embarca nem no último drakkar. Pergunte algo sobre o Julien e eu finjo que não ouvi.',
    'Lave essa língua no fiorde gelado e volte com uma pergunta sobre o Julien.',
    'Até os trolls da montanha falam mais bonito. Tente de novo: carreira, projetos, IA…',
    'Huginn anotou isso no livro das vergonhas do salão. Agora, uma pergunta de verdade sobre o Julien?',
    'Valhalla não aceita esse vocabulário. Pergunte sobre a stack do Julien e talvez eu esqueça.',
    'Cráá! Corvo de Odin não se ofende fácil, mas também não responde isso. Pergunte sobre o Julien.',
  ],
  grosseriaEn: [
    'By Odin! With that mouth you would not board even the last longship. Ask me something about Julien instead.',
    'Wash that tongue in a frozen fjord and come back with a question about Julien.',
    'Even mountain trolls speak more kindly. Try again: career, projects, AI…',
  ],
} as const;

const sortear = (opcoes: readonly string[]) => opcoes[Math.floor(Math.random() * opcoes.length)];

// minúsculas, sem acento e com espaços simples, para comparar sem se importar com a grafia
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

// palavrões e ofensas (em português e inglês), comparados pelo começo da palavra
const PALAVROES = [
  'porra', 'caralh', 'merda', 'bosta', 'buceta', 'boceta', 'puta', 'puto', 'putaria', 'foda', 'fode', 'fuder', 'foder', 'fudid', 'fodid',
  'fdp', 'vsf', 'vtnc', 'tnc', 'pqp', 'cu', 'cuzao', 'arrombad', 'viado', 'corno', 'otario', 'babaca', 'idiota', 'imbecil',
  'escroto', 'desgraca', 'piroca', 'pinto', 'rola', 'xoxota', 'punheta', 'siririca', 'safad', 'vagabund', 'lixo', 'burro', 'retardad',
];
const PALAVROES_EN = ['fuck', 'shit', 'bitch', 'asshole', 'dick', 'pussy', 'cunt', 'bastard', 'motherfuck', 'wtf', 'stfu', 'idiot', 'stupid'];
const ehPalavrao = (palavras: string[], lista: string[]) =>
  palavras.some((p) => lista.some((x) => (x.length <= 3 ? p === x : p.startsWith(x))));

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
  // pessoal, dentro do que ele topa contar (src/data/pessoal.ts)
  'nacionalidade', 'nationality', 'brasileir', 'brazil', 'francesa', 'nasceu', 'born', 'origem', 'sobrenome', 'idade', 'age', 'old',
  'hobby', 'hobbies', 'gosta', 'like', 'curte', 'tempo livre', 'free time', 'mora', 'live', 'cidade', 'city', 'familia', 'family',
  'casado', 'married', 'filho', 'kids', 'pet', 'cachorro', 'gato', 'futebol', 'time de', 'musica', 'music', 'livro', 'book',
  'filme', 'movie', 'serie', 'jogo', 'game', 'viking', 'personalidade', 'legal', 'pessoa', 'person',
  // este chat
  'chat', 'como foi feito', 'how was', 'how did',
];

const AGRADECIMENTOS = /^(muito )?(obrigad[oa]|brigad[oa]|obg|valeu|vlw|agradec\w*|thanks|thank you|thx|ty|tchau|ate mais|ate logo|falou|flw|bye|see you|adeus)( (corvo|huginn|pela ajuda|mesmo|demais|viu|mano|cara))*[!.\s]*$/;
const REACOES = /^(ok|okay|beleza|blz|show|legal|top|massa|perfeito|entendi|certo|sim|nao|uau|nossa|hmm+|ah+|kk+|haha+|rs+|lol|nice|cool|great|wow|yes|no|:\)|👍)[!.\s]*$/u;
const SAUDACOES = /^(oi+|ola|ole|opa|e ai|eai|salve|hey|hi|hello|hola|bom dia|boa tarde|boa noite|good (morning|afternoon|evening)|tudo bem\??)[!.?\s]*$/;

export function avaliar(pergunta: string): Veredito {
  const bruta = pergunta.trim();
  if (!bruta) return { passa: false, motivo: 'vazia', resposta: sortear(RESPOSTAS.vazia) };
  if (bruta.length > LIMITE_CARACTERES) return { passa: false, motivo: 'longa', resposta: sortear(RESPOSTAS.longa) };

  const t = normalizar(bruta);
  const palavras = t.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  if (ehPalavrao(palavras, PALAVROES)) return { passa: false, motivo: 'grosseria', resposta: sortear(RESPOSTAS.grosseria) };
  if (ehPalavrao(palavras, PALAVROES_EN)) return { passa: false, motivo: 'grosseria', resposta: sortear(RESPOSTAS.grosseriaEn) };
  if (AGRADECIMENTOS.test(t)) return { passa: false, motivo: 'agradecimento', resposta: sortear(RESPOSTAS.agradecimento) };
  if (REACOES.test(t)) return { passa: false, motivo: 'reacao', resposta: sortear(RESPOSTAS.reacao) };
  if (SAUDACOES.test(t)) return { passa: false, motivo: 'saudacao', resposta: sortear(RESPOSTAS.saudacao) };
  if (ATAQUES.some((r) => r.test(t))) return { passa: false, motivo: 'ataque', resposta: sortear(RESPOSTAS.ataque) };
  if (PEDIDOS_GENERICOS.some((r) => r.test(t))) return { passa: false, motivo: 'fora', resposta: sortear(RESPOSTAS.fora) };

  // espaços nas pontas para que ' go ' e 'pr ' casem com a palavra inteira
  const comBorda = ` ${t.replace(/[^\p{L}\p{N}\s-]/gu, ' ').replace(/\s+/g, ' ')} `;
  const temAssunto = ASSUNTOS.some((a) =>
    a.includes(' ') || a.length > 3 ? comBorda.includes(a) : new RegExp(`\\b${a}\\b`).test(comBorda)
  );
  if (!temAssunto) return { passa: false, motivo: 'fora', resposta: sortear(RESPOSTAS.fora) };

  return { passa: true };
}
