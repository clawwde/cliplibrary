import {
  circle,
  ellipse,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  poly,
  rect,
  rotateNodes,
  template,
  text,
} from '../../../kit';
import { textWidth } from '../momentum-carousel-kit/text-width';
import { BLUSH, DEEP, FONT, LEAF, MINT, SITE, WINE } from './levers';

const { width: W, height: H } = POST_SIZE;

const dots = (active: number, dark: boolean) =>
  [0, 1, 2, 3, 4].map((index) =>
    circle(
      460 + index * 40,
      1190,
      9,
      index === active ? (dark ? MINT : LEAF) : dark ? 'rgba(255,255,255,0.3)' : '#e7d5dd',
    ),
  );

const stepTag = (label: string, y: number) => [
  rect(540 - textWidth(label, 40) / 2 - 24, y, textWidth(label, 40) + 48, 76, MINT, {
    name: 'Step tag',
    cornerRadius: 10,
  }),
  text(label, 0, y + 14, W, {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 700,
    fill: WINE,
    align: 'center',
  }),
];

export const calendarCover = template(W, H, () => [
  rect(0, 0, W, H, '#ffffff', { name: 'Background' }),
  text(SITE, 0, 170, W, {
    fontFamily: FONT,
    fontSize: 32,
    fontWeight: 500,
    fill: '#57534e',
    align: 'center',
  }),
  stepTag('3 Steps to', 380),
  text('Own Your\nCalendar', 0, 490, W, {
    fontFamily: FONT,
    fontSize: 116,
    fontWeight: 800,
    fill: WINE,
    align: 'center',
    lineHeight: 1.05,
  }),
  text('Swipe for more', 0, 800, W, {
    fontFamily: FONT,
    fontSize: 38,
    fontWeight: 700,
    fill: '#1c1917',
    align: 'center',
  }),
  path(
    'M8 12 Q 150 100 292 12',
    390,
    900,
    300,
    100,
    'rgba(0,0,0,0)',
    { width: 300, height: 100 },
    { name: 'Smile arrow', stroke: LEAF, strokeWidth: 14 },
  ),
  poly(
    [
      [668, 892],
      [712, 902],
      [690, 940],
    ],
    LEAF,
    { name: 'Arrow head' },
  ),
  dots(0, false),
]);

const BLOCKS = ['Focus', 'Calls', 'Admin', 'Write', 'Learn', 'Plan', 'Rest'];

export const blocksStep = template(W, H, () => [
  rect(0, 0, W, H, DEEP, { name: 'Background' }),
  stepTag('Step 1', 220),
  text('Batch your week\ninto blocks', 0, 330, W, {
    fontFamily: FONT,
    fontSize: 80,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
    lineHeight: 1.1,
  }),
  BLOCKS.map((label, index) => {
    const row = index < 4 ? 0 : 1;
    const column = row === 0 ? index : index - 4;
    const x = (row === 0 ? 140 : 245) + column * 210;
    const y = 640 + row * 220;
    return rotateNodes(index % 2 === 0 ? -6 : 6, x + 80, y + 80, [
      rect(x, y, 160, 160, 'rgba(167,243,208,0.06)', {
        name: 'Block',
        cornerRadius: 10,
        stroke: MINT,
        strokeWidth: 4,
      }),
      text(label, x, y + 60, 160, {
        fontFamily: FONT,
        fontSize: 32,
        fontWeight: 600,
        fill: '#ffffff',
        align: 'center',
      }),
    ]);
  }),
  dots(1, true),
]);

const ritual = (
  dark: boolean,
  tag: string,
  title: string,
  items: readonly { head: string; note: string }[],
  active: number,
) =>
  template(W, H, () => [
    rect(0, 0, W, H, dark ? DEEP : '#ffffff', { name: 'Background' }),
    stepTag(tag, 220),
    text(title, 0, 330, W, {
      fontFamily: FONT,
      fontSize: 84,
      fontWeight: 800,
      fill: dark ? '#ffffff' : WINE,
      align: 'center',
      lineHeight: 1.1,
    }),
    items.map((item, index) => {
      const y = 640 + index * 160;
      return [
        icon('square-check', 210, y, 62, dark ? MINT : LEAF, { strokeWidth: 2.25 }),
        text(item.head, 300, y - 4, 600, {
          fontFamily: FONT,
          fontSize: 44,
          fontWeight: 700,
          fill: dark ? '#ffffff' : WINE,
        }),
        text(item.note, 300, y + 52, 640, {
          fontFamily: FONT,
          fontSize: 34,
          fontWeight: 400,
          fill: dark ? BLUSH : '#57534e',
        }),
      ];
    }),
    dots(active, dark),
  ]);

export const RITUAL_STEPS = [
  ritual(
    false,
    'Step 2',
    'Build a\nMorning Ritual',
    [
      { head: 'Morning', note: 'Set your top three tasks' },
      { head: 'Midday', note: 'Reset with a short walk' },
      { head: 'Evening', note: 'Prep the desk for tomorrow' },
    ],
    2,
  ),
  ritual(
    true,
    'Step 3',
    'Protect One\nFocus Block',
    [
      { head: 'Pick a time', note: 'Ninety minutes, same slot daily' },
      { head: 'Go offline', note: 'Silence chats and close tabs' },
      { head: 'Ship something', note: 'End with one finished task' },
    ],
    3,
  ),
] as const;

const texture = (): Nodes[] =>
  Array.from({ length: 34 }, (_, index) =>
    rect(0, 20 + index * 40, W, 2, 'rgba(255,255,255,0.035)', { name: 'Texture line' }),
  );

export const dropCover = template(W, H, () => [
  rect(0, 0, W, H, DEEP, { name: 'Background' }),
  texture(),
  text(SITE, 90, 140, 600, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: '#ffffff',
  }),
  text('Habits to', 90, 470, 900, {
    fontFamily: FONT,
    fontSize: 96,
    fontWeight: 800,
    fill: '#ffffff',
  }),
  ellipse(64, 586, textWidth('Drop', 96) + 64, 140, 'rgba(0,0,0,0)', {
    name: 'Circle mark',
    stroke: MINT,
    strokeWidth: 6,
  }),
  text('Drop', 96, 594, 400, {
    fontFamily: FONT,
    fontSize: 96,
    fontWeight: 800,
    fill: '#ffffff',
  }),
  text('Today', 150 + textWidth('Drop', 96), 594, 600, {
    fontFamily: FONT,
    fontSize: 96,
    fontWeight: 800,
    fill: '#ffffff',
  }),
  text('Small habits add up. Are you\nslowing your own week down?', 90, 790, 900, {
    fontFamily: FONT,
    fontSize: 44,
    fontWeight: 500,
    fill: BLUSH,
    lineHeight: 1.35,
  }),
  rect(90, 920, 260, 8, MINT, { name: 'Underline', cornerRadius: 4 }),
  icon('arrow-right', 900, 1160, 96, MINT, { strokeWidth: 2.5 }),
]);

const dropStep = (number: string, title: string, body: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, DEEP, { name: 'Background' }),
    texture(),
    ellipse(90, 250, 180, 96, 'rgba(0,0,0,0)', {
      name: 'Number ring',
      stroke: MINT,
      strokeWidth: 5,
    }),
    text(number, 90, 268, 180, {
      fontFamily: FONT,
      fontSize: 52,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text(title, 90, 420, 900, {
      fontFamily: FONT,
      fontSize: 84,
      fontWeight: 800,
      fill: '#ffffff',
      lineHeight: 1.1,
    }),
    text(body, 90, 660, 880, {
      fontFamily: FONT,
      fontSize: 40,
      fontWeight: 400,
      fill: BLUSH,
      lineHeight: 1.45,
    }),
    path(
      'M10 110 A100 100 0 0 0 110 10',
      880,
      1100,
      120,
      120,
      'rgba(0,0,0,0)',
      { width: 120, height: 120 },
      { name: 'Arc', stroke: MINT, strokeWidth: 12 },
    ),
  ]);

export const DROP_STEPS = [
  dropStep(
    '01',
    'Opening Email\nFirst Thing',
    'Starting the day in your inbox puts you in reactive mode. Guard the first hour for your most important task.',
  ),
  dropStep(
    '02',
    'Switching Tasks\nAll Day',
    'Jumping between jobs drains focus and adds mistakes. Finish one thing before you start the next.',
  ),
  dropStep(
    '03',
    'Scrolling\nBetween Tasks',
    'Short scroll breaks quietly eat an hour a day. Set app limits and take real breaks instead.',
  ),
] as const;
