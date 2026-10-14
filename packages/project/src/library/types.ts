import type { Project } from '../project';

export const LIBRARY_CLIP_IDS = [
  'title-card',
  'lower-third',
  'quote-card',
  'kinetic-headline',
  'bullet-list',
  'revenue-stat',
  'stat-callout',
  'logo-reveal',
  'image-gallery',
  'split-feature',
] as const;

export type LibraryClipId = (typeof LIBRARY_CLIP_IDS)[number];

export interface LibraryClipMeta {
  id: LibraryClipId;
  title: string;
  description: string;
  category: string;
}

export interface LibraryClip {
  meta: LibraryClipMeta;
  build: () => Project;
}
