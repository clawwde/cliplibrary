import { definePack } from '../../../pack';
import { blueprintKeys, clientReviews, folderHero, modularClick } from './posts';
import { glassPost, glassStory, POSTS } from './posts-more';

export const rosewireTechPostsPack = definePack({
  id: 'rosewire-tech-posts',
  title: 'Rosewire Tech Posts',
  description:
    'Glassy dark tech and SaaS posts and stories lit with rose pink, covering launches, reviews, search, growth and product updates.',
  category: 'social-posts',
  tags: ['saas', 'b2b', 'linkedin', 'instagram', 'story'],
  theme: 'dark',

  designs: [
    ...POSTS,
    modularClick,
    blueprintKeys,
    clientReviews,
    folderHero,
    glassPost,
    glassStory,
  ],
});
