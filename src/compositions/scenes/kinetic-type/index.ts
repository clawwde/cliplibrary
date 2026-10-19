import type { SceneModule } from '../../scene-module';
import { echoStackScene } from './echo-stack';
import { outlineMarqueeScene } from './outline-marquee';
import { wordBuildScene } from './word-build';
import { wordPunchScene } from './word-punch';

export const kineticTypeScenes: SceneModule[] = [
  wordBuildScene,
  wordPunchScene,
  outlineMarqueeScene,
  echoStackScene,
];
