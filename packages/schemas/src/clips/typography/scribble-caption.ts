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
  SCRIBBLE_SHAPES,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const SCRIBBLE_PLACES = ['through', 'under', 'around'] as const;

export const scribbleCaptionSchema = z.object({
  text: z.string(),
  size: zSlider({ min: 16, max: 96 }),
  weight: zSlider(FONT_WEIGHT),
  tracking: zSlider({ min: 0, max: 0.8, step: 0.01 }),
  spread: zSlider({ min: 0, max: 1, step: 0.05 }),
  shape: z.enum(SCRIBBLE_SHAPES),
  scribblePlace: z.enum(SCRIBBLE_PLACES),
  scribbleWidth: zSlider({ min: 160, max: 1800 }),
  strokeWidth: zSlider({ min: 1, max: 10, step: 0.5 }),
  keepScribble: z.boolean(),
  delay: zSlider({ min: 0, max: 90 }),
  drawFrames: zSlider({ min: 8, max: 60 }),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type ScribbleCaptionProps = z.infer<typeof scribbleCaptionSchema>;

export const scribbleCaptionDefaults: ScribbleCaptionProps = {
  text: 'SAVE PLAN GROW TOGETHER',
  size: 30,
  weight: 600,
  tracking: 0.34,
  spread: 0.5,
  shape: 'loop',
  scribblePlace: 'through',
  scribbleWidth: 760,
  strokeWidth: 3,
  keepScribble: false,
  delay: 4,
  drawFrames: 22,
  placement: placement('center', 'center', { width: 1600 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const scribbleCaptionMeta: ClipMeta = {
  ...promoMeta,
  id: 'scribble-caption',
  title: 'Scribble Caption',
  description:
    'A hand-drawn stroke sweeps across while a wide-tracked caption opens out behind it.',
  category: 'typography',
  tags: ['kinetic', 'text', 'reveal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/scribble-caption.tsx',
  durationInFrames: 96,
  posterFrame: 60,
};
