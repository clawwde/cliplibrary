import type { Fill } from '@/design';

export interface PostTheme {
  background: Fill;
  surface: string;
  ink: string;
  text: string;
  muted: string;
  brand: string;
  brandText: string;
  deep: string;
  star: string;
  headFont: string;
  bodyFont: string;
}

export interface ListingTheme {
  page: string;
  text: string;
  muted: string;
  brand: string;
  brandDeep: string;
  highlight: string;
  accent: string;
  folder: Fill;
  ink: string;
  headFont: string;
  bodyFont: string;
}

export interface ListingCopy {
  kicker: string;
  title: string;
  line: string;
  count: string;
  bonus: string;
  showcase: readonly [string, string];
  showcaseNote: string;
  editable: string;
  steps: readonly [string, string, string];
  stepsNote: string;
  offers: readonly [string, string, string];
  offerNote: string;
  studio: readonly [string, string];
  folder: string;
  folderSize: string;
  handle: string;
}

export const POST = { width: 1080, height: 1350 } as const;
export const STORY = { width: 1080, height: 1920 } as const;
