import { definePack } from '../../../pack';
import { mistakes, quotePost, statRows, toggles } from './posts';
import { POSTS, workshopPost, workshopStory } from './posts-more';

export const copperSignalAiPostsPack = definePack({
  id: 'copper-signal-ai-posts',
  title: 'Copper Signal AI Posts',
  description:
    'Enterprise AI and SaaS posts and stories in espresso and glowing copper, with stats, workshops, quotes and product launches.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'b2b', 'instagram', 'story'],
  theme: 'dark',

  designs: [...POSTS, toggles, mistakes, statRows, quotePost, workshopPost, workshopStory],
});
