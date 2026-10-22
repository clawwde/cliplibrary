import { definePack, LANDSCAPE } from '../../../pack';
import { listingPages } from './listing';
import type { ListingTheme } from './listing-info';
import { bigStat, growProfit, growStory, leadersChart, POSTS, RUBY, TEAL } from './posts';

const THEME: ListingTheme = {
  page: '#070204',
  brand: '#e11d48',
  brandDeep: '#7f1028',
  brandText: '#e11d48',
  onBrand: '#ffffff',
  accent: '#fbbf24',
  glow: '#fda4af',
  glowDeep: '#be123c',
  ink: '#16050a',
  muted: '#4b3f43',
  headFont: 'Plus Jakarta Sans',
  headWidth: 0.6,
  bodyFont: 'Inter',
  bodyWidth: 0.54,
};

export const rubyKeyStatsPack = definePack({
  id: 'ruby-key-stats',
  title: 'Ruby Key Stats',
  description:
    'Key statistic, trend chart, client result and growth posts in ruby and gold, with a matching story.',
  category: 'social-posts',
  tags: ['stats', 'instagram', 'ai', 'small-business', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: listingPages(
    THEME,
    {
      kicker: 'Ready-to-Use',
      title: 'Key Statistics',
      line: ['Data-Driven Templates for', 'Marketing'],
      count: '5 Premium Social Media Posts + Story',
      showcase: ['Premium', 'Stat Posts'],
      showcaseNote: 'Finished layouts, built to make your numbers land',
      handle: 'brightline.studio',
      steps: [
        'Instant download after checkout',
        'Swap the numbers, colours and logo',
        'Export and share on every channel',
      ],
      stepsNote: 'No design skills needed: the editor runs right in your browser.',
      offers: [
        'Buy one pack, get a second one free.*',
        'Just message us after your purchase.',
        'LIMITED TIME: the offer ends soon',
      ],
      offerNote: '*The second pack must be the same price or lower.',
      studio: ['Brightline', 'Studio'],
      folder: 'Stats Kit',
      host: 'man-portrait-1',
    },
    {
      posts: POSTS,
      story: growStory,
      feature: growProfit(RUBY),
      edits: [
        [leadersChart(RUBY), leadersChart(TEAL)],
        [bigStat(RUBY), bigStat(TEAL)],
      ],
    },
  ),
});
