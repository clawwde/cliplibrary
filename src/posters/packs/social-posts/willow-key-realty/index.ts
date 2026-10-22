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
import { KEY } from './palette';
import { justSold, newListing, openHouse, trueFalse } from './posts';
import {
  buyerChecklist,
  clientReview,
  clientReviewStory,
  faqSearch,
  townhomes,
} from './posts-more';

const POSTS = [
  newListing,
  clientReview,
  openHouse,
  justSold,
  buyerChecklist,
  townhomes,
  trueFalse,
  faqSearch,
];

const LIGHT: SlideTheme = {
  background: '#e9ebe6',
  text: '#1b201c',
  muted: '#3d453f',
  surface: '#ffffff',
  ink: '#1b201c',
  brand: KEY.forest,
  accent: KEY.brass,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#080a08',
  text: '#ffffff',
  muted: '#d6dbd3',
  accent: '#d9b27a',
};

const handle = 'willowkey.homes';

export const willowKeyRealtyPack = definePack({
  id: 'willow-key-realty',
  title: 'Willow Key Realty',
  description:
    'New listing, open house, just sold, review and buyer tip posts for a real estate agent in sage, cream and brass.',
  category: 'social-posts',
  tags: ['real-estate', 'instagram', 'story', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '50 Editable Social Posts + Stories', subtitle: 'Real Estate Agents', handle },
        [trueFalse, newListing, openHouse],
      ),
      editorBadge(930, 60, 96, KEY.sage, KEY.forest),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Win new listings', 'Fill open houses', 'Build trust', 'Close more deals'],
      },
      justSold,
      [openHouse, buyerChecklist, clientReview, townhomes, faqSearch, newListing, trueFalse],
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
      clientReview,
      clientReviewStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Helping families find their next home since 2014.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap photos, prices, colours and contact details, then export a ready-to-post image.',
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
