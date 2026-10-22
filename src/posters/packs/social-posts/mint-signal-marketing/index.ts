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
import { connectingTeams, starReviews, webinarNote } from './posts';
import { POSTS, strugglingPost, strugglingStory } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e5ebe8',
  text: '#0c0d0d',
  muted: '#3f4643',
  surface: '#ffffff',
  ink: '#0c0d0d',
  brand: '#059669',
  accent: '#10b981',
  headFont: 'Manrope',
  bodyFont: 'Manrope',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#060707',
  text: '#ffffff',
  muted: '#d1d9d5',
  accent: '#34d399',
};

const handle = 'brightlane.studio';

export const mintSignalMarketingPack = definePack({
  id: 'mint-signal-marketing',
  title: 'Mint Signal Marketing',
  description:
    'Black, white and mint green marketing posts and stories with reviews, webinars, hiring, tips and engagement prompts.',
  category: 'social-posts',
  tags: ['b2b', 'small-business', 'instagram', 'story', 'review'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '60 Editable Social Posts + Stories', subtitle: 'Marketing edition', handle },
      [starReviews, webinarNote, strugglingPost],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Reach new clients', 'Spark comments', 'Fill your webinars', 'Hire great people'],
      },
      connectingTeams,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Made for Feed and Story',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      strugglingPost,
      strugglingStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Marketing that keeps your pipeline busy.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap photos, rewrite copy, change colours and fonts, and resize anything in seconds.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Quick Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Order', body: 'Finish checkout in a few clicks' },
        { icon: 'mouse', title: '02 Open', body: 'Load any design in the editor' },
        { icon: 'download', title: '03 Publish', body: 'Edit, download and share' },
      ],
    }),
  ],
});
