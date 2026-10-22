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
import { engineeredToScale, promptPipelines, shipPlaybooks, standApart } from './posts';
import { counterPost, counterStory, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#f3e8ee',
  text: '#1c0a16',
  muted: '#4a3242',
  surface: '#ffffff',
  ink: '#1c0a16',
  brand: '#d6246e',
  accent: '#ff6fa8',
  headFont: 'Sora',
  bodyFont: 'Inter',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#0d0409',
  text: '#ffffff',
  muted: '#ecd9e3',
  accent: '#ff7eb3',
};

const handle = 'novafield.labs';

export const rosequartzAiEnterprisePack = definePack({
  id: 'rosequartz-ai-enterprise',
  title: 'Rosequartz AI Enterprise',
  description:
    'Enterprise AI and SaaS social posts and stories in rose, magenta and deep plum, with agent chats, counters and feature tiles.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'b2b', 'instagram', 'story'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '48 Editable Social Posts + Stories', subtitle: 'Enterprise AI Edition', handle },
      [promptPipelines, engineeredToScale, shipPlaybooks],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Educate buyers', 'Capture leads', 'Build momentum', 'Lift revenue'],
      },
      standApart,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Ready Formats',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      counterPost,
      counterStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'AI workflows and product news for modern teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the copy, swap colours and fonts, move icons and resize layouts in the built-in editor.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Start in Three Steps',
      steps: [
        {
          icon: 'shopping-bag',
          title: '01 Purchase',
          body: 'Add it to your library in a click',
        },
        { icon: 'folder-open', title: '02 Open files', body: 'Every page opens in the editor' },
        { icon: 'pencil', title: '03 Customize', body: 'Edit text and colours, then export' },
      ],
    }),
  ],
});
