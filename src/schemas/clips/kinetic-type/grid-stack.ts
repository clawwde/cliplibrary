import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';
import {
  HEAVY_WEIGHT,
  pastelLook,
  typeCamera,
  typeCameraSchema,
  warpGrid,
  warpGridSchema,
} from '../../type3d-common';

export const gridStackSchema = z.object({
  text: zMultiline(),
  highlight: z.string(),
  weight: zSlider(HEAVY_WEIGHT),
  stackWidth: zSlider({ min: 3, max: 14, step: 0.1 }),
  maxWordHeight: zSlider({ min: 0.4, max: 4, step: 0.05 }),
  maxStackHeight: zSlider({ min: 1, max: 10, step: 0.05 }),
  gap: zSlider({ min: 0, max: 0.6, step: 0.01 }),
  bend: zSlider({ min: -1.5, max: 1.5, step: 0.01 }),
  tilt: zSlider({ min: 0, max: 20, step: 0.5 }),
  turn: zSlider({ min: 0, max: 40, step: 0.5 }),
  delay: zSlider({ min: 0, max: 60 }),
  beatFrames: zSlider({ min: 30, max: 150 }),
  enterFrames: zSlider({ min: 8, max: 40 }),
  exitFrames: zSlider({ min: 6, max: 30 }),
  stagger: zSlider({ min: 0, max: 12 }),
  trail: zSlider({ min: 0, max: 1, step: 0.01 }),
  grid: warpGridSchema,
  camera: typeCameraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type GridStackProps = z.infer<typeof gridStackSchema>;

export const gridStackDefaults: GridStackProps = {
  text: 'make it move\nevery frame counts\nsay more with less',
  highlight: 'move counts less',
  weight: 800,
  stackWidth: 8.6,
  maxWordHeight: 2.4,
  maxStackHeight: 5.3,
  gap: 0.14,
  bend: 0.55,
  tilt: 6,
  turn: 16,
  delay: 4,
  beatFrames: 60,
  enterFrames: 22,
  exitFrames: 14,
  stagger: 5,
  trail: 0.45,
  grid: warpGrid(),
  camera: typeCamera(),
  look: pastelLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const gridStackMeta: ClipMeta = {
  ...promoMeta,
  id: 'grid-stack',
  title: 'Grid Stack',
  description:
    'Words fly up out of depth into a curved, justified stack over a bulging grid, then whip away for the next phrase.',
  category: 'kinetic-type',
  tags: ['kinetic', 'headline', 'stack', '3d', 'grid'],
  theme: 'light',
  source: 'src/compositions/scenes/kinetic-type/grid-stack.tsx',
  durationInFrames: 192,
  posterFrame: 150,
};
