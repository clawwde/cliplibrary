import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const gradientSweepTextSchema = z.object({
  text: z.string(),
  background: zColor(),
  colorA: zColor(),
  colorB: zColor(),
  angle: zSlider({ min: 0, max: 180, step: 5 }),
  speed: zSlider({ min: 20, max: 140, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type GradientSweepTextProps = z.infer<typeof gradientSweepTextSchema>;

export const gradientSweepTextDefaults: GradientSweepTextProps = {
  text: 'gradient sweep',
  background: '#05060a',
  colorA: '#22d3ee',
  colorB: '#c084fc',
  angle: 60,
  speed: 70,
  easing: 'easeInOut',
};

export const gradientSweepTextMeta: ClipMeta = {
  id: 'gradient-sweep-text',
  title: 'Gradient Sweep Text',
  description:
    'A two color gradient sweeps across the headline as it fades up, with the gradient angle, sweep speed and easing curve all adjustable.',
  category: 'typography',
  tags: ['text', 'headline', 'gradient'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/gradient-sweep-text.tsx',
  durationInFrames: 150,
  posterFrame: 120,
  fps: 30,
  width: 1920,
  height: 1080,
};
