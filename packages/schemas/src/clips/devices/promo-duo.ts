import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
import {
  darkLook,
  defaultMotion,
  defaultStage,
  lookSchema,
  motionSchema,
  phone,
  phoneSchema,
  promoMeta,
  stageSchema,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const promoDuoSchema = z.object({
  eyebrow: z.string(),
  headline: zMultiline(),
  highlight: z.string(),
  phones: z.array(phoneSchema).length(2),
  phoneScale: zSlider({ min: 0.5, max: 2, step: 0.01 }),
  gap: zSlider({ min: 0.4, max: 3, step: 0.05 }),
  angle: zSlider({ min: 0, max: 0.9, step: 0.01 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoDuoProps = z.infer<typeof promoDuoSchema>;

export const promoDuoDefaults: PromoDuoProps = {
  eyebrow: 'Available now',
  headline: 'Works everywhere you do.',
  highlight: 'everywhere',
  phones: [phone('music', 'black'), phone('map', 'blue')],
  phoneScale: 1.18,
  gap: 1.1,
  angle: 0.34,
  look: darkLook(),
  stage: defaultStage({ cameraDistance: 13, keyLight: 1.4, shadow: 0.45 }),
  motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
};

export const promoDuoMeta: ClipMeta = {
  ...promoMeta,
  category: 'devices',
  tags: ['3d', 'phone'],
  theme: 'dark',
  id: 'promo-duo',
  title: 'Promo Duo',
  description: 'Two phones slide in from opposite sides on a dark stage with a centred line.',
  source: 'packages/compositions/src/scenes/devices/promo-duo.tsx',
  durationInFrames: 135,
  posterFrame: 90,
};
