import type { APIRoute } from 'astro';
import { site as settings } from '../config/site';

// Reeldeal (proxied at /reeldeal, see netlify.toml) has its own sitemap, and its
// signed-in app and sign-in pages stay out of search. Crawlers only read this
// root robots.txt, so Reeldeal's rules live here. Keep in step with
// src/app/robots.ts in anigemmill/reeldeal.
const REELDEAL_PRIVATE = [
  '/dashboard', '/library', '/projects', '/brands', '/exports', '/settings', '/studio', '/autopilot',
  '/onboarding', '/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/auth/', '/api/', '/design-system',
];

// Live site: allow crawling and point to the sitemaps.
// Netlify previews and branch deploys: ask crawlers to stay away.
export const GET: APIRoute = ({ site }) => {
  const body = site && settings.indexable
    ? `User-agent: *\nAllow: /\n${REELDEAL_PRIVATE.map((p) => `Disallow: /reeldeal${p}`).join('\n')}\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\nSitemap: ${new URL('reeldeal/sitemap.xml', site).href}\n`
    : `# Preview deploy. Blocking indexing.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
