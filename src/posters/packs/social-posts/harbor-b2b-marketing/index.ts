import { definePack } from '../../../pack';
import { creativeTeams, growMore, transforming } from './posts';
import { messaging, messagingStory, POSTS } from './posts-more';

export const harborB2bMarketingPack = definePack({
  id: 'harbor-b2b-marketing',
  title: 'Harbor B2B Marketing',
  description:
    'Modern B2B marketing posts and stories in deep navy, coral and cream for agencies and SaaS teams.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'photo'],
  theme: 'dark',

  designs: [...POSTS, transforming, creativeTeams, growMore, messaging, messagingStory],
});
