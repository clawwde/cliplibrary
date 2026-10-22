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
import { growOnline, IRIS, magicRoutines, quoteFloat, stayAhead } from './posts';
import { effortlessPost, effortlessStory, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e9e6f1',
  text: '#140e33',
  muted: '#423c5e',
  surface: '#ffffff',
  ink: '#140e33',
  brand: IRIS.royal,
  accent: IRIS.iris,
  headFont: 'Figtree',
  bodyFont: 'Inter',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#07051a',
  text: '#ffffff',
  muted: '#d6d0f0',
  brand: IRIS.royal,
  accent: IRIS.soft,
};

const handle = 'lumenflow.ai';

export const irisFlowAiPostsPack = definePack({
  id: 'iris-flow-ai-posts',
  title: 'Iris Flow AI Posts',
  description:
    'Bright enterprise AI and automation posts and stories in iris violet and lilac, with quotes, stats, launches and workflow promos.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'gradient', 'instagram', 'story'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '50 Editable Social Posts + Stories',
        subtitle: 'AI automation edition',
        handle,
      },
      [magicRoutines, growOnline, stayAhead],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: [
          'Inspire your audience',
          'Capture new leads',
          'Show real results',
          'Grow revenue',
        ],
      },
      quoteFloat,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Made For Feed And Story',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      effortlessPost,
      effortlessStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Automation ideas that give your team hours back.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Update text, colours, fonts and icons, and reshape any layout to suit your style.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Three Easy Steps',
      steps: [
        { icon: 'shopping-cart', title: '01 Buy once', body: 'Finish checkout in a few clicks' },
        { icon: 'folder-open', title: '02 Open it', body: 'Find every design in your library' },
        { icon: 'palette', title: '03 Make it yours', body: 'Restyle, then export and post' },
      ],
    }),
  ],
});
