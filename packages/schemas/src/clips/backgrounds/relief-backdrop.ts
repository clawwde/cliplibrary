import { z } from 'zod';
import { zColor, zSlider } from '../../control';
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

export const reliefBackdropSchema = z.object({
  wallColor: zColor(),
  roughness: zSlider({ min: 0.2, max: 1, step: 0.01 }),
  rings: z.object({
    count: zSlider({ min: 1, max: 12, step: 1 }),
    core: zSlider({ min: 0.4, max: 5, step: 0.05 }),
    band: zSlider({ min: 0.05, max: 1.5, step: 0.01 }),
    gap: zSlider({ min: 0.02, max: 1, step: 0.01 }),
    growth: zSlider({ min: 1, max: 1.6, step: 0.01 }),
    depth: zSlider({ min: 0.02, max: 0.8, step: 0.01 }),
    depthStep: zSlider({ min: 0, max: 0.5, step: 0.01 }),
    bevel: zSlider({ min: 0, max: 0.1, step: 0.005 }),
  }),
  camera: z.object({
    pushIn: zSlider({ min: 0, max: 0.5, step: 0.01 }),
    pushFrames: zSlider({ min: 30, max: 600, step: 1 }),
    orbitAt: zSlider({ min: 0, max: 400, step: 1 }),
    orbitFrames: zSlider({ min: 10, max: 160, step: 1 }),
    orbitAngle: zSlider({ min: -1.4, max: 1.4, step: 0.01 }),
    lightX: zSlider({ min: -20, max: 20, step: 0.5 }),
    lightY: zSlider({ min: -20, max: 20, step: 0.5 }),
    lightZ: zSlider({ min: 1, max: 30, step: 0.5 }),
  }),
  look: lookSchema,
  stage: stageSchema,
  motion: motionSchema,
});

export type ReliefBackdropProps = z.infer<typeof reliefBackdropSchema>;

export const reliefBackdropDefaults: ReliefBackdropProps = {
  wallColor: '#9e9e9b',
  roughness: 0.86,
  rings: {
    count: 7,
    core: 1.62,
    band: 0.34,
    gap: 0.16,
    growth: 1.16,
    depth: 0.08,
    depthStep: 0.07,
    bevel: 0.03,
  },
  camera: {
    pushIn: 0.12,
    pushFrames: 240,
    orbitAt: 88,
    orbitFrames: 64,
    orbitAngle: 1.0,
    lightX: -7,
    lightY: 9,
    lightZ: 9,
  },
  look: clayLook(),
  stage: defaultStage({ keyLight: 1.9, shadow: 0.2, shadowSoftness: 14, cameraDrift: 0.25 }),
  motion: defaultMotion({ exit: 'fade', exitFrames: 14 }),
};

export const reliefBackdropMeta: ClipMeta = {
  ...promoMeta,
  id: 'relief-backdrop',
  title: 'Relief Backdrop',
  description:
    'A clay wall carved with nested rounded squares; the camera pushes in and swings around its side.',
  category: 'backgrounds',
  tags: ['3d', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/backgrounds/relief-backdrop.tsx',
  durationInFrames: 240,
  posterFrame: 60,
};
