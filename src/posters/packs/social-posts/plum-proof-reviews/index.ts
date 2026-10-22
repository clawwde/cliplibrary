import { definePack, LANDSCAPE } from '../../../pack';
import {
  coverPage,
  deliverablesPage,
  editablePage,
  type ListingStyle,
  showcasePage,
} from './listing';
import { bonusPage, brandPage, howItWorksPage } from './listing-more';
import {
  clientsSay,
  envelopeReviews,
  PLUM,
  photoQuote,
  reviewStory,
  reviewWord,
  SPRUCE,
  typewriterScroll,
} from './posts';

const STYLE: ListingStyle = {
  background: '#0d0818',
  text: '#ffffff',
  muted: '#b9aecf',
  ink: PLUM.ink,
  brand: PLUM.brand,
  brandText: '#ffffff',
  highlight: PLUM.accent,
  strip: '#f3f0f8',
  folderFrom: '#c4b5fd',
  folderTo: '#7c3aed',
  badgeFrom: '#f472b6',
  badgeTo: '#6366f1',
  head: 'Outfit',
  body: 'DM Sans',
};

const WORD = reviewWord(PLUM);
const PAPER = clientsSay(PLUM);
const QUOTE = photoQuote(PLUM);
const SCROLL = typewriterScroll(PLUM);
const ENVELOPE = envelopeReviews(PLUM);

export const plumProofReviewsPack = definePack({
  id: 'plum-proof-reviews',
  title: 'Plum Proof Reviews',
  description:
    'Customer review and testimonial posts for small businesses in violet, ink and lemon, with a matching story.',
  category: 'social-posts',
  tags: ['review', 'small-business', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Client Reviews',
        lead: 'Local Business',
        accent: 'Growth',
        count: '5 premium social posts + a story layout',
        bonus: 'A FREE BONUS IS INSIDE  →  KEEP SWIPING',
      },
      [SCROLL, QUOTE, WORD, ENVELOPE, PAPER, PAPER, ENVELOPE, SCROLL, QUOTE, WORD],
      WORD,
    ),
    showcasePage(
      STYLE,
      {
        glowWord: 'Polished',
        title: 'Review Posts',
        subtitle: 'Finished layouts, built to turn happy customers into new ones',
      },
      [WORD, PAPER, QUOTE, SCROLL, ENVELOPE],
    ),
    deliverablesPage(
      STYLE,
      { title: 'Ready-to-post content.', posts: '5', stories: '1', storyLabel: 'Matching story' },
      WORD,
      reviewStory(PLUM),
    ),
    editablePage(STYLE, [
      [WORD, reviewWord(SPRUCE)],
      [ENVELOPE, envelopeReviews(SPRUCE)],
    ]),
    howItWorksPage(STYLE, {
      title: 'How it works?',
      steps: [
        'Instant access right after checkout',
        'Swap in your own reviews, logo and colours',
        'Download and share on every channel',
      ],
      note: 'No design skills needed: everything runs in the built-in editor.',
    }),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, pick a second one free.*',
        'Just send us a note after checkout.',
        'LIMITED TIME: the offer closes soon',
      ],
      brandA: 'Fernhill',
      brandB: 'Studio',
      note: '*The second pack must be the same price or lower.',
      face: 'man-portrait-2',
    }),
    brandPage(
      STYLE,
      {
        folder: 'Proof Kit',
        size: '16.2 MB',
        brandA: 'Fernhill',
        brandB: 'Studio',
        tagline: 'More than a template',
      },
      [WORD, ENVELOPE, SCROLL, PAPER, QUOTE],
    ),
  ],
});
