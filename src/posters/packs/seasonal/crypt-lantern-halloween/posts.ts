import { linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
  line,
  POST_SIZE,
  pill,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';
import { BODY, bat, COND, CRYPT, SPOOKY } from './palette';

const { width: W, height: H } = POST_SIZE;

const tv = (y: number, glyph: 'ghost' | 'skull' | 'moon') => [
  rect(600, y, 400, 300, CRYPT.ink, { cornerRadius: 34, name: 'TV body' }),
  rect(630, y + 30, 280, 240, CRYPT.night, { cornerRadius: 46, name: 'TV screen' }),
  icon(glyph, 700, y + 80, 140, CRYPT.bone, { strokeWidth: 1.6 }),
  circle(955, y + 90, 18, CRYPT.mustard),
  circle(955, y + 150, 18, CRYPT.stone),
  rect(938, y + 200, 34, 60, CRYPT.stone, { cornerRadius: 8, name: 'Speaker' }),
];

export const happyHalloween = template(W, H, () => [
  rect(0, 0, W, H, CRYPT.mustard, { name: 'Background' }),
  text('HAPPY', 70, 130, 500, {
    fontFamily: COND,
    fontSize: 64,
    fontWeight: 400,
    fill: CRYPT.ink,
    letterSpacing: 22,
  }),
  text('HAL\nLOW\nEEN', 64, 210, 540, {
    fontFamily: COND,
    fontSize: 320,
    fontWeight: 400,
    fill: CRYPT.ink,
    lineHeight: 0.88,
  }),
  line(720, 60, 120, CRYPT.ink, 6, { rotation: 60, name: 'Antenna' }),
  line(880, 60, 120, CRYPT.ink, 6, { rotation: 120, name: 'Antenna' }),
  tv(170, 'moon'),
  tv(490, 'skull'),
  tv(810, 'ghost'),
  rect(70, 1180, 940, 4, CRYPT.ink, { name: 'Rule' }),
  text('nightshade.studio', 70, 1220, 500, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 600,
    fill: CRYPT.ink,
  }),
  text('OCT 31', 510, 1212, 500, {
    fontFamily: COND,
    fontSize: 52,
    fontWeight: 400,
    fill: CRYPT.ink,
    align: 'right',
    letterSpacing: 6,
  }),
]);

export const trickOrTreat = template(W, H, () => [
  rect(0, 0, W, H, linear(160, CRYPT.teal, CRYPT.deep), { name: 'Background' }),
  circle(880, 210, 110, 'rgba(241,232,212,0.16)'),
  circle(880, 210, 70, 'rgba(241,232,212,0.9)'),
  bat(120, 180, 150, CRYPT.ink),
  bat(260, 120, 90, CRYPT.ink),
  text('nightshade.studio', 0, 80, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: CRYPT.bone,
    align: 'center',
  }),
  rotateNodes(-6, 540, 640, [
    rect(290, 320, 500, 640, CRYPT.bone, {
      cornerRadius: 18,
      name: 'Card',
      ...shadow(40, 20, 'rgba(0,0,0,0.45)'),
    }),
    text('TRICK\nOR\nTREAT', 290, 380, 500, {
      fontFamily: SPOOKY,
      fontSize: 130,
      fontWeight: 400,
      fill: CRYPT.ink,
      align: 'center',
      lineHeight: 1,
    }),
    rect(390, 800, 300, 4, CRYPT.blood, { name: 'Card rule' }),
    text('SAVE 15% OFF\nSITEWIDE', 290, 830, 500, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 700,
      fill: CRYPT.blood,
      align: 'center',
      lineHeight: 1.25,
    }),
  ]),
  pill('CODE  BOO15', 380, 1110, {
    width: 320,
    fill: CRYPT.mustard,
    color: CRYPT.ink,
    fontSize: 36,
    fontFamily: COND,
    fontWeight: 400,
    letterSpacing: 4,
  }),
]);

export const coffinWebinar = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#16454a', CRYPT.deep), { name: 'Background' }),
  poly(
    [
      [0, 820],
      [260, 780],
      [560, 820],
      [820, 770],
      [1080, 800],
      [1080, 1350],
      [0, 1350],
    ],
    'rgba(0,0,0,0.35)',
    { name: 'Hill' },
  ),
  rotateNodes(-8, 540, 420, [
    poly(
      [
        [440, 90],
        [640, 90],
        [770, 240],
        [690, 740],
        [390, 740],
        [310, 240],
      ],
      CRYPT.blood,
      { name: 'Coffin' },
    ),
    poly(
      [
        [458, 120],
        [622, 120],
        [736, 248],
        [664, 710],
        [416, 710],
        [344, 248],
      ],
      CRYPT.wine,
      { name: 'Coffin lid' },
    ),
    text('OCT', 340, 230, 400, {
      fontFamily: COND,
      fontSize: 90,
      fontWeight: 400,
      fill: CRYPT.bone,
      align: 'center',
      letterSpacing: 8,
    }),
    text('12', 340, 320, 400, {
      fontFamily: COND,
      fontSize: 280,
      fontWeight: 400,
      fill: CRYPT.bone,
      align: 'center',
    }),
  ]),
  text('ACHIEVE YOUR', 0, 830, W, {
    fontFamily: SPOOKY,
    fontSize: 116,
    fontWeight: 400,
    fill: CRYPT.bone,
    align: 'center',
  }),
  text('MARKET GOALS', 0, 960, W, {
    fontFamily: SPOOKY,
    fontSize: 116,
    fontWeight: 400,
    fill: CRYPT.blood,
    align: 'center',
  }),
  text('Live Webinar  |  Oct 12 at 8 PM ET', 0, 1150, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 600,
    fill: CRYPT.bone,
    align: 'center',
  }),
]);

export const tombstoneQuote = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#1d4a4e', CRYPT.deep), { name: 'Background' }),
  circle(880, 190, 90, CRYPT.bone, { opacity: 0.9 }),
  bat(110, 150, 120, CRYPT.ink),
  ellipse(220, 260, 640, 640, '#6f7a78', { name: 'Stone shade' }),
  rect(220, 580, 640, 600, '#6f7a78', { name: 'Stone shade' }),
  ellipse(240, 280, 600, 600, CRYPT.stone, { name: 'Stone top' }),
  rect(240, 580, 600, 600, CRYPT.stone, { name: 'Stone body' }),
  icon('quote', 500, 400, 80, CRYPT.ink, { strokeWidth: 2.4 }),
  text("GOOD MARKETING\nISN'T ABOUT WHAT\nYOU SELL. IT'S THE\nSTORY YOU TELL.", 260, 520, 560, {
    fontFamily: COND,
    fontSize: 70,
    fontWeight: 400,
    fill: CRYPT.ink,
    align: 'center',
    lineHeight: 1.08,
  }),
  text('- MAREN VOSS', 260, 860, 560, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 600,
    fill: CRYPT.night,
    align: 'center',
    letterSpacing: 3,
  }),
  poly(
    [
      [0, 1120],
      [300, 1080],
      [700, 1110],
      [1080, 1070],
      [1080, 1350],
      [0, 1350],
    ],
    '#051012',
    { name: 'Ground' },
  ),
]);

const fang = (x: number, flip: boolean) => {
  const tip = flip ? x + 40 : x + 120;
  return [
    poly(
      [
        [x, 400],
        [x + 160, 400],
        [x + 156, 600],
        [tip, 780],
        [x + 4, 600],
      ],
      CRYPT.bone,
      { name: 'Fang' },
    ),
    rect(tip - 5, 760, 10, 120, CRYPT.blood, { cornerRadius: 5, name: 'Drip' }),
    circle(tip, 884, 12, CRYPT.blood),
  ];
};

const bite = (label: string, x: number) =>
  text(label, x + 30, 760, 480, {
    fontFamily: COND,
    fontSize: 58,
    fontWeight: 400,
    fill: CRYPT.bone,
    letterSpacing: 4,
    rotation: 90,
  });

export const builtToBite = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#1c1c1c', CRYPT.ink), { name: 'Background' }),
  text('BUILT TO BITE', 0, 90, W, {
    fontFamily: COND,
    fontSize: 120,
    fontWeight: 400,
    fill: CRYPT.bone,
    align: 'center',
    letterSpacing: 6,
  }),
  text('BETTER RESULTS', 0, 210, W, {
    fontFamily: SPOOKY,
    fontSize: 110,
    fontWeight: 400,
    fill: CRYPT.blood,
    align: 'center',
  }),
  rect(120, 380, 840, 40, '#3a1016', { cornerRadius: 20, name: 'Gum' }),
  fang(150, false),
  rect(330, 400, 200, 250, CRYPT.bone, { cornerRadius: 70, name: 'Tooth' }),
  rect(550, 400, 200, 250, CRYPT.bone, { cornerRadius: 70, name: 'Tooth' }),
  fang(770, true),
  bite('DATA DRIVEN', 365),
  bite('ALWAYS ON SUPPORT', 545),
  bite('DEDICATED CREW', 725),
]);
