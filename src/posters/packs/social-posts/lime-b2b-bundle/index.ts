import { definePack } from '../../../pack';
import { dosDonts, hiringPost, LIME, leadersStats, mythFact, PEACH, saleMegaphone } from './posts';
import { checkComments, eventsList, quizTime, reviewWords } from './posts-more';

const POSTS = [
  mythFact(LIME),
  checkComments,
  leadersStats,
  eventsList,
  dosDonts(LIME),
  saleMegaphone,
  quizTime,
  hiringPost,
  reviewWords,
];

export const limeB2bBundlePack = definePack({
  id: 'lime-b2b-bundle',
  title: 'Lime B2B Bundle',
  description:
    'Myth busters, events, quizzes, reviews and sale posts for B2B brands in black, lime and violet.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'quiz'],
  theme: 'dark',

  designs: [...POSTS, mythFact(PEACH), dosDonts(PEACH)],
});
