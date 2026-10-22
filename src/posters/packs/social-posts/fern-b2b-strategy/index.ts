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
import { bigPercent, crossword, FERN, leadTrend, watchWebinar } from './posts';
import { clientFeedback, stillMatters, whyChooseUs } from './posts-extra';
import {
  CORAL_GROW,
  clipboardGoals,
  GROW_POST,
  growWithUs,
  monthEvents,
  mythPost,
  mythStory,
} from './posts-more';

const POSTS = [
  crossword,
  leadTrend,
  watchWebinar,
  bigPercent,
  monthEvents,
  clipboardGoals,
  GROW_POST,
  mythPost,
  stillMatters,
  clientFeedback,
  whyChooseUs,
];

const LIGHT: SlideTheme = {
  background: '#e7ece9',
  text: '#0f1f18',
  muted: '#35473f',
  surface: '#ffffff',
  ink: '#0f1f18',
  brand: FERN.forest,
  accent: FERN.fern,
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'Plus Jakarta Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050a08',
  text: '#ffffff',
  muted: '#d3e0d9',
  brand: FERN.fern,
  accent: '#8fd3ac',
};

const handle = 'fernworks.co';

const editorBadge = group(
  rect(930, 60, 96, 96, linear(135, '#8fd3ac', FERN.deep), {
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

export const fernB2bStrategyPack = definePack({
  id: 'fern-b2b-strategy',
  title: 'Fern B2B Strategy',
  description:
    'B2B marketing posts and stories in forest and mint, with puzzles, events, stats, webinars and client feedback.',
  category: 'social-posts',
  tags: ['b2b', 'linkedin', 'instagram', 'story', 'stats'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withBadge(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '68 Editable Social Posts + Stories', subtitle: 'B2B Strategy', handle },
        [leadTrend, watchWebinar, bigPercent],
      ),
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inform buyers', 'Generate leads', 'Earn trust', 'Grow revenue'],
      },
      crossword,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Edit the text, change fonts or colours, swap photos and icons, and reshape the layout.',
      },
      GROW_POST,
      growWithUs(CORAL_GROW, '#KeepGrowing'),
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
      mythPost,
      mythStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'B2B strategy, content and growth for busy teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Update text, colours, fonts and photos, then download posts that match your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Checkout', body: 'Add the bundle to your account' },
        { icon: 'layout-grid', title: '02 Pick one', body: 'Choose a post from the pack' },
        { icon: 'pen-tool', title: '03 Customise', body: 'Edit it and export in a click' },
      ],
    }),
  ],
});
