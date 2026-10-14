import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const blurFadeInSchema = z.object({
  text: z.string(),
  background: zColor(),
  color: zColor(),
  blur: zSlider({ min: 0, max: 60, step: 1 }),
  speed: zSlider({ min: 10, max: 90, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type BlurFadeInProps = z.infer<typeof blurFadeInSchema>;

export const blurFadeInDefaults: BlurFadeInProps = {
  text: 'blur into focus',
  background: '#0b0f1a',
  color: '#f5f7ff',
  blur: 26,
  speed: 42,
  easing: 'easeOut',
};

export const blurFadeInMeta: ClipMeta = {
  id: 'blur-fade-in',
  title: 'Blur Fade In',
  description:
    'A single line of text resolves out of a heavy blur while fading up, driven by an adjustable blur radius, duration and easing curve.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/blur-fade-in.tsx',
  durationInFrames: 90,
  posterFrame: 75,
  fps: 30,
  width: 1920,
  height: 1080,
};
