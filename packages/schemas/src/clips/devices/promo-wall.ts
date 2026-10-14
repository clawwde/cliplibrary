import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
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
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const promoWallSchema = z.object({
  headline: zMultiline(),
  highlight: z.string(),
  subline: z.string(),
  showCaption: z.boolean(),
  screens: z.array(z.enum(PROMO_SCREEN_IDS)).min(1).max(14),
  rows: zSlider({ min: 1, max: 4 }),
  columns: zSlider({ min: 3, max: 11 }),
  tilt: zSlider({ min: -1, max: 0.4, step: 0.01 }),
  twist: zSlider({ min: -0.8, max: 0.8, step: 0.01 }),
  drift: zSlider({ min: 0, max: 4, step: 0.05 }),
  finish: z.enum(PHONE_FINISHES),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoWallProps = z.infer<typeof promoWallSchema>;

export const promoWallDefaults: PromoWallProps = {
  headline: '14 crafted screens',
  highlight: '14',
  subline: 'Every flow you need, ready from day one.',
  showCaption: true,
  screens: [...PROMO_SCREEN_IDS],
  rows: 3,
  columns: 9,
  tilt: -0.5,
  twist: 0.3,
  drift: 1.6,
  finish: 'black',
  look: lightLook(),
  stage: defaultStage({ cameraDistance: 19, shadow: 0.12 }),
  motion: defaultMotion({ enter: 'zoom', enterFrames: 18, exit: 'iris', exitFrames: 18 }),
};

export const promoWallMeta: ClipMeta = {
  ...promoMeta,
  category: 'devices',
  tags: ['3d', 'phone', 'grid'],
  theme: 'light',
  id: 'promo-wall',
  title: 'Promo Wall',
  description: 'A tilted wall of phones drifts in alternating rows behind a centred caption.',
  source: 'packages/compositions/src/scenes/devices/promo-wall.tsx',
  durationInFrames: 210,
  posterFrame: 120,
};
