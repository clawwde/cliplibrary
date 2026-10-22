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
  CLAY,
  doorHanger,
  marketPortrait,
  reviewWords,
  seoChecklist,
  TIDE,
  TIME_WAITS,
  timeWaits,
} from './posts';
import { consistencyPost, consistencyStory, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#ece7e4',
  text: '#1f1410',
  muted: '#4a3a34',
  surface: '#ffffff',
  ink: '#1f1410',
  brand: CLAY.brand,
  accent: '#e48a6a',
  headFont: 'Sora',
  bodyFont: 'DM Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#0b0605',
  text: '#ffffff',
  muted: '#e5d9d4',
  accent: '#f0a183',
};

const handle = 'clayhouse.co';

const editorBadge = group(
  rect(930, 60, 96, 96, linear(135, '#f0a183', CLAY.deep), {
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

export const clayGrowthMarketingPack = definePack({
  id: 'clay-growth-marketing',
  title: 'Clay Growth Marketing',
  description:
    'Modern marketing posts and stories in terracotta and cream, with reviews, checklists, webinars, quizzes and growth tips.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'tips'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withBadge(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '68 Editable Social Posts + Stories', subtitle: 'Modern Marketing', handle },
        [marketPortrait, doorHanger, seoChecklist],
      ),
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Reach your audience', 'Win more leads', 'Build momentum', 'Lift your sales'],
      },
      reviewWords,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Rewrite the copy, switch fonts and colours, swap icons and move anything to suit your style.',
      },
      TIME_WAITS,
      timeWaits(TIDE, ['Own Today', 'thrive tomorrow', 'Begin now']),
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
      consistencyPost,
      consistencyStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Marketing ideas and growth tips for modern teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change the words, fonts, colours and icons, then rearrange the layout to fit your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-bag', title: '01 Checkout', body: 'Add the pack to your library' },
        { icon: 'folder-open', title: '02 Open it', body: 'Every post loads in the editor' },
        { icon: 'pencil', title: '03 Edit it', body: 'Customise, export and post' },
      ],
    }),
  ],
});
