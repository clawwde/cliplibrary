import { AbsoluteFill, Sequence } from 'remotion';
import type { Project } from '@/project';
import { ElementView } from './element-view';

export const ProjectComposition = (project: Project) => {
  const layers = project.tracks.map((track, index) => ({
    track,
    zIndex: project.tracks.length - index,
  }));
  return (
    <AbsoluteFill style={{ backgroundColor: project.background }}>
      {layers.map(({ track, zIndex }) => (
        <AbsoluteFill key={track.id} style={{ zIndex }}>
          {track.elements.map((element) => (
            <Sequence
              key={element.id}
              from={element.from}
              durationInFrames={element.durationInFrames}
            >
              <ElementView element={element} />
            </Sequence>
          ))}
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
};
