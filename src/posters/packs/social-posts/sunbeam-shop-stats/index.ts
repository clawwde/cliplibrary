import { linear } from '@/design';
import { definePack } from '../../../pack';
import { type StatsCopy, statTemplates } from '../lagoon-saas-stats/posts';
import type { PostTheme } from '../lagoon-saas-stats/theme';

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

  designs: [
    MAIN.results,
    DARK.profit,
    MAIN.useCases,
    DARK.leaders,
    MAIN.bars,
    MAIN.story,
    ALT.results,
    ALT.leaders,
  ],
});
