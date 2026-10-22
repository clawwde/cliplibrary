import { linear } from '@/design';
import { arrow, circle, icon, poly, rect, shadow, template } from '../../../kit';
import { backdrop, body, glow, head, K, mono, SH, SW } from './theme';

export const coverSlide = template(SW, SH, () => [
  backdrop(),
  glow(960, 390, 380, 0.4),
  Array.from({ length: 7 }, (_, index) =>
    index === 3
      ? []
      : rect(240 + index * 210, 300, 180, 180, linear(180, '#1f261b', '#0d100b'), {
          name: 'Tile',
          cornerRadius: 36,
          stroke: K.line,
          strokeWidth: 2,
        }),
  ),
  rect(840, 270, 240, 240, linear(160, '#d8fb7a', K.lime, K.limeDeep), {
    name: 'Glowing tile',
    cornerRadius: 48,
    ...shadow(80, 0, 'rgba(184,245,49,0.65)'),
  }),
  icon('sparkles', 900, 330, 120, K.black, { strokeWidth: 2.2 }),
  head('AI Enterprise', 0, 620, SW, 140, K.white, { align: 'center' }),
  head('Pitch Deck', 0, 780, SW, 140, K.lime, { align: 'center' }),
  body('kestrel.ai  /  Series B  /  2027', 0, 960, SW, 30, K.muted, {
    align: 'center',
    letterSpacing: 2,
  }),
]);

const CHAPTERS = [
  'Introduction',
  'Our team',
  'Platform',
  'Pricing',
  'Key metrics',
  'Roadmap',
  'Financials',
  'Next steps',
];

export const contentsSlide = template(SW, SH, () => [
  backdrop(200),
  [380, 300, 220, 140].map((radius, index) =>
    circle(480, 600, radius, index % 2 === 0 ? K.panelSoft : K.panel, {
      stroke: K.line,
      strokeWidth: 2,
    }),
  ),
  glow(480, 600, 150, 0.6),
  circle(480, 600, 64, K.lime),
  circle(480, 600, 22, K.black),
  arrow(240, 330, 340, K.white, 10, { name: 'Dart', rotation: 48.4 }),
  circle(240, 330, 16, K.lime),
  head('Table of', 1000, 130, 800, 110, K.white),
  head('Contents', 1000, 250, 800, 110, K.lime),
  CHAPTERS.map((chapter, index) => {
    const x = 1000 + Math.floor(index / 4) * 440;
    const y = 470 + (index % 4) * 120;
    return [
      head(String(index + 1).padStart(2, '0'), x, y, 100, 52, K.lime),
      body(chapter, x + 100, y + 10, 320, 34, K.white),
    ];
  }),
]);

export const empoweringSlide = template(SW, SH, () => [
  backdrop(160),
  mono('workspace-1', 100, 100, 760, 660, 32),
  rect(100, 640, 420, 320, K.lime, { name: 'Stat card', cornerRadius: 28 }),
  head('180+', 150, 690, 340, 120, K.black),
  body('Enterprise clients\nrunning on Kestrel', 150, 840, 340, 30, K.black, { fontWeight: 600 }),
  head('Powering\nModern Teams', 980, 120, 860, 110, K.white),
  body(
    'We help large organisations move from pilots to production, with secure models, clear governance and results you can measure.',
    980,
    400,
    820,
    34,
    K.muted,
  ),
  rect(980, 700, 840, 260, K.white, { name: 'Focus card', cornerRadius: 28 }),
  head('Our core focus', 1030, 745, 700, 48, K.black),
  body(
    'Model governance, secure infrastructure and measurable outcomes for every rollout.',
    1030,
    820,
    740,
    30,
    '#3f4639',
  ),
]);

const quoteMark = (x: number, y: number, fill: string) => [
  rect(x, y, 150, 150, fill, { name: 'Quote block', cornerRadius: 24 }),
  poly(
    [
      [x + 150, y + 90],
      [x + 150, y + 150],
      [x + 70, y + 300],
      [x + 20, y + 300],
      [x + 80, y + 150],
    ],
    fill,
    { name: 'Quote tail' },
  ),
];

export const quoteSlide = template(SW, SH, () => [
  backdrop(),
  glow(330, 420, 330, 0.3),
  quoteMark(180, 260, K.white),
  quoteMark(370, 260, K.lime),
  head('AI is a', 720, 180, 1100, 130, K.white),
  head('teammate,', 720, 330, 1100, 130, K.lime),
  head('not a threat.', 720, 480, 1100, 130, K.white),
  rect(720, 720, 640, 200, K.panel, {
    name: 'Author card',
    cornerRadius: 28,
    stroke: K.line,
    strokeWidth: 2,
  }),
  rect(744, 744, 152, 152, K.lime, { name: 'Portrait plate', cornerRadius: 20 }),
  mono('man-portrait-3', 752, 752, 136, 136, 16),
  head('Rafael Brandt', 930, 770, 400, 40, K.white),
  body('Chief AI Officer, Kestrel', 930, 830, 400, 28, K.muted),
]);

export const messagingSlide = template(SW, SH, () => [
  backdrop(200),
  head('Strategic Messaging', 100, 100, 1500, 96, K.white),
  body(
    'One story for buyers, investors and teams, told the same way everywhere.',
    100,
    230,
    1300,
    34,
    K.muted,
  ),
  rect(100, 380, 400, 580, K.white, { name: 'Pillar card', cornerRadius: 28 }),
  head('01', 140, 420, 200, 80, K.black),
  head('Content\nStrategy', 140, 570, 320, 52, K.black),
  body('Clear narratives that make complex AI feel simple.', 140, 720, 320, 28, '#3f4639'),
  mono('meeting-1', 540, 380, 820, 580, 28),
  rect(1400, 380, 420, 400, K.lime, { name: 'Saving card', cornerRadius: 28 }),
  head('30%', 1440, 420, 340, 120, K.black),
  body('Saved in operating\ncosts', 1440, 570, 340, 32, K.black, { fontWeight: 700 }),
  body('After the first two quarters', 1440, 690, 340, 26, K.black),
  rect(1400, 820, 420, 140, K.panel, {
    name: 'Trust badge',
    cornerRadius: 28,
    stroke: K.line,
    strokeWidth: 2,
  }),
  icon('badge-check', 1440, 856, 68, K.lime, { strokeWidth: 2 }),
  head('Most trusted', 1530, 866, 280, 40, K.white),
]);
