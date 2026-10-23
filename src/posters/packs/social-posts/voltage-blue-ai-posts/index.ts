import { definePack } from '../../../pack';
import { automationCard, clientReviews, wifiSpeed } from './posts';
import { architect, launchPost, launchStory, POSTS, wordsBlue, wordsGreen } from './posts-more';

export const voltageBlueAiPostsPack = definePack({
  id: 'voltage-blue-ai-posts',
  title: 'Voltage Blue AI Posts',
  description:
    'Dark electric blue AI and SaaS social posts and stories with launches, reviews, stats, webinars and bold type.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'instagram', 'story', 'neon'],
  theme: 'dark',

  designs: [
    ...POSTS,
    wifiSpeed,
    automationCard,
    clientReviews,
    architect,
    wordsBlue,
    wordsGreen,
    launchPost,
    launchStory,
  ],
});
