import { z } from 'zod';
import type { ClipId } from './clip-props';
import { zColor } from './control';
import { PHONE_FINISHES } from './promo-common';

export interface EntryTransform {
  x: number;
  y: number;
  scale: number;
}

export interface SequenceEntry {
  clipId: ClipId;
  track: string;
  from: number;
  durationInFrames: number;
  props: Record<string, unknown>;
  transform?: EntryTransform | undefined;
}

export interface ClipSequence {
  tracks: readonly string[];
  entries: readonly SequenceEntry[];
}

export const QUADRANTS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const;

export type Quadrant = (typeof QUADRANTS)[number];

export const quadrantTransform = (
  quadrant: Quadrant,
  width = 1920,
  height = 1080,
): EntryTransform => ({
  x: (quadrant.endsWith('left') ? -1 : 1) * (width / 4),
  y: (quadrant.startsWith('top') ? -1 : 1) * (height / 4),
  scale: 0.5,
});

export const sequenceEnd = (entries: readonly SequenceEntry[]): number =>
  entries.reduce((end, item) => Math.max(end, item.from + item.durationInFrames), 0);

export const sequenceLength = (sequence: ClipSequence): number => sequenceEnd(sequence.entries);

export const sequenceBrandSchema = z.object({
  brandName: z.string(),
  accent: zColor(),
  finish: z.enum(PHONE_FINISHES),
  useFinishEverywhere: z.boolean(),
});

export type SequenceBrand = z.infer<typeof sequenceBrandSchema>;
