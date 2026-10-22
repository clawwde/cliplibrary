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
import { bankingChoice, fasterLoans, NV, smarterPlans, webinarSteps } from './posts';
import { futureDigitalPost, futureDigitalStory, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e9eeed',
  text: '#0b2a30',
  muted: '#3d5257',
  surface: '#ffffff',
  ink: '#0b2a30',
  brand: NV.teal,
  accent: NV.coral,
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'DM Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050707',
  text: '#ffffff',
  muted: '#d3dcdb',
};

const handle = 'northvale.capital';

export const tealCoralFinancePack = definePack({
  id: 'teal-coral-finance',
  title: 'Teal Coral Finance',
  description:
    'Corporate finance and banking posts and stories in deep teal and coral, with loans, reviews, security and data insight layouts.',
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
        title: '50 Editable Social Posts + Stories',
        subtitle: 'Corporate finance edition',
        handle,
      },
      [bankingChoice, fasterLoans, smarterPlans],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inform clients', 'Win new leads', 'Build trust', 'Grow accounts'],
      },
      webinarSteps,
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
      futureDigitalPost,
      futureDigitalStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Money tips, product news and client stories.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change text, fonts and colours, swap icons and photos, and rearrange any layout.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-bag', title: '01 Get the pack', body: 'Add the bundle to your library' },
        { icon: 'folder-open', title: '02 Open a design', body: 'Every post opens in the editor' },
        { icon: 'pencil', title: '03 Customise', body: 'Edit, then export in one click' },
      ],
    }),
  ],
});
