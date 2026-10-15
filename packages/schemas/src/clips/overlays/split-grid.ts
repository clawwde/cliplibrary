import { z } from 'zod';
import { zSlider } from '../../control';
import {
  defaultMotion,
  kineticLook,
  lookSchema,
  motionSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const splitGridSchema = z.object({
  columns: zSlider({ min: 1, max: 4 }),
  rows: zSlider({ min: 1, max: 4 }),
  lineWidth: zSlider({ min: 0.5, max: 8, step: 0.5 }),
  lineOpacity: zSlider({ min: 0, max: 1, step: 0.01 }),
  showLabels: z.boolean(),
  labelSize: zSlider({ min: 10, max: 40 }),
  delay: zSlider({ min: 0, max: 90 }),
  openFrames: zSlider({ min: 6, max: 60 }),
  stagger: zSlider({ min: 0, max: 20 }),
  look: lookSchema,
  motion: motionSchema,
});

export type SplitGridProps = z.infer<typeof splitGridSchema>;

export const splitGridDefaults: SplitGridProps = {
  columns: 2,
  rows: 2,
  lineWidth: 2,
  lineOpacity: 0.5,
  showLabels: true,
  labelSize: 16,
  delay: 4,
  openFrames: 26,
  stagger: 6,
  look: kineticLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const splitGridMeta: ClipMeta = {
  ...promoMeta,
  id: 'split-grid',
  title: 'Split Grid',
  description:
    'Hairline dividers grow out from the centre to split the frame into cells for a recap.',
  category: 'overlays',
  tags: ['kinetic', 'grid', 'minimal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/overlays/split-grid.tsx',
  durationInFrames: 120,
  posterFrame: 60,
};
