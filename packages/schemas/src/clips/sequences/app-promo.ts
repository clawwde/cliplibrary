import { z } from 'zod';
import type { ClipId } from '../../clip-props';
import { zColor } from '../../control';
import {
  darkLook,
  defaultMotion,
  lightLook,
  PHONE_FINISHES,
  type PhoneFinish,
  phone,
  placement,
  position,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { studioBackdropDefaults } from '../backgrounds/studio-backdrop';
import { brandRevealDefaults } from '../brand/brand-reveal';
import { ctaEndCardDefaults } from '../brand/cta-end-card';
import { phoneFanDefaults } from '../devices/phone-fan';
import { phonePairDefaults } from '../devices/phone-pair';
import { phoneScrollDefaults } from '../devices/phone-scroll';
import { phoneSpinInDefaults } from '../devices/phone-spin-in';
import { phoneSwapDefaults } from '../devices/phone-swap';
import { phoneTurnaroundDefaults } from '../devices/phone-turnaround';
import { phoneWallDefaults } from '../devices/phone-wall';
import { floatingCardsDefaults } from '../overlays/floating-cards';
import { detailListDefaults } from '../typography/detail-list';
import { featureCalloutsDefaults } from '../typography/feature-callouts';
import { headlineRevealDefaults } from '../typography/headline-reveal';

export const APP_PROMO_TRACKS = ['Captions', 'Text', 'Overlays', 'Devices', 'Backdrop'] as const;

export type AppPromoTrack = (typeof APP_PROMO_TRACKS)[number];

export interface SequenceEntry {
  clipId: ClipId;
  track: AppPromoTrack;
  from: number;
  durationInFrames: number;
  props: Record<string, unknown>;
}

export interface ClipSequence {
  tracks: readonly string[];
  entries: readonly SequenceEntry[];
}

const LIGHT = lightLook('#2f5bff', false);
const DARK = darkLook('#7d9bff', false);

const entry = <Props extends object>(
  clipId: ClipId,
  track: AppPromoTrack,
  [from, to]: [number, number],
  defaults: Props,
  overrides: Partial<Props>,
): SequenceEntry => ({
  clipId,
  track,
  from,
  durationInFrames: to - from,
  props: { ...defaults, look: LIGHT, ...overrides } as Record<string, unknown>,
});

const headline = (
  range: [number, number],
  overrides: Partial<typeof headlineRevealDefaults>,
): SequenceEntry => entry('headline-reveal', 'Text', range, headlineRevealDefaults, overrides);

const fade = (frames: number) => defaultMotion({ exit: 'fade', exitFrames: frames });

const ENTRIES: SequenceEntry[] = [
  entry('studio-backdrop', 'Backdrop', [0, 1500], studioBackdropDefaults, {
    look: lightLook(),
  }),
  entry('studio-backdrop', 'Backdrop', [1244, 1374], studioBackdropDefaults, {
    look: darkLook(),
    motion: defaultMotion({ enter: 'iris', enterFrames: 22, exit: 'fade', exitFrames: 20 }),
  }),
  entry('brand-reveal', 'Text', [0, 120], brandRevealDefaults, {}),
  entry('phone-spin-in', 'Devices', [102, 312], phoneSpinInDefaults, {
    position: position(2.55, -0.1),
    scale: 1.28,
    motion: fade(18),
  }),
  entry('floating-cards', 'Overlays', [172, 312], floatingCardsDefaults, {
    cards: [{ kind: 'income', x: 0.8, y: -1.15, z: 1.25, turn: -0.28, size: 2.1 }],
    delay: 0,
  }),
  headline([114, 312], { motion: fade(16) }),
  entry('phone-turnaround', 'Devices', [296, 466], phoneTurnaroundDefaults, {
    motion: fade(20),
  }),
  headline([304, 392], {
    eyebrow: 'Design',
    headline: 'Crafted in\nevery detail.',
    highlight: 'detail',
    body: '',
    size: 92,
    placement: placement('left', 'center', { insetX: 150, width: 620 }),
    motion: fade(12),
  }),
  headline([392, 476], {
    eyebrow: 'Experience',
    headline: 'Beautiful from\nevery angle.',
    highlight: 'angle',
    body: '',
    size: 92,
    delay: 0,
    placement: placement('left', 'center', { insetX: 150, width: 620 }),
    motion: fade(14),
  }),
  entry('detail-list', 'Captions', [304, 476], detailListDefaults, { motion: fade(14) }),
  entry('phone-fan', 'Devices', [458, 644], phoneFanDefaults, { motion: fade(18) }),
  headline([486, 640], {
    eyebrow: '',
    headline: 'Plan. Track. Connect.',
    highlight: 'Track.',
    body: '',
    size: 88,
    delay: 0,
    placement: placement('center', 'top', { insetY: 84, width: 1400 }),
  }),
  entry('phone-swap', 'Devices', [636, 904], phoneSwapDefaults, { motion: fade(18) }),
  entry('feature-callouts', 'Text', [640, 904], featureCalloutsDefaults, { motion: fade(14) }),
  entry('phone-scroll', 'Devices', [888, 1060], phoneScrollDefaults, {
    position: position(2.7, -0.05),
    motion: fade(18),
  }),
  entry('floating-cards', 'Overlays', [926, 1058], floatingCardsDefaults, {
    cards: [
      { kind: 'growth', x: 0.95, y: 1.75, z: 1.1, turn: 0.28, size: 2.1 },
      { kind: 'goal', x: 1.1, y: -1.75, z: 1.5, turn: 0.22, size: 2.1 },
      { kind: 'income', x: 4.85, y: 0.35, z: 0.9, turn: -0.4, size: 2.1 },
    ],
    delay: 0,
  }),
  headline([906, 1058], {
    eyebrow: 'Discover',
    headline: 'Insights that\nmove with you.',
    highlight: 'move',
    body: 'A personal feed of ideas and progress, curated every day.',
    size: 96,
    placement: placement('left', 'center', { insetX: 150, width: 700 }),
  }),
  entry('phone-wall', 'Devices', [1050, 1248], phoneWallDefaults, {
    motion: defaultMotion({ enter: 'fade', enterFrames: 16, exit: 'fade', exitFrames: 16 }),
  }),
  headline([1090, 1240], {
    eyebrow: '',
    headline: '14 crafted screens',
    highlight: '14',
    body: 'Every flow you need, ready from day one.',
    size: 124,
    veil: true,
    delay: 0,
    placement: placement('center', 'center', { width: 1500 }),
  }),
  entry('phone-pair', 'Devices', [1262, 1374], phonePairDefaults, { look: DARK }),
  headline([1272, 1366], {
    eyebrow: 'Available now',
    headline: 'Works everywhere you do.',
    highlight: 'everywhere',
    body: '',
    size: 76,
    look: DARK,
    placement: placement('center', 'bottom', { insetY: 76, width: 1500 }),
    motion: fade(12),
  }),
  entry('phone-pair', 'Devices', [1356, 1500], phonePairDefaults, {
    phones: [phone('profile', 'white'), phone('home', 'natural')],
    position: position(0.15, 0, 0),
    gap: 4.6,
    angle: 0.6,
    stagger: 0,
    scale: 1.15,
    stage: { ...phonePairDefaults.stage, keyLight: 2, shadow: 0.16 },
    motion: defaultMotion({ enter: 'fade', enterFrames: 18, exit: 'none', exitFrames: 0 }),
  }),
  entry('cta-end-card', 'Text', [1366, 1500], ctaEndCardDefaults, {}),
];

export const APP_PROMO_SEQUENCE: ClipSequence = { tracks: APP_PROMO_TRACKS, entries: ENTRIES };

const sequenceEnd = ENTRIES.reduce(
  (end, item) => Math.max(end, item.from + item.durationInFrames),
  0,
);

export const appPromoSchema = z.object({
  brandName: z.string(),
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type AppPromoProps = z.infer<typeof appPromoSchema>;

export const appPromoDefaults: AppPromoProps = {
  brandName: 'Halo',
  accent: '#2f5bff',
  finish: 'black' satisfies PhoneFinish,
  useFinishEverywhere: false,
};

export const appPromoMeta: ClipMeta = {
  ...promoMeta,
  id: 'app-promo',
  title: 'App Promo',
  description:
    'A full minimal app launch film built from layered phone, card, text and backdrop clips.',
  category: 'sequences',
  tags: ['3d', 'phone', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/sequences/app-promo.tsx',
  durationInFrames: sequenceEnd,
  posterFrame: Math.round(sequenceEnd * 0.2),
};
