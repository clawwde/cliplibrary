import { linear } from '@/design';
import {
  avatar,
  type Nodes,
  POST_SIZE,
  photo,
  rating,
  rect,
  rotateNodes,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export interface ReviewPalette {
  from: string;
  to: string;
  ink: string;
  paper: string;
  soft: string;
}

export const AMBER: ReviewPalette = {
  from: '#ffb703',
  to: '#f76707',
  ink: '#121212',
  paper: '#ffffff',
  soft: '#fff3d6',
};

export const ROSE: ReviewPalette = {
  from: '#ff5d8f',
  to: '#b5179e',
  ink: '#1a0b16',
  paper: '#ffffff',
  soft: '#ffe3ee',
};

export const HEAD = 'Figtree';
export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

export const sparkle = (x: number, y: number, size: number, fill = '#ffffff') =>
  star(5, x, y, size, fill, { innerRatio: 0.42, name: 'Sparkle' });

export const reviewCard = (
  x: number,
  y: number,
  width: number,
  p: ReviewPalette,
  who: { name: string; face: PosterPhotoName; quote: string },
  scale = 1,
): Nodes[] => [
  rect(x, y, width, 250 * scale, p.paper, {
    cornerRadius: 18 * scale,
    name: 'Review card',
    ...shadow(30 * scale, 10 * scale),
  }),
  avatar(who.face, x + 56 * scale, y + 58 * scale, 30 * scale),
  text(who.name, x + 104 * scale, y + 30 * scale, width - 130 * scale, {
    fontFamily: HEAD,
    fontSize: 30 * scale,
    fontWeight: 800,
    fill: p.ink,
  }),
  rating(x + 104 * scale, y + 72 * scale, 22 * scale, 5, p.from, 0.2),
  text(who.quote, x + 28 * scale, y + 118 * scale, width - 56 * scale, {
    fontSize: 26 * scale,
    fontWeight: 500,
    fill: '#3f3f46',
    lineHeight: 1.35,
  }),
];

const LETTERS = [
  ['R', 60, 40, -10],
  ['E', 360, 90, 6],
  ['V', 650, 30, -6],
  ['I', 120, 900, 8],
  ['E', 330, 920, -8],
  ['W', 600, 900, 6],
] as const;

export const reviewLetters = (p: ReviewPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    LETTERS.map(([letter, x, y, angle]) =>
      rotateNodes(angle, x + 150, y + 180, [
        text(letter, x, y, 380, {
          fontFamily: 'Archivo Black',
          fontSize: 380,
          fontWeight: 400,
          fill: linear(160, p.from, p.to),
          lineHeight: 1,
        }),
      ]),
    ),
    rotateNodes(-70, 960, 700, [
      rect(830, 670, 260, 60, p.to, { name: 'Ribbon' }),
      text('#REVIEW', 830, 680, 260, {
        fontFamily: HEAD,
        fontSize: 34,
        fontWeight: 900,
        fill: p.paper,
        align: 'center',
        letterSpacing: 3,
      }),
    ]),
    rotateNodes(-70, 110, 660, [
      rect(-20, 630, 260, 60, p.from, { name: 'Ribbon' }),
      text('#REVIEW', -20, 640, 260, {
        fontFamily: HEAD,
        fontSize: 34,
        fontWeight: 900,
        fill: p.ink,
        align: 'center',
        letterSpacing: 3,
      }),
    ]),
    reviewCard(170, 540, 740, p, {
      name: 'Jordan Mills',
      face: 'man-portrait-3',
      quote: 'Our ads finally make sense. Leads are up and\nreporting takes minutes, not days.',
    }),
    sparkle(860, 250, 110),
    sparkle(930, 860, 70),
    sparkle(900, 1180, 90),
  ]);

const paperSheet = (x: number, y: number, angle: number, fill: string) =>
  rotateNodes(angle, x + 380, y + 300, [
    rect(x, y, 760, 600, fill, { cornerRadius: 8, name: 'Paper', ...shadow(24, 8) }),
  ]);

export const clientsSay = (p: ReviewPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(160, p.from, p.to), { name: 'Background' }),
    text('Real words from\nreal partners', 0, 110, W, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 900,
      fill: p.ink,
      align: 'center',
      lineHeight: 1.1,
    }),
    paperSheet(160, 420, -7, '#e9e9ee'),
    paperSheet(160, 420, 4, '#f4f4f6'),
    paperSheet(160, 420, 0, p.paper),
    rect(200, 460, 680, 90, p.ink, { name: 'Masthead' }),
    text('What Our Clients Say', 220, 480, 640, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 900,
      fill: p.paper,
    }),
    rect(200, 580, 440, 240, p.soft, { cornerRadius: 10, name: 'Story box' }),
    avatar('woman-portrait-4', 250, 630, 32),
    text('Priya Shah', 296, 604, 300, {
      fontFamily: HEAD,
      fontSize: 28,
      fontWeight: 800,
      fill: p.ink,
    }),
    rating(296, 642, 20, 5, p.to, 0.2),
    text('The campaign paid for\nitself in three weeks.', 222, 700, 400, {
      fontSize: 26,
      fontWeight: 600,
      fill: p.ink,
      lineHeight: 1.35,
    }),
    [0, 1, 2, 3, 4, 5].map((row) =>
      rect(670, 590 + row * 40, 210, 14, '#c9c9d1', { cornerRadius: 7, name: 'Column line' }),
    ),
    rect(670, 830, 210, 150, linear(160, p.from, p.to), { cornerRadius: 10, name: 'Ad box' }),
    [0, 1].map((row) =>
      rect(200, 860 + row * 50, 440, 22, p.ink, { cornerRadius: 4, name: 'Headline bar' }),
    ),
    sparkle(110, 360, 120),
    sparkle(890, 980, 110),
    text('brightline.studio', 0, 1230, W, {
      fontSize: 28,
      fontWeight: 700,
      fill: p.ink,
      align: 'center',
    }),
  ]);

export const photoQuote = template(W, H, () => [
  photo('meeting-1', 0, 0, W, H, { name: 'Meeting photo' }),
  rect(0, 0, W, H, linear(180, 'rgba(18,18,18,0.05)', 'rgba(18,18,18,0.75)'), { name: 'Shade' }),
  rect(110, 150, 860, 820, 'rgba(0,0,0,0)', {
    stroke: AMBER.from,
    strokeWidth: 18,
    name: 'Frame',
  }),
  rect(110, 90, 250, 70, AMBER.from, { name: 'Tag' }),
  text('#REVIEW', 110, 104, 250, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 900,
    fill: AMBER.ink,
    align: 'center',
  }),
  text('“', 790, 20, 220, {
    fontFamily: 'Archivo Black',
    fontSize: 340,
    fontWeight: 400,
    fill: AMBER.paper,
    align: 'center',
    lineHeight: 1,
  }),
  rect(110, 1000, 860, 250, AMBER.paper, { cornerRadius: 22, name: 'Quote box' }),
  rating(150, 1036, 30, 5, AMBER.to, 0.2),
  text(
    '"Brightline turned our scattered posts into a\nsystem. Inbound calls doubled in a quarter."',
    150,
    1090,
    800,
    {
      fontSize: 30,
      fontWeight: 600,
      fill: AMBER.ink,
      lineHeight: 1.35,
    },
  ),
  text('Marco Bianchi, Founder at Tessaro', 150, 1190, 800, {
    fontFamily: HEAD,
    fontSize: 26,
    fontWeight: 800,
    fill: AMBER.to,
  }),
  sparkle(900, 900, 120),
]);
