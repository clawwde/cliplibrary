import type { ClipModule } from '../../registry';
import { chargeCompareDefaults, chargeCompareMeta, chargeCompareSchema } from './charge-compare';
import { phoneFanDefaults, phoneFanMeta, phoneFanSchema } from './phone-fan';
import { phonePairDefaults, phonePairMeta, phonePairSchema } from './phone-pair';
import { phoneWallDefaults, phoneWallMeta, phoneWallSchema } from './phone-wall';

export const phoneLayoutsClips: ClipModule[] = [
  { id: 'phone-fan', schema: phoneFanSchema, defaults: phoneFanDefaults, meta: phoneFanMeta },
  { id: 'phone-pair', schema: phonePairSchema, defaults: phonePairDefaults, meta: phonePairMeta },
  { id: 'phone-wall', schema: phoneWallSchema, defaults: phoneWallDefaults, meta: phoneWallMeta },
  {
    id: 'charge-compare',
    schema: chargeCompareSchema,
    defaults: chargeCompareDefaults,
    meta: chargeCompareMeta,
  },
];
