// Base de conhecimento do chat "pergunte ao corvo", publicada em /conhecimento.txt.
// O Worker (pasta worker/) lê este arquivo, então o chat acompanha o site sem precisar de novo deploy.
// O e-mail fica de fora de propósito: o contato indicado é o LinkedIn.
import { getCollection } from 'astro:content';
import { site, principios, trajetoria } from '../data/site';
import { curriculo } from '../data/curriculo';
import { pessoal } from '../data/pessoal';

export async function GET() {
  const projetos = (await getCollection('projetos')).sort((a, b) => a.data.ordem - b.data.ordem);
  const c = curriculo;

  const partes = [
    `# ${site.nome}`,
    `${c.titulo}. ${site.local}. ${site.epiteto}.`,
    `Contato: LinkedIn ${site.linkedin} · GitHub ${site.github} · portfólio https://${c.portfolio} · currículo em PDF https://${c.portfolio}/${c.pdf}`,

    '## Resumo',
    ...c.resumo,

    '## Experiência',
    ...c.experiencia.map((e) =>
      [`### ${e.cargo} · ${e.empresa} (${e.local}, ${e.periodo})`, ...e.itens.map((i) => `- ${i}`), e.stack ? `Stack: ${e.stack}` : '']
        .filter(Boolean)
        .join('\n')
    ),

    '## Trajetória (linha do tempo do site)',
    ...trajetoria.map((t) => `- ${t.ano} · ${t.titulo}: ${t.texto}`),

    '## Habilidades',
    ...c.habilidades.map(([area, itens]) => `- ${area}: ${itens}`),

    '## Formação',
    ...c.formacao.map((f) => `- ${f.curso} · ${f.instituicao} (${f.periodo})`),

    '## Princípios de trabalho',
    ...principios.map((p) => `- ${p.titulo}: ${p.texto}`),

    '## Lado pessoal (pode contar)',
    ...pessoal.fatos.map((f) => `- ${f}`),

    '## Jeito de responder certas perguntas pessoais',
    ...pessoal.jeito.map((j) => `- ${j}`),

    '## Limites pessoais (não responder, recusar com leveza)',
    ...pessoal.limites.map((l) => `- ${l}`),

    '## Projetos próprios',
    c.projetos.resumo,
    ...projetos.map((p) => {
      const d = p.data;
      return [
        `### ${d.nome} (${d.categoria})`,
        `${d.slogan} ${d.resumo}`,
        `Status: ${d.status}. Desde ${d.desde}. Código: ${d.visibilidade}.`,
        d.metricas.length ? `Números: ${d.metricas.map((m) => `${m.valor} ${m.rotulo}`).join('; ')}` : '',
        d.principios.length ? `Princípios: ${d.principios.join(' ')}` : '',
        d.fases.length ? `Fases: ${d.fases.map((f) => `${f.nome} (${f.status})`).join('; ')}` : '',
        `Stack: ${d.stack.join(', ')}`,
        `Página: https://${c.portfolio}/projetos/${p.id}/`,
        d.site ? `Site do produto: ${d.site}` : '',
        p.body?.trim() ?? '',
      ]
        .filter(Boolean)
        .join('\n');
    }),
  ];

  return new Response(partes.join('\n\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
