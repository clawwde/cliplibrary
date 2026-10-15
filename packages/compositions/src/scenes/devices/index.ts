import type { SceneModule } from '../../scene-module';
import { phoneFanScene } from './phone-fan';
import { phoneFlatLayScene } from './phone-flat-lay';
import { phonePairScene } from './phone-pair';
import { phonePedestalScene } from './phone-pedestal';
import { phoneScrollScene } from './phone-scroll';
import { phoneSpinInScene } from './phone-spin-in';
import { phoneSwapScene } from './phone-swap';
import { phoneTurnaroundScene } from './phone-turnaround';
import { phoneWallScene } from './phone-wall';

export const devicesScenes: SceneModule[] = [
  phoneFlatLayScene,
  phonePedestalScene,
  phoneFanScene,
  phonePairScene,
  phoneScrollScene,
  phoneSpinInScene,
  phoneSwapScene,
  phoneTurnaroundScene,
  phoneWallScene,
];
