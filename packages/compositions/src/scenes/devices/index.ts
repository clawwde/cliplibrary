import type { SceneModule } from '../../scene-module';
import { promoDuoScene } from './promo-duo';
import { promoFeaturesScene } from './promo-features';
import { promoFlipScene } from './promo-flip';
import { promoHeroScene } from './promo-hero';
import { promoScrollScene } from './promo-scroll';
import { promoTrioScene } from './promo-trio';
import { promoWallScene } from './promo-wall';

export const devicesScenes: SceneModule[] = [
  promoHeroScene,
  promoFlipScene,
  promoTrioScene,
  promoFeaturesScene,
  promoScrollScene,
  promoWallScene,
  promoDuoScene,
];
