import type { ClipModule } from '../../registry';
import { headingListDefaults, headingListMeta, headingListSchema } from './heading-list';
import { menuStackDefaults, menuStackMeta, menuStackSchema } from './menu-stack';
import { pillFanDefaults, pillFanMeta, pillFanSchema } from './pill-fan';
import { wordPickerDefaults, wordPickerMeta, wordPickerSchema } from './word-picker';

export const listPickersClips: ClipModule[] = [
  {
    id: 'word-picker',
    schema: wordPickerSchema,
    defaults: wordPickerDefaults,
    meta: wordPickerMeta,
  },
  {
    id: 'pill-fan',
    schema: pillFanSchema,
    defaults: pillFanDefaults,
    meta: pillFanMeta,
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
