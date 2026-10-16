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

export const phoneSpinInSchema = z.object({
  phone: phoneSchema,
  position: positionSchema,
  scale: zSlider({ min: 0.4, max: 2.6, step: 0.01 }),
  spinTurns: zSlider({ min: 0, max: 2, step: 0.05 }),
  tilt: zSlider({ min: -0.8, max: 0.8, step: 0.01 }),
  rise: zSlider({ min: 0, max: 10, step: 0.1 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PhoneSpinInProps = z.infer<typeof phoneSpinInSchema>;

export const phoneSpinInDefaults: PhoneSpinInProps = {
  phone: phone('home', 'natural'),
  position: position(0, -0.05),
  scale: 1.34,
  spinTurns: 0.25,
  tilt: 0.3,
  rise: 5.5,
  look: lightLook(),
  stage: defaultStage(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 16 }),
};

export const phoneSpinInMeta: ClipMeta = {
  ...promoMeta,
  id: 'phone-spin-in',
  title: 'Phone Spin In',
  description: 'A single 3D phone rises with a gentle spin and settles into place, then floats.',
  category: 'phone-reveals',
  tags: ['3d', 'phone', 'spin', 'float'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/phone-reveals/phone-spin-in.tsx',
  durationInFrames: 150,
  posterFrame: 110,
};
