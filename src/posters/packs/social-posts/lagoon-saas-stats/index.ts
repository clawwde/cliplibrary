import { linear } from '@/design';
import { definePack, LANDSCAPE } from '../../../pack';
import { coverPage, deliverablesPage, editablePage, showcasePage } from './listing';
import { bonusPage, brandPage, howItWorksPage } from './listing-more';
import { type StatsCopy, statTemplates } from './posts';
import type { ListingCopy, ListingTheme, PostTheme } from './theme';

const LAGOON: PostTheme = {
  background: linear(200, '#0f7f77', '#04201f'),
  surface: '#ffffff',
  ink: '#0b1f1e',
  text: '#ffffff',
  muted: '#a9d6d1',
  brand: '#c6f432',
  brandText: '#0b1f1e',
  deep: '#062e2b',
  star: '#ffffff',
  headFont: 'Urbanist',
  bodyFont: 'DM Sans',
};

const PEACH: PostTheme = {
  ...LAGOON,
  background: '#ffe2d4',
  ink: '#3b1206',
  text: '#3b1206',
  muted: '#8a4b3a',
  brand: '#ff5a36',
  brandText: '#ffffff',
  deep: '#ff5a36',
  star: '#ffffff',
};

const COPY: StatsCopy = {
  useCases: {
    title: 'Automation wins that\nlift SaaS revenue',
    subtitle: 'Where product teams put AI to work\nthis quarter. Where do you stand?',
    main: ['64%', 'Support replies'],
    second: ['47%', 'Code review'],
    star: '58%',
    small: '21%',
    notes: ['Lead scoring\nand outreach', 'Reporting and data cleanup'],
  },
  leaders: {
    kicker: 'Product growth report',
    title: 'Where CTOs are\ninvesting this year',
    points: [
      ['48%', 'Cloud cost\ncontrol'],
      ['69%', 'Customer\nonboarding'],
      ['88%', 'AI copilots\nin product'],
    ],
    footer: 'Need a roadmap like this? Send us a message.',
  },
  profit: {
    title: 'Scale Your\nMRR With Us',
    value: '94%',
    body: 'Our retention playbook helps subscription teams cut churn and turn trial users into loyal, paying customers.',
  },
  bars: {
    value: '71%',
    title: 'of SaaS teams lose 15+ hours\na week to manual reporting',
    source: 'Cloud Operations Survey 2026. Automate the busywork.',
  },
  results: {
    kicker: 'Quarterly results',
    title: 'What our clients saw\nafter ninety days',
    items: ['Trial signups grew\nby 38%', 'Churn dropped\nby 12%', 'Onboarding time\ncut in half'],
  },
};

const LISTING: ListingTheme = {
  page: '#020d0c',
  text: '#ffffff',
  muted: '#9fb8b5',
  brand: '#0f8f86',
  brandDeep: '#042f2c',
  highlight: '#0d9488',
  accent: '#c6f432',
  folder: linear(135, '#b9ef3a', '#0d9488'),
  ink: '#0b1f1e',
  headFont: 'Urbanist',
  bodyFont: 'DM Sans',
};

const LISTING_COPY: ListingCopy = {
  kicker: 'Ready-to-Use',
  title: 'Key Statistics',
  line: 'SaaS & Tech Marketing Templates',
  count: '5 Premium Social Media Posts + Story',
  bonus: 'YOUR BONUS IS INSIDE  →  SWIPE TO SEE IT',
  showcase: ['Premium', 'SaaS Growth Insights'],
  showcaseNote: 'Polished layouts, tuned for sharing your numbers',
  editable: 'Editable\nSocial Post\nTemplates\nOnline',
  steps: [
    'Download right after checkout',
    'Change text, colours and branding in the editor',
    'Export and share on every channel',
  ],
  stepsNote: 'No design skills needed: the editor runs right in your browser.',
  offers: [
    'Buy one pack, get another one free.*',
    'Message us after your order.',
    'LIMITED TIME: grab it before the offer ends',
  ],
  offerNote: '*The free pack must carry the same price or lower.',
  studio: ['Tidewater', 'Studio'],
  folder: 'Stat Kit',
  folderSize: '22.40 MB',
  handle: 'tidewater.studio',
};

const MAIN = statTemplates(LAGOON, COPY);
const ALT = statTemplates(PEACH, COPY);

export const lagoonSaasStatsPack = definePack({
  id: 'lagoon-saas-stats',
  title: 'Lagoon SaaS Stats',
  description:
    'Key statistic, trend line, result card and growth posts for SaaS teams in deep teal and lime, with a matching story.',
  category: 'social-posts',
  tags: ['stats', 'saas', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      LISTING,
      LISTING_COPY,
      [
        MAIN.results,
        MAIN.bars,
        MAIN.leaders,
        MAIN.useCases,
        MAIN.profit,
        MAIN.leaders,
        MAIN.results,
      ],
      MAIN.useCases,
    ),
    showcasePage(
      LISTING,
      LISTING_COPY,
      [MAIN.useCases, MAIN.leaders],
      [MAIN.profit, MAIN.bars, MAIN.results],
    ),
    deliverablesPage(LISTING, LISTING_COPY, MAIN.results, MAIN.story),
    editablePage(LISTING, LISTING_COPY, [
      [MAIN.useCases, ALT.useCases],
      [MAIN.results, ALT.results],
    ]),
    howItWorksPage(LISTING, LISTING_COPY),
    bonusPage(LISTING, LISTING_COPY, 'man-portrait-3'),
    brandPage(LISTING, LISTING_COPY, [
      MAIN.bars,
      MAIN.profit,
      MAIN.useCases,
      MAIN.leaders,
      MAIN.results,
    ]),
  ],
});
