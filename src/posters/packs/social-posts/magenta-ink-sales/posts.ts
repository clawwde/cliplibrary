import { linear } from '@/design';
import {
  circle,
  icon,
  POST_SIZE,
  pill,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const BL = {
  magenta: '#ff2d87',
  magentaDeep: '#d4146a',
  ink: '#121212',
  white: '#ffffff',
  blush: '#ffe3ef',
  grey: '#8b8b93',
  silver: '#d9d9de',
};

export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

type TextStyle = Parameters<typeof text>[4];

const font =
  (fontWeight: number, lineHeight: number) =>
  (
    content: string,
    x: number,
    y: number,
    width: number,
    size: number,
    fill: string,
    style: TextStyle = {},
  ) =>
    text(content, x, y, width, {
      fontFamily: 'Poppins',
      fontSize: size,
      fontWeight,
      fill,
      lineHeight,
      ...style,
    });

export const heavy = font(800, 1.05);
export const bold = font(700, 1.2);
export const copy = font(400, 1.4);

const button = (label: string, x: number, y: number, fill: string, color: string) =>
  pill(label, x, y, { fill, color, fontSize: 26, fontFamily: 'Poppins', fontWeight: 600 });

export const handle = (y: number, color: string) =>
  copy('brightloop.co', 0, y, W, 26, color, { align: 'center', fontWeight: 600, letterSpacing: 2 });

export const brandingMistakes = template(W, H, () => [
  rect(0, 0, W, H, BL.ink, { name: 'Background' }),
  heavy('Personal\nBranding', 90, 170, 900, 116, BL.white),
  rotateNodes(-3, 360, 515, [
    rect(80, 440, 580, 150, BL.magenta, { cornerRadius: 18, name: 'Highlight' }),
    heavy('mistakes', 80, 454, 580, 112, BL.white, { align: 'center' }),
  ]),
  heavy("You're\nMaking.", 90, 630, 900, 116, BL.white),
  copy('Five habits quietly holding\nyour brand back.', 90, 920, 800, 36, BL.silver),
  bold('Swipe to see them', 90, 1190, 600, 34, BL.white),
  icon('circle-arrow-right', 880, 1160, 110, BL.magenta, { strokeWidth: 2 }),
]);

const strand = (fromX: number, fromY: number, toX: number, toY: number) =>
  poly(
    [
      [fromX - 2, fromY],
      [fromX + 2, fromY],
      [toX + 2, toY],
      [toX - 2, toY],
    ],
    BL.ink,
    { name: 'String' },
  );

export const createBrands = template(W, H, () => [
  rect(0, 0, W, H, BL.white, { name: 'Background' }),
  heavy("we don't", 0, 240, W, 112, BL.ink, { align: 'center' }),
  rect(160, 390, 760, 160, BL.ink, { cornerRadius: 80, name: 'Pill' }),
  heavy('create ads', 160, 410, 760, 112, BL.magenta, { align: 'center' }),
  strand(540, 556, 380, 800),
  strand(540, 556, 700, 800),
  circle(540, 560, 12, BL.magenta, { name: 'Nail' }),
  rotateNodes(-4, 540, 860, [
    rect(290, 790, 500, 140, BL.magenta, {
      cornerRadius: 18,
      stroke: BL.ink,
      strokeWidth: 5,
      name: 'Sign',
    }),
    bold('we create brands', 290, 832, 500, 46, BL.white, { align: 'center' }),
  ]),
  copy('Strategy, story and design under one roof.', 0, 1060, W, 32, BL.grey, {
    align: 'center',
  }),
  handle(1230, BL.ink),
]);

const TILES = ['megaphone', 'target', 'message-square'] as const;

export const campaignInsights = template(W, H, () => [
  rect(0, 0, W, H, linear(170, BL.magenta, BL.magentaDeep), { name: 'Background' }),
  bold('Keep up with every\nmarketing move', 0, 170, W, 64, BL.white, {
    align: 'center',
    fontWeight: 600,
  }),
  heavy('Campaign Insights', 0, 360, W, 78, BL.ink, { align: 'center' }),
  TILES.map((name, index) => {
    const x = 155 + index * 270;
    return [
      rect(x, 520, 230, 230, BL.white, {
        cornerRadius: 44,
        name: 'Icon tile',
        ...shadow(24, 10, 'rgba(0,0,0,0.18)'),
      }),
      poly(
        [
          [x + 40, 740],
          [x + 100, 740],
          [x + 36, 800],
        ],
        BL.white,
        { name: 'Tile tail' },
      ),
      icon(name, x + 55, 575, 120, BL.ink, { strokeWidth: 2 }),
    ];
  }),
  bold('Sales & Marketing Analytics', 0, 870, W, 42, BL.white, { align: 'center' }),
  copy(
    'Fresh trends and numbers from every\ncampaign, delivered weekly.',
    0,
    940,
    W,
    32,
    BL.white,
    {
      align: 'center',
    },
  ),
  button('Subscribe', 455, 1110, BL.ink, BL.white),
]);

const person = (cx: number, cy: number) => [
  circle(cx, cy, 46, BL.white, { name: 'Avatar' }),
  icon('user-round', cx - 26, cy - 26, 52, BL.ink, { strokeWidth: 2.2 }),
];

export const chatHero = template(W, H, () => [
  rect(0, 0, W, H, linear(170, BL.magenta, BL.magentaDeep), { name: 'Background' }),
  person(150, 360),
  rect(220, 280, 660, 320, BL.ink, { cornerRadius: 44, name: 'Bubble' }),
  poly(
    [
      [220, 330],
      [180, 300],
      [240, 300],
    ],
    BL.ink,
    { name: 'Bubble tail' },
  ),
  copy('Do you want', 280, 320, 560, 56, BL.white),
  heavy('better results', 280, 396, 560, 56, BL.white),
  copy('for marketing?', 280, 466, 560, 56, BL.white),
  rect(560, 760, 300, 150, BL.ink, { cornerRadius: 44, name: 'Reply bubble' }),
  [650, 710, 770].map((x) => circle(x, 835, 16, BL.white, { name: 'Typing dot' })),
  person(940, 880),
  bold("Let's talk growth.", 90, 1100, 900, 54, BL.white, { fontWeight: 800 }),
  handle(1240, BL.ink),
]);
