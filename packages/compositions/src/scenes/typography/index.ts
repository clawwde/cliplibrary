import type { SceneModule } from '../../scene-module';
import { echoStackScene } from './echo-stack';
import { handwrittenNoteScene } from './handwritten-note';
import { letterFlipScene } from './letter-flip';
import { numberCounterScene } from './number-counter';
import { outlineMarqueeScene } from './outline-marquee';
import { scribbleCaptionScene } from './scribble-caption';
import { typewriterScene } from './typewriter';
import { wordBuildScene } from './word-build';
import { wordPunchScene } from './word-punch';

export const typographyScenes: SceneModule[] = [
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
