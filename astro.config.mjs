// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';

// Production domain. PUBLIC_SITE_URL can override it (e.g. for a staging copy).
const DEFAULT_SITE = 'https://theoutsidein.nz';
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = (PUBLIC_SITE_URL || DEFAULT_SITE).replace(/\/$/, '');

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/contact/thanks/') && !page.includes('/findable/thanks/') })],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
