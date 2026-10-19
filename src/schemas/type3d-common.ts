import { z } from 'zod';
import { zColor, zSlider } from './control';
import type { PromoLook } from './promo-common';

export const HEAVY_WEIGHT = { min: 300, max: 800, step: 100 } as const;

export const typeCameraSchema = z.object({
  distance: zSlider({ min: 6, max: 30, step: 0.1 }),
  fieldOfView: zSlider({ min: 15, max: 70, step: 1 }),
  drift: zSlider({ min: 0, max: 2, step: 0.01 }),
});

export type TypeCameraSettings = z.infer<typeof typeCameraSchema>;

export const typeCamera = (overrides: Partial<TypeCameraSettings> = {}): TypeCameraSettings => ({
  distance: 12,
  fieldOfView: 30,
  drift: 0.6,
  ...overrides,
});

export const warpGridSchema = z.object({
  show: z.boolean(),
  color: zColor(),
  spacing: zSlider({ min: 0.3, max: 3, step: 0.05 }),
  bulge: zSlider({ min: 0, max: 6, step: 0.05 }),
  lineWidth: zSlider({ min: 0.005, max: 0.08, step: 0.001 }),
  depth: zSlider({ min: -8, max: 0, step: 0.1 }),
});

export type WarpGridSettings = z.infer<typeof warpGridSchema>;

export const warpGrid = (overrides: Partial<WarpGridSettings> = {}): WarpGridSettings => ({
  show: true,
  color: '#d9d8e2',
  spacing: 0.95,
  bulge: 2.6,
  lineWidth: 0.02,
  depth: -2.5,
  ...overrides,
});

export const pastelLook = (accent = '#5b3df5', showBackdrop = true): PromoLook => ({
  showBackdrop,
  background: '#f7f6fb',
  backgroundEdge: '#e4e1f1',
  ink: '#16141f',
  muted: '#8a8798',
  accent,
  grain: 0.05,
  liveGrain: false,
  spotlight: 0.6,
  paper: 'plain',
  paperLine: '#cbd3de',
  paperSpacing: 54,
  paperMargin: false,
});

export const inkLook = (accent = '#8b74ff', showBackdrop = true): PromoLook => ({
  showBackdrop,
  background: '#1b1a24',
  backgroundEdge: '#07070b',
  ink: '#f4f3f8',
  muted: '#8c8a99',
  accent,
  grain: 0.07,
  liveGrain: false,
  spotlight: 0.35,
  paper: 'plain',
  paperLine: '#2a2d36',
  paperSpacing: 54,
  paperMargin: false,
});
