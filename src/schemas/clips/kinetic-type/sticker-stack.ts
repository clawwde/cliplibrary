import { z } from 'zod';
import { zColor, zMultiline, zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { HEAVY_WEIGHT, inkLook, typeCamera, typeCameraSchema } from '../../type3d-common';

export const stickerStackSchema = z.object({
  stickers: zMultiline(),
  weight: zSlider(HEAVY_WEIGHT),
  size: zSlider({ min: 0.3, max: 2, step: 0.01 }),
  width: zSlider({ min: 3, max: 16, step: 0.1 }),
  rowPitch: zSlider({ min: 0.5, max: 2.5, step: 0.01 }),
  spin: zSlider({ min: 0, max: 40, step: 0.5 }),
  jitter: zSlider({ min: 0, max: 1, step: 0.01 }),
  seed: zSlider({ min: 1, max: 999 }),
  delay: zSlider({ min: 0, max: 60 }),
  stagger: zSlider({ min: 1, max: 20, step: 0.5 }),
  slapFrames: zSlider({ min: 6, max: 40 }),
  drop: zSlider({ min: 0, max: 8, step: 0.1 }),
  kick: zSlider({ min: 0, max: 60, step: 0.5 }),
  pan: zSlider({ min: 0, max: 8, step: 0.05 }),
  shadow: zSlider({ min: 0, max: 0.8, step: 0.01 }),
  paper: zColor(),
  paperInk: zColor(),
  accentInk: zColor(),
  camera: typeCameraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type StickerStackProps = z.infer<typeof stickerStackSchema>;

export const stickerStackDefaults: StickerStackProps = {
  stickers: [
    'stick',
    '->',
    'with',
    'bold',
    '*',
    'ideas',
    'that',
    'pop',
    '+',
    'made',
    'to',
    'last',
    '#',
    'yours',
  ].join('\n'),
  weight: 700,
  size: 0.98,
  width: 10.4,
  rowPitch: 0.9,
  spin: 16,
  jitter: 0.9,
  seed: 7,
  delay: 4,
  stagger: 7,
  slapFrames: 20,
  drop: 2.4,
  kick: 18,
  pan: 2.6,
  shadow: 0.45,
  paper: '#f4f3f8',
  paperInk: '#16141f',
  accentInk: '#ffffff',
  camera: typeCamera({ drift: 0.45 }),
  look: { ...inkLook('#6d4dff'), background: '#211c33', backgroundEdge: '#0a0910' },
  motion: defaultMotion({ exit: 'fade', exitFrames: 16 }),
};

export const stickerStackMeta: ClipMeta = {
  ...promoMeta,
  id: 'sticker-stack',
  title: 'Sticker Stack',
  description:
    'Word pills and icon badges slap down one by one into a playful pile while the camera pans along it.',
  category: 'kinetic-type',
  tags: ['kinetic', 'text', 'drop', 'stack', 'camera-move'],
  theme: 'dark',
  source: 'src/compositions/scenes/kinetic-type/sticker-stack.tsx',
  durationInFrames: 180,
  posterFrame: 150,
};
