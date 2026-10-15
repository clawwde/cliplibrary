import { z } from 'zod';
import { zColor, zImage, zSlider } from '../../control';
import {
  clayLook,
  defaultMotion,
  defaultStage,
  lookSchema,
  motionSchema,
  promoMeta,
  stageSchema,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const WORDMARK_WEIGHTS = ['500', '600', '700'] as const;

export const appIconRevealSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  icon: z.object({
    color: zColor(),
    backColor: zColor(),
    glyphColor: zColor(),
    glyph: zImage(),
    size: zSlider({ min: 0.3, max: 3, step: 0.01 }),
    depth: zSlider({ min: 0.04, max: 0.6, step: 0.01 }),
    glyphScale: zSlider({ min: 0.2, max: 1, step: 0.01 }),
    roughness: zSlider({ min: 0.05, max: 1, step: 0.01 }),
    y: zSlider({ min: -3, max: 3, step: 0.01 }),
  }),
  reveal: z.object({
    flipAt: zSlider({ min: 0, max: 120 }),
    flipFrames: zSlider({ min: 10, max: 120 }),
    lift: zSlider({ min: 0, max: 2, step: 0.01 }),
    typeAt: zSlider({ min: 0, max: 200 }),
    letterFrames: zSlider({ min: 1, max: 10 }),
  }),
  wordmark: z.object({
    size: zSlider({ min: 20, max: 200 }),
    weight: z.enum(WORDMARK_WEIGHTS),
    tracking: zSlider({ min: -0.08, max: 0.3, step: 0.005 }),
    gap: zSlider({ min: 0, max: 300 }),
  }),
  camera: z.object({
    pushIn: zSlider({ min: 0, max: 0.5, step: 0.01 }),
    pushFrames: zSlider({ min: 30, max: 600, step: 1 }),
    lightX: zSlider({ min: -20, max: 20, step: 0.5 }),
    lightY: zSlider({ min: -20, max: 20, step: 0.5 }),
    lightZ: zSlider({ min: 1, max: 30, step: 0.5 }),
    backdropSweep: zSlider({ min: 0, max: 40 }),
  }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type AppIconRevealProps = z.infer<typeof appIconRevealSchema>;

export const appIconRevealDefaults: AppIconRevealProps = {
  brandName: 'Glide Scooters',
  tagline: '',
  icon: {
    color: '#ff6b3d',
    backColor: '#9e9e9b',
    glyphColor: '#ffffff',
    glyph: '',
    size: 1.9,
    depth: 0.22,
    glyphScale: 0.72,
    roughness: 0.42,
    y: 0,
  },
  reveal: { flipAt: 0, flipFrames: 60, lift: 0.5, typeAt: 30, letterFrames: 3 },
  wordmark: { size: 52, weight: '600', tracking: -0.01, gap: 34 },
  camera: { pushIn: 0.12, pushFrames: 240, lightX: -7, lightY: 9, lightZ: 9, backdropSweep: 14 },
  look: clayLook(),
  stage: defaultStage({ keyLight: 1.9, shadow: 0.2, shadowSoftness: 14, cameraDrift: 0.25 }),
  motion: defaultMotion({ exit: 'fade', exitFrames: 12, float: 0.07 }),
};

export const appIconRevealMeta: ClipMeta = {
  ...promoMeta,
  id: 'app-icon-reveal',
  title: 'App Icon Reveal',
  description:
    'A blank 3D tile flips over to reveal the app icon while the wordmark types on beneath it.',
  category: 'brand',
  tags: ['3d', 'logo', 'reveal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/brand/app-icon-reveal.tsx',
  durationInFrames: 120,
  posterFrame: 96,
};
