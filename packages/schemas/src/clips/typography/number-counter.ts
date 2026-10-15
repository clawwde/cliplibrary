import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  FONT_WEIGHT,
  kineticLook,
  lookSchema,
  motionSchema,
  placement,
  placementSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const numberCounterSchema = z.object({
  from: zSlider({ min: 0, max: 9999 }),
  to: zSlider({ min: 0, max: 9999 }),
  prefix: z.string(),
  suffix: z.string(),
  size: zSlider({ min: 80, max: 480 }),
  weight: zSlider(FONT_WEIGHT),
  delay: zSlider({ min: 0, max: 90 }),
  countFrames: zSlider({ min: 12, max: 180 }),
  roll: zSlider({ min: 0, max: 1, step: 0.05 }),
  glow: zSlider({ min: 0, max: 1, step: 0.01 }),
  bloom: zSlider({ min: 0, max: 1, step: 0.01 }),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type NumberCounterProps = z.infer<typeof numberCounterSchema>;

export const numberCounterDefaults: NumberCounterProps = {
  from: 0,
  to: 12,
  prefix: '',
  suffix: '',
  size: 330,
  weight: 700,
  delay: 2,
  countFrames: 27,
  roll: 0,
  glow: 0.25,
  bloom: 1,
  placement: placement('center', 'center', { width: 1400 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'blur', exitFrames: 14 }),
};

export const numberCounterMeta: ClipMeta = {
  ...promoMeta,
  id: 'number-counter',
  title: 'Number Counter',
  description: 'A big number rolls up digit by digit out of a soft glow and settles.',
  category: 'typography',
  tags: ['kinetic', 'text', 'reveal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/number-counter.tsx',
  durationInFrames: 90,
  posterFrame: 70,
};
