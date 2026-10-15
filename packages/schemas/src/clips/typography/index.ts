import type { ClipModule } from '../../registry';
import { detailListDefaults, detailListMeta, detailListSchema } from './detail-list';
import { echoStackDefaults, echoStackMeta, echoStackSchema } from './echo-stack';
import {
  featureCalloutsDefaults,
  featureCalloutsMeta,
  featureCalloutsSchema,
} from './feature-callouts';
import {
  handwrittenNoteDefaults,
  handwrittenNoteMeta,
  handwrittenNoteSchema,
} from './handwritten-note';
import {
  headlineRevealDefaults,
  headlineRevealMeta,
  headlineRevealSchema,
} from './headline-reveal';
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
    id: 'detail-list',
    schema: detailListSchema,
    defaults: detailListDefaults,
    meta: detailListMeta,
  },
  {
    id: 'feature-callouts',
    schema: featureCalloutsSchema,
    defaults: featureCalloutsDefaults,
    meta: featureCalloutsMeta,
  },
  {
    id: 'headline-reveal',
    schema: headlineRevealSchema,
    defaults: headlineRevealDefaults,
    meta: headlineRevealMeta,
  },
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
