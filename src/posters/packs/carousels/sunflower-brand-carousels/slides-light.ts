import { linear } from '@/design';
import {
  avatar,
  circle,
  ellipse,
  icon,
  line,
  type Nodes,
  poly,
  rect,
  template,
} from '../../../kit';
import { creamBackground, H, SUN, say, swipeArrow, W } from './palette';

const authorRow = () => [
  avatar('man-portrait-2', 140, 150, 52),
  say('Leo Hart', 210, 110, 300, 34, SUN.ink, 800),
  icon('badge-check', 370, 113, 32, SUN.amber, { strokeWidth: 2.2 }),
  say('@leohartbrand', 210, 154, 400, 28, SUN.muted, 500),
];

export const consistencyCover = template(W, H, () => [
  creamBackground(),
  authorRow(),
  say('Why Your\nBrand Needs', 90, 380, 900, 100, SUN.amber, 800, { lineHeight: 1.05 }),
  say('Consistency?', 90, 590, 950, 100, SUN.ink, 800, { lineHeight: 1.05 }),
  poly(
    [
      [600, 860],
      [680, 780],
      [920, 1020],
      [840, 1100],
    ],
    linear(135, SUN.sun, SUN.gold),
    { name: 'Arrow shaft' },
  ),
  poly(
    [
      [1000, 1180],
      [1000, 900],
      [720, 1180],
    ],
    linear(135, SUN.sun, SUN.gold),
    { name: 'Arrow head' },
  ),
]);

const smarterItems = [
  'Share real results',
  'Show the process',
  'Teach one useful idea',
  'Spotlight client wins',
  'Document your journey',
];

export const smarterSlide = template(W, H, () => [
  creamBackground(),
  say("Don't post more,", 90, 230, 940, 78, SUN.amber, 800, { lineHeight: 1.1 }),
  say('post smarter', 90, 320, 940, 78, SUN.ink, 800, { lineHeight: 1.1 }),
  smarterItems.map((item, index) => [
    icon('square-check', 90, 500 + index * 104, 52, SUN.amber, { strokeWidth: 2.2 }),
    say(item, 170, 503 + index * 104, 800, 44, SUN.ink, 500),
  ]),
  swipeArrow(SUN.ink),
]);

const loopPill = (label: string, cx: number, cy: number) => [
  rect(cx - 120, cy - 44, 240, 88, SUN.white, {
    name: `${label} pill`,
    cornerRadius: 44,
    stroke: SUN.ink,
    strokeWidth: 3,
  }),
  say(label, cx - 120, cy - 22, 240, 36, SUN.ink, 600, { align: 'center', lineHeight: 1.2 }),
];

const loopArrow = (x: number, y: number, rotation: number) =>
  line(x, y, 90, SUN.amber, 6, { name: 'Loop arrow', arrowEnd: true, rotation });

export const loopSlide = template(W, H, () => [
  creamBackground(),
  say('The Simple', 90, 200, 900, 84, SUN.amber, 800, { lineHeight: 1.1 }),
  say('Growth Loop', 90, 296, 900, 84, SUN.ink, 800, { lineHeight: 1.1 }),
  loopPill('Hook', 540, 560),
  loopPill('Value', 820, 760),
  loopPill('Trust', 540, 960),
  loopPill('Offer', 260, 760),
  loopArrow(690, 590, 45),
  loopArrow(860, 840, 135),
  loopArrow(450, 1000, 225),
  loopArrow(250, 680, 315),
  swipeArrow(SUN.ink),
]);

const tableRows = [
  ['Posts without a plan', 'Clear weekly themes'],
  ['Same idea every day', 'One idea, many angles'],
  ['Random visuals', 'A recognisable look'],
  ['No call to action', 'One clear next step'],
];

export const strategySlide = template(W, H, () => [
  creamBackground(),
  say('Content Strategy', 90, 170, 900, 76, SUN.amber, 800, { lineHeight: 1.1 }),
  say('Beats Repetition', 90, 258, 900, 76, SUN.ink, 800, { lineHeight: 1.1 }),
  rect(90, 430, 900, 640, SUN.white, {
    name: 'Table',
    cornerRadius: 24,
    stroke: SUN.ink,
    strokeWidth: 3,
  }),
  rect(540, 430, 3, 640, SUN.ink, { name: 'Column rule' }),
  rect(90, 530, 900, 3, SUN.ink, { name: 'Header rule' }),
  say('Repetitive', 90, 458, 450, 40, SUN.muted, 700, { align: 'center' }),
  say('Strategic', 540, 458, 450, 40, SUN.amber, 800, { align: 'center' }),
  tableRows.map(([left, right], index) => [
    icon('x', 120, 580 + index * 120, 36, '#c2410c', { strokeWidth: 2.6 }),
    say(left ?? '', 170, 578 + index * 120, 360, 32, SUN.muted, 500),
    icon('check', 570, 580 + index * 120, 36, SUN.amber, { strokeWidth: 2.8 }),
    say(right ?? '', 620, 578 + index * 120, 360, 32, SUN.ink, 600),
  ]),
  swipeArrow(SUN.ink),
]);

const gridPaper = () => [
  creamBackground(),
  Array.from({ length: 13 }, (_, index) =>
    rect(30 + index * 85, 0, 2, H, 'rgba(28,27,31,0.05)', { name: 'Grid line' }),
  ),
  Array.from({ length: 16 }, (_, index) =>
    rect(0, 40 + index * 85, W, 2, 'rgba(28,27,31,0.05)', { name: 'Grid line' }),
  ),
];

const progress = (active: number) =>
  [0, 1, 2, 3].map((index) =>
    rect(780 + index * 56, 90, 40, 40, index <= active ? SUN.gold : 'rgba(245,168,0,0.25)', {
      name: 'Progress square',
      cornerRadius: 8,
    }),
  );

const swipeChip = () => [
  rect(820, 1180, 170, 64, SUN.white, {
    name: 'Swipe chip',
    cornerRadius: 12,
    stroke: SUN.ink,
    strokeWidth: 2,
  }),
  say('SWIPE', 836, 1196, 100, 26, SUN.ink, 800, { letterSpacing: 2 }),
  circle(950, 1212, 18, SUN.ink),
  icon('arrow-right', 938, 1200, 24, SUN.white, { strokeWidth: 3 }),
];

export const brandingCover = template(W, H, () => [
  gridPaper(),
  progress(0),
  say('What does', 0, 380, W, 92, SUN.ink, 800, { align: 'center', lineHeight: 1.1 }),
  ellipse(250, 470, 580, 140, 'rgba(0,0,0,0)', {
    name: 'Scribble circle',
    stroke: SUN.gold,
    strokeWidth: 6,
    rotation: -3,
  }),
  say('Branding', 0, 482, W, 92, SUN.amber, 800, { align: 'center', lineHeight: 1.1 }),
  say('do for you?', 0, 584, W, 92, SUN.ink, 800, { align: 'center', lineHeight: 1.1 }),
  say(
    'Branding is more than a logo.\nIt is how people feel about your business.',
    0,
    790,
    W,
    34,
    SUN.muted,
    500,
    { align: 'center', lineHeight: 1.5 },
  ),
  swipeChip(),
]);

const brandingStep = (active: number, title: string, body: Nodes[]) =>
  template(W, H, () => [
    gridPaper(),
    progress(active),
    say(title, 90, 260, 900, 80, SUN.ink, 800, { lineHeight: 1.1 }),
    rect(90, 470, 140, 10, SUN.gold, { name: 'Underline', cornerRadius: 5 }),
    body,
    swipeChip(),
  ]);

export const brandingImage = brandingStep(1, 'Branding Helps\nBuild Your Image', [
  say('This helps you:', 90, 540, 800, 38, SUN.muted, 600),
  ['Look premium from day one', 'Attract the right buyers', 'Grow steady demand'].map(
    (item, index) => [
      circle(110, 650 + index * 90, 12, SUN.ink),
      say(item, 150, 628 + index * 90, 800, 40, SUN.ink, 500),
    ],
  ),
]);

const versus = (title: string, items: string[], x: number, accent: string) => [
  say(title, x, 560, 400, 46, accent, 800, { align: 'center' }),
  rect(x + 120, 625, 160, 6, accent, { name: 'Underline', cornerRadius: 3 }),
  items.map((item, index) =>
    say(item, x, 670 + index * 76, 400, 36, SUN.ink, 500, { align: 'center' }),
  ),
];

export const brandingVersus = brandingStep(2, 'Strong Brand\nvs Weak Brand', [
  versus('Strong', ['Consistent', 'Clear message', 'Memorable'], 90, SUN.amber),
  rect(538, 560, 3, 330, 'rgba(28,27,31,0.2)', { name: 'Divider' }),
  versus('Weak', ['Scattered', 'Mixed message', 'Forgettable'], 590, SUN.muted),
]);

export const brandingSalesperson = brandingStep(3, 'Your Brand Is Your\nSilent Salesperson', [
  say(
    'Before a buyer ever talks to\nyou, your brand has already\nmade the first pitch.',
    90,
    540,
    880,
    44,
    SUN.ink,
    500,
    { lineHeight: 1.45 },
  ),
]);
