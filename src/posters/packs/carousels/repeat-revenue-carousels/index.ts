import { linear } from '@/design';
import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import { carouselCover, carouselPage, type ListingStyle } from '../momentum-carousel-kit/listing';
import { habitsCover, pairStep, streakStep, tinyStep } from './habits';
import { LEVER_STEPS, leversCover, WAVE_STEPS, waveCover } from './levers';
import { blocksStep, calendarCover, DROP_STEPS, dropCover, RITUAL_STEPS } from './routines';

const STYLE: ListingStyle = {
  background: '#ece6e8',
  text: '#2a0819',
  muted: '#5b3a48',
  badge: linear(135, '#7a1f4f', '#10b981'),
  avatar: linear(135, '#5c1a3f', '#10b981'),
  handle: 'harborline',
  feed: 'business',
};

const DARK: SlideTheme = {
  background: '#14040c',
  text: '#ffffff',
  muted: '#f5d0e0',
  surface: '#ffffff',
  ink: '#2a0819',
  brand: '#5c1a3f',
  accent: '#a7f3d0',
  headFont: 'Figtree',
  bodyFont: 'Figtree',
};

const leversDeck = [leversCover, ...LEVER_STEPS] as const;
const waveDeck = [waveCover, ...WAVE_STEPS] as const;
const calendarDeck = [calendarCover, blocksStep, ...RITUAL_STEPS] as const;
const dropDeck = [dropCover, ...DROP_STEPS] as const;
const habitsDeck = [habitsCover, tinyStep, pairStep, streakStep] as const;
const subtitle = 'Business Feed Post';

export const repeatRevenueCarouselsPack = definePack({
  id: 'repeat-revenue-carousels',
  title: 'Repeat Revenue Carousels',
  description:
    'Five wine and mint business carousels on customer loyalty, calendar blocking and habits that stick.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'tips'],
  theme: 'dark',
  ...SQUARE,
  pages: [
    carouselCover(STYLE, { count: '5', lines: 'Business\nCarousel\nTemplates', pages: '25' }, [
      leversDeck,
      waveDeck,
      calendarDeck,
      dropDeck,
      habitsDeck,
    ]),
    carouselPage(STYLE, 'Carousel Set 01', subtitle, [leversDeck[0], leversDeck[1], leversDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 02', subtitle, [waveDeck[0], waveDeck[1], waveDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 03', subtitle, [
      calendarDeck[0],
      calendarDeck[1],
      calendarDeck[2],
    ]),
    carouselPage(STYLE, 'Carousel Set 04', subtitle, [dropDeck[0], dropDeck[1], dropDeck[2]]),
    carouselPage(STYLE, 'Carousel Set 05', subtitle, [habitsDeck[0], habitsDeck[1], habitsDeck[2]]),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit everything in your browser',
        body: 'Update the copy, switch fonts and colours, swap icons and resize any element to fit.',
      },
      [...leversDeck, ...calendarDeck, ...habitsDeck],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'Start in Minutes',
      steps: [
        { icon: 'shopping-cart', title: '01 Order', body: 'Finish the checkout' },
        { icon: 'file-text', title: '02 Open the guide', body: 'Follow the file link' },
        { icon: 'pen-tool', title: '03 Make it yours', body: 'Edit slides right away' },
      ],
    }),
  ],
});
