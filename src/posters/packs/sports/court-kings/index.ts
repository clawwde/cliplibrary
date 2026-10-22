import {
  beforeAfter,
  canvasSizes,
  editableLaptop,
  howToStart,
  mosaicCover,
  phoneTrio,
  phoneWithMosaic,
  profileFeed,
  type SlideTheme,
  SQUARE_SIZE,
} from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  allStar,
  allStarPost,
  CRIMSON_RECORD,
  POSTS,
  playerFeature,
  record,
  saveTheDate,
  schedule,
  startingFive,
} from './posts';

const LIGHT: SlideTheme = {
  background: '#e8ebe9',
  text: '#111827',
  muted: '#374151',
  surface: '#ffffff',
  ink: '#111827',
  brand: '#0f5132',
  accent: '#f5b700',
  headFont: 'Poppins',
  bodyFont: 'Poppins',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d1d5db',
  accent: '#f5b700',
};

const handle = 'courtkings.club';

export const courtKingsPack = definePack({
  id: 'court-kings',
  title: 'Court Kings Basketball',
  description:
    'Game day, schedule, roster and stat graphics for a basketball club in forest green and gold.',
  category: 'sports',
  tags: ['sports', 'instagram', 'story', 'photo'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '72 Editable Social Posts + Stories', subtitle: 'Basketball club kit', handle },
      [playerFeature, saveTheDate, startingFive],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Hype every game', 'Grow the fan base', 'Sell more tickets', 'Celebrate players'],
      },
      schedule,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make It Yours',
        body: 'Change words, colours, photos and fonts until it matches your club.',
      },
      record,
      CRIMSON_RECORD,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Formats',
        postLabel: 'Feed post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      allStarPost,
      allStar,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Club news, game nights and highlights every week.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap players, scores and colours, then download a ready-to-post image.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Three Steps',
      steps: [
        { icon: 'mouse', title: '01 Pick a design', body: 'Open any poster from the library' },
        { icon: 'pencil', title: '02 Make it yours', body: 'Edit text, photos and colours' },
        { icon: 'download', title: '03 Download', body: 'Export PNG, JPG or PDF in one click' },
      ],
    }),
  ],
});
