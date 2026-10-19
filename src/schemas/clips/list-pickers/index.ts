import type { ClipModule } from '../../registry';
import { colorPillsDefaults, colorPillsMeta, colorPillsSchema } from './color-pills';
import { headingListDefaults, headingListMeta, headingListSchema } from './heading-list';
import { menuStackDefaults, menuStackMeta, menuStackSchema } from './menu-stack';
import { mindMapDefaults, mindMapMeta, mindMapSchema } from './mind-map';
import { pillFanDefaults, pillFanMeta, pillFanSchema } from './pill-fan';
import { skillWheelDefaults, skillWheelMeta, skillWheelSchema } from './skill-wheel';
import { wordPickerDefaults, wordPickerMeta, wordPickerSchema } from './word-picker';
import { yearDialDefaults, yearDialMeta, yearDialSchema } from './year-dial';

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
  {
    id: 'year-dial',
    schema: yearDialSchema,
    defaults: yearDialDefaults,
    meta: yearDialMeta,
  },
  {
    id: 'mind-map',
    schema: mindMapSchema,
    defaults: mindMapDefaults,
    meta: mindMapMeta,
  },
  {
    id: 'color-pills',
    schema: colorPillsSchema,
    defaults: colorPillsDefaults,
    meta: colorPillsMeta,
  },
  {
    id: 'skill-wheel',
    schema: skillWheelSchema,
    defaults: skillWheelDefaults,
    meta: skillWheelMeta,
  },
];
