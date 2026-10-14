import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const countUpSchema = z.object({
  label: z.string(),
  prefix: z.string(),
  suffix: z.string(),
  target: zSlider({ min: 0, max: 1000000, step: 1000 }),
  speed: zSlider({ min: 20, max: 160, step: 1 }),
  background: zColor(),
  color: zColor(),
  accent: zColor(),
  easing: z.enum(EASING_IDS),
});

export type CountUpProps = z.infer<typeof countUpSchema>;

export const countUpDefaults: CountUpProps = {
  label: 'ACTIVE USERS',
  prefix: '',
  suffix: '+',
  target: 128000,
  speed: 90,
  background: '#0c0a1d',
  color: '#f8fafc',
  accent: '#a855f7',
  easing: 'easeOut',
};

export const countUpMeta: ClipMeta = {
  id: 'count-up',
  title: 'Count Up',
  description:
    'A big headline statistic counts up from zero to its target over an adjustable duration and easing curve, with prefix and suffix affixes.',
  category: 'data',
  tags: ['numbers', 'minimal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/data/count-up.tsx',
  durationInFrames: 120,
  posterFrame: 110,
  fps: 30,
  width: 1920,
  height: 1080,
};
