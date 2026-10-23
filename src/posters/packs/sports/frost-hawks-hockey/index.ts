import { definePack } from '../../../pack';
import { finalStats, gameDayPost, gameDayStory, playerCard, playerOfYear, puckDrop } from './posts';
import {
  countdown,
  quoteFrost,
  quoteNight,
  rivalGame,
  schedule,
  startingLineup,
} from './posts-more';

const POSTS = [
  finalStats,
  puckDrop,
  playerCard,
  playerOfYear,
  gameDayPost,
  quoteNight,
  startingLineup,
  schedule,
  rivalGame,
  countdown,
];

export const frostHawksHockeyPack = definePack({
  id: 'frost-hawks-hockey',
  title: 'Frost Hawks Hockey',
  description:
    'Game day, stats, lineup, schedule and player graphics for a hockey club in midnight navy, ice blue and amber.',
  category: 'sports',
  tags: ['sports', 'instagram', 'story', 'photo'],
  theme: 'light',

  designs: [
    ...POSTS,
    quoteFrost,
    finalStats,
    puckDrop,
    playerCard,
    playerOfYear,
    schedule,
    countdown,
    rivalGame,
    startingLineup,
    gameDayPost,
    quoteNight,
    gameDayStory,
  ],
});
