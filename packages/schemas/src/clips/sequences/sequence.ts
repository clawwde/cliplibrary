import { z } from 'zod';
import type { ClipId } from '../../clip-props';
import { zColor } from '../../control';
import { PHONE_FINISHES } from '../../promo-common';

export interface SequenceEntry {
  clipId: ClipId;
  track: string;
  from: number;
  durationInFrames: number;
  props: Record<string, unknown>;
}

export interface ClipSequence {
  tracks: readonly string[];
  entries: readonly SequenceEntry[];
}

export const sequenceEnd = (entries: readonly SequenceEntry[]): number =>
  entries.reduce((end, item) => Math.max(end, item.from + item.durationInFrames), 0);

export const sequenceBrandSchema = z.object({
  brandName: z.string(),
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type SequenceBrand = z.infer<typeof sequenceBrandSchema>;
