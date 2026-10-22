import type { DesignIconName } from '@/design';
import { circle, icon, line, photo, rect, template, text } from '../../../kit';
import { background, body, EMBER, HEAD, heading, SH, SW, strong, tag, wordmark } from './deck-kit';

const E = EMBER;

const results = [
  { value: '312%', label: 'Qualified pipeline' },
  { value: '1.4M', label: 'Pipeline generated' },
  { value: '4.2x', label: 'Campaign return' },
] as const;

export const caseStudySlide = template(SW, SH, () => [
  background(E.ink),
  heading('Case Study Spotlight', 100, 70, 130, E.paper),
  rect(100, 300, 620, 200, E.paper, { cornerRadius: 28, name: 'Logo box' }),
  wordmark('kitebase', 170, 355, 84, E.ink, E.paper),
  body(
    'How a Series B software company rebuilt its go-to-market motion, widened outbound pipeline and lifted acquisition velocity within 90 days.',
    100,
    560,
    640,
    30,
    '#c9cdd6',
  ),
  strong('CLIENT TIMELINE', 900, 300, 700, 32, E.paper),
  body('End-to-end rollout, from first audit to scaled revenue.', 900, 350, 900, 28, '#c9cdd6'),
  line(900, 500, 900, E.accent, 6),
  ['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, index) => [
    text(quarter, 860 + index * 290, 430, 80, {
      fontFamily: 'Inter',
      fontSize: 26,
      fontWeight: 800,
      fill: E.paper,
      align: 'center',
    }),
    circle(900 + index * 290, 503, 18, E.accent),
  ]),
  results.map((result, index) => {
    const x = 900 + index * 310;
    const featured = index === 0;
    return [
      rect(x, 620, 280, 300, featured ? E.accent : E.paper, { cornerRadius: 26, name: 'Result' }),
      heading(result.value, x + 30, 660, 100, E.ink, 240),
      strong(result.label, x + 30, 800, 220, 26, E.ink),
    ];
  }),
]);

const markets = [
  { label: 'Total addressable market', fill: E.ink },
  { label: 'Serviceable market', fill: E.accent },
  { label: 'Obtainable market', fill: '#ffb199' },
  { label: 'Ideal customer profile', fill: E.soft },
] as const;

export const marketSizeSlide = template(SW, SH, () => [
  background(E.paper),
  heading('Market Size', 100, 80, 130, E.ink),
  body(
    'Measured benchmarks show where demand is real, how fast it grows and which accounts we can win first.',
    100,
    270,
    720,
    32,
    E.grey,
  ),
  markets.map((market, index) => [
    circle(118, 640 + index * 80, 18, market.fill),
    body(market.label, 160, 620 + index * 80, 600, 30, E.ink),
  ]),
  circle(1200, 560, 320, E.ink),
  heading('TAM', 1000, 440, 140, E.paper, 400, 'center'),
  text('$180M', 1000, 600, 400, {
    fontFamily: 'Inter',
    fontSize: 44,
    fontWeight: 800,
    fill: E.paper,
    align: 'center',
  }),
  circle(1640, 290, 150, E.accent),
  heading('SAM', 1540, 220, 80, E.ink, 200, 'center'),
  circle(1700, 660, 120, '#ffb199'),
  heading('SOM', 1600, 610, 70, E.ink, 200, 'center'),
  circle(1530, 920, 90, E.soft),
  heading('ICP', 1430, 880, 60, E.ink, 200, 'center'),
]);

const phases = [
  {
    tag: 'Days 1-30',
    title: 'Foundation',
    body: 'Clean the data, audit attribution and agree on targets with every team.',
  },
  {
    tag: 'Days 31-60',
    title: 'Activation',
    body: 'Launch targeted multi-channel campaigns and capture in-market intent.',
  },
  {
    tag: 'Days 61-90',
    title: 'Scaling',
    body: 'Reinvest in the best channels and automate the winning sequences.',
  },
] as const;

export const roadmapSlide = template(SW, SH, () => [
  background(E.ink),
  heading('Implementation Roadmap', 0, 70, 120, E.paper, SW, 'center'),
  line(200, 300, 1520, E.accent, 6),
  phases.map((phase, index) => {
    const x = 150 + index * 560;
    const featured = index === 0;
    return [
      circle(x + 250, 303, 20, E.accent),
      rect(x, 370, 500, 600, featured ? E.accent : E.paper, { cornerRadius: 30, name: 'Phase' }),
      tag(phase.tag, x + 40, 410, E.ink, E.paper),
      heading(phase.title, x + 40, 520, 76, E.ink, 420),
      body(phase.body, x + 40, 640, 420, 30, E.ink),
    ];
  }),
]);

const wordRows: readonly (readonly string[])[] = [
  ['ENGAGEMENT,', 'BRANDING,', 'SEO'],
  ['OPTIMIZATION,', 'GROWTH'],
  ['ADVERTISING,', 'WEB DESIGN'],
  ['STRATEGY,', 'CONTENT,', 'DATA'],
  ['ANALYTICS,', 'OUTREACH'],
  ['PIPELINE,', 'SOCIAL,', 'EMAIL'],
];

export const wordsSlide = template(SW, SH, () => [
  background(E.ink),
  wordRows.map((words, row) => {
    let x = row % 2 === 0 ? 40 : 150;
    return words.map((word, index) => {
      const start = x;
      x += word.length * 74 + 36;
      return text(word, start, 50 + row * 170, word.length * 74 + 20, {
        fontFamily: HEAD,
        fontSize: 150,
        fontWeight: 400,
        fill: (row + index) % 2 === 0 ? E.paper : E.accent,
        lineHeight: 1,
      });
    });
  }),
]);

export const customerSlide = template(SW, SH, () => [
  background(E.paper),
  heading('Ideal Customer Profile', 100, 70, 120, E.ink),
  circle(430, 640, 260, E.accent),
  photo('woman-portrait-5', 190, 300, 480, 640, { cornerRadius: 32 }),
  rect(560, 800, 440, 160, E.ink, { cornerRadius: 22, name: 'Name card' }),
  heading('Maya Okonjo', 600, 830, 54, E.paper, 380),
  strong('VP MARKETING', 600, 900, 380, 24, E.accent),
  strong('B2B SOFTWARE', 1100, 300, 700, 44, E.ink),
  body('Mid-market companies selling to operations and finance teams.', 1100, 360, 700, 28, E.grey),
  strong('$5M-$50M ARR', 1100, 490, 700, 44, E.ink),
  body('Scaling with a proven product and a stretched marketing team.', 1100, 550, 700, 28, E.grey),
  strong('PAIN POINTS', 1100, 680, 700, 44, E.ink),
  ['High acquisition cost and slow sales cycles', 'Too little pipeline to hit revenue targets'].map(
    (point, index) => [
      circle(1112, 768 + index * 60, 8, E.accent),
      body(point, 1140, 750 + index * 60, 680, 28, E.ink),
    ],
  ),
]);

const ICONS: readonly DesignIconName[] = [
  'wifi',
  'zap',
  'cloud',
  'code',
  'monitor',
  'database',
  'refresh-cw',
  'download',
  'upload',
  'phone',
  'rocket',
  'headphones',
  'keyboard',
  'laptop',
  'play',
  'cpu',
  'mouse',
  'gamepad-2',
  'mic',
  'message-square',
  'share-2',
  'git-branch',
  'camera',
  'layers',
  'video',
  'settings',
  'chart-bar',
  'radio-tower',
  'server',
  'brain',
  'smartphone',
  'printer',
  'shield-check',
  'lock',
  'key',
  'search',
  'bell',
  'calendar',
  'clock',
  'map-pin',
  'mail',
  'globe',
  'link',
  'user',
  'users',
  'briefcase',
  'store',
  'target',
  'trending-up',
  'chart-pie',
  'dollar-sign',
  'wallet',
  'credit-card',
  'shopping-cart',
  'gift',
  'tag',
  'award',
  'trophy',
  'crown',
  'flame',
  'heart',
  'star',
  'bookmark',
  'send',
  'image',
  'music',
  'tablet',
  'terminal',
  'bot',
  'puzzle',
  'workflow',
  'megaphone',
  'lightbulb',
  'sparkles',
  'compass',
  'qr-code',
  'scan-face',
  'handshake',
];

export const iconSheet = (start: number) =>
  template(SW, SH, () => [
    background(E.paper),
    Array.from({ length: 78 }, (_, index) => {
      const name = ICONS[(index + start) % ICONS.length] ?? 'star';
      return icon(name, 170 + (index % 13) * 128, 188 + Math.floor(index / 13) * 128, 64, E.ink, {
        strokeWidth: 2,
      });
    }),
  ]);
