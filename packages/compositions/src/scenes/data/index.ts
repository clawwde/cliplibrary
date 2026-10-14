import type { SceneModule } from '../../scene-module';
import { barChartGrowScene } from './bar-chart-grow';
import { countUpScene } from './count-up';
import { donutProgressScene } from './donut-progress';
import { lineDrawScene } from './line-draw';
import { odometerLedgerScene } from './odometer-ledger';
import { orbitCardsScene } from './orbit-cards';

export const dataScenes: SceneModule[] = [
  orbitCardsScene,
  odometerLedgerScene,
  countUpScene,
  barChartGrowScene,
  lineDrawScene,
  donutProgressScene,
];
