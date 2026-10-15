import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
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

export const WORD_BUILD_ENTRIES = ['zoom', 'slide', 'tilt', 'pop', 'echo'] as const;

export const wordBuildSchema = z.object({
  text: zMultiline(),
  highlight: z.string(),
  entry: z.enum(WORD_BUILD_ENTRIES),
  bigSize: zSlider({ min: 120, max: 560 }),
  bigWeight: zSlider(FONT_WEIGHT),
  size: zSlider({ min: 28, max: 200 }),
  weight: zSlider(FONT_WEIGHT),
  delay: zSlider({ min: 0, max: 90 }),
  wordFrames: zSlider({ min: 6, max: 40 }),
  echoes: zSlider({ min: 0, max: 8 }),
  exitByWord: z.boolean(),
  placement: placementSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type WordBuildProps = z.infer<typeof wordBuildSchema>;

export const wordBuildDefaults: WordBuildProps = {
  text: 'Plan Your Money In One Place',
  highlight: 'Money',
  entry: 'zoom',
  bigSize: 340,
  bigWeight: 700,
  size: 64,
  weight: 600,
  delay: 4,
  wordFrames: 14,
  echoes: 4,
  exitByWord: false,
  placement: placement('center', 'center', { width: 1600 }),
  look: kineticLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const wordBuildMeta: ClipMeta = {
  ...promoMeta,
  id: 'word-build',
  title: 'Word Build',
  description:
    'Huge single words zoom, slide, tilt or pop through the frame, then settle into one line.',
  category: 'typography',
  tags: ['kinetic', 'headline', 'text'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/typography/word-build.tsx',
  durationInFrames: 150,
  posterFrame: 120,
};
