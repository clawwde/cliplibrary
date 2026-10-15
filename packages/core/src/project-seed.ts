import {
  createCompositionElement,
  createTrack,
  type Project,
  type Track,
} from '@cliplibrary/project';
import {
  CLIP_DEFAULTS,
  CLIP_SEQUENCES,
  type ClipId,
  type ClipSequence,
  getClipMeta,
} from '@cliplibrary/schemas';

const slug = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const sequenceTracks = (id: ClipId, sequence: ClipSequence): Track[] =>
  sequence.tracks.map((name) => {
    const track = createTrack(name);
    track.id = `${id}-track-${slug(name)}`;
    track.elements.push(
      ...sequence.entries
        .map((entry, index) => ({ entry, index }))
        .filter(({ entry }) => entry.track === name)
        .map(({ entry, index }) =>
          createCompositionElement(entry.clipId, structuredClone(entry.props), {
            id: `${id}-layer-${index}-${entry.clipId}`,
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
  const sequence = CLIP_SEQUENCES[id];
  return {
    fps: meta.fps,
    width: meta.width,
    height: meta.height,
    durationInFrames: meta.durationInFrames,
    background: '#0a0a0a',
    tracks: sequence === undefined ? singleClipTrack(id) : sequenceTracks(id, sequence),
  };
};
