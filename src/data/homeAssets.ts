import type { ImageMetadata } from 'astro';
import manifest from '../assets/home/manifest.json';
import { site } from '../config/site';

/**
 * Homepage images live in src/assets/home/<group>/<id>.jpg and are described in
 * manifest.json. To swap a placeholder: replace the file at the same path and
 * ratio, rewrite its alt text in the manifest and set "placeholder": false.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/home/**/*.jpg', { eager: true });

export interface HomeAsset {
  id: string;
  src: ImageMetadata;
  alt: string;
  placeholder: boolean;
}

const byId = new Map<string, HomeAsset>();
for (const entry of manifest.assets) {
  const mod = files[`../assets/home/${entry.file}`];
  if (!mod) throw new Error(`Homepage image missing: src/assets/home/${entry.file}`);
  byId.set(entry.id, { id: entry.id, src: mod.default, alt: entry.altPlaceholder, placeholder: entry.placeholder });
}

/**
 * Labelled placeholder images show on previews only. On the live site the parts
 * that use them step aside (service hover images, approach images, the social
 * gallery) until real images replace them.
 */
export const isLive = (a: HomeAsset) => !a.placeholder || !site.indexable;

export function asset(id: string): HomeAsset {
  const a = byId.get(id);
  if (!a) throw new Error(`No homepage image with id "${id}" in src/assets/home/manifest.json`);
  return a;
}
