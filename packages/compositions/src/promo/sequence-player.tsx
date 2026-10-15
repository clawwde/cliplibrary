import type { ClipId, ClipSequence, EntryTransform } from '@cliplibrary/schemas';
import type { FC } from 'react';
import { AbsoluteFill, Sequence } from 'remotion';

export type AnyScene = FC<Record<string, unknown>>;

export type SceneMap = Partial<Record<ClipId, AnyScene>>;

export interface PlayerBrand {
  accent: string;
  finish: string;
  useFinishEverywhere: boolean;
  brandName?: string | undefined;
}

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
  brand: PlayerBrand,
  branded: ReadonlySet<ClipId>,
): Record<string, unknown> => {
  const { look: sceneLook } = props;
  const look = isRecord(sceneLook) ? { ...sceneLook, accent: brand.accent } : sceneLook;
  const next: Record<string, unknown> =
    branded.has(clipId) && brand.brandName !== undefined
      ? { ...props, look, brandName: brand.brandName, markColor: brand.accent }
      : { ...props, look };
  return brand.useFinishEverywhere
    ? (withFinish(next, brand.finish) as Record<string, unknown>)
    : next;
};

const placed = (transform: EntryTransform | undefined) =>
  transform === undefined
    ? undefined
    : {
        transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        transformOrigin: 'center center',
        overflow: 'hidden' as const,
      };

export const SequencePlayer = ({
  sequence,
  scenes,
  brand,
  branded = new Set(),
  adapt = (_clipId, props) => props,
}: {
  sequence: ClipSequence;
  scenes: SceneMap;
  brand: PlayerBrand;
  branded?: ReadonlySet<ClipId>;
  adapt?: (clipId: ClipId, props: Record<string, unknown>) => Record<string, unknown>;
}) => (
  <AbsoluteFill style={{ background: '#0a0a0a' }}>
    {[...sequence.tracks].reverse().flatMap((track) =>
      sequence.entries
        .filter((entry) => entry.track === track)
        .map((entry) => {
          const Scene = scenes[entry.clipId];
          if (Scene === undefined) {
            return null;
          }
          return (
            <Sequence
              key={`${entry.clipId}:${entry.track}:${entry.from}:${entry.transform?.x ?? 0}:${entry.transform?.y ?? 0}`}
              from={entry.from}
              durationInFrames={entry.durationInFrames}
              name={`${entry.track} / ${entry.clipId}`}
            >
              <AbsoluteFill style={placed(entry.transform)}>
                <Scene
                  {...brandScene(entry.clipId, adapt(entry.clipId, entry.props), brand, branded)}
                />
              </AbsoluteFill>
            </Sequence>
          );
        }),
    )}
  </AbsoluteFill>
);
