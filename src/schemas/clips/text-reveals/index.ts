import type { ClipModule } from '../../registry';
import { letterFlipDefaults, letterFlipMeta, letterFlipSchema } from './letter-flip';
import { numberCounterDefaults, numberCounterMeta, numberCounterSchema } from './number-counter';
import { typewriterDefaults, typewriterMeta, typewriterSchema } from './typewriter';

export const textRevealsClips: ClipModule[] = [
  {
    id: 'typewriter',
    schema: typewriterSchema,
    defaults: typewriterDefaults,
    meta: typewriterMeta,
  },
  {
    id: 'letter-flip',
    schema: letterFlipSchema,
    defaults: letterFlipDefaults,
    meta: letterFlipMeta,
  },
  {
    id: 'number-counter',
    schema: numberCounterSchema,
    defaults: numberCounterDefaults,
    meta: numberCounterMeta,
  },
];
