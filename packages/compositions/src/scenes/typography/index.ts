import type { SceneModule } from '../../scene-module';
import { detailListScene } from './detail-list';
import { echoStackScene } from './echo-stack';
import { featureCalloutsScene } from './feature-callouts';
import { handwrittenNoteScene } from './handwritten-note';
import { headlineRevealScene } from './headline-reveal';
import { letterFlipScene } from './letter-flip';
import { numberCounterScene } from './number-counter';
import { outlineMarqueeScene } from './outline-marquee';
import { scribbleCaptionScene } from './scribble-caption';
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
  scribbleCaptionScene,
  echoStackScene,
  outlineMarqueeScene,
  letterFlipScene,
];
