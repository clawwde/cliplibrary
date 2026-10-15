import type { ClipModule } from '../../registry';
import {
  reliefBackdropDefaults,
  reliefBackdropMeta,
  reliefBackdropSchema,
} from './relief-backdrop';
import {
  studioBackdropDefaults,
  studioBackdropMeta,
  studioBackdropSchema,
} from './studio-backdrop';

export const backgroundsClips: ClipModule[] = [
  {
    id: 'relief-backdrop',
    schema: reliefBackdropSchema,
    defaults: reliefBackdropDefaults,
    meta: reliefBackdropMeta,
  },
  {
    id: 'studio-backdrop',
    schema: studioBackdropSchema,
    defaults: studioBackdropDefaults,
    meta: studioBackdropMeta,
  },
];
