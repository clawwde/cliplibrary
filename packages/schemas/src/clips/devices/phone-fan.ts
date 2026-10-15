import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  defaultStage,
  lightLook,
  lookSchema,
  motionSchema,
  phone,
  phoneSchema,
  position,
  positionSchema,
  promoMeta,
  stageSchema,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const FAN_ENTRANCES = ['rise', 'spread'] as const;

export const phoneFanSchema = z.object({
  phones: z.array(phoneSchema).length(3),
  position: positionSchema,
  scale: zSlider({ min: 0.4, max: 2.2, step: 0.01 }),
  spacing: zSlider({ min: 1.6, max: 5, step: 0.05 }),
  fan: zSlider({ min: 0, max: 0.9, step: 0.01 }),
  stagger: zSlider({ min: 0, max: 30 }),
  orbit: zSlider({ min: 0, max: 0.5, step: 0.01 }),
  entrance: z.enum(FAN_ENTRANCES),
  spreadDelay: zSlider({ min: 0, max: 160 }),
  flyFrom: zSlider({ min: -8, max: 8, step: 0.05 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PhoneFanProps = z.infer<typeof phoneFanSchema>;

export const phoneFanDefaults: PhoneFanProps = {
  phones: [phone('tasks', 'black'), phone('home', 'white'), phone('calendar', 'black')],
  position: position(0, -0.6),
  scale: 1.34,
  spacing: 3.35,
  fan: 0.4,
  stagger: 9,
  orbit: 0.14,
  entrance: 'rise',
  spreadDelay: 60,
  flyFrom: -6,
  look: lightLook(),
  stage: defaultStage({ cameraDistance: 15 }),
  motion: defaultMotion({ exit: 'fade', exitFrames: 18 }),
};

export const phoneFanMeta: ClipMeta = {
  ...promoMeta,
  id: 'phone-fan',
  title: 'Phone Fan',
  description: 'Three phones rise one after another into a gentle fan while the camera orbits.',
  category: 'devices',
  tags: ['3d', 'phone', 'grid'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/devices/phone-fan.tsx',
  durationInFrames: 180,
  posterFrame: 140,
};
