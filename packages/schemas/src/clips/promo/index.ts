import type { ClipModule } from '../../registry';
import { promoFlipDefaults, promoFlipMeta, promoFlipSchema } from './promo-flip';
import { promoHeroDefaults, promoHeroMeta, promoHeroSchema } from './promo-hero';
import { promoIntroDefaults, promoIntroMeta, promoIntroSchema } from './promo-intro';

export const promoClips: ClipModule[] = [
  {
    id: 'promo-intro',
    schema: promoIntroSchema,
    defaults: promoIntroDefaults,
    meta: promoIntroMeta,
  },
  { id: 'promo-hero', schema: promoHeroSchema, defaults: promoHeroDefaults, meta: promoHeroMeta },
  { id: 'promo-flip', schema: promoFlipSchema, defaults: promoFlipDefaults, meta: promoFlipMeta },
];
