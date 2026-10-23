import { definePack } from '../../../pack';
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

  designs: [
    coverSlide,
    numbersSlide,
    pricingSlide,
    gaugeSlide,
    conversionsSlide,
    figuresSlide,
    velocitySlide,
    revenueSlide,
    empoweringSlide,
    quoteSlide,
    auditSlide,
    assistSlide,
    ...INTRO,
    ...METRICS,
    legacySlide,
  ],
});
