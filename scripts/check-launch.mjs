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
if (/instagram: '',\s*linkedin: ''/.test(site)) items.push('No Instagram or LinkedIn URL in src/config/site.ts (the footer and the social section hide those links until you add them).');
const concepts = readdirSync('src/content/work').filter((d) => {
  const f = `src/content/work/${d}/index.md`;
  const md = existsSync(f) ? readFileSync(f, 'utf8') : '';
  return /status:\s*concept/.test(md) && !/^draft:\s*true/m.test(md);
});
if (concepts.length) items.push(`${concepts.length} portfolio projects are concepts (${concepts.join(', ')}). Fine to launch with; replace or add client work when approved.`);
// Homepage v3 placeholder images (src/assets/home/manifest.json). They show on previews only;
// on the live site the parts that use them step aside (see isLive in src/data/homeAssets.ts).
const manifestPath = 'src/assets/home/manifest.json';
const stillPlaceholder = existsSync(manifestPath)
  ? JSON.parse(readFileSync(manifestPath, 'utf8')).assets.filter((a) => a.placeholder)
  : [];
if (stillPlaceholder.length) {
  items.push(`${stillPlaceholder.length} homepage images are still placeholders (previews only; hidden on the live site until replaced):\n` +
    stillPlaceholder.map((a) => `     - src/assets/home/${a.file} (${a.usedIn}): ${a.replaceWith}`).join('\n'));
}
// Homepage copy still in [square brackets].
const bracketed = (readFileSync('src/data/home.ts', 'utf8').match(/'[^'\n]*\[[^\]\n]+\][^'\n]*'/g) || []);
if (bracketed.length) items.push(`${bracketed.length} homepage copy placeholders in [brackets] in src/data/home.ts.`);
if (!val('PUBLIC_FINDABLE_APP_URL') && site.includes("'https://tourism-ai-growth-platform.vercel.app'")) items.push('Findable "Sign in" links still point at the Vercel address. Switch findableAppUrl in src/config/site.ts to https://app.theoutsidein.nz once that domain is live.');
items.push('Review the privacy notice in src/pages/privacy.astro, especially if you add analytics.');
items.push('Turn on form notifications in Netlify (Forms > Form notifications) so enquiries reach your inbox.');

console.log('\nOutside In: pre-launch checklist\n');
items.forEach((i) => console.log(' • ' + i));
console.log('');

