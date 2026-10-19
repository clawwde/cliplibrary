import { z } from 'zod';
import { zColor, zMultiline, zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { HEAVY_WEIGHT, inkLook, typeCamera, typeCameraSchema } from '../../type3d-common';

export const lensOrbitSchema = z.object({
  words: zMultiline(),
  highlight: z.string(),
  weight: zSlider(HEAVY_WEIGHT),
  radius: zSlider({ min: 1, max: 3.5, step: 0.05 }),
  wordArc: zSlider({ min: 40, max: 160, step: 1 }),
  wordBand: zSlider({ min: 20, max: 70, step: 1 }),
  edgeFade: zSlider({ min: 0, max: 1, step: 0.01 }),
  delay: zSlider({ min: 0, max: 60 }),
  enterFrames: zSlider({ min: 10, max: 60 }),
  holdFrames: zSlider({ min: 6, max: 90 }),
  turnFrames: zSlider({ min: 12, max: 60 }),
  wobble: zSlider({ min: 0, max: 0.4, step: 0.01 }),
  glass: z.object({
    body: zColor(),
    rim: zColor(),
    rimStrength: zSlider({ min: 0, max: 2, step: 0.01 }),
    highlight: zSlider({ min: 0, max: 1, step: 0.01 }),
  }),
  ring: z.object({
    show: z.boolean(),
    text: z.string(),
    color: zColor(),
    radius: zSlider({ min: 1.2, max: 5, step: 0.05 }),
    height: zSlider({ min: 0.1, max: 0.8, step: 0.01 }),
    tiltX: zSlider({ min: -40, max: 40, step: 0.5 }),
    tiltZ: zSlider({ min: -40, max: 40, step: 0.5 }),
    speed: zSlider({ min: -3, max: 3, step: 0.05 }),
    backOpacity: zSlider({ min: 0, max: 1, step: 0.01 }),
  }),
  camera: typeCameraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type LensOrbitProps = z.infer<typeof lensOrbitSchema>;

export const lensOrbitDefaults: LensOrbitProps = {
  words: 'think\nround\nthe\nbend',
  highlight: 'bend',
  weight: 800,
  radius: 2.25,
  wordArc: 118,
  wordBand: 46,
  edgeFade: 0.85,
  delay: 2,
  enterFrames: 34,
  holdFrames: 24,
  turnFrames: 26,
  wobble: 0.12,
  glass: { body: '#24222f', rim: '#8b74ff', rimStrength: 0.9, highlight: 0.35 },
  ring: {
    show: true,
    text: 'curve every word',
    color: '#c9c2ff',
    radius: 3.05,
    height: 0.3,
    tiltX: 14,
    tiltZ: -12,
    speed: 0.9,
    backOpacity: 0.25,
  },
  camera: typeCamera({ drift: 0.5 }),
  look: inkLook(),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const lensOrbitMeta: ClipMeta = {
  ...promoMeta,
  id: 'lens-orbit',
  title: 'Lens Orbit',
  description:
    'Big words wrap around a glass sphere that rolls each one into view while a ring of small type orbits it.',
  category: 'kinetic-type',
  tags: ['kinetic', 'headline', '3d', 'spin', 'orbit'],
  theme: 'dark',
  source: 'src/compositions/scenes/kinetic-type/lens-orbit.tsx',
  durationInFrames: 228,
  posterFrame: 48,
};
