import type { ClipModule } from '../../registry';
import { appPromoDefaults, appPromoMeta, appPromoSchema } from './app-promo';
import { promoDuoDefaults, promoDuoMeta, promoDuoSchema } from './promo-duo';
import { promoFeaturesDefaults, promoFeaturesMeta, promoFeaturesSchema } from './promo-features';
import { promoFlipDefaults, promoFlipMeta, promoFlipSchema } from './promo-flip';
import { promoHeroDefaults, promoHeroMeta, promoHeroSchema } from './promo-hero';
import { promoIntroDefaults, promoIntroMeta, promoIntroSchema } from './promo-intro';
import { promoOutroDefaults, promoOutroMeta, promoOutroSchema } from './promo-outro';
import { promoScrollDefaults, promoScrollMeta, promoScrollSchema } from './promo-scroll';
import { promoTrioDefaults, promoTrioMeta, promoTrioSchema } from './promo-trio';
import { promoWallDefaults, promoWallMeta, promoWallSchema } from './promo-wall';

export const promoClips: ClipModule[] = [
  { id: 'app-promo', schema: appPromoSchema, defaults: appPromoDefaults, meta: appPromoMeta },
  {
    id: 'promo-intro',
    schema: promoIntroSchema,
    defaults: promoIntroDefaults,
    meta: promoIntroMeta,
  },
  { id: 'promo-hero', schema: promoHeroSchema, defaults: promoHeroDefaults, meta: promoHeroMeta },
  { id: 'promo-flip', schema: promoFlipSchema, defaults: promoFlipDefaults, meta: promoFlipMeta },
  { id: 'promo-trio', schema: promoTrioSchema, defaults: promoTrioDefaults, meta: promoTrioMeta },
  {
    id: 'promo-features',
    schema: promoFeaturesSchema,
    defaults: promoFeaturesDefaults,
    meta: promoFeaturesMeta,
  },
  {
    id: 'promo-scroll',
    schema: promoScrollSchema,
    defaults: promoScrollDefaults,
    meta: promoScrollMeta,
  },
  { id: 'promo-wall', schema: promoWallSchema, defaults: promoWallDefaults, meta: promoWallMeta },
  { id: 'promo-duo', schema: promoDuoSchema, defaults: promoDuoDefaults, meta: promoDuoMeta },
  {
    id: 'promo-outro',
    schema: promoOutroSchema,
    defaults: promoOutroDefaults,
    meta: promoOutroMeta,
  },
];
