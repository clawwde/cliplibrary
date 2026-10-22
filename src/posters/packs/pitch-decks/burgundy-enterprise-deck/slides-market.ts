import { linear, radial } from '@/design';
import { circle, ellipse, icon, rect, template } from '../../../kit';
import { backdrop, body, CV, glass, glow, head, SH, SW } from './theme';

const TABLE = [
  ['Capability', 'Corvane', 'Vendor A', 'Vendor B'],
  ['Setup time', '< 1 day', '5-7 days', '3 weeks'],
  ['Accuracy', '99.2%', '94%', '91%'],
  ['Integrations', '120+', '45', '30'],
  ['Support', '24/7 live', 'Email only', 'Office hours'],
  ['Edge analytics', 'Built in', 'Add-on', 'None'],
];

const cellColor = (row: number, column: number) => {
  if (row === 0) {
    return CV.ink;
  }
  if (column === 0) {
    return CV.muted;
  }
  return column === 1 ? CV.blush : CV.white;
};

const tableCell = (cell: string, row: number, column: number, y: number) => {
  const first = column === 0;
  return body(
    cell,
    260 + column * 350 + (first ? 40 : 0),
    y,
    first ? 310 : 350,
    30,
    cellColor(row, column),
    {
      align: first ? 'left' : 'center',
      fontWeight: row === 0 || column < 2 ? 700 : 400,
    },
  );
};

export const benchmarksSlide = template(SW, SH, () => [
  backdrop(),
  head('Platform Benchmarks', 0, 100, SW, 76, CV.white, { align: 'center' }),
  body('How Corvane compares with the tools teams usually replace.', 0, 205, SW, 32, CV.muted, {
    align: 'center',
  }),
  rect(260, 320, 1400, 90, linear(90, CV.rose, '#d77a98'), {
    name: 'Header row',
    cornerRadius: 20,
  }),
  TABLE.map((row, rowIndex) => {
    const y = 320 + (rowIndex === 0 ? 0 : 90 + (rowIndex - 1) * 110);
    const height = rowIndex === 0 ? 90 : 110;
    return [
      rowIndex > 0 && rowIndex % 2 === 1
        ? rect(260, y, 1400, height, 'rgba(255,255,255,0.05)', { name: 'Row band' })
        : [],
      row.map((cell, column) => tableCell(cell, rowIndex, column, y + height / 2 - 21)),
    ];
  }),
  rect(260, 320, 1400, 640, 'rgba(0,0,0,0)', {
    name: 'Table frame',
    cornerRadius: 20,
    stroke: CV.edge,
    strokeWidth: 2,
  }),
]);

const sideColumn = (x: number, first: string, second: string, copy: string) => [
  head(first, x, 150, 460, 60, CV.white),
  head(second, x, 222, 460, 60, CV.rose),
  body(copy, x, 340, 440, 30, CV.muted),
];

export const feedbackSlide = template(SW, SH, () => [
  backdrop(),
  icon('refresh-cw', 160, 640, 320, 'rgba(255,214,223,0.08)', { strokeWidth: 1.4 }),
  icon('scan-face', 1440, 640, 320, 'rgba(255,214,223,0.08)', { strokeWidth: 1.4 }),
  sideColumn(
    140,
    'Dynamic',
    'Feedback',
    'Treat the assistant as a teammate. Review, refine and loop until the output fits your voice.',
  ),
  rect(700, 60, 520, 960, linear(170, CV.white, CV.blush), {
    name: 'Highlight panel',
    cornerRadius: 36,
  }),
  head('Engineered', 760, 150, 420, 60, CV.ink),
  head('Context', 760, 222, 420, 60, CV.berry),
  body(
    'Great answers need great inputs. Share the audience, the goal and the limits before the first prompt is ever written.',
    760,
    340,
    400,
    30,
    '#6b3a4b',
  ),
  icon('brain', 830, 640, 260, 'rgba(92,26,46,0.14)', { strokeWidth: 1.4 }),
  sideColumn(
    1300,
    'Structural',
    'Audit',
    'Ask for clear sections and checklists so every response can be scanned and verified fast.',
  ),
]);

const GLOBE = { cx: 1420, cy: 560, r: 410 };
const LINE = 'rgba(255,214,223,0.32)';
const CITIES = [
  [1240, 420],
  [1530, 380],
  [1660, 640],
  [1340, 760],
  [1480, 520],
] as const;

const globe = () => [
  circle(GLOBE.cx, GLOBE.cy, GLOBE.r, radial('rgba(241,155,176,0.28)', 'rgba(31,10,18,0.2)'), {
    stroke: LINE,
    strokeWidth: 2,
  }),
  [0.2, 0.5, 0.78].map((ratio) =>
    ellipse(
      GLOBE.cx - GLOBE.r * ratio,
      GLOBE.cy - GLOBE.r,
      GLOBE.r * ratio * 2,
      GLOBE.r * 2,
      'rgba(0,0,0,0)',
      {
        stroke: LINE,
        strokeWidth: 2,
      },
    ),
  ),
  [-0.75, -0.45, -0.15, 0.15, 0.45, 0.75].map((ratio) => {
    const half = GLOBE.r * Math.sqrt(1 - ratio * ratio);
    return rect(GLOBE.cx - half, GLOBE.cy + GLOBE.r * ratio, half * 2, 2, LINE, {
      name: 'Parallel',
    });
  }),
  CITIES.map(([x, y]) => circle(x, y, 9, CV.blush)),
];

export const worldMarketSlide = template(SW, SH, () => [
  backdrop(),
  glow(1420, 560, 560, 0.18),
  globe(),
  head('Discover the', 120, 170, 760, 84, CV.white),
  head('Global Market', 120, 265, 760, 84, CV.rose),
  body(
    'Automation is changing how enterprises grow, and Corvane puts that leverage in every regional team.',
    120,
    420,
    700,
    30,
    CV.muted,
  ),
  head('640+', 120, 720, 300, 80, CV.white),
  body('New locations', 120, 818, 300, 28, CV.muted),
  head('210%', 460, 720, 300, 80, CV.white),
  body('Faster rollout', 460, 818, 300, 28, CV.muted),
  rect(1500, 260, 300, 190, CV.white, { name: 'Stat card', cornerRadius: 24 }),
  head('52M', 1536, 290, 240, 72, CV.ink),
  body('Regional users', 1536, 380, 240, 26, '#6b3a4b'),
  rect(1060, 660, 300, 190, linear(135, CV.rose, '#c25b7e'), {
    name: 'Stat card',
    cornerRadius: 24,
  }),
  head('31M', 1096, 690, 240, 72, CV.white),
  body('Active accounts', 1096, 780, 240, 26, CV.white),
]);

const QUARTERS = [
  { title: 'Discovery', text: 'Baseline models and\nhardware review.', progress: 1 },
  { title: 'Build', text: 'Pilot rollout with\ntwo core teams.', progress: 1 },
  { title: 'Expansion', text: 'Scale to every\nregional office.', progress: 0.64 },
  { title: 'Integration', text: 'Connect billing\nand analytics.', progress: 0.2 },
];

const IDLE = {
  card: (x: number) => glass(x, 280, 315, 470),
  number: CV.white,
  rule: CV.edge,
  title: CV.white,
  text: CV.muted,
  track: 'rgba(255,255,255,0.12)',
  bar: CV.rose,
  dot: CV.white,
  dotRadius: 16,
  ring: 0,
};

const ACTIVE = {
  card: (x: number) =>
    rect(x, 280, 315, 470, linear(160, CV.white, CV.blush), {
      name: 'Active quarter',
      cornerRadius: 28,
    }),
  number: CV.berry,
  rule: CV.berry,
  title: CV.ink,
  text: '#6b3a4b',
  track: 'rgba(92,26,46,0.15)',
  bar: CV.berry,
  dot: CV.rose,
  dotRadius: 22,
  ring: 6,
};

const quarterCard = (quarter: (typeof QUARTERS)[number], index: number) => {
  const x = 240 + index * 375;
  const tone = index === 2 ? ACTIVE : IDLE;
  return [
    tone.card(x),
    head(`Q${index + 1}`, x + 36, 320, 240, 88, tone.number),
    rect(x + 36, 440, 243, 2, tone.rule, { name: 'Rule' }),
    head(quarter.title, x + 36, 470, 260, 36, tone.title),
    body(quarter.text, x + 36, 530, 260, 26, tone.text),
    body(`${Math.round(quarter.progress * 100)}% complete`, x + 36, 640, 260, 24, tone.text, {
      fontWeight: 600,
    }),
    rect(x + 36, 684, 243, 12, tone.track, { name: 'Progress track', cornerRadius: 6 }),
    rect(x + 36, 684, 243 * quarter.progress, 12, tone.bar, { name: 'Progress', cornerRadius: 6 }),
    circle(x + 157, 870, tone.dotRadius, tone.dot, { stroke: CV.blush, strokeWidth: tone.ring }),
  ];
};

export const quarterlySlide = template(SW, SH, () => [
  backdrop(),
  head('Quarterly Analysis', 0, 110, SW, 76, CV.white, { align: 'center' }),
  rect(240, 869, 1440, 3, CV.edge, { name: 'Timeline' }),
  QUARTERS.map(quarterCard),
]);
