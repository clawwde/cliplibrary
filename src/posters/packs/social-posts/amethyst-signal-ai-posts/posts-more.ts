import { linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  pill,
  rect,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  brandMark,
  button,
  campaignRoi,
  crewPower,
  darkBg,
  H,
  HEAD,
  pickDirection,
  ringArc,
  VIO,
  violetGlow,
  W,
} from './posts';
import { buildFaster, quoteCloser, topFivePost } from './posts-mid';

const velocityGauge = template(W, H, () => [
  darkBg(H),
  brandMark(0, 90, W),
  violetGlow(240, 260, 600, 500, 0.5),
  ringArc(540, 640, 360, 250, 180, 300, linear(90, VIO.violet, VIO.bright)),
  ringArc(540, 640, 360, 250, 300, 360, 'rgba(255,255,255,0.35)'),
  ringArc(540, 640, 250, 236, 180, 360, 'rgba(255,255,255,0.12)'),
  icon('navigation', 500, 520, 80, VIO.white, { strokeWidth: 2 }),
  icon('sparkles', 150, 740, 64, VIO.bright, { strokeWidth: 2 }),
  text('Pushing momentum to', 240, 730, 760, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 700,
    fill: VIO.white,
  }),
  text('next-level output.', 240, 792, 760, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 700,
    fill: VIO.bright,
  }),
  text(
    'Built to speed up workflows, cut friction and keep every system moving in sync.',
    150,
    900,
    780,
    {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: VIO.muted,
      align: 'center',
      lineHeight: 1.45,
    },
  ),
  button('Watch Demo', 250, 1080, 270, false),
  button('Start Free', 560, 1080, 270, true),
]);

const TAGS: readonly { label: string; x: number; y: number; width: number; filled: boolean }[] = [
  { label: 'SAVE', x: 80, y: 200, width: 250, filled: true },
  { label: 'YOUR', x: 350, y: 200, width: 260, filled: false },
  { label: 'SEAT', x: 630, y: 200, width: 250, filled: false },
  { label: 'LIVE', x: 80, y: 350, width: 240, filled: false },
  { label: 'WORKSHOP', x: 340, y: 350, width: 470, filled: true },
];

const workshopTags = template(W, H, () => [
  darkBg(H),
  violetGlow(560, 500, 600, 600, 0.35),
  TAGS.map((tag) =>
    pill(tag.label, tag.x, tag.y, {
      fill: tag.filled ? linear(90, VIO.bright, VIO.violet) : 'rgba(0,0,0,0)',
      stroke: VIO.bright,
      strokeWidth: tag.filled ? 0 : 3,
      color: VIO.white,
      fontSize: 56,
      fontFamily: HEAD,
      fontWeight: 800,
      width: tag.width,
    }),
  ),
  rect(80, 500, 260, 134, VIO.white, { name: 'Arrow pill', cornerRadius: 67 }),
  icon('arrow-right', 165, 522, 90, VIO.violet, { strokeWidth: 2.6 }),
  [
    { y: 760, label: 'March 18, 2027' },
    { y: 828, label: '3:00 PM to 4:30 PM' },
    { y: 960, label: 'Register at lumenstack.io' },
  ].map((row, index) => [
    index === 1 ? [] : circle(100, row.y + 26, 14, VIO.bright),
    text(row.label, 140, row.y, 860, {
      fontFamily: BODY,
      fontSize: 44,
      fontWeight: index === 1 ? 500 : 700,
      fill: index === 1 ? VIO.muted : VIO.white,
    }),
  ]),
  brandMark(80, 1240, 600, VIO.white, 'left'),
]);

const reviewCard = template(W, H, () => [
  darkBg(H),
  brandMark(0, 90, W),
  [0, 1, 2, 3, 4].map((index) =>
    circle(460 + index * 40, 1180, 9, index === 2 ? VIO.bright : 'rgba(255,255,255,0.3)'),
  ),
  rect(40, 430, 220, 520, 'rgba(255,255,255,0.03)', {
    name: 'Ghost card',
    cornerRadius: 36,
    stroke: 'rgba(255,255,255,0.1)',
    strokeWidth: 2,
  }),
  rect(820, 430, 220, 520, 'rgba(255,255,255,0.03)', {
    name: 'Ghost card',
    cornerRadius: 36,
    stroke: 'rgba(255,255,255,0.1)',
    strokeWidth: 2,
  }),
  rect(260, 330, 560, 760, linear(180, '#2a1d4d', VIO.ink), {
    name: 'Review card',
    cornerRadius: 44,
    stroke: 'rgba(255,255,255,0.45)',
    strokeWidth: 3,
    ...shadow(60, 20, 'rgba(0,0,0,0.5)'),
  }),
  circle(340, 420, 40, linear(135, VIO.bright, VIO.violet)),
  icon('layers', 318, 398, 44, VIO.white, { strokeWidth: 2 }),
  star(5, 650, 400, 40, VIO.bright, { innerRatio: 0.45 }),
  text('5.0', 700, 400, 90, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 700,
    fill: VIO.white,
  }),
  text(
    'Lumen Stack turned our rough roadmap into a product our customers rave about. Calm, sharp and always a step ahead.',
    310,
    520,
    460,
    {
      fontFamily: BODY,
      fontSize: 33,
      fontWeight: 500,
      fill: VIO.white,
      lineHeight: 1.45,
    },
  ),
  avatar('man-portrait-3', 350, 970, 46),
  text('Theo Marlow', 415, 940, 380, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 700,
    fill: VIO.white,
  }),
  text('Founder, Driftlane', 415, 982, 380, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 500,
    fill: VIO.muted,
  }),
]);

export const POSTS: readonly Template[] = [
  crewPower,
  campaignRoi,
  pickDirection,
  buildFaster,
  topFivePost,
  quoteCloser,
  velocityGauge,
  workshopTags,
  reviewCard,
];
