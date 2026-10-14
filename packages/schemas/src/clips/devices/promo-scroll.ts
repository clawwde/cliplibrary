import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
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
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const promoScrollSchema = z.object({
  eyebrow: z.string(),
  headline: zMultiline(),
  highlight: z.string(),
  body: zMultiline(),
  textSide: z.enum(TEXT_SIDES),
  phone: phoneSchema,
  phoneScale: zSlider({ min: 0.5, max: 2.2, step: 0.01 }),
  scrollAmount: zSlider({ min: 0, max: 1, step: 0.01 }),
  cards: z.array(z.enum(PROMO_CARD_IDS)).max(3),
  cardSize: zSlider({ min: 1, max: 3.5, step: 0.05 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoScrollProps = z.infer<typeof promoScrollSchema>;

export const promoScrollDefaults: PromoScrollProps = {
  eyebrow: 'Discover',
  headline: 'Insights that\nmove with you.',
  highlight: 'move',
  body: 'A personal feed of ideas and progress, curated every day.',
  textSide: 'left',
  phone: phone('feed', 'white'),
  phoneScale: 1.42,
  scrollAmount: 1,
  cards: ['growth', 'goal', 'income'],
  cardSize: 2.1,
  look: lightLook(),
  stage: defaultStage(),
  motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
};

export const promoScrollMeta: ClipMeta = {
  ...promoMeta,
  category: 'devices',
  tags: ['3d', 'phone', 'scroll', 'cards'],
  theme: 'light',
  id: 'promo-scroll',
  title: 'Promo Scroll',
  description: 'A tilted phone scrolls a long feed while floating cards drift around it.',
  source: 'packages/compositions/src/scenes/devices/promo-scroll.tsx',
  durationInFrames: 180,
  posterFrame: 120,
};
