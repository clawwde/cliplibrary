import { definePack } from '../../../pack';
import { lastDay, lastDayStory, POSTS, priceTag, VIOLET } from './posts';

export const goldlineBlackFridayPack = definePack({
  id: 'goldline-black-friday',
  title: 'Goldline Black Friday',
  description:
    'Black Friday sale, price tag, countdown and last call posts in gold and black, with a matching story.',
  category: 'seasonal',
  tags: ['sale', 'holiday', 'small-business', 'instagram', 'story'],
  theme: 'dark',

  designs: [...POSTS, lastDayStory, lastDay(VIOLET), priceTag(VIOLET)],
});
