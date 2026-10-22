import { linear } from '@/design';
import {
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  pill,
  rating,
  rect,
  rotateNodes,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface ReviewPalette {
  brand: string;
  deep: string;
  paper: string;
  ink: string;
}

export const CORAL: ReviewPalette = {
  brand: '#ff6b4a',
  deep: '#141a33',
  paper: '#fff4ec',
  ink: '#0d1022',
};

export const LAGOON: ReviewPalette = {
  brand: '#14b8a6',
  deep: '#0b2422',
  paper: '#effcf9',
  ink: '#061514',
};

export const HEAD = 'Outfit';
const BODY = 'DM Sans';
export const { width: W, height: H } = POST_SIZE;

export const reviewCard = (
  x: number,
  y: number,
  width: number,
  name: string,
  p: ReviewPalette,
  lines = 3,
): Nodes[] => {
  const height = 150 + lines * 34;
  return group(
    rect(x, y, width, height, '#ffffff', {
      cornerRadius: 18,
      name: 'Review card',
      shadow: { color: 'rgba(0,0,0,0.3)', blur: 30, offsetX: 0, offsetY: 12 },
    }),
    circle(x + 54, y + 56, 28, p.brand),
    icon('user', x + 38, y + 40, 32, '#ffffff'),
    text(name, x + 98, y + 30, width - 130, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 700,
      fill: p.ink,
    }),
    rating(x + 98, y + 72, 24, 5, '#f5b400', 0.2),
    Array.from({ length: lines }, (_, index) =>
      rect(
        x + 34,
        y + 130 + index * 34,
        (width - 68) * (index === lines - 1 ? 0.6 : 1),
        14,
        '#e5e7eb',
        { cornerRadius: 7, name: 'Review line' },
      ),
    ),
  );
};

export const reviewLetters = (p: ReviewPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    text('REVIEW', 40, 1310, 1240, {
      fontFamily: 'Anton',
      fontSize: 380,
      fontWeight: 400,
      fill: p.brand,
      rotation: -90,
      lineHeight: 1,
    }),
    rect(480, 0, 140, H, p.brand, { name: 'Tag band' }),
    text('#REVIEW   #REVIEW   #REVIEW', 525, 1300, 1260, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 800,
      fill: p.deep,
      rotation: -90,
      letterSpacing: 4,
    }),
    reviewCard(330, 470, 640, 'Leah Moreno', p, 4),
    text('Client feedback', 660, 120, 380, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 500,
      fill: p.paper,
    }),
    text('5.0', 660, 170, 380, {
      fontFamily: HEAD,
      fontSize: 150,
      fontWeight: 800,
      fill: p.paper,
    }),
    star(5, 910, 1140, 110, p.paper, { innerRatio: 0.45 }),
    star(5, 700, 980, 60, p.brand, { innerRatio: 0.45 }),
  ]);

const newspaper = (p: ReviewPalette): Nodes[] => [
  rotateNodes(-7, 540, 700, [
    rect(170, 400, 740, 600, '#e7e5e4', { cornerRadius: 6, name: 'Back sheet' }),
  ]),
  rotateNodes(5, 540, 700, [
    rect(170, 400, 740, 600, '#f5f5f4', { cornerRadius: 6, name: 'Middle sheet' }),
  ]),
  rect(170, 400, 740, 600, '#ffffff', {
    cornerRadius: 6,
    name: 'Front sheet',
    shadow: { color: 'rgba(0,0,0,0.3)', blur: 30, offsetX: 0, offsetY: 14 },
  }),
  rect(200, 430, 680, 90, p.ink, { name: 'Masthead' }),
  text('What Our Clients Say', 200, 452, 680, {
    fontFamily: HEAD,
    fontSize: 44,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  rect(200, 540, 410, 250, p.brand, { cornerRadius: 6, name: 'Review box' }),
  rect(214, 554, 382, 222, '#ffffff', { cornerRadius: 4, name: 'Review box inner' }),
  text('Amir Hassan', 240, 572, 320, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: p.ink,
  }),
  rating(240, 616, 22, 5, '#f5b400', 0.2),
  [0, 1, 2].map((index) =>
    rect(240, 668 + index * 30, index === 2 ? 200 : 330, 12, '#d6d3d1', {
      cornerRadius: 6,
      name: 'Review line',
    }),
  ),
  rect(630, 540, 250, 40, p.ink, { name: 'Column head' }),
  text('Top rated', 630, 546, 250, {
    fontFamily: HEAD,
    fontSize: 24,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  Array.from({ length: 6 }, (_, index) =>
    rect(630, 600 + index * 32, index % 3 === 2 ? 170 : 250, 12, '#d6d3d1', {
      cornerRadius: 6,
      name: 'Column line',
    }),
  ),
  Array.from({ length: 4 }, (_, index) =>
    rect(200, 820 + index * 36, index === 3 ? 380 : 680, 16, p.ink, {
      cornerRadius: 3,
      name: 'Body line',
    }),
  ),
  rect(720, 900, 160, 70, p.brand, { cornerRadius: 6, name: 'Badge' }),
  text('5.0 ★', 720, 914, 160, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
];

export const clientsSay = (p: ReviewPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    text('Real words from\nreal clients', 90, 110, 900, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: p.deep,
      lineHeight: 1.05,
    }),
    newspaper(p),
    star(5, 110, 330, 90, p.deep, { innerRatio: 0.45 }),
    star(5, 880, 1080, 110, p.paper, { innerRatio: 0.45 }),
    pill('Read all 120+ reviews', 90, 1170, {
      fill: p.deep,
      color: p.paper,
      fontSize: 34,
      fontFamily: HEAD,
      fontWeight: 700,
    }),
  ]);

export const photoQuote = (p: ReviewPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    photo('team-3', 0, 0, W, 1000),
    rect(0, 640, W, 360, linear(180, 'rgba(20,26,51,0)', p.deep), { name: 'Photo fade' }),
    rect(80, 130, 920, 880, 'rgba(0,0,0,0)', {
      stroke: p.brand,
      strokeWidth: 18,
      name: 'Frame',
    }),
    rect(810, 60, 170, 150, p.brand, { name: 'Quote block' }),
    icon('quote', 845, 85, 100, p.deep, { strokeWidth: 2.4 }),
    pill('#REVIEW', 120, 170, {
      fill: p.deep,
      color: p.paper,
      fontSize: 32,
      fontFamily: HEAD,
      fontWeight: 800,
    }),
    text(
      'They rebuilt our booking flow in two weeks. Enquiries doubled and the team finally has evenings back.',
      120,
      1050,
      840,
      {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 500,
        fill: p.paper,
        lineHeight: 1.35,
      },
    ),
    rating(120, 1230, 34, 5, p.brand, 0.25),
    text('Owen Price, Fieldhouse Cafe', 400, 1230, 600, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 700,
      fill: p.paper,
    }),
    star(5, 40, 960, 80, p.paper, { innerRatio: 0.45 }),
  ]);
