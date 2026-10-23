import { definePack } from '../../../pack';
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

  designs: [
    coverSlide,
    empoweringSlide,
    spotlightSlide,
    welcomeSlide,
    performanceSlide,
    quarterlySlide,
    ecosystemSlide,
    worldMarketSlide,
    benchmarksSlide,
    contentsSlide,
    coreFocusSlide,
    growthSlide,
    ...INTRO,
    ...PROOF,
  ],
});
