import { definePack } from '../../../pack';
import { clientSays, marketPortrait, seoFolders, topOnePercent, ultimateMove } from './posts';
import {
  didYouKnow,
  eventsList,
  guessWord,
  guidePost,
  guideStory,
  LIME_LOCKERS,
  lockers,
  talkTalk,
  VIOLET_LOCKER,
} from './posts-more';

const POSTS = [
  ultimateMove,
  seoFolders,
  clientSays,
  topOnePercent,
  talkTalk,
  marketPortrait,
  guessWord,
  eventsList,
  LIME_LOCKERS,
  guidePost,
  didYouKnow,
];

export const voltBoldMarketingPack = definePack({
  id: 'volt-bold-marketing',
  title: 'Volt Bold Marketing',
  description:
    'Loud marketing posts and stories in electric lime and black, with quizzes, reviews, event lists and bold type.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'quiz'],
  theme: 'dark',

  designs: [
    ...POSTS,
    seoFolders,
    eventsList,
    didYouKnow,
    ultimateMove,
    LIME_LOCKERS,
    lockers(VIOLET_LOCKER, ['NEW', 'TEAM', 'HOURS', 'JOIN THE FUN']),
    guidePost,
    guideStory,
  ],
});
