import type { SceneModule } from '../../scene-module';
import { phoneFanScene } from './phone-fan';
import { phonePairScene } from './phone-pair';
import { phoneWallScene } from './phone-wall';

export const phoneLayoutsScenes: SceneModule[] = [phoneFanScene, phonePairScene, phoneWallScene];
