import { z } from 'zod';
import { zImage, zSlider } from '../../control';
import {
  defaultMotion,
  defaultStage,
  lightLook,
  lookSchema,
  motionSchema,
  PHONE_FINISHES,
  PROMO_SCREEN_IDS,
  promoMeta,
  stageSchema,
  TEXT_SIDES,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const phoneSwapSchema = z.object({
  screens: z
    .array(z.object({ screen: z.enum(PROMO_SCREEN_IDS), customScreen: zImage() }))
    .min(2)
    .max(4),
  finish: z.enum(PHONE_FINISHES),
  startSide: z.enum(TEXT_SIDES),
  offset: zSlider({ min: 0, max: 4, step: 0.05 }),
  scale: zSlider({ min: 0.4, max: 2.4, step: 0.01 }),
  spinTurns: zSlider({ min: 0, max: 2, step: 1 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PhoneSwapProps = z.infer<typeof phoneSwapSchema>;

export const phoneSwapDefaults: PhoneSwapProps = {
  screens: [
    { screen: 'wallet', customScreen: '' },
    { screen: 'chat', customScreen: '' },
    { screen: 'activity', customScreen: '' },
  ],
  finish: 'black',
  startSide: 'right',
  offset: 2.75,
  scale: 1.32,
  spinTurns: 0,
  look: lightLook(),
  stage: defaultStage(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 16 }),
};

export const phoneSwapMeta: ClipMeta = {
  ...promoMeta,
  id: 'phone-swap',
  title: 'Phone Swap',
  description: 'A phone glides from side to side, crossfading to the next screen on every pass.',
  category: 'devices',
  tags: ['3d', 'phone', 'list'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/devices/phone-swap.tsx',
  durationInFrames: 270,
  posterFrame: 60,
};
