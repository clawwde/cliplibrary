import type { SceneModule } from '../../scene-module';
import { phoneFanScene } from './phone-fan';
import { phonePairScene } from './phone-pair';
import { phoneScrollScene } from './phone-scroll';
import { phoneSpinInScene } from './phone-spin-in';
import { phoneSwapScene } from './phone-swap';
import { phoneTurnaroundScene } from './phone-turnaround';
import { phoneWallScene } from './phone-wall';

export const devicesScenes: SceneModule[] = [
  phoneFanScene,
  phonePairScene,
  phoneScrollScene,
  phoneSpinInScene,
  phoneSwapScene,
  phoneTurnaroundScene,
  phoneWallScene,
];
