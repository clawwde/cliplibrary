import type { SceneModule } from '../../scene-module';
import { blurFadeInScene } from './blur-fade-in';
import { riseSlideScene } from './rise-slide';

export const simpleScenes: SceneModule[] = [blurFadeInScene, riseSlideScene];
