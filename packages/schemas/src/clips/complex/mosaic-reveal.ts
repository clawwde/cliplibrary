import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const mosaicRevealSchema = z.object({
  title: z.string(),
  background: zColor(),
  tileFrom: zColor(),
  tileTo: zColor(),
  color: zColor(),
  columns: zSlider({ min: 4, max: 12, step: 1 }),
  rows: zSlider({ min: 3, max: 8, step: 1 }),
  stagger: zSlider({ min: 1, max: 16, step: 1 }),
  speed: zSlider({ min: 10, max: 60, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type MosaicRevealProps = z.infer<typeof mosaicRevealSchema>;

export const mosaicRevealDefaults: MosaicRevealProps = {
  title: 'assembled',
  background: '#07060d',
  tileFrom: '#1e1b4b',
  tileTo: '#7c3aed',
  color: '#f5f3ff',
  columns: 8,
  rows: 5,
  stagger: 4,
  speed: 22,
  easing: 'easeInOut',
};

export const mosaicRevealMeta: ClipMeta = {
  id: 'mosaic-reveal',
  title: 'Mosaic Reveal',
  description:
    'A grid of tiles flips over in a diagonal wave from one color to the next and settles to reveal a centered title, with the grid size, stagger, flip speed and curve all adjustable.',
  category: 'complex',
  source: 'packages/compositions/src/scenes/complex/mosaic-reveal.tsx',
  durationInFrames: 180,
  posterFrame: 165,
  fps: 30,
  width: 1920,
  height: 1080,
};
