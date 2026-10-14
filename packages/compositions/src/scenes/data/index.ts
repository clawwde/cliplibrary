import type { SceneModule } from '../../scene-module';
import { countUpScene } from './count-up';
import { odometerLedgerScene } from './odometer-ledger';
import { orbitCardsScene } from './orbit-cards';
import { productDemoScene } from './product-demo';

export const dataScenes: SceneModule[] = [
  orbitCardsScene,
  odometerLedgerScene,
  productDemoScene,
  countUpScene,
];
