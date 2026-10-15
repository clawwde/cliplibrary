import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  FONT_WEIGHT,
  kineticLook,
  lookSchema,
  motionSchema,
  placement,
  placementSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const glowRevealSchema = z.object({
  text: z.string(),
  highlight: z.string(),
  size: zSlider({ min: 20, max: 240 }),
  weight: zSlider(FONT_WEIGHT),
  tracking: zSlider({ min: -0.06, max: 0.6, step: 0.005 }),
  glow: zSlider({ min: 0, max: 1, step: 0.01 }),
  bloom: zSlider({ min: 0, max: 1, step: 0.01 }),
  flash: zSlider({ min: 0, max: 1, step: 0.01 }),
  blur: zSlider({ min: 0, max: 40 }),
  delay: zSlider({ min: 0, max: 90 }),
  bloomFrames: zSlider({ min: 8, max: 90 }),
  exitFlare: z.boolean(),
  flareFrames: zSlider({ min: 6, max: 60 }),
  typeFrames: zSlider({ min: 0, max: 4, step: 0.25 }),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type GlowRevealProps = z.infer<typeof glowRevealSchema>;

export const glowRevealDefaults: GlowRevealProps = {
  text: 'Less Stress, More Savings',
  highlight: '',
  size: 64,
  weight: 600,
  tracking: -0.02,
  glow: 0.18,
  bloom: 0.9,
  flash: 0.35,
  blur: 18,
  delay: 4,
  bloomFrames: 34,
  exitFlare: true,
  flareFrames: 20,
  typeFrames: 0,
  placement: placement('center', 'center', { width: 1600 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const glowRevealMeta: ClipMeta = {
  ...promoMeta,
  id: 'glow-reveal',
  title: 'Glow Reveal',
  description:
    'A line of type burns in out of a soft bloom of light, and can flare out the same way.',
  category: 'typography',
  tags: ['kinetic', 'text', 'reveal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/glow-reveal.tsx',
  durationInFrames: 120,
  posterFrame: 60,
};
