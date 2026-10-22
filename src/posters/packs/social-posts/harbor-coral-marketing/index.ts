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
import { ideasFlight, leadTrend, portfolio, seoMagnifier } from './posts';
import { POSTS, trendsPost, trendsStory, webinarDark, webinarNavy } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e9e6ef',
  text: '#141a33',
  muted: '#454b63',
  surface: '#ffffff',
  ink: '#141a33',
  brand: '#1f2a5c',
  accent: '#ff6b57',
  headFont: 'Bricolage Grotesque',
  bodyFont: 'DM Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#0b0d18',
  text: '#ffffff',
  muted: '#d4d7e6',
  accent: '#ff6b57',
};

const handle = 'lumora.studio';

export const harborCoralMarketingPack = definePack({
  id: 'harbor-coral-marketing',
  title: 'Harbor Coral Marketing',
  description:
    'Navy and coral marketing posts and stories with stats, webinars, checklists, portfolio and trend graphics.',
  category: 'social-posts',
  tags: ['small-business', 'b2b', 'instagram', 'story', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '64 Editable Social Posts + Stories', subtitle: 'Marketing edition', handle },
      [ideasFlight, portfolio, leadTrend],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: [
          'Teach your audience',
          'Collect more leads',
          'Look consistent',
          'Sell your services',
        ],
      },
      seoMagnifier,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Edit text, change fonts or colours, swap icons and photos, and adjust the layout to your style.',
        before: 'Before',
        after: 'After',
      },
      webinarNavy,
      webinarDark,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Canvas Sizes',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      trendsPost,
      trendsStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Marketing ideas, templates and growth tips.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change words, colours, fonts, icons and photos until every post feels like your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Begin',
      steps: [
        { icon: 'shopping-bag', title: '01 Buy once', body: 'Get lifetime access to the set' },
        { icon: 'folder-open', title: '02 Open', body: 'Every post opens in the editor' },
        { icon: 'wand-sparkles', title: '03 Customise', body: 'Make it yours and download' },
      ],
    }),
  ],
});
