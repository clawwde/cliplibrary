import type { SceneModule } from '../../scene-module';
import { letterFlipScene } from './letter-flip';
import { magnifierCaptionScene } from './magnifier-caption';
import { numberCounterScene } from './number-counter';
import { printerPagesScene } from './printer-pages';
import { typewriterScene } from './typewriter';

export const textRevealsScenes: SceneModule[] = [
  typewriterScene,
  letterFlipScene,
  numberCounterScene,
  printerPagesScene,
  magnifierCaptionScene,
];
