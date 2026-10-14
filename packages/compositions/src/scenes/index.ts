import type { SceneModule } from '../scene-module';
import { brandScenes } from './brand';
import { dataScenes } from './data';
import { devicesScenes } from './devices';
import { mediaScenes } from './media';
import { overlaysScenes } from './overlays';
import { sequencesScenes } from './sequences';
import { transitionsScenes } from './transitions';
import { typographyScenes } from './typography';

export const CLIP_SCENES: SceneModule[] = [
  ...typographyScenes,
  ...dataScenes,
  ...mediaScenes,
  ...devicesScenes,
  ...overlaysScenes,
  ...brandScenes,
  ...transitionsScenes,
  ...sequencesScenes,
];
