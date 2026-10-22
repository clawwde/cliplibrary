import { linear } from '@/design';
import { avatar, circle, icon, photo, poly, rating, rect, template } from '../../../kit';
import { backdrop, body, CV, glow, head, SH, SW, wash } from './theme';

const ratingPill = (label: string, x: number, y: number, stars: number) => [
  body(label, x, y, 300, 26, CV.white, { align: 'center', fontWeight: 600 }),
  rect(x, y + 50, 300, 80, linear(90, '#6e2340', '#b4567a'), {
    name: 'Rating pill',
    cornerRadius: 40,
    stroke: CV.edge,
    strokeWidth: 2,
  }),
  rating(x + 39, y + 72, 36, 5, CV.blush, 0.3).map((element, index) =>
    index < stars ? element : { ...element, opacity: 0.35 },
  ),
];

const TOP_ROW = ['Uptime', 'Support', 'Scalability', 'Security', 'Onboarding'];
const BOTTOM_ROW = ['Integrations', 'Reporting', 'Automation', 'Analytics'];

export const performanceSlide = template(SW, SH, () => [
  backdrop(),
  wash(0, 0.2),
  TOP_ROW.map((label, index) => ratingPill(label, 120 + index * 340, 130, index === 3 ? 4 : 5)),
  BOTTOM_ROW.map((label, index) => ratingPill(label, 290 + index * 340, 360, index === 1 ? 4 : 5)),
  head('Performance Unmatched', 0, 680, SW, 80, CV.white, { align: 'center' }),
  body(
    'Built for speed, backed by dependable uptime\nand a team that answers within minutes.',
    0,
    800,
    SW,
    34,
    CV.muted,
    { align: 'center' },
  ),
]);

export const spotlightSlide = template(SW, SH, () => [
  backdrop(),
  wash(45, 0.16),
  head('Client Success\nSpotlight', 120, 150, 820, 84, CV.white),
  body(
    'Before Corvane, a fragmented stack cost this logistics leader hours of manual syncing every week. Now one workspace keeps every region aligned.',
    120,
    380,
    780,
    32,
    CV.muted,
  ),
  rect(120, 680, 330, 210, CV.white, { name: 'Stat card', cornerRadius: 28 }),
  head('91%', 156, 716, 280, 76, CV.ink),
  body('Fewer manual tasks', 156, 818, 280, 28, '#6b3a4b'),
  rect(480, 680, 330, 210, linear(135, CV.rose, '#c25b7e'), {
    name: 'Stat card',
    cornerRadius: 28,
  }),
  head('12K hrs', 516, 722, 290, 64, CV.white),
  body('Saved every year', 516, 818, 280, 28, CV.white),
  photo('meeting-1', 1000, 120, 800, 840, { cornerRadius: 32 }),
]);

const NODES = [
  { name: 'Relay', icon: 'zap', text: 'Event triggers that\nsync every app in seconds.' },
  {
    name: 'Flowbase',
    icon: 'workflow',
    text: 'Visual pipelines that\nmove data where it belongs.',
  },
  { name: 'Codepath', icon: 'code', text: 'Open APIs for teams\nthat want full control.' },
] as const;

export const ecosystemSlide = template(SW, SH, () => [
  backdrop(),
  head('Ecosystem Connectivity', 0, 130, SW, 76, CV.white, { align: 'center' }),
  body('A phased, structured approach to linking your tools and data.', 0, 240, SW, 32, CV.muted, {
    align: 'center',
  }),
  rect(480, 519, 960, 3, 'rgba(241,155,176,0.5)', { name: 'Connector' }),
  NODES.map((node, index) => {
    const cx = 480 + index * 480;
    return [
      glow(cx, 520, 170, 0.3),
      rect(cx - 75, 445, 150, 150, linear(160, CV.white, CV.blush), {
        name: 'Node tile',
        cornerRadius: 34,
      }),
      icon(node.icon, cx - 36, 484, 72, CV.berry, { strokeWidth: 2 }),
      head(node.name, cx - 220, 650, 440, 46, CV.white, { align: 'center' }),
      body(node.text, cx - 220, 720, 440, 28, CV.muted, { align: 'center' }),
    ];
  }),
]);

export const quoteSlide = template(SW, SH, () => [
  backdrop(),
  wash(225, 0.18),
  icon('quote', 140, 130, 150, CV.rose, { strokeWidth: 2 }),
  head(
    'Beyond clean data, they gave our analysts two hours of focus back every single day.',
    140,
    360,
    1560,
    72,
    CV.white,
    { lineHeight: 1.2 },
  ),
  rect(140, 760, 1640, 2, CV.edge, { name: 'Rule' }),
  avatar('woman-portrait-5', 1290, 880, 58, CV.rose),
  head('Lena Whitfield', 1372, 840, 420, 36, CV.white),
  body('COO, Brightline Labs', 1372, 886, 420, 28, CV.muted),
]);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const SERIES = [
  { label: 'Direct', fill: 'rgba(255,214,223,0.9)', values: [0.16, 0.27, 0.36, 0.52, 0.7, 0.95] },
  { label: 'Referral', fill: CV.rose, values: [0.1, 0.16, 0.24, 0.31, 0.44, 0.62] },
  { label: 'Search', fill: '#8a2e50', values: [0.05, 0.08, 0.12, 0.17, 0.23, 0.32] },
];
const BASE = 900;
const CHART_H = 640;

export const growthSlide = template(SW, SH, () => [
  backdrop(),
  head('Growth\nConversions', 120, 220, 620, 80, CV.white),
  body(
    'Trend analysis shows a 46% lift in conversions as page traffic and product sign-ups climb together.',
    120,
    440,
    580,
    30,
    CV.muted,
  ),
  [0, 1, 2, 3, 4].map((level) => [
    rect(880, BASE - (level * CHART_H) / 4, 920, 2, CV.edge, { name: 'Grid line' }),
    body(String(level * 40), 800, BASE - (level * CHART_H) / 4 - 18, 60, 24, CV.muted, {
      align: 'right',
    }),
  ]),
  SERIES.map((series) =>
    poly(
      [
        [880, BASE],
        ...series.values.map(
          (value, index) => [880 + index * 184, BASE - value * CHART_H] as const,
        ),
        [1800, BASE],
      ],
      series.fill,
      { name: `${series.label} area` },
    ),
  ),
  MONTHS.map((month, index) =>
    body(month, 850 + index * 184, BASE + 20, 60, 24, CV.muted, { align: 'center' }),
  ),
  SERIES.map((series, index) => [
    circle(1290 + index * 190, 150, 12, series.fill),
    body(series.label, 1312 + index * 190, 134, 160, 26, CV.white),
  ]),
  head('+46%', 120, 720, 400, 96, CV.rose),
  body('Conversion lift in six months', 120, 840, 600, 28, CV.white),
]);
