import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const SLIDE_DIRECTIONS = ['left', 'right', 'top', 'bottom'] as const;

export const slideInSchema = z.object({
  text: z.string(),
  background: zColor(),
  color: zColor(),
  direction: z.enum(SLIDE_DIRECTIONS),
  distance: zSlider({ min: 100, max: 900, step: 10 }),
  speed: zSlider({ min: 10, max: 90, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type SlideInProps = z.infer<typeof slideInSchema>;

export const slideInDefaults: SlideInProps = {
  text: 'slide in',
  background: '#101827',
  color: '#f1f5f9',
  direction: 'left',
  distance: 480,
  speed: 30,
  easing: 'easeOut',
};

export const slideInMeta: ClipMeta = {
  id: 'slide-in',
  title: 'Slide In',
  description:
    'Text glides in from an edge you choose and fades up as it arrives, with a travel distance, duration and easing curve you can tune live.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/slide-in.tsx',
  durationInFrames: 120,
  posterFrame: 100,
  fps: 30,
  width: 1920,
  height: 1080,
};
