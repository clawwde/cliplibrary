import { checklist, icon, type Nodes, POST_SIZE, path, rect, template, text } from '../../../kit';
import { textWidth } from '../momentum-carousel-kit/listing';
import { BLUSH, DEEP, FONT, LEAF, MINT, SITE, WINE } from './levers';

const { width: W, height: H } = POST_SIZE;

const paper = (dark: boolean): Nodes[] => [
  rect(0, 0, W, H, dark ? DEEP : '#ffffff', { name: 'Background' }),
  Array.from({ length: 11 }, (_, index) =>
    rect(90 + index * 90, 0, 2, H, dark ? 'rgba(255,255,255,0.06)' : '#f1e7ec', {
      name: 'Grid line',
    }),
  ),
  Array.from({ length: 14 }, (_, index) =>
    rect(0, 90 + index * 90, W, 2, dark ? 'rgba(255,255,255,0.06)' : '#f1e7ec', {
      name: 'Grid line',
    }),
  ),
];

const footer = (dark: boolean) => [
  text(SITE, 90, 1206, 500, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: dark ? MINT : WINE,
  }),
  icon('bookmark', 940, 1196, 54, dark ? MINT : WINE, { strokeWidth: 2.5 }),
];

export const habitsCover = template(W, H, () => [
  paper(false),
  rect(90, 150, 150, 14, WINE, { name: 'Bar', cornerRadius: 7 }),
  path(
    'M10 20 C 90 60 130 170 70 190 C 10 210 10 120 90 120 C 170 120 210 210 270 230',
    700,
    170,
    290,
    250,
    'rgba(0,0,0,0)',
    { width: 290, height: 250 },
    { name: 'Doodle', stroke: LEAF, strokeWidth: 8 },
  ),
  icon('arrow-down', 940, 380, 60, LEAF, { strokeWidth: 2.5, rotation: -30 }),
  text('How\nto Keep\nGoing', 90, 380, 900, {
    fontFamily: FONT,
    fontSize: 124,
    fontWeight: 800,
    fill: WINE,
    lineHeight: 1.1,
  }),
  rect(90 + textWidth('to ', 124), 646, textWidth('Keep', 124), 12, LEAF, {
    name: 'Underline',
    cornerRadius: 6,
  }),
  text('The secret is smaller steps...', 90, 860, 900, {
    fontFamily: FONT,
    fontSize: 46,
    fontWeight: 600,
    fill: '#1c1917',
  }),
  footer(false),
]);

const centerBar = (dark: boolean) =>
  rect(470, 150, 140, 14, dark ? MINT : WINE, { name: 'Bar', cornerRadius: 7 });

export const tinyStep = template(W, H, () => [
  paper(true),
  centerBar(true),
  text('Make It\nTiny', 0, 240, W, {
    fontFamily: FONT,
    fontSize: 110,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
    lineHeight: 1.05,
  }),
  text('Skip:', 0, 590, W, {
    fontFamily: FONT,
    fontSize: 48,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  text('"I will run five miles today."', 0, 656, W, {
    fontFamily: FONT,
    fontSize: 44,
    fontWeight: 400,
    fill: BLUSH,
    align: 'center',
  }),
  text('Try:', 0, 800, W, {
    fontFamily: FONT,
    fontSize: 48,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  text('"Shoes on, one easy lap."', 0, 866, W, {
    fontFamily: FONT,
    fontSize: 44,
    fontWeight: 400,
    fill: BLUSH,
    align: 'center',
  }),
  footer(true),
]);

export const pairStep = template(W, H, () => [
  paper(false),
  centerBar(false),
  text('Pair It With\na Routine', 0, 240, W, {
    fontFamily: FONT,
    fontSize: 92,
    fontWeight: 800,
    fill: WINE,
    align: 'center',
    lineHeight: 1.1,
  }),
  [
    { when: 'After coffee', action: 'Read five pages' },
    { when: 'After lunch', action: 'Walk ten minutes' },
    { when: 'After work', action: 'Plan tomorrow' },
  ].map((row, index) => {
    const y = 600 + index * 130;
    return [
      text(row.when, 60, y, 420, {
        fontFamily: FONT,
        fontSize: 44,
        fontWeight: 500,
        fill: WINE,
        align: 'right',
      }),
      icon('chevrons-right', 506, y, 56, LEAF, { strokeWidth: 3 }),
      text(row.action, 590, y, 460, {
        fontFamily: FONT,
        fontSize: 44,
        fontWeight: 500,
        fill: WINE,
      }),
    ];
  }),
  footer(false),
]);

export const streakStep = template(W, H, () => [
  paper(true),
  centerBar(true),
  text('Track Your\nStreak', 0, 240, W, {
    fontFamily: FONT,
    fontSize: 100,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
    lineHeight: 1.05,
  }),
  checklist(
    ['Mark each day you show up', 'Never miss twice in a row', 'Celebrate every seventh day'],
    180,
    600,
    800,
    { color: '#ffffff', iconColor: MINT, icon: 'circle-check', fontSize: 44, gap: 110 },
  ),
  footer(true),
]);
