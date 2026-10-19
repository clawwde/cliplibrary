import type { SceneModule } from '../../scene-module';
import { helicopterUnveilScene } from './helicopter-unveil';
import { spillRevealScene } from './spill-reveal';

export const adRevealsScenes: SceneModule[] = [helicopterUnveilScene, spillRevealScene];
