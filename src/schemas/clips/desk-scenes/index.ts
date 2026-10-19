import type { ClipModule } from '../../registry';
import {
  laptopWipeRevealDefaults,
  laptopWipeRevealMeta,
  laptopWipeRevealSchema,
} from './laptop-wipe-reveal';

export const deskScenesClips: ClipModule[] = [
  {
    id: 'laptop-wipe-reveal',
    schema: laptopWipeRevealSchema,
    defaults: laptopWipeRevealDefaults,
    meta: laptopWipeRevealMeta,
  },
];
