import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
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

export const headlineRevealSchema = z.object({
  eyebrow: z.string(),
  headline: zMultiline(),
  highlight: z.string(),
  body: zMultiline(),
  size: zSlider({ min: 40, max: 200 }),
  placement: placementSchema,
  veil: z.boolean(),
  delay: zSlider({ min: 0, max: 90 }),
  look: lookSchema,
  motion: motionSchema,
});

export type HeadlineRevealProps = z.infer<typeof headlineRevealSchema>;

export const headlineRevealDefaults: HeadlineRevealProps = {
  eyebrow: 'Meet Halo',
  headline: 'The app that\nkeeps it simple.',
  highlight: 'simple',
  body: 'Money, plans and people, organised in one calm place.',
  size: 112,
  placement: placement('left', 'center'),
  veil: false,
  delay: 8,
  look: lightLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const headlineRevealMeta: ClipMeta = {
  ...promoMeta,
  id: 'headline-reveal',
  title: 'Headline Reveal',
  description:
    'An eyebrow, a multi-line headline with an accent word and a body line rise and fade in.',
  category: 'typography',
  tags: ['headline', 'text', 'reveal', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/typography/headline-reveal.tsx',
  durationInFrames: 150,
  posterFrame: 90,
};
