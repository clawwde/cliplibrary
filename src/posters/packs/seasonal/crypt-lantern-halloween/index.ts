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
import { CRYPT } from './palette';
import { builtToBite, coffinWebinar, happyHalloween, tombstoneQuote, trickOrTreat } from './posts';
import { comicCover, comicRemix, computerPost, computerStory } from './posts-extra';
import { frightNight, octoberChecklist, servicesTags, spookyDeal } from './posts-more';

const POSTS = [
  happyHalloween,
  tombstoneQuote,
  trickOrTreat,
  coffinWebinar,
  servicesTags,
  builtToBite,
  computerPost,
  frightNight,
  comicCover,
  spookyDeal,
  octoberChecklist,
];

const LIGHT: SlideTheme = {
  background: '#e9e7e2',
  text: '#0b0b0b',
  muted: '#3f3f3f',
  surface: '#ffffff',
  ink: '#0b0b0b',
  brand: CRYPT.teal,
  accent: CRYPT.mustard,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d4d4d4',
};

const handle = 'nightshade.studio';

export const cryptLanternHalloweenPack = definePack({
  id: 'crypt-lantern-halloween',
  title: 'Crypt Lantern Halloween',
  description:
    'Spooky October marketing posts and stories for brands and studios in midnight teal, blood red and mustard.',
  category: 'seasonal',
  tags: ['holiday', 'instagram', 'story', 'small-business', 'sale'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '68 Editable Halloween Posts + Stories', subtitle: 'October brand kit', handle },
        [happyHalloween, trickOrTreat, coffinWebinar],
      ),
      editorBadge(930, 60, 96, CRYPT.teal, CRYPT.deep),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Spark curiosity', 'Win new leads', 'Grow your reach', 'Boost October sales'],
      },
      builtToBite,
      [
        octoberChecklist,
        tombstoneQuote,
        spookyDeal,
        servicesTags,
        frightNight,
        comicCover,
        coffinWebinar,
      ],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make It Your Own',
        body: 'Change the copy, fonts, colours and icons, then rearrange the layout to suit your brand.',
      },
      comicCover,
      comicRemix,
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
      computerPost,
      computerStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bio: 'Branding and web studio. Wickedly good design all October.',
        button: 'Follow',
      },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the copy, swap colours and icons, then export posts that are ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Get the pack', body: 'Add it to your design library' },
        {
          icon: 'mouse',
          title: '02 Open a post',
          body: 'Each design loads in the built-in editor',
        },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit, then export PNG, JPG or PDF' },
      ],
    }),
  ],
});
