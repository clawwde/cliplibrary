import { definePack, LANDSCAPE } from '../../../pack';
import type { ListingTheme } from './listing';
import { listingPages } from './listing-more';
import {
  aiUsage,
  bigStat,
  CORAL,
  growProfit,
  growStory,
  leadersChart,
  MIDNIGHT,
  resultsNotes,
  VIOLET,
} from './posts';

const THEME: ListingTheme = {
  page: '#07060d',
  brand: VIOLET.brand,
  brandText: VIOLET.brand,
  onBrand: '#ffffff',
  accent: '#c6f26b',
  ink: VIOLET.ink,
  muted: '#52525b',
  folder: ['#b9a5ff', '#5b2fd6'],
  frame: '#c4b5fd',
  strip: '#f1edff',
  storyFill: VIOLET.brand,
  headFont: 'Sora',
  headScale: 1.12,
  bodyFont: 'Inter',
  bodyScale: 1,
};

const notes = resultsNotes(VIOLET);
const stat = bigStat(VIOLET);
const cases = aiUsage(VIOLET);
const chart = leadersChart(VIOLET);
const grow = growProfit(VIOLET);

export const violetPulseStatsPack = definePack({
  id: 'violet-pulse-stats',
  title: 'Violet Pulse Stats',
  description:
    'Key statistic, bar chart, trend line and growth posts in violet and lime, with a matching story.',
  category: 'social-posts',
  tags: ['stats', 'linkedin', 'ai', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      title: 'Key Statistics',
      channel: [{ content: 'Data Posts for ' }, { content: 'LinkedIn', fill: THEME.brand }],
      count: [
        { content: '5 ' },
        { content: 'Premium', fill: THEME.brand, weight: 800 },
        { content: ' social posts + a story' },
      ],
      bonus: 'A BONUS IS WAITING  >  SWIPE TO SEE IT',
      showcase: [{ content: 'Premium ', glow: true }, { content: 'Data Story Posts' }],
      showcaseNote: 'Finished layouts, built to make every number land',
      editTitle: 'Editable\nSocial Post\nTemplates in\nYour Browser',
      editLines: ['Restyle in\nMinutes', 'Every layer editable'],
      steps: [
        'Instant download after checkout',
        'Swap numbers, colours and your logo',
        'Export and share on every channel',
      ],
      stepsNote: 'No design skills needed: the built-in editor runs right in your browser.',
      offers: [
        'Buy one pack, get a second one free.*',
        'Send us a message after checkout.',
        'LIMITED TIME: grab it before it ends',
      ],
      offerNote: '*The free pack must be the same price or lower.',
      studio: ['Halcyon', 'Studio'],
      tagline: 'More Than a Template',
      folder: ['Pulse Kit', '21.6 MB'],
      host: 'man-portrait-3',
    },
    {
      posts: [notes, stat, cases, chart, grow],
      mosaic: [notes, stat, cases, chart, grow, stat, chart],
      feature: grow,
      story: growStory(VIOLET),
      showcase: [cases, notes, stat, chart, grow],
      edits: [
        [chart, leadersChart(CORAL)],
        [cases, aiUsage(MIDNIGHT)],
      ],
    },
  ),
});
