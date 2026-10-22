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
import { COPPER, mistakes, quotePost, statRows, toggles } from './posts';
import { POSTS, workshopPost, workshopStory } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#ede7e2',
  text: '#1a100a',
  muted: '#4d3d33',
  surface: '#ffffff',
  ink: '#1a100a',
  brand: '#b35314',
  accent: COPPER.copper,
  headFont: 'Urbanist',
  bodyFont: 'DM Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: COPPER.black,
  text: '#ffffff',
  muted: '#e1d3c8',
  accent: COPPER.copper,
};

const handle = 'kilnworks.ai';

export const copperSignalAiPostsPack = definePack({
  id: 'copper-signal-ai-posts',
  title: 'Copper Signal AI Posts',
  description:
    'Enterprise AI and SaaS posts and stories in espresso and glowing copper, with stats, workshops, quotes and product launches.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'b2b', 'instagram', 'story'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '48 Editable Social Posts + Stories',
        subtitle: 'Enterprise AI edition',
        handle,
      },
      [toggles, mistakes, statRows],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Teach your market', 'Generate leads', 'Build credibility', 'Win more deals'],
      },
      quotePost,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Post And Story Sizes',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      workshopPost,
      workshopStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Practical AI guidance for growing companies.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change every word, colour, font and icon, then export posts that match your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-cart', title: '01 Check out', body: 'Complete your order in seconds' },
        {
          icon: 'cloud-upload',
          title: '02 Open the pack',
          body: 'It lands in your design library',
        },
        { icon: 'pen-tool', title: '03 Start editing', body: 'Tweak any post and export it' },
      ],
    }),
  ],
});
