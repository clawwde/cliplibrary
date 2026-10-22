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
import { counterGrow, levelUp, versionLive } from './posts';
import { flowmindPost, flowmindStory, roadmapShines } from './posts-mid';
import { POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#eceee6',
  text: '#13150d',
  muted: '#3c4130',
  surface: '#ffffff',
  ink: '#13150d',
  brand: '#65a30d',
  accent: '#a3e635',
  headFont: 'Lexend',
  bodyFont: 'Figtree',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#080906',
  text: '#ffffff',
  muted: '#e3e8d6',
  accent: '#b5ee55',
};

const handle = 'kestrel.ai';

export const citronScaleAiPostsPack = definePack({
  id: 'citron-scale-ai-posts',
  title: 'Citron Scale AI Posts',
  description:
    'AI product and SaaS social posts and stories in citron lime on charcoal, with launches, gauges, counters and feature panels.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'product', 'instagram', 'story'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '50 Editable Social Posts + Stories', subtitle: 'AI Product Edition', handle },
      [levelUp, counterGrow, versionLive],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Announce features', 'Grow sign-ups', 'Show results', 'Boost retention'],
      },
      roadmapShines,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Sized for Every Feed',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      flowmindPost,
      flowmindStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Launch notes and AI tips for growing products.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Customize it in minutes',
        body: 'Edit the text, swap fonts and colours, replace icons and rearrange every layout online.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Three Easy Steps',
      steps: [
        { icon: 'wallet', title: '01 Pay', body: 'Finish checkout in a few clicks' },
        { icon: 'download', title: '02 Get access', body: 'Open the pack from your library' },
        { icon: 'pencil', title: '03 Edit', body: 'Make every design your own' },
      ],
    }),
  ],
});
