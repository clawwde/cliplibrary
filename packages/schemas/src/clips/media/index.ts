import type { ClipModule } from '../../registry';
import {
  imageGridRevealDefaults,
  imageGridRevealMeta,
  imageGridRevealSchema,
} from './image-grid-reveal';
import { imageShowcaseDefaults, imageShowcaseMeta, imageShowcaseSchema } from './image-showcase';
import { kenBurnsDefaults, kenBurnsMeta, kenBurnsSchema } from './ken-burns';

export const mediaClips: ClipModule[] = [
  {
    id: 'image-grid-reveal',
    schema: imageGridRevealSchema,
    defaults: imageGridRevealDefaults,
    meta: imageGridRevealMeta,
  },
  {
    id: 'image-showcase',
    schema: imageShowcaseSchema,
    defaults: imageShowcaseDefaults,
    meta: imageShowcaseMeta,
  },
  { id: 'ken-burns', schema: kenBurnsSchema, defaults: kenBurnsDefaults, meta: kenBurnsMeta },
];
