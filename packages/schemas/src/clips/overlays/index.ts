import type { ClipModule } from '../../registry';
import { doodleArrowsDefaults, doodleArrowsMeta, doodleArrowsSchema } from './doodle-arrows';
import { filmDustDefaults, filmDustMeta, filmDustSchema } from './film-dust';
import { floatingCardsDefaults, floatingCardsMeta, floatingCardsSchema } from './floating-cards';

export const overlaysClips: ClipModule[] = [
  {
    id: 'floating-cards',
    schema: floatingCardsSchema,
    defaults: floatingCardsDefaults,
    meta: floatingCardsMeta,
  },
  {
    id: 'doodle-arrows',
    schema: doodleArrowsSchema,
    defaults: doodleArrowsDefaults,
    meta: doodleArrowsMeta,
  },
  { id: 'film-dust', schema: filmDustSchema, defaults: filmDustDefaults, meta: filmDustMeta },
];
