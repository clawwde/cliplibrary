import { definePack } from '../../../pack';
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

  designs: [
    keywordSlide,
    poweringSlide,
    aboutSlide,
    contentsSlide,
    campaignSlide,
    matrixSlide,
    impactSlide,
    revenueSlide,
    processSlide,
    teamSlide,
    workSlide,
    onboardingSlide,
    ...INTRO,
    ...DATA,
  ],
});
