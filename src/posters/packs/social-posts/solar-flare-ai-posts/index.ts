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
import { blueprint, solutionsAmber, solutionsViolet } from './posts';
import { adsGrowth, fiveStages, POSTS, powerPost, powerStory } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#ebe7e3',
  text: '#16120f',
  muted: '#4a423b',
  surface: '#ffffff',
  ink: '#16120f',
  brand: '#ff6a1a',
  accent: '#ffb648',
  headFont: 'Sora',
  bodyFont: 'Sora',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#060504',
  text: '#ffffff',
  muted: '#d6d0ca',
  accent: '#ffb648',
};

const handle = 'halogen.ai';

export const solarFlareAiPostsPack = definePack({
  id: 'solar-flare-ai-posts',
  title: 'Solar Flare AI Posts',
  description:
    'Glowing black and amber AI and SaaS social posts and stories with stats, launches, quotes and product promos.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'b2b', 'instagram', 'neon'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '68 Editable Social Posts + Stories', subtitle: 'AI and SaaS edition', handle },
      [blueprint, powerPost, adsGrowth],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Explain your product', 'Book more demos', 'Show real results', 'Grow revenue'],
      },
      fiveStages,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Detail Yours',
        body: 'Rewrite headlines, recolour the glow, swap icons and reshape layouts in minutes.',
        before: 'Original',
        after: 'Your version',
      },
      solutionsAmber,
      solutionsViolet,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Ready Sizes',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      powerPost,
      powerStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Practical AI for teams that ship faster.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change text, fonts and colours, swap icons and adjust any layout to fit your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Start in Three Steps',
      steps: [
        {
          icon: 'shopping-bag',
          title: '01 Get the pack',
          body: 'Save the full set to your account',
        },
        {
          icon: 'folder-open',
          title: '02 Open it up',
          body: 'Every template loads in the editor',
        },
        {
          icon: 'wand-sparkles',
          title: '03 Customise',
          body: 'Edit, export and post the same day',
        },
      ],
    }),
  ],
});
