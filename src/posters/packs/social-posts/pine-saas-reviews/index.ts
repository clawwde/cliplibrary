import { definePack, LANDSCAPE } from '../../../pack';
import type { ListingTheme } from './listing';
import { listingPages } from './listing-more';
import {
  COBALT,
  newspaper,
  PINE,
  photoQuote,
  reviewWord,
  SUNSET,
  typewriter,
  userEnvelope,
  userStory,
} from './posts';

const THEME: ListingTheme = {
  page: '#050b09',
  brand: PINE.brand,
  brandText: '#0f8a6a',
  onBrand: '#ffffff',
  accent: '#7cf2c2',
  ink: PINE.deep,
  muted: '#4f6b61',
  folder: ['#8ff0c8', '#0f8a6a'],
  frame: '#a7f3d0',
  strip: '#ecfdf5',
  storyFill: PINE.brand,
  headFont: 'Plus Jakarta Sans',
  headScale: 1,
  bodyFont: 'Inter',
  bodyScale: 1,
};

const word = reviewWord(PINE);
const paper = newspaper(PINE);
const quote = photoQuote(PINE);
const keys = typewriter(PINE);
const envelope = userEnvelope(PINE);

export const pineSaasReviewsPack = definePack({
  id: 'pine-saas-reviews',
  title: 'Pine SaaS Reviews',
  description:
    'User review, release-note clipping, team photo quote and envelope posts for SaaS brands in pine and mint.',
  category: 'social-posts',
  tags: ['review', 'saas', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      title: 'User Reviews',
      channel: [{ content: 'SaaS and Tech ' }, { content: 'Social Kit', fill: THEME.brandText }],
      count: [
        { content: '5 ' },
        { content: 'Premium', fill: THEME.brandText, weight: 800 },
        { content: ' social posts + a story' },
      ],
      bonus: 'THERE IS A BONUS  >  SWIPE TO FIND IT',
      showcase: [{ content: 'Premium ', glow: true }, { content: 'User Review Posts' }],
      showcaseNote: 'Clean layouts that turn product love into proof',
      editTitle: 'Editable\nSaaS Posts\nin the\nBuilt-in Editor',
      editLines: ['Customize in\nMinutes', '100% editable'],
      steps: [
        'Instant download once you check out',
        'Paste in user quotes, logos and colours',
        'Export and schedule on every channel',
      ],
      stepsNote: 'No design tools to learn: edit everything in your browser.',
      offers: [
        'Get one pack, choose a second one free.*',
        'Send us a quick note after purchase.',
        'LIMITED TIME: claim it while it lasts',
      ],
      offerNote: '*The free pack must be the same price or lower.',
      studio: ['Stackwise', 'Studio'],
      tagline: 'More Than a Template',
      folder: ['User Love', '17.9 MB'],
      host: 'man-portrait-1',
    },
    {
      posts: [word, envelope, quote, paper, keys],
      mosaic: [envelope, quote, word, paper, keys, quote, envelope],
      feature: word,
      story: userStory(PINE),
      showcase: [word, paper, quote, keys, envelope],
      edits: [
        [paper, newspaper(SUNSET)],
        [quote, photoQuote(COBALT)],
      ],
    },
  ),
});
