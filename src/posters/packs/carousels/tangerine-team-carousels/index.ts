import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  type CarouselRow,
  carouselCover,
  carouselRowPhones,
  carouselWall,
} from '../mulberry-growth-carousels/listing';
import {
  reviewCover,
  statHours,
  statLeads,
  statReplies,
  toneCover,
  toneReader,
  toneValues,
  toneWords,
} from './slides-review';
import {
  insightArjun,
  insightClara,
  insightsCover,
  insightTheo,
  lessonNextStep,
  lessonProof,
  lessonsCover,
  lessonTeach,
} from './slides-team';
import {
  archetypeBuilder,
  archetypeExplorer,
  archetypeStoryteller,
  archetypesCover,
  searchCover,
  tipIntent,
  tipSpeed,
  tipTrust,
} from './slides-voice';

const LIGHT: SlideTheme = {
  background: '#e9ecea',
  text: '#0d1614',
  muted: '#3b4744',
  surface: '#ffffff',
  ink: '#0d1614',
  brand: '#0b3a33',
  accent: '#ff8a3d',
  headFont: 'Plus Jakarta Sans',
  bodyFont: 'Plus Jakarta Sans',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d4d4d4',
};

const INSIGHTS: CarouselRow = [insightsCover, insightArjun, insightClara, insightTheo];
const LESSONS: CarouselRow = [lessonsCover, lessonProof, lessonTeach, lessonNextStep];
const ARCHETYPES: CarouselRow = [
  archetypesCover,
  archetypeStoryteller,
  archetypeBuilder,
  archetypeExplorer,
];
const SEARCH: CarouselRow = [searchCover, tipSpeed, tipIntent, tipTrust];
const TONE: CarouselRow = [toneCover, toneValues, toneWords, toneReader];
const REVIEW: CarouselRow = [reviewCover, statLeads, statReplies, statHours];

const feed = {
  subtitle: 'LinkedIn & Instagram',
  handle: 'northpine',
  followers: '22,904 followers',
};

const phones = (title: string, row: CarouselRow) =>
  carouselRowPhones(SQUARE_SIZE, LIGHT, { ...feed, title }, row);

export const tangerineTeamCarouselsPack = definePack({
  id: 'tangerine-team-carousels',
  title: 'Tangerine Team Carousels',
  description:
    'Six forest green and tangerine carousels for B2B brands: team quotes, lessons, SEO tips, brand tone and yearly results.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'quote', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    carouselCover(
      SQUARE_SIZE,
      LIGHT,
      {
        count: '6',
        label: ['Team & Brand', 'Carousel', 'Templates'].join('\n'),
        pages: '24 Slides',
      },
      [INSIGHTS, LESSONS, ARCHETYPES, SEARCH, TONE, REVIEW],
    ),
    carouselWall(SQUARE_SIZE, LIGHT, [INSIGHTS, LESSONS, ARCHETYPES]),
    carouselWall(SQUARE_SIZE, LIGHT, [SEARCH, TONE, REVIEW]),
    phones('Carousel No. 1', INSIGHTS),
    phones('Carousel No. 2', LESSONS),
    phones('Carousel No. 3', ARCHETYPES),
    phones('Carousel No. 4', SEARCH),
    phones('Carousel No. 5', TONE),
    phones('Carousel No. 6', REVIEW),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Fully editable, right here',
        body: 'Change any word, colour, photo or icon and keep the layout perfectly aligned.',
      },
      [...INSIGHTS, ...LESSONS, ...SEARCH],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How It Works',
      steps: [
        { icon: 'shopping-bag', title: '01 Check out', body: 'Complete your order in a minute' },
        { icon: 'folder-open', title: '02 Open the pack', body: 'All slides load in the editor' },
        { icon: 'pen-tool', title: '03 Start editing', body: 'Make it yours and export' },
      ],
    }),
  ],
});
