import type { ClipModule } from '../../registry';
import {
  reliefBackdropDefaults,
  reliefBackdropMeta,
  reliefBackdropSchema,
} from './relief-backdrop';

export const backgroundsClips: ClipModule[] = [
  {
    id: 'relief-backdrop',
    schema: reliefBackdropSchema,
    defaults: reliefBackdropDefaults,
    meta: reliefBackdropMeta,
  },
];
