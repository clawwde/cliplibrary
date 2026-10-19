import type { SceneModule } from '../../scene-module';
import { doodleArrowsScene } from './doodle-arrows';
import { handwrittenNoteScene } from './handwritten-note';
import { scribbleCaptionScene } from './scribble-caption';

export const handDrawnScenes: SceneModule[] = [
  handwrittenNoteScene,
  scribbleCaptionScene,
  doodleArrowsScene,
];
