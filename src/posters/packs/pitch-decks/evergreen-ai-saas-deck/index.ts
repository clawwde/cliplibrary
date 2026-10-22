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
  architectureSlide,
  ecosystemSlide,
  legacySlide,
  quadrantSlide,
  quarterlySlide,
} from './slides-data';
import {
  contentsSlide,
  coverSlide,
  empoweringSlide,
  quoteSlide,
  welcomeSlide,
} from './slides-intro';
import { collaborationSlide, performanceSlide, teamSlide, worldwideSlide } from './slides-people';

const LISTING: DeckListing = {
  background: '#e6eeec',
  ink: '#0f2a25',
  muted: '#5c726c',
  brand: '#1d5c50',
  accent: '#5fd3a8',
  glow: '#6fe0b6',
  font: 'Urbanist',
  total: 30,
  style: 'Enterprise Style',
};

const INTRO = [coverSlide, contentsSlide, welcomeSlide, quoteSlide, empoweringSlide, teamSlide];
const DATA = [
  ecosystemSlide,
  legacySlide,
  accelerationSlide,
  quadrantSlide,
  quarterlySlide,
  architectureSlide,
];
const EXTRA = [performanceSlide, collaborationSlide, worldwideSlide];

export const evergreenAiSaasDeckPack = definePack({
  id: 'evergreen-ai-saas-deck',
  title: 'Evergreen AI SaaS Deck',
  description:
    'A forest and mint enterprise pitch deck for AI and SaaS platforms with roadmap, market, team and architecture slides.',
  category: 'pitch-decks',
  tags: ['pitch-deck', 'ai', 'saas', 'corporate'],
  theme: 'light',
  ...LANDSCAPE,
  pages: [
    deckCover(LISTING, quoteSlide, [
      architectureSlide,
      empoweringSlide,
      legacySlide,
      welcomeSlide,
      ecosystemSlide,
      accelerationSlide,
      worldwideSlide,
      collaborationSlide,
    ]),
    deckShowcase(
      LISTING,
      [performanceSlide, collaborationSlide, worldwideSlide],
      [teamSlide, quarterlySlide, legacySlide, accelerationSlide, quadrantSlide],
    ),
    deckGrid(LISTING, INTRO),
    deckGrid(LISTING, DATA),
    iconSlides(LISTING),
    deckEditor(LISTING, [...INTRO, ...DATA, ...EXTRA]),
    deckHowTo(LISTING),
  ],
});
