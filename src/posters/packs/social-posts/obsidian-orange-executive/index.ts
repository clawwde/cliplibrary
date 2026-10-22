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
import { answerCall, leadershipTips, powerFull, trackRecord, VG } from './posts';
import { helloMonday, helloTuesday, POSTS } from './posts-extra';
import { marketPost, marketStory } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e8e6e3',
  text: '#121212',
  muted: '#45413d',
  surface: '#ffffff',
  ink: '#121212',
  brand: VG.black,
  accent: VG.orange,
  headFont: 'Poppins',
  bodyFont: 'Poppins',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d6d3cf',
};

const handle = 'vantor.group';

export const obsidianOrangeExecutivePack = definePack({
  id: 'obsidian-orange-executive',
  title: 'Obsidian Orange Executive',
  description:
    'Bold executive business posts and stories in black and blaze orange, with funnels, track records, big stats and leadership tips.',
  category: 'social-posts',
  tags: ['corporate', 'b2b', 'instagram', 'story', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '70 Editable Social Posts + Stories',
        subtitle: 'Executive business edition',
        handle,
      },
      [trackRecord, leadershipTips, answerCall],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Educate buyers', 'Capture leads', 'Build authority', 'Close more deals'],
      },
      powerFull,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Rewrite the text, change fonts or colours, swap icons and move anything around.',
      },
      helloMonday,
      helloTuesday,
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
      marketPost,
      marketStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Leadership, growth and strategy for modern teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change text, fonts and colours, swap icons and photos, and fit any layout to your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Check out', body: 'Grab the pack in a few clicks' },
        { icon: 'layout-grid', title: '02 Pick a post', body: 'Browse all designs in the editor' },
        { icon: 'wand-sparkles', title: '03 Make it yours', body: 'Edit, then download and share' },
      ],
    }),
  ],
});
