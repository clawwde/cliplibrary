import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  defaultStage,
  lightLook,
  lookSchema,
  motionSchema,
  PROMO_SCREEN_IDS,
  phone,
  phoneSchema,
  position,
  positionSchema,
  promoMeta,
  stageSchema,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const phoneTurnaroundSchema = z.object({
  phone: phoneSchema,
  position: positionSchema,
  scale: zSlider({ min: 0.4, max: 2.6, step: 0.01 }),
  turnAt: zSlider({ min: 0.05, max: 0.8, step: 0.01 }),
  rise: zSlider({ min: 0, max: 10, step: 0.1 }),
  turnFrames: zSlider({ min: 20, max: 120 }),
  secondScreen: z.enum(['none', ...PROMO_SCREEN_IDS]),
  secondTurnAt: zSlider({ min: 0, max: 600 }),
  secondTurnFrames: zSlider({ min: 20, max: 200 }),
  travelX: zSlider({ min: -6, max: 6, step: 0.05 }),
  endYaw: zSlider({ min: -1, max: 1, step: 0.01 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PhoneTurnaroundProps = z.infer<typeof phoneTurnaroundSchema>;

export const phoneTurnaroundDefaults: PhoneTurnaroundProps = {
  phone: phone('analytics', 'blue'),
  position: position(0, 0),
  scale: 1.38,
  turnAt: 0.5,
  rise: 4.6,
  turnFrames: 64,
  secondScreen: 'none',
  secondTurnAt: 140,
  secondTurnFrames: 100,
  travelX: 0,
  endYaw: 0.2,
  look: lightLook(),
  stage: defaultStage({ cameraDistance: 13 }),
  motion: defaultMotion({ exit: 'fade', exitFrames: 18 }),
};

export const phoneTurnaroundMeta: ClipMeta = {
  ...promoMeta,
  id: 'phone-turnaround',
  title: 'Phone Turnaround',
  description: 'A phone rises showing its camera module, then turns to reveal the screen.',
  category: 'devices',
  tags: ['3d', 'phone', 'reveal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/devices/phone-turnaround.tsx',
  durationInFrames: 180,
  posterFrame: 160,
};
