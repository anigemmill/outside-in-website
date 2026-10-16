// Pre-launch checklist: lists placeholders that still need real values.
// Run with: npm run check
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const env = Object.fromEntries(
  (existsSync('.env') ? readFileSync('.env', 'utf8') : '')
    .split('\n').filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
);
const val = (k) => process.env[k] || env[k] || '';
const site = readFileSync('src/config/site.ts', 'utf8');
const items = [];

if (!val('PUBLIC_CONTACT_EMAIL') && site.includes("'hello@your-domain.co.nz'")) items.push('Contact email is still the placeholder (hello@your-domain.co.nz).');
if (!val('PUBLIC_BOOKING_URL') && site.includes("bookingUrl: env.PUBLIC_BOOKING_URL || ''")) items.push('No booking URL: "Book a discovery call" opens the contact form instead (works, but a calendar link is smoother).');
if (/instagram: '',\s*linkedin: '',\s*facebook: '',\s*behance: ''/.test(site)) items.push('No social links set in src/config/site.ts (the footer hides the Follow column until you add one).');
const concepts = readdirSync('src/content/work').filter((d) => {
  const f = `src/content/work/${d}/index.md`;
  return existsSync(f) && /status:\s*concept/.test(readFileSync(f, 'utf8'));
});
if (concepts.length) items.push(`${concepts.length} portfolio projects are concepts (${concepts.join(', ')}). Fine to launch with; replace or add client work when approved.`);
if (!val('PUBLIC_FINDABLE_APP_URL') && site.includes("'https://tourism-ai-growth-platform.vercel.app'")) items.push('Findable "Sign in" links still point at the Vercel address. Switch findableAppUrl in src/config/site.ts to https://app.theoutsidein.nz once that domain is live.');
items.push('Review the privacy notice in src/pages/privacy.astro, especially if you add analytics.');
items.push('Turn on form notifications in Netlify (Forms > Form notifications) so enquiries reach your inbox.');

console.log('\nOutside In: pre-launch checklist\n');
items.forEach((i) => console.log(' • ' + i));
console.log('');
