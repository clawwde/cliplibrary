import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import {
  auraSchema,
  blob,
  PICKER_FONTS,
  pickerLook,
  pickerMotion,
  steps,
  stepsSchema,
} from '../../picker-common';
import { FONT_WEIGHT, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

export const colorPillSchema = z.object({
  label: z.string(),
  color: zColor(),
  offset: zSlider({ min: -200, max: 200 }),
});

export type ColorPill = z.infer<typeof colorPillSchema>;

export const colorPillsSchema = z.object({
  pills: z.array(colorPillSchema).min(1).max(10),
  font: z.enum(PICKER_FONTS),
  size: zSlider({ min: 20, max: 120 }),
  weight: zSlider(FONT_WEIGHT),
  textColor: zColor(),
  layout: z.object({
    x: zSlider({ min: -800, max: 800 }),
    y: zSlider({ min: -400, max: 400 }),
    pitch: zSlider({ min: 60, max: 260 }),
    height: zSlider({ min: 40, max: 220 }),
    paddingX: zSlider({ min: 10, max: 100 }),
    dot: zSlider({ min: 0, max: 40 }),
    glow: zSlider({ min: 0, max: 30, step: 0.5 }),
  }),
  active: z.object({
    nudge: zSlider({ min: 0, max: 300 }),
    spread: zSlider({ min: 0, max: 1, step: 0.01 }),
    grow: zSlider({ min: 0, max: 0.4, step: 0.01 }),
  }),
  cursor: z.object({
    color: zColor(),
    halo: zColor(),
    size: zSlider({ min: 8, max: 80 }),
    gap: zSlider({ min: 0, max: 120 }),
  }),
  entrance: z.object({
    stagger: zSlider({ min: 0, max: 20 }),
    frames: zSlider({ min: 6, max: 60 }),
    rise: zSlider({ min: 0, max: 200 }),
  }),
  timing: stepsSchema,
  aura: auraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type ColorPillsProps = z.infer<typeof colorPillsSchema>;

const pill = (label: string, color: string, offset: number): ColorPill => ({
  label,
  color,
  offset,
});

export const colorPillsDefaults: ColorPillsProps = {
  pills: [
    pill('Pink', '#ff2d7a', 8),
    pill('Orange', '#ff7a00', -24),
    pill('Green', '#22e02a', 30),
    pill('Blue', '#1414e0', 6),
    pill('Cyan', '#18d6ff', 40),
    pill('Red', '#ff1a1a', -16),
  ],
  font: 'lexend',
  size: 52,
  weight: 400,
  textColor: '#ffffff',
  layout: { x: -170, y: 0, pitch: 150, height: 104, paddingX: 34, dot: 16, glow: 7 },
  active: { nudge: 110, spread: 0.3, grow: 0.06 },
  cursor: { color: '#141416', halo: '#8a8a8e', size: 30, gap: 34 },
  entrance: { stagger: 4, frames: 26, rise: 60 },
  timing: steps({ delay: 34, interval: 20, moveFrames: 17 }),
  aura: {
    blobs: [
      blob('#ffc79c', 4, 6, 58, 0.75),
      blob('#ffd9bd', 98, 96, 60, 0.7),
      blob('#fff6ee', 52, 48, 46, 0.9),
      blob('#ffcfae', 96, 4, 40, 0.45),
    ],
    drift: 1,
  },
  look: pickerLook({ background: '#fff4ea', backgroundEdge: '#f8dcc2', grain: 0.035 }),
  motion: pickerMotion(),
};

export const colorPillsMeta: ClipMeta = {
  ...promoMeta,
  id: 'color-pills',
  title: 'Color Pills',
  description:
    'A column of bright color pills where a radio dot slides down one option at a time and nudges the chosen pill aside.',
  category: 'list-pickers',
  tags: ['list', 'picker', 'glow', 'minimal'],
  theme: 'light',
  source: 'src/compositions/scenes/list-pickers/color-pills.tsx',
  durationInFrames: 180,
  posterFrame: 96,
};
