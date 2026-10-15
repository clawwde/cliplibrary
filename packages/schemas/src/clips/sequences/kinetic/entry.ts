import type { ClipId } from '../../../clip-props';
import {
  defaultMotion,
  kineticLook,
  type PromoMotion,
  type PromoPlacement,
  placement,
} from '../../../promo-common';
import { type Quadrant, quadrantTransform, type SequenceEntry } from '../../../sequence';

export const KINETIC_PROMO_TRACKS = ['Overlays', 'Captions', 'Text', 'Backdrop'] as const;

export type KineticPromoTrack = (typeof KINETIC_PROMO_TRACKS)[number];

export const KINETIC_ACCENT = '#e5262b';

const LAYER_LOOK = kineticLook(KINETIC_ACCENT, false);

export const centered = (overrides: Partial<PromoPlacement> = {}): PromoPlacement =>
  placement('center', 'center', { width: 1700, ...overrides });

export const fadeOut = (frames = 4): PromoMotion =>
  defaultMotion({ exit: 'fade', exitFrames: frames });

export const entry = <Props extends object>(
  clipId: ClipId,
  track: KineticPromoTrack,
  [from, to]: [number, number],
  defaults: Props,
  overrides: Partial<Props>,
  quadrant?: Quadrant,
): SequenceEntry => ({
  clipId,
  track,
  from,
  durationInFrames: to - from,
  props: { ...defaults, look: LAYER_LOOK, motion: fadeOut(), ...overrides } as Record<
    string,
    unknown
  >,
  transform: quadrant === undefined ? undefined : quadrantTransform(quadrant),
});

export interface Beat {
  length: number;
  build: (at: number, length: number, quadrant?: Quadrant) => SequenceEntry[];
}

export const span = (at: number, from: number, to: number): [number, number] => [
  at + from,
  at + to,
];
