import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  type CarouselRow,
  carouselCover,
  carouselRowPhones,
} from '../mulberry-growth-carousels/listing';
import {
  brandCover,
  brandGap,
  brandNext,
  brandPeople,
  sentenceClear,
  sentenceConvert,
  sentenceEngage,
  sentencesCover,
} from './slides-bold';
import { noteDisconnect, noteFramework, noteShift, notesCover } from './slides-notes';
import {
  attractCover,
  goalAuthority,
  goalRevenue,
  goalSystems,
  goalsCover,
  lessonKnown,
  lessonMemorable,
  lessonPull,
} from './slides-paper';

const LIGHT: SlideTheme = {
  background: '#ebeae7',
  text: '#141414',
  muted: '#45423d',
  surface: '#ffffff',
  ink: '#141414',
  brand: '#141414',
  accent: '#e4572e',
  headFont: 'Space Grotesk',
  bodyFont: 'Space Grotesk',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d6d3cd',
  accent: '#ff7a52',
};

const GOALS: CarouselRow = [goalsCover, goalAuthority, goalSystems, goalRevenue];
const BRAND: CarouselRow = [brandCover, brandPeople, brandGap, brandNext];
const NOTES: CarouselRow = [notesCover, noteDisconnect, noteFramework, noteShift];
const LESSONS: CarouselRow = [attractCover, lessonPull, lessonKnown, lessonMemorable];
const SENTENCES: CarouselRow = [sentencesCover, sentenceClear, sentenceEngage, sentenceConvert];

const feed = { subtitle: 'LinkedIn Post', handle: 'redline.studio', followers: '9,870 followers' };

const phones = (title: string, row: CarouselRow) =>
  carouselRowPhones(SQUARE_SIZE, LIGHT, { ...feed, title }, row);

export const tomatoSketchCarouselsPack = definePack({
  id: 'tomato-sketch-carousels',
  title: 'Tomato Sketch Carousels',
  description:
    'Five LinkedIn carousels in tomato red, ink and sketchbook paper with doodles, sticky notes and bold statements.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'tips', 'quote'],
  theme: 'light',
  ...SQUARE,
  pages: [
    carouselCover(
      SQUARE_SIZE,
      LIGHT,
      { count: '5', label: ['LinkedIn', 'Carousel', 'Templates'].join('\n'), pages: '20 Slides' },
      [GOALS, BRAND, NOTES, LESSONS, SENTENCES],
    ),
    phones('Carousel Set A', GOALS),
    phones('Carousel Set B', BRAND),
    phones('Carousel Set C', NOTES),
    phones('Carousel Set D', LESSONS),
    phones('Carousel Set E', SENTENCES),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Made for the built-in editor',
        body: 'Change the words, colours, doodles and fonts, then export every slide in one go.',
      },
      [...GOALS, ...BRAND, ...NOTES],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Ready in Three Steps',
      steps: [
        { icon: 'shopping-bag', title: '01 Purchase', body: 'Finish the short checkout' },
        { icon: 'folder-open', title: '02 Open', body: 'Every carousel loads instantly' },
        { icon: 'pen-tool', title: '03 Personalise', body: 'Edit, export and post' },
      ],
    }),
  ],
});
