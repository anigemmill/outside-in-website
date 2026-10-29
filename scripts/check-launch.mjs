// Pre-launch checklist: lists placeholders that still need real values.
// Run with: npm run check
import { readFileSync, existsSync } from 'node:fs';

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
if (/instagram: '',\s*linkedin: ''/.test(site)) items.push('No Instagram or LinkedIn URL in src/config/site.ts (the footer and the social section hide those links until you add them).');
// Case-study gaps: values written as "TO ADD…" and gallery placeholders in
// src/data/case-studies.json. They never publish; this lists what Ani still has to supply.
const studies = JSON.parse(readFileSync('src/data/case-studies.json', 'utf8'));
const isGap = (v) => v == null || (typeof v === 'string' && (v.trim() === '' || /^TO ADD/i.test(v.trim())));
const gaps = [];
for (const c of studies) {
  const missing = [];
  for (const k of ['year', 'where', 'brief', 'idea', 'client', 'services']) if (isGap(c[k])) missing.push(k);
  if (!c.result) missing.push('result line');
  for (const g of c.gallery) if (g.placeholder) missing.push(`image: ${g.placeholder.replace(/^Add:\s*/i, '')}`);
  if (missing.length) gaps.push(`     - ${c.title}: ${missing.join('; ')}`);
}
if (gaps.length) items.push(`Case-study details still to supply (hidden on the site until added to src/data/case-studies.json):\n${gaps.join('\n')}`);
if (!val('PUBLIC_FINDABLE_APP_URL') && site.includes("'https://tourism-ai-growth-platform.vercel.app'")) items.push('Findable "Sign in" links still point at the Vercel address. Switch findableAppUrl in src/config/site.ts to https://app.theoutsidein.nz once that domain is live.');
items.push('Review the privacy notice in src/pages/privacy.astro, especially if you add analytics.');
items.push('Turn on form notifications in Netlify (Forms > Form notifications) so enquiries reach your inbox.');

console.log('\nOutside In: pre-launch checklist\n');
items.forEach((i) => console.log(' • ' + i));
console.log('');

