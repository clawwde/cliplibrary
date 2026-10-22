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
import { editorBadge, phoneChecklist, withNodes } from './listing';
import { FOX } from './palette';
import {
  countdownPost,
  countdownStory,
  gameDay,
  gameTimes,
  matchups,
  rivalNight,
  rivalRemix,
} from './posts';
import { finalScore, gameStats, playerOfWeek, topFive } from './posts-more';

const POSTS = [
  gameDay,
  gameTimes,
  rivalNight,
  matchups,
  countdownPost,
  topFive,
  gameStats,
  finalScore,
  playerOfWeek,
];

const LIGHT: SlideTheme = {
  background: '#ecebe8',
  text: '#141414',
  muted: '#404040',
  surface: '#ffffff',
  ink: '#141414',
  brand: FOX.blaze,
  accent: FOX.blaze,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#0a0a0a',
  text: '#ffffff',
  muted: '#d4d4d4',
};

const handle = 'ridgeview.foxes';

export const blazeFoxesFootballPack = definePack({
  id: 'blaze-foxes-football',
  title: 'Blaze Foxes Football',
  description:
    'Gameday, countdown, schedule, poll, stats and player graphics for a football club in charcoal and blaze orange.',
  category: 'sports',
  tags: ['sports', 'instagram', 'story', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '60 Editable Football Posts + Stories', subtitle: 'Gameday club kit', handle },
        [gameStats, matchups, finalScore],
      ),
      editorBadge(930, 60, 96, FOX.blaze, '#7c2d12'),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Hype every game', 'Fill the stands', 'Grow the fan base', 'Win sponsors'],
      },
      gameDay,
      [topFive, playerOfWeek, gameStats, finalScore, matchups, countdownPost, gameTimes],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Post Yours',
        body: 'Change the words, fonts, colours, icons and layout to match your team in minutes.',
      },
      rivalNight,
      rivalRemix,
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
      countdownPost,
      countdownStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Friday lights, Saturday wins. Ridgeview Foxes football.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap names, scores, colours and photos, then export a post that is ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Get Started',
      steps: [
        { icon: 'shopping-cart', title: '01 Grab the kit', body: 'Add the pack to your library' },
        {
          icon: 'mouse',
          title: '02 Open a design',
          body: 'Every post opens in the built-in editor',
        },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit, then export PNG, JPG or PDF' },
      ],
    }),
  ],
});
