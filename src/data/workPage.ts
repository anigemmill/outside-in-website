/**
 * WORK PAGE (/projects/)
 * From Ani's Work page design (26 Oct 2026). The tiles are hand-picked and laid
 * out on a 12-column grid; every other published project is listed below them
 * under "More work". Edit copy and tiles here.
 *
 * Tile fields:
 * - slug: the case study this tile stands for (it's left out of "More work").
 * - href: where the tile goes. Leave it out for a tile that isn't a link.
 * - dots: the disciplines shown (and used by the filter chips).
 * - previewOnly: shown on previews only, never on the live site (use while
 *   rights or permission are still being confirmed).
 */
import type { ImageMetadata } from 'astro';
import type { ServiceId } from './services';
import flavours from '../assets/work-page/flavours-sunseeker-can.webp';
import butterHero from '../assets/work-page/butter-dog-hero.jpg';
import butterTees from '../assets/work-page/butter-dog-tees.webp';
import wings from '../assets/work-page/wings-for-life-poster-clean.webp';
import reido from '../assets/work-page/run-for-reido-tee.webp';
import rwt from '../assets/work-page/rotorua-walking-tours-emboss.webp';
import nsc from '../assets/work-page/negative-split-tri-spoke-round.webp';
import rrPoster from '../assets/work-page/ride-retreat-app-welcome.jpg';
import epcPizza from '../assets/work-page/epc-pizza-oven-poster.jpg';
import epcPotato from '../assets/work-page/epc-potato-stacks-poster.jpg';
import epcSalad from '../assets/work-page/epc-roast-salad-poster.jpg';

export const workPage = {
  label: 'Selected work · 2024–2026',
  // The word in the red pill is wrapped separately.
  title: { before: 'Work that makes brands', pill: 'impossible', after: 'to ignore.' },
  lede: 'Festivals, venues, products and our own ventures. Strategy, brand, campaigns, websites and AI-built digital products from Aotearoa.',
  marquee: [
    { word: 'Strategy', dot: 'red' }, { word: 'Brand', dot: 'pink' }, { word: 'Campaigns', dot: 'green' },
    { word: 'Websites', dot: 'purple' }, { word: 'AI products', dot: 'red' }, { word: 'Print', dot: 'pink' },
    { word: 'Out-of-home', dot: 'purple' },
  ],
  cta: { label: 'Next project', title: 'Yours could sit right here.', button: 'Book a discovery call' },
  moreLabel: 'More work',
};

type Dot = 'pink' | 'green' | 'purple';
export const dotService: Record<Dot, ServiceId> = { pink: 'design-creative', green: 'marketing-growth', purple: 'ai-systems' };

export interface WorkTile {
  key: string;
  title: string;
  tags: string;
  dots: Dot[];
  span: 4 | 6 | 8 | 12;
  /** Desktop height in px at 1440 wide; it scales down with the screen. */
  h: number;
  bg: string;
  slug?: string;
  href?: string;
  external?: boolean;
  badge?: { text: string; tone: 'white' | 'green' | 'ink'; instagram?: boolean };
  hover?: string;
  year?: string;
  previewOnly?: boolean;
  media:
    | { kind: 'image'; src: ImageMetadata; alt: string; fit?: 'cover' | 'contain'; position?: string }
    | { kind: 'video'; src: string; poster: ImageMetadata; label: string }
    | { kind: 'pip'; src: ImageMetadata; alt: string; pip: ImageMetadata; pipAlt: string; position?: string }
    | { kind: 'poster'; src: ImageMetadata; alt: string }
    | { kind: 'wheel'; src: ImageMetadata; alt: string }
    /** Three phone reels fanned out: left, right, then the centre (front) one. */
    | { kind: 'reels'; reels: Array<{ src: string; poster: ImageMetadata; label: string }> };
}

export const tiles: WorkTile[] = [
  {
    key: 'flavours', title: 'Flavours of Plenty Festival', slug: 'flavours-of-plenty', href: '/projects/flavours-of-plenty/',
    tags: 'Campaign · Illustration system · Print · Out-of-home · Packaging', dots: ['pink', 'green'],
    span: 8, h: 680, bg: '#FF99DC', year: '2025', badge: { text: 'Featured', tone: 'white' }, hover: 'View case study',
    media: { kind: 'image', src: flavours, alt: 'A hand holding a can of Sunseeker Pale Ale, the Flavours of Plenty festival collaboration', position: '50% 55%' },
  },
  {
    key: 'ride-retreat', title: 'Ride Retreat', slug: 'ride-retreat', href: '/projects/ride-retreat/',
    tags: 'Brand · Website · AI guest app', dots: ['pink', 'purple'],
    span: 4, h: 680, bg: '#0E1E07', badge: { text: 'Our venture', tone: 'green' }, hover: 'View case study',
    media: { kind: 'video', src: '/media/ride-retreat-app-launch.mp4', poster: rrPoster, label: 'Ride Retreat guest app launch film' },
  },
  {
    // The rider photo shows a Red Bull athlete: preview only until the rights are confirmed.
    key: 'butter-dog', title: 'Butter Dog Supply Co.', tags: 'Brand · Apparel · Shopify store', dots: ['pink', 'green'],
    span: 8, h: 600, bg: '#2C3A16', previewOnly: true, badge: { text: 'Our venture', tone: 'green' },
    media: { kind: 'pip', src: butterHero, alt: 'Downhill rider dropping off a rock in a sunlit forest', position: '60% 45%', pip: butterTees, pipAlt: 'Butter Dog t-shirts in navy and cream' },
  },
  {
    key: 'wings', title: 'Wings for Life World Run', slug: 'wings-for-life-team-logo',
    tags: 'Campaign concept · Illustration · Copy', dots: ['green'],
    span: 4, h: 600, bg: '#E8E8E8', badge: { text: 'Concept', tone: 'ink' },
    media: { kind: 'poster', src: wings, alt: 'Wings for Life World Run street poster concept: We’ve got the runs' },
  },
  {
    key: 'epc', title: 'Empty Plate Club', slug: 'empty-plate-club', href: 'https://www.instagram.com/emptyplateclub_/', external: true,
    tags: 'Brand · Illustration · Social content', dots: ['pink', 'green'],
    span: 6, h: 580, bg: '#F0B3E0', badge: { text: '@emptyplateclub_', tone: 'white', instagram: true }, hover: 'See on Instagram',
    media: {
      kind: 'reels',
      reels: [
        { src: '/media/empty-plate-club-roast-salad.mp4', poster: epcSalad, label: 'Empty Plate Club reel: roasted zucchini, fennel and tomato salad' },
        { src: '/media/empty-plate-club-potato-stacks.mp4', poster: epcPotato, label: 'Empty Plate Club reel: potato and kumara stacks' },
        { src: '/media/empty-plate-club-pizza-oven.mp4', poster: epcPizza, label: 'Empty Plate Club reel: setting up a portable pizza oven' },
      ],
    },
  },
  {
    key: 'reido', title: 'Run for Reido', slug: 'run-for-reido', href: '/projects/run-for-reido/',
    tags: 'Event identity · Merch', dots: ['pink'], span: 6, h: 580, bg: '#E6E6E6', year: '2025', hover: 'View case study',
    media: { kind: 'image', src: reido, alt: 'Run for Reido 2025 event t-shirt with cowboy lettering' },
  },
  {
    key: 'rwt', title: 'Rotorua Walking Tours', slug: 'rotorua-walking-tours', href: '/projects/rotorua-walking-tours/',
    tags: 'Brand identity · Illustration · Website', dots: ['pink'], span: 6, h: 560, bg: '#E9D5DE', hover: 'View case study',
    media: { kind: 'image', src: rwt, alt: 'Rotorua Walking Tours logo blind-embossed on paper' },
  },
  {
    key: 'nsc', title: 'Negative Split Carbon', slug: 'nsc-wheel-design', href: '/projects/nsc-wheel-design/',
    tags: 'Product graphics · Brand typography', dots: ['pink'], span: 6, h: 560, bg: '#E4E4E1', hover: 'View case study',
    media: { kind: 'wheel', src: nsc, alt: 'Negative Split Carbon tri-spoke wheel with tonal typographic graphics, spinning' },
  },
];

/**
 * MARKETING & CAMPAIGNS (after the next-project card), from Ani's design of 27 Oct 2026.
 * - held: 'te-puia' figures are the Te Puia results, so they follow that project's
 *   `resultsConfirmed` flag: previews only (flagged) until it is true.
 * - previewOnly: a row still waiting on a result or on permission to name the client.
 */
export interface CampaignStat { n: string; text: string; held?: 'te-puia' }
export interface CampaignRow { kicker: string; title: string; tags: string; result?: string; held?: 'te-puia'; previewOnly?: boolean; ai?: boolean }

export const marketing = {
  label: 'Marketing & campaigns',
  title: 'Campaigns that move the numbers.',
  lede: 'Six years running paid, organic and owned campaigns for tourism, culture, sport, events and retail brands. Planned from real data, reported in plain English.',
  stats: [
    { n: '+30%', text: 'website visitors, to nearly 600,000', held: 'te-puia' },
    { n: '+22.2%', text: 'online revenue, year on year', held: 'te-puia' },
    { n: '+54%', text: 'Instagram audience growth', held: 'te-puia' },
    { n: '$50k+', text: 'event profit, 50+ staff and volunteers' },
  ] as CampaignStat[],
  rows: [
    { kicker: 'Leading NZ tourism attraction · 3 brands', title: 'Always-on marketing for three tourism brands', tags: 'Meta ads · SEO · Email · Social across four accounts · Film & photo · Print', result: '+20% e-commerce purchases, +18.1% new users, branded search up 168–427%', held: 'te-puia' },
    { kicker: 'Leading NZ tourism attraction', title: 'China market launch', tags: 'China-facing website · Live booking API · WeChat · RED (Xiaohongshu)', result: 'A direct digital sales channel into the Chinese market' },
    { kicker: 'Tourism operator × national tourism body', title: 'AI discoverability pilot', tags: 'AI search (GEO) · Site audits · Voice AI · Multi-agent workflows', result: 'Wrote a destination-wide tourism AI strategy', ai: true },
    { kicker: 'Tourism Bay of Plenty', title: 'Destination campaigns and a tourism app', tags: 'Meta ads · App launch · Promo video · Visitor kiosks · Our Tauranga Region', result: 'Built and launched the app, then drove awareness with paid social' },
    { kicker: 'Grassroots Trust Velodrome', title: 'Rebrand and UCI Track World Cups', tags: 'Rebrand rollout · Social · Email · Google Ads · Crisis comms', result: 'Avantidrome to Grassroots Trust Velodrome, across web, print and uniforms' },
    // Result still to come, and Ebbett hasn't confirmed it's happy to be named.
    { kicker: 'Ebbett Group', title: 'Search campaigns for four car brands', tags: 'Google Ads · Škoda · Lexus · Toyota · Audi', result: '[Add a result: leads, cost per lead or test drives]', previewOnly: true },
    { kicker: 'BNZ Corporate Challenge', title: 'Event direction, start to finish', tags: 'Event marketing · Sponsors · Budget · Operations', result: '$50k+ profit, with 50+ staff and volunteers' },
    { kicker: 'Nduro Events', title: 'Athlete experience for Whaka 100 and more', tags: 'Participant comms · Briefings · Sponsors · Feedback', result: '7,000+ athletes, including national and international elites' },
  ] as CampaignRow[],
  also: 'e-commerce and social for ilabb · email in Mailchimp, Klaviyo and Campaign Monitor · sites on Shopify, WordPress, Squarespace, Rocketspark and Wix',
};
