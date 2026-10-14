import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const WIPE_DIRECTIONS = ['left', 'right', 'up', 'down'] as const;

export const wipeRevealSchema = z.object({
  text: z.string(),
  background: zColor(),
  color: zColor(),
  bar: zColor(),
  direction: z.enum(WIPE_DIRECTIONS),
  speed: zSlider({ min: 12, max: 90, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type WipeRevealProps = z.infer<typeof wipeRevealSchema>;

export const wipeRevealDefaults: WipeRevealProps = {
  text: 'reveal',
  background: '#09090b',
  color: '#fafafa',
  bar: '#e11d48',
  direction: 'left',
  speed: 34,
  easing: 'easeInOut',
};

export const wipeRevealMeta: ClipMeta = {
  id: 'wipe-reveal',
  title: 'Wipe Reveal',
  description:
    'A colored bar sweeps across the frame and hands off to the headline underneath, with the wipe direction, speed and easing curve all editable.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/wipe-reveal.tsx',
  durationInFrames: 120,
  posterFrame: 100,
  fps: 30,
  width: 1920,
  height: 1080,
};
