import type { ClipId } from '../../clip-props';
import type { ClipModule } from '../../registry';
import { APP_PROMO_SEQUENCE, appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import {
  APP_PROMO_SHORT_SEQUENCE,
  appPromoShortDefaults,
  appPromoShortMeta,
  appPromoShortSchema,
} from './app-promo-short';
import type { ClipSequence } from './sequence';

export const sequencesClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
  {
    id: 'app-promo-short',
    schema: appPromoShortSchema,
    defaults: appPromoShortDefaults,
    meta: appPromoShortMeta,
  },
];

export const CLIP_SEQUENCES: Partial<Record<ClipId, ClipSequence>> = {
  'app-promo': APP_PROMO_SEQUENCE,
  'app-promo-short': APP_PROMO_SHORT_SEQUENCE,
};
