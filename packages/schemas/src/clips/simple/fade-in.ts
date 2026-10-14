import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const fadeInSchema = z.object({
  text: z.string(),
  background: zColor(),
  color: zColor(),
  speed: zSlider({ min: 10, max: 90, step: 1 }),
  scaleFrom: zSlider({ min: 0.5, max: 1, step: 0.01 }),
  easing: z.enum(EASING_IDS),
});

export type FadeInProps = z.infer<typeof fadeInSchema>;

export const fadeInDefaults: FadeInProps = {
  text: 'fade in',
  background: '#0c1222',
  color: '#f8fafc',
  speed: 34,
  scaleFrom: 0.86,
  easing: 'easeOut',
};

export const fadeInMeta: ClipMeta = {
  id: 'fade-in',
  title: 'Fade In',
  description:
    'A line of text fades up from transparent while easing out of a gentle scale, with the fade duration, start scale and curve all adjustable.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/fade-in.tsx',
  durationInFrames: 120,
  posterFrame: 100,
  fps: 30,
  width: 1920,
  height: 1080,
};
