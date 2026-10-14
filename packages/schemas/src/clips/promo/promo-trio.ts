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

export const promoTrioSchema = z.object({
  headline: zMultiline(),
  highlight: z.string(),
  phones: z.array(phoneSchema).length(3),
  phoneScale: zSlider({ min: 0.5, max: 2, step: 0.01 }),
  spacing: zSlider({ min: 1.6, max: 5, step: 0.05 }),
  fan: zSlider({ min: 0, max: 0.9, step: 0.01 }),
  stagger: zSlider({ min: 0, max: 30 }),
  orbit: zSlider({ min: 0, max: 0.5, step: 0.01 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoTrioProps = z.infer<typeof promoTrioSchema>;

export const promoTrioDefaults: PromoTrioProps = {
  headline: 'Plan. Track. Connect.',
  highlight: 'Track.',
  phones: [phone('tasks', 'black'), phone('home', 'white'), phone('calendar', 'black')],
  phoneScale: 1.34,
  spacing: 3.35,
  fan: 0.4,
  stagger: 9,
  orbit: 0.14,
  look: lightLook(),
  stage: defaultStage({ cameraDistance: 15 }),
  motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
};

export const promoTrioMeta: ClipMeta = {
  ...promoMeta,
  id: 'promo-trio',
  title: 'Promo Trio',
  description:
    'Three phones rise into a gentle fan under a centred headline while the camera orbits.',
  source: 'packages/compositions/src/scenes/promo/promo-trio.tsx',
  durationInFrames: 195,
  posterFrame: 140,
};
