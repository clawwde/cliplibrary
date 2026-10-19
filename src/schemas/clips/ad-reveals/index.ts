import type { ClipModule } from '../../registry';
import {
  helicopterUnveilDefaults,
  helicopterUnveilMeta,
  helicopterUnveilSchema,
} from './helicopter-unveil';
import { spillRevealDefaults, spillRevealMeta, spillRevealSchema } from './spill-reveal';

export const adRevealsClips: ClipModule[] = [
  {
    id: 'helicopter-unveil',
    schema: helicopterUnveilSchema,
    defaults: helicopterUnveilDefaults,
    meta: helicopterUnveilMeta,
  },
  {
    id: 'spill-reveal',
    schema: spillRevealSchema,
    defaults: spillRevealDefaults,
    meta: spillRevealMeta,
  },
];
