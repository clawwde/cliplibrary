import type { SceneModule } from '../../scene-module';
import { mosaicRevealScene } from './mosaic-reveal';
import { sceneTransitionScene } from './scene-transition';

export const transitionsScenes: SceneModule[] = [mosaicRevealScene, sceneTransitionScene];
