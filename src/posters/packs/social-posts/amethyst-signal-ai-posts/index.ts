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
import { campaignRoi, crewPower, pickDirection } from './posts';
import { buildFaster, topFivePost, topFiveStory } from './posts-mid';
import { POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#ebe7f3',
  text: '#140d26',
  muted: '#3d3357',
  surface: '#ffffff',
  ink: '#140d26',
  brand: '#7c3aed',
  accent: '#a78bfa',
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'Manrope',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#06030c',
  text: '#ffffff',
  muted: '#ddd6fe',
  accent: '#b79cff',
};

const handle = 'lumen.stack';

export const amethystSignalAiPostsPack = definePack({
  id: 'amethyst-signal-ai-posts',
  title: 'Amethyst Signal Posts',
  description:
    'Dark AI and tech company social posts and stories in glowing violet, with team, event, review and growth layouts.',
  category: 'social-posts',
  tags: ['ai', 'b2b', 'corporate', 'instagram', 'story'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '42 Editable Social Posts + Stories', subtitle: 'Tech Company Edition', handle },
      [crewPower, campaignRoi, pickDirection],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Share updates', 'Attract talent', 'Fill your events', 'Win new clients'],
      },
      buildFaster,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Made for Feed and Story',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      topFivePost,
      topFiveStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Product, growth and AI notes for builders.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Every detail is editable',
        body: 'Swap the words, colours, fonts and icons, then rearrange the layout to suit your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-cart', title: '01 Order', body: 'Pick the pack and pay securely' },
        { icon: 'layout-grid', title: '02 Browse', body: 'Open the designs in the editor' },
        { icon: 'pen-tool', title: '03 Design', body: 'Customize and download your posts' },
      ],
    }),
  ],
});
