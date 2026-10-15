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

export const outlineMarqueeSchema = z.object({
  text: z.string(),
  label: z.string(),
  rows: zSlider({ min: 1, max: 6 }),
  size: zSlider({ min: 100, max: 480 }),
  weight: zSlider(FONT_WEIGHT),
  stroke: zSlider({ min: 0.5, max: 6, step: 0.25 }),
  outlineOpacity: zSlider({ min: 0.05, max: 1, step: 0.01 }),
  speed: zSlider({ min: 1, max: 8 }),
  labelSize: zSlider({ min: 24, max: 200 }),
  labelTracking: zSlider({ min: -0.05, max: 0.4, step: 0.005 }),
  labelWeight: zSlider(FONT_WEIGHT),
  delay: zSlider({ min: 0, max: 90 }),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type OutlineMarqueeProps = z.infer<typeof outlineMarqueeSchema>;

export const outlineMarqueeDefaults: OutlineMarqueeProps = {
  text: 'CALM MONEY',
  label: 'Calm Money',
  rows: 2,
  size: 420,
  weight: 700,
  stroke: 2,
  outlineOpacity: 0.8,
  speed: 2,
  labelSize: 60,
  labelTracking: 0.12,
  labelWeight: 700,
  delay: 4,
  placement: placement('center', 'center', { width: 1400 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const outlineMarqueeMeta: ClipMeta = {
  ...promoMeta,
  id: 'outline-marquee',
  title: 'Outline Marquee',
  description: 'Rows of huge outlined type glide in opposite directions behind a solid bold label.',
  category: 'typography',
  tags: ['kinetic', 'headline', 'text'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/outline-marquee.tsx',
  durationInFrames: 120,
  posterFrame: 70,
};
