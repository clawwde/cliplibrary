import type { SceneModule } from '../../scene-module';
import { floatingCardsScene } from './floating-cards';
import { notificationStackScene } from './notification-stack';

export const overlaysScenes: SceneModule[] = [floatingCardsScene, notificationStackScene];
