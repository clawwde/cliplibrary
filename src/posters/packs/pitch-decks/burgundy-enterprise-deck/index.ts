import { definePack, LANDSCAPE } from '../../../pack';
import {
  type DeckListing,
  deckCover,
  deckEditor,
  deckGrid,
  deckHowTo,
  deckShowcase,
  iconSlides,
} from '../coral-b2b-agency-deck/deck-listing';
import {
  contentsSlide,
  coreFocusSlide,
  coverSlide,
  empoweringSlide,
  welcomeSlide,
} from './slides-intro';
import { benchmarksSlide, feedbackSlide, quarterlySlide, worldMarketSlide } from './slides-market';
import {
  ecosystemSlide,
  growthSlide,
  performanceSlide,
  quoteSlide,
  spotlightSlide,
} from './slides-proof';

const LISTING: DeckListing = {
  background: '#f1e8ea',
  ink: '#1d1216',
  muted: '#6d5a61',
  brand: '#5c1a2e',
  accent: '#f19bb0',
  glow: '#f6a9bb',
  font: 'Lexend',
  total: 30,
  style: 'Enterprise Style',
};

const INTRO = [
  coverSlide,
  contentsSlide,
  welcomeSlide,
  empoweringSlide,
  coreFocusSlide,
  performanceSlide,
];
const PROOF = [
  spotlightSlide,
  ecosystemSlide,
  quoteSlide,
  growthSlide,
  benchmarksSlide,
  feedbackSlide,
];

export const burgundyEnterpriseDeckPack = definePack({
  id: 'burgundy-enterprise-deck',
  title: 'Burgundy Enterprise Deck',
  description:
    'A wine and rose glass-style SaaS pitch deck with orbit cover, benchmarks, market globe, growth charts and quarterly plans.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'saas', 'corporate', 'stats'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    deckCover(LISTING, coverSlide, [
      empoweringSlide,
      spotlightSlide,
      welcomeSlide,
      performanceSlide,
      quarterlySlide,
      ecosystemSlide,
      worldMarketSlide,
      benchmarksSlide,
    ]),
    deckShowcase(
      LISTING,
      [performanceSlide, worldMarketSlide, quarterlySlide],
      [welcomeSlide, contentsSlide, spotlightSlide, coreFocusSlide, growthSlide],
    ),
    deckGrid(LISTING, INTRO),
    deckGrid(LISTING, PROOF),
    iconSlides(LISTING),
    deckEditor(LISTING, [...INTRO, ...PROOF, worldMarketSlide, quarterlySlide]),
    deckHowTo(LISTING),
  ],
});
