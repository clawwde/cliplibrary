import type { ClipModule } from '../../registry';
import { countUpDefaults, countUpMeta, countUpSchema } from './count-up';
import {
  odometerLedgerDefaults,
  odometerLedgerMeta,
  odometerLedgerSchema,
} from './odometer-ledger';
import { orbitCardsDefaults, orbitCardsMeta, orbitCardsSchema } from './orbit-cards';
import { productDemoDefaults, productDemoMeta, productDemoSchema } from './product-demo';

export const dataClips: ClipModule[] = [
  {
    id: 'orbit-cards',
    schema: orbitCardsSchema,
    defaults: orbitCardsDefaults,
    meta: orbitCardsMeta,
  },
  {
    id: 'odometer-ledger',
    schema: odometerLedgerSchema,
    defaults: odometerLedgerDefaults,
    meta: odometerLedgerMeta,
  },
  {
    id: 'product-demo',
    schema: productDemoSchema,
    defaults: productDemoDefaults,
    meta: productDemoMeta,
  },
  { id: 'count-up', schema: countUpSchema, defaults: countUpDefaults, meta: countUpMeta },
];
