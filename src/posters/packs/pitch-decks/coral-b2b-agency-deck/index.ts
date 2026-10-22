import { definePack, LANDSCAPE } from '../../../pack';
import {
  type DeckListing,
  deckCover,
  deckEditor,
  deckGrid,
  deckHowTo,
  deckShowcase,
  iconSlides,
} from './deck-listing';
import {
  campaignSlide,
  impactSlide,
  matrixSlide,
  onboardingSlide,
  poweringSlide,
  processSlide,
} from './slides-data';
import {
  aboutSlide,
  contentsSlide,
  coverSlide,
  keywordSlide,
  revenueSlide,
  teamSlide,
  workSlide,
} from './slides-story';
import { NV } from './theme';

const LISTING: DeckListing = {
  background: '#f3ebe6',
  ink: '#1f1424',
  muted: '#6b5d70',
  brand: NV.plum,
  accent: NV.coral,
  glow: '#ff9a7a',
  font: 'Bricolage Grotesque',
  total: 36,
  style: 'B2B Marketing',
};

const INTRO = [coverSlide, contentsSlide, aboutSlide, keywordSlide, workSlide, teamSlide];
const DATA = [
  poweringSlide,
  campaignSlide,
  impactSlide,
  matrixSlide,
  processSlide,
  onboardingSlide,
];

export const coralB2bAgencyDeckPack = definePack({
  id: 'coral-b2b-agency-deck',
  title: 'Coral B2B Agency Deck',
  description:
    'A plum and coral pitch deck for B2B marketing agencies with services, results, pricing logic and onboarding slides.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'b2b', 'stats', 'corporate'],
  theme: 'light',
  ...LANDSCAPE,
  pages: [
    deckCover(LISTING, keywordSlide, [
      poweringSlide,
      aboutSlide,
      contentsSlide,
      campaignSlide,
      matrixSlide,
      impactSlide,
      revenueSlide,
      processSlide,
    ]),
    deckShowcase(
      LISTING,
      [revenueSlide, teamSlide, workSlide],
      [processSlide, aboutSlide, poweringSlide, onboardingSlide, contentsSlide],
    ),
    deckGrid(LISTING, INTRO),
    deckGrid(LISTING, DATA),
    iconSlides(LISTING),
    deckEditor(LISTING, [...INTRO, revenueSlide, ...DATA]),
    deckHowTo(LISTING),
  ],
});
