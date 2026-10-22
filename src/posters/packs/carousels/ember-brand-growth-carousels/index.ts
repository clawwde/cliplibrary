import { linear } from '@/design';
import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { carouselCover, carouselPage, type ListingStyle } from '../momentum-carousel-kit/listing';
import { GRID_STEPS, gridCover, STAT_STEPS, statsCover } from './grid-stats';
import { LAUNCH_STEPS, launchCover } from './launch-lists';
import { KEY_STEPS, keysCover, MISTAKE_STEPS, mistakesCover } from './mistakes-keys';

const STYLE: ListingStyle = {
  background: '#ebe8e6',
  text: '#18120f',
  muted: '#4a3f3a',
  badge: linear(135, '#ff8a3d', '#e11d48'),
  avatar: linear(135, '#ff5a1f', '#18181b'),
  handle: 'emberline',
  feed: 'business',
};

const DARK: SlideTheme = {
  background: '#0a0909',
  text: '#ffffff',
  muted: '#d4d4d8',
  surface: '#ffffff',
  ink: '#0c0c0e',
  brand: '#ff5a1f',
  accent: '#ff8a3d',
  headFont: 'Figtree',
  bodyFont: 'Figtree',
};

const gridDeck = [gridCover, ...GRID_STEPS] as const;
const launchDeck = [launchCover, ...LAUNCH_STEPS] as const;
const statsDeck = [statsCover, ...STAT_STEPS] as const;
const mistakesDeck = [mistakesCover, ...MISTAKE_STEPS] as const;
const keysDeck = [keysCover, ...KEY_STEPS] as const;
const subtitle = 'Business Feed Post';

export const emberBrandGrowthCarouselsPack = definePack({
  id: 'ember-brand-growth-carousels',
  title: 'Ember Brand Growth',
  description:
    'Five bold black and ember carousels on audience growth, launch checklists, quarterly stats and community.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'small-business', 'stats'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    carouselCover(STYLE, { count: '5', lines: 'Business\nCarousel\nTemplates', pages: '25' }, [
      gridDeck,
      launchDeck,
      statsDeck,
      mistakesDeck,
      keysDeck,
    ]),
    carouselPage(STYLE, 'Carousel Set 01', subtitle, [gridDeck[0], gridDeck[1], gridDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 02', subtitle, [launchDeck[0], launchDeck[1], launchDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 03', subtitle, [statsDeck[0], statsDeck[1], statsDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 04', subtitle, [
      mistakesDeck[0],
      mistakesDeck[1],
      mistakesDeck[2],
    ]),
    carouselPage(STYLE, 'Carousel Set 05', subtitle, [keysDeck[0], keysDeck[1], keysDeck[2]]),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Retype headlines, change the accent colour, swap icons and reorder slides in minutes.',
      },
      [...gridDeck, ...launchDeck, ...keysDeck],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How It Works',
      steps: [
        { icon: 'credit-card', title: '01 Buy once', body: 'Pay securely in seconds' },
        { icon: 'download', title: '02 Download', body: 'Save the access guide' },
        { icon: 'mouse', title: '03 Edit online', body: 'Open slides and create' },
      ],
    }),
  ],
});
