import type { PosterPack } from '../pack';
import { CAROUSEL_PACKS } from './carousels';
import { SOCIAL_POST_PACKS } from './social-posts';
import { SPORTS_PACKS } from './sports';

export const POSTER_PACKS: readonly PosterPack[] = [
  ...SOCIAL_POST_PACKS,
  ...CAROUSEL_PACKS,
  ...SPORTS_PACKS,
];
