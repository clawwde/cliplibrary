import type { SceneModule } from '../../scene-module';
import { gradientSweepTextScene } from './gradient-sweep-text';
import { kineticTypeScene } from './kinetic-type';
import { slicedHeadlineScene } from './sliced-headline';
import { splitFlapScene } from './split-flap';
import { typewriterScene } from './typewriter';
import { wordRevealScene } from './word-reveal';

export const typographyScenes: SceneModule[] = [
  slicedHeadlineScene,
  splitFlapScene,
  typewriterScene,
  wordRevealScene,
  kineticTypeScene,
  gradientSweepTextScene,
];
