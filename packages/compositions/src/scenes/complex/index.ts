import type { SceneModule } from '../../scene-module';
import { mosaicRevealScene } from './mosaic-reveal';
import { notificationStackScene } from './notification-stack';

export const complexScenes: SceneModule[] = [notificationStackScene, mosaicRevealScene];
