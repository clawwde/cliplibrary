import type { ClipModule } from '../../registry';
import { messageAriseDefaults, messageAriseMeta, messageAriseSchema } from './message-arise';
import { phoneScrollDefaults, phoneScrollMeta, phoneScrollSchema } from './phone-scroll';
import { phoneSwapDefaults, phoneSwapMeta, phoneSwapSchema } from './phone-swap';

export const screenDemosClips: ClipModule[] = [
  {
    id: 'phone-scroll',
    schema: phoneScrollSchema,
    defaults: phoneScrollDefaults,
    meta: phoneScrollMeta,
  },
  { id: 'phone-swap', schema: phoneSwapSchema, defaults: phoneSwapDefaults, meta: phoneSwapMeta },
  {
    id: 'message-arise',
    schema: messageAriseSchema,
    defaults: messageAriseDefaults,
    meta: messageAriseMeta,
  },
];
