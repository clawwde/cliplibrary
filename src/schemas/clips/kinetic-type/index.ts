import type { ClipModule } from '../../registry';
import { echoStackDefaults, echoStackMeta, echoStackSchema } from './echo-stack';
import { gridStackDefaults, gridStackMeta, gridStackSchema } from './grid-stack';
import { lensOrbitDefaults, lensOrbitMeta, lensOrbitSchema } from './lens-orbit';
import {
  outlineMarqueeDefaults,
  outlineMarqueeMeta,
  outlineMarqueeSchema,
} from './outline-marquee';
import { wordBuildDefaults, wordBuildMeta, wordBuildSchema } from './word-build';
import { wordFieldDefaults, wordFieldMeta, wordFieldSchema } from './word-field';
import { wordPunchDefaults, wordPunchMeta, wordPunchSchema } from './word-punch';

export const kineticTypeClips: ClipModule[] = [
  { id: 'word-build', schema: wordBuildSchema, defaults: wordBuildDefaults, meta: wordBuildMeta },
  { id: 'word-punch', schema: wordPunchSchema, defaults: wordPunchDefaults, meta: wordPunchMeta },
  {
    id: 'outline-marquee',
    schema: outlineMarqueeSchema,
    defaults: outlineMarqueeDefaults,
    meta: outlineMarqueeMeta,
  },
  { id: 'echo-stack', schema: echoStackSchema, defaults: echoStackDefaults, meta: echoStackMeta },
  { id: 'grid-stack', schema: gridStackSchema, defaults: gridStackDefaults, meta: gridStackMeta },
  { id: 'lens-orbit', schema: lensOrbitSchema, defaults: lensOrbitDefaults, meta: lensOrbitMeta },
  { id: 'word-field', schema: wordFieldSchema, defaults: wordFieldDefaults, meta: wordFieldMeta },
];
