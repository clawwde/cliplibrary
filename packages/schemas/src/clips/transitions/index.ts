import type { ClipModule } from '../../registry';
import { mosaicRevealDefaults, mosaicRevealMeta, mosaicRevealSchema } from './mosaic-reveal';
import {
  sceneTransitionDefaults,
  sceneTransitionMeta,
  sceneTransitionSchema,
} from './scene-transition';

export const transitionsClips: ClipModule[] = [
  {
    id: 'mosaic-reveal',
    schema: mosaicRevealSchema,
    defaults: mosaicRevealDefaults,
    meta: mosaicRevealMeta,
  },
  {
    id: 'scene-transition',
    schema: sceneTransitionSchema,
    defaults: sceneTransitionDefaults,
    meta: sceneTransitionMeta,
  },
];
