import type { SceneModule } from '../../scene-module';
import { blurFadeInScene } from './blur-fade-in';
import { bounceInScene } from './bounce-in';
import { fadeInScene } from './fade-in';
import { flipCardScene } from './flip-card';
import { riseSlideScene } from './rise-slide';
import { scalePopScene } from './scale-pop';
import { slideInScene } from './slide-in';
import { wipeRevealScene } from './wipe-reveal';

export const simpleScenes: SceneModule[] = [
  blurFadeInScene,
  riseSlideScene,
  fadeInScene,
  slideInScene,
  scalePopScene,
  wipeRevealScene,
  bounceInScene,
  flipCardScene,
];
