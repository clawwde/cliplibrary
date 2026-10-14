import type { ClipModule } from '../../registry';
import { blurFadeInDefaults, blurFadeInMeta, blurFadeInSchema } from './blur-fade-in';
import { bounceInDefaults, bounceInMeta, bounceInSchema } from './bounce-in';
import { fadeInDefaults, fadeInMeta, fadeInSchema } from './fade-in';
import { flipCardDefaults, flipCardMeta, flipCardSchema } from './flip-card';
import { riseSlideDefaults, riseSlideMeta, riseSlideSchema } from './rise-slide';
import { scalePopDefaults, scalePopMeta, scalePopSchema } from './scale-pop';
import { slideInDefaults, slideInMeta, slideInSchema } from './slide-in';
import { wipeRevealDefaults, wipeRevealMeta, wipeRevealSchema } from './wipe-reveal';

export const simpleClips: ClipModule[] = [
  {
    id: 'blur-fade-in',
    schema: blurFadeInSchema,
    defaults: blurFadeInDefaults,
    meta: blurFadeInMeta,
  },
  { id: 'rise-slide', schema: riseSlideSchema, defaults: riseSlideDefaults, meta: riseSlideMeta },
  { id: 'fade-in', schema: fadeInSchema, defaults: fadeInDefaults, meta: fadeInMeta },
  { id: 'slide-in', schema: slideInSchema, defaults: slideInDefaults, meta: slideInMeta },
  { id: 'scale-pop', schema: scalePopSchema, defaults: scalePopDefaults, meta: scalePopMeta },
  {
    id: 'wipe-reveal',
    schema: wipeRevealSchema,
    defaults: wipeRevealDefaults,
    meta: wipeRevealMeta,
  },
  { id: 'bounce-in', schema: bounceInSchema, defaults: bounceInDefaults, meta: bounceInMeta },
  { id: 'flip-card', schema: flipCardSchema, defaults: flipCardDefaults, meta: flipCardMeta },
];
