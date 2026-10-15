import type { ClipId } from '../../clip-props';

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
