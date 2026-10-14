import {
  createCompositionElement,
  createTrack,
  type Project,
  type Track,
} from '@cliplibrary/project';
import {
  APP_PROMO_SEQUENCE,
  CLIP_DEFAULTS,
  type ClipId,
  getClipMeta,
  SEQUENCE_LANES,
  type SequenceEntry,
} from '@cliplibrary/schemas';

const SEQUENCES: Partial<Record<ClipId, readonly SequenceEntry[]>> = {
  'app-promo': APP_PROMO_SEQUENCE,
};

const sequenceTracks = (id: ClipId, entries: readonly SequenceEntry[]): Track[] =>
  SEQUENCE_LANES.map((name, lane) => {
    const track = createTrack(name);
    track.id = `${id}-lane-${lane}`;
    track.elements.push(
      ...entries
        .map((entry, index) => ({ entry, index }))
        .filter(({ entry }) => entry.lane === lane)
        .map(({ entry, index }) =>
          createCompositionElement(entry.clipId, structuredClone(entry.props), {
            id: `${id}-scene-${index}-${entry.clipId}`,
            from: entry.from,
            durationInFrames: entry.durationInFrames,
          }),
        ),
    );
    return track;
  });

const singleClipTrack = (id: ClipId): Track[] => {
  const track = createTrack('Clip');
  track.elements.push(
    createCompositionElement(id, CLIP_DEFAULTS[id] as Record<string, unknown>, {
      id: `clip-${id}`,
      from: 0,
      durationInFrames: getClipMeta(id).durationInFrames,
    }),
  );
  return [track];
};

export const seedProjectForClip = (id: ClipId): Project => {
  const meta = getClipMeta(id);
  const sequence = SEQUENCES[id];
  return {
    fps: meta.fps,
    width: meta.width,
    height: meta.height,
    durationInFrames: meta.durationInFrames,
    background: '#0a0a0a',
    tracks: sequence === undefined ? singleClipTrack(id) : sequenceTracks(id, sequence),
  };
};
