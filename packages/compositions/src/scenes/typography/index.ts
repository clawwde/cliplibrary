import type { SceneModule } from '../../scene-module';
import { detailListScene } from './detail-list';
import { featureCalloutsScene } from './feature-callouts';
import { gradientSweepTextScene } from './gradient-sweep-text';
import { headlineRevealScene } from './headline-reveal';
import { kineticTypeScene } from './kinetic-type';
import { slicedHeadlineScene } from './sliced-headline';
import { splitFlapScene } from './split-flap';
import { typewriterScene } from './typewriter';
import { wordRevealScene } from './word-reveal';

export const typographyScenes: SceneModule[] = [
  detailListScene,
  featureCalloutsScene,
  gradientSweepTextScene,
  headlineRevealScene,
  kineticTypeScene,
  slicedHeadlineScene,
  splitFlapScene,
  typewriterScene,
  wordRevealScene,
];
