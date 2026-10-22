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
import { AUT } from './palette';
import { firstDayOfFall, lockScreen, notesQuote, playlist, thankfulFor } from './posts';
import { novemberPost, novemberStory } from './posts-extra';
import {
  autumnEssentials,
  autumnSnacks,
  fallSips,
  shadeCards,
  winterFavorites,
} from './posts-more';

const POSTS = [
  autumnEssentials,
  firstDayOfFall,
  thankfulFor,
  fallSips,
  playlist,
  notesQuote,
  autumnSnacks,
  shadeCards,
  lockScreen,
  novemberPost,
  winterFavorites,
];

const LIGHT: SlideTheme = {
  background: '#ebe7e2',
  text: '#2b1d18',
  muted: '#4b3a33',
  surface: '#ffffff',
  ink: '#2b1d18',
  brand: AUT.berry,
  accent: AUT.butter,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#0b0908',
  text: '#ffffff',
  muted: '#d6d3d1',
};

const handle = 'mapleandmoss';

export const plumHarvestAutumnPack = definePack({
  id: 'plum-harvest-autumn',
  title: 'Plum Harvest Autumn',
  description:
    'Cozy fall influencer posts and stories with postcards, playlists, notes and palettes in plum, rose, sage and butter.',
  category: 'seasonal',
  tags: ['holiday', 'instagram', 'story', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '60 Editable Autumn Posts + Stories', subtitle: 'Cozy season collection', handle },
        [firstDayOfFall, playlist, notesQuote],
      ),
      editorBadge(930, 60, 96, AUT.rose, AUT.plum),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Share your season', 'Grow your circle', 'Spark more saves', 'Land brand deals'],
      },
      thankfulFor,
      [lockScreen, shadeCards, fallSips, autumnEssentials, novemberPost, autumnSnacks, playlist],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make It Your Own',
        body: 'Change the words, fonts, colours, photos and layout so every post feels like you.',
      },
      autumnEssentials,
      winterFavorites,
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
      novemberPost,
      novemberStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bio: 'Slow living, warm drinks and golden hour walks all season.',
        button: 'Follow',
      },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap the photos, words and colours, then export posts that are ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        {
          icon: 'shopping-cart',
          title: '01 Get the kit',
          body: 'Add the collection to your library',
        },
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
