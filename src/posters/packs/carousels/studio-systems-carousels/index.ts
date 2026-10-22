import { linear } from '@/design';
import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { carouselPage, type ListingStyle, tiltedCover } from '../momentum-carousel-kit/listing';
import { bubblesCover, LESSON_STEPS } from './bubbles';
import { SLIDER_STEPS, slidersCover, WINDOW_STEPS, windowsCover } from './windows-sliders';

const STYLE: ListingStyle = {
  background: '#e7eaf0',
  text: '#0b1d3a',
  muted: '#3c4a63',
  badge: linear(135, '#38bdf8', '#1e3a8a'),
  avatar: linear(135, '#2563eb', '#0b1d3a'),
  handle: 'studio.systems',
  feed: 'photo',
};

const DARK: SlideTheme = {
  background: '#050b18',
  text: '#ffffff',
  muted: '#cbd5e1',
  surface: '#ffffff',
  ink: '#0b1d3a',
  brand: '#2563eb',
  accent: '#7dd3fc',
  headFont: 'Figtree',
  bodyFont: 'Figtree',
};

const windowsDeck = [windowsCover, ...WINDOW_STEPS] as const;
const lessonsDeck = [bubblesCover, ...LESSON_STEPS] as const;
const slidersDeck = [slidersCover, ...SLIDER_STEPS] as const;
const subtitle = 'Square Feed Carousel';

export const studioSystemsCarouselsPack = definePack({
  id: 'studio-systems-carousels',
  title: 'Studio Systems Carousels',
  description:
    'Three navy and sky blue carousels about design systems, AI lessons and working faster with templates.',
  category: 'carousels',
  tags: ['carousel', 'instagram', 'saas', 'ai'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    tiltedCover(STYLE, [windowsDeck, lessonsDeck, slidersDeck]),
    carouselPage(STYLE, 'Carousel Set 01', subtitle, [
      windowsDeck[0],
      windowsDeck[1],
      windowsDeck[2],
    ]),
    carouselPage(STYLE, 'Carousel Set 02', subtitle, [
      lessonsDeck[0],
      lessonsDeck[1],
      lessonsDeck[2],
    ]),
    carouselPage(STYLE, 'Carousel Set 03', subtitle, [
      slidersDeck[0],
      slidersDeck[1],
      slidersDeck[2],
    ]),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Change the text, fonts and colours, swap icons and adjust the layout to match your style.',
      },
      [...windowsDeck, ...lessonsDeck, ...slidersDeck],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Begin',
      steps: [
        { icon: 'shopping-cart', title: '01 Check out', body: 'Pay in under a minute' },
        { icon: 'download', title: '02 Download', body: 'Grab the edit link' },
        { icon: 'layout-grid', title: '03 Open the set', body: 'Pick a slide and edit' },
      ],
    }),
  ],
});
