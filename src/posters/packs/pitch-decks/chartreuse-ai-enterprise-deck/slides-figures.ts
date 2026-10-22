import { circle, rating, rect, rotateNodes, template } from '../../../kit';
import { backdrop, body, fade, glow, head, K, SH, SW } from './theme';

const tile = (
  x: number,
  y: number,
  width: number,
  height: number,
  value: string,
  label: string,
  tone: 'lime' | 'white' | 'dark',
) => {
  const ink = tone === 'dark' ? K.white : K.black;
  return [
    rect(x, y, width, height, tone === 'lime' ? K.lime : tone === 'white' ? K.white : K.panel, {
      name: 'Figure tile',
      cornerRadius: 28,
      stroke: K.line,
      strokeWidth: tone === 'dark' ? 2 : 0,
    }),
    head(value, x + 40, y + 36, width - 80, 96, ink),
    body(label, x + 40, y + 150, width - 80, 28, tone === 'dark' ? K.muted : K.black, {
      fontWeight: 600,
    }),
  ];
};

export const figuresSlide = template(SW, SH, () => [
  backdrop(220),
  head('Behind\nEvery\nFigure', 100, 180, 640, 120, K.white),
  body(
    'Every number here is a team that shipped faster, spent less and trusted the data behind its decisions.',
    100,
    620,
    600,
    32,
    K.muted,
  ),
  tile(860, 260, 340, 320, '50+', 'Native features', 'lime'),
  tile(860, 620, 340, 320, '8x', 'More layouts', 'dark'),
  tile(1240, 100, 580, 300, '20x', 'Less time on reports', 'dark'),
  tile(1240, 440, 580, 260, '2027', 'Global launch year', 'white'),
  rect(1240, 740, 580, 200, K.panel, {
    name: 'Rating tile',
    cornerRadius: 28,
    stroke: K.line,
    strokeWidth: 2,
  }),
  head('4.8', 1280, 780, 200, 96, K.white),
  rating(1480, 812, 52, 5, K.lime),
  body('Average review score', 1480, 876, 320, 26, K.muted),
]);

const TIERS = [
  {
    name: 'Starter',
    price: '$0',
    copy: 'Try the core agent with\nstarter monthly credits.',
    cta: 'Start free',
  },
  {
    name: 'Pro',
    price: '$12',
    copy: 'Unlimited workflows, faster\nruns and priority support.',
    cta: 'Upgrade now',
  },
  {
    name: 'Scale',
    price: '$29',
    copy: 'Team seats, custom models\nand admin controls.',
    cta: 'Talk to sales',
  },
];

const TIER_LOOKS = [
  { card: K.panel, ink: K.white, soft: K.muted, button: K.panelSoft, label: K.white, stroke: 2 },
  { card: K.panel, ink: K.white, soft: K.muted, button: K.lime, label: K.black, stroke: 2 },
  { card: K.white, ink: K.black, soft: '#3f4639', button: K.black, label: K.white, stroke: 0 },
];

const tierCard = (tier: (typeof TIERS)[number], index: number) => {
  const x = 160 + index * 540;
  const look = TIER_LOOKS[index] ?? TIER_LOOKS[0];
  if (look === undefined) {
    return [];
  }
  return [
    rect(x, 360, 520, 600, look.card, {
      name: 'Tier card',
      cornerRadius: 28,
      stroke: K.line,
      strokeWidth: look.stroke,
    }),
    head(tier.name, x + 40, 400, 440, 44, look.ink),
    body(tier.copy, x + 40, 470, 440, 28, look.soft),
    head(tier.price, x + 40, 610, 200, 96, look.ink),
    body('/month', x + 60 + tier.price.length * 58, 662, 200, 30, look.soft),
    rect(x + 40, 840, 440, 80, look.button, { name: 'Tier button', cornerRadius: 40 }),
    body(tier.cta, x + 40, 860, 440, 28, look.label, { align: 'center', fontWeight: 700 }),
  ];
};

export const pricingSlide = template(SW, SH, () => [
  backdrop(),
  head('Pricing', 0, 30, SW, 300, fade('rgba(255,255,255,0.45)'), { align: 'center' }),
  rect(694, 284, 532, 682, K.lime, { name: 'Popular frame', cornerRadius: 34 }),
  body('Most popular', 700, 300, 520, 30, K.black, { align: 'center', fontWeight: 700 }),
  TIERS.map((tier, index) => tierCard(tier, index)),
]);

const YEARS = ['2025', '2026', '2027'];

export const revenueSlide = template(SW, SH, () => [
  backdrop(160),
  glow(1360, 800, 280, 0.35),
  head('Revenue\nFocus', 100, 140, 700, 120, K.white),
  body(
    'We moved from growth at any cost to efficient, durable revenue: fewer pilots, bigger contracts and expansion inside every account.',
    100,
    450,
    640,
    32,
    K.muted,
  ),
  YEARS.map((year, index) => [
    body(year, 860, 200 + index * 250, 160, 30, K.muted, { fontWeight: 600 }),
    rect(860, 250 + index * 250, 220, 3, K.line, { name: 'Year rule' }),
    circle(1080, 251 + index * 250, 9, K.white),
  ]),
  head('20', 1140, 60, 600, 280, K.white, { lineHeight: 1 }),
  head('27', 1140, 310, 600, 280, fade('rgba(255,255,255,0.9)'), { lineHeight: 1 }),
  head('45', 1140, 560, 600, 280, K.lime, { lineHeight: 1 }),
  head('Million', 1490, 760, 400, 72, K.lime),
]);

export const gaugeSlide = template(SW, SH, () => [
  backdrop(),
  glow(960, 640, 420, 0.25),
  Array.from({ length: 7 }, (_, index) => {
    const angle = -45 + index * 15;
    const center = angle === 0;
    return rotateNodes(angle, 960, 940, [
      rect(950, 340, 20, center ? 120 : 90, center ? K.lime : 'rgba(255,255,255,0.5)', {
        name: 'Tick',
        cornerRadius: 10,
      }),
    ]);
  }),
  head('91%', 180, 560, 400, 140, 'rgba(255,255,255,0.22)'),
  head('92%', 0, 500, SW, 230, K.white, { align: 'center' }),
  head('93%', 1440, 560, 400, 140, 'rgba(255,255,255,0.22)', { align: 'right' }),
  body(
    'Average time saved by automating legacy workflows\nwith Kestrel agents.',
    0,
    820,
    SW,
    36,
    K.muted,
    { align: 'center' },
  ),
]);

export const legacySlide = template(SW, SH, () => [
  backdrop(200),
  glow(520, 540, 420, 0.3),
  head('$120B+', 100, 400, 900, 200, K.lime),
  body('Lost to downtime every year', 110, 640, 800, 36, K.white, { fontWeight: 600 }),
  head('Legacy\nSystems', 1120, 120, 700, 110, K.white),
  body(
    'Old maintenance is reactive: teams firefight, outages compound and costs climb quarter after quarter.',
    1120,
    400,
    700,
    30,
    K.muted,
  ),
  body(
    'Kestrel turns that cycle around, predicting failures and fixing them before customers notice.',
    1120,
    620,
    700,
    30,
    K.white,
    { fontWeight: 600 },
  ),
]);
