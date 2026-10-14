import type { ClipModule } from '../../registry';
import {
  studioBackdropDefaults,
  studioBackdropMeta,
  studioBackdropSchema,
} from './studio-backdrop';

export const backgroundsClips: ClipModule[] = [
  {
    id: 'studio-backdrop',
    schema: studioBackdropSchema,
    defaults: studioBackdropDefaults,
    meta: studioBackdropMeta,
  },
];
