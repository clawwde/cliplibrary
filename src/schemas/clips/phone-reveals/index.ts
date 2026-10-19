import type { ClipModule } from '../../registry';
import { phoneFlatLayDefaults, phoneFlatLayMeta, phoneFlatLaySchema } from './phone-flat-lay';
import { phonePedestalDefaults, phonePedestalMeta, phonePedestalSchema } from './phone-pedestal';
import { phoneSpinInDefaults, phoneSpinInMeta, phoneSpinInSchema } from './phone-spin-in';
import {
  phoneTurnaroundDefaults,
  phoneTurnaroundMeta,
  phoneTurnaroundSchema,
} from './phone-turnaround';

export const phoneRevealsClips: ClipModule[] = [
  {
    id: 'phone-spin-in',
    schema: phoneSpinInSchema,
    defaults: phoneSpinInDefaults,
    meta: phoneSpinInMeta,
  },
  {
    id: 'phone-turnaround',
    schema: phoneTurnaroundSchema,
    defaults: phoneTurnaroundDefaults,
    meta: phoneTurnaroundMeta,
  },
  {
    id: 'phone-pedestal',
    schema: phonePedestalSchema,
    defaults: phonePedestalDefaults,
    meta: phonePedestalMeta,
  },
  {
    id: 'phone-flat-lay',
    schema: phoneFlatLaySchema,
    defaults: phoneFlatLayDefaults,
    meta: phoneFlatLayMeta,
  },
];
