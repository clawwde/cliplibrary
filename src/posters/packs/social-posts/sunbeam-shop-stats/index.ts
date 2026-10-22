import { linear } from '@/design';
import { definePack, LANDSCAPE } from '../../../pack';
import {
  coverPage,
  deliverablesPage,
  editablePage,
  showcasePage,
} from '../lagoon-saas-stats/listing';
import { bonusPage, brandPage, howItWorksPage } from '../lagoon-saas-stats/listing-more';
import { type StatsCopy, statTemplates } from '../lagoon-saas-stats/posts';
import type { ListingCopy, ListingTheme, PostTheme } from '../lagoon-saas-stats/theme';

const SUN: PostTheme = {
  background: '#ffc83d',
  surface: '#ffffff',
  ink: '#101a3a',
  text: '#101a3a',
  muted: '#4a4f63',
  brand: '#101a3a',
  brandText: '#ffc83d',
  deep: '#101a3a',
  star: '#ffffff',
  headFont: 'Outfit',
  bodyFont: 'Inter',
};

const NAVY: PostTheme = {
  ...SUN,
  background: '#0e1530',
  ink: '#0e1530',
  text: '#ffffff',
  muted: '#a9b1d6',
  brand: '#ffc83d',
  brandText: '#0e1530',
  deep: '#24306a',
  star: '#ffc83d',
};

const BERRY: PostTheme = {
  ...NAVY,
  background: linear(200, '#8a2be2', '#2a0a4a'),
  ink: '#2a0a4a',
  muted: '#d6c2f0',
  brandText: '#2a0a4a',
  deep: '#3c1170',
  star: '#ffffff',
};

const COPY: StatsCopy = {
  useCases: {
    title: 'Smart tools local\nshops rely on',
    subtitle: 'How small stores save time every\nweek. Which ones do you use?',
    main: ['72%', 'Online booking'],
    second: ['49%', 'Email offers'],
    star: '61%',
    small: '27%',
    notes: ['Stock level\nalerts', 'Bookkeeping and invoices'],
  },
  leaders: {
    kicker: 'Main street pulse',
    title: 'Where Owners are\nspending this season',
    points: [
      ['44%', 'Local\nads'],
      ['67%', 'Loyalty\nrewards'],
      ['83%', 'Online\nordering'],
    ],
    footer: 'Want a plan for your shop? Message us today.',
  },
  profit: {
    title: 'Boost Your\nSales With Us',
    value: '89%',
    body: 'Simple, proven marketing routines that bring regulars back and turn first visits into repeat orders.',
  },
  bars: {
    value: '64%',
    title: 'of shop owners spend 10+ hours\na week on admin they could skip',
    source: 'Neighbourhood Business Pulse 2026. Win back your evenings.',
  },
  results: {
    kicker: 'Client wins',
    title: 'The numbers our\nclients are cheering',
    items: ['Repeat orders rose\nby 31%', 'No-shows fell\nby 18%', 'Weekend visits\nup by 24%'],
  },
};

const LISTING: ListingTheme = {
  page: '#070b1d',
  text: '#ffffff',
  muted: '#a9b1d6',
  brand: '#e8a200',
  brandDeep: '#1a2350',
  highlight: '#e39b00',
  accent: '#ffc83d',
  folder: linear(135, '#ffd95e', '#f08c00'),
  ink: '#101a3a',
  headFont: 'Outfit',
  bodyFont: 'Inter',
};

const LISTING_COPY: ListingCopy = {
  kicker: 'Ready-to-Use',
  title: 'Shop Statistics',
  line: 'Small Business Marketing',
  count: '5 Premium Social Media Posts + Story',
  bonus: 'A FREE BONUS IS WAITING  →  SWIPE TO FIND IT',
  showcase: ['Premium', 'Small Business Numbers'],
  showcaseNote: 'Finished designs, made to make your figures pop',
  editable: 'Editable\nSocial Post\nTemplates\nOnline',
  steps: [
    'Grab your files right after checkout',
    'Edit numbers, colours and logo in the editor',
    'Download and post on your social pages',
  ],
  stepsNote: 'No design skills needed: everything works in your browser.',
  offers: [
    'Buy one pack, pick a second one free.*',
    'Send us a note after you order.',
    'LIMITED TIME: the offer closes soon',
  ],
  offerNote: '*The second pack must be the same price or lower.',
  studio: ['Brightside', 'Studio'],
  folder: 'Shop Stats',
  folderSize: '19.85 MB',
  handle: 'brightside.studio',
};

const MAIN = statTemplates(SUN, COPY);
const DARK = statTemplates(NAVY, COPY);
const ALT = statTemplates(BERRY, COPY);

export const sunbeamShopStatsPack = definePack({
  id: 'sunbeam-shop-stats',
  title: 'Sunbeam Shop Stats',
  description:
    'Small business statistic, trend, result and growth posts in sunflower yellow and midnight navy, with a matching story.',
  category: 'social-posts',
  tags: ['stats', 'small-business', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      LISTING,
      LISTING_COPY,
      [
        MAIN.results,
        DARK.profit,
        MAIN.useCases,
        DARK.leaders,
        MAIN.results,
        DARK.leaders,
        MAIN.bars,
      ],
      DARK.profit,
    ),
    showcasePage(
      LISTING,
      LISTING_COPY,
      [DARK.leaders, MAIN.results],
      [MAIN.bars, DARK.profit, MAIN.useCases],
    ),
    deliverablesPage(LISTING, LISTING_COPY, DARK.leaders, MAIN.story),
    editablePage(LISTING, LISTING_COPY, [
      [MAIN.results, ALT.results],
      [DARK.leaders, ALT.leaders],
    ]),
    howItWorksPage(LISTING, LISTING_COPY),
    bonusPage(LISTING, LISTING_COPY, 'man-portrait-1'),
    brandPage(LISTING, LISTING_COPY, [
      MAIN.bars,
      DARK.profit,
      MAIN.useCases,
      DARK.leaders,
      MAIN.results,
    ]),
  ],
});
