import {
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
import { BL, brandingMistakes, campaignInsights, chatHero, createBrands } from './posts';
import { insightsPost, insightsStory, POSTS } from './posts-extra';

const LIGHT: SlideTheme = {
  background: '#ecebee',
  text: '#121212',
  muted: '#46464d',
  surface: '#ffffff',
  ink: '#121212',
  brand: BL.ink,
  accent: BL.magenta,
  headFont: 'Poppins',
  bodyFont: 'Poppins',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d8d8de',
};

const handle = 'brightloop.co';

export const magentaInkSalesPack = definePack({
  id: 'magenta-ink-sales',
  title: 'Magenta Ink Sales',
  description:
    'High contrast sales and marketing posts and stories in hot magenta and ink black, with chat bubbles, checklists, myths and lead generation hooks.',
  category: 'social-posts',
  tags: ['b2b', 'small-business', 'instagram', 'story', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '60 Editable Social Posts + Stories',
        subtitle: 'Sales and marketing edition',
        handle,
      },
      [brandingMistakes, createBrands, campaignInsights],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Start conversations', 'Gain new leads', 'Build your brand', 'Grow sales'],
      },
      chatHero,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Post and Story Sizes',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      insightsPost,
      insightsStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Sales tips and marketing ideas that actually convert.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change the text, fonts and colours, swap icons and photos, and adjust any layout.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-bag', title: '01 Check out', body: 'Add the pack to your account' },
        { icon: 'mouse', title: '02 Open a post', body: 'Pick any design in the editor' },
        { icon: 'download', title: '03 Export', body: 'Edit it, then download in a click' },
      ],
    }),
  ],
});
