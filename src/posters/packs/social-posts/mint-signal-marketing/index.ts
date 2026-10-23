import { definePack } from '../../../pack';
import { connectingTeams, starReviews, webinarNote } from './posts';
import { POSTS, strugglingPost, strugglingStory } from './posts-more';

export const mintSignalMarketingPack = definePack({
  id: 'mint-signal-marketing',
  title: 'Mint Signal Marketing',
  description:
    'Black, white and mint green marketing posts and stories with reviews, webinars, hiring, tips and engagement prompts.',
  category: 'social-posts',
  tags: ['b2b', 'small-business', 'instagram', 'story', 'review'],
  theme: 'dark',

  designs: [...POSTS, starReviews, webinarNote, strugglingPost, connectingTeams, strugglingStory],
});
