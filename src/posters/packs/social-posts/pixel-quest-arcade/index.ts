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
import { PX } from './pixel';
import { liveWorkshop, newClients, ourServices, versus } from './posts';
import { raceAutumn, raceSummer, trueOrFalse } from './posts-extra';
import { growthStats, keyFactors, tetrisFit, tetrisFitStory } from './posts-more';

const POSTS = [
  newClients,
  raceSummer,
  tetrisFit,
  keyFactors,
  liveWorkshop,
  growthStats,
  versus,
  ourServices,
  trueOrFalse,
];

const LIGHT: SlideTheme = {
  background: '#e9e7ef',
  text: '#140c24',
  muted: '#3d3452',
  surface: '#ffffff',
  ink: '#140c24',
  brand: PX.sky,
  accent: PX.pink,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#07040d',
  text: '#ffffff',
  muted: '#d8d2e6',
  accent: PX.mint,
};

const handle = 'pixelforge.studio';

export const pixelQuestArcadePack = definePack({
  id: 'pixel-quest-arcade',
  title: 'Pixel Quest Arcade',
  description:
    'Retro 8-bit marketing posts with high scores, versus screens, stat boards and block puzzles for agencies and creators.',
  category: 'social-posts',
  tags: ['retro', 'b2b', 'instagram', 'story', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '60 Editable Social Posts + Stories', subtitle: 'Retro Arcade Marketing', handle },
        [newClients, liveWorkshop, ourServices],
      ),
      editorBadge(930, 60, 96, PX.pink, PX.sky),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inform clients', 'Gain leads', 'Build traction', 'Grow sales'],
      },
      versus,
      [keyFactors, liveWorkshop, growthStats, ourServices, trueOrFalse, tetrisFit, newClients],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Post Yours',
        body: 'Change the words, fonts, colours, icons and layout to match your brand.',
      },
      raceSummer,
      raceAutumn,
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
      tetrisFit,
      tetrisFitStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Marketing that plays like your favourite game.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap scores, colours, words and sprites, then export a post that is ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Grab the kit', body: 'Add the pack to your library' },
        { icon: 'mouse', title: '02 Open a design', body: 'Every post opens in the editor' },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit, then export PNG, JPG or PDF' },
      ],
    }),
  ],
});
