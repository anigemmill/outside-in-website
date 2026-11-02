/**
 * FINDABLE: facts, sources and offers used across the /findable/ pages.
 * Edit here rather than in the pages.
 *
 * Rules (from the Findable working brief):
 * - Every published statistic links to its source and keeps its exact meaning.
 * - Plan prices and limits were agreed by Ani on 2 Nov 2026 (`plans` below).
 *   Implementation packages are indicative ranges, never fixed quotes.
 * - Describe the subscription only as far as the product delivers today; a
 *   feature that isn't built yet is marked as planned.
 * - Illustrative examples are labelled as such; no scores without a method.
 * - Findable is in pilot: don't imply it has finished or invent results.
 */

export const sources = {
  travellersUsingAi: {
    figure: '62%',
    text: 'of travellers are using AI to help decide where to go and what to do.',
    cite: 'Tourism New Zealand research, as reported by TRAVELinc, 7 August 2026',
    url: 'https://www.travelinc.co.nz/content/news/hot-topics/9724-majority-of-travellers-using-ai-but-traditional-channels-growing-too-event-hears',
  },
  guideGeek: {
    figure: '200,000+',
    text: 'unique users have tried GuideGeek, Tourism New Zealand’s AI trip-planning tool.',
    cite: 'NZ tourism research summary, July 2026 (zhangyuqian.com)',
    url: 'https://zhangyuqian.com/nz-tourism-nowcasting/summary.html',
  },
  excited: {
    figure: '81%',
    text: 'of surveyed New Zealand consumers said they were excited about AI.',
    cite: 'Booking.com research, as reported by IT Brief New Zealand, July 2025',
    url: 'https://itbrief.co.nz/story/kiwis-embrace-ai-in-travel-but-trust-caution-remain-high',
  },
  concerned: {
    figure: '92%',
    text: 'of the same group reported at least one concern about how AI is used.',
    cite: 'Booking.com research, as reported by IT Brief New Zealand, July 2025',
    url: 'https://itbrief.co.nz/story/kiwis-embrace-ai-in-travel-but-trust-caution-remain-high',
  },
};

export const freeCheck = {
  questions: 3,
  // Publish only while Ani can consistently meet it.
  delivery: 'We’ll send it within one working day.',
  includes: [
    'Three traveller-style questions for your region and category, put to AI assistants',
    'Whether you’re mentioned, recommended and described accurately in each answer',
    'Any wrong or missing details we find about your business',
    'Your top fixes, in plain English',
  ],
};

export const offers = [
  {
    id: 'check',
    name: 'Free AI visibility check',
    price: 'Free',
    note: 'One-off · one per business',
    blurb: 'A branded mini-report showing what AI tools say about your business when travellers ask.',
    items: freeCheck.includes,
    cta: { href: '/findable/check/', label: 'Get my free check' },
  },
  {
    id: 'subscription',
    name: 'Monthly subscription',
    price: 'From $99 a month',
    note: 'Month to month · cancel any time',
    blurb: 'Ongoing support to act on what the check finds, through the Findable platform. Four plans, from Starter to Enterprise.',
    // What the Findable app does on every plan today.
    items: [
      'Regular AI visibility analyses for your business',
      'Brand mentions, citations and competitor comparisons',
      'Prioritised recommendations for your website and content',
      'PDF reports to download and share, and your own sign-in',
    ],
    cta: { href: '/findable/pricing/', label: 'Compare plans' },
  },
  {
    id: 'done-for-you',
    name: 'Done-for-you optimisation',
    price: 'From $3,000',
    note: 'Indicative · scoped and quoted before work starts',
    blurb: 'Short on time? We make the changes on your website and listings for you.',
    items: [
      'We fix what the check or your action plan turns up',
      'A written scope and price for the work before we start',
    ],
    cta: { href: '/findable/pricing/#packages', label: 'See the packages' },
  },
];

export const pilot = {
  title: 'An ongoing pilot in Rotorua',
  text: 'Findable is being piloted with 10 tourism operators in Rotorua. Audits are still under way, so there are no final results yet. We’re using the pilot to test the method and the delivery time, and we’ll share findings with the sample size, dates, AI tools and method spelled out.',
};

/*
 * PLANS. Mirrors the Findable app, where the app enforces them:
 * anigemmill/Tourism-AI-Growth-Platform, src/lib/billing/tiers.ts (prices,
 * analyses, competitor limits, features) and src/lib/billing/feature-matrix.ts
 * (rows and wording). Agreed 2 Nov 2026. Change both repos together.
 * NZD per business per month; Findable isn't GST-registered, so no GST is added.
 */
export type PlanId = 'starter' | 'growth' | 'pro' | 'enterprise';

export const plans: {
  id: PlanId; name: string; price: string; per: string; analyses: string; competitors: string;
  blurb: string; recommended?: boolean; cta: { href: string; label: string };
}[] = [
  { id: 'starter', name: 'Starter', price: '$99', per: 'per month', analyses: '1 AI visibility analysis a month', competitors: 'Up to 5 competitors tracked', blurb: 'See how AI assistants describe and recommend your business, and what to fix first.', cta: { href: '/findable/about/#contact', label: 'Start with Starter' } },
  { id: 'growth', name: 'Growth', price: '$299', per: 'per month', analyses: '4 AI visibility analyses a month', competitors: 'Up to 10 competitors tracked', blurb: 'About one analysis a week, plus your website, Google Analytics and Search Console in one place.', recommended: true, cta: { href: '/findable/about/#contact', label: 'Choose Growth' } },
  { id: 'pro', name: 'Pro', price: '$599', per: 'per month', analyses: '8 AI visibility analyses a month', competitors: 'Up to 15 competitors tracked', blurb: 'About two analyses a week, the largest competitor set and priority support.', cta: { href: '/findable/about/#contact', label: 'Choose Pro' } },
  { id: 'enterprise', name: 'Enterprise', price: 'Custom', per: 'agreed with you', analyses: 'Analyses agreed with you', competitors: 'Competitors agreed with you', blurb: 'For groups, regional tourism organisations and agencies with several businesses.', cta: { href: '/findable/about/#contact', label: 'Talk to us' } },
];

/** A cell: true (included), false (not included), or a level shown as text. */
export type Cell = boolean | string;

export const featureRows: { label: string; note?: string; cells: Record<PlanId, Cell>; planned?: boolean }[] = [
  { label: 'All available AI engines', note: 'Every AI assistant Findable currently checks', cells: { starter: true, growth: true, pro: true, enterprise: true } },
  { label: 'AI visibility overview', cells: { starter: true, growth: true, pro: true, enterprise: true } },
  { label: 'Brand mentions and citations', cells: { starter: true, growth: true, pro: true, enterprise: true } },
  { label: 'Competitor comparisons', cells: { starter: 'Basic', growth: 'Detailed', pro: 'Advanced', enterprise: 'Custom' } },
  { label: 'Content gaps and recommendations', cells: { starter: 'Basic', growth: 'Prioritised', pro: 'Strategic', enterprise: 'Custom' } },
  { label: 'Historical comparison', note: 'Results against your baseline', cells: { starter: false, growth: true, pro: true, enterprise: true } },
  { label: 'PDF report downloads', cells: { starter: true, growth: true, pro: true, enterprise: true } },
  { label: 'Website assessment', cells: { starter: false, growth: true, pro: true, enterprise: true } },
  { label: 'Google Analytics 4 (GA4)', cells: { starter: false, growth: true, pro: true, enterprise: true } },
  { label: 'Google Search Console', cells: { starter: false, growth: true, pro: true, enterprise: true } },
  { label: 'Performance reporting', note: 'Search and website traffic in your reports', cells: { starter: false, growth: true, pro: true, enterprise: 'Custom' } },
  { label: 'Priority support', cells: { starter: false, growth: false, pro: true, enterprise: true } },
  { label: 'Multi-location and group reporting', note: 'Planned: not available yet', planned: true, cells: { starter: false, growth: false, pro: false, enterprise: 'Planned' } },
];

/** Optional implementation packages. Indicative NZD ranges, not fixed quotes. */
export const packages = [
  { name: 'Findable Setup', price: '$750–$1,500', items: ['Business profile set-up', 'Competitor configuration', 'Initial connection guidance'] },
  { name: 'Visibility Audit', price: '$1,500–$3,000', items: ['Initial AI visibility assessment', 'Competitor analysis', 'Key findings and recommendations'] },
  { name: 'Growth Roadmap', price: '$1,500–$3,500', items: ['Prioritised 90-day action plan', 'Content opportunities', 'Website recommendations'] },
  { name: 'Done-for-you Optimisation', price: '$3,000–$10,000+', items: ['Agreed content, website and AI-search optimisation work', 'Scope confirmed before work begins'] },
  { name: 'Ongoing Advisory', price: '$750–$2,500 a month', items: ['Regular reviews', 'Recommendations', 'Ongoing optimisation support'] },
];
