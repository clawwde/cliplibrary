import { linear } from '@/design';
import {
  avatar,
  checklist,
  ellipse,
  icon,
  path,
  pill,
  poly,
  rating,
  rect,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { BODY, brandTraps, H, HEAD, hashtag, insightImagination, TAN, W } from './posts';
import { gamePlanTangerine, spotlightPost } from './posts-mid';

export const clientHappiness = template(W, H, () => [
  rect(0, 0, W, H, linear(180, TAN.white, TAN.paper, '#f6ece1'), { name: 'Background' }),
  text('Client', 0, 250, W, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 700,
    fill: TAN.navy,
    align: 'center',
  }),
  text('Happiness', 0, 340, W, {
    fontFamily: HEAD,
    fontSize: 156,
    fontWeight: 800,
    fill: linear(90, TAN.tangerine, '#ff9a4d'),
    align: 'center',
  }),
  text('Trust > Traffic', 0, 560, W, {
    fontFamily: BODY,
    fontSize: 52,
    fontWeight: 600,
    fill: TAN.navy,
    align: 'center',
  }),
  ellipse(150, 880, 780, 50, 'rgba(10,17,40,0.08)', { name: 'Shadow' }),
  [0, 1, 2, 3].map((index) =>
    star(5, 150 + index * 165, 730, 140, TAN.tangerine, { innerRatio: 0.48 }),
  ),
  star(5, 820, 680, 150, TAN.tangerine, {
    innerRatio: 0.48,
    rotation: 16,
    ...shadow(24, 10, 'rgba(255,122,26,0.4)'),
  }),
  hashtag(1120),
]);

export const reviewsWall = template(W, H, () => [
  rect(0, 0, W, H, TAN.navy, { name: 'Background' }),
  Array.from({ length: 7 }, (_, index) =>
    text('Reviews', 50, 30 + index * 182, 980, {
      fontFamily: HEAD,
      fontSize: 180,
      fontWeight: 800,
      fill: index % 2 === 0 ? TAN.tangerine : 'rgba(0,0,0,0)',
      stroke: TAN.tangerine,
      strokeWidth: index % 2 === 0 ? 0 : 3,
      lineHeight: 1,
    }),
  ),
  rect(360, 420, 660, 470, TAN.white, {
    name: 'Review card',
    cornerRadius: 40,
    ...shadow(50, 20, 'rgba(0,0,0,0.4)'),
  }),
  poly(
    [
      [430, 880],
      [530, 880],
      [430, 980],
    ],
    TAN.white,
    { name: 'Speech tail' },
  ),
  avatar('woman-portrait-6', 455, 520, 52),
  text('Lena Ortiz', 530, 482, 440, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 800,
    fill: TAN.navy,
  }),
  rating(532, 532, 26, 5, TAN.tangerine),
  text(
    'Brightmark sharpened our brand and doubled our inbound leads in a single quarter. Clear plan, flawless execution.',
    410,
    610,
    570,
    {
      fontFamily: BODY,
      fontSize: 31,
      fontWeight: 500,
      fill: TAN.slate,
      lineHeight: 1.45,
    },
  ),
]);

export const launchChecklist = template(W, H, () => [
  rect(0, 0, W, H, linear(180, TAN.peach, TAN.tangerine), { name: 'Background' }),
  path(
    'M 0 120 Q 540 220 1080 120',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { name: 'String', stroke: TAN.white, strokeWidth: 4 },
  ),
  rect(250, 260, 680, 920, TAN.cream, { name: 'Back sheet', rotation: 4 }),
  rect(200, 240, 680, 920, TAN.white, {
    name: 'Sheet',
    cornerRadius: 24,
    ...shadow(40, 16, 'rgba(10,17,40,0.25)'),
  }),
  rect(495, 150, 90, 140, TAN.navy, { name: 'Clip', cornerRadius: 14 }),
  rect(515, 170, 50, 60, TAN.peach, { name: 'Clip hole', cornerRadius: 10 }),
  Array.from({ length: 14 }, (_, index) =>
    ellipse(226, 300 + index * 60, 20, 20, TAN.navy, { name: 'Binder hole' }),
  ),
  text('Your Launch', 290, 330, 560, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 700,
    fill: TAN.navy,
  }),
  text('Checklist', 290, 395, 560, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: TAN.tangerine,
  }),
  checklist(
    ['Define your audience', 'Craft a clear offer', 'Plan weekly content', 'Track every result'],
    290,
    630,
    560,
    { color: TAN.navy, iconColor: TAN.tangerine, fontSize: 38, gap: 130, fontFamily: BODY },
  ),
  hashtag(1220, TAN.white),
]);

export const nowHiring = template(W, H, () => [
  rect(0, 0, W, H, TAN.paper, { name: 'Background' }),
  Array.from({ length: 6 }, (_, index) =>
    text('HIRING', index % 2 === 0 ? 40 : 300, 20 + index * 222, 760, {
      fontFamily: HEAD,
      fontSize: 210,
      fontWeight: 800,
      fill: 'rgba(0,0,0,0)',
      stroke: 'rgba(15,27,61,0.09)',
      strokeWidth: 3,
      lineHeight: 1,
    }),
  ),
  icon('phone', 90, 430, 330, TAN.tangerine, { strokeWidth: 2.2 }),
  path(
    'M 200 770 C 200 930 330 980 430 1050 S 700 1140 1000 1100',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { name: 'Cord', stroke: TAN.tangerine, strokeWidth: 6 },
  ),
  text('Now', 480, 420, 560, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 800,
    fill: TAN.navy,
    lineHeight: 1,
  }),
  text('Hiring', 480, 540, 560, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 800,
    fill: TAN.tangerine,
    lineHeight: 1,
  }),
  text('Send your portfolio to\njobs@brightmark.co', 480, 730, 560, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: TAN.slate,
    lineHeight: 1.4,
  }),
  pill('Apply today', 480, 860, {
    fill: TAN.navy,
    color: TAN.white,
    fontSize: 32,
    fontFamily: BODY,
    fontWeight: 600,
    width: 260,
  }),
]);

export const POSTS: readonly Template[] = [
  brandTraps,
  spotlightPost,
  gamePlanTangerine,
  insightImagination,
  reviewsWall,
  clientHappiness,
  launchChecklist,
  nowHiring,
];
