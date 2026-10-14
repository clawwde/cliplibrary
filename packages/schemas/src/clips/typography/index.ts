import type { ClipModule } from '../../registry';
import {
  gradientSweepTextDefaults,
  gradientSweepTextMeta,
  gradientSweepTextSchema,
} from './gradient-sweep-text';
import { kineticTypeDefaults, kineticTypeMeta, kineticTypeSchema } from './kinetic-type';
import {
  slicedHeadlineDefaults,
  slicedHeadlineMeta,
  slicedHeadlineSchema,
} from './sliced-headline';
import { splitFlapDefaults, splitFlapMeta, splitFlapSchema } from './split-flap';
import { typewriterDefaults, typewriterMeta, typewriterSchema } from './typewriter';
import { wordRevealDefaults, wordRevealMeta, wordRevealSchema } from './word-reveal';

export const typographyClips: ClipModule[] = [
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
  {
    id: 'word-reveal',
    schema: wordRevealSchema,
    defaults: wordRevealDefaults,
    meta: wordRevealMeta,
  },
  {
    id: 'kinetic-type',
    schema: kineticTypeSchema,
    defaults: kineticTypeDefaults,
    meta: kineticTypeMeta,
  },
  {
    id: 'gradient-sweep-text',
    schema: gradientSweepTextSchema,
    defaults: gradientSweepTextDefaults,
    meta: gradientSweepTextMeta,
  },
];
