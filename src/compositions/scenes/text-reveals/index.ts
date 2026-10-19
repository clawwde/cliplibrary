import type { SceneModule } from '../../scene-module';
import { letterFlipScene } from './letter-flip';
import { numberCounterScene } from './number-counter';
import { typewriterScene } from './typewriter';

export const textRevealsScenes: SceneModule[] = [
  typewriterScene,
  letterFlipScene,
  numberCounterScene,
];
