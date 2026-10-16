/**
 * HOMEPAGE COPY
 * Edit the words on the homepage here. Layout lives in src/pages/index.astro and
 * the section components in src/components/home/.
 *
 * Anything in [square brackets] is a placeholder for Ani to write or confirm.
 * Don't publish to production while brackets remain (see docs/homepage-v2-spec.md).
 */
export const home = {
  hero: {
    // The hero is the animated logo. This is the one line beneath it.
    descriptor: 'Creative, marketing and AI studio · Aotearoa New Zealand',
  },

  intro: {
    statement: 'We see your business from the outside, then build what it needs on the inside.',
    lede: 'One team for brand, marketing and practical AI.',
  },

  /** 04 Project stack. Placeholder entries until real website screenshots arrive. */
  stack: {
    label: 'Selected work',
    // One entry per stack image (stack-01 … stack-10). Link to the project page once it exists.
    projects: Array.from({ length: 10 }, (_, i) => ({
      image: `stack-${String(i + 1).padStart(2, '0')}`,
      client: `[Project ${i + 1}]`,
      type: '[Type]',
      href: '/work/',
    })),
  },

  /** 03 Featured work. The two projects come from the portfolio (featured: true). */
  featured: {
    title: 'Featured work',
    // What the inside layer shows, per featured slot.
    inside: ['[what it is]', '[what it is]'],
    note: 'Concept projects are clearly labelled. Client work is added with permission.',
  },

  /** 05 Drift field. */
  drift: {
    label: 'How we work',
    line: 'From the inside out: [one line on how a project runs].',
  },

  /** 06 Notched service cards. Card names and notes need Ani's confirmation. */
  services: {
    title: 'What we do',
    cards: {
      'design-creative': [
        { slug: 'brand-identity', name: 'Brand identity', note: 'Identity, guidelines, templates' },
        { slug: 'campaign-creative', name: 'Campaign creative', note: 'Concepts and creative' },
        { slug: 'web-design', name: 'Web design', note: 'Websites and digital experiences' },
      ],
      'marketing-growth': [
        { slug: 'social-media', name: 'Social media', note: 'Social channel planning' },
        { slug: 'search-ai-visibility', name: 'Search + AI visibility', note: 'Search engines and AI answer tools' },
        { slug: 'content', name: 'Content', note: 'Content strategy and production' },
      ],
      'ai-systems': [
        { slug: 'ai-agents', name: 'AI agents', note: 'Research, enquiries, internal knowledge' },
        { slug: 'automation', name: 'Automation', note: 'Across the tools you already use' },
        { slug: 'reporting', name: 'Reporting', note: 'Marketing intelligence, automated' },
      ],
    },
  },

  /** 07 Colour card strip. Ani writes the beliefs; don't invent them. */
  beliefs: {
    title: 'How we think',
    cards: ['[Belief statement one]', '[Belief statement two]', '[Belief statement three]', '[Belief statement four]'],
  },

  /** 08 Line-by-line statements. Taken from the service descriptions in services.ts. */
  statements: {
    title: 'What we do, in a line',
    trail: ['Brand', 'Social', 'Search', 'AI', 'Web', 'Content', 'Systems'],
  },

  /** 09 Social fan. Only posts Ani has the rights to show. */
  social: {
    title: 'On social',
    posts: Array.from({ length: 7 }, (_, i) => ({
      image: `social-0${i + 1}`,
      client: '[Client]',
      campaign: '[Campaign]',
    })),
  },

  /** 10 Call to action card. */
  cta: {
    line: 'Got an idea? Let’s make it real.',
    button: 'Let’s talk',
  },
};
