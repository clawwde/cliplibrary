import type { SceneModule } from '../../scene-module';
import { slicedHeadlineScene } from './sliced-headline';
import { splitFlapScene } from './split-flap';
import { typewriterScene } from './typewriter';

export const textScenes: SceneModule[] = [slicedHeadlineScene, splitFlapScene, typewriterScene];
