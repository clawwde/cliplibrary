import type { ClipModule } from '../../registry';
import { phoneFanDefaults, phoneFanMeta, phoneFanSchema } from './phone-fan';
import { phoneFlatLayDefaults, phoneFlatLayMeta, phoneFlatLaySchema } from './phone-flat-lay';
import { phonePairDefaults, phonePairMeta, phonePairSchema } from './phone-pair';
import { phonePedestalDefaults, phonePedestalMeta, phonePedestalSchema } from './phone-pedestal';
import { phoneScrollDefaults, phoneScrollMeta, phoneScrollSchema } from './phone-scroll';
import { phoneSpinInDefaults, phoneSpinInMeta, phoneSpinInSchema } from './phone-spin-in';
import { phoneSwapDefaults, phoneSwapMeta, phoneSwapSchema } from './phone-swap';
import {
  phoneTurnaroundDefaults,
  phoneTurnaroundMeta,
  phoneTurnaroundSchema,
} from './phone-turnaround';
import { phoneWallDefaults, phoneWallMeta, phoneWallSchema } from './phone-wall';

export const devicesClips: ClipModule[] = [
  {
    id: 'phone-flat-lay',
    schema: phoneFlatLaySchema,
    defaults: phoneFlatLayDefaults,
    meta: phoneFlatLayMeta,
  },
  {
    id: 'phone-pedestal',
    schema: phonePedestalSchema,
    defaults: phonePedestalDefaults,
    meta: phonePedestalMeta,
  },
  { id: 'phone-fan', schema: phoneFanSchema, defaults: phoneFanDefaults, meta: phoneFanMeta },
  { id: 'phone-pair', schema: phonePairSchema, defaults: phonePairDefaults, meta: phonePairMeta },
  {
    id: 'phone-scroll',
    schema: phoneScrollSchema,
    defaults: phoneScrollDefaults,
    meta: phoneScrollMeta,
  },
  {
    id: 'phone-spin-in',
    schema: phoneSpinInSchema,
    defaults: phoneSpinInDefaults,
    meta: phoneSpinInMeta,
  },
  { id: 'phone-swap', schema: phoneSwapSchema, defaults: phoneSwapDefaults, meta: phoneSwapMeta },
  {
    id: 'phone-turnaround',
    schema: phoneTurnaroundSchema,
    defaults: phoneTurnaroundDefaults,
    meta: phoneTurnaroundMeta,
  },
  { id: 'phone-wall', schema: phoneWallSchema, defaults: phoneWallDefaults, meta: phoneWallMeta },
];
