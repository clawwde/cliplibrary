import type { Project } from '@cliplibrary/project';
import { AbsoluteFill, Sequence } from 'remotion';
import { ElementView } from './element-view';

export const ProjectComposition = (project: Project) => (
  <AbsoluteFill style={{ backgroundColor: project.background }}>
    {project.tracks.flatMap((track) =>
      track.elements.map((element) => (
        <Sequence key={element.id} from={element.from} durationInFrames={element.durationInFrames}>
          <ElementView element={element} />
        </Sequence>
      )),
    )}
  </AbsoluteFill>
);
