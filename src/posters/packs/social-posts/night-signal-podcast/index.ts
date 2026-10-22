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
import { editorBadge, phoneChecklist, withNodes } from './listing';
import { SIGNAL } from './palette';
import { audiencePulse, inNumbers, lateNight, onAirNightly, thankYou } from './posts';
import {
  countdown,
  liveQa,
  meetTheHost,
  tuneIn,
  tuneInStory,
  weeklyAfter,
  weeklyBefore,
} from './posts-more';

const POSTS = [
  onAirNightly,
  thankYou,
  lateNight,
  audiencePulse,
  meetTheHost,
  countdown,
  inNumbers,
  tuneIn,
  liveQa,
];

const FEED = [...POSTS, weeklyBefore];

const LIGHT: SlideTheme = {
  background: '#e8e6ee',
  text: '#15121f',
  muted: '#3f3a52',
  surface: '#ffffff',
  ink: '#15121f',
  brand: SIGNAL.plum,
  accent: SIGNAL.flame,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#08060f',
  text: '#ffffff',
  muted: '#d4d0e2',
  accent: SIGNAL.amber,
};

const handle = 'lumen.radio';

export const nightSignalPodcastPack = definePack({
  id: 'night-signal-podcast',
  title: 'Night Signal Podcast',
  description:
    'Episode drops, host intros, listener stats and live Q&A posts for a podcast or radio show in midnight indigo and amber.',
  category: 'social-posts',
  tags: ['podcast', 'instagram', 'story', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '64 Editable Social Posts + Stories', subtitle: 'Podcast & Radio Shows', handle },
        [audiencePulse, onAirNightly, thankYou],
      ),
      editorBadge(930, 60, 96, SIGNAL.amber, SIGNAL.flame),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Grow listeners', 'Book guests', 'Promote episodes', 'Win sponsors'],
      },
      lateNight,
      [inNumbers, countdown, tuneIn, liveQa, meetTheHost, thankYou, audiencePulse],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Post Yours',
        body: 'Change the words, fonts, colours, photos and layout to match your show.',
      },
      weeklyBefore,
      weeklyAfter,
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
      tuneIn,
      tuneInStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Late night talk, new music and guests every Friday.', button: 'Follow' },
      FEED,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Swap hosts, stats, colours and photos, then export a post that is ready to share.',
      },
      FEED,
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
