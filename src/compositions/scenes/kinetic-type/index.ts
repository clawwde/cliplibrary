import type { SceneModule } from '../../scene-module';
import { echoStackScene } from './echo-stack';
import { gridStackScene } from './grid-stack';
import { lensOrbitScene } from './lens-orbit';
import { outlineMarqueeScene } from './outline-marquee';
import { stickerStackScene } from './sticker-stack';
import { wordBuildScene } from './word-build';
import { wordFieldScene } from './word-field';
import { wordPunchScene } from './word-punch';

export const kineticTypeScenes: SceneModule[] = [
  wordBuildScene,
  wordPunchScene,
  outlineMarqueeScene,
  echoStackScene,
  gridStackScene,
  lensOrbitScene,
  wordFieldScene,
  stickerStackScene,
];
