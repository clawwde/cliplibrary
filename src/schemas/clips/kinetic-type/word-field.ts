import { z } from 'zod';
import { zMultiline, zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { HEAVY_WEIGHT, pastelLook, typeCamera, typeCameraSchema } from '../../type3d-common';

export const wordFieldSchema = z.object({
  words: zMultiline(),
  highlight: z.string(),
  weight: zSlider(HEAVY_WEIGHT),
  columns: zSlider({ min: 2, max: 10 }),
  rows: zSlider({ min: 2, max: 12 }),
  width: zSlider({ min: 4, max: 24, step: 0.1 }),
  depth: zSlider({ min: 4, max: 24, step: 0.1 }),
  minSize: zSlider({ min: 0.1, max: 2, step: 0.01 }),
  maxSize: zSlider({ min: 0.1, max: 2.5, step: 0.01 }),
  jitter: zSlider({ min: 0, max: 1, step: 0.01 }),
  seed: zSlider({ min: 1, max: 999 }),
  tilt: zSlider({ min: 0, max: 80, step: 0.5 }),
  turn: zSlider({ min: -60, max: 60, step: 0.5 }),
  spin: zSlider({ min: -40, max: 40, step: 0.5 }),
  delay: zSlider({ min: 0, max: 60 }),
  stagger: zSlider({ min: 0, max: 8, step: 0.1 }),
  riseFrames: zSlider({ min: 8, max: 60 }),
  rise: zSlider({ min: 0, max: 4, step: 0.05 }),
  float: zSlider({ min: 0, max: 0.6, step: 0.01 }),
  camera: typeCameraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type WordFieldProps = z.infer<typeof wordFieldSchema>;

export const wordFieldDefaults: WordFieldProps = {
  words: [
    'Rhythm',
    'Pulse',
    'Glide',
    'Spark',
    'Drift',
    'Echo',
    'Shift',
    'Bloom',
    'Flow',
    'Tempo',
    'Ripple',
    'Sway',
    'Twist',
    'Hover',
    'Surge',
    'Wave',
  ].join('\n'),
  highlight: 'Pulse Bloom Wave',
  weight: 700,
  columns: 5,
  rows: 7,
  width: 15,
  depth: 14,
  minSize: 0.34,
  maxSize: 0.82,
  jitter: 0.55,
  seed: 11,
  tilt: 52,
  turn: -18,
  spin: 9,
  delay: 2,
  stagger: 1.6,
  riseFrames: 30,
  rise: 1.4,
  float: 0.16,
  camera: typeCamera({ drift: 0.7 }),
  look: { ...pastelLook(), backgroundEdge: '#cdbff5', spotlight: 0.75 },
  motion: defaultMotion({ exit: 'fade', exitFrames: 16 }),
};

export const wordFieldMeta: ClipMeta = {
  ...promoMeta,
  id: 'word-field',
  title: 'Word Field',
  description:
    'A tilted field of words rises in a ripple from the centre and slowly turns, each word bobbing on its own.',
  category: 'kinetic-type',
  tags: ['kinetic', 'text', '3d', 'float', 'camera-move'],
  theme: 'light',
  source: 'src/compositions/scenes/kinetic-type/word-field.tsx',
  durationInFrames: 180,
  posterFrame: 120,
};
