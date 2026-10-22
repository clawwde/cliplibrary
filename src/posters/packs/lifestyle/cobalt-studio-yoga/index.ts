import {
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
import { CO } from './palette';
import { dailyReminder, eatSleep, letsFlow, stopBreathe, yogaVertical } from './posts';
import { yogaLettersPost, yogaLettersStory } from './posts-extra';
import { benefits, moodYoga, toggles, unwind, yogaSchedule } from './posts-more';

const POSTS = [
  stopBreathe,
  yogaVertical,
  moodYoga,
  unwind,
  letsFlow,
  eatSleep,
  yogaSchedule,
  dailyReminder,
  yogaLettersPost,
  benefits,
  toggles,
];

const LIGHT: SlideTheme = {
  background: '#e9eaee',
  text: '#0d0f1a',
  muted: '#3a3f52',
  surface: '#ffffff',
  ink: '#0d0f1a',
  brand: CO.cobalt,
  accent: CO.lilac,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#05060b',
  text: '#ffffff',
  muted: '#d4d6e0',
  accent: '#8f9dff',
};

const handle = 'driftwood.yoga';

export const cobaltStudioYogaPack = definePack({
  id: 'cobalt-studio-yoga',
  title: 'Cobalt Studio Yoga',
  description:
    'Bold yoga and fitness studio posts and stories with schedules, reminders and big type in cobalt blue, ink and lilac.',
  category: 'lifestyle',
  tags: ['wellness', 'instagram', 'story', 'photo'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '50 Editable Studio Posts + Stories', subtitle: 'Yoga & Fitness', handle },
        [stopBreathe, letsFlow, dailyReminder],
      ),
      editorBadge(930, 60, 96, CO.cobalt, CO.ink),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Inspire students', 'Fill your classes', 'Grow your reach', 'Sell more passes'],
      },
      yogaVertical,
      [benefits, toggles, yogaSchedule, eatSleep, unwind, moodYoga, letsFlow],
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
      yogaLettersPost,
      yogaLettersStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bio: 'Strong bodies, quiet minds. Yoga and mobility classes daily.',
        button: 'Follow',
      },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change class times, photos, words and colours, then export posts ready to share.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Start',
      steps: [
        { icon: 'shopping-cart', title: '01 Get the pack', body: 'Add it to your design library' },
        {
          icon: 'mouse',
          title: '02 Open a post',
          body: 'Each design loads in the built-in editor',
        },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit, then export PNG, JPG or PDF' },
      ],
    }),
  ],
});
