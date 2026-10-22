import { definePack, LANDSCAPE } from '../../../pack';
import { listingPages } from './listing';
import type { ListingTheme } from './listing-info';
import { GOLD, lastDay, lastDayStory, POSTS, priceTag, VIOLET } from './posts';

const THEME: ListingTheme = {
  page: '#050505',
  brand: '#ffc400',
  brandDeep: '#f59e0b',
  brandText: '#c98a00',
  onBrand: '#0a0a0a',
  accent: '#ffc400',
  glow: '#ffd84d',
  glowDeep: '#b7791f',
  ink: '#0a0a0a',
  muted: '#3f3f46',
  headFont: 'Archivo Black',
  headWidth: 0.58,
  bodyFont: 'Montserrat',
  bodyWidth: 0.6,
};

export const goldlineBlackFridayPack = definePack({
  id: 'goldline-black-friday',
  title: 'Goldline Black Friday',
  description:
    'Black Friday sale, price tag, countdown and last call posts in gold and black, with a matching story.',
  category: 'seasonal',
  tags: ['sale', 'holiday', 'small-business', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      kicker: 'Ready-to-Use',
      title: 'BLACK FRIDAY',
      line: ['Small Business', 'Marketing'],
      count: '5 Premium Social Media Posts + Story',
      showcase: ['Black Friday', 'Sale Posts'],
      showcaseNote: 'Finished layouts, built to move stock fast',
      handle: 'goldline.shop',
      steps: [
        'Instant download after checkout',
        'Edit prices, dates and colours',
        'Export and share on every channel',
      ],
      stepsNote: 'No design skills needed: the editor runs right in your browser.',
      offers: [
        'Buy one pack, get a second one free.*',
        'Just message us after your purchase.',
        'LIMITED TIME: the offer ends soon',
      ],
      offerNote: '*The second pack must be the same price or lower.',
      studio: ['Goldline', 'Studio'],
      folder: 'Sale Kit',
      host: 'woman-portrait-6',
    },
    {
      posts: POSTS,
      story: lastDayStory,
      feature: priceTag(GOLD),
      edits: [
        [lastDay(GOLD), lastDay(VIOLET)],
        [priceTag(GOLD), priceTag(VIOLET)],
      ],
    },
  ),
});
