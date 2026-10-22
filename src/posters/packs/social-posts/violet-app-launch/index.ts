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
  type Nodes,
  phoneTrio,
  phoneWithMosaic,
  profileFeed,
  rect,
  type SlideTheme,
  SQUARE_SIZE,
  shadow,
} from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { SUNSET, VIOLET } from './device';
import {
  ALERTS,
  addsUp,
  downloadApp,
  growth,
  growthStory,
  ideasHappen,
  POSTS,
  textAlerts,
  workspace,
} from './posts';

const LIGHT: SlideTheme = {
  background: '#ecebf3',
  text: VIOLET.ink,
  muted: '#3f3a5a',
  surface: '#ffffff',
  ink: VIOLET.ink,
  brand: VIOLET.brand,
  accent: VIOLET.accent,
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'Plus Jakarta Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#07060f',
  text: '#ffffff',
  muted: '#d6d3e6',
  accent: VIOLET.soft,
};

const handle = 'nimbly.app';

const withOverlay =
  (build: () => Page, ...nodes: Nodes[]) =>
  (): Page => {
    const base = build();
    return { ...base, elements: [...base.elements, ...flatten(nodes)] };
  };

const editorBadge = group(
  rect(900, 60, 120, 120, linear(135, VIOLET.brand, VIOLET.accent), {
    cornerRadius: 30,
    name: 'Editor badge',
    ...shadow(24, 10),
  }),
  icon('wand-sparkles', 930, 90, 60, '#ffffff'),
);

export const violetAppLaunchPack = definePack({
  id: 'violet-app-launch',
  title: 'Violet App Launch',
  description:
    'Phone mockup posts and stories for a mobile app or tech startup launch in violet and coral.',
  category: 'social-posts',
  tags: ['saas', 'instagram', 'story', 'mockup', 'phone'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withOverlay(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '40 App Launch Posts', subtitle: 'Post + story phone mockups', handle },
        [addsUp, downloadApp, ideasHappen],
      ),
      editorBadge,
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Announce features', 'Win more signups', 'Grow daily users', 'Boost reviews'],
      },
      workspace,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Post Yours',
        body: 'Swap the copy, colours, fonts and icons, then nudge the layout to match your brand.',
      },
      ALERTS,
      textAlerts(SUNSET),
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
      growth,
      growthStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Tools that make busy teams feel calm.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change words, fonts, colours and icons, then fine tune the layout in minutes.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-cart', title: '01 Check out', body: 'Complete your order in a minute' },
        { icon: 'download', title: '02 Open the file', body: 'Grab the link from your download' },
        { icon: 'pencil', title: '03 Start editing', body: 'Open the pack and make it yours' },
      ],
    }),
  ],
});
