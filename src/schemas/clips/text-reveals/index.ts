import type { ClipModule } from '../../registry';
import {
  goingLiveTeaserDefaults,
  goingLiveTeaserMeta,
  goingLiveTeaserSchema,
} from './going-live-teaser';
import { letterFlipDefaults, letterFlipMeta, letterFlipSchema } from './letter-flip';
import {
  magnifierCaptionDefaults,
  magnifierCaptionMeta,
  magnifierCaptionSchema,
} from './magnifier-caption';
import {
  neonSignFlickerDefaults,
  neonSignFlickerMeta,
  neonSignFlickerSchema,
} from './neon-sign-flicker';
import { numberCounterDefaults, numberCounterMeta, numberCounterSchema } from './number-counter';
import { printerPagesDefaults, printerPagesMeta, printerPagesSchema } from './printer-pages';
import { typewriterDefaults, typewriterMeta, typewriterSchema } from './typewriter';

export const textRevealsClips: ClipModule[] = [
  {
    id: 'typewriter',
    schema: typewriterSchema,
    defaults: typewriterDefaults,
    meta: typewriterMeta,
  },
  {
    id: 'letter-flip',
    schema: letterFlipSchema,
    defaults: letterFlipDefaults,
    meta: letterFlipMeta,
  },
  {
    id: 'number-counter',
    schema: numberCounterSchema,
    defaults: numberCounterDefaults,
    meta: numberCounterMeta,
  },
  {
    id: 'printer-pages',
    schema: printerPagesSchema,
    defaults: printerPagesDefaults,
    meta: printerPagesMeta,
  },
  {
    id: 'magnifier-caption',
    schema: magnifierCaptionSchema,
    defaults: magnifierCaptionDefaults,
    meta: magnifierCaptionMeta,
  },
  {
    id: 'neon-sign-flicker',
    schema: neonSignFlickerSchema,
    defaults: neonSignFlickerDefaults,
    meta: neonSignFlickerMeta,
  },
  {
    id: 'going-live-teaser',
    schema: goingLiveTeaserSchema,
    defaults: goingLiveTeaserDefaults,
    meta: goingLiveTeaserMeta,
  },
];
