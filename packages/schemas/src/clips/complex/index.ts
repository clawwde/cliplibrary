import type { ClipModule } from '../../registry';
import {
  notificationStackDefaults,
  notificationStackMeta,
  notificationStackSchema,
} from './notification-stack';

export const complexClips: ClipModule[] = [
  {
    id: 'notification-stack',
    schema: notificationStackSchema,
    defaults: notificationStackDefaults,
    meta: notificationStackMeta,
  },
];
