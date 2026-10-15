import type { ClipId, ClipSequence, SequenceBrand } from '@cliplibrary/schemas';
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
import { DoodleArrows } from '../overlays/doodle-arrows';
import { FloatingCards } from '../overlays/floating-cards';
import { DetailList } from '../typography/detail-list';
import { FeatureCallouts } from '../typography/feature-callouts';
import { HandwrittenNote } from '../typography/handwritten-note';
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
  'doodle-arrows': DoodleArrows as unknown as AnyScene,
  'detail-list': DetailList as unknown as AnyScene,
  'feature-callouts': FeatureCallouts as unknown as AnyScene,
  'headline-reveal': HeadlineReveal as unknown as AnyScene,
  'handwritten-note': HandwrittenNote as unknown as AnyScene,
};

const BRANDED: ReadonlySet<ClipId> = new Set(['brand-reveal', 'cta-end-card']);

const BASE_BRAND = 'Halo';

const rebrand = (value: unknown, brandName: string): unknown =>
  typeof value === 'string' ? value.replaceAll(BASE_BRAND, brandName) : value;

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
  brand: SequenceBrand,
): Record<string, unknown> => {
  const { look: sceneLook, text, highlight } = props;
  const look = isRecord(sceneLook) ? { ...sceneLook, accent: brand.accent } : sceneLook;
  const named =
    clipId === 'handwritten-note'
      ? {
          ...props,
          text: rebrand(text, brand.brandName),
          highlight: rebrand(highlight, brand.brandName),
        }
      : props;
  const branded: Record<string, unknown> = BRANDED.has(clipId)
    ? { ...named, look, brandName: brand.brandName, markColor: brand.accent }
    : { ...named, look };
  return brand.useFinishEverywhere
    ? (withFinish(branded, brand.finish) as Record<string, unknown>)
    : branded;
};

export const SequenceLayers = ({
  sequence,
  brand,
}: {
  sequence: ClipSequence;
  brand: SequenceBrand;
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
              <Scene {...brandScene(entry.clipId, entry.props, brand)} />
            </Sequence>
          );
        }),
    )}
  </AbsoluteFill>
);
