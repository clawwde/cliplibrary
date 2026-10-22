import { linear } from '@/design';
import { definePack, LANDSCAPE } from '../../../pack';
import { coverPage, deliverablesPage, editablePage } from '../lagoon-saas-stats/listing';
import { bonusPage, brandPage, howItWorksPage } from '../lagoon-saas-stats/listing-more';
import type { ListingCopy, ListingTheme } from '../lagoon-saas-stats/theme';
import type { ShiftTheme } from './posts';
import { type ShiftCopy, shiftTemplates } from './posts-more';
import { transformationShowcase } from './showcase';

const COBALT: ShiftTheme = {
  brand: '#2f5bff',
  panel: '#1b1f2b',
  dark: '#0b0d14',
  paper: '#ffffff',
  ink: '#0b0d14',
  onBrand: '#ffffff',
  pop: '#ffd23f',
  star: '#ffffff',
  headFont: 'Manrope',
  bodyFont: 'Inter',
};

const SAGE: ShiftTheme = {
  ...COBALT,
  brand: '#5f8f6e',
  panel: '#24332a',
  dark: '#141b17',
  ink: '#141b17',
  pop: '#e3edb8',
  star: '#e3edb8',
};

const COPY: ShiftCopy = {
  myth: {
    myth: 'Social media only works\nfor big brands.',
    fact: 'Small brands win with a\nclear, steady plan.',
  },
  dos: {
    kicker: 'What you\nshould',
    title: "Do's and Don'ts",
    dos: [
      'Post on a steady\nschedule',
      'Use crisp, on-brand\nvisuals',
      'Reply to every\ncomment',
      'Share real customer\nstories',
      'Track what\nconverts',
    ],
    donts: [
      'Post only when\nyou remember',
      'Use blurry or\noff-brand images',
      'Ignore questions\nin your inbox',
      'Buy fake\nfollowers',
      'Copy other\nbrands word for word',
    ],
  },
  problem: {
    problem: 'I post every day but\nmy sales stay flat.',
    solution: 'We map each post to\nyour buyer journey.',
  },
  direction: {
    kicker: 'PICK THE',
    title: 'SMARTER PATH',
    before: 'Manual posting\nSlow replies\nLess free time',
    after: 'Auto scheduling\nQuick replies\nMore free time',
    people: ['man-portrait-2', 'man-portrait-3'],
  },
  hook: {
    lines: ['Most makeovers fade', 'fast, and hardly anyone'],
    punch: 'explains why.',
    body: 'Read the first comment to see what they\nare really selling you.',
  },
};

const LISTING: ListingTheme = {
  page: '#05070f',
  text: '#ffffff',
  muted: '#a3acc7',
  brand: '#2f5bff',
  brandDeep: '#0d1a66',
  highlight: '#2f5bff',
  accent: '#ffd23f',
  folder: linear(135, '#9db5ff', '#2f5bff'),
  ink: '#0b0d14',
  headFont: 'Manrope',
  bodyFont: 'Inter',
};

const LISTING_COPY: ListingCopy = {
  kicker: 'Ready-to-Use',
  title: 'Before vs After',
  line: 'Small Business Marketing',
  count: '5 Premium Social Media Posts + Story',
  bonus: 'A BONUS IS WAITING  →  SWIPE TO UNLOCK IT',
  showcase: ['Premium', 'Transformation Posts'],
  showcaseNote: '',
  editable: 'Editable\nSocial Post\nTemplates\nOnline',
  steps: [
    'Download instantly after checkout',
    'Swap text, colours and photos in the editor',
    'Export and share on your channels',
  ],
  stepsNote: 'No design skills needed: it all works in your browser.',
  offers: [
    'Order one pack, get a second free.*',
    'Message us once you have ordered.',
    'LIMITED TIME: claim it before it ends',
  ],
  offerNote: '*The free pack must be the same price or lower.',
  studio: ['Northpier', 'Studio'],
  folder: 'Shift Kit',
  folderSize: '21.65 MB',
  handle: 'northpier.studio',
};

const MAIN = shiftTemplates(COBALT, COPY);
const ALT = shiftTemplates(SAGE, COPY);

export const cobaltBeforeAfterPack = definePack({
  id: 'cobalt-before-after',
  title: 'Cobalt Before After',
  description:
    'Myth versus fact, do and do not, problem and solution and before and after posts in cobalt and sunshine yellow, with a matching story.',
  category: 'social-posts',
  tags: ['comparison', 'small-business', 'instagram', 'story', 'tips'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      LISTING,
      LISTING_COPY,
      [MAIN.problem, MAIN.dos, MAIN.direction, MAIN.hook, MAIN.problem, MAIN.myth, MAIN.direction],
      MAIN.myth,
    ),
    transformationShowcase(
      LISTING,
      {
        title: 'Social Media Posts\nTransformation',
        note: 'Finished layouts, built to spark conversations',
        stamp: 'Premium',
      },
      [MAIN.direction, MAIN.hook],
      [MAIN.myth, MAIN.problem, MAIN.dos],
    ),
    deliverablesPage(LISTING, LISTING_COPY, MAIN.hook, MAIN.story),
    editablePage(LISTING, LISTING_COPY, [
      [MAIN.myth, ALT.myth],
      [MAIN.dos, ALT.dos],
    ]),
    howItWorksPage(LISTING, LISTING_COPY),
    bonusPage(LISTING, LISTING_COPY, 'woman-portrait-5'),
    brandPage(LISTING, LISTING_COPY, [
      MAIN.myth,
      MAIN.dos,
      MAIN.problem,
      MAIN.direction,
      MAIN.hook,
    ]),
  ],
});
