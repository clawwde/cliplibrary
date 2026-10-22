import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  carouselShowcase,
  pickSlides,
  type ShowcaseStyle,
  tiltedRows,
} from '../coral-tide-carousels/showcase';
import { PLAN_SERIES } from './cards';
import { COBALT } from './palette';
import { WAYS_SERIES } from './steps';
import { MINDSET_SERIES } from './topics';

const STYLE: ShowcaseStyle = {
  background: '#e6e9ee',
  ink: '#0f172a',
  muted: '#334155',
  brand: COBALT.blue,
  accent: COBALT.sky,
  font: 'Outfit',
};

const DARK: SlideTheme = {
  background: '#04060c',
  text: '#ffffff',
  muted: '#d1d5db',
  surface: '#ffffff',
  ink: '#111827',
  brand: COBALT.blue,
  accent: COBALT.sky,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const handle = 'orbitalworks.co';

export const cobaltProductCarouselsPack = definePack({
  id: 'cobalt-product-carousels',
  title: 'Cobalt Product Carousels',
  description:
    'Three product management carousels for LinkedIn and Instagram in ink black with electric blue gradients.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'saas', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    tiltedRows('#ffffff', [WAYS_SERIES, PLAN_SERIES, MINDSET_SERIES], [-150, -220, -130]),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #1', subtitle: 'LinkedIn post', handle },
      pickSlides(WAYS_SERIES, [0, 1, 2]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #2', subtitle: 'LinkedIn post', handle },
      pickSlides(PLAN_SERIES, [0, 1, 2]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #3', subtitle: 'LinkedIn post', handle },
      pickSlides(MINDSET_SERIES, [0, 1, 2]),
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit every slide in your browser',
        body: 'Update the words, colours, fonts, icons and photos, and move anything you like.',
      },
      [...WAYS_SERIES, ...PLAN_SERIES, ...MINDSET_SERIES],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Start in Three Steps',
      steps: [
        {
          icon: 'credit-card',
          title: '01 Check out',
          body: 'Finish the quick payment step',
        },
        {
          icon: 'folder-open',
          title: '02 Open the pack',
          body: 'Find all three carousels in your library',
        },
        {
          icon: 'wand-sparkles',
          title: '03 Customise',
          body: 'Edit, preview and download your slides',
        },
      ],
    }),
  ],
});
