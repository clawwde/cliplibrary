import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  defaultStage,
  lightLook,
  lookSchema,
  motionSchema,
  PROMO_CARD_IDS,
  promoMeta,
  stageSchema,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const floatingCardsSchema = z.object({
  cards: z
    .array(
      z.object({
        kind: z.enum(PROMO_CARD_IDS),
        x: zSlider({ min: -7, max: 7, step: 0.05 }),
        y: zSlider({ min: -4, max: 4, step: 0.05 }),
        z: zSlider({ min: -2, max: 3, step: 0.05 }),
        turn: zSlider({ min: -0.8, max: 0.8, step: 0.01 }),
        size: zSlider({ min: 1, max: 4, step: 0.05 }),
      }),
    )
    .min(1)
    .max(4),
  delay: zSlider({ min: 0, max: 90 }),
  stagger: zSlider({ min: 0, max: 30 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type FloatingCardsProps = z.infer<typeof floatingCardsSchema>;

export const floatingCardsDefaults: FloatingCardsProps = {
  cards: [
    { kind: 'growth', x: -2.6, y: 1.3, z: 0.6, turn: 0.28, size: 2.2 },
    { kind: 'income', x: 2.8, y: 0.2, z: 0.9, turn: -0.32, size: 2.2 },
    { kind: 'goal', x: -1.2, y: -1.5, z: 1.2, turn: 0.18, size: 2.3 },
  ],
  delay: 8,
  stagger: 12,
  look: lightLook(),
  stage: defaultStage({ cameraDrift: 0.2 }),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const floatingCardsMeta: ClipMeta = {
  ...promoMeta,
  id: 'floating-cards',
  title: 'Floating Cards',
  description: 'UI notification cards pop into 3D space and bob gently at different depths.',
  category: 'overlays',
  tags: ['3d', 'cards', 'notification'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/overlays/floating-cards.tsx',
  durationInFrames: 150,
  posterFrame: 100,
};
