import {
  beforeAfter,
  canvasSizes,
  editableLaptop,
  howToStart,
  mosaicCover,
  phoneTrio,
  profileFeed,
  type SlideTheme,
  SQUARE_SIZE,
} from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { fanPhonePage } from './fan-page';
import { HAWKS } from './palette';
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

const LIGHT: SlideTheme = {
  background: '#e6ebf0',
  text: '#0f172a',
  muted: '#334155',
  surface: '#ffffff',
  ink: '#0f172a',
  brand: HAWKS.navy,
  accent: HAWKS.amber,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#04070e',
  text: '#ffffff',
  muted: '#cbd5e1',
};

const handle = 'frosthawks.club';

export const frostHawksHockeyPack = definePack({
  id: 'frost-hawks-hockey',
  title: 'Frost Hawks Hockey',
  description:
    'Game day, stats, lineup, schedule and player graphics for a hockey club in midnight navy, ice blue and amber.',
  category: 'sports',
  tags: ['sports', 'instagram', 'story', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, [...POSTS, quoteFrost], [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '64 Editable Hockey Posts + Stories', subtitle: 'Ice hockey club kit', handle },
      [finalStats, puckDrop, playerCard],
    ),
    fanPhonePage(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Rally the fan base', 'Fill every seat', 'Win new sponsors', 'Celebrate players'],
      },
      playerOfYear,
      [schedule, countdown, rivalGame, startingLineup, gameDayPost, finalStats, puckDrop],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make It Your Own',
        body: 'Swap the words, fonts, colours, icons and photos until every post feels like your club.',
      },
      quoteNight,
      quoteFrost,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Canvas Sizes',
        postLabel: 'Feed post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      gameDayPost,
      gameDayStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bio: 'Frost Hawks game nights, stats and highlights all season.',
        button: 'Follow',
      },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change names, scores, colours and photos, then download a post that is ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Three Quick Steps',
      steps: [
        { icon: 'shopping-cart', title: '01 Get the kit', body: 'Add the pack to your library' },
        {
          icon: 'download',
          title: '02 Open a post',
          body: 'Every design loads in the built-in editor',
        },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit, then export PNG, JPG or PDF' },
      ],
    }),
  ],
});
