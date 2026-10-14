import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * PORTFOLIO
 * One folder per project in src/content/work/<slug>/ containing index.md and its images.
 * The schema below is enforced at build time, so a missing required field fails
 * loudly instead of publishing a broken page.
 *
 * status: 'concept' → labelled "Concept" everywhere, shows objectives, never results.
 * status: 'client'  → real commissioned work. `results` should only contain verified facts.
 *                     Client projects only need a summary, cover and gallery; the longer
 *                     write-up fields (challenge, approach, developed, map) are optional.
 * draft: true        → kept in the repo but not published anywhere on the site.
 */
const work = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        status: z.enum(['concept', 'client']),
        client: z.string().optional(),
        sector: z.string(),
        type: z.string(),
        categories: z.array(z.enum(['design-creative', 'marketing-growth', 'ai-systems'])).min(1),
        year: z.number().optional(),
        cover: image(),
        coverAlt: z.string(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        order: z.number().default(100),
        challenge: z.string().optional(),
        approach: z.string().optional(),
        developed: z.array(z.string()).default([]),
        /** What customers see vs what runs behind it. Drives the Outside / Inside map. */
        map: z.object({ outside: z.array(z.string()), inside: z.array(z.string()) }).optional(),
        objectives: z.array(z.string()).default([]),
        results: z.array(z.string()).default([]),
        gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
        demo: z.enum(['triage']).optional(),
        seoDescription: z.string().optional(),
      })
      .refine((d) => d.status === 'client' || d.results.length === 0, {
        message: 'Concept projects cannot list results. Use `objectives` instead.',
      })
      .refine((d) => d.status === 'client' || Boolean(d.challenge && d.approach && d.developed.length && d.map), {
        message: 'Concept projects need challenge, approach, developed and map.',
      })
      .refine((d) => d.status === 'concept' || Boolean(d.client), {
        message: 'Client projects need a `client` name.',
      }),
});

export const collections = { work };
