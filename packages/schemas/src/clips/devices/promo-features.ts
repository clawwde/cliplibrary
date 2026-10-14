import { z } from 'zod';
import { zImage, zMultiline, zSlider } from '../../control';
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

export const promoFeaturesSchema = z.object({
  label: z.string(),
  features: z
    .array(
      z.object({
        title: z.string(),
        body: zMultiline(),
        screen: z.enum(PROMO_SCREEN_IDS),
        customScreen: zImage(),
      }),
    )
    .min(1)
    .max(4),
  finish: z.enum(PHONE_FINISHES),
  phoneScale: zSlider({ min: 0.5, max: 2.2, step: 0.01 }),
  offset: zSlider({ min: 1.5, max: 4, step: 0.05 }),
  spinTurns: zSlider({ min: 0, max: 2, step: 1 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoFeaturesProps = z.infer<typeof promoFeaturesSchema>;

export const promoFeaturesDefaults: PromoFeaturesProps = {
  label: 'Feature',
  features: [
    {
      title: 'Smart wallet',
      body: 'Cards, balances and limits together, always in sync.',
      screen: 'wallet',
      customScreen: '',
    },
    {
      title: 'Real-time chat',
      body: 'Message friends, split bills and share plans in one place.',
      screen: 'chat',
      customScreen: '',
    },
    {
      title: 'Health and habits',
      body: 'Close your rings, track sleep and build routines that last.',
      screen: 'activity',
      customScreen: '',
    },
  ],
  finish: 'black',
  phoneScale: 1.32,
  offset: 2.75,
  spinTurns: 0,
  look: lightLook(),
  stage: defaultStage(),
  motion: defaultMotion({ enter: 'rise', enterFrames: 20, exit: 'fade', exitFrames: 16 }),
};

export const promoFeaturesMeta: ClipMeta = {
  ...promoMeta,
  category: 'devices',
  tags: ['3d', 'phone', 'list'],
  theme: 'light',
  id: 'promo-features',
  title: 'Promo Features',
  description:
    'A phone spins from side to side, swapping screens as each numbered feature is revealed.',
  source: 'packages/compositions/src/scenes/devices/promo-features.tsx',
  durationInFrames: 270,
  posterFrame: 60,
};
