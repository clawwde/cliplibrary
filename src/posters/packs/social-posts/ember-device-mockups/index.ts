import {
  beforeAfter,
  canvasSizes,
  editableLaptop,
  howToStart,
  mosaicCover,
  phoneTrio,
  profileFeed,
  type SlideTheme,
  SQUARE_SIZE,
} from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { EMBER } from './devices';
import { editorBadge, phoneChecklist, withNodes } from './listing';
import { assistLaunch, monthlyPlan, performBetter, showcase, smartKit } from './posts';
import {
  bigRelease,
  everyDevice,
  newPage,
  newPageStory,
  newStore,
  upgradeFlow,
} from './posts-more';

const POSTS = [
  performBetter,
  showcase,
  smartKit,
  assistLaunch,
  newPage,
  upgradeFlow,
  monthlyPlan,
  bigRelease,
  everyDevice,
];

const LIGHT: SlideTheme = {
  background: '#ebe9e7',
  text: '#121112',
  muted: '#3f3b3a',
  surface: '#ffffff',
  ink: '#121112',
  brand: EMBER.glow,
  accent: EMBER.glow,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#060506',
  text: '#ffffff',
  muted: '#d9d4d2',
  accent: EMBER.amber,
};

const handle = 'brightloop.app';

export const emberDeviceMockupsPack = definePack({
  id: 'ember-device-mockups',
  title: 'Ember Device Mockups',
  description:
    'Laptop, tablet, phone and monitor mockup posts for SaaS launches and digital products in black and ember orange.',
  category: 'social-posts',
  tags: ['mockup', 'saas', 'product', 'instagram', 'story'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        {
          title: '52 Editable Social Posts + Stories',
          subtitle: 'Laptop & Tablet Mockups',
          handle,
        },
        [performBetter, assistLaunch, showcase],
      ),
      editorBadge(930, 60, 96, EMBER.amber, EMBER.glow),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inform users', 'Gain sign-ups', 'Show features', 'Grow sales'],
      },
      smartKit,
      [bigRelease, monthlyPlan, upgradeFlow, everyDevice, newPage, performBetter, assistLaunch],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Post Yours',
        body: 'Change the words, fonts, colours, screens and layout to match your product.',
      },
      newPage,
      newStore,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Canvas Sizes',
        postLabel: 'Feed post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      newPage,
      newPageStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Tools that help small teams ship faster.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap screens, headlines and colours, then export a post that is ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Grab the kit', body: 'Add the pack to your library' },
        { icon: 'mouse', title: '02 Open a design', body: 'Every post opens in the editor' },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit, then export PNG, JPG or PDF' },
      ],
    }),
  ],
});
