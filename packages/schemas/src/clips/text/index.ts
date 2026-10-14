import type { ClipModule } from '../../registry';
import {
  slicedHeadlineDefaults,
  slicedHeadlineMeta,
  slicedHeadlineSchema,
} from './sliced-headline';
import { splitFlapDefaults, splitFlapMeta, splitFlapSchema } from './split-flap';
import { typewriterDefaults, typewriterMeta, typewriterSchema } from './typewriter';

export const textClips: ClipModule[] = [
  {
    id: 'sliced-headline',
    schema: slicedHeadlineSchema,
    defaults: slicedHeadlineDefaults,
    meta: slicedHeadlineMeta,
  },
  { id: 'split-flap', schema: splitFlapSchema, defaults: splitFlapDefaults, meta: splitFlapMeta },
  {
    id: 'typewriter',
    schema: typewriterSchema,
    defaults: typewriterDefaults,
    meta: typewriterMeta,
  },
];
