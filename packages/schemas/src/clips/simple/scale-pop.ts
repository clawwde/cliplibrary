import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const scalePopSchema = z.object({
  text: z.string(),
  background: zColor(),
  color: zColor(),
  accent: zColor(),
  damping: zSlider({ min: 4, max: 30, step: 1 }),
  fade: zSlider({ min: 6, max: 60, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type ScalePopProps = z.infer<typeof scalePopSchema>;

export const scalePopDefaults: ScalePopProps = {
  text: 'pop',
  background: '#111016',
  color: '#fef3c7',
  accent: '#f97316',
  damping: 9,
  fade: 20,
  easing: 'easeOut',
};

export const scalePopMeta: ClipMeta = {
  id: 'scale-pop',
  title: 'Scale Pop',
  description:
    'Text springs up from nothing with an elastic overshoot behind a glowing accent, where a lower damping makes the pop bouncier and the fade and curve stay adjustable.',
  category: 'simple',
  source: 'packages/compositions/src/scenes/simple/scale-pop.tsx',
  durationInFrames: 120,
  posterFrame: 95,
  fps: 30,
  width: 1920,
  height: 1080,
};
