import { linear } from '@/design';
import { circle, photo, poly, rect, shadow, template, text } from '../../../kit';
import {
  BLOCKY,
  CHUNKY,
  H,
  HEART,
  HERO,
  PX,
  ROBOT,
  scanlines,
  siteFooter,
  sprite,
  TERMINAL,
  W,
} from './pixel';

const STRIPES = [PX.pink, PX.orange, PX.sun, PX.mint, PX.sky];

export const newClients = template(W, H, () => [
  rect(0, 0, W, H, PX.night, { name: 'Background' }),
  text('HI-SCORE', 80, 86, 400, {
    fontFamily: BLOCKY,
    fontSize: 34,
    fontWeight: 400,
    fill: PX.pink,
  }),
  text('098000', 80, 132, 400, {
    fontFamily: BLOCKY,
    fontSize: 34,
    fontWeight: 400,
    fill: PX.white,
  }),
  [0, 1, 2].map((index) => sprite(HEART, 790 + index * 72, 104, 8, { P: PX.pink })),
  STRIPES.map((color, index) =>
    poly(
      [
        [0, 800 + index * 36],
        [W, 560 + index * 36],
        [W, 590 + index * 36],
        [0, 830 + index * 36],
      ],
      color,
      { name: 'Stripe' },
    ),
  ),
  text('UNLOCK', 80, 360, 600, {
    fontFamily: CHUNKY,
    fontSize: 60,
    fontWeight: 400,
    fill: PX.white,
  }),
  text('NEW', 70, 430, 900, {
    fontFamily: CHUNKY,
    fontSize: 240,
    fontWeight: 400,
    fill: PX.white,
    lineHeight: 1,
    ...shadow(0, 10, PX.night),
  }),
  text('CLIENTS', 70, 690, 940, {
    fontFamily: CHUNKY,
    fontSize: 150,
    fontWeight: 400,
    fill: PX.white,
    lineHeight: 1,
    ...shadow(0, 10, PX.night),
  }),
  text('READY TO LEVEL UP?', 0, 1030, W, {
    fontFamily: BLOCKY,
    fontSize: 44,
    fontWeight: 400,
    fill: PX.white,
    align: 'center',
  }),
  text('YES', 340, 1110, 160, { fontFamily: BLOCKY, fontSize: 48, fontWeight: 400, fill: PX.mint }),
  poly(
    [
      [530, 1136],
      [565, 1116],
      [565, 1156],
    ],
    PX.pink,
    { name: 'Pointer' },
  ),
  text('NO', 600, 1110, 160, { fontFamily: BLOCKY, fontSize: 48, fontWeight: 400, fill: PX.white }),
  siteFooter(1250, PX.grey),
]);

export const liveWorkshop = template(W, H, () => [
  rect(0, 0, W, H, PX.night, { name: 'Background' }),
  photo('console-1', 0, 0, W, H),
  rect(0, 0, W, H, 'rgba(22,10,43,0.55)', { name: 'Photo tint' }),
  text('FREE  ·  THU 6PM', 0, 100, W, {
    fontFamily: BLOCKY,
    fontSize: 40,
    fontWeight: 400,
    fill: PX.mint,
    align: 'center',
  }),
  rect(250, 210, 580, 720, '#dcd6ca', {
    cornerRadius: 40,
    name: 'Handheld body',
    ...shadow(50, 20, 'rgba(0,0,0,0.5)'),
  }),
  rect(290, 250, 500, 400, '#55526a', { cornerRadius: 18, name: 'Screen bezel' }),
  rect(330, 285, 420, 330, '#b9f2a2', { name: 'Screen' }),
  text('LIVE', 330, 320, 420, {
    fontFamily: BLOCKY,
    fontSize: 86,
    fontWeight: 400,
    fill: PX.night,
    align: 'center',
  }),
  text('WORKSHOP', 330, 440, 420, {
    fontFamily: BLOCKY,
    fontSize: 58,
    fontWeight: 400,
    fill: PX.night,
    align: 'center',
  }),
  text('GROWTH SECRETS', 330, 540, 420, {
    fontFamily: BLOCKY,
    fontSize: 28,
    fontWeight: 400,
    fill: '#2f6b3a',
    align: 'center',
  }),
  rect(330, 760, 130, 40, PX.road, { cornerRadius: 6, name: 'D-pad' }),
  rect(375, 715, 40, 130, PX.road, { cornerRadius: 6, name: 'D-pad' }),
  circle(700, 750, 36, PX.pink),
  circle(620, 810, 36, PX.mint),
  rect(260, 990, 560, 230, '#9a5a34', {
    cornerRadius: 22,
    stroke: '#e2b48a',
    strokeWidth: 5,
    dashed: true,
    name: 'Leather patch',
  }),
  text('SAVE YOUR\nSEAT TODAY!', 260, 1030, 560, {
    fontFamily: TERMINAL,
    fontSize: 62,
    fontWeight: 700,
    fill: PX.cream,
    align: 'center',
    lineHeight: 1.15,
  }),
]);

const SERVICES = ['PAID ADS', 'BRAND IDENTITY', 'WEB DESIGN', 'GROWTH STRATEGY'];

export const ourServices = template(W, H, () => [
  rect(0, 0, W, H, PX.night, { name: 'Background' }),
  scanlines(H),
  ['OUR', 'SERVICES'].map((word, index) => [
    text(word, 88, 238 + index * 150, 960, {
      fontFamily: BLOCKY,
      fontSize: 120,
      fontWeight: 400,
      fill: PX.pink,
    }),
    text(word, 80, 230 + index * 150, 960, {
      fontFamily: BLOCKY,
      fontSize: 120,
      fontWeight: 400,
      fill: PX.white,
    }),
  ]),
  SERVICES.map((service, index) => [
    index === 0
      ? poly(
          [
            [86, 660],
            [120, 680],
            [86, 700],
          ],
          PX.mint,
          { name: 'Cursor' },
        )
      : [],
    text(service, 150, 650 + index * 110, 880, {
      fontFamily: BLOCKY,
      fontSize: 54,
      fontWeight: 400,
      fill: index === 0 ? PX.mint : PX.lilac,
    }),
  ]),
  text('PRESS START TO BOOK A CALL', 0, 1120, W, {
    fontFamily: BLOCKY,
    fontSize: 32,
    fontWeight: 400,
    fill: PX.sun,
    align: 'center',
  }),
  siteFooter(1250, PX.grey),
]);

const OLD_WAY = [
  { label: 'MANUAL REPORTS', fill: 0.25 },
  { label: 'SLOW DELIVERY', fill: 0.15 },
  { label: 'GUESSWORK', fill: 0.3 },
];

const OUR_WAY = [
  { label: 'AUTO INSIGHTS', fill: 1 },
  { label: 'FAST TURNAROUND', fill: 0.9 },
  { label: 'REAL DATA', fill: 1 },
];

const meterColumn = (x: number, rows: readonly { label: string; fill: number }[], color: string) =>
  rows.map((row, index) => {
    const y = 330 + index * 170;
    return [
      rect(x, y, 360, 56, 'rgba(0,0,0,0)', { stroke: PX.white, strokeWidth: 5, name: 'Meter' }),
      rect(x + 10, y + 10, 340 * row.fill, 36, color, { name: 'Meter fill' }),
      text(row.label, x - 40, y + 76, 440, {
        fontFamily: BLOCKY,
        fontSize: 26,
        fontWeight: 400,
        fill: PX.white,
        align: 'center',
      }),
    ];
  });

export const versus = template(W, H, () => [
  rect(0, 0, W, H, PX.deep, { name: 'Background' }),
  rect(540, 0, 540, H, PX.sky, { name: 'Right half' }),
  text('OLD\nWAY', 0, 100, 540, {
    fontFamily: BLOCKY,
    fontSize: 60,
    fontWeight: 400,
    fill: PX.white,
    align: 'center',
    lineHeight: 1.2,
  }),
  text('OUR\nWAY', 540, 100, 540, {
    fontFamily: BLOCKY,
    fontSize: 60,
    fontWeight: 400,
    fill: PX.white,
    align: 'center',
    lineHeight: 1.2,
  }),
  meterColumn(90, OLD_WAY, PX.pink),
  meterColumn(630, OUR_WAY, PX.mint),
  text('VS', 340, 850, 400, {
    fontFamily: BLOCKY,
    fontSize: 150,
    fontWeight: 400,
    fill: PX.sun,
    align: 'center',
    ...shadow(0, 10, PX.night),
  }),
  rect(0, 1040, W, 310, linear(180, '#3a2680', PX.night), { name: 'Floor' }),
  Array.from({ length: 5 }, (_, index) =>
    rect(0, 1080 + index * 56, W, 3, 'rgba(201,168,255,0.25)', { name: 'Floor line' }),
  ),
  sprite(HERO, 190, 830, 18, {
    Y: PX.sun,
    S: '#f2c29b',
    K: PX.night,
    P: PX.pink,
    B: '#3b4a8f',
  }),
  sprite(ROBOT, 740, 830, 18, { M: PX.mint, G: '#d7d2e6', K: PX.night }),
]);
