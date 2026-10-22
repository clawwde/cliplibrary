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
import { amplifyBars, MINT, worldReach } from './posts';
import { POSTS, quoteBox, rocketPost, rocketStory, teamRing } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e4ebe8',
  text: '#06110d',
  muted: '#33463f',
  surface: '#ffffff',
  ink: '#06110d',
  brand: '#0b3d2b',
  accent: MINT.mint,
  headFont: 'Sora',
  bodyFont: 'Manrope',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: MINT.black,
  text: '#ffffff',
  muted: '#c5d6cf',
  brand: MINT.deep,
  accent: MINT.mint,
};

const handle = 'nodewave.labs';

export const mintCircuitTechPostsPack = definePack({
  id: 'mint-circuit-tech-posts',
  title: 'Mint Circuit Tech Posts',
  description:
    'Dark enterprise tech posts and stories with glowing mint accents, pricing, quotes, stats and product launch layouts.',
  category: 'social-posts',
  tags: ['saas', 'b2b', 'instagram', 'story', 'neon'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '60 Editable Social Posts + Stories',
        subtitle: 'Enterprise tech edition',
        handle,
      },
      [quoteBox, worldReach, teamRing],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Explain your product', 'Book more demos', 'Earn trust', 'Grow signups'],
      },
      amplifyBars,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Built For Two Formats',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      rocketPost,
      rocketStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Automation tools and product news for modern teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap the copy, colours, fonts and icons, and rearrange any layout to fit your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Start In Three Steps',
      steps: [
        { icon: 'shopping-bag', title: '01 Grab it', body: 'Add the pack to your library' },
        { icon: 'layout-grid', title: '02 Pick a post', body: 'Open any design in the editor' },
        {
          icon: 'wand-sparkles',
          title: '03 Customise',
          body: 'Change text and colours, then export',
        },
      ],
    }),
  ],
});
