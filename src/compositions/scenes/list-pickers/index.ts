import type { SceneModule } from '../../scene-module';
import { headingListScene } from './heading-list';
import { menuStackScene } from './menu-stack';
import { pillFanScene } from './pill-fan';
import { skillWheelScene } from './skill-wheel';
import { wordPickerScene } from './word-picker';
import { yearDialScene } from './year-dial';

export const listPickersScenes: SceneModule[] = [
  wordPickerScene,
  pillFanScene,
  menuStackScene,
  headingListScene,
  yearDialScene,
  skillWheelScene,
];
