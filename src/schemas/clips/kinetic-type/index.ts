import type { ClipModule } from '../../registry';
import {
  brandingIsTickerDefaults,
  brandingIsTickerMeta,
  brandingIsTickerSchema,
} from './branding-is-ticker';
import {
  chunkyTypeStackDefaults,
  chunkyTypeStackMeta,
  chunkyTypeStackSchema,
} from './chunky-type-stack';
import { dominoWordsDefaults, dominoWordsMeta, dominoWordsSchema } from './domino-words';
import { echoStackDefaults, echoStackMeta, echoStackSchema } from './echo-stack';
import { gridStackDefaults, gridStackMeta, gridStackSchema } from './grid-stack';
import { lensOrbitDefaults, lensOrbitMeta, lensOrbitSchema } from './lens-orbit';
import {
  outlineMarqueeDefaults,
  outlineMarqueeMeta,
  outlineMarqueeSchema,
} from './outline-marquee';
import {
  scrollerCalloutDefaults,
  scrollerCalloutMeta,
  scrollerCalloutSchema,
} from './scroller-callout';
import { stickerStackDefaults, stickerStackMeta, stickerStackSchema } from './sticker-stack';
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
  {
    id: 'sticker-stack',
    schema: stickerStackSchema,
    defaults: stickerStackDefaults,
    meta: stickerStackMeta,
  },
  {
    id: 'chunky-type-stack',
    schema: chunkyTypeStackSchema,
    defaults: chunkyTypeStackDefaults,
    meta: chunkyTypeStackMeta,
  },
  {
    id: 'branding-is-ticker',
    schema: brandingIsTickerSchema,
    defaults: brandingIsTickerDefaults,
    meta: brandingIsTickerMeta,
  },
  {
    id: 'domino-words',
    schema: dominoWordsSchema,
    defaults: dominoWordsDefaults,
    meta: dominoWordsMeta,
  },
  {
    id: 'scroller-callout',
    schema: scrollerCalloutSchema,
    defaults: scrollerCalloutDefaults,
    meta: scrollerCalloutMeta,
  },
];
