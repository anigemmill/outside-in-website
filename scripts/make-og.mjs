// Generates static brand files from the logo geometry:
//   public/brand/outside-in-logo.svg        (black, for light backgrounds)
//   public/brand/outside-in-logo-white.svg  (white, for dark backgrounds)
//   public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png
//   public/og.png                            (1200x630 social share image)
// Run with: npm run og
import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'node:fs';

const cx = 369.5, cy = 387, R = 259.5, r = 193.5;
const ring = `M${cx - R},${cy}a${R},${R} 0 1,0 ${2 * R},0a${R},${R} 0 1,0 ${-2 * R},0Z` +
             `M${cx - r},${cy}a${r},${r} 0 1,0 ${2 * r},0a${r},${r} 0 1,0 ${-2 * r},0Z`;

/** The mark as SVG elements (viewBox 110 128 887 522), coloured with `fill`. */
const mark = (fill, p = 'm') => `
  <defs>
    <clipPath id="${p}t"><rect x="0" y="0" width="1200" height="376"/></clipPath>
    <clipPath id="${p}b"><rect x="0" y="433" width="1200" height="400"/></clipPath>
    <clipPath id="${p}s"><rect x="0" y="376" width="1200" height="57"/></clipPath>
  </defs>
  <g fill="${fill}">
    <path d="${ring}" fill-rule="evenodd" clip-path="url(#${p}t)"/>
    <path d="${ring}" fill-rule="evenodd" clip-path="url(#${p}b)"/>
    <g transform="translate(73 0)"><path d="${ring}" fill-rule="evenodd" clip-path="url(#${p}s)"/></g>
    <rect x="842" y="128" width="76" height="249"/>
    <rect x="842" y="437" width="76" height="213"/>
    <rect x="919" y="377" width="77" height="60"/>
  </g>`;

const logo = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="110 128 887 522" width="887" height="522" role="img" aria-label="Outside In">${mark(fill)}</svg>\n`;

mkdirSync('public/brand', { recursive: true });
writeFileSync('public/brand/outside-in-logo.svg', logo('#121110'));
writeFileSync('public/brand/outside-in-logo-white.svg', logo('#ffffff'));
writeFileSync('public/brand/outside-in-logo-blush.svg', logo('#eccae0'));
writeFileSync('public/brand/outside-in-logo-moss.svg', logo('#628038'));

// Favicon: the O alone reads better at 16px. Square crop around the ring.
const favicon = (bg, fg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 77 620 620">
  <rect x="60" y="77" width="620" height="620" rx="96" fill="${bg}"/>${mark(fg, 'f')}</svg>`;
writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="60 77 620 620">
  <style>.bg{fill:#628038}.fg{fill:#eccae0}</style>
  <rect class="bg" x="60" y="77" width="620" height="620" rx="96"/>
  ${mark('#eccae0', 'f')}
</svg>\n`);
await sharp(Buffer.from(favicon('#628038', '#eccae0'))).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(favicon('#628038', '#eccae0').replace('rx="96"', 'rx="0"'))).resize(180, 180).png().toFile('public/apple-touch-icon.png');

// Social image: moss ground, the blush mark large, a magenta slice running through it.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#628038"/>
  <!-- Magenta band aligned exactly to the logo's slice: y 376-433 in logo space, scaled by 760/887 -->
  <rect x="0" y="${95 + (376 - 128) * 760 / 887}" width="1200" height="${(433 - 376) * 760 / 887}" fill="#d782b3"/>
  <svg x="140" y="95" width="760" height="447" viewBox="110 128 887 522">${mark('#eccae0', 'o')}</svg>
  <rect x="1010" y="70" width="120" height="14" fill="#e6fcb0"/>
  <rect x="1040" y="96" width="90" height="14" fill="#ece0f8"/>
  <rect x="1070" y="122" width="60" height="14" fill="#fafcf0"/>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('Brand files written.');
