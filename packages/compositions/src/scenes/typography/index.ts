import type { SceneModule } from '../../scene-module';
import { detailListScene } from './detail-list';
import { featureCalloutsScene } from './feature-callouts';
import { handwrittenNoteScene } from './handwritten-note';
import { headlineRevealScene } from './headline-reveal';

export const typographyScenes: SceneModule[] = [
  detailListScene,
  featureCalloutsScene,
  headlineRevealScene,
  handwrittenNoteScene,
];
