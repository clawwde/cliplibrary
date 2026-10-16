import type { SceneModule } from '../../scene-module';
import { appIconRevealScene } from './app-icon-reveal';
import { brandRevealScene } from './brand-reveal';
import { ctaEndCardScene } from './cta-end-card';

export const brandScenes: SceneModule[] = [brandRevealScene, appIconRevealScene, ctaEndCardScene];
