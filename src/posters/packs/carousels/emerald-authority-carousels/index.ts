import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  carouselShowcase,
  pickSlides,
  type ShowcaseStyle,
  tiltedRows,
} from '../coral-tide-carousels/showcase';
import { LEAF } from './palette';
import { STAGE_SERIES } from './stages';
import { TRUST_SERIES } from './trust';
import { WIRE_SERIES } from './wire';

const STYLE: ShowcaseStyle = {
  background: '#e6ebe8',
  ink: '#0f172a',
  muted: '#334155',
  brand: LEAF.mid,
  accent: LEAF.mint,
  font: 'Outfit',
};

const DARK: SlideTheme = {
  background: '#040605',
  text: '#ffffff',
  muted: '#d1d5db',
  surface: '#ffffff',
  ink: '#111827',
  brand: LEAF.mid,
  accent: LEAF.mint,
  headFont: 'Outfit',
  bodyFont: 'Outfit',
};

const handle = 'everleaf.media';

export const emeraldAuthorityCarouselsPack = definePack({
  id: 'emerald-authority-carousels',
  title: 'Emerald Authority Carousels',
  description:
    'Three LinkedIn and Instagram carousels on building a trusted voice, sharper strategy and audience trust in deep emerald and mint.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    tiltedRows('#ffffff', [STAGE_SERIES, WIRE_SERIES, TRUST_SERIES], [-140, -210, -120]),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #1', subtitle: 'LinkedIn post', handle },
      pickSlides(STAGE_SERIES, [0, 1, 2]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #2', subtitle: 'LinkedIn post', handle },
      pickSlides(WIRE_SERIES, [0, 1, 2]),
    ),
    carouselShowcase(
      STYLE,
      { title: 'Carousel Set #3', subtitle: 'LinkedIn post', handle },
      pickSlides(TRUST_SERIES, [0, 1, 3]),
    ),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Fully editable in the built-in editor',
        body: 'Change any word, colour, font or icon and rearrange the layout to suit your brand.',
      },
      [...STAGE_SERIES, ...WIRE_SERIES, ...TRUST_SERIES],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How It Works',
      steps: [
        { icon: 'credit-card', title: '01 Check out', body: 'Finish your order in a few seconds' },
        {
          icon: 'folder-open',
          title: '02 Open the set',
          body: 'All three carousels load in your browser',
        },
        {
          icon: 'paintbrush',
          title: '03 Start editing',
          body: 'Swap the copy and colours, then download',
        },
      ],
    }),
  ],
});
