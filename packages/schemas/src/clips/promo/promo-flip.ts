import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
import type { ClipMeta } from '../../registry';
import {
  defaultMotion,
  defaultStage,
  lightLook,
  lookSchema,
  motionSchema,
  phone,
  phoneSchema,
  promoMeta,
  stageSchema,
} from './common';

export const promoFlipSchema = z.object({
  firstEyebrow: z.string(),
  firstHeadline: zMultiline(),
  secondEyebrow: z.string(),
  secondHeadline: zMultiline(),
  highlight: z.string(),
  details: z.array(z.string()).max(4),
  phone: phoneSchema,
  phoneScale: zSlider({ min: 0.5, max: 2.2, step: 0.01 }),
  turnAt: zSlider({ min: 0.2, max: 0.8, step: 0.01 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoFlipProps = z.infer<typeof promoFlipSchema>;

export const promoFlipDefaults: PromoFlipProps = {
  firstEyebrow: 'Design',
  firstHeadline: 'Crafted in\nevery detail.',
  secondEyebrow: 'Experience',
  secondHeadline: 'Beautiful from\nevery angle.',
  highlight: 'detail angle',
  details: ['Clean typography', 'Light and dark', 'Pixel perfect'],
  phone: phone('analytics', 'blue'),
  phoneScale: 1.38,
  turnAt: 0.52,
  look: lightLook(),
  stage: defaultStage({ cameraDistance: 13 }),
  motion: defaultMotion({ enter: 'iris', enterFrames: 20, exit: 'fade', exitFrames: 20 }),
};

export const promoFlipMeta: ClipMeta = {
  ...promoMeta,
  id: 'promo-flip',
  title: 'Promo Flip',
  description:
    'A phone rises showing its camera, then turns to reveal the screen as the headline swaps.',
  source: 'packages/compositions/src/scenes/promo/promo-flip.tsx',
  durationInFrames: 180,
  posterFrame: 150,
};
