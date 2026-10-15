import type { ClipId } from '../../clip-props';
import type { ClipModule } from '../../registry';
import { APP_PROMO_SEQUENCE, appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import type { ClipSequence } from './sequence';

export const sequencesClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
];

export const CLIP_SEQUENCES: Partial<Record<ClipId, ClipSequence>> = {
  'app-promo': APP_PROMO_SEQUENCE,
};
