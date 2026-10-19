import type { ClipModule } from '../../registry';
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
];
