import type { ClipModule } from '../../registry';
import { appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import { productDemoDefaults, productDemoMeta, productDemoSchema } from './product-demo';

export const sequencesClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
  {
    id: 'product-demo',
    schema: productDemoSchema,
    defaults: productDemoDefaults,
    meta: productDemoMeta,
  },
];
