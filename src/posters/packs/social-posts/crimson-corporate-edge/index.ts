import { linear, type Page } from '@/design';
import {
  beforeAfter,
  canvasSizes,
  editableLaptop,
  flatten,
  group,
  howToStart,
  icon,
  mosaicCover,
  phoneTrio,
  phoneWithMosaic,
  profileFeed,
  rect,
  type SlideTheme,
  SQUARE_SIZE,
  shadow,
} from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  CRIMSON,
  clockPost,
  sevenHundred,
  spotlightPost,
  spotlightStory,
  whatYouNeed,
} from './posts';
import { calendarGrid, milestones, seventyPercent } from './posts-extra';
import {
  AMBER_INTERACT,
  decisionSteps,
  departmentsPie,
  hiring,
  INTERACT_POST,
  interact,
} from './posts-more';

const POSTS = [
  sevenHundred,
  whatYouNeed,
  clockPost,
  spotlightPost,
  INTERACT_POST,
  departmentsPie,
  decisionSteps,
  hiring,
  milestones,
  calendarGrid,
  seventyPercent,
];

const LIGHT: SlideTheme = {
  background: '#ece8e9',
  text: '#1a0b0e',
  muted: '#4a3a3e',
  surface: '#ffffff',
  ink: '#1a0b0e',
  brand: CRIMSON.red,
  accent: CRIMSON.bright,
  headFont: 'Lexend',
  bodyFont: 'Lexend',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#080203',
  text: '#ffffff',
  muted: '#e9d9dc',
  accent: '#ff6b7f',
};

const handle = 'redline.partners';

const editorBadge = group(
  rect(930, 60, 96, 96, linear(135, '#ff6b7f', CRIMSON.wine), {
    cornerRadius: 26,
    name: 'Editor badge',
    ...shadow(20, 8, 'rgba(0,0,0,0.2)'),
  }),
  icon('wand-sparkles', 954, 84, 48, '#ffffff'),
);

const withBadge = (base: () => Page) => (): Page => {
  const built = base();
  return { ...built, elements: [...built.elements, ...flatten([editorBadge])] };
};

export const crimsonCorporateEdgePack = definePack({
  id: 'crimson-corporate-edge',
  title: 'Crimson Corporate Edge',
  description:
    'Corporate business posts and stories in crimson and blush with mono photos, stats, hiring, planning and team spotlights.',
  category: 'social-posts',
  tags: ['corporate', 'b2b', 'linkedin', 'story', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withBadge(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '64 Editable Social Posts + Stories', subtitle: 'Corporate Business', handle },
        [whatYouNeed, clockPost, decisionSteps],
      ),
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inform clients', 'Attract leads', 'Gain traction', 'Close more sales'],
      },
      sevenHundred,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Edit every word, swap fonts and colours, change icons and rework the layout in minutes.',
      },
      INTERACT_POST,
      interact(AMBER_INTERACT, ['Learn how to', 'Connect', 'with every client']),
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Two Canvas Sizes',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      spotlightPost,
      spotlightStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Strategy, people and results for modern companies.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change words, colours, fonts and photos, then export posts that fit your company.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'credit-card', title: '01 Checkout', body: 'Complete your order securely' },
        { icon: 'folder-open', title: '02 Open it', body: 'Find the pack in your library' },
        { icon: 'pencil', title: '03 Edit it', body: 'Customise and download' },
      ],
    }),
  ],
});
