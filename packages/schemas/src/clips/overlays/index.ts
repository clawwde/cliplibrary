import type { ClipModule } from '../../registry';
import { floatingCardsDefaults, floatingCardsMeta, floatingCardsSchema } from './floating-cards';

export const overlaysClips: ClipModule[] = [
  {
    id: 'floating-cards',
    schema: floatingCardsSchema,
    defaults: floatingCardsDefaults,
    meta: floatingCardsMeta,
  },
];
