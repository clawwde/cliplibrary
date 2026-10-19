import type { ClipModule } from '../../registry';
import { filmDustDefaults, filmDustMeta, filmDustSchema } from './film-dust';
import { floatingCardsDefaults, floatingCardsMeta, floatingCardsSchema } from './floating-cards';

export const overlaysClips: ClipModule[] = [
  {
    id: 'floating-cards',
    schema: floatingCardsSchema,
    defaults: floatingCardsDefaults,
    meta: floatingCardsMeta,
  },
  { id: 'film-dust', schema: filmDustSchema, defaults: filmDustDefaults, meta: filmDustMeta },
];
