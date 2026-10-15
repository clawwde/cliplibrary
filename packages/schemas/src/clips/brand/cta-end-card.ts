import { z } from 'zod';
import { zColor, zImage, zSlider } from '../../control';
import {
  defaultMotion,
  lightLook,
  lookSchema,
  motionSchema,
  placement,
  placementSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const CTA_MARKS = ['ring', 'app-icon'] as const;

export const CTA_FONTS = ['display', 'rounded'] as const;

export const CTA_BADGES = ['pill', 'store'] as const;

export const ctaEndCardSchema = z.object({
  brandName: z.string(),
  showMark: z.boolean(),
  markColor: zColor(),
  markColorEnd: zColor(),
  markInk: zColor(),
  mark: z.enum(CTA_MARKS),
  font: z.enum(CTA_FONTS),
  headlineWeight: zSlider({ min: 400, max: 900, step: 100 }),
  badges: z.enum(CTA_BADGES),
  badgeScale: zSlider({ min: 0.5, max: 2, step: 0.01 }),
  gap: zSlider({ min: 0, max: 120 }),
  markAt: zSlider({ min: 0, max: 120 }),
  headlineAt: zSlider({ min: 0, max: 120 }),
  badgesAt: zSlider({ min: 0, max: 120 }),
  markGlyph: zImage(),
  markSize: zSlider({ min: 32, max: 200 }),
  headlineSize: zSlider({ min: 40, max: 160 }),
  placement: placementSchema,
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
  markColorEnd: '#2f5bff',
  markInk: '#ffffff',
  mark: 'ring',
  font: 'display',
  headlineWeight: 600,
  badges: 'pill',
  badgeScale: 1,
  gap: 34,
  markAt: 10,
  headlineAt: 22,
  badgesAt: 38,
  markGlyph: '',
  markSize: 64,
  headlineSize: 104,
  placement: placement('center', 'center', { insetX: 0, insetY: 0, width: 1600 }),
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
