import type { ClipId } from '../../clip-props';
import { notebookLook } from '../../doodle-common';
import {
  darkLook,
  defaultMotion,
  type PhoneFinish,
  phone,
  placement,
  position,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';
import {
  type ClipSequence,
  type SequenceBrand,
  type SequenceEntry,
  sequenceBrandSchema,
  sequenceEnd,
} from '../../sequence';
import { studioBackdropDefaults } from '../backgrounds/studio-backdrop';
import { phoneFanDefaults } from '../devices/phone-fan';
import { phoneScrollDefaults } from '../devices/phone-scroll';
import { phoneSpinInDefaults } from '../devices/phone-spin-in';
import { phoneSwapDefaults } from '../devices/phone-swap';
import { phoneTurnaroundDefaults } from '../devices/phone-turnaround';
import { type DoodleArrow, doodleArrow, doodleArrowsDefaults } from '../overlays/doodle-arrows';
import { handwrittenNoteDefaults } from '../typography/handwritten-note';

export const DOODLE_PROMO_TRACKS = ['Transitions', 'Doodles', 'Notes', 'Devices', 'Paper'] as const;

type DoodlePromoTrack = (typeof DOODLE_PROMO_TRACKS)[number];

const PAPER = notebookLook(false);

const entry = <Props extends object>(
  clipId: ClipId,
  track: DoodlePromoTrack,
  [from, to]: [number, number],
  defaults: Props,
  overrides: Partial<Props>,
): SequenceEntry => ({
  clipId,
  track,
  from,
  durationInFrames: to - from,
  props: { ...defaults, look: PAPER, ...overrides } as Record<string, unknown>,
});

const note = (
  range: [number, number],
  overrides: Partial<typeof handwrittenNoteDefaults>,
): SequenceEntry =>
  entry('handwritten-note', 'Notes', range, handwrittenNoteDefaults, {
    size: 118,
    lineHeight: 1.02,
    delay: 14,
    underline: true,
    burst: false,
    ...overrides,
  });

const arrows = (range: [number, number], list: DoodleArrow[], delay = 34): SequenceEntry =>
  entry('doodle-arrows', 'Doodles', range, doodleArrowsDefaults, { arrows: list, delay });

const fade = (frames: number) => defaultMotion({ exit: 'fade', exitFrames: frames });

const TITLE_ARROWS: DoodleArrow[] = [
  doodleArrow('wave', 17, 17, { size: 150, rotation: 8 }),
  doodleArrow('zigzag', 48, 12, { size: 130, delay: 6 }),
  doodleArrow('arc', 81, 18, { size: 140, rotation: 6, delay: 12 }),
  doodleArrow('heart', 86, 46, { size: 130, rotation: -8, flipX: true, delay: 18 }),
  doodleArrow('straight', 84, 72, { size: 140, rotation: 22, flipX: true, delay: 24 }),
  doodleArrow('spiral', 70, 89, { size: 130, rotation: -4, delay: 30 }),
  doodleArrow('squiggle', 42, 90, { size: 140, rotation: 3, delay: 36 }),
  doodleArrow('loop', 17, 84, { size: 130, rotation: -10, delay: 42 }),
  doodleArrow('straight', 15, 50, { size: 130, rotation: -14, delay: 48 }),
];

const ENTRIES: SequenceEntry[] = [
  entry('studio-backdrop', 'Paper', [0, 1140], studioBackdropDefaults, {
    look: notebookLook(true),
    sweep: 6,
  }),
  note([0, 186], {
    size: 168,
    lineHeight: 0.98,
    delay: 4,
    burst: true,
    placement: placement('center', 'center', { width: 1400 }),
  }),
  arrows([0, 186], TITLE_ARROWS, 26),
  entry('phone-spin-in', 'Devices', [168, 372], phoneSpinInDefaults, {
    phone: phone('home', 'natural'),
    position: position(2.6, -0.1),
    scale: 1.26,
    motion: fade(18),
  }),
  note([190, 366], {
    text: 'Your day,\nat a glance.',
    highlight: 'glance.',
    tilt: -3,
    placement: placement('left', 'center', { insetX: 170, width: 720 }),
  }),
  arrows(
    [190, 366],
    [
      doodleArrow('wave', 51, 36, { size: 140, rotation: 6 }),
      doodleArrow('straight', 50, 66, { size: 150, rotation: -14, delay: 12 }),
    ],
  ),
  entry('phone-turnaround', 'Devices', [354, 552], phoneTurnaroundDefaults, {
    phone: phone('analytics', 'blue'),
    position: position(-2.6, 0),
    scale: 1.26,
    rise: 3,
    stage: { ...phoneTurnaroundDefaults.stage, reflections: 0.55 },
    motion: defaultMotion({ enter: 'fade', enterFrames: 18, exit: 'fade', exitFrames: 18 }),
  }),
  note([370, 546], {
    text: 'Good from\nevery side.',
    highlight: 'side.',
    tilt: 2.5,
    placement: placement('right', 'center', { insetX: 170, width: 720 }),
  }),
  arrows(
    [370, 546],
    [
      doodleArrow('arc', 49, 34, { size: 140, flipX: true, rotation: -6 }),
      doodleArrow('zigzag', 50, 68, { size: 140, flipX: true, rotation: 10, delay: 12 }),
    ],
  ),
  entry('phone-swap', 'Devices', [536, 744], phoneSwapDefaults, {
    screens: [
      { screen: 'tasks', customScreen: '' },
      { screen: 'calendar', customScreen: '' },
    ],
    finish: 'black',
    startSide: 'right',
    offset: 2.6,
    scale: 1.26,
    motion: fade(18),
  }),
  note([544, 628], {
    text: 'One tap,',
    highlight: '',
    underline: false,
    delay: 6,
    eraseFrames: 20,
    placement: placement('left', 'center', { insetX: 220, width: 640 }),
  }),
  arrows([544, 628], [doodleArrow('straight', 50, 52, { size: 140, rotation: -10 })], 16),
  note([654, 740], {
    text: 'and done.',
    highlight: 'done.',
    tilt: 2,
    delay: 6,
    eraseFrames: 20,
    placement: placement('right', 'center', { insetX: 220, width: 640 }),
  }),
  arrows(
    [654, 740],
    [doodleArrow('straight', 50, 50, { size: 140, flipX: true, rotation: 8 })],
    16,
  ),
  entry('phone-scroll', 'Devices', [726, 912], phoneScrollDefaults, {
    phone: phone('feed', 'white'),
    position: position(2.6, -0.05),
    scale: 1.3,
    motion: fade(18),
  }),
  note([742, 906], {
    text: "Things you'll\nactually love.",
    highlight: 'love.',
    tilt: -2.5,
    placement: placement('left', 'center', { insetX: 160, width: 760 }),
  }),
  arrows(
    [742, 906],
    [
      doodleArrow('heart', 52, 38, { size: 140, rotation: 4 }),
      doodleArrow('squiggle', 51, 66, { size: 140, rotation: -12, delay: 12 }),
    ],
  ),
  entry('phone-fan', 'Devices', [894, 1092], phoneFanDefaults, {
    position: position(0, -0.9),
    scale: 1.2,
    motion: fade(22),
  }),
  note([912, 1076], {
    text: 'Get Halo today.',
    highlight: 'Halo',
    size: 132,
    burst: true,
    tilt: -1.5,
    placement: placement('center', 'top', { insetY: 60, width: 1400 }),
  }),
  arrows(
    [912, 1076],
    [
      doodleArrow('spiral', 22, 30, { size: 140, rotation: 18 }),
      doodleArrow('zigzag', 78, 30, { size: 130, flipX: true, rotation: -24, delay: 10 }),
    ],
  ),
  entry('studio-backdrop', 'Transitions', [1050, 1140], studioBackdropDefaults, {
    look: darkLook('#e0263a'),
    sweep: 0,
    motion: defaultMotion({ enter: 'fade', enterFrames: 40, exit: 'none', exitFrames: 0 }),
  }),
];

export const DOODLE_PROMO_SEQUENCE: ClipSequence = {
  tracks: DOODLE_PROMO_TRACKS,
  entries: ENTRIES,
};

const DOODLE_PROMO_END = sequenceEnd(ENTRIES);

export const doodlePromoSchema = sequenceBrandSchema;

export type DoodlePromoProps = SequenceBrand;

export const doodlePromoDefaults: DoodlePromoProps = {
  brandName: 'Halo',
  accent: '#e0263a',
  finish: 'black' satisfies PhoneFinish,
  useFinishEverywhere: false,
};

export const doodlePromoMeta: ClipMeta = {
  ...promoMeta,
  id: 'doodle-promo',
  title: 'Doodle Promo',
  description:
    'A playful notebook app promo where hand-drawn arrows and marker notes point out each phone.',
  category: 'sequences',
  tags: ['doodle', 'sketch', 'phone', '3d'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/sequences/doodle-promo.tsx',
  durationInFrames: DOODLE_PROMO_END,
  posterFrame: 270,
};
