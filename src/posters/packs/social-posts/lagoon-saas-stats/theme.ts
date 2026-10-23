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

export const POST = { width: 1080, height: 1350 } as const;
export const STORY = { width: 1080, height: 1920 } as const;
