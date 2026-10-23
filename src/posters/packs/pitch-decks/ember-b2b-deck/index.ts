import { definePack } from '../../../pack';
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
  iconSheet,
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

  designs: [
    ...SLIDES,
    iconSheet(0),
    iconSheet(10),
    iconSheet(40),
    metricsSlide,
    matrixSlide,
    realWorldSlide,
    marketSizeSlide,
    networkSlide,
    pricingSlide,
    wordsSlide,
    teamSlide,
    coverSlide,
    contentsSlide,
    offeringsSlide,
    marketSlide,
    accountsSlide,
    customerSlide,
    clientsSlide,
    caseStudySlide,
    roadmapSlide,
  ],
});
