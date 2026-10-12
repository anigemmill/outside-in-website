/**
 * SERVICES
 * Edit service copy here. The order runs from the outside (what people see)
 * to the inside (what makes it work), which is how the site lays them out.
 * `id` values are used as portfolio categories, so keep them stable.
 */

export type ServiceId = 'design-creative' | 'marketing-growth' | 'ai-systems';

export interface Service {
  id: ServiceId;
  number: string;
  layer: 'Outside' | 'Between' | 'Inside';
  name: string;
  short: string;
  lead: string;
  problems: string[];
  includes: string[];
  outcomes: string[];
}

export const services: Service[] = [
  {
    id: 'design-creative',
    number: '01',
    layer: 'Outside',
    name: 'Design & Creative',
    short: 'Brand, web, campaign and event creative that people remember for the right reasons.',
    lead: 'Make the first impression the right one, everywhere people meet you.',
    problems: [
      'Your brand looks fine, and fine is forgettable.',
      'Every touchpoint looks slightly different.',
      'The website looks good but doesn’t turn visitors into enquiries.',
      'An event is coming and the content plan is a blank page.',
    ],
    includes: [
      'Graphic design and visual communication',
      'Brand identity, guidelines and templates',
      'Website design and digital experiences',
      'Campaign concepts and creative',
      'Event branding and content creation',
      'Print, signage and collateral',
    ],
    outcomes: [
      'A visual system your team can apply without calling us',
      'A website designed around the one action you need visitors to take',
      'Event content planned before the day and delivered while it still matters',
    ],
  },
  {
    id: 'marketing-growth',
    number: '02',
    layer: 'Between',
    name: 'Marketing & Growth',
    short: 'Strategy, campaigns and content tied to a commercial goal you can measure.',
    lead: 'Get the right people to notice, and give them a reason to act.',
    problems: [
      'Plenty of marketing activity, no clear goal behind it.',
      'Content that fills a calendar but doesn’t move bookings or enquiries.',
      'Lots of data, very little insight.',
      'A slow season you plan around every year instead of fixing.',
    ],
    includes: [
      'Marketing and campaign strategy',
      'Audience, market and competitor research',
      'Content strategy and production',
      'Social, search and paid channel planning',
      'Visibility in search engines and AI answer tools',
      'Performance reporting and optimisation',
    ],
    outcomes: [
      'A plan tied to a commercial goal, with the measure agreed up front',
      'Campaigns built around what your audience actually cares about',
      'Reporting that ends with a recommendation',
    ],
  },
  {
    id: 'ai-systems',
    number: '03',
    layer: 'Inside',
    name: 'AI & Systems',
    short: 'Find where AI genuinely pays off, then build it into how your business runs.',
    lead: 'Practical AI: chosen for a reason, built into real workflows, owned by your team.',
    problems: [
      'Your team is curious about AI, but nobody owns it.',
      'Repetitive admin eats hours that should go to customers.',
      'You have reports and data but no time to read them.',
      'You’ve tried AI tools that nobody kept using.',
    ],
    includes: [
      'AI opportunity audit and practical roadmap',
      'AI agents for research, enquiries and internal knowledge',
      'Workflow automation across the tools you already use',
      'Marketing intelligence and automated reporting',
      'AI-enabled customer experiences: assistants, recommendations, personalised content',
      'Training, documentation and handover',
    ],
    outcomes: [
      'A ranked list of AI opportunities, with effort and value spelled out',
      'Working automations in tools your team already uses',
      'Time saved, measured against a baseline we agree at the start',
      'A team that understands the system and knows when to override it',
    ],
  },
];

export const serviceById = Object.fromEntries(services.map((s) => [s.id, s])) as Record<ServiceId, Service>;

/** Ways services combine into a single engagement. Illustrative, not packages with fixed prices. */
export const combinations = [
  {
    name: 'Launch',
    for: 'New businesses, products and rebrands',
    mix: ['Brand identity', 'Website', 'Launch campaign', 'Automated enquiry handling'],
  },
  {
    name: 'Grow',
    for: 'Established businesses that want more from their marketing',
    mix: ['Campaign strategy', 'Content system', 'Channel plan', 'Weekly AI performance brief'],
  },
  {
    name: 'Modernise',
    for: 'Teams buried in admin or unsure where AI fits',
    mix: ['AI opportunity audit', 'Workflow automation', 'Team training', 'Refreshed customer touchpoints'],
  },
];

export const partnership = {
  name: 'Ongoing partnership',
  lead: 'A standing creative, marketing and AI team, without hiring one.',
  points: [
    'Monthly priorities agreed together',
    'One point of contact across every discipline',
    'Work that builds on last month’s instead of starting over',
  ],
};
