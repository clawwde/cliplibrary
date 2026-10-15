import type { ClipId, ClipSequence } from '@cliplibrary/schemas';
import type { FC } from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { ReliefBackdrop } from '../backgrounds/relief-backdrop';
import { StudioBackdrop } from '../backgrounds/studio-backdrop';
import { AppIconReveal } from '../brand/app-icon-reveal';
import { BrandReveal } from '../brand/brand-reveal';
import { CtaEndCard } from '../brand/cta-end-card';
import { PhoneFan } from '../devices/phone-fan';
import { PhoneFlatLay } from '../devices/phone-flat-lay';
import { PhonePair } from '../devices/phone-pair';
import { PhonePedestal } from '../devices/phone-pedestal';
import { PhoneScroll } from '../devices/phone-scroll';
import { PhoneSpinIn } from '../devices/phone-spin-in';
import { PhoneSwap } from '../devices/phone-swap';
import { PhoneTurnaround } from '../devices/phone-turnaround';
import { PhoneWall } from '../devices/phone-wall';
import { FloatingCards } from '../overlays/floating-cards';
import { DetailList } from '../typography/detail-list';
import { FeatureCallouts } from '../typography/feature-callouts';
import { HeadlineReveal } from '../typography/headline-reveal';

type AnyScene = FC<Record<string, unknown>>;

const SCENE_COMPONENTS: Partial<Record<ClipId, AnyScene>> = {
  'relief-backdrop': ReliefBackdrop as unknown as AnyScene,
  'studio-backdrop': StudioBackdrop as unknown as AnyScene,
  'app-icon-reveal': AppIconReveal as unknown as AnyScene,
  'brand-reveal': BrandReveal as unknown as AnyScene,
  'cta-end-card': CtaEndCard as unknown as AnyScene,
  'phone-fan': PhoneFan as unknown as AnyScene,
  'phone-flat-lay': PhoneFlatLay as unknown as AnyScene,
  'phone-pair': PhonePair as unknown as AnyScene,
  'phone-pedestal': PhonePedestal as unknown as AnyScene,
  'phone-scroll': PhoneScroll as unknown as AnyScene,
  'phone-spin-in': PhoneSpinIn as unknown as AnyScene,
  'phone-swap': PhoneSwap as unknown as AnyScene,
  'phone-turnaround': PhoneTurnaround as unknown as AnyScene,
  'phone-wall': PhoneWall as unknown as AnyScene,
  'floating-cards': FloatingCards as unknown as AnyScene,
  'detail-list': DetailList as unknown as AnyScene,
  'feature-callouts': FeatureCallouts as unknown as AnyScene,
  'headline-reveal': HeadlineReveal as unknown as AnyScene,
};

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export const withFinish = (value: unknown, finish: string): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => withFinish(item, finish));
  }
  if (!isRecord(value)) {
    return value;
  }
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    next[key] = key === 'finish' && typeof child === 'string' ? finish : withFinish(child, finish);
  }
  return next;
};

export type SceneTransform = (
  clipId: ClipId,
  props: Record<string, unknown>,
) => Record<string, unknown>;

export const SequencePlayer = ({
  sequence,
  transform,
}: {
  sequence: ClipSequence;
  transform: SceneTransform;
}) => (
  <AbsoluteFill style={{ background: '#0a0a0a' }}>
    {[...sequence.tracks].reverse().flatMap((track) =>
      sequence.entries
        .filter((entry) => entry.track === track)
        .map((entry) => {
          const Scene = SCENE_COMPONENTS[entry.clipId];
          if (Scene === undefined) {
            return null;
          }
          return (
            <Sequence
              key={`${entry.clipId}:${entry.track}:${entry.from}`}
              from={entry.from}
              durationInFrames={entry.durationInFrames}
              name={`${entry.track} / ${entry.clipId}`}
            >
              <Scene {...transform(entry.clipId, entry.props)} />
            </Sequence>
          );
        }),
    )}
  </AbsoluteFill>
);
