import { definePack, LANDSCAPE } from '../../../pack';
import { coverPage, deliverablesPage, type ListingStyle, showcasePage } from './listing';
import { bonusPage, brandPage, editablePage, howItWorksPage } from './listing-more';
import { CORAL, clientsSay, LAGOON, photoQuote, reviewLetters } from './posts';
import { envelopeReviews, typewriterScroll } from './posts-more';

const STYLE: ListingStyle = {
  background: '#0b0e1d',
  text: '#ffffff',
  muted: '#a5abc4',
  ink: CORAL.ink,
  brand: CORAL.brand,
  brandText: '#ffffff',
  strip: '#f4f1ee',
  folderFrom: '#ffb199',
  folderTo: '#ff6b4a',
  head: 'Outfit',
  body: 'DM Sans',
};

const LETTERS = reviewLetters(CORAL);
const PAPER = clientsSay(CORAL);
const QUOTE = photoQuote(CORAL);
const SCROLL = typewriterScroll(CORAL);
const ENVELOPE = envelopeReviews(CORAL);

export const coralClientReviewsPack = definePack({
  id: 'coral-client-reviews',
  title: 'Coral Client Reviews',
  description:
    'Testimonial and client review posts for freelancers in coral and midnight navy, with matching stories.',
  category: 'social-posts',
  tags: ['review', 'freelance', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Client Reviews',
        lead: 'Freelance Marketing Kit',
        accent: '5 premium social posts + story',
        bonus: 'YOUR BONUS IS WAITING  →  SWIPE TO SEE IT',
      },
      [ENVELOPE, QUOTE, LETTERS, ENVELOPE, PAPER, PAPER, SCROLL, QUOTE, SCROLL, LETTERS],
      QUOTE,
    ),
    showcasePage(
      STYLE,
      {
        title: 'Premium Client Review Posts',
        subtitle: 'Finished layouts, made to turn praise into bookings',
      },
      [LETTERS, PAPER, QUOTE, SCROLL, ENVELOPE],
    ),
    deliverablesPage(STYLE, { count: '5' }, QUOTE, ENVELOPE),
    editablePage(STYLE, [PAPER, clientsSay(LAGOON)], [SCROLL, typewriterScroll(LAGOON)]),
    howItWorksPage(
      STYLE,
      [
        'Instant access right after checkout',
        'Drop in your own client quotes and photos',
        'Download and share on every channel',
      ],
      'No design skills needed: everything runs in the built-in editor.',
    ),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, choose another one free.*',
        'Send us a quick note after purchase.',
        'LIMITED TIME: offer closes at month end',
      ],
      brandA: 'Harbor Lane',
      brandB: 'Studio',
      note: '*The free pack must be the same price or lower.',
      photo: 'woman-portrait-1',
    }),
    brandPage(
      STYLE,
      { folder: 'Review Kit', size: '21.7 MB', brandA: 'Harbor Lane', brandB: 'Studio' },
      [LETTERS, ENVELOPE, SCROLL, PAPER, QUOTE],
    ),
  ],
});
