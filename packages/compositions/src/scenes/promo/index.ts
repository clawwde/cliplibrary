import type { SceneModule } from '../../scene-module';
import { promoFlipScene } from './promo-flip';
import { promoHeroScene } from './promo-hero';
import { promoIntroScene } from './promo-intro';

export const promoScenes: SceneModule[] = [promoIntroScene, promoHeroScene, promoFlipScene];
