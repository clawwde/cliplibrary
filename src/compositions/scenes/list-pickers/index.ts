import type { SceneModule } from '../../scene-module';
import { headingListScene } from './heading-list';
import { wordPickerScene } from './word-picker';

export const listPickersScenes: SceneModule[] = [wordPickerScene, headingListScene];
