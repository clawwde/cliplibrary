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
import { clientSays, marketPortrait, seoFolders, topOnePercent, ultimateMove, VOLT } from './posts';
import {
  didYouKnow,
  eventsList,
  guessWord,
  guidePost,
  guideStory,
  LIME_LOCKERS,
  lockers,
  talkTalk,
  VIOLET_LOCKER,
} from './posts-more';

const POSTS = [
  ultimateMove,
  seoFolders,
  clientSays,
  topOnePercent,
  talkTalk,
  marketPortrait,
  guessWord,
  eventsList,
  LIME_LOCKERS,
  guidePost,
  didYouKnow,
];

const LIGHT: SlideTheme = {
  background: '#e9e9e4',
  text: '#0d0d0d',
  muted: '#3a3a36',
  surface: '#ffffff',
  ink: '#0d0d0d',
  brand: VOLT.black,
  accent: VOLT.lime,
  headFont: 'Manrope',
  bodyFont: 'Manrope',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d4d4cf',
  brand: '#7a9a0c',
  accent: VOLT.lime,
};

const handle = 'voltlab.studio';

const editorBadge = group(
  rect(930, 60, 96, 96, linear(135, VOLT.lime, '#2f3a05'), {
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

export const voltBoldMarketingPack = definePack({
  id: 'volt-bold-marketing',
  title: 'Volt Bold Marketing',
  description:
    'Loud marketing posts and stories in electric lime and black, with quizzes, reviews, event lists and bold type.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'quiz'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withBadge(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '68 Editable Social Posts + Stories', subtitle: 'Bold Marketing', handle },
        [seoFolders, eventsList, didYouKnow],
      ),
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Spark conversations', 'Capture leads', 'Grow your reach', 'Close more deals'],
      },
      ultimateMove,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Change the text, fonts and colours, swap icons and adjust the layout to match your brand.',
      },
      LIME_LOCKERS,
      lockers(VIOLET_LOCKER, ['NEW', 'TEAM', 'HOURS', 'JOIN THE FUN']),
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
      guidePost,
      guideStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Bold ideas and playbooks for growing brands.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the copy, recolour the shapes and swap the photos without any design skills.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Checkout', body: 'Grab the pack in one click' },
        { icon: 'download', title: '02 Open file', body: 'Load any post in the editor' },
        { icon: 'pencil', title: '03 Customise', body: 'Make it yours and export' },
      ],
    }),
  ],
});
