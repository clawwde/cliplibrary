import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { defaultMotion, lightLook, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const promoIntroSchema = z.object({
  eyebrow: z.string(),
  brandName: z.string(),
  tagline: z.string(),
  showMark: z.boolean(),
  markColor: zColor(),
  wordmarkSize: zSlider({ min: 80, max: 320 }),
  pushIn: zSlider({ min: 0, max: 0.2, step: 0.005 }),
  look: lookSchema,
  motion: motionSchema,
});

export type PromoIntroProps = z.infer<typeof promoIntroSchema>;

export const promoIntroDefaults: PromoIntroProps = {
  eyebrow: 'Introducing',
  brandName: 'Halo',
  tagline: 'Everything you need, in one calm app.',
  showMark: true,
  markColor: '#2f5bff',
  wordmarkSize: 200,
  pushIn: 0.08,
  look: lightLook(),
  motion: defaultMotion({ exit: 'blur', exitFrames: 18 }),
};

export const promoIntroMeta: ClipMeta = {
  ...promoMeta,
  category: 'brand',
  tags: ['logo', 'reveal', 'minimal'],
  theme: 'light',
  id: 'promo-intro',
  title: 'Promo Intro',
  description: 'A minimal brand open: a drawn ring mark, a masked wordmark reveal and a tagline.',
  source: 'packages/compositions/src/scenes/brand/promo-intro.tsx',
  durationInFrames: 120,
  posterFrame: 80,
};
