import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { type CarouselRow, carouselCover, carouselRowPhones, carouselWall } from './listing';
import { cardContrarian, cardCover, cardProcess, cardRemix } from './slides-cards';
import { qaCarousel, qaCover, qaPosting, qaReach } from './slides-qa';
import {
  gapCloser,
  gapCover,
  gapLast,
  gapSwipe,
  movePublish,
  moveRepeat,
  moveResearch,
  movesCover,
} from './slides-steps';
import {
  termChurn,
  termPipeline,
  termRetention,
  termsCover,
  waveCover,
  waveFinale,
  waveMiddle,
  waveRise,
} from './slides-wave';

const LIGHT: SlideTheme = {
  background: '#efe9e7',
  text: '#140a0e',
  muted: '#3f3438',
  surface: '#ffffff',
  ink: '#140a0e',
  brand: '#5c1233',
  accent: '#ffb38a',
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d6d3d1',
  accent: '#ffb38a',
};

const MOVES: CarouselRow = [movesCover, moveResearch, movePublish, moveRepeat];
const GAP: CarouselRow = [gapCover, gapCloser, gapSwipe, gapLast];
const CARDS: CarouselRow = [cardCover, cardRemix, cardProcess, cardContrarian];
const WAVE: CarouselRow = [waveCover, waveMiddle, waveRise, waveFinale];
const TERMS: CarouselRow = [termsCover, termRetention, termChurn, termPipeline];
const QA: CarouselRow = [qaCover, qaReach, qaPosting, qaCarousel];

const feed = { subtitle: 'LinkedIn & Instagram', handle: 'fernway', followers: '48,210 followers' };

const phones = (title: string, row: CarouselRow) =>
  carouselRowPhones(SQUARE_SIZE, LIGHT, { ...feed, title }, row);

export const mulberryGrowthCarouselsPack = definePack({
  id: 'mulberry-growth-carousels',
  title: 'Mulberry Growth Carousels',
  description:
    'Six swipeable marketing carousels in mulberry and peach for LinkedIn and Instagram, from step guides to Q&A posts.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'instagram', 'b2b', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    carouselCover(
      SQUARE_SIZE,
      LIGHT,
      {
        count: '6',
        label: ['Social Media', 'Carousel', 'Templates'].join('\n'),
        pages: '24 Slides',
      },
      [MOVES, GAP, CARDS, WAVE, TERMS, QA],
    ),
    carouselWall(SQUARE_SIZE, LIGHT, [MOVES, GAP, CARDS]),
    carouselWall(SQUARE_SIZE, LIGHT, [TERMS, WAVE, QA]),
    phones('Carousel Set 01', MOVES),
    phones('Carousel Set 02', GAP),
    phones('Carousel Set 03', CARDS),
    phones('Carousel Set 04', WAVE),
    phones('Carousel Set 05', TERMS),
    phones('Carousel Set 06', QA),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the copy, swap colours and fonts, and move any layer to match your brand.',
      },
      [...MOVES, ...GAP, ...CARDS],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        { icon: 'shopping-cart', title: '01 Grab the pack', body: 'Add it to your library' },
        { icon: 'download', title: '02 Open the file', body: 'Every slide loads in the editor' },
        { icon: 'pencil', title: '03 Make it yours', body: 'Edit, export and post the carousel' },
      ],
    }),
  ],
});
