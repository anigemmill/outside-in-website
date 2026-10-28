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
  },

  /** 6 · Approach. Stages come from src/data/approach.ts. There are five stages
      and four stage images, so stage 05 reuses image 04 until a fifth exists. */
  approach: {
    label: 'Approach',
    title: 'How a project runs',
    images: ['stage-01', 'stage-02', 'stage-03', 'stage-04', 'stage-04'],
  },

  /** 7 · Social gallery: posts Ani sent (28 Oct 2026). Seven or more show as the
      curved ring; fewer as a straight row. image is the post (or a reel's cover);
      video is the reel, in public/media/. previewOnly: still to confirm (client
      name or permission), so previews only. */
  social: {
    label: 'On social',
    title: 'Made for the feed',
    posts: [
      { image: 'social-01', client: 'Ride Retreat', campaign: 'This is your sign' },
      { image: 'social-02', video: '/media/social-nzmaci-kupu.mp4', client: 'NZMACI', campaign: 'Ngā kupu o NZMACI' },
      { image: 'social-03', client: 'Flavours of Plenty Festival', campaign: 'Submissions open, 2026' },
      // Who the reel was for isn't confirmed yet: preview only until it is.
      { image: 'social-04', video: '/media/social-truffle-season.mp4', client: 'Trufflewood, Paengaroa', campaign: 'Peak truffle season', previewOnly: true },
    ] as Array<{ image: string; video?: string; client: string; campaign: string; previewOnly?: boolean }>,
  },

  /** 8 · Call to action card. */
  cta: {
    line: 'Got an idea? Let’s make it real.',
    button: 'Book a discovery call',
  },
};
