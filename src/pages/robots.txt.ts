import type { APIRoute } from 'astro';
import { site as settings } from '../config/site';

// Live site: allow crawling and point to the sitemap.
// Netlify previews and branch deploys: ask crawlers to stay away.
export const GET: APIRoute = ({ site }) => {
  const body = site && settings.indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `# Preview deploy. Blocking indexing.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
