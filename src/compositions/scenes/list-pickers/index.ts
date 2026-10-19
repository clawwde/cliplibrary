import type { SceneModule } from '../../scene-module';
import { headingListScene } from './heading-list';
import { menuStackScene } from './menu-stack';
import { wordPickerScene } from './word-picker';

export const listPickersScenes: SceneModule[] = [wordPickerScene, menuStackScene, headingListScene];
