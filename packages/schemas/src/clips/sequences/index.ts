import type { ClipModule } from '../../registry';
import { appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import { scooterPromoDefaults, scooterPromoMeta, scooterPromoSchema } from './scooter-promo';

export const sequencesClips: ClipModule[] = [
  {
    id: 'scooter-promo',
    schema: scooterPromoSchema,
    defaults: scooterPromoDefaults,
    meta: scooterPromoMeta,
  },
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
];
