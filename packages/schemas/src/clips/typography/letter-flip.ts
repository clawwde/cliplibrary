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

export const letterFlipSchema = z.object({
  text: z.string(),
  size: zSlider({ min: 80, max: 480 }),
  weight: zSlider(FONT_WEIGHT),
  tracking: zSlider({ min: -0.08, max: 0.3, step: 0.005 }),
  startAngle: zSlider({ min: 30, max: 180 }),
  slide: zSlider({ min: 0, max: 2, step: 0.05 }),
  delay: zSlider({ min: 0, max: 90 }),
  stagger: zSlider({ min: 0, max: 12 }),
  flipFrames: zSlider({ min: 10, max: 60 }),
  highlight: zSlider({ min: 0, max: 20 }),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type LetterFlipProps = z.infer<typeof letterFlipSchema>;

export const letterFlipDefaults: LetterFlipProps = {
  text: 'HALO',
  size: 300,
  weight: 700,
  tracking: -0.02,
  startAngle: 88,
  slide: 0.5,
  delay: 4,
  stagger: 4,
  flipFrames: 30,
  highlight: 0,
  placement: placement('center', 'center', { width: 1700 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'blur', exitFrames: 14 }),
};

export const letterFlipMeta: ClipMeta = {
  ...promoMeta,
  id: 'letter-flip',
  title: 'Letter Flip',
  description: 'Each letter swings in from its mirror image and lands in turn.',
  category: 'typography',
  tags: ['kinetic', 'logo', 'text', 'reveal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/letter-flip.tsx',
  durationInFrames: 90,
  posterFrame: 70,
};
