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
import { MIST } from './palette';
import { flowJams, pilatesBig, profileFrame, workoutCalendar } from './posts';
import {
  morningMeditation,
  stressEmergency,
  sundayPilates,
  treePosePost,
  treePoseStory,
} from './posts-extra';
import { classCalendar, formTips, principles, searchPoses } from './posts-more';

const POSTS = [
  principles,
  formTips,
  pilatesBig,
  flowJams,
  workoutCalendar,
  stressEmergency,
  profileFrame,
  classCalendar,
  searchPoses,
  treePosePost,
  sundayPilates,
];

const LIGHT: SlideTheme = {
  background: '#e8ecee',
  text: '#1e2a33',
  muted: '#3d4b55',
  surface: '#ffffff',
  ink: '#1e2a33',
  brand: MIST.slate,
  accent: MIST.mint,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#070a0c',
  text: '#ffffff',
  muted: '#d1d9de',
};

const handle = 'mistflow.studio';

export const mistFlowPilatesPack = definePack({
  id: 'mist-flow-pilates',
  title: 'Mist Flow Pilates',
  description:
    'Calm yoga and pilates studio posts and stories with schedules, form tips and playlists in mist blue, slate and mint.',
  category: 'lifestyle',
  tags: ['wellness', 'instagram', 'story', 'tips'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    withNodes(
      phoneTrio(
        SQUARE_SIZE,
        LIGHT,
        { title: '68 Editable Studio Posts + Stories', subtitle: 'Yoga & Pilates', handle },
        [flowJams, pilatesBig, workoutCalendar],
      ),
      editorBadge(930, 60, 96, MIST.sage, MIST.ink),
    ),
    phoneChecklist(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Teach with ease', 'Fill every class', 'Build a community', 'Grow memberships'],
      },
      profileFrame,
      [stressEmergency, classCalendar, formTips, principles, searchPoses, flowJams, treePosePost],
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make It Your Own',
        body: 'Change the copy, fonts, colours and photos, then adjust the layout to suit your studio.',
      },
      sundayPilates,
      morningMeditation,
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
      treePosePost,
      treePoseStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bio: 'Pilates and yoga classes for strong, calm bodies. Book online.',
        button: 'Follow',
      },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Update class times, photos and colours, then export posts that are ready to share.',
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
