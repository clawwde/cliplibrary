import type { ClipModule } from '../../registry';
import { headingListDefaults, headingListMeta, headingListSchema } from './heading-list';
import { menuStackDefaults, menuStackMeta, menuStackSchema } from './menu-stack';
import { wordPickerDefaults, wordPickerMeta, wordPickerSchema } from './word-picker';

export const listPickersClips: ClipModule[] = [
  {
    id: 'word-picker',
    schema: wordPickerSchema,
    defaults: wordPickerDefaults,
    meta: wordPickerMeta,
  },
  {
    id: 'menu-stack',
    schema: menuStackSchema,
    defaults: menuStackDefaults,
    meta: menuStackMeta,
  },
  {
    id: 'heading-list',
    schema: headingListSchema,
    defaults: headingListDefaults,
    meta: headingListMeta,
  },
];
