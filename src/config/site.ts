/**
 * SITE SETTINGS
 * -------------
 * The one place for business details. Everything marked PLACEHOLDER must be
 * replaced before launch. Run `npm run check` to list what is still outstanding.
 */

const env = import.meta.env;

export const site = {
  name: 'Outside In',
  /** Short descriptor used in titles and metadata. */
  descriptor: 'Creative, marketing and AI studio',
  location: 'Aotearoa New Zealand',

  /** Production URL. PUBLIC_SITE_URL can override it (e.g. for a staging copy). */
  url: (env.PUBLIC_SITE_URL || 'https://theoutsidein.nz').replace(/\/$/, ''),

  /**
   * Only the live site should be indexed. Netlify sets CONTEXT to 'production' for the
   * live deploy and to 'deploy-preview' / 'branch-deploy' for previews, which stay hidden.
   */
  indexable: !process.env.CONTEXT || process.env.CONTEXT === 'production',

  /** The address shown on the site and offered as a fallback if the form fails. */
  email: env.PUBLIC_CONTACT_EMAIL || 'anigemmill@theoutsidein.nz',

  /**
   * Discovery-call booking link (Cal.com). Every "Book a discovery call" button opens it
   * in a new tab. If this is ever emptied, the buttons fall back to the contact form.
   */
  bookingUrl: env.PUBLIC_BOOKING_URL || 'https://cal.com/ani-gemmill-yg4gmo',

  /**
   * Optional third-party form endpoint (e.g. Formspree: https://formspree.io/f/xxxx).
   * Leave empty when hosting on Netlify: the form then uses Netlify Forms.
   * A form endpoint is public by design; never put a private API key here.
   */
  formEndpoint: env.PUBLIC_FORM_ENDPOINT || '',

  /** How quickly you reply to enquiries. Shown on the contact page. Set it to a promise you can keep. */
  replyWithin: 'two working days',

  /** Social links. Leave a value empty to hide it. PLACEHOLDER until supplied. */
  social: {
    instagram: '',
    linkedin: '',
    facebook: '',
    behance: 'https://www.behance.net/anigemmill99',
  } as Record<string, string>,

  seo: {
    defaultTitle: 'Outside In | Creative, marketing and AI studio',
    defaultDescription:
      'Outside In is a creative, marketing and AI studio in Aotearoa New Zealand. We find the opportunities your business is too close to see, then design the brand, campaigns and AI systems that act on them.',
    ogImage: '/og.png',
  },
};

export const nav = [
  { label: 'Work', href: '/work/' },
  { label: 'Services', href: '/services/' },
  { label: 'Approach', href: '/approach/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Where "Book a discovery call" points. */
export const bookingHref = site.bookingUrl || '/contact/?topic=discovery-call#enquiry';
export const bookingIsExternal = Boolean(site.bookingUrl);

/** Things still to supply before launch (shown in a dev-only banner). */
export function outstandingPlaceholders(): string[] {
  const list: string[] = [];
  if (site.email.includes('your-domain')) list.push('Contact email');
  if (!site.bookingUrl) list.push('Booking URL (falls back to the contact form)');
  if (!Object.values(site.social).some(Boolean)) list.push('Social links');
  return list;
}
