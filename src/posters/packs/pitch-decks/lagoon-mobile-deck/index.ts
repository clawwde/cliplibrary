import { definePack } from '../../../pack';
import { LAGOON, SUNSET } from './deck-kit';
import { coverSlide, impactSlide, pillarsSlide, serviceSlide, spotlightSlide } from './slides-a';
import { alertsSlide, matrixSlide, pricingSlide, revenueSlide, syncSlide } from './slides-b';
import { audienceSlide, iconSheet, impactStorySlide, reviewsSlide, wordsSlide } from './slides-c';

const service = serviceSlide(LAGOON);

const SLIDES = [
  spotlightSlide,
  pillarsSlide,
  service,
  impactSlide,
  alertsSlide,
  reviewsSlide,
  wordsSlide,
  impactStorySlide,
  pricingSlide,
  coverSlide,
  matrixSlide,
  revenueSlide,
  syncSlide,
  audienceSlide,
];

export const lagoonMobileDeckPack = definePack({
  id: 'lagoon-mobile-deck',
  title: 'Lagoon Mobile Deck',
  description:
    'A mobile product pitch deck in deep lagoon teal with phone mockups, pricing, matrix and growth slides.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'saas', 'mockup', 'gradient'],
  theme: 'dark',

  designs: [
    ...SLIDES,
    iconSheet(0),
    iconSheet(10),
    iconSheet(40),
    spotlightSlide,
    coverSlide,
    matrixSlide,
    impactSlide,
    pricingSlide,
    syncSlide,
    audienceSlide,
    wordsSlide,
    service,
    pillarsSlide,
    alertsSlide,
    revenueSlide,
    impactStorySlide,
    reviewsSlide,
    serviceSlide(SUNSET),
  ],
});
