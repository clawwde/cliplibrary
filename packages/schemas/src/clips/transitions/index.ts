import type { ClipModule } from '../../registry';
import { mosaicRevealDefaults, mosaicRevealMeta, mosaicRevealSchema } from './mosaic-reveal';

export const transitionsClips: ClipModule[] = [
  {
    id: 'mosaic-reveal',
    schema: mosaicRevealSchema,
    defaults: mosaicRevealDefaults,
    meta: mosaicRevealMeta,
  },
];
