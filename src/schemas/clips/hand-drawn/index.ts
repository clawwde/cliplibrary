import type { ClipModule } from '../../registry';
import { chalkBadgeDefaults, chalkBadgeMeta, chalkBadgeSchema } from './chalk-badge';
import {
  chalkBadgeGridDefaults,
  chalkBadgeGridMeta,
  chalkBadgeGridSchema,
} from './chalk-badge-grid';
import {
  chalkBadgesReelDefaults,
  chalkBadgesReelMeta,
  chalkBadgesReelSchema,
} from './chalk-badges-reel';
import { chalkTitleDefaults, chalkTitleMeta, chalkTitleSchema } from './chalk-title';
import { doodleArrowsDefaults, doodleArrowsMeta, doodleArrowsSchema } from './doodle-arrows';
import {
  handwrittenNoteDefaults,
  handwrittenNoteMeta,
  handwrittenNoteSchema,
} from './handwritten-note';
import {
  scribbleCaptionDefaults,
  scribbleCaptionMeta,
  scribbleCaptionSchema,
} from './scribble-caption';

export const handDrawnClips: ClipModule[] = [
  {
    id: 'handwritten-note',
    schema: handwrittenNoteSchema,
    defaults: handwrittenNoteDefaults,
    meta: handwrittenNoteMeta,
  },
  {
    id: 'scribble-caption',
    schema: scribbleCaptionSchema,
    defaults: scribbleCaptionDefaults,
    meta: scribbleCaptionMeta,
  },
  {
    id: 'doodle-arrows',
    schema: doodleArrowsSchema,
    defaults: doodleArrowsDefaults,
    meta: doodleArrowsMeta,
  },
  {
    id: 'chalk-badge',
    schema: chalkBadgeSchema,
    defaults: chalkBadgeDefaults,
    meta: chalkBadgeMeta,
  },
  {
    id: 'chalk-badge-grid',
    schema: chalkBadgeGridSchema,
    defaults: chalkBadgeGridDefaults,
    meta: chalkBadgeGridMeta,
  },
  {
    id: 'chalk-title',
    schema: chalkTitleSchema,
    defaults: chalkTitleDefaults,
    meta: chalkTitleMeta,
  },
  {
    id: 'chalk-badges-reel',
    schema: chalkBadgesReelSchema,
    defaults: chalkBadgesReelDefaults,
    meta: chalkBadgesReelMeta,
  },
];
