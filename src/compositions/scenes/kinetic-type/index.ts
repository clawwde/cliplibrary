import type { SceneModule } from '../../scene-module';
import { chunkyTypeStackScene } from './chunky-type-stack';
import { echoStackScene } from './echo-stack';
import { gridStackScene } from './grid-stack';
import { hangingWordsScene } from './hanging-words';
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
  hangingWordsScene,
  lensOrbitScene,
  wordFieldScene,
  stickerStackScene,
  chunkyTypeStackScene,
];
