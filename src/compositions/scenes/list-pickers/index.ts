import type { SceneModule } from '../../scene-module';
import { colorPillsScene } from './color-pills';
import { headingListScene } from './heading-list';
import { menuStackScene } from './menu-stack';
import { mindMapScene } from './mind-map';
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
  mindMapScene,
  colorPillsScene,
  skillWheelScene,
];
