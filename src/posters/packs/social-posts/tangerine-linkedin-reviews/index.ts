import { definePack, LANDSCAPE } from '../../../pack';
import type { ListingTheme } from './listing';
import { listingPages } from './listing-more';
import {
  clientEnvelope,
  clientStory,
  LAGOON,
  newspaper,
  ORCHID,
  photoQuote,
  reviewWord,
  TANGERINE,
  typewriter,
} from './posts';

const THEME: ListingTheme = {
  page: '#090b16',
  brand: TANGERINE.brand,
  brandText: '#f0521f',
  onBrand: '#ffffff',
  accent: '#ffb020',
  ink: TANGERINE.ink,
  muted: '#5b6178',
  folder: ['#ffb38f', '#e8471c'],
  frame: '#ffc7b0',
  strip: '#fff1e8',
  storyFill: TANGERINE.brand,
  headFont: 'Outfit',
  headScale: 1,
  bodyFont: 'Inter',
  bodyScale: 1,
};

const word = reviewWord(TANGERINE);
const paper = newspaper(TANGERINE);
const quote = photoQuote(TANGERINE);
const keys = typewriter(TANGERINE);
const envelope = clientEnvelope(TANGERINE);

export const tangerineLinkedinReviewsPack = definePack({
  id: 'tangerine-linkedin-reviews',
  title: 'Tangerine Client Reviews',
  description:
    'Testimonial, press clipping, photo quote and envelope review posts in tangerine and navy, with a story.',
  category: 'social-posts',
  tags: ['review', 'linkedin', 'photo', 'small-business'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      title: 'Client Reviews',
      channel: [{ content: 'LinkedIn Posts for ' }, { content: 'Agencies', fill: THEME.brandText }],
      count: [
        { content: '5 ' },
        { content: 'Premium', fill: THEME.brandText, weight: 800 },
        { content: ' social posts + a story' },
      ],
      bonus: 'YOUR BONUS IS INSIDE  >  KEEP SWIPING',
      showcase: [{ content: 'Premium ', glow: true }, { content: 'Testimonial Posts' }],
      showcaseNote: 'Polished layouts that let happy clients do the talking',
      editTitle: 'Editable\nReview Posts\nRight in\nYour Browser',
      editLines: ['Make it Yours\nin Minutes', 'Every layer editable'],
      steps: [
        'Download the pack right after checkout',
        'Drop in your reviews, photos and colours',
        'Export and post on every channel',
      ],
      stepsNote: 'No design skills needed: everything happens in the built-in editor.',
      offers: [
        'Buy one pack, pick another one free.*',
        'Just message us after checkout.',
        'LIMITED TIME: the offer ends soon',
      ],
      offerNote: '*The free pack must be the same price or lower.',
      studio: ['Brightfold', 'Studio'],
      tagline: 'More Than a Template',
      folder: ['Review Kit', '19.2 MB'],
      host: 'woman-portrait-6',
    },
    {
      posts: [word, envelope, quote, paper, keys],
      mosaic: [envelope, quote, word, paper, keys, quote, envelope],
      feature: word,
      story: clientStory(TANGERINE),
      showcase: [word, paper, quote, keys, envelope],
      edits: [
        [word, reviewWord(LAGOON)],
        [envelope, clientEnvelope(ORCHID)],
      ],
    },
  ),
});
