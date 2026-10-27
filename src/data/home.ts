/**
 * HOMEPAGE COPY (v3, "Editorial")
 * Edit the words on the homepage here. Layout lives in src/pages/index.astro and
 * the section components in src/components/home/. Spec: HOMEPAGE-V3-SPEC.md.
 *
 * Anything in [square brackets] is a placeholder for Ani to write or confirm.
 * Don't publish to production while brackets remain.
 */
export const home = {
  hero: {
    // The hero is the animated logo alone. This names the page for screen readers.
    descriptor: 'Creative, marketing and AI studio · Aotearoa New Zealand',
  },

  /** 2 · Introduction: the studio line, filling word by word as you scroll. */
  intro: {
    label: 'Introduction',
    statement: 'We help brands stand out, connect with the right audiences, and grow through thoughtful strategy, creative design, and digital innovation.',
  },

  /** 3 · Selected work. Tiles from the Work page (src/data/workPage.ts), by key,
      shown exactly as they look there. */
  work: {
    label: 'Selected work',
    title: 'Selected work',
    tiles: ['flavours', 'ride-retreat', 'reido'],
  },

  /** 4 · Drift field. One sticky line (the spec leaves it for Ani; this is the
      approach in a line, from the Approach page). */
  drift: {
    label: 'How we work',
    line: 'Look from the outside, decide what matters, build it, then measure and refine.',
  },

  /** 5 · Services. Rows come from src/data/services.ts. */
  services: {
    label: 'What we do',
    title: 'Services',
    // Capability tags per discipline (from the services' own summaries).
    tags: {
      'design-creative': ['Brand', 'Web', 'Campaign creative', 'Event creative'],
      'marketing-growth': ['Strategy', 'Campaigns', 'Content', 'Search', 'Performance'],
      'ai-systems': ['AI audits', 'Agents', 'Workflow automation', 'Marketing intelligence'],
    } as Record<string, string[]>,
    images: { 'design-creative': 'service-design', 'marketing-growth': 'service-marketing', 'ai-systems': 'service-ai' } as Record<string, string>,
  },

  /** 6 · Approach. Stages come from src/data/approach.ts. There are five stages
      and four stage images, so stage 05 reuses image 04 until a fifth exists. */
  approach: {
    label: 'Approach',
    title: 'How a project runs',
    images: ['stage-01', 'stage-02', 'stage-03', 'stage-04', 'stage-04'],
  },

  /** 7 · Curved social gallery. Only posts Ani has the rights to show. */
  social: {
    label: 'On social',
    title: 'Made for the feed',
    posts: Array.from({ length: 10 }, (_, i) => ({
      image: `social-${String(i + 1).padStart(2, '0')}`,
      client: '[Client]',
      campaign: '[Campaign]',
    })),
  },

  /** 8 · Call to action card. */
  cta: {
    line: 'Got an idea? Let’s make it real.',
    button: 'Book a discovery call',
  },
};
