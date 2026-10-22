import { editableLaptop, howToStart, type SlideTheme, SQUARE_SIZE } from '../../../kit';
import { definePack, SQUARE } from '../../../pack';
import {
  type CarouselRow,
  carouselCover,
  carouselRowPhones,
} from '../mulberry-growth-carousels/listing';
import {
  stepClients,
  stepShowUp,
  stepsCover,
  stepTrust,
  tipAudience,
  tipConsistent,
  tipsCover,
  tipValues,
} from './slides-dark';
import { leadQuestions, leadSpeed, leadsCover, leadValue } from './slides-leads';
import {
  brandingCover,
  brandingImage,
  brandingSalesperson,
  brandingVersus,
  consistencyCover,
  loopSlide,
  smarterSlide,
  strategySlide,
} from './slides-light';

const LIGHT: SlideTheme = {
  background: '#ecebe8',
  text: '#161512',
  muted: '#45423b',
  surface: '#ffffff',
  ink: '#161512',
  brand: '#24252b',
  accent: '#f5a800',
  headFont: 'Manrope',
  bodyFont: 'Manrope',
};

const DARK: SlideTheme = {
  ...LIGHT,
  background: '#050505',
  text: '#ffffff',
  muted: '#d6d3cd',
  accent: '#ffc93c',
};

const CONSISTENCY: CarouselRow = [consistencyCover, smarterSlide, loopSlide, strategySlide];
const TIPS: CarouselRow = [tipsCover, tipConsistent, tipAudience, tipValues];
const BRANDING: CarouselRow = [brandingCover, brandingImage, brandingVersus, brandingSalesperson];
const STEPS: CarouselRow = [stepsCover, stepTrust, stepClients, stepShowUp];
const LEADS: CarouselRow = [leadsCover, leadSpeed, leadQuestions, leadValue];

const feed = { subtitle: 'LinkedIn Post', handle: 'harbourline', followers: '18,342 followers' };

const phones = (title: string, row: CarouselRow) =>
  carouselRowPhones(SQUARE_SIZE, LIGHT, { ...feed, title }, row);

export const sunflowerBrandCarouselsPack = definePack({
  id: 'sunflower-brand-carousels',
  title: 'Sunflower Brand Carousels',
  description:
    'Five LinkedIn carousels in cream, charcoal and glowing sunflower yellow about branding, consistency and converting leads.',
  category: 'carousels',
  tags: ['carousel', 'linkedin', 'b2b', 'tips', 'comparison'],
  theme: 'light',
  ...SQUARE,
  pages: [
    carouselCover(
      SQUARE_SIZE,
      LIGHT,
      { count: '5', label: ['LinkedIn', 'Carousel', 'Templates'].join('\n'), pages: '20 Slides' },
      [CONSISTENCY, TIPS, BRANDING, STEPS, LEADS],
    ),
    phones('Carousel Kit 1', CONSISTENCY),
    phones('Carousel Kit 2', TIPS),
    phones('Carousel Kit 3', BRANDING),
    phones('Carousel Kit 4', STEPS),
    phones('Carousel Kit 5', LEADS),
    editableLaptop(
      SQUARE_SIZE,
      DARK,
      {
        title: 'Edit it all in the browser',
        body: 'Rewrite text, change fonts or colours, swap icons and nudge the layout to fit your brand.',
      },
      [...CONSISTENCY, ...TIPS, ...BRANDING],
    ),
    howToStart(SQUARE_SIZE, DARK, {
      title: 'How To Begin',
      steps: [
        { icon: 'shopping-cart', title: '01 Order', body: 'Complete the quick checkout' },
        { icon: 'download', title: '02 Open', body: 'Load the carousels in the editor' },
        { icon: 'pencil', title: '03 Edit', body: 'Customise and export each slide' },
      ],
    }),
  ],
});
