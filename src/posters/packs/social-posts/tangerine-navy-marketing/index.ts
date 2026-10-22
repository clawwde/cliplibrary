import {
  beforeAfter,
  canvasSizes,
  editableLaptop,
  howToStart,
  mosaicCover,
  phoneTrio,
  phoneWithMosaic,
  profileFeed,
  type SlideTheme,
  SQUARE_SIZE,
} from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { brandTraps } from './posts';
import { gamePlanCobalt, gamePlanTangerine, spotlightPost, spotlightStory } from './posts-mid';
import { clientHappiness, POSTS } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#f1ebe4',
  text: '#0f1b3d',
  muted: '#3d4762',
  surface: '#ffffff',
  ink: '#0f1b3d',
  brand: '#ff7a1a',
  accent: '#ffb27a',
  headFont: 'Urbanist',
  bodyFont: 'Work Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#0a1128',
  text: '#ffffff',
  muted: '#dfe3ee',
  accent: '#ff8f3d',
};

const handle = 'brightmark.studio';

export const tangerineNavyMarketingPack = definePack({
  id: 'tangerine-navy-marketing',
  title: 'Tangerine Marketing Posts',
  description:
    'Bold B2B marketing social posts and stories in tangerine, navy and cream, with checklists, reviews, hiring and strategy layouts.',
  category: 'social-posts',
  tags: ['b2b', 'small-business', 'instagram', 'story', 'review'],
  theme: 'light',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '52 Editable Social Posts + Stories', subtitle: 'Marketing Edition', handle },
      [brandTraps, spotlightPost, gamePlanTangerine],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: [
          'Teach your audience',
          'Collect more leads',
          'Build credibility',
          'Sell with ease',
        ],
      },
      clientHappiness,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Make Every Post Yours',
        body: 'Change the text, colours, fonts and photos so the whole set matches your brand.',
      },
      gamePlanTangerine,
      gamePlanCobalt,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Feed and Story Formats',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 x 1350 px',
        storySize: '1080 x 1920 px',
        handle,
      },
      spotlightPost,
      spotlightStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Marketing ideas and brand tips for growing teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit it all online',
        body: 'Update the words, colours, fonts and icons, then adjust the layout to match your style.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Quick Start Guide',
      steps: [
        { icon: 'shopping-bag', title: '01 Buy', body: 'Grab the bundle and check out' },
        { icon: 'folder-open', title: '02 Open', body: 'Find every design in your library' },
        { icon: 'palette', title: '03 Style', body: 'Add your brand and publish' },
      ],
    }),
  ],
});
