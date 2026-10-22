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
import { creativeTeams, growMore, HARBOR, transforming } from './posts';
import { messaging, messagingStory, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e8ebf1',
  text: HARBOR.navy,
  muted: '#475569',
  surface: '#ffffff',
  ink: HARBOR.navy,
  brand: HARBOR.navy,
  accent: HARBOR.coral,
  headFont: 'Sora',
  bodyFont: 'Inter',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#060a14',
  text: '#ffffff',
  muted: '#cbd5e1',
};

const handle = 'northbeam.co';

export const harborB2bMarketingPack = definePack({
  id: 'harbor-b2b-marketing',
  title: 'Harbor B2B Marketing',
  description:
    'Modern B2B marketing posts and stories in deep navy, coral and cream for agencies and SaaS teams.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'photo'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '90 Editable B2B Posts + Stories', subtitle: 'Marketing kit', handle },
      [transforming, creativeTeams, growMore],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Educate buyers', 'Capture leads', 'Build momentum', 'Close more deals'],
      },
      growMore,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Canvas Sizes',
        postLabel: 'Feed post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      messaging,
      messagingStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bio: 'Templates and playbooks for B2B marketers who ship.',
        button: 'Follow',
      },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change the text, swap fonts and colours, replace icons and adjust any layout to match your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Check out', body: 'Complete your order in a minute' },
        {
          icon: 'download',
          title: '02 Get the link',
          body: 'Open the download page and grab your file',
        },
        {
          icon: 'pencil',
          title: '03 Start editing',
          body: 'Open any design in the editor instantly',
        },
      ],
    }),
  ],
});
