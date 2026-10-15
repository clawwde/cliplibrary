import { z } from 'zod';
import type { ClipId } from '../../clip-props';
import { zColor } from '../../control';
import {
  clayLook,
  defaultMotion,
  defaultStage,
  PHONE_FINISHES,
  type PhoneFinish,
  phone,
  placement,
  position,
  promoMeta,
} from '../../promo-common';
import type { ClipMeta } from '../../registry';
import { reliefBackdropDefaults } from '../backgrounds/relief-backdrop';
import { studioBackdropDefaults } from '../backgrounds/studio-backdrop';
import { appIconRevealDefaults } from '../brand/app-icon-reveal';
import { ctaEndCardDefaults } from '../brand/cta-end-card';
import { phoneFanDefaults } from '../devices/phone-fan';
import { phoneFlatLayDefaults } from '../devices/phone-flat-lay';
import { phonePairDefaults } from '../devices/phone-pair';
import { phonePedestalDefaults } from '../devices/phone-pedestal';
import { phoneTurnaroundDefaults } from '../devices/phone-turnaround';
import { type ClipSequence, type SequenceEntry, sequenceEnd } from './sequence';

export const SCOOTER_PROMO_TRACKS = ['Text', 'Scenes', 'Devices', 'Set', 'Backdrop'] as const;

type ScooterPromoTrack = (typeof SCOOTER_PROMO_TRACKS)[number];

const ACCENT = '#ff6b3d';
const CLAY = clayLook(ACCENT, false);
const STUDIO = defaultStage({ cameraDistance: 13, cameraDrift: 0.3 });
const HANDOFF = { x: -2.9, scale: 1.2, yaw: 0.25 };

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

const crossfade = (enterFrames: number, exitFrames: number) =>
  defaultMotion({
    enter: enterFrames > 0 ? 'fade' : 'none',
    enterFrames,
    exit: exitFrames > 0 ? 'fade' : 'none',
    exitFrames,
  });

const ENTRIES: SequenceEntry[] = [
  entry('studio-backdrop', 'Backdrop', [0, 851], studioBackdropDefaults, {
    look: { ...clayLook(ACCENT), background: '#e4e4e1', backgroundEdge: '#cbcbc8' },
    motion: crossfade(0, 0),
  }),
  entry('relief-backdrop', 'Set', [0, 262], reliefBackdropDefaults, {
    look: clayLook(ACCENT),
    motion: crossfade(0, 0),
  }),
  entry('app-icon-reveal', 'Text', [0, 102], appIconRevealDefaults, {
    icon: { ...appIconRevealDefaults.icon, size: 1.05 },
    reveal: { ...appIconRevealDefaults.reveal, typeAt: 26 },
    camera: { ...appIconRevealDefaults.camera, backdropSweep: 0 },
    motion: crossfade(0, 12),
  }),
  entry('phone-fan', 'Devices', [96, 262], phoneFanDefaults, {
    phones: [phone('ride-unlock'), phone('ride-welcome'), phone('ride-nearby')],
    position: position(0, -0.25),
    scale: 1.12,
    spacing: 1.9,
    fan: 0,
    orbit: 0.06,
    entrance: 'spread',
    spreadDelay: 62,
    flyFrom: -6,
    motion: { ...crossfade(10, 0), float: 0.04 },
  }),
  entry('phone-pedestal', 'Scenes', [250, 412], phonePedestalDefaults, {
    look: phonePedestalDefaults.look,
    motion: crossfade(10, 0),
  }),
  entry('phone-flat-lay', 'Scenes', [400, 516], phoneFlatLayDefaults, {
    look: clayLook(ACCENT),
    motion: { ...crossfade(10, 12), float: 0 },
  }),
  entry('phone-turnaround', 'Devices', [504, 720], phoneTurnaroundDefaults, {
    phone: phone('ride-receipt'),
    scale: HANDOFF.scale,
    turnAt: 0.34,
    turnFrames: 48,
    secondScreen: 'ride-welcome',
    secondTurnAt: 120,
    secondTurnFrames: 96,
    travelX: HANDOFF.x,
    endYaw: HANDOFF.yaw,
    stage: STUDIO,
    motion: { ...crossfade(0, 0), float: 0.05 },
  }),
  entry('phone-pair', 'Devices', [720, 851], phonePairDefaults, {
    phones: [phone('ride-welcome'), phone('ride-nearby')],
    position: position(HANDOFF.x, 0, 0),
    scale: HANDOFF.scale * 1.05,
    gap: 0.95,
    angle: HANDOFF.yaw,
    entrance: 'from-behind',
    behindSide: 'left',
    slideDelay: 0,
    slideFrames: 56,
    stage: STUDIO,
    motion: { ...crossfade(0, 0), float: 0.05 },
  }),
  entry('cta-end-card', 'Text', [652, 851], ctaEndCardDefaults, {
    brandName: '',
    showMark: true,
    markColor: ACCENT,
    mark: 'app-icon',
    markSize: 92,
    headline: 'Ride it today.',
    highlight: 'today.',
    headlineSize: 92,
    subline: '',
    primaryCaption: 'Download on the',
    primaryLabel: 'App Store',
    secondaryCaption: 'Get it on',
    secondaryLabel: 'Google Play',
    url: '',
    placement: placement('right', 'center', { insetX: 170, insetY: 0, width: 760 }),
    motion: crossfade(0, 0),
  }),
];

export const SCOOTER_PROMO_SEQUENCE: ClipSequence = {
  tracks: SCOOTER_PROMO_TRACKS,
  entries: ENTRIES,
};

const end = sequenceEnd(ENTRIES);

export const scooterPromoSchema = z.object({
  brandName: z.string(),
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type ScooterPromoProps = z.infer<typeof scooterPromoSchema>;

export const scooterPromoDefaults: ScooterPromoProps = {
  brandName: 'Glide Scooters',
  accent: ACCENT,
  finish: 'natural' satisfies PhoneFinish,
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
