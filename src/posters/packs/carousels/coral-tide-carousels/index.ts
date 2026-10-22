import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { TIDE } from './palette';
import { ERA_SERIES, SPARK_SERIES } from './posts';
import { carouselShowcase, pickSlides, type ShowcaseStyle, tiltedRows } from './showcase';
import { VOICE_SERIES } from './voice';

const STYLE: ShowcaseStyle = {
  background: '#e4e9ea',
  ink: '#0f172a',
  muted: '#334155',
  brand: '#0d2a30',
  accent: TIDE.coral,
  font: 'Outfit',
};

const DARK: SlideTheme = {
  background: '#050607',
  text: '#ffffff',
  muted: '#d1d5db',
  surface: '#ffffff',
  ink: '#111827',
  brand: TIDE.deep,
  accent: TIDE.coral,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const handle = 'northbeam.studio';

export const coralTideCarouselsPack = definePack({
  id: 'coral-tide-carousels',
  title: 'Coral Tide Carousels',
  description:
    'Three LinkedIn and Instagram carousels on ideas, growth strategy and brand voice in deep teal and coral.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    tiltedRows('#ffffff', [SPARK_SERIES.slice(0, 5), ERA_SERIES, VOICE_SERIES], [-140, -210, -120]),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #1', subtitle: 'LinkedIn post', handle },
      pickSlides(SPARK_SERIES, [0, 4, 5]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #2', subtitle: 'LinkedIn post', handle },
      pickSlides(ERA_SERIES, [0, 1, 2]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #3', subtitle: 'LinkedIn post', handle },
      pickSlides(VOICE_SERIES, [0, 1, 2]),
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Rewrite the text, swap fonts and colours, change icons and shift the layout to match your brand.',
      },
      [...SPARK_SERIES, ...ERA_SERIES, ...VOICE_SERIES],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Getting Started',
      steps: [
        {
          icon: 'shopping-cart',
          title: '01 Grab the pack',
          body: 'Add it to your library in one click',
        },
        {
          icon: 'download',
          title: '02 Open the files',
          body: 'Every carousel opens straight in the built-in editor',
        },
        {
          icon: 'pen-tool',
          title: '03 Make it yours',
          body: 'Change words, colours and photos, then export',
        },
      ],
    }),
  ],
});
