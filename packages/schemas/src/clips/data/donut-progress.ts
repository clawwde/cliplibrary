import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const donutProgressSchema = z.object({
  label: z.string(),
  background: zColor(),
  track: zColor(),
  ring: zColor(),
  color: zColor(),
  percent: zSlider({ min: 0, max: 100, step: 1 }),
  thickness: zSlider({ min: 10, max: 80, step: 1 }),
  speed: zSlider({ min: 20, max: 140, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type DonutProgressProps = z.infer<typeof donutProgressSchema>;

export const donutProgressDefaults: DonutProgressProps = {
  label: 'Goal reached',
  background: '#0a0a12',
  track: '#1f2937',
  ring: '#2dd4bf',
  color: '#f8fafc',
  percent: 78,
  thickness: 44,
  speed: 80,
  easing: 'easeOut',
};

export const donutProgressMeta: ClipMeta = {
  id: 'donut-progress',
  title: 'Donut Progress',
  description:
    'A ring sweeps around to its target percentage while the number counts up in the center, with the target, ring thickness, speed and curve all adjustable.',
  category: 'data',
  tags: ['chart', 'numbers'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/data/donut-progress.tsx',
  durationInFrames: 150,
  posterFrame: 135,
  fps: 30,
  width: 1920,
  height: 1080,
};
