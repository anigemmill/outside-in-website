/**
 * Portfolio data: the eight Work cards and the seven case studies.
 * Edit the JSON files next to this one; this module only adds types and helpers.
 *
 * Anything Ani hasn't supplied yet is written as "TO ADD…" (or a gallery item with a
 * `placeholder`). Those never publish: the templates leave the field, row or image out.
 * `npm run check` lists what's still missing.
 */
import caseStudiesJson from './case-studies.json';
import workGridJson from './work-grid.json';
import { isGap } from '../lib/media';

export interface Media {
  src: string;
  alt: string;
  fit: 'cover' | 'contain';
  background: string | null;
}

export interface GalleryItem extends Partial<Media> {
  minHeight?: number;
  /** A looping film; `src` is then its poster frame. */
  video?: string | null;
  /** Span both columns. */
  fullWidth?: boolean;
  /** Something still to supply. Never published. */
  placeholder?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  tagline: string;
  client: string;
  year: string;
  services: string;
  where: string;
  hero: Media;
  intro: string;
  brief: string;
  idea: string;
  gallery: GalleryItem[];
  whatWeMade: string[];
  result: string | null;
  note: string | null;
  next: string;
}

export interface WorkCard {
  title: string;
  client: string;
  summary: string;
  tags: string[];
  filters: string[];
  cover: Media & { video: string | null; square: boolean };
  /** 0, 1 or 2: the card's column in the desktop "All" view. */
  desktopColumn: number;
  imageHeight: number;
  href: string;
}

export const caseStudies = caseStudiesJson as CaseStudy[];
export const workGrid = workGridJson as WorkCard[];
export const filters = ['All', 'Brand', 'Campaign', 'Digital', 'AI'] as const;

/** Gallery items that are ready to publish (placeholders dropped). */
export const publishedGallery = (c: CaseStudy) => c.gallery.filter((g) => !g.placeholder && g.src && g.alt);

/** The meta strip under the title, without any row that's still to supply. */
export const metaRows = (c: CaseStudy) =>
  ([['Client', c.client], ['Year', c.year], ['What we did', c.services], ['Where', c.where]] as const)
    .filter(([, v]) => !isGap(v))
    .map(([label, value]) => ({ label, value }));

export const bySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
