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
  accelerationSlide,
  growthSlide,
  pricingSlide,
  servicesSlide,
  standardSlide,
  timelineSlide,
  worldwideSlide,
} from './slides-data';
import {
  adoptionSlide,
  contentsSlide,
  coverSlide,
  empoweringSlide,
  potentialSlide,
  roadmapSlide,
  teamSlide,
} from './slides-story';
import { HX } from './theme';

const LISTING: DeckListing = {
  background: '#e4ecec',
  ink: '#11181b',
  muted: '#5f6b70',
  brand: HX.deep,
  accent: HX.teal,
  glow: HX.teal,
  font: 'Sora',
  total: 30,
  style: 'Enterprise Style',
};

const INTRO = [
  coverSlide,
  contentsSlide,
  empoweringSlide,
  adoptionSlide,
  potentialSlide,
  teamSlide,
];
const DATA = [
  worldwideSlide,
  growthSlide,
  accelerationSlide,
  servicesSlide,
  standardSlide,
  timelineSlide,
];

export const tealGlowSaasDeckPack = definePack({
  id: 'teal-glow-saas-deck',
  title: 'Teal Glow SaaS Deck',
  description:
    'A black and teal glow investor deck for SaaS and AI platforms with roadmap, pricing, team and growth slides.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'saas', 'ai', 'stats'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    deckCover(LISTING, coverSlide, [
      servicesSlide,
      growthSlide,
      roadmapSlide,
      teamSlide,
      empoweringSlide,
      pricingSlide,
      adoptionSlide,
      standardSlide,
    ]),
    deckShowcase(
      LISTING,
      [roadmapSlide, adoptionSlide, pricingSlide],
      [worldwideSlide, accelerationSlide, timelineSlide, potentialSlide, contentsSlide],
    ),
    deckGrid(LISTING, INTRO),
    deckGrid(LISTING, DATA),
    iconSlides(LISTING),
    deckEditor(LISTING, [...INTRO, roadmapSlide, ...DATA, pricingSlide]),
    deckHowTo(LISTING),
  ],
});
