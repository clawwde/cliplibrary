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
import { planBuildShip, riseOfAutopilot, topThree } from './posts';
import { precisionTracking } from './posts-mid';
import {
  breakthroughPost,
  breakthroughStory,
  busyworkAmber,
  busyworkCyan,
  POSTS,
} from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e6eef3',
  text: '#06121f',
  muted: '#2c4257',
  surface: '#ffffff',
  ink: '#06121f',
  brand: '#0ea5e9',
  accent: '#22d3ee',
  headFont: 'Outfit',
  bodyFont: 'DM Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#02070e',
  text: '#ffffff',
  muted: '#cfe3ef',
  accent: '#38d9f5',
};

const handle = 'quanta.grid';

export const arcticCircuitTechPostsPack = definePack({
  id: 'arctic-circuit-tech-posts',
  title: 'Arctic Circuit Tech Posts',
  description:
    'Dark enterprise tech social posts and stories with glowing cyan tiles, myth busters, quotes and launch graphics.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'b2b', 'instagram', 'neon'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '56 Editable Social Posts + Stories', subtitle: 'Dark Tech Edition', handle },
      [planBuildShip, riseOfAutopilot, topThree],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Spark curiosity', 'Book more demos', 'Earn trust', 'Close faster'],
      },
      precisionTracking,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Yours to Customize',
        body: 'Change the words, colours, icons and layout until every post fits your brand.',
      },
      busyworkCyan,
      busyworkAmber,
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
      breakthroughPost,
      breakthroughStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Automation ideas and product drops for tech teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Fully editable online',
        body: 'Change any text, font, colour or icon in the online editor, with no extra software needed.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How It Works',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Complete your order in seconds' },
        { icon: 'mouse', title: '02 Open it', body: 'Launch any post in the editor' },
        { icon: 'wand-sparkles', title: '03 Edit', body: 'Tweak the details and export' },
      ],
    }),
  ],
});
