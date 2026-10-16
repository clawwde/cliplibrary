import type { ClipModule } from '../../registry';
import { echoStackDefaults, echoStackMeta, echoStackSchema } from './echo-stack';
import {
  handwrittenNoteDefaults,
  handwrittenNoteMeta,
  handwrittenNoteSchema,
} from './handwritten-note';
import { letterFlipDefaults, letterFlipMeta, letterFlipSchema } from './letter-flip';
import { numberCounterDefaults, numberCounterMeta, numberCounterSchema } from './number-counter';
import {
  outlineMarqueeDefaults,
  outlineMarqueeMeta,
  outlineMarqueeSchema,
} from './outline-marquee';
import {
  scribbleCaptionDefaults,
  scribbleCaptionMeta,
  scribbleCaptionSchema,
} from './scribble-caption';
import { typewriterDefaults, typewriterMeta, typewriterSchema } from './typewriter';
import { wordBuildDefaults, wordBuildMeta, wordBuildSchema } from './word-build';
import { wordPunchDefaults, wordPunchMeta, wordPunchSchema } from './word-punch';

export const typographyClips: ClipModule[] = [
  {
    id: 'handwritten-note',
    schema: handwrittenNoteSchema,
    defaults: handwrittenNoteDefaults,
    meta: handwrittenNoteMeta,
  },
  {
    id: 'number-counter',
    schema: numberCounterSchema,
    defaults: numberCounterDefaults,
    meta: numberCounterMeta,
  },
  {
    id: 'typewriter',
    schema: typewriterSchema,
    defaults: typewriterDefaults,
    meta: typewriterMeta,
  },
  { id: 'word-build', schema: wordBuildSchema, defaults: wordBuildDefaults, meta: wordBuildMeta },
  { id: 'word-punch', schema: wordPunchSchema, defaults: wordPunchDefaults, meta: wordPunchMeta },
  {
    id: 'scribble-caption',
    schema: scribbleCaptionSchema,
    defaults: scribbleCaptionDefaults,
    meta: scribbleCaptionMeta,
  },
  { id: 'echo-stack', schema: echoStackSchema, defaults: echoStackDefaults, meta: echoStackMeta },
  {
    id: 'outline-marquee',
    schema: outlineMarqueeSchema,
    defaults: outlineMarqueeDefaults,
    meta: outlineMarqueeMeta,
  },
  {
    id: 'letter-flip',
    schema: letterFlipSchema,
    defaults: letterFlipDefaults,
    meta: letterFlipMeta,
  },
];
