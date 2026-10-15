import type { ClipId, ClipSequence, SequenceBrandProps } from '@cliplibrary/schemas';
import type { FC } from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { StudioBackdrop } from '../backgrounds/studio-backdrop';
import { BrandReveal } from '../brand/brand-reveal';
import { CtaEndCard } from '../brand/cta-end-card';
import { PhoneFan } from '../devices/phone-fan';
import { PhonePair } from '../devices/phone-pair';
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
  'studio-backdrop': StudioBackdrop as unknown as AnyScene,
  'brand-reveal': BrandReveal as unknown as AnyScene,
  'cta-end-card': CtaEndCard as unknown as AnyScene,
  'phone-fan': PhoneFan as unknown as AnyScene,
  'phone-pair': PhonePair as unknown as AnyScene,
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

const BRANDED: ReadonlySet<ClipId> = new Set(['brand-reveal', 'cta-end-card']);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const withFinish = (value: unknown, finish: string): unknown => {
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

const brandScene = (
  clipId: ClipId,
  props: Record<string, unknown>,
  brand: SequenceBrandProps,
): Record<string, unknown> => {
  const { look: sceneLook } = props;
  const look = isRecord(sceneLook) ? { ...sceneLook, accent: brand.accent } : sceneLook;
  const branded: Record<string, unknown> = BRANDED.has(clipId)
    ? { ...props, look, brandName: brand.brandName, markColor: brand.accent }
    : { ...props, look };
  return brand.useFinishEverywhere
    ? (withFinish(branded, brand.finish) as Record<string, unknown>)
    : branded;
};

interface SequencePlayerProps {
  sequence: ClipSequence;
  brand: SequenceBrandProps;
}

export const SequencePlayer = ({ sequence, brand }: SequencePlayerProps) => (
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
              <Scene {...brandScene(entry.clipId, entry.props, brand)} />
            </Sequence>
          );
        }),
    )}
  </AbsoluteFill>
);
