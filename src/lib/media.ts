/**
 * Resolves the image and video paths used in src/data/*.json.
 *
 * The JSON keeps the handoff's paths, e.g. "assets/ride-retreat/logo.jpg":
 *  - images live in src/assets/work/<project>/ (or src/assets/studio/) and go
 *    through astro:assets, so every one gets AVIF/WebP and a srcset;
 *  - videos live in public/media/<project>/ and are served as they are.
 */
import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/{work,studio}/**/*.{jpg,jpeg,png,webp}', { eager: true });
const byKey = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  byKey.set(path.replace(/^\/src\/assets\/(work\/)?/, ''), mod.default);
}

/** "assets/ride-retreat/logo.jpg" → the imported image. Throws if it's missing, so a typo fails the build. */
export function img(path: string): ImageMetadata {
  const key = path.replace(/^assets\//, '');
  const found = byKey.get(key);
  if (!found) throw new Error(`Image not found: ${path} (expected src/assets/work/${key} or src/assets/${key})`);
  return found;
}

/** "assets/ride-retreat/app-3x2.mp4" → "/media/ride-retreat/app-3x2.mp4" */
export function video(path: string): string {
  return '/media/' + path.replace(/^assets\//, '');
}

/** An optimised poster frame URL for a <video>. */
export async function poster(path: string, width = 1600): Promise<string> {
  return (await getImage({ src: img(path), width, format: 'webp' })).src;
}

/** Values Ani still has to supply are written as "TO ADD…" in the JSON. They never publish. */
export const isGap = (v: unknown): boolean => v == null || (typeof v === 'string' && (v.trim() === '' || /^TO ADD/i.test(v.trim())));
