import { linear } from '@/design';
import { circle, ellipse, photo, pill, poly, rect, shadow, template, text } from '../../../kit';
import { BODY, brandMark, darkBg, H, HEAD, ICE, W } from './posts';

const along = (
  tipX: number,
  tipY: number,
  degrees: number,
  points: readonly (readonly [number, number])[],
): [number, number][] => {
  const radians = (degrees * Math.PI) / 180;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  return points.map(([x, y]) => [tipX + x * cos - y * sin, tipY + x * sin + y * cos]);
};

const TARGET = [
  { width: 880, height: 400, fill: ICE.deep },
  { width: 680, height: 310, fill: ICE.navy },
  { width: 480, height: 218, fill: ICE.deep },
  { width: 280, height: 128, fill: ICE.navy },
];

export const precisionTracking = template(W, H, () => [
  darkBg(H),
  brandMark(80, 90, 600, ICE.white, 'left'),
  text('Precision', 80, 210, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 300,
    fill: ICE.white,
    lineHeight: 1,
  }),
  text('Tracking of', 80, 325, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 300,
    fill: ICE.white,
    lineHeight: 1,
  }),
  text('Every Metric', 80, 440, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: ICE.cyan,
    lineHeight: 1,
  }),
  TARGET.map((ring) =>
    ellipse(600 - ring.width / 2, 1010 - ring.height / 2, ring.width, ring.height, ring.fill, {
      name: 'Target ring',
      stroke: 'rgba(34,211,238,0.45)',
      strokeWidth: 3,
    }),
  ),
  ellipse(540, 983, 120, 54, ICE.cyan, {
    name: 'Bullseye',
    ...shadow(60, 0, 'rgba(34,211,238,0.95)'),
  }),
  poly(
    along(600, 1005, -55, [
      [0, 0],
      [70, -9],
      [430, -6],
      [430, 6],
      [70, 9],
    ]),
    linear(90, ICE.white, '#94a3b8'),
    { name: 'Dart shaft' },
  ),
  poly(
    along(600, 1005, -55, [
      [360, 0],
      [470, -70],
      [520, -70],
      [450, 0],
    ]),
    ICE.cyan,
    { name: 'Dart fin' },
  ),
  poly(
    along(600, 1005, -55, [
      [360, 0],
      [470, 70],
      [520, 70],
      [450, 0],
    ]),
    ICE.electric,
    { name: 'Dart fin' },
  ),
]);

const factCard = (y: number, tag: string, body: string, tagRight: boolean) => [
  rect(120, y, 840, 230, 'rgba(255,255,255,0.05)', {
    name: 'Card',
    cornerRadius: 40,
    stroke: 'rgba(255,255,255,0.45)',
    strokeWidth: 2,
  }),
  pill(tag, tagRight ? 790 : 160, y - 30, {
    fill: tagRight ? ICE.white : ICE.cyan,
    color: ICE.night,
    fontSize: 30,
    fontFamily: BODY,
    fontWeight: 700,
    width: 130,
  }),
  text(body, 170, y + 70, 740, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: ICE.white,
    align: 'center',
    lineHeight: 1.35,
  }),
];

export const mythFact = template(W, H, () => [
  darkBg(H),
  text('Myth', 0, 110, W, {
    fontFamily: HEAD,
    fontSize: 160,
    fontWeight: 800,
    fill: ICE.white,
    align: 'center',
    lineHeight: 1,
  }),
  pill('or', 500, 280, {
    fill: ICE.cyan,
    color: ICE.night,
    fontSize: 30,
    fontFamily: BODY,
    fontWeight: 700,
    width: 80,
  }),
  text('Fact', 0, 340, W, {
    fontFamily: HEAD,
    fontSize: 160,
    fontWeight: 800,
    fill: ICE.white,
    align: 'center',
    lineHeight: 1,
  }),
  factCard(600, 'Myth', 'AI will replace every analyst\non your team by next year.', false),
  factCard(900, 'Fact', 'AI clears the busywork so analysts\ncan focus on real decisions.', true),
  brandMark(0, 1240, W, ICE.white),
]);

export const quoteRival = template(W, H, () => [
  rect(0, 0, W, H, linear(180, ICE.white, '#e0f7ff', '#9be7f5'), { name: 'Background' }),
  rect(80, 470, 170, 170, ICE.night, { name: 'Quote block', cornerRadius: 22 }),
  poly(
    [
      [180, 640],
      [250, 640],
      [150, 850],
      [96, 850],
    ],
    ICE.night,
    { name: 'Quote tail' },
  ),
  rect(290, 470, 170, 170, ICE.night, { name: 'Quote block', cornerRadius: 22 }),
  poly(
    [
      [390, 640],
      [460, 640],
      [360, 850],
      [306, 850],
    ],
    ICE.night,
    { name: 'Quote tail' },
  ),
  text('Automation is', 520, 470, 520, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 400,
    fill: ICE.night,
    lineHeight: 1.1,
  }),
  text('a partner,', 520, 550, 520, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 800,
    fill: ICE.electric,
    lineHeight: 1.1,
  }),
  text('not a rival.', 520, 630, 520, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 400,
    fill: ICE.night,
    lineHeight: 1.1,
  }),
  photo('man-portrait-1', 760, 830, 220, 220, {
    cornerRadius: 24,
    stroke: ICE.electric,
    strokeWidth: 6,
  }),
  text('Dorian Vale', 640, 1075, 340, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 700,
    fill: ICE.night,
    align: 'right',
  }),
  text('Systems Architect', 640, 1118, 340, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 500,
    fill: '#335070',
    align: 'right',
  }),
  circle(165, 1090, 10, ICE.electric),
  circle(205, 1090, 10, 'rgba(14,165,233,0.4)'),
  circle(245, 1090, 10, 'rgba(14,165,233,0.4)'),
  brandMark(80, 110, 600, ICE.night, 'left'),
  rect(80, 160, 80, 6, ICE.electric, { name: 'Rule', cornerRadius: 3 }),
]);
