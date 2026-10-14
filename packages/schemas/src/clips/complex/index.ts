import type { ClipModule } from '../../registry';
import { mosaicRevealDefaults, mosaicRevealMeta, mosaicRevealSchema } from './mosaic-reveal';
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
  {
    id: 'mosaic-reveal',
    schema: mosaicRevealSchema,
    defaults: mosaicRevealDefaults,
    meta: mosaicRevealMeta,
  },
];
