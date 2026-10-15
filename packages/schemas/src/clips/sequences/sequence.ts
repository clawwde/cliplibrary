import { z } from 'zod';
import type { ClipId } from '../../clip-props';
import { zColor } from '../../control';
import { PHONE_FINISHES, type PromoLook } from '../../promo-common';

export const SEQUENCE_TRACKS = ['Captions', 'Text', 'Overlays', 'Devices', 'Backdrop'] as const;

export type SequenceTrack = (typeof SEQUENCE_TRACKS)[number];

export interface SequenceEntry {
  clipId: ClipId;
  track: SequenceTrack;
  from: number;
  durationInFrames: number;
  props: Record<string, unknown>;
}

export interface ClipSequence {
  tracks: readonly string[];
  entries: readonly SequenceEntry[];
}

export const sequenceEntry =
  (baseLook: PromoLook) =>
  <Props extends object>(
    clipId: ClipId,
    track: SequenceTrack,
    [from, to]: [number, number],
    defaults: Props,
    overrides: Partial<Props>,
  ): SequenceEntry => ({
    clipId,
    track,
    from,
    durationInFrames: to - from,
    props: { ...defaults, look: baseLook, ...overrides } as Record<string, unknown>,
  });

export const sequenceEnd = (entries: readonly SequenceEntry[]): number =>
  entries.reduce((end, item) => Math.max(end, item.from + item.durationInFrames), 0);

export const sequenceBrandSchema = z.object({
  brandName: z.string(),
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type SequenceBrandProps = z.infer<typeof sequenceBrandSchema>;
