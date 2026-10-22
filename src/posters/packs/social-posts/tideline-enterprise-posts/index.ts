import {
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
import { analyticsBars, skillPoll, websiteLive } from './posts';
import { POSTS, stayAhead, stickyPost, stickyStory } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e3eceb',
  text: '#0a1f1e',
  muted: '#2f4a47',
  surface: '#ffffff',
  ink: '#0a1f1e',
  brand: '#0f766e',
  accent: '#14b8a6',
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'Plus Jakarta Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#040a0a',
  text: '#ffffff',
  muted: '#cfdedc',
  accent: '#5eead4',
};

const handle = 'tideline.systems';

export const tidelineEnterprisePostsPack = definePack({
  id: 'tideline-enterprise-posts',
  title: 'Tideline Enterprise Posts',
  description:
    'Enterprise B2B social posts and stories in deep teal and aqua, with events, polls, stats, reviews and launch graphics.',
  category: 'social-posts',
  tags: ['b2b', 'corporate', 'instagram', 'story', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, LIGHT, POSTS, [], { columns: 4 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      {
        title: '30 Editable Social Posts + Stories',
        subtitle: 'Enterprise edition',
        handle,
      },
      [analyticsBars, websiteLive, skillPoll],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Educate buyers', 'Win more demos', 'Build authority', 'Close bigger deals'],
      },
      stayAhead,
      POSTS,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Ready-Made Formats',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      stickyPost,
      stickyStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Enterprise growth ideas for modern revenue teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the copy, swap colours and fonts, move icons and resize layouts to match your brand.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        {
          icon: 'shopping-cart',
          title: '01 Grab the pack',
          body: 'Add it to your library in one click',
        },
        {
          icon: 'download',
          title: '02 Open the files',
          body: 'Every design opens straight in the editor',
        },
        {
          icon: 'pencil',
          title: '03 Make it yours',
          body: 'Change text, colours and photos, then export',
        },
      ],
    }),
  ],
});
