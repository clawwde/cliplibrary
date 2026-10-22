import type { PosterPack } from '../pack';
import { SOCIAL_POST_PACKS } from './social-posts';
import { SPORTS_PACKS } from './sports';

export const POSTER_PACKS: readonly PosterPack[] = [...SOCIAL_POST_PACKS, ...SPORTS_PACKS];
