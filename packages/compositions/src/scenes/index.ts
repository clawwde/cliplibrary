import type { SceneModule } from '../scene-module';
import { complexScenes } from './complex';
import { dataScenes } from './data';
import { mediaScenes } from './media';
import { promoScenes } from './promo';
import { textScenes } from './text';

export const CLIP_SCENES: SceneModule[] = [
  ...textScenes,
  ...dataScenes,
  ...mediaScenes,
  ...complexScenes,
  ...promoScenes,
];
