import type { SceneModule } from '../../scene-module';
import { appPromoScene } from './app-promo';
import { scooterPromoScene } from './scooter-promo';

export const sequencesScenes: SceneModule[] = [scooterPromoScene, appPromoScene];
