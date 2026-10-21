import type { ClipModule } from '../../registry';
import { filmDustDefaults, filmDustMeta, filmDustSchema } from './film-dust';
import { floatingCardsDefaults, floatingCardsMeta, floatingCardsSchema } from './floating-cards';
import {
  spiderWebServicesDefaults,
  spiderWebServicesMeta,
  spiderWebServicesSchema,
} from './spider-web-services';

export const overlaysClips: ClipModule[] = [
  {
    id: 'floating-cards',
    schema: floatingCardsSchema,
    defaults: floatingCardsDefaults,
    meta: floatingCardsMeta,
  },
  { id: 'film-dust', schema: filmDustSchema, defaults: filmDustDefaults, meta: filmDustMeta },
  {
    id: 'spider-web-services',
    schema: spiderWebServicesSchema,
    defaults: spiderWebServicesDefaults,
    meta: spiderWebServicesMeta,
  },
];
