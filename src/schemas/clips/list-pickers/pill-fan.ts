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

export const pillFanSchema = z.object({
  label: z.string(),
  words: z.array(z.string()).min(1).max(16),
  labelType: z.object({
    font: z.enum(PICKER_FONTS),
    size: zSlider({ min: 24, max: 200 }),
    weight: zSlider(FONT_WEIGHT),
    tilt: zSlider({ min: -30, max: 30, step: 0.5 }),
    gap: zSlider({ min: 0, max: 160 }),
  }),
  pill: z.object({
    font: z.enum(PICKER_FONTS),
    textSize: zSlider({ min: 20, max: 140 }),
    weight: zSlider(FONT_WEIGHT),
    height: zSlider({ min: 40, max: 220 }),
    padding: zSlider({ min: 10, max: 120 }),
    color: zColor(),
    text: zColor(),
    shadow: zSlider({ min: 0, max: 1, step: 0.01 }),
  }),
  fan: z.object({
    activeAngle: zSlider({ min: -60, max: 30, step: 0.5 }),
    spread: zSlider({ min: 5, max: 60, step: 0.5 }),
    swing: zSlider({ min: 0, max: 120, step: 0.5 }),
    trail: zSlider({ min: 1, max: 8 }),
    fade: zSlider({ min: 0, max: 0.5, step: 0.01 }),
    tilt: zSlider({ min: -30, max: 30, step: 0.5 }),
    drift: zSlider({ min: -0.2, max: 0.2, step: 0.005 }),
  }),
  position: z.object({
    x: zSlider({ min: -800, max: 800 }),
    y: zSlider({ min: -500, max: 500 }),
    scale: zSlider({ min: 0.4, max: 2, step: 0.01 }),
  }),
  entryFrames: zSlider({ min: 6, max: 60 }),
  steps: stepsSchema,
  aura: auraSchema,
  look: lookSchema,
  motion: motionSchema,
});

export type PillFanProps = z.infer<typeof pillFanSchema>;

export const pillFanDefaults: PillFanProps = {
  label: 'I create',
  words: ['designs', 'brands', 'websites', 'animations', 'UI/UX', 'motion', 'logos', 'content'],
  labelType: { font: 'sora', size: 84, weight: 700, tilt: -6, gap: 34 },
  pill: {
    font: 'quicksand',
    textSize: 80,
    weight: 400,
    height: 124,
    padding: 48,
    color: '#f2264b',
    text: '#ffffff',
    shadow: 0.45,
  },
  fan: { activeAngle: -15, spread: 34, swing: 18, trail: 4, fade: 0.17, tilt: 2, drift: 0 },
  position: { x: -60, y: -130, scale: 1 },
  entryFrames: 18,
  steps: steps({ delay: 30, interval: 21, moveFrames: 13 }),
  aura: {
    blobs: [
      blob('#f4637c', 0, 0, 52, 0.55),
      blob('#f2264b', 104, 104, 58, 0.5),
      blob('#f7a1b1', 100, -6, 34, 0.35),
    ],
    drift: 0.6,
  },
  look: pickerLook({
    background: '#fbfafa',
    backgroundEdge: '#f6eef0',
    ink: '#111113',
    accent: '#f2264b',
    spotlight: 0.3,
  }),
  motion: pickerMotion(),
};

export const pillFanMeta: ClipMeta = {
  ...promoMeta,
  id: 'pill-fan',
  title: 'Pill Fan',
  description:
    'A phrase completes itself with word pills that swing in on top and fan away around a hinge.',
  category: 'list-pickers',
  tags: ['list', 'picker', 'spin', 'text'],
  theme: 'light',
  source: 'src/compositions/scenes/list-pickers/pill-fan.tsx',
  durationInFrames: 165,
  posterFrame: 110,
};
