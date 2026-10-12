import type { APIRoute } from 'astro';

// With a confirmed domain: allow crawling and point to the sitemap.
// Without one (local builds, previews): ask crawlers to stay away.
export const GET: APIRoute = ({ site }) => {
  const body = site
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', site).href}\n`
    : `# No production domain configured (PUBLIC_SITE_URL). Blocking indexing.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
