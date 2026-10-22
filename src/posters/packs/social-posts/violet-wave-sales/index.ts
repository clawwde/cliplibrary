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
import { buildPills, opportunities, PW, unlockInsights, verbList } from './posts';
import { POSTS, teamPost, teamStory } from './posts-extra';

const LIGHT: SlideTheme = {
  background: '#ebe9f2',
  text: '#14112b',
  muted: '#4a4660',
  surface: '#ffffff',
  ink: '#14112b',
  brand: PW.violet,
  accent: PW.violet,
  headFont: 'Poppins',
  bodyFont: 'Poppins',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#060510',
  text: '#ffffff',
  muted: '#d7d4e6',
  accent: '#9d8bff',
};

const handle = 'pulsewave.media';

export const violetWaveSalesPack = definePack({
  id: 'violet-wave-sales',
  title: 'Violet Wave Sales',
  description:
    'Modern sales and marketing posts and stories in electric violet and ink, with bold pill stacks, testimonials, team features and growth hooks.',
  category: 'social-posts',
  tags: ['b2b', 'corporate', 'instagram', 'story', 'review'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '60 Editable Social Posts + Stories',
        subtitle: 'Sales and marketing edition',
        handle,
      },
      [buildPills, opportunities, unlockInsights],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inform your audience', 'Attract leads', 'Gain traction', 'Close more sales'],
      },
      verbList,
      POSTS,
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
      teamPost,
      teamStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Growth playbooks for sales and marketing teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap the text, fonts, colours, photos and icons, and tune any layout to your style.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Complete your order in seconds' },
        { icon: 'layout-grid', title: '02 Pick a post', body: 'Open any design in the editor' },
        { icon: 'pen-tool', title: '03 Customise', body: 'Make it yours and export' },
      ],
    }),
  ],
});
