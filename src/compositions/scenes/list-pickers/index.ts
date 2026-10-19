import type { SceneModule } from '../../scene-module';
import { headingListScene } from './heading-list';
import { menuStackScene } from './menu-stack';
import { pillFanScene } from './pill-fan';
import { wordPickerScene } from './word-picker';

export const listPickersScenes: SceneModule[] = [
  wordPickerScene,
  pillFanScene,
  menuStackScene,
  headingListScene,
];
