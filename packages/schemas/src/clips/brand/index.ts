import type { ClipModule } from '../../registry';
import { appIconRevealDefaults, appIconRevealMeta, appIconRevealSchema } from './app-icon-reveal';
import { brandRevealDefaults, brandRevealMeta, brandRevealSchema } from './brand-reveal';
import { ctaEndCardDefaults, ctaEndCardMeta, ctaEndCardSchema } from './cta-end-card';

export const brandClips: ClipModule[] = [
  {
    id: 'app-icon-reveal',
    schema: appIconRevealSchema,
    defaults: appIconRevealDefaults,
    meta: appIconRevealMeta,
  },
  {
    id: 'brand-reveal',
    schema: brandRevealSchema,
    defaults: brandRevealDefaults,
    meta: brandRevealMeta,
  },
  {
    id: 'cta-end-card',
    schema: ctaEndCardSchema,
    defaults: ctaEndCardDefaults,
    meta: ctaEndCardMeta,
  },
];
