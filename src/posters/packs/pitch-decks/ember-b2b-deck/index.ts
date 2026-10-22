import { linear } from '@/design';
import { definePack, LANDSCAPE } from '../../../pack';
import { editablePage, gridPage, heroPage, howToPage, iconsPage, mosaicPage } from './listing';
import {
  accountsSlide,
  contentsSlide,
  coverSlide,
  marketSlide,
  offeringsSlide,
  realWorldSlide,
} from './slides-a';
import {
  clientsSlide,
  matrixSlide,
  metricsSlide,
  networkSlide,
  pricingSlide,
  teamSlide,
} from './slides-b';
import {
  caseStudySlide,
  customerSlide,
  marketSizeSlide,
  roadmapSlide,
  wordsSlide,
} from './slides-c';

const SLIDES = [
  accountsSlide,
  metricsSlide,
  teamSlide,
  networkSlide,
  pricingSlide,
  realWorldSlide,
  wordsSlide,
  clientsSlide,
  caseStudySlide,
  coverSlide,
  contentsSlide,
  offeringsSlide,
  marketSlide,
  matrixSlide,
  customerSlide,
  roadmapSlide,
  marketSizeSlide,
];

export const emberB2bDeckPack = definePack({
  id: 'ember-b2b-deck',
  title: 'Ember B2B Deck',
  description:
    'A bold B2B agency pitch deck in vermilion and midnight navy with pricing, matrix, team and case study slides.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'b2b', 'corporate', 'stats'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    mosaicPage(SLIDES),
    heroPage(
      [metricsSlide, matrixSlide, realWorldSlide],
      [marketSizeSlide, networkSlide, pricingSlide, wordsSlide, teamSlide],
    ),
    gridPage([
      coverSlide,
      contentsSlide,
      offeringsSlide,
      marketSlide,
      realWorldSlide,
      accountsSlide,
    ]),
    gridPage([
      customerSlide,
      clientsSlide,
      caseStudySlide,
      roadmapSlide,
      marketSizeSlide,
      metricsSlide,
    ]),
    iconsPage,
    editablePage(SLIDES),
    howToPage(linear(135, '#ff8a5c', '#e2401a')),
  ],
});
