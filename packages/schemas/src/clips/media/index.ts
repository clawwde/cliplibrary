import type { ClipModule } from '../../registry';
import { imageShowcaseDefaults, imageShowcaseMeta, imageShowcaseSchema } from './image-showcase';

export const mediaClips: ClipModule[] = [
  {
    id: 'image-showcase',
    schema: imageShowcaseSchema,
    defaults: imageShowcaseDefaults,
    meta: imageShowcaseMeta,
  },
];
