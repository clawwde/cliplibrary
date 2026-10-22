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
import { automationCard, clientReviews, wifiSpeed } from './posts';
import { architect, launchPost, launchStory, POSTS, wordsBlue, wordsGreen } from './posts-more';

const LIGHT: SlideTheme = {
  background: '#e6e9f0',
  text: '#0b1020',
  muted: '#3c4560',
  surface: '#ffffff',
  ink: '#0b1020',
  brand: '#3d7bff',
  accent: '#8ab8ff',
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#04050b',
  text: '#ffffff',
  muted: '#cbd3e6',
  accent: '#8ab8ff',
};

const handle = 'kestrel.ai';

export const voltageBlueAiPostsPack = definePack({
  id: 'voltage-blue-ai-posts',
  title: 'Voltage Blue AI Posts',
  description:
    'Dark electric blue AI and SaaS social posts and stories with launches, reviews, stats, webinars and bold type.',
  category: 'social-posts',
  tags: ['ai', 'saas', 'instagram', 'story', 'neon'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    mosaicCover(SQUARE_SIZE, DARK, POSTS, [], { columns: 5 }),
    phoneTrio(
      SQUARE_SIZE,
      LIGHT,
      { title: '68 Editable Social Posts + Stories', subtitle: 'SaaS and AI tech', handle },
      [wifiSpeed, automationCard, clientReviews],
    ),
    phoneWithMosaic(
      SQUARE_SIZE,
      LIGHT,
      {
        handle,
        bullets: ['Explain your AI', 'Earn trust fast', 'Launch with hype', 'Convert followers'],
      },
      architect,
      POSTS,
    ),
    beforeAfter(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Fully Customisable',
        body: 'Edit text, change fonts or colours, swap icons and adjust the layout to fit your style.',
        before: 'Before',
        after: 'After',
      },
      wordsBlue,
      wordsGreen,
    ),
    canvasSizes(
      SQUARE_SIZE,
      LIGHT,
      {
        title: 'Post and Story Sizes',
        postLabel: 'Feed Post',
        storyLabel: 'Story',
        postSize: '1080 × 1350 px',
        storySize: '1080 × 1920 px',
        handle,
      },
      launchPost,
      launchStory,
    ),
    profileFeed(
      SQUARE_SIZE,
      LIGHT,
      { handle, bio: 'Automation and AI tools for fast-moving teams.', button: 'Follow' },
      POSTS,
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite headlines, recolour glows and gradients, and move every element where you want it.',
      },
      POSTS,
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How It Works',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Complete your order in a minute' },
        { icon: 'layout-grid', title: '02 Pick a post', body: 'Browse the set inside the editor' },
        { icon: 'pen-tool', title: '03 Edit freely', body: 'Make it yours and export instantly' },
      ],
    }),
  ],
});
