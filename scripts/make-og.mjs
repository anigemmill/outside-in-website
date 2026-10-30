// Generates static brand files from the logo geometry:
//   public/brand/outside-in-logo.svg         (maroon, the default)
//   public/brand/outside-in-logo-{cream,orange,brown}.svg
// Colours are the Terracotta Rose palette (see CLAUDE.md).
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
writeFileSync('public/brand/outside-in-logo.svg', logo('#6D0101'));
writeFileSync('public/brand/outside-in-logo-cream.svg', logo('#FBF7F2'));
writeFileSync('public/brand/outside-in-logo-orange.svg', logo('#E0421E'));
writeFileSync('public/brand/outside-in-logo-brown.svg', logo('#3B1E19'));

// Favicon: the whole OI mark, cream on orange, centred in a rounded square
// (the old crop showed the O alone and cut off its shifted slice).
const FAV = '80 -84.5 947 947';
const favicon = (bg, fg, rx = 180) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${FAV}">
  <rect x="80" y="-84.5" width="947" height="947" rx="${rx}" fill="${bg}"/>${mark(fg, 'f')}</svg>`;
writeFileSync('public/favicon.svg', favicon('#E0421E', '#FBF7F2') + '\n');
await sharp(Buffer.from(favicon('#E0421E', '#FBF7F2'))).resize(32, 32).png().toFile('public/favicon-32.png');
await sharp(Buffer.from(favicon('#E0421E', '#FBF7F2', 0))).resize(180, 180).png().toFile('public/apple-touch-icon.png');

// Social image: orange ground, the cream mark large and centred.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#E0421E"/>
  <svg x="220" y="95" width="760" height="447" viewBox="110 128 887 522">${mark('#FBF7F2', 'o')}</svg>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('public/og.png');
console.log('Brand files written.');
