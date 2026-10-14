import type { ClipModule } from '../../registry';
import { floatingCardsDefaults, floatingCardsMeta, floatingCardsSchema } from './floating-cards';
import {
  notificationStackDefaults,
  notificationStackMeta,
  notificationStackSchema,
} from './notification-stack';

export const overlaysClips: ClipModule[] = [
  {
    id: 'floating-cards',
    schema: floatingCardsSchema,
    defaults: floatingCardsDefaults,
    meta: floatingCardsMeta,
  },
  {
    id: 'notification-stack',
    schema: notificationStackSchema,
    defaults: notificationStackDefaults,
    meta: notificationStackMeta,
  },
];
