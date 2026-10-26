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
 *
 * Selected work (status 'client') comes from Ani's portfolio brief. It covers studio work,
 * in-house roles, collaborations and her own ventures, so pages say "Selected work", not
 * "Client work". Body = overview; approach, role, developed (deliverables), highlight and
 * scale are shown as rows. results need resultsConfirmed: true to appear on the live site;
 * until then they show only on previews, flagged for confirmation.
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
        resultsConfirmed: z.boolean().default(false),
        resultsNote: z.string().optional(),
        role: z.string().optional(),
        highlight: z.string().optional(),
        scale: z.string().optional(),
        gallery: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
        demo: z.enum(['triage']).optional(),
        // Case-study extras (Ani's case-study template, 26 Oct 2026). All optional.
        /** Pill above the title, e.g. "Our venture". */
        badge: z.string().optional(),
        /** Big opening paragraph under the title (falls back to summary). */
        intro: z.string().optional(),
        /** Short statement shown in display type as "The idea", above the body. */
        idea: z.string().optional(),
        whatWeDid: z.string().optional(),
        builtWith: z.string().optional(),
        where: z.string().optional(),
        /** Dark band with phone screens either side of a looping film. */
        showcase: z.object({ video: z.string(), poster: image(), label: z.string(), sides: z.array(z.object({ src: image(), alt: z.string() })).max(2) }).optional(),
        /** Feature facts (not results), shown as purple tiles. */
        stats: z.array(z.object({ n: z.string(), text: z.string() })).default([]),
        brand: z.object({ line: z.string(), text: z.string(), pillars: z.array(z.object({ name: z.string(), text: z.string() })) }).optional(),
        features: z.object({ title: z.string(), items: z.array(z.object({ src: image(), alt: z.string(), step: z.string(), title: z.string(), text: z.string() })) }).optional(),
        /** A result still to be supplied: shown on previews only, never live. */
        resultTodo: z.string().optional(),
        link: z.object({ href: z.string().url(), label: z.string() }).optional(),
        /** Slug of the case study to suggest next (defaults to the next in order). */
        next: z.string().optional(),
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
