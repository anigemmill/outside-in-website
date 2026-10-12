// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';

// The production domain comes from PUBLIC_SITE_URL (set it in .env locally and in
// your host's environment settings). Until it is set, the build skips the sitemap,
// omits canonical URLs and tells search engines not to index the site, so a
// placeholder domain is never published as if it were real.
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = PUBLIC_SITE_URL ? PUBLIC_SITE_URL.replace(/\/$/, '') : undefined;

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: site ? [sitemap({ filter: (page) => !page.includes('/contact/thanks/') })] : [],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
