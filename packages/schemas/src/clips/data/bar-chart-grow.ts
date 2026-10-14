import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const barChartGrowSchema = z.object({
  title: z.string(),
  background: zColor(),
  color: zColor(),
  bars: z
    .array(
      z.object({
        label: z.string(),
        value: zSlider({ min: 0, max: 100, step: 1 }),
        color: zColor(),
      }),
    )
    .min(2)
    .max(8),
  speed: zSlider({ min: 10, max: 80, step: 1 }),
  stagger: zSlider({ min: 0, max: 20, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type BarChartGrowProps = z.infer<typeof barChartGrowSchema>;

export const barChartGrowDefaults: BarChartGrowProps = {
  title: 'Quarterly growth',
  background: '#0b1020',
  color: '#f8fafc',
  bars: [
    { label: 'Q1', value: 42, color: '#38bdf8' },
    { label: 'Q2', value: 61, color: '#818cf8' },
    { label: 'Q3', value: 78, color: '#c084fc' },
    { label: 'Q4', value: 93, color: '#f472b6' },
  ],
  speed: 34,
  stagger: 6,
  easing: 'easeOut',
};

export const barChartGrowMeta: ClipMeta = {
  id: 'bar-chart-grow',
  title: 'Bar Chart Grow',
  description:
    'Bars rise from the baseline to their values in a staggered cascade with counting labels, where the grow speed, stagger and curve are all adjustable.',
  category: 'data',
  tags: ['chart', 'numbers'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/data/bar-chart-grow.tsx',
  durationInFrames: 180,
  posterFrame: 160,
  fps: 30,
  width: 1920,
  height: 1080,
};
