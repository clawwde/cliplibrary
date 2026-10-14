import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const bounceInSchema = z.object({
  text: z.string(),
  background: zColor(),
  color: zColor(),
  dropHeight: zSlider({ min: 100, max: 800, step: 10 }),
  damping: zSlider({ min: 4, max: 20, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type BounceInProps = z.infer<typeof bounceInSchema>;

export const bounceInDefaults: BounceInProps = {
  text: 'bounce',
  background: '#0f172a',
  color: '#bae6fd',
  dropHeight: 420,
  damping: 8,
  easing: 'easeOut',
};

export const bounceInMeta: ClipMeta = {
  id: 'bounce-in',
  title: 'Bounce In',
  description:
    'Text drops in from above and settles with a springy bounce, where the drop height sets the fall and a lower damping adds more rebound.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/bounce-in.tsx',
  durationInFrames: 120,
  posterFrame: 105,
  fps: 30,
  width: 1920,
  height: 1080,
};
