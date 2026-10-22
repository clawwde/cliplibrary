import {
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
import { LILAC } from './palette';
import { highlightQuote, lockScreen, notesCard, searchWord } from './posts';
import { bloom, bloomStory, challenge, definition, polaroid } from './posts-more';

const POSTS = [
  lockScreen,
  bloom,
  polaroid,
  definition,
  highlightQuote,
  challenge,
  notesCard,
  searchWord,
];

const LIGHT: SlideTheme = {
  background: '#ebe8ee',
  text: '#1d1823',
  muted: '#433b4c',
  surface: '#ffffff',
  ink: '#1d1823',
  brand: LILAC.plum,
  accent: LILAC.mauve,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#09070b',
  text: '#ffffff',
  muted: '#dcd6e2',
  accent: LILAC.lilac,
};

const handle = 'ines.slowdays';

export const lilacHourSelfcarePack = definePack({
  id: 'lilac-hour-selfcare',
  title: 'Lilac Hour Self Care',
  description:
    'Soft lifestyle and self care posts with lock screens, notes, quotes and a five day challenge in lilac and plum.',
  category: 'lifestyle',
  tags: ['wellness', 'instagram', 'story', 'quote', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '50 Editable Social Posts + Stories', subtitle: 'Lifestyle & Self Care', handle },
        [lockScreen, highlightQuote, notesCard],
      ),
      editorBadge(930, 60, 96, LILAC.mauve, LILAC.plum),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inspire daily', 'Build community', 'Share your story', 'Launch offers'],
      },
      searchWord,
      [polaroid, definition, challenge, bloom, notesCard, highlightQuote, lockScreen],
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
      bloom,
      bloomStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Slow living, gentle habits and notes to self.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap photos, quotes, fonts and colours, then export a post that feels like you.',
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
