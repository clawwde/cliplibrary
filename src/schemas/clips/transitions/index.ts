import type { ClipModule } from '../../registry';
import {
  sceneTransitionDefaults,
  sceneTransitionMeta,
  sceneTransitionSchema,
} from './scene-transition';

export const transitionsClips: ClipModule[] = [
  {
    id: 'scene-transition',
    schema: sceneTransitionSchema,
    defaults: sceneTransitionDefaults,
    meta: sceneTransitionMeta,
  },
];
