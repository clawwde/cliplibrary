import type { ClipModule } from '../../registry';
import { barChartGrowDefaults, barChartGrowMeta, barChartGrowSchema } from './bar-chart-grow';
import { countUpDefaults, countUpMeta, countUpSchema } from './count-up';
import { donutProgressDefaults, donutProgressMeta, donutProgressSchema } from './donut-progress';
import { lineDrawDefaults, lineDrawMeta, lineDrawSchema } from './line-draw';
import {
  odometerLedgerDefaults,
  odometerLedgerMeta,
  odometerLedgerSchema,
} from './odometer-ledger';
import { orbitCardsDefaults, orbitCardsMeta, orbitCardsSchema } from './orbit-cards';

export const dataClips: ClipModule[] = [
  {
    id: 'bar-chart-grow',
    schema: barChartGrowSchema,
    defaults: barChartGrowDefaults,
    meta: barChartGrowMeta,
  },
  { id: 'count-up', schema: countUpSchema, defaults: countUpDefaults, meta: countUpMeta },
  {
    id: 'donut-progress',
    schema: donutProgressSchema,
    defaults: donutProgressDefaults,
    meta: donutProgressMeta,
  },
  { id: 'line-draw', schema: lineDrawSchema, defaults: lineDrawDefaults, meta: lineDrawMeta },
  {
    id: 'odometer-ledger',
    schema: odometerLedgerSchema,
    defaults: odometerLedgerDefaults,
    meta: odometerLedgerMeta,
  },
  {
    id: 'orbit-cards',
    schema: orbitCardsSchema,
    defaults: orbitCardsDefaults,
    meta: orbitCardsMeta,
  },
];
