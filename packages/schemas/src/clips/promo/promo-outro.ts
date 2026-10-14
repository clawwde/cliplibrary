import { z } from 'zod';
import { zColor, zSlider } from '../../control';
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

export const promoOutroSchema = z.object({
  brandName: z.string(),
  showMark: z.boolean(),
  markColor: zColor(),
  headline: z.string(),
  highlight: z.string(),
  subline: z.string(),
  primaryCaption: z.string(),
  primaryLabel: z.string(),
  secondaryCaption: z.string(),
  secondaryLabel: z.string(),
  url: z.string(),
  showPhones: z.boolean(),
  phones: z.array(phoneSchema).length(2),
  phoneScale: zSlider({ min: 0.5, max: 2, step: 0.01 }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type PromoOutroProps = z.infer<typeof promoOutroSchema>;

export const promoOutroDefaults: PromoOutroProps = {
  brandName: 'Halo',
  showMark: true,
  markColor: '#2f5bff',
  headline: 'Download Halo today.',
  highlight: 'Halo',
  subline: 'Free to start. Built for calm.',
  primaryCaption: 'Download for',
  primaryLabel: 'iOS',
  secondaryCaption: 'Get it on',
  secondaryLabel: 'Android',
  url: 'www.yourwebsite.com',
  showPhones: true,
  phones: [phone('profile', 'white'), phone('home', 'natural')],
  phoneScale: 1.15,
  look: lightLook(),
  stage: defaultStage(),
  motion: defaultMotion({ enter: 'blur', enterFrames: 20, exit: 'none', exitFrames: 0 }),
};

export const promoOutroMeta: ClipMeta = {
  ...promoMeta,
  id: 'promo-outro',
  title: 'Promo Outro',
  description:
    'The closing call to action: mark, headline, store buttons and a URL between two phones.',
  source: 'packages/compositions/src/scenes/promo/promo-outro.tsx',
  durationInFrames: 150,
  posterFrame: 110,
};
