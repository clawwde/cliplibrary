import type { ClipModule } from '../../registry';
import { headingListDefaults, headingListMeta, headingListSchema } from './heading-list';
import { wordPickerDefaults, wordPickerMeta, wordPickerSchema } from './word-picker';

export const listPickersClips: ClipModule[] = [
  {
    id: 'word-picker',
    schema: wordPickerSchema,
    defaults: wordPickerDefaults,
    meta: wordPickerMeta,
  },
  {
    id: 'heading-list',
    schema: headingListSchema,
    defaults: headingListDefaults,
    meta: headingListMeta,
  },
];
