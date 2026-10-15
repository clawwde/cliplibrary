import type { ClipModule } from '../../registry';
import { appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import { doodlePromoDefaults, doodlePromoMeta, doodlePromoSchema } from './doodle-promo';

export const sequencesClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
  {
    id: 'doodle-promo',
    schema: doodlePromoSchema,
    defaults: doodlePromoDefaults,
    meta: doodlePromoMeta,
  },
];
