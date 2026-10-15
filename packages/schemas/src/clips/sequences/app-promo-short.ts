import {
  darkLook,
  defaultMotion,
  lightLook,
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
import { phoneSpinInDefaults } from '../devices/phone-spin-in';
import { phoneSwapDefaults } from '../devices/phone-swap';
import { phoneTurnaroundDefaults } from '../devices/phone-turnaround';
import { phoneWallDefaults } from '../devices/phone-wall';
import { featureCalloutsDefaults } from '../typography/feature-callouts';
import { headlineRevealDefaults } from '../typography/headline-reveal';
import {
  type ClipSequence,
  SEQUENCE_TRACKS,
  type SequenceBrandProps,
  type SequenceEntry,
  sequenceBrandSchema,
  sequenceEnd,
  sequenceEntry,
} from './sequence';

const ACCENT = '#0e9f6e';
const DARK_ACCENT = '#4fd1a0';

const LIGHT = lightLook(ACCENT, false);
const DARK = darkLook(DARK_ACCENT, false);

const entry = sequenceEntry(LIGHT);

const headline = (
  range: [number, number],
  overrides: Partial<typeof headlineRevealDefaults>,
): SequenceEntry => entry('headline-reveal', 'Text', range, headlineRevealDefaults, overrides);

const fade = (frames: number) => defaultMotion({ exit: 'fade', exitFrames: frames });

const ENTRIES: SequenceEntry[] = [
  entry('studio-backdrop', 'Backdrop', [0, 750], studioBackdropDefaults, {
    look: lightLook(ACCENT),
  }),
  entry('studio-backdrop', 'Backdrop', [600, 672], studioBackdropDefaults, {
    look: darkLook(DARK_ACCENT),
    motion: defaultMotion({ enter: 'iris', enterFrames: 22, exit: 'fade', exitFrames: 20 }),
  }),
  entry('brand-reveal', 'Text', [0, 88], brandRevealDefaults, {
    eyebrow: 'Say hello to',
    brandName: 'Tempo',
    tagline: 'Your whole day, in rhythm.',
  }),
  entry('phone-spin-in', 'Devices', [72, 196], phoneSpinInDefaults, {
    phone: phone('onboarding', 'white'),
    position: position(-2.55, -0.1),
    scale: 1.28,
    motion: fade(16),
  }),
  headline([82, 196], {
    eyebrow: 'Meet Tempo',
    headline: 'Plans that\nkeep pace.',
    highlight: 'pace',
    body: 'Tasks, money and messages that move at your speed.',
    size: 104,
    placement: placement('right', 'center', { insetX: 150, width: 700 }),
    motion: fade(14),
  }),
  entry('phone-turnaround', 'Devices', [180, 306], phoneTurnaroundDefaults, {
    phone: phone('profile', 'desert'),
    position: position(2.2, 0),
    motion: fade(18),
  }),
  headline([188, 306], {
    eyebrow: 'Design',
    headline: 'Made to\nbe held.',
    highlight: 'held',
    body: '',
    size: 96,
    placement: placement('left', 'center', { insetX: 150, width: 620 }),
    motion: fade(14),
  }),
  entry('phone-fan', 'Devices', [290, 408], phoneFanDefaults, {
    phones: [phone('messages', 'white'), phone('feed', 'black'), phone('settings', 'white')],
    motion: fade(18),
  }),
  headline([298, 404], {
    eyebrow: '',
    headline: 'One app. Every day.',
    highlight: 'Every',
    body: '',
    size: 88,
    delay: 0,
    placement: placement('center', 'top', { insetY: 84, width: 1400 }),
    motion: fade(14),
  }),
  entry('phone-swap', 'Devices', [392, 528], phoneSwapDefaults, {
    screens: [
      { screen: 'map', customScreen: '' },
      { screen: 'music', customScreen: '' },
    ],
    finish: 'white',
    motion: fade(18),
  }),
  entry('feature-callouts', 'Text', [392, 528], featureCalloutsDefaults, {
    label: 'Built in',
    features: [
      { title: 'Live routes', body: 'Leave on time with traffic folded into every plan.' },
      { title: 'Focus mixes', body: 'Sound that settles in when the work does.' },
    ],
    motion: fade(14),
  }),
  entry('phone-wall', 'Devices', [512, 616], phoneWallDefaults, {
    finish: 'white',
    motion: defaultMotion({ enter: 'fade', enterFrames: 16, exit: 'fade', exitFrames: 16 }),
  }),
  headline([528, 612], {
    eyebrow: '',
    headline: 'Every screen, ready',
    highlight: 'ready',
    body: 'Fourteen flows, designed to work together.',
    size: 116,
    veil: true,
    delay: 0,
    placement: placement('center', 'center', { width: 1500 }),
    motion: fade(14),
  }),
  entry('phone-pair', 'Devices', [612, 672], phonePairDefaults, {
    look: DARK,
    phones: [phone('wallet', 'black'), phone('calendar', 'desert')],
    motion: fade(16),
  }),
  headline([618, 668], {
    eyebrow: 'After hours',
    headline: 'Calm in the dark.',
    highlight: 'dark',
    body: '',
    size: 76,
    delay: 0,
    look: DARK,
    placement: placement('center', 'bottom', { insetY: 76, width: 1500 }),
    motion: fade(12),
  }),
  entry('phone-pair', 'Devices', [656, 750], phonePairDefaults, {
    phones: [phone('tasks', 'white'), phone('home', 'desert')],
    gap: 5.3,
    angle: 0.6,
    stagger: -0.3,
    scale: 1.15,
    stage: { ...phonePairDefaults.stage, keyLight: 2, shadow: 0.16 },
    motion: defaultMotion({ exit: 'none', exitFrames: 0 }),
  }),
  entry('cta-end-card', 'Text', [650, 750], ctaEndCardDefaults, {
    headline: 'Get Tempo today.',
    highlight: 'Tempo',
    subline: 'Free to start. Set your own pace.',
    url: 'www.example.com',
  }),
];

export const APP_PROMO_SHORT_SEQUENCE: ClipSequence = {
  tracks: SEQUENCE_TRACKS,
  entries: ENTRIES,
};

const duration = sequenceEnd(ENTRIES);

export const appPromoShortSchema = sequenceBrandSchema;

export type AppPromoShortProps = SequenceBrandProps;

export const appPromoShortDefaults: AppPromoShortProps = {
  brandName: 'Tempo',
  accent: ACCENT,
  finish: 'white' satisfies PhoneFinish,
  useFinishEverywhere: false,
};

export const appPromoShortMeta: ClipMeta = {
  ...promoMeta,
  id: 'app-promo-short',
  title: 'App Promo Short',
  description: 'A 25 second app launch cut layered from the same device, text and backdrop clips.',
  category: 'sequences',
  tags: ['3d', 'phone', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/sequences/app-promo-short.tsx',
  durationInFrames: duration,
  posterFrame: Math.round(duration * 0.2),
};
