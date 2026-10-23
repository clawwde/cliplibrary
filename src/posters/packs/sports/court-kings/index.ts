import { definePack } from '../../../pack';
import {
  allStar,
  allStarPost,
  CRIMSON_RECORD,
  POSTS,
  playerFeature,
  record,
  saveTheDate,
  schedule,
  startingFive,
} from './posts';

export const courtKingsPack = definePack({
  id: 'court-kings',
  title: 'Court Kings Basketball',
  description:
    'Game day, schedule, roster and stat graphics for a basketball club in forest green and gold.',
  category: 'sports',
  tags: ['sports', 'instagram', 'story', 'photo'],
  theme: 'dark',

  designs: [
    ...POSTS,
    playerFeature,
    saveTheDate,
    startingFive,
    schedule,
    record,
    CRIMSON_RECORD,
    allStarPost,
    allStar,
  ],
});
