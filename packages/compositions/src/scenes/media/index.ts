import type { SceneModule } from '../../scene-module';
import { imageGridRevealScene } from './image-grid-reveal';
import { imageShowcaseScene } from './image-showcase';
import { kenBurnsScene } from './ken-burns';

export const mediaScenes: SceneModule[] = [imageGridRevealScene, imageShowcaseScene, kenBurnsScene];
