import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
import type { ClipMeta } from '../../registry';
import {
  defaultMotion,
  defaultStage,
  lightLook,
  lookSchema,
  motionSchema,
  PROMO_CARD_IDS,
  phone,
  phoneSchema,
  promoMeta,
  stageSchema,
  TEXT_SIDES,
} from './common';

export const promoHeroSchema = z.object({
  eyebrow: z.string(),
  headline: zMultiline(),
  highlight: z.string(),
  body: zMultiline(),
  textSide: z.enum(TEXT_SIDES),
  phone: phoneSchema,
  phoneScale: zSlider({ min: 0.5, max: 2.2, step: 0.01 }),
  spinTurns: zSlider({ min: 0, max: 3, step: 0.25 }),
  tilt: zSlider({ min: -0.8, max: 0.8, step: 0.01 }),
  card: z.object({
    show: z.boolean(),
    kind: z.enum(PROMO_CARD_IDS),
    size: zSlider({ min: 1, max: 4, step: 0.05 }),
  }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoHeroProps = z.infer<typeof promoHeroSchema>;

export const promoHeroDefaults: PromoHeroProps = {
  eyebrow: 'Meet Halo',
  headline: 'The app that\nkeeps it simple.',
  highlight: 'simple',
  body: 'Money, plans and people, organised in one calm place.',
  textSide: 'left',
  phone: phone('home', 'natural'),
  phoneScale: 1.32,
  spinTurns: 1,
  tilt: 0.32,
  card: { show: true, kind: 'income', size: 2.1 },
  look: lightLook(),
  stage: defaultStage(),
  motion: defaultMotion({ enter: 'fade', enterFrames: 12, exit: 'none', exitFrames: 0 }),
};

export const promoHeroMeta: ClipMeta = {
  ...promoMeta,
  id: 'promo-hero',
  title: 'Promo Hero',
  description:
    'A 3D phone spins in and settles beside a masked headline, with an optional floating card.',
  source: 'packages/compositions/src/scenes/promo/promo-hero.tsx',
  durationInFrames: 210,
  posterFrame: 150,
};
