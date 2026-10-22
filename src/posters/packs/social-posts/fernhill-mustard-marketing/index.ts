import {
  beforeAfter,
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
import { catalogNewest, FH, openingHours, whatTheySay } from './posts';
import { eventsPost, eventsStory, POSTS, searchAfter, searchBefore } from './posts-extra';
import { marketInsights } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#ebe8df',
  text: '#14231b',
  muted: '#4a554e',
  surface: '#ffffff',
  ink: '#14231b',
  brand: FH.forest,
  accent: FH.mustard,
  headFont: 'Poppins',
  bodyFont: 'Poppins',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#060807',
  text: '#ffffff',
  muted: '#d5dad6',
};

const handle = 'fernhill.studio';

export const fernhillMustardMarketingPack = definePack({
  id: 'fernhill-mustard-marketing',
  title: 'Fernhill Marketing Posts',
  description:
    'Playful marketing agency posts and stories in forest green and mustard, with quizzes, spin wheels, events, reviews and myth or fact layouts.',
  category: 'social-posts',
  tags: ['b2b', 'small-business', 'instagram', 'story', 'quiz'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '68 Editable Social Posts + Stories', subtitle: 'Modern marketing edition', handle },
      [catalogNewest, openingHours, whatTheySay],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Spark engagement', 'Collect leads', 'Grow your audience', 'Boost sales'],
      },
      marketInsights,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Edit the text, change fonts or colours, swap photos and icons, and rework any layout.',
      },
      searchBefore,
      searchAfter,
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
      eventsPost,
      eventsStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Bright ideas and campaigns for growing brands.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the copy, recolour the shapes and swap photos until it feels like your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Pick up the pack in a minute' },
        { icon: 'folder-open', title: '02 Open it', body: 'Every design loads in the editor' },
        { icon: 'paintbrush', title: '03 Customise', body: 'Make it yours, then export' },
      ],
    }),
  ],
});
