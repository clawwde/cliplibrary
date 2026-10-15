import type { z } from 'zod';
import type { ClipId } from '../../clip-props';
import {
  clayLook,
  defaultMotion,
  defaultStage,
  type PhoneFinish,
  phone,
  placement,
  position,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';
import {
  type ClipSequence,
  type SequenceEntry,
  sequenceBrandSchema,
  sequenceEnd,
} from '../../sequence';
import { reliefBackdropDefaults } from '../backgrounds/relief-backdrop';
import { studioBackdropDefaults } from '../backgrounds/studio-backdrop';
import { appIconRevealDefaults } from '../brand/app-icon-reveal';
import { ctaEndCardDefaults } from '../brand/cta-end-card';
import { phoneFanDefaults } from '../devices/phone-fan';
import { phoneFlatLayDefaults } from '../devices/phone-flat-lay';
import { phonePairDefaults } from '../devices/phone-pair';
import { phonePedestalDefaults } from '../devices/phone-pedestal';
import { phoneTurnaroundDefaults } from '../devices/phone-turnaround';

export const SCOOTER_PROMO_TRACKS = ['Text', 'Scenes', 'Devices', 'Set', 'Backdrop'] as const;

type ScooterPromoTrack = (typeof SCOOTER_PROMO_TRACKS)[number];

const ACCENT = '#9a7a0c';
const INK = '#2c1b8a';
const CLAY = clayLook(ACCENT, false);
const WALL = { ...clayLook(ACCENT), background: '#a9a9a7', backgroundEdge: '#999997' };
const STUDIO_LOOK = {
  ...clayLook(ACCENT),
  background: '#d3d3d1',
  backgroundEdge: '#b8b8b6',
  ink: INK,
};
const STUDIO = defaultStage({ cameraDistance: 13, cameraDrift: 0.3 });
const OPENING_STAGE = defaultStage({
  cameraDistance: 13.3,
  fieldOfView: 26,
  keyLight: 1.9,
  shadow: 0.22,
  shadowSoftness: 14,
  cameraDrift: 0.2,
});
const OPENING_CAMERA = {
  pushIn: 0.14,
  pushFrames: 252,
  orbitAt: 84,
  orbitFrames: 62,
  orbitAngle: 1.15,
  orbitPeak: 0.4,
  orbitPivot: 1.9,
  lightX: -7,
  lightY: 9,
  lightZ: 9,
};
const RINGS = { ...reliefBackdropDefaults.rings, band: 0.7, depthStep: 0.28 };
const PLATEAU = RINGS.depth + RINGS.count * RINGS.depthStep;
const FAN_STAGE = defaultStage({
  keyLight: 1.9,
  shadow: 0.22,
  shadowSoftness: 14,
  cameraDrift: 0.2,
});
const HANDOFF = { x: -2.6, scale: 1.6, yaw: 0.16 };
const CUTS = { pedestal: 252, flatLay: 402, studio: 562, pair: 692, end: 851 };

const entry = <Props extends object>(
  clipId: ClipId,
  track: ScooterPromoTrack,
  [from, to]: [number, number],
  defaults: Props,
  overrides: Partial<Props>,
): SequenceEntry => ({
  clipId,
  track,
  from,
  durationInFrames: to - from,
  props: { ...defaults, look: CLAY, ...overrides } as Record<string, unknown>,
});

const cut = defaultMotion({ enter: 'none', enterFrames: 0, exit: 'none', exitFrames: 0 });

const ENTRIES: SequenceEntry[] = [
  entry('studio-backdrop', 'Backdrop', [0, CUTS.end], studioBackdropDefaults, {
    look: STUDIO_LOOK,
    sweep: 6,
    motion: cut,
  }),
  entry('relief-backdrop', 'Set', [0, CUTS.pedestal], reliefBackdropDefaults, {
    look: clayLook(ACCENT),
    rings: RINGS,
    camera: { ...reliefBackdropDefaults.camera, ...OPENING_CAMERA },
    stage: OPENING_STAGE,
    motion: cut,
  }),
  entry('app-icon-reveal', 'Text', [0, 120], appIconRevealDefaults, {
    icon: { ...appIconRevealDefaults.icon, z: PLATEAU, size: 1.35, artScale: 1.2 },
    wordmark: { ...appIconRevealDefaults.wordmark, weight: '700', height: 0.5 },
    camera: { ...appIconRevealDefaults.camera, ...OPENING_CAMERA, backdropSweep: 0 },
    stage: OPENING_STAGE,
    motion: { ...cut, exit: 'fade', exitFrames: 10 },
  }),
  entry('phone-fan', 'Devices', [104, CUTS.pedestal], phoneFanDefaults, {
    phones: [
      phone('ride-unlock', 'black'),
      phone('ride-welcome', 'black'),
      phone('ride-nearby', 'black'),
    ],
    position: position(0, -0.05),
    scale: 2.15,
    spacing: 2.45,
    fan: 0,
    orbit: 0,
    entrance: 'spread',
    flyFrom: -9.5,
    flyYaw: -2.2,
    flyFrames: 44,
    spreadDelay: 46,
    spreadFrames: 30,
    stage: FAN_STAGE,
    motion: { ...cut, float: 0.02 },
  }),
  entry('phone-pedestal', 'Scenes', [CUTS.pedestal, CUTS.flatLay], phonePedestalDefaults, {
    phone: phone('ride-unlock', 'black'),
    scale: 2.2,
    lean: -0.52,
    yaw: 0.18,
    pitch: -0.04,
    rock: 0.025,
    pedestal: { ...phonePedestalDefaults.pedestal, color: ACCENT, top: 0 },
    entry: { drop: -8, frames: 26, cameraTilt: 2.2 },
    camera: { ...phonePedestalDefaults.camera, height: -5, rise: 0.6, orbit: 0.3, aimY: 2.6 },
    look: { ...WALL, background: '#a1a1a0', backgroundEdge: '#8f8f8e' },
    motion: { ...cut, float: 0 },
  }),
  entry('phone-flat-lay', 'Scenes', [CUTS.flatLay, CUTS.studio], phoneFlatLayDefaults, {
    phone: phone('ride-nearby', 'black'),
    scale: 1.68,
    phoneTurn: -0.04,
    surface: {
      ...phoneFlatLayDefaults.surface,
      color: '#76590a',
      count: 14,
      width: 2,
      thickness: 0.18,
      step: 0.16,
      amplitude: 0.8,
      waves: 3.5,
      curl: 0.35,
      angle: -0.12,
    },
    camera: {
      ...phoneFlatLayDefaults.camera,
      tiltFrom: 0.72,
      tiltTo: 0.12,
      turnFrom: 0.5,
      turnTo: 0.04,
      frames: 170,
    },
    look: WALL,
    motion: { ...cut, float: 0 },
  }),
  entry('phone-turnaround', 'Devices', [CUTS.studio, CUTS.pair], phoneTurnaroundDefaults, {
    phone: phone('ride-receipt', 'black'),
    position: position(0, -0.05),
    scale: HANDOFF.scale,
    entry: 'turn-in',
    entryYaw: -1.75,
    entryFrames: 14,
    secondScreen: 'ride-welcome',
    secondTurnAt: 90,
    secondTurnFrames: 36,
    travelX: HANDOFF.x,
    endYaw: HANDOFF.yaw,
    stage: STUDIO,
    motion: { ...cut, float: 0.03 },
  }),
  entry('phone-pair', 'Devices', [CUTS.pair, CUTS.end], phonePairDefaults, {
    phones: [phone('ride-welcome', 'black'), phone('ride-nearby', 'black')],
    position: position(HANDOFF.x, -0.05, 0),
    scale: HANDOFF.scale,
    gap: 1.25,
    angle: HANDOFF.yaw,
    entrance: 'from-behind',
    behindSide: 'left',
    slideDelay: 40,
    slideFrames: 22,
    stage: STUDIO,
    motion: { ...cut, float: 0.03 },
  }),
  entry('cta-end-card', 'Text', [656, CUTS.end], ctaEndCardDefaults, {
    brandName: '',
    showMark: true,
    mark: 'app-icon',
    markColor: '#f7b81a',
    markColorEnd: '#ea9a0c',
    markInk: '#2b1d05',
    markSize: 190,
    markAt: 10,
    headlineAt: 20,
    badgesAt: 12,
    font: 'rounded',
    headlineWeight: 800,
    headline: 'Ride with Glide!',
    highlight: '',
    headlineSize: 86,
    subline: '',
    primaryCaption: 'Get it on',
    primaryLabel: 'Google Play',
    secondaryCaption: 'Download on the',
    secondaryLabel: 'App Store',
    badges: 'store',
    badgeScale: 1.45,
    gap: 58,
    url: '',
    placement: placement('right', 'center', { insetX: 150, insetY: 0, width: 820 }),
    look: { ...CLAY, ink: INK },
    motion: cut,
  }),
];

export const SCOOTER_PROMO_SEQUENCE: ClipSequence = {
  tracks: SCOOTER_PROMO_TRACKS,
  entries: ENTRIES,
};

const end = sequenceEnd(ENTRIES);

export const scooterPromoSchema = sequenceBrandSchema;

export type ScooterPromoProps = z.infer<typeof scooterPromoSchema>;

export const scooterPromoDefaults: ScooterPromoProps = {
  brandName: 'Glide Scooters',
  accent: ACCENT,
  finish: 'black' satisfies PhoneFinish,
  useFinishEverywhere: true,
};

export const scooterPromoMeta: ClipMeta = {
  ...promoMeta,
  id: 'scooter-promo',
  title: 'Scooter Promo',
  description:
    'A 28 second clay-world app promo: an icon reveal, a phone trio, a pedestal, a flat lay and a call to action.',
  category: 'sequences',
  tags: ['3d', 'phone', 'minimal'],
  theme: 'light',
  source: 'packages/compositions/src/scenes/sequences/scooter-promo.tsx',
  durationInFrames: end,
  posterFrame: 300,
};
