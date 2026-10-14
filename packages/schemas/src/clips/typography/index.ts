import type { ClipModule } from '../../registry';
import { detailListDefaults, detailListMeta, detailListSchema } from './detail-list';
import {
  featureCalloutsDefaults,
  featureCalloutsMeta,
  featureCalloutsSchema,
} from './feature-callouts';
import {
  headlineRevealDefaults,
  headlineRevealMeta,
  headlineRevealSchema,
} from './headline-reveal';

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
    id: 'headline-reveal',
    schema: headlineRevealSchema,
    defaults: headlineRevealDefaults,
    meta: headlineRevealMeta,
  },
];
