import type { ClipModule } from '../../registry';
import {
  helicopterUnveilDefaults,
  helicopterUnveilMeta,
  helicopterUnveilSchema,
} from './helicopter-unveil';
import {
  problemStrikeoutDefaults,
  problemStrikeoutMeta,
  problemStrikeoutSchema,
} from './problem-strikeout';
import { spillRevealDefaults, spillRevealMeta, spillRevealSchema } from './spill-reveal';

export const adRevealsClips: ClipModule[] = [
  {
    id: 'helicopter-unveil',
    schema: helicopterUnveilSchema,
    defaults: helicopterUnveilDefaults,
    meta: helicopterUnveilMeta,
  },
  {
    id: 'problem-strikeout',
    schema: problemStrikeoutSchema,
    defaults: problemStrikeoutDefaults,
    meta: problemStrikeoutMeta,
  },
  {
    id: 'spill-reveal',
    schema: spillRevealSchema,
    defaults: spillRevealDefaults,
    meta: spillRevealMeta,
  },
];
