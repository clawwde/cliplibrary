import { type Fill, linear } from '@/design';
import { poly, rect, shadow, template, text } from '../../../kit';
import {
  BLOCKY,
  CAR,
  CHUNKY,
  CLOUD,
  H,
  PX,
  SITE,
  siteFooter,
  sprite,
  TERMINAL,
  TREE,
  W,
} from './pixel';

const mountains = (top: number, color: string) =>
  poly(
    [
      [0, top + 120],
      [0, top + 60],
      [120, top + 60],
      [120, top],
      [260, top],
      [260, top + 50],
      [420, top + 50],
      [420, top + 20],
      [600, top + 20],
      [600, top + 70],
      [760, top + 70],
      [760, top + 10],
      [940, top + 10],
      [940, top + 60],
      [W, top + 60],
      [W, top + 120],
    ],
    color,
    { name: 'Pixel mountains' },
  );

const checker = (x: number, y: number, columns: number) =>
  Array.from({ length: columns * 2 }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return rect(
      x + column * 24,
      y + row * 24,
      24,
      24,
      (column + row) % 2 === 0 ? PX.white : PX.night,
      { name: 'Checker' },
    );
  });

interface RaceStyle {
  sky: Fill;
  grass: string;
  word: string;
  sub: string;
  accent: string;
  code: string;
}

const raceSale = (style: RaceStyle) =>
  template(W, H, () => [
    rect(0, 0, W, H, style.grass, { name: 'Background' }),
    rect(0, 0, W, 640, style.sky, { name: 'Sky' }),
    sprite(CLOUD, 60, 60, 12, { W: 'rgba(255,255,255,0.9)' }),
    sprite(CLOUD, 860, 300, 10, { W: 'rgba(255,255,255,0.9)' }),
    text(style.word, 0, 110, W, {
      fontFamily: CHUNKY,
      fontSize: 160,
      fontWeight: 400,
      fill: PX.white,
      align: 'center',
      lineHeight: 1,
      ...shadow(0, 10, PX.night),
    }),
    text(style.sub, 0, 290, W, {
      fontFamily: BLOCKY,
      fontSize: 50,
      fontWeight: 400,
      fill: style.accent,
      align: 'center',
      ...shadow(0, 5, PX.night),
    }),
    checker(40, 430, 10),
    checker(800, 430, 10),
    rect(300, 400, 480, 116, PX.night, { stroke: style.accent, strokeWidth: 5, name: 'Code box' }),
    text('CHEAT CODE UNLOCKED', 300, 412, 480, {
      fontFamily: BLOCKY,
      fontSize: 24,
      fontWeight: 400,
      fill: style.accent,
      align: 'center',
    }),
    text(style.code, 300, 446, 480, {
      fontFamily: BLOCKY,
      fontSize: 54,
      fontWeight: 400,
      fill: PX.white,
      align: 'center',
    }),
    mountains(560, PX.deep),
    poly(
      [
        [500, 680],
        [580, 680],
        [1000, H],
        [80, H],
      ],
      PX.road,
      { name: 'Road' },
    ),
    poly(
      [
        [486, 680],
        [500, 680],
        [80, H],
        [30, H],
      ],
      PX.pink,
      { name: 'Kerb' },
    ),
    poly(
      [
        [580, 680],
        [594, 680],
        [1050, H],
        [1000, H],
      ],
      PX.pink,
      { name: 'Kerb' },
    ),
    [0, 1, 2, 3].map((index) =>
      rect(536 - index * 3, 760 + index * 110, 8 + index * 6, 50 + index * 14, PX.white, {
        name: 'Lane mark',
      }),
    ),
    rect(370, 600, 340, 60, PX.white, { name: 'Site plate' }),
    text(SITE, 370, 615, 340, {
      fontFamily: BLOCKY,
      fontSize: 24,
      fontWeight: 400,
      fill: PX.night,
      align: 'center',
    }),
    sprite(CAR, 442, 1150, 14, {
      W: PX.white,
      K: PX.night,
      R: style.accent,
      Y: PX.sun,
    }),
  ]);

export const raceSummer = raceSale({
  sky: linear(180, '#ff5fa2', '#ffb35c'),
  grass: '#2c8a5a',
  word: 'SUMMER',
  sub: 'MEGA SALE',
  accent: '#ffe14d',
  code: 'PIXEL 30',
});

export const raceAutumn = raceSale({
  sky: linear(180, PX.sky, '#8f7bff'),
  grass: '#1f6f8b',
  word: 'AUTUMN',
  sub: 'FULL STORE SALE',
  accent: PX.mint,
  code: 'LEVEL UP',
});

export const trueOrFalse = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#8fe9ff', '#e1fbff'), { name: 'Background' }),
  sprite(CLOUD, 70, 90, 12, { W: PX.white }),
  sprite(CLOUD, 820, 640, 10, { W: PX.white }),
  rect(160, 230, 760, 340, PX.cream, { stroke: PX.night, strokeWidth: 10, name: 'Question box' }),
  text('Keeping a customer\ncosts less than\nwinning a new one.', 160, 296, 760, {
    fontFamily: TERMINAL,
    fontSize: 56,
    fontWeight: 700,
    fill: PX.night,
    align: 'center',
    lineHeight: 1.2,
  }),
  rect(240, 630, 270, 96, PX.mint, { stroke: PX.night, strokeWidth: 6, name: 'True button' }),
  text('TRUE', 240, 652, 270, {
    fontFamily: BLOCKY,
    fontSize: 48,
    fontWeight: 400,
    fill: PX.night,
    align: 'center',
  }),
  rect(570, 630, 270, 96, PX.pink, { stroke: PX.night, strokeWidth: 6, name: 'False button' }),
  text('FALSE', 570, 652, 270, {
    fontFamily: BLOCKY,
    fontSize: 48,
    fontWeight: 400,
    fill: PX.white,
    align: 'center',
  }),
  mountains(840, '#6b4fd6'),
  rect(0, 960, W, 390, '#2f9e5b', { name: 'Ground' }),
  sprite(TREE, 90, 880, 14, { G: '#1f7a43', B: '#6b3e1f' }),
  sprite(TREE, 900, 870, 16, { G: '#1f7a43', B: '#6b3e1f' }),
  rect(0, 1060, W, 130, PX.road, { name: 'Road' }),
  Array.from({ length: 6 }, (_, index) =>
    rect(40 + index * 180, 1118, 100, 14, PX.white, { name: 'Lane mark' }),
  ),
  siteFooter(1260, PX.cream),
]);
