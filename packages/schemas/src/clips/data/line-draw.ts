import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const lineDrawSchema = z.object({
  title: z.string(),
  background: zColor(),
  color: zColor(),
  line: zColor(),
  fill: zColor(),
  points: z
    .array(zSlider({ min: 0, max: 100, step: 1 }))
    .min(2)
    .max(12),
  thickness: zSlider({ min: 2, max: 24, step: 1 }),
  speed: zSlider({ min: 20, max: 140, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type LineDrawProps = z.infer<typeof lineDrawSchema>;

export const lineDrawDefaults: LineDrawProps = {
  title: 'Weekly active users',
  background: '#07101f',
  color: '#e2e8f0',
  line: '#34d399',
  fill: '#34d399',
  points: [18, 30, 24, 46, 40, 64, 58, 82],
  thickness: 8,
  speed: 80,
  easing: 'easeInOut',
};

export const lineDrawMeta: ClipMeta = {
  id: 'line-draw',
  title: 'Line Draw',
  description:
    'A smooth line chart draws itself across the frame and fills in beneath as it goes, with the data points, thickness, draw speed and curve all editable.',
  category: 'data',
  source: 'packages/compositions/src/scenes/data/line-draw.tsx',
  durationInFrames: 180,
  posterFrame: 160,
  fps: 30,
  width: 1920,
  height: 1080,
};
