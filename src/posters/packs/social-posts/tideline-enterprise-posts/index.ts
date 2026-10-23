import { definePack } from '../../../pack';
import { analyticsBars, skillPoll, websiteLive } from './posts';
import { POSTS, stayAhead, stickyPost, stickyStory } from './posts-more';

export const tidelineEnterprisePostsPack = definePack({
  id: 'tideline-enterprise-posts',
  title: 'Tideline Enterprise Posts',
  description:
    'Enterprise B2B social posts and stories in deep teal and aqua, with events, polls, stats, reviews and launch graphics.',
  category: 'social-posts',
  tags: ['b2b', 'corporate', 'instagram', 'story', 'stats'],
  theme: 'dark',

  designs: [...POSTS, analyticsBars, websiteLive, skillPoll, stayAhead, stickyPost, stickyStory],
});
