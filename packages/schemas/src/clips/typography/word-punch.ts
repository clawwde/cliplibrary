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

export const wordPunchSchema = z.object({
  text: z.string(),
  highlight: z.string(),
  size: zSlider({ min: 120, max: 560 }),
  weight: zSlider(FONT_WEIGHT),
  delay: zSlider({ min: 0, max: 90 }),
  wordFrames: zSlider({ min: 8, max: 60 }),
  swapFrames: zSlider({ min: 3, max: 16 }),
  punch: zSlider({ min: 0, max: 0.4, step: 0.01 }),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type WordPunchProps = z.infer<typeof wordPunchSchema>;

export const wordPunchDefaults: WordPunchProps = {
  text: 'Save. Plan. Grow.',
  highlight: 'Grow.',
  size: 300,
  weight: 700,
  delay: 4,
  wordFrames: 22,
  swapFrames: 10,
  punch: 0.14,
  placement: placement('center', 'center', { width: 1700 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 12 }),
};

export const wordPunchMeta: ClipMeta = {
  ...promoMeta,
  id: 'word-punch',
  title: 'Word Punch',
  description: 'One huge word at a time punches in and hands over to the next on the beat.',
  category: 'typography',
  tags: ['kinetic', 'headline', 'text'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/word-punch.tsx',
  durationInFrames: 96,
  posterFrame: 60,
};
