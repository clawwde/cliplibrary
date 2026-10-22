import { definePack, LANDSCAPE } from '../../../pack';
import { coverPage, deliverablesPage, type ListingStyle, showcasePage } from './listing';
import { bonusPage, brandPage, editablePage, howItWorksPage } from './listing-more';
import { AMBER, growProfit, leadersChart, resultsList, SKY } from './posts';
import { aiUseCases, wasteHours } from './posts-more';

const STYLE: ListingStyle = {
  background: '#0e0c22',
  text: '#ffffff',
  muted: '#b9b4dc',
  ink: '#15122e',
  brand: AMBER.brand,
  brandText: '#15122e',
  strip: '#f1f0f7',
  folderFrom: '#ffd27a',
  folderTo: '#f59e0b',
  head: 'Sora',
  body: 'Manrope',
};

const RESULTS = resultsList(AMBER);
const CHART = leadersChart(AMBER);
const PROFIT = growProfit(AMBER);
const HOURS = wasteHours(AMBER);
const BUBBLES = aiUseCases(AMBER);

export const amberInsightStatsPack = definePack({
  id: 'amber-insight-stats',
  title: 'Amber Insight Stats',
  description:
    'Key statistic and results posts for freelancers in amber and deep indigo, with charts, bubbles and matching stories.',
  category: 'social-posts',
  tags: ['stats', 'freelance', 'instagram', 'story'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    coverPage(
      STYLE,
      {
        title: 'Key Statistics',
        lead: 'Freelance Marketing Kit',
        accent: '5 premium social posts + story',
        bonus: 'YOUR BONUS IS WAITING  →  SWIPE TO SEE IT',
      },
      [CHART, HOURS, RESULTS, CHART, BUBBLES, RESULTS, PROFIT, BUBBLES, HOURS, PROFIT],
      RESULTS,
    ),
    showcasePage(
      STYLE,
      {
        title: 'Premium Social Media Insights',
        subtitle: 'Finished numbers and charts, ready to prove your value',
      },
      [RESULTS, CHART, PROFIT, HOURS, BUBBLES],
    ),
    deliverablesPage(STYLE, { count: '5' }, RESULTS, CHART),
    editablePage(STYLE, [RESULTS, resultsList(SKY)], [CHART, leadersChart(SKY)]),
    howItWorksPage(
      STYLE,
      [
        'Instant access right after checkout',
        'Swap in your own numbers, charts and colours',
        'Download and share on every channel',
      ],
      'No design skills needed: everything runs in the built-in editor.',
    ),
    bonusPage(STYLE, {
      offers: [
        'Buy one pack, take a second one free.*',
        'Drop us a message after purchase.',
        'LIMITED TIME: claim it before it closes',
      ],
      brandA: 'Northpeak',
      brandB: 'Studio',
      note: '*The second pack must be the same price or lower.',
      photo: 'man-portrait-1',
    }),
    brandPage(
      STYLE,
      { folder: 'Insight Kit', size: '14.9 MB', brandA: 'Northpeak', brandB: 'Studio' },
      [HOURS, PROFIT, BUBBLES, CHART, RESULTS],
    ),
  ],
});
