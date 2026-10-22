import { linear } from '@/design';
import { definePack, LANDSCAPE } from '../../../pack';
import { LAGOON } from './deck-kit';
import {
  editablePage,
  gridPage,
  heroPage,
  howToPage,
  iconsPage,
  mosaicPage,
  restylePage,
} from './listing';
import { coverSlide, impactSlide, pillarsSlide, serviceSlide, spotlightSlide } from './slides-a';
import { alertsSlide, matrixSlide, pricingSlide, revenueSlide, syncSlide } from './slides-b';
import { audienceSlide, impactStorySlide, reviewsSlide, wordsSlide } from './slides-c';

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
  ...LANDSCAPE,
  pages: [
    mosaicPage(SLIDES),
    heroPage(
      [spotlightSlide, coverSlide, matrixSlide],
      [impactSlide, pricingSlide, syncSlide, audienceSlide, wordsSlide],
    ),
    gridPage([coverSlide, service, pillarsSlide, wordsSlide, impactSlide, alertsSlide]),
    gridPage([
      revenueSlide,
      syncSlide,
      impactStorySlide,
      audienceSlide,
      pricingSlide,
      reviewsSlide,
    ]),
    iconsPage,
    restylePage,
    editablePage(SLIDES),
    howToPage(linear(135, '#5eead4', '#0e7490')),
  ],
});
