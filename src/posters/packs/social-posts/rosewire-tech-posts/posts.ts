import { type Fill, linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  poly,
  rating,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export const ROSE = {
  black: '#0b080d',
  panel: '#1a131d',
  rose: '#ff4f8b',
  pink: '#ff9cbf',
  pale: '#ffe1ec',
  grey: '#ab9aa4',
  white: '#ffffff',
  clear: 'rgba(255,79,139,0)',
};

export const HEAD = 'Plus Jakarta Sans';
export const BODY = 'Inter';

export const { width: W, height: H } = POST_SIZE;

export const roseText = linear(90, ROSE.rose, ROSE.pink);

export const brand = (y: number, align: 'left' | 'center' = 'center', color = ROSE.white) =>
  text('ROSEWIRE TECH', align === 'center' ? 0 : 80, y, align === 'center' ? W : 600, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 800,
    fill: color,
    align,
    letterSpacing: 3,
  });

export const glow = (cx: number, cy: number, radius: number, strength = 0.4, height: number = H) =>
  circle(
    cx,
    cy,
    Math.min(radius, cx, W - cx, cy, height - cy),
    {
      type: 'radial',
      stops: [
        { offset: 0, color: `rgba(255,79,139,${strength})` },
        { offset: 0.7, color: ROSE.clear },
        { offset: 1, color: ROSE.clear },
      ],
    },
    { name: 'Glow' },
  );

export const cursor = (x: number, y: number, scale: number, fill: string) =>
  poly(
    [
      [x, y],
      [x, y + 70 * scale],
      [x + 18 * scale, y + 54 * scale],
      [x + 32 * scale, y + 84 * scale],
      [x + 44 * scale, y + 78 * scale],
      [x + 30 * scale, y + 49 * scale],
      [x + 54 * scale, y + 49 * scale],
    ],
    fill,
    { name: 'Cursor' },
  );

const grid = () => [
  Array.from({ length: 11 }, (_, index) =>
    rect(index * 108 + 52, 0, 2, H, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
  ),
  Array.from({ length: 12 }, (_, index) =>
    rect(0, index * 112 + 60, W, 2, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
  ),
];

export const modularClick = template(W, H, () => [
  rect(0, 0, W, H, ROSE.black, { name: 'Background' }),
  grid(),
  glow(640, 960, 420, 0.4),
  brand(90, 'left'),
  text('Smarter Tools\nPicked in', 80, 200, 920, {
    fontFamily: HEAD,
    fontSize: 86,
    fontWeight: 500,
    fill: ROSE.white,
    lineHeight: 1.12,
  }),
  text('One Click', 80, 394, 920, {
    fontFamily: HEAD,
    fontSize: 86,
    fontWeight: 800,
    fill: roseText,
  }),
  rect(80, 540, 250, 76, roseText, { cornerRadius: 38, name: 'Button' }),
  text('Learn more', 80, 560, 250, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 700,
    fill: ROSE.black,
    align: 'center',
  }),
  path(
    'M 100 1130 C 220 1130 250 960 360 960 C 470 960 500 1060 600 1050 C 720 1040 760 820 880 800',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { stroke: ROSE.pink, strokeWidth: 6, name: 'Trend line' },
  ),
  circle(360, 960, 14, ROSE.black, { stroke: ROSE.white, strokeWidth: 4, name: 'Point' }),
  circle(600, 1050, 14, ROSE.black, { stroke: ROSE.white, strokeWidth: 4, name: 'Point' }),
  circle(880, 800, 18, ROSE.white, { name: 'Point' }),
  cursor(910, 830, 1.4, ROSE.white),
]);

const KEYS = [
  { label: 'Draft', x: 290, y: 740, rotation: -8, hot: false },
  { label: 'Automate', x: 620, y: 800, rotation: 10, hot: false },
  { label: 'Ship', x: 150, y: 900, rotation: 6, hot: true },
  { label: 'Insights', x: 500, y: 990, rotation: -4, hot: false },
  { label: 'Voice', x: 110, y: 1110, rotation: -9, hot: false },
  { label: 'Scale', x: 690, y: 1140, rotation: 7, hot: true },
];

export const blueprintKeys = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#1a111d', ROSE.black), { name: 'Background' }),
  glow(540, 1080, 420, 0.45),
  brand(90),
  text('Your Playbook for', 0, 190, W, {
    fontFamily: HEAD,
    fontSize: 70,
    fontWeight: 500,
    fill: ROSE.white,
    align: 'center',
  }),
  text('Smarter Growth', 0, 274, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: roseText,
    align: 'center',
  }),
  text(
    'From the first prompt to a full rollout, we give your\nteam the systems it needs to move faster.',
    90,
    400,
    900,
    { fontFamily: BODY, fontSize: 30, fontWeight: 400, fill: ROSE.grey, align: 'center' },
  ),
  KEYS.map((key) =>
    rotateNodes(key.rotation, key.x + 140, key.y + 55, [
      rect(key.x, key.y, 280, 110, key.hot ? roseText : linear(180, ROSE.white, '#f1d9e2'), {
        cornerRadius: 24,
        name: `${key.label} key`,
        ...shadow(0, 12, key.hot ? '#a3244f' : '#8f7a84'),
      }),
      text(key.label, key.x, key.y + 30, 280, {
        fontFamily: HEAD,
        fontSize: 42,
        fontWeight: 800,
        fill: ROSE.black,
        align: 'center',
      }),
    ]),
  ),
]);

const REVIEWS: { photo: PosterPhotoName; name: string; quote: string }[] = [
  { photo: 'man-portrait-3', name: 'Theo Marsh', quote: '' },
  { photo: 'woman-portrait-5', name: 'Lena Ortiz', quote: '' },
  {
    photo: 'woman-portrait-2',
    name: 'Ava Brennan',
    quote: 'The cleanest tool our\nteam has used. Setup\ntook one afternoon.',
  },
];

const reviewCard = (
  x: number,
  y: number,
  review: (typeof REVIEWS)[number],
  front: boolean,
): Nodes[] => [
  rect(x, y, 460, 460, linear(160, front ? '#33243a' : '#241a29', '#150f18'), {
    cornerRadius: 30,
    stroke: front ? 'rgba(255,156,191,0.75)' : 'rgba(255,156,191,0.35)',
    strokeWidth: 2,
    name: 'Review card',
    ...shadow(40, 20, 'rgba(0,0,0,0.6)'),
  }),
  avatar(review.photo, x + 80, y + 90, 46, ROSE.pink),
  front
    ? [
        text(review.name, x + 146, y + 60, 290, {
          fontFamily: HEAD,
          fontSize: 32,
          fontWeight: 800,
          fill: ROSE.white,
        }),
        rating(x + 148, y + 108, 24, 5, ROSE.pink),
        rect(x + 40, y + 180, 380, 2, 'rgba(255,255,255,0.12)', { name: 'Rule' }),
        text(review.quote, x + 40, y + 216, 390, {
          fontFamily: BODY,
          fontSize: 30,
          fontWeight: 500,
          fill: ROSE.pale,
          lineHeight: 1.45,
        }),
      ]
    : [
        rect(x + 146, y + 70, 150, 22, 'rgba(255,255,255,0.18)', { cornerRadius: 11 }),
        rect(x + 146, y + 108, 110, 18, 'rgba(255,156,191,0.4)', { cornerRadius: 9 }),
      ],
];

export const clientReviews = template(W, H, () => [
  rect(0, 0, W, H, ROSE.black, { name: 'Background' }),
  glow(540, 820, 460, 0.4),
  text('See why teams', 0, 150, W, {
    fontFamily: HEAD,
    fontSize: 70,
    fontWeight: 500,
    fill: ROSE.white,
    align: 'center',
  }),
  text('love working with us', 0, 232, W, {
    fontFamily: HEAD,
    fontSize: 70,
    fontWeight: 800,
    fill: roseText,
    align: 'center',
  }),
  REVIEWS.map((review, index) =>
    reviewCard(90 + index * 170, 660 - index * 100, review, index === REVIEWS.length - 1),
  ),
  brand(1220),
]);

const folderShape = (x: number, y: number, width: number, fill: Fill) => [
  rect(x, y, width * 0.42, width * 0.18, fill, { cornerRadius: width * 0.05, name: 'Folder tab' }),
  rect(x, y + width * 0.1, width, width * 0.7, fill, {
    cornerRadius: width * 0.07,
    name: 'Folder',
    ...shadow(30, 14, 'rgba(0,0,0,0.5)'),
  }),
];

const SIDE_FOLDERS = [
  { x: 60, y: 170, label: 'Brand Kit' },
  { x: 820, y: 130, label: 'Launch Plan' },
  { x: 40, y: 690, label: 'Contracts' },
  { x: 850, y: 640, label: 'Analytics' },
];

export const folderHero = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#1d1420', ROSE.black), { name: 'Background' }),
  glow(540, 520, 360, 0.45),
  SIDE_FOLDERS.map((item) => [
    folderShape(item.x, item.y, 190, linear(180, '#4a3f4f', '#231c27')),
    text(item.label, item.x - 20, item.y + 170, 230, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 500,
      fill: ROSE.grey,
      align: 'center',
    }),
  ]),
  folderShape(370, 380, 340, linear(160, ROSE.pink, ROSE.rose)),
  text('Keep every project', 0, 760, W, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 800,
    fill: ROSE.white,
    align: 'center',
  }),
  text('organized and\npurpose-driven.', 0, 828, W, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 400,
    fill: ROSE.pale,
    align: 'center',
    lineHeight: 1.2,
  }),
  icon('folder-open', 500, 1030, 80, ROSE.pink, { strokeWidth: 1.8 }),
  brand(1220),
]);
