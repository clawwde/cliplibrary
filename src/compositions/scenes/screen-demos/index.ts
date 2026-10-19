import type { SceneModule } from '../../scene-module';
import { messageAriseScene } from './message-arise';
import { phoneScrollScene } from './phone-scroll';
import { phoneSwapScene } from './phone-swap';

export const screenDemosScenes: SceneModule[] = [
  phoneScrollScene,
  phoneSwapScene,
  messageAriseScene,
];
