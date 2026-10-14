import type { SceneModule } from '../../scene-module';
import { appPromoScene } from './app-promo';
import { productDemoScene } from './product-demo';

export const sequencesScenes: SceneModule[] = [productDemoScene, appPromoScene];
