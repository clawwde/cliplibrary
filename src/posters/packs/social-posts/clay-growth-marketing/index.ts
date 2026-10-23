import { definePack } from '../../../pack';
import {
  doorHanger,
  marketPortrait,
  reviewWords,
  seoChecklist,
  TIDE,
  TIME_WAITS,
  timeWaits,
} from './posts';
import { consistencyPost, consistencyStory, POSTS } from './posts-more';

export const clayGrowthMarketingPack = definePack({
  id: 'clay-growth-marketing',
  title: 'Clay Growth Marketing',
  description:
    'Modern marketing posts and stories in terracotta and cream, with reviews, checklists, webinars, quizzes and growth tips.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'tips'],
  theme: 'light',

  designs: [
    ...POSTS,
    marketPortrait,
    doorHanger,
    seoChecklist,
    reviewWords,
    TIME_WAITS,
    timeWaits(TIDE, ['Own Today', 'thrive tomorrow', 'Begin now']),
    consistencyPost,
    consistencyStory,
  ],
});
