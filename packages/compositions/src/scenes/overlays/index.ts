import type { SceneModule } from '../../scene-module';
import { doodleArrowsScene } from './doodle-arrows';
import { filmDustScene } from './film-dust';
import { floatingCardsScene } from './floating-cards';
import { splitGridScene } from './split-grid';

export const overlaysScenes: SceneModule[] = [
  floatingCardsScene,
  doodleArrowsScene,
  splitGridScene,
  filmDustScene,
];
