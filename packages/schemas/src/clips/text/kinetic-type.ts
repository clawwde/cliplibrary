import { z } from 'zod';
import { zColor, zMultiline, zSlider } from '../../control';
import { EASING_IDS } from '../../easing';
import type { ClipMeta } from '../../registry';

export const kineticTypeSchema = z.object({
  body: zMultiline(),
  background: zColor(),
  color: zColor(),
  accent: zColor(),
  stagger: zSlider({ min: 1, max: 16, step: 1 }),
  damping: zSlider({ min: 4, max: 24, step: 1 }),
  easing: z.enum(EASING_IDS),
});

export type KineticTypeProps = z.infer<typeof kineticTypeSchema>;

export const kineticTypeDefaults: KineticTypeProps = {
  body: 'make it move',
  background: '#18042a',
  color: '#fdf4ff',
  accent: '#f0abfc',
  stagger: 4,
  damping: 8,
  easing: 'easeOut',
};

export const kineticTypeMeta: ClipMeta = {
  id: 'kinetic-type',
  title: 'Kinetic Type',
  description:
    'Words punch in one at a time with an elastic bounce and alternating accent color, where the stagger paces the sequence and a lower damping bounces harder.',
  category: 'text',
  source: 'packages/compositions/src/scenes/text/kinetic-type.tsx',
  durationInFrames: 150,
  posterFrame: 130,
  fps: 30,
  width: 1920,
  height: 1080,
};
