import type { ClipModule } from '../../registry';
import { blurFadeInDefaults, blurFadeInMeta, blurFadeInSchema } from './blur-fade-in';
import { riseSlideDefaults, riseSlideMeta, riseSlideSchema } from './rise-slide';

export const simpleClips: ClipModule[] = [
  {
    id: 'blur-fade-in',
    schema: blurFadeInSchema,
    defaults: blurFadeInDefaults,
    meta: blurFadeInMeta,
  },
  { id: 'rise-slide', schema: riseSlideSchema, defaults: riseSlideDefaults, meta: riseSlideMeta },
];
