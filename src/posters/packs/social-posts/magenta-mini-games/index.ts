import { definePack, LANDSCAPE } from '../../../pack';
import type { ListingTheme } from './listing';
import { listingPages } from './listing-more';
import {
  hiddenWords,
  LILAC,
  MAGENTA,
  OCEAN,
  pickNumber,
  quizStory,
  quizTime,
  routeMaze,
  unscramble,
} from './posts';

const THEME: ListingTheme = {
  page: '#0a0709',
  brand: MAGENTA.brand,
  brandText: '#ec1f75',
  onBrand: '#ffffff',
  accent: '#ff8cc0',
  ink: MAGENTA.ink,
  muted: '#5b4a55',
  folder: ['#ff9cc8', '#d6136a'],
  frame: '#ffb3d4',
  strip: '#fff0f6',
  storyFill: MAGENTA.brand,
  headFont: 'Montserrat',
  headScale: 1.14,
  bodyFont: 'Inter',
  bodyScale: 1,
};

const mazePost = routeMaze(MAGENTA);
const pick = pickNumber(MAGENTA);
const quiz = quizTime(MAGENTA);
const words = hiddenWords(MAGENTA);
const scramble = unscramble(MAGENTA);

export const magentaMiniGamesPack = definePack({
  id: 'magenta-mini-games',
  title: 'Magenta Mini Games',
  description:
    'Maze, pick-a-number, quiz, hidden word and unscramble engagement posts in magenta and black, with a story.',
  category: 'social-posts',
  tags: ['quiz', 'instagram', 'small-business', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      title: 'Play & Engage',
      channel: [{ content: 'Small Business ' }, { content: 'Games', fill: THEME.brandText }],
      count: [
        { content: '5 ' },
        { content: 'Premium', fill: THEME.brandText, weight: 800 },
        { content: ' social posts + a story' },
      ],
      bonus: 'A BONUS IS HIDDEN  >  SWIPE TO PLAY',
      showcase: [{ content: 'Mini ', glow: true }, { content: 'Social Game' }],
      showcaseSecond: [{ content: 'Post Templates' }],
      showcaseNote: 'Finished puzzles, built to spark comments and shares',
      stamp: 'Premium',
      editTitle: 'Editable\nGame Posts\nRight in\nYour Browser',
      editLines: ['Swap Puzzles\nin Minutes', '100% editable'],
      steps: [
        'Instant download after checkout',
        'Change questions, letters and colours',
        'Export and watch the comments roll in',
      ],
      stepsNote: 'No design skills needed: edit everything in the built-in editor.',
      offers: [
        'Buy one pack, get a second one free.*',
        'Message us once you have checked out.',
        'LIMITED TIME: the deal ends soon',
      ],
      offerNote: '*The free pack must be the same price or lower.',
      studio: ['Playbright', 'Studio'],
      tagline: 'More Than a Template',
      folder: ['Game Kit', '16.8 MB'],
      host: 'woman-portrait-4',
    },
    {
      posts: [scramble, mazePost, words, quiz, pick],
      mosaic: [scramble, mazePost, words, quiz, pick, mazePost, scramble],
      feature: mazePost,
      story: quizStory(MAGENTA),
      showcase: [pick, mazePost, quiz, words, scramble],
      edits: [
        [mazePost, routeMaze(OCEAN)],
        [scramble, unscramble(LILAC)],
      ],
    },
  ),
});
