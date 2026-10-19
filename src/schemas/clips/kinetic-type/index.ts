import type { ClipModule } from '../../registry';
import { echoStackDefaults, echoStackMeta, echoStackSchema } from './echo-stack';
import {
  outlineMarqueeDefaults,
  outlineMarqueeMeta,
  outlineMarqueeSchema,
} from './outline-marquee';
import { wordBuildDefaults, wordBuildMeta, wordBuildSchema } from './word-build';
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
];
