import { definePack } from '../../../pack';
import { bigStat, growStory, leadersChart, POSTS, TEAL } from './posts';

export const rubyKeyStatsPack = definePack({
  id: 'ruby-key-stats',
  title: 'Ruby Key Stats',
  description:
    'Key statistic, trend chart, client result and growth posts in ruby and gold, with a matching story.',
  category: 'social-posts',
  tags: ['stats', 'instagram', 'ai', 'small-business', 'story'],
  theme: 'dark',

  designs: [...POSTS, growStory, leadersChart(TEAL), bigStat(TEAL)],
});
