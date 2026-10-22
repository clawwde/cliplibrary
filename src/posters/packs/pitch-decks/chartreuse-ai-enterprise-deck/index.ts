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
  figuresSlide,
  gaugeSlide,
  legacySlide,
  pricingSlide,
  revenueSlide,
} from './slides-figures';
import {
  contentsSlide,
  coverSlide,
  empoweringSlide,
  messagingSlide,
  quoteSlide,
} from './slides-intro';
import {
  assistSlide,
  auditSlide,
  conversionsSlide,
  numbersSlide,
  velocitySlide,
} from './slides-metrics';

const LISTING: DeckListing = {
  background: '#eceee6',
  ink: '#141711',
  muted: '#62685b',
  brand: '#3d5a0c',
  accent: '#b8f531',
  glow: '#c6f75a',
  font: 'Space Grotesk',
  total: 30,
  style: 'Enterprise Style',
};

const INTRO = [
  coverSlide,
  contentsSlide,
  empoweringSlide,
  quoteSlide,
  messagingSlide,
  figuresSlide,
];
const METRICS = [
  auditSlide,
  assistSlide,
  legacySlide,
  velocitySlide,
  numbersSlide,
  conversionsSlide,
];

export const chartreuseAiEnterpriseDeckPack = definePack({
  id: 'chartreuse-ai-enterprise-deck',
  title: 'Chartreuse AI Deck',
  description:
    'A black and chartreuse enterprise AI pitch deck with glowing stats, pricing tiers, roadmaps and team slides.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'ai', 'saas', 'stats'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    deckCover(LISTING, coverSlide, [
      numbersSlide,
      pricingSlide,
      gaugeSlide,
      conversionsSlide,
      figuresSlide,
      velocitySlide,
      revenueSlide,
      empoweringSlide,
    ]),
    deckShowcase(
      LISTING,
      [pricingSlide, revenueSlide, gaugeSlide],
      [velocitySlide, quoteSlide, auditSlide, assistSlide, numbersSlide],
    ),
    deckGrid(LISTING, INTRO),
    deckGrid(LISTING, METRICS),
    iconSlides(LISTING),
    deckEditor(LISTING, [
      ...INTRO,
      ...METRICS,
      pricingSlide,
      revenueSlide,
      gaugeSlide,
      legacySlide,
    ]),
    deckHowTo(LISTING),
  ],
});
