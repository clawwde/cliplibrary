import { definePack } from '../../../pack';
import { bigNumber, ideasHeights, receiptPartners, strategyTabs } from './posts';
import { doorAfter, doorBefore, POSTS, webinarPost, webinarStory } from './posts-more';

export const meridianNavyCorporatePack = definePack({
  id: 'meridian-navy-corporate',
  title: 'Meridian Corporate Posts',
  description:
    'Corporate coaching and consulting posts and stories in midnight navy and coral, with events, stats, webinars and growth messages.',
  category: 'social-posts',
  tags: ['corporate', 'b2b', 'instagram', 'story', 'photo'],
  theme: 'light',

  designs: [
    ...POSTS,
    ideasHeights,
    receiptPartners,
    bigNumber,
    strategyTabs,
    doorBefore,
    doorAfter,
    webinarPost,
    webinarStory,
  ],
});
