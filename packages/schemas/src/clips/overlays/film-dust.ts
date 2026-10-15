import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import {
  defaultMotion,
  kineticLook,
  lookSchema,
  motionSchema,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const filmDustSchema = z.object({
  color: zColor(),
  dust: zSlider({ min: 0, max: 1, step: 0.01 }),
  hairs: zSlider({ min: 0, max: 1, step: 0.01 }),
  scratches: zSlider({ min: 0, max: 1, step: 0.01 }),
  vignette: zSlider({ min: 0, max: 1, step: 0.01 }),
  gateFrames: zSlider({ min: 1, max: 6 }),
  seed: zSlider({ min: 0, max: 999 }),
  look: lookSchema,
  motion: motionSchema,
});

export type FilmDustProps = z.infer<typeof filmDustSchema>;

export const filmDustDefaults: FilmDustProps = {
  color: '#f4f4f2',
  dust: 0.45,
  hairs: 0.35,
  scratches: 0.15,
  vignette: 0.55,
  gateFrames: 2,
  seed: 11,
  look: kineticLook(),
  motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
};

export const filmDustMeta: ClipMeta = {
  ...promoMeta,
  id: 'film-dust',
  title: 'Film Dust',
  description:
    'Flickering dust, stray hairs, faint scratches and a vignette like a worn film print.',
  category: 'overlays',
  tags: ['kinetic', 'film', 'minimal'],
  theme: 'dark',
  source: 'packages/compositions/src/scenes/overlays/film-dust.tsx',
  durationInFrames: 150,
  posterFrame: 75,
};
