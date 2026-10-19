import type { SceneModule } from '../scene-module';
import { backgroundsScenes } from './backgrounds';
import { brandScenes } from './brand';
import { handDrawnScenes } from './hand-drawn';
import { kineticTypeScenes } from './kinetic-type';
import { overlaysScenes } from './overlays';
import { phoneLayoutsScenes } from './phone-layouts';
import { phoneRevealsScenes } from './phone-reveals';
import { screenDemosScenes } from './screen-demos';
import { textRevealsScenes } from './text-reveals';
import { transitionsScenes } from './transitions';

export const CLIP_SCENES: SceneModule[] = [
  ...kineticTypeScenes,
  ...textRevealsScenes,
  ...handDrawnScenes,
  ...phoneRevealsScenes,
  ...phoneLayoutsScenes,
  ...screenDemosScenes,
  ...overlaysScenes,
  ...brandScenes,
  ...backgroundsScenes,
  ...transitionsScenes,
];
