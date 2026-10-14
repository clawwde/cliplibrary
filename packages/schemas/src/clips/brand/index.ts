import type { ClipModule } from '../../registry';
import { promoIntroDefaults, promoIntroMeta, promoIntroSchema } from './promo-intro';
import { promoOutroDefaults, promoOutroMeta, promoOutroSchema } from './promo-outro';

export const brandClips: ClipModule[] = [
  {
    id: 'promo-intro',
    schema: promoIntroSchema,
    defaults: promoIntroDefaults,
    meta: promoIntroMeta,
  },
  {
    id: 'promo-outro',
    schema: promoOutroSchema,
    defaults: promoOutroDefaults,
    meta: promoOutroMeta,
  },
];
