import { linear } from '@/design';
import {
  circle,
  group,
  POST_SIZE,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const FERN = {
  forest: '#1f4d3a',
  deep: '#0f2a20',
  fern: '#3fa36b',
  mint: '#cfe8d8',
  light: '#eef7f1',
  white: '#ffffff',
  sage: '#7fa894',
};

export const HEAD = 'Plus Jakarta Sans';

const { width: W, height: H } = POST_SIZE;

export const mintBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(180, FERN.light, FERN.mint), { name: 'Background' });

export const forestBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(165, FERN.forest, FERN.deep), { name: 'Background' });

export const highlight = (
  label: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string = FERN.fern,
) =>
  group(
    rect(x, y, width, size * 1.3, fill, { cornerRadius: 10, name: `${label} highlight` }),
    text(label, x, y + size * 0.1, width, {
      fontFamily: HEAD,
      fontSize: size,
      fontWeight: 800,
      fill: FERN.white,
      align: 'center',
    }),
  );

const WORDS = [
  { word: 'REACH', row: 0, start: 3 },
  { word: 'INSIGHT', row: 3, start: 2 },
  { word: 'ENGAGE', row: 5, start: 4 },
  { word: 'STRATEGY', row: 7, start: 0 },
] as const;

const SPINE = 'AUDIENCE';
const SPINE_COLUMN = 5;

const cell = (letter: string, column: number, row: number) => {
  const size = 84;
  const x = 75 + column * (size + 9);
  const y = 300 + row * (size + 9);
  return group(
    rect(x, y, size, size, FERN.white, {
      cornerRadius: 10,
      name: 'Letter tile',
      ...shadow(14, 6, 'rgba(15,42,32,0.2)'),
    }),
    text(letter, x, y + 16, size, {
      fontFamily: HEAD,
      fontSize: 48,
      fontWeight: 700,
      fill: FERN.deep,
      align: 'center',
    }),
  );
};

export const crossword = template(W, H, () => [
  rect(0, 0, W, H, linear(180, FERN.mint, '#9fceb3'), { name: 'Background' }),
  text('Find the words that grow a brand', 0, 140, W, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 700,
    fill: FERN.deep,
    align: 'center',
  }),
  [...SPINE].map((letter, row) => cell(letter, SPINE_COLUMN, row)),
  WORDS.map(({ word, row, start }) =>
    [...word].map((letter, index) =>
      start + index === SPINE_COLUMN ? [] : cell(letter, start + index, row),
    ),
  ),
  text('fernworks.co', 0, 1200, W, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 600,
    fill: FERN.forest,
    align: 'center',
    letterSpacing: 2,
  }),
]);

const block = (x: number, y: number, size: number, fill: string, side: string) =>
  group(
    poly(
      [
        [x, y],
        [x + size * 0.3, y - size * 0.25],
        [x + size * 1.3, y - size * 0.25],
        [x + size, y],
      ],
      side,
      { name: 'Block top' },
    ),
    poly(
      [
        [x + size, y],
        [x + size * 1.3, y - size * 0.25],
        [x + size * 1.3, y + size * 0.75],
        [x + size, y + size],
      ],
      side,
      { name: 'Block side', opacity: 0.7 },
    ),
    rect(x, y, size, size, fill, { name: 'Block face' }),
  );

export const leadTrend = template(W, H, () => [
  rect(0, 0, W, H, linear(180, FERN.white, FERN.light), { name: 'Background' }),
  text("Don't just\nfollow,\nLead the", 0, 150, W, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 500,
    fill: FERN.deep,
    align: 'center',
    lineHeight: 1.1,
  }),
  highlight('Trend', 360, 480, 360, 96),
  block(40, 1010, 210, '#f7faf8', '#b9cec1'),
  block(260, 960, 210, '#f7faf8', '#b9cec1'),
  rotateNodes(-14, 580, 980, [block(490, 880, 220, FERN.fern, FERN.forest)]),
  block(760, 990, 210, '#f7faf8', '#b9cec1'),
]);

export const watchWebinar = template(W, H, () => [
  mintBackdrop(),
  rect(360, 0, 360, H, linear(180, FERN.forest, FERN.deep), {
    cornerRadius: 40,
    name: 'Watch strap',
  }),
  circle(540, 675, 400, FERN.deep, { name: 'Watch case', ...shadow(50, 20, 'rgba(0,0,0,0.35)') }),
  circle(540, 675, 360, FERN.white, { name: 'Watch face' }),
  Array.from({ length: 12 }, (_, index) =>
    rotateNodes(index * 30, 540, 675, [
      rect(533, 330, 14, index % 3 === 0 ? 50 : 30, FERN.forest, {
        cornerRadius: 7,
        name: 'Tick',
      }),
    ]),
  ),
  text('Online', 340, 440, 400, {
    fontFamily: 'Dancing Script',
    fontSize: 90,
    fontWeight: 700,
    fill: FERN.deep,
    align: 'center',
  }),
  text('Webinar', 340, 540, 400, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 800,
    fill: FERN.fern,
    align: 'center',
  }),
  text('Strategy 101', 340, 660, 400, {
    fontFamily: HEAD,
    fontSize: 44,
    fontWeight: 800,
    fill: FERN.deep,
    align: 'center',
  }),
  text('Wednesday, June 18\nat 6 PM GMT', 340, 730, 400, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 500,
    fill: FERN.forest,
    align: 'center',
    lineHeight: 1.35,
  }),
]);

export const bigPercent = template(W, H, () => [
  forestBackdrop(),
  poly(
    [
      [1080, 520],
      [1080, 700],
      [300, 1350],
      [100, 1350],
    ],
    FERN.white,
    { name: 'Diagonal band' },
  ),
  text('of B2B teams now', 90, 150, 900, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 600,
    fill: FERN.white,
  }),
  highlight('automate', 90, 228, 300, 52),
  text('their weekly reports', 90, 310, 900, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 600,
    fill: FERN.white,
  }),
  text('72%', 50, 640, 1000, {
    fontFamily: HEAD,
    fontSize: 400,
    fontWeight: 800,
    fill: linear(180, FERN.mint, '#8fd3ac'),
    lineHeight: 1,
    letterSpacing: -12,
    ...shadow(30, 12, 'rgba(0,0,0,0.35)'),
  }),
]);
