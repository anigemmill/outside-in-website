// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Production domain. PUBLIC_SITE_URL can override it (e.g. for a staging copy).
const DEFAULT_SITE = 'https://theoutsidein.nz';
const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = (PUBLIC_SITE_URL || DEFAULT_SITE).replace(/\/$/, '');

// Images for preview-only Work tiles (src/data/workPage.ts) are imported by the
// page data, so Vite copies the originals into every build even when the tile
// is hidden. Indexed (production) builds delete them, so nothing awaiting
// permission is ever published. Add a file prefix here when you add one.
const previewOnlyAssets = /^butter-dog-/;
const indexable = !process.env.CONTEXT || process.env.CONTEXT === 'production';
const stripPreviewOnly = {
  name: 'strip-preview-only-assets',
  hooks: {
    'astro:build:done': ({ dir }) => {
      if (!indexable) return;
      const assets = path.join(fileURLToPath(dir), '_astro');
      if (!fs.existsSync(assets)) return;
      for (const f of fs.readdirSync(assets)) if (previewOnlyAssets.test(f)) fs.rmSync(path.join(assets, f));
    },
  },
};

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [stripPreviewOnly, sitemap({ filter: (page) => !page.includes('/contact/thanks/') && !page.includes('/findable/thanks/') && !page.endsWith('/fonts/') })],
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
