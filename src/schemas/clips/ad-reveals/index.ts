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
];
