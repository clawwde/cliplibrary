import type { ClipModule } from '../../registry';
import { detailListDefaults, detailListMeta, detailListSchema } from './detail-list';
import {
  featureCalloutsDefaults,
  featureCalloutsMeta,
  featureCalloutsSchema,
} from './feature-callouts';
import {
  gradientSweepTextDefaults,
  gradientSweepTextMeta,
  gradientSweepTextSchema,
} from './gradient-sweep-text';
import {
  headlineRevealDefaults,
  headlineRevealMeta,
  headlineRevealSchema,
} from './headline-reveal';
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
    id: 'detail-list',
    schema: detailListSchema,
    defaults: detailListDefaults,
    meta: detailListMeta,
  },
  {
    id: 'feature-callouts',
    schema: featureCalloutsSchema,
    defaults: featureCalloutsDefaults,
    meta: featureCalloutsMeta,
  },
  {
    id: 'gradient-sweep-text',
    schema: gradientSweepTextSchema,
    defaults: gradientSweepTextDefaults,
    meta: gradientSweepTextMeta,
  },
  {
    id: 'headline-reveal',
    schema: headlineRevealSchema,
    defaults: headlineRevealDefaults,
    meta: headlineRevealMeta,
  },
  {
    id: 'kinetic-type',
    schema: kineticTypeSchema,
    defaults: kineticTypeDefaults,
    meta: kineticTypeMeta,
  },
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
];
