/**
 * FINDABLE: facts, sources and offers used across the /findable/ pages.
 * Edit here rather than in the pages.
 *
 * Rules (from the Findable working brief):
 * - Every published statistic links to its source and keeps its exact meaning.
 * - No price until Ani confirms one. Done-for-you work is "Quote on request".
 * - Describe the subscription only as far as the product delivers today.
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
  delivery: 'We aim to send it within one working day.',
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
    price: 'Pricing to come',
    note: 'Month to month · cancel any time',
    blurb: 'Ongoing support to act on what the check finds, through the Findable platform.',
    // What the Findable app does today. Confirm what the subscription includes before launch.
    items: [
      'A prioritised action plan for your business',
      'Changes measured against a baseline, so you can see what moved',
      'A growth brief, checked by a person before it reaches you',
      'Your own sign-in to the Findable platform',
    ],
    cta: { href: '/findable/about/#contact', label: 'Register interest' },
  },
  {
    id: 'done-for-you',
    name: 'Done-for-you optimisation',
    price: 'Quote on request',
    note: 'Scoped before any work starts',
    blurb: 'Short on time? We make the changes on your website and listings for you.',
    items: [
      'We fix what the check or your action plan turns up',
      'A written quote for the work before we start',
    ],
    cta: { href: '/findable/about/#contact', label: 'Ask for a quote' },
  },
];

export const pilot = {
  title: 'Now in pilot, in Rotorua',
  text: 'Findable is being piloted with tourism operators in Rotorua. The pilot is still running: we’re using it to test the method, the delivery time and the monthly pricing. Early findings will be shared with the sample size, dates, AI tools and method spelled out.',
};
