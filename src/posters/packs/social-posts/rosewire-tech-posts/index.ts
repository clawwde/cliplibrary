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
import { blueprintKeys, clientReviews, folderHero, modularClick, ROSE } from './posts';
import { glassPost, glassStory, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#ece6ea',
  text: '#140c12',
  muted: '#4a3d45',
  surface: '#ffffff',
  ink: '#140c12',
  brand: '#b8235a',
  accent: ROSE.rose,
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'Inter',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: ROSE.black,
  text: '#ffffff',
  muted: '#dccfd6',
  accent: ROSE.rose,
};

const handle = 'rosewire.tech';

export const rosewireTechPostsPack = definePack({
  id: 'rosewire-tech-posts',
  title: 'Rosewire Tech Posts',
  description:
    'Glassy dark tech and SaaS posts and stories lit with rose pink, covering launches, reviews, search, growth and product updates.',
  category: 'social-posts',
  tags: ['saas', 'b2b', 'linkedin', 'instagram', 'story'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '56 Editable Social Posts + Stories',
        subtitle: 'Modern software edition',
        handle,
      },
      [modularClick, blueprintKeys, clientReviews],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Share product news', 'Capture leads', 'Prove your value', 'Convert trials'],
      },
      folderHero,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Sized For Every Feed',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      glassPost,
      glassStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Product updates and playbooks for growing tech teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite headlines, swap colours and fonts, and move any icon or card into place.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How It Works',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Add the pack to your library' },
        { icon: 'mouse', title: '02 Open it', body: 'Launch any design in the editor' },
        { icon: 'download', title: '03 Export', body: 'Edit, then download PNG or PDF' },
      ],
    }),
  ],
});
