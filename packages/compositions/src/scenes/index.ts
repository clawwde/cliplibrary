import type { SceneModule } from '../scene-module';
import { complexScenes } from './complex';
import { dataScenes } from './data';
import { mediaScenes } from './media';
import { simpleScenes } from './simple';
import { textScenes } from './text';

export const CLIP_SCENES: SceneModule[] = [
  ...simpleScenes,
  ...textScenes,
  ...dataScenes,
  ...mediaScenes,
  ...complexScenes,
];
