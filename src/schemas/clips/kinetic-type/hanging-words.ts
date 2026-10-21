import { z } from 'zod';
import { zColor, zSlider } from '../../control';
import { defaultMotion, lookSchema, motionSchema, promoMeta } from '../../promo-common';
import type { ClipMeta } from '../../registry';

const frames = (max = 240) => zSlider({ min: 0, max });

const size = (min: number, max: number) => zSlider({ min, max });

const weight = zSlider({ min: 400, max: 900, step: 100 });

export const hangingWordsSchema = z.object({
  palette: z.object({
    night: zColor(),
    light: zColor(),
    highlight: zColor(),
  }),
  knot: z.object({
    y: size(400, 1500),
    stringWidth: zSlider({ min: 1, max: 12, step: 0.5 }),
    dotSize: size(20, 160),
    riseStart: frames(),
    riseFrames: zSlider({ min: 2, max: 40 }),
    fallStart: frames(),
    fallFrames: zSlider({ min: 2, max: 40 }),
    blur: zSlider({ min: 0, max: 1, step: 0.05 }),
  }),
  greeting: z.object({
    word: z.string(),
    lines: zSlider({ min: 1, max: 5 }),
    size: size(80, 480),
    weight,
    tracking: zSlider({ min: -0.1, max: 0.2, step: 0.005 }),
    pitch: size(80, 520),
    start: frames(),
    stagger: zSlider({ min: 1, max: 40 }),
    revealFrames: zSlider({ min: 2, max: 20 }),
    exitStart: frames(),
    exitFrames: zSlider({ min: 1, max: 12 }),
  }),
  hang: z.object({
    top: z.string(),
    bottom: z.string(),
    topSize: size(60, 360),
    bottomSize: size(60, 360),
    weight,
    gap: size(-60, 200),
    leading: zSlider({ min: 0.6, max: 1.4, step: 0.01 }),
    arrive: frames(),
    dropFrames: zSlider({ min: 1, max: 20 }),
    dropHeight: size(0, 1200),
    swing: zSlider({ min: 0, max: 12, step: 0.1 }),
    swingPeriod: zSlider({ min: 10, max: 80 }),
    swingDamping: zSlider({ min: 0, max: 0.95, step: 0.01 }),
    swings: zSlider({ min: 0, max: 12 }),
  }),
  drop: z.object({
    fallStart: frames(),
    fallFrames: zSlider({ min: 2, max: 20 }),
    liftStart: frames(),
    liftFrames: zSlider({ min: 2, max: 20 }),
    width: zSlider({ min: 0.2, max: 2, step: 0.05 }),
  }),
  words: z
    .array(
      z.object({
        text: z.string(),
        size: size(40, 400),
        start: frames(),
      }),
    )
    .min(1)
    .max(12),
  flash: z.object({
    weight,
    baseline: size(600, 1400),
    end: frames(),
    ghostFrames: zSlider({ min: 0, max: 10 }),
    ghost: zSlider({ min: 0, max: 1, step: 0.05 }),
  }),
  stack: z.object({
    word: z.string(),
    highlightIndex: zSlider({ min: 0, max: 12 }),
    size: size(60, 400),
    pitch: size(60, 500),
    sideLines: zSlider({ min: 0, max: 10 }),
    start: frames(),
    fillFrames: zSlider({ min: 1, max: 30 }),
    ringStroke: zSlider({ min: 0, max: 8, step: 0.5 }),
    scrollStart: frames(),
    scrollFrames: zSlider({ min: 2, max: 30 }),
  }),
  outro: z.object({
    word: z.string(),
    pivotIndex: zSlider({ min: 0, max: 12 }),
    size: size(60, 400),
    inkAt: frames(),
    expandStart: frames(),
    expandFrames: zSlider({ min: 1, max: 20 }),
  }),
  look: lookSchema,
  motion: motionSchema,
});

export type HangingWordsProps = z.infer<typeof hangingWordsSchema>;

export const hangingWordsDefaults: HangingWordsProps = {
  palette: {
    night: '#000000',
    light: '#ffffff',
    highlight: '#faa519',
  },
  knot: {
    y: 965,
    stringWidth: 3,
    dotSize: 74,
    riseStart: 2,
    riseFrames: 10,
    fallStart: 39,
    fallFrames: 12,
    blur: 0.6,
  },
  greeting: {
    word: 'HEY',
    lines: 3,
    size: 348,
    weight: 600,
    tracking: 0,
    pitch: 300,
    start: 1,
    stagger: 9,
    revealFrames: 8,
    exitStart: 42,
    exitFrames: 2,
  },
  hang: {
    top: 'stop',
    bottom: 'scrolling',
    topSize: 195,
    bottomSize: 194,
    weight: 700,
    gap: 10,
    leading: 0.84,
    arrive: 50,
    dropFrames: 3,
    dropHeight: 420,
    swing: 1.6,
    swingPeriod: 28,
    swingDamping: 0.55,
    swings: 4,
  },
  drop: {
    fallStart: 91,
    fallFrames: 4,
    liftStart: 196,
    liftFrames: 5,
    width: 1,
  },
  words: [
    { text: 'let’s', size: 224, start: 96 },
    { text: 'us', size: 239, start: 110 },
    { text: 'digitally', size: 159, start: 122 },
    { text: 'TRANSFORM', size: 124, start: 137 },
    { text: 'YOUR', size: 189, start: 147 },
    { text: 'BRAND', size: 161, start: 160 },
  ],
  flash: {
    weight: 900,
    baseline: 1077,
    end: 175,
    ghostFrames: 2,
    ghost: 0.5,
  },
  stack: {
    word: 'TODAY',
    highlightIndex: 1,
    size: 167,
    pitch: 190,
    sideLines: 6,
    start: 176,
    fillFrames: 8,
    ringStroke: 1.5,
    scrollStart: 206,
    scrollFrames: 7,
  },
  outro: {
    word: 'FOLLOW',
    pivotIndex: 1,
    size: 166,
    inkAt: 213,
    expandStart: 215,
    expandFrames: 3,
  },
  look: {
    showBackdrop: true,
    background: '#faa519',
    backgroundEdge: '#faa519',
    ink: '#000000',
    muted: '#5c3a00',
    accent: '#de0c0c',
    grain: 0,
    liveGrain: false,
    spotlight: 0,
    paper: 'plain',
    paperLine: '#cbd3de',
    paperSpacing: 54,
    paperMargin: false,
  },
  motion: defaultMotion({ exit: 'none', exitFrames: 0, float: 0 }),
};

export const hangingWordsMeta: ClipMeta = {
  ...promoMeta,
  width: 1080,
  height: 1920,
  id: 'hanging-words',
  title: 'Hanging Words',
  description:
    'Big words glitch in under a knotted string on a mustard field, a new line drops in and swings from the knot, an ink drop floods the frame black for punchy one-word cuts, then a stack of repeats scrolls away into a final call to follow.',
  category: 'kinetic-type',
  tags: ['kinetic', 'headline', 'text', 'drop', 'stack', 'repeat', 'cta'],
  theme: 'light',
  source: 'src/compositions/scenes/kinetic-type/hanging-words.tsx',
  durationInFrames: 233,
  posterFrame: 70,
};
