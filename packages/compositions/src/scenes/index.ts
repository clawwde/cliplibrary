import type { SceneModule } from '../scene-module';
import { backgroundsScenes } from './backgrounds';
import { brandScenes } from './brand';
import { devicesScenes } from './devices';
import { overlaysScenes } from './overlays';
import { sequencesScenes } from './sequences';
import { transitionsScenes } from './transitions';
import { typographyScenes } from './typography';

export const CLIP_SCENES: SceneModule[] = [
  ...typographyScenes,
  ...devicesScenes,
  ...overlaysScenes,
  ...brandScenes,
  ...backgroundsScenes,
  ...transitionsScenes,
  ...sequencesScenes,
];
