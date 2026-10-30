import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projetos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projetos' }),
  schema: ({ image }) =>
    z.object({
      nome: z.string(),
      ordem: z.number(),
      slogan: z.string(),
      resumo: z.string(),
      categoria: z.string(),
      cor: z.string(),
      logo: image().optional(),
      mascote: image().optional(),
      mascoteFala: z.string().optional(),
      capa: image().optional(),
      // privado: código fechado · em-breve: abertura planejada · publico: link para o repo
      visibilidade: z.enum(['privado', 'em-breve', 'publico']).default('privado'),
      repo: z.string().url().optional(),
      // site público do produto, quando existe
      site: z.string().url().optional(),
      status: z.string(),
      desde: z.string(),
      metricas: z.array(z.object({ valor: z.string(), rotulo: z.string() })).default([]),
      fluxo: z.array(z.object({ titulo: z.string(), detalhe: z.string(), humano: z.boolean().default(false) })).default([]),
      principios: z.array(z.string()).default([]),
      fases: z.array(z.object({ nome: z.string(), status: z.enum(['feito', 'agora', 'depois']) })).default([]),
      stack: z.array(z.string()),
      galeria: z.array(z.object({ src: image(), legenda: z.string() })).default([]),
    }),
});

export const collections = { projetos };
