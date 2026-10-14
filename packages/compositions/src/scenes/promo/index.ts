import type { SceneModule } from '../../scene-module';
import { appPromoScene } from './app-promo';
import { promoDuoScene } from './promo-duo';
import { promoFeaturesScene } from './promo-features';
import { promoFlipScene } from './promo-flip';
import { promoHeroScene } from './promo-hero';
import { promoIntroScene } from './promo-intro';
import { promoOutroScene } from './promo-outro';
import { promoScrollScene } from './promo-scroll';
import { promoTrioScene } from './promo-trio';
import { promoWallScene } from './promo-wall';

export const promoScenes: SceneModule[] = [
  appPromoScene,
  promoIntroScene,
  promoHeroScene,
  promoFlipScene,
  promoTrioScene,
  promoFeaturesScene,
  promoScrollScene,
  promoWallScene,
  promoDuoScene,
  promoOutroScene,
];
