import type { SceneModule } from '../../scene-module';
import { detailListScene } from './detail-list';
import { featureCalloutsScene } from './feature-callouts';
import { handwrittenNoteScene } from './handwritten-note';
import { headlineRevealScene } from './headline-reveal';
import { numberCounterScene } from './number-counter';
import { typewriterScene } from './typewriter';
import { wordBuildScene } from './word-build';
import { wordPunchScene } from './word-punch';

export const typographyScenes: SceneModule[] = [
  detailListScene,
  featureCalloutsScene,
  headlineRevealScene,
  handwrittenNoteScene,
  numberCounterScene,
  typewriterScene,
  wordBuildScene,
  wordPunchScene,
];
