import type { SceneModule } from '../../scene-module';
import { anniversaryKineticScene } from './anniversary-kinetic';
import { brandingIsTickerScene } from './branding-is-ticker';
import { chunkyTypeStackScene } from './chunky-type-stack';
import { comingSoonFlipsScene } from './coming-soon-flips';
import { dominoWordsScene } from './domino-words';
import { echoStackScene } from './echo-stack';
import { gridStackScene } from './grid-stack';
import { hangingWordsScene } from './hanging-words';
import { lensOrbitScene } from './lens-orbit';
import { outlineMarqueeScene } from './outline-marquee';
import { ribbonWordsScene } from './ribbon-words';
import { scrollerCalloutScene } from './scroller-callout';
import { scrollerWallScene } from './scroller-wall';
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
  brandingIsTickerScene,
  dominoWordsScene,
  scrollerCalloutScene,
  scrollerWallScene,
  ribbonWordsScene,
  anniversaryKineticScene,
  comingSoonFlipsScene,
];
