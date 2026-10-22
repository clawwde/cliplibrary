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
  dayPost,
  everythingCtrl,
  MONDAY,
  SUNSET,
  startImpact,
  TEAL_DAY,
  webinarSpeaker,
} from './posts';
import { stagesPost, stagesStory, weAreHiring, wordStack } from './posts-extra';
import { didYouKnow, mythFact, peopleStat, roiStats } from './posts-more';

const POSTS = [
  startImpact,
  MONDAY,
  webinarSpeaker,
  everythingCtrl,
  mythFact,
  didYouKnow,
  peopleStat,
  roiStats,
  stagesPost,
  weAreHiring,
  wordStack,
];

const LIGHT: SlideTheme = {
  background: '#ece9e7',
  text: '#16120f',
  muted: '#4a413b',
  surface: '#ffffff',
  ink: '#16120f',
  brand: SUNSET.orange,
  accent: SUNSET.ember,
  headFont: 'Urbanist',
  bodyFont: 'Urbanist',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#070504',
  text: '#ffffff',
  muted: '#e6dcd5',
  accent: SUNSET.glow,
};

const handle = 'emberline.co';

const editorBadge = group(
  rect(930, 60, 96, 96, linear(135, SUNSET.glow, SUNSET.charcoal), {
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

export const sunsetOpsCorporatePack = definePack({
  id: 'sunset-ops-corporate',
  title: 'Sunset Ops Corporate',
  description:
    'Corporate business posts and stories in sunset orange and charcoal, with stats, myths, webinars, hiring and bold type.',
  category: 'social-posts',
  tags: ['corporate', 'b2b', 'linkedin', 'story', 'photo'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withBadge(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '68 Editable Social Posts + Stories', subtitle: 'Corporate Business', handle },
        [webinarSpeaker, MONDAY, everythingCtrl],
      ),
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Educate your market', 'Win new leads', 'Build traction', 'Boost revenue'],
      },
      startImpact,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Rewrite any text, change fonts or colours, swap icons and tune the layout to your style.',
      },
      MONDAY,
      dayPost(TEAL_DAY, ['TUE', "LET'S MAKE IT COUNT", 'Get in touch', 'emberline.co']),
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
      stagesPost,
      stagesStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Operations and growth for ambitious teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Switch the copy, colours, fonts and photos, then export a post that feels like you.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Checkout', body: 'Place your order in seconds' },
        { icon: 'cloud-upload', title: '02 Open it', body: 'The pack lands in your library' },
        { icon: 'pencil', title: '03 Edit it', body: 'Personalise and download' },
      ],
    }),
  ],
});
