import type { ClipModule } from '../../registry';
import {
  laptopWipeRevealDefaults,
  laptopWipeRevealMeta,
  laptopWipeRevealSchema,
} from './laptop-wipe-reveal';
import {
  websiteFoundSpotlightDefaults,
  websiteFoundSpotlightMeta,
  websiteFoundSpotlightSchema,
} from './website-found-spotlight';

export const deskScenesClips: ClipModule[] = [
  {
    id: 'laptop-wipe-reveal',
    schema: laptopWipeRevealSchema,
    defaults: laptopWipeRevealDefaults,
    meta: laptopWipeRevealMeta,
  },
  {
    id: 'website-found-spotlight',
    schema: websiteFoundSpotlightSchema,
    defaults: websiteFoundSpotlightDefaults,
    meta: websiteFoundSpotlightMeta,
  },
];
