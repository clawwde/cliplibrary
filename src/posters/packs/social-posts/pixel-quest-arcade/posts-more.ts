import { linear } from '@/design';
import { dots, rect, STORY_SIZE, template, text } from '../../../kit';
import { BLOCKY, CHUNKY, H, HEART, PX, siteFooter, sprite, TERMINAL, W } from './pixel';

const STATS = [
  { label: 'ROI', value: '240%' },
  { label: 'CAC', value: '$18' },
  { label: 'CTR', value: '4.2%' },
  { label: 'LTV', value: '$960' },
  { label: 'NPS', value: '72' },
];

export const growthStats = template(W, H, () => [
  rect(0, 0, W, H, PX.night, { name: 'Background' }),
  dots(60, 60, 18, 23, 56, 'rgba(201,168,255,0.12)', 3),
  text('GROWTH', 0, 110, W, {
    fontFamily: CHUNKY,
    fontSize: 170,
    fontWeight: 400,
    fill: linear(180, PX.sun, PX.orange),
    stroke: PX.pink,
    strokeWidth: 4,
    align: 'center',
    lineHeight: 1,
  }),
  text('STATS', 0, 310, W, {
    fontFamily: BLOCKY,
    fontSize: 64,
    fontWeight: 400,
    fill: PX.white,
    align: 'center',
  }),
  STATS.map((item, index) => [
    text(item.label, 200, 450 + index * 135, 360, {
      fontFamily: TERMINAL,
      fontSize: 104,
      fontWeight: 700,
      fill: PX.mint,
      lineHeight: 1,
    }),
    text(item.value, 520, 450 + index * 135, 360, {
      fontFamily: TERMINAL,
      fontSize: 104,
      fontWeight: 700,
      fill: PX.white,
      align: 'right',
      lineHeight: 1,
    }),
  ]),
  siteFooter(1250, PX.grey),
]);

const FACTORS = [
  { label: 'CAMPAIGN PLANNING', value: 92 },
  { label: 'DATA INSIGHTS', value: 85 },
  { label: 'CONTENT ENGINE', value: 78 },
  { label: 'PERFECT TIMING', value: 64 },
];

export const keyFactors = template(W, H, () => [
  rect(0, 0, W, H, PX.night, { name: 'Background' }),
  text('KEY FACTORS FOR', 0, 100, W, {
    fontFamily: BLOCKY,
    fontSize: 40,
    fontWeight: 400,
    fill: PX.white,
    align: 'center',
  }),
  text('B2B GROWTH', 0, 170, W, {
    fontFamily: CHUNKY,
    fontSize: 110,
    fontWeight: 400,
    fill: PX.mint,
    align: 'center',
  }),
  FACTORS.map((factor, index) => {
    const y = 420 + index * 180;
    const filled = Math.round(factor.value / 10);
    return [
      sprite(HEART, 80, y + 2, 7, { P: PX.pink }),
      text(factor.label, 160, y, 560, {
        fontFamily: BLOCKY,
        fontSize: 34,
        fontWeight: 400,
        fill: PX.white,
      }),
      text(`${factor.value}%`, 700, y, 300, {
        fontFamily: BLOCKY,
        fontSize: 36,
        fontWeight: 400,
        fill: PX.sun,
        align: 'right',
      }),
      Array.from({ length: 10 }, (_, segment) =>
        rect(160 + segment * 84, y + 64, 76, 46, segment < filled ? PX.mint : PX.grid, {
          name: 'Segment',
        }),
      ),
    ];
  }),
  text('SCORE YOUR FUNNEL TODAY', 0, 1140, W, {
    fontFamily: BLOCKY,
    fontSize: 34,
    fontWeight: 400,
    fill: PX.mint,
    align: 'center',
  }),
  siteFooter(1250, PX.grey),
]);

const BLOCK = 108;

const STACK = ['SS.....MMK', 'SSP...PMKK', 'OPPP.PPMKO', 'OOMMSSPPKO'];

const BLOCK_COLORS: Readonly<Record<string, string>> = {
  S: PX.sun,
  M: PX.mint,
  P: PX.pink,
  O: PX.orange,
  K: PX.sky,
};

const block = (x: number, y: number, color: string) => [
  rect(x, y, BLOCK, BLOCK, color, { stroke: PX.night, strokeWidth: 5, name: 'Block' }),
  rect(x + 14, y + 14, BLOCK - 40, 14, 'rgba(255,255,255,0.35)', { name: 'Block shine' }),
];

const tetrisNodes = (height: number) => {
  const stackTop = height - STACK.length * BLOCK;
  const fallTop = height * 0.34;
  return [
    rect(0, 0, W, height, linear(180, '#2a1a6e', PX.night), { name: 'Background' }),
    text('FIT IN WITH', 0, height * 0.07, W, {
      fontFamily: CHUNKY,
      fontSize: 80,
      fontWeight: 400,
      fill: PX.white,
      align: 'center',
    }),
    text('YOUR AUDIENCE', 0, height * 0.07 + 100, W, {
      fontFamily: CHUNKY,
      fontSize: 80,
      fontWeight: 400,
      fill: PX.sun,
      align: 'center',
    }),
    [3, 4, 5].map((column) => block(column * BLOCK, fallTop, PX.orange)),
    block(4 * BLOCK, fallTop + BLOCK, PX.orange),
    STACK.map((row, rowIndex) =>
      [...row].map((cell, columnIndex) => {
        const color = BLOCK_COLORS[cell];
        return color === undefined
          ? []
          : block(columnIndex * BLOCK, stackTop + rowIndex * BLOCK, color);
      }),
    ),
  ];
};

export const tetrisFit = template(W, H, () => tetrisNodes(H));

export const tetrisFitStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  tetrisNodes(STORY_SIZE.height),
);
