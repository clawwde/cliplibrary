import type { ClipModule } from '../../registry';
import { appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';

export const sequencesClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
];
