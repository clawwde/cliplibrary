import { z } from 'zod';
import { zColor } from '../../control';
import { defaultMotion, lightLook, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const ctaEndCardSchema = z.object({
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
  look: lookSchema,
  motion: motionSchema,
});

export type CtaEndCardProps = z.infer<typeof ctaEndCardSchema>;

export const ctaEndCardDefaults: CtaEndCardProps = {
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
  look: lightLook(),
  motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
};

export const ctaEndCardMeta: ClipMeta = {
  ...promoMeta,
  id: 'cta-end-card',
  title: 'CTA End Card',
  description: 'A closing card with the brand mark, a headline, two store buttons and a URL.',
  category: 'brand',
  tags: ['cta', 'logo', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/brand/cta-end-card.tsx',
  durationInFrames: 150,
  posterFrame: 110,
};
