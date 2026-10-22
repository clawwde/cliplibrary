import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  carouselShowcase,
  pickSlides,
  type ShowcaseStyle,
  tiltedRows,
} from '../coral-tide-carousels/showcase';
import { BERRY } from './palette';
import { QUESTION_SERIES } from './questions';
import { SKILL_SERIES } from './skills';
import { SHIFT_SERIES } from './ways';

const STYLE: ShowcaseStyle = {
  background: '#ebe7e9',
  ink: '#111827',
  muted: '#374151',
  brand: BERRY.deep,
  accent: BERRY.hot,
  font: 'Outfit',
};

const DARK: SlideTheme = {
  background: '#050505',
  text: '#ffffff',
  muted: '#d1d5db',
  surface: '#ffffff',
  ink: '#111827',
  brand: BERRY.deep,
  accent: BERRY.sun,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const handle = 'lumenlabs.ai';

export const raspberryAiCarouselsPack = definePack({
  id: 'raspberry-ai-carousels',
  title: 'Raspberry AI Carousels',
  description:
    'Three LinkedIn carousels about AI skills, marketing shifts and big questions in a raspberry gradient.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'ai', 'gradient'],
  theme: 'light',
  ...SQUARE,
  pages: [
    tiltedRows('#ffffff', [SHIFT_SERIES, SKILL_SERIES, QUESTION_SERIES], [-150, -220, -130]),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #1', subtitle: 'LinkedIn post', handle },
      pickSlides(SKILL_SERIES, [0, 3, 4]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #2', subtitle: 'LinkedIn post', handle },
      pickSlides(SHIFT_SERIES, [0, 1, 2]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #3', subtitle: 'LinkedIn post', handle },
      pickSlides(QUESTION_SERIES, [0, 1, 2]),
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Fully editable in the built-in editor',
        body: 'Change any word, font or colour, swap icons and photos, and rearrange the layout freely.',
      },
      [...SKILL_SERIES, ...SHIFT_SERIES, ...QUESTION_SERIES],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Begin',
      steps: [
        {
          icon: 'shopping-bag',
          title: '01 Get the pack',
          body: 'Complete checkout in a few seconds',
        },
        {
          icon: 'cloud',
          title: '02 Open the designs',
          body: 'Each carousel loads right in your browser',
        },
        {
          icon: 'pencil',
          title: '03 Start editing',
          body: 'Type your copy, pick colours and export',
        },
      ],
    }),
  ],
});
