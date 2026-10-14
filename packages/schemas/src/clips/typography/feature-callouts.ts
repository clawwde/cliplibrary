import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
import {
  defaultMotion,
  lightLook,
  lookSchema,
  motionSchema,
  promoMeta,
  TEXT_SIDES,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const featureCalloutsSchema = z.object({
  label: z.string(),
  features: z
    .array(z.object({ title: z.string(), body: zMultiline() }))
    .min(1)
    .max(4),
  startSide: z.enum(TEXT_SIDES),
  size: zSlider({ min: 48, max: 160 }),
  inset: zSlider({ min: 60, max: 600 }),
  look: lookSchema,
  motion: motionSchema,
});

export type FeatureCalloutsProps = z.infer<typeof featureCalloutsSchema>;

export const featureCalloutsDefaults: FeatureCalloutsProps = {
  label: 'Feature',
  features: [
    { title: 'Smart wallet', body: 'Cards, balances and limits together, always in sync.' },
    { title: 'Real-time chat', body: 'Message friends, split bills and share plans in one place.' },
    {
      title: 'Health and habits',
      body: 'Close your rings, track sleep and build routines that last.',
    },
  ],
  startSide: 'left',
  size: 104,
  inset: 170,
  look: lightLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const featureCalloutsMeta: ClipMeta = {
  ...promoMeta,
  id: 'feature-callouts',
  title: 'Feature Callouts',
  description:
    'Numbered feature titles take turns on alternating sides, timed to pair with Phone Swap.',
  category: 'typography',
  tags: ['headline', 'text', 'list'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/typography/feature-callouts.tsx',
  durationInFrames: 270,
  posterFrame: 60,
};
