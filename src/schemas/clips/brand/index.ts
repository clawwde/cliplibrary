import type { ClipModule } from '../../registry';
import { appIconRevealDefaults, appIconRevealMeta, appIconRevealSchema } from './app-icon-reveal';
import { brandRevealDefaults, brandRevealMeta, brandRevealSchema } from './brand-reveal';
import { ctaEndCardDefaults, ctaEndCardMeta, ctaEndCardSchema } from './cta-end-card';
import {
  dotWordmarkRevealDefaults,
  dotWordmarkRevealMeta,
  dotWordmarkRevealSchema,
} from './dot-wordmark-reveal';

export const brandClips: ClipModule[] = [
  {
    id: 'brand-reveal',
    schema: brandRevealSchema,
    defaults: brandRevealDefaults,
    meta: brandRevealMeta,
  },
  {
    id: 'app-icon-reveal',
    schema: appIconRevealSchema,
    defaults: appIconRevealDefaults,
    meta: appIconRevealMeta,
  },
  {
    id: 'cta-end-card',
    schema: ctaEndCardSchema,
    defaults: ctaEndCardDefaults,
    meta: ctaEndCardMeta,
  },
  {
    id: 'dot-wordmark-reveal',
    schema: dotWordmarkRevealSchema,
    defaults: dotWordmarkRevealDefaults,
    meta: dotWordmarkRevealMeta,
  },
];
