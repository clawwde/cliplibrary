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
import { bigNumber, ideasHeights, MERIDIAN, receiptPartners, strategyTabs } from './posts';
import { doorAfter, doorBefore, POSTS, webinarPost, webinarStory } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e6e9ef',
  text: '#0b1426',
  muted: '#3b4558',
  surface: '#ffffff',
  ink: '#0b1426',
  brand: MERIDIAN.navy,
  accent: MERIDIAN.coral,
  headFont: 'Outfit',
  bodyFont: 'DM Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#05080f',
  text: '#ffffff',
  muted: '#cfd5e1',
  accent: MERIDIAN.coral,
};

const handle = 'meridian.co';

export const meridianNavyCorporatePack = definePack({
  id: 'meridian-navy-corporate',
  title: 'Meridian Corporate Posts',
  description:
    'Corporate coaching and consulting posts and stories in midnight navy and coral, with events, stats, webinars and growth messages.',
  category: 'social-posts',
  tags: ['corporate', 'b2b', 'instagram', 'story', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '64 Editable Social Posts + Stories',
        subtitle: 'Corporate growth edition',
        handle,
      },
      [ideasHeights, receiptPartners, bigNumber],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Educate clients', 'Attract leads', 'Build momentum', 'Lift revenue'],
      },
      strategyTabs,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make It Your Own',
        body: 'Rewrite the copy, swap fonts and colours, change icons and rearrange the layout.',
      },
      doorBefore,
      doorAfter,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Ready Formats',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      webinarPost,
      webinarStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Strategy, people and growth tips for busy leaders.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change the words, colours, fonts and photos, then export a post that fits your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Begin',
      steps: [
        {
          icon: 'shopping-cart',
          title: '01 Get the pack',
          body: 'Add it to your library in a click',
        },
        {
          icon: 'folder-open',
          title: '02 Open a design',
          body: 'Every post opens straight in the editor',
        },
        {
          icon: 'pencil',
          title: '03 Make it yours',
          body: 'Edit text, colours and photos, then export',
        },
      ],
    }),
  ],
});
