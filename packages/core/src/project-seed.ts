import { createCompositionElement, createTrack, type Project } from '@cliplibrary/project';
import { CLIP_DEFAULTS, type ClipId, getClipMeta } from '@cliplibrary/schemas';

export const seedProjectForClip = (id: ClipId): Project => {
  const meta = getClipMeta(id);
  const track = createTrack('Clip');
  track.elements.push(
    createCompositionElement(id, CLIP_DEFAULTS[id] as Record<string, unknown>, {
      id: `clip-${id}`,
      from: 0,
      durationInFrames: meta.durationInFrames,
    }),
  );
  return {
    fps: meta.fps,
    width: meta.width,
    height: meta.height,
    durationInFrames: meta.durationInFrames,
    background: '#0a0a0a',
    tracks: [track],
  };
};
