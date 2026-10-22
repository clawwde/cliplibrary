import type { DesignIconName } from '@/design';
import {
  avatar,
  circle,
  group,
  icon,
  POST_SIZE,
  photo,
  pill,
  poly,
  rating,
  rect,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export const HARBOR = {
  navy: '#0f1d3a',
  deep: '#0a1429',
  coral: '#ff7a59',
  cream: '#fff4ec',
  white: '#ffffff',
  mist: '#c7d2e5',
} as const;

const { width: W, height: H } = POST_SIZE;
export const HEAD = 'Sora';
export const BODY = 'Inter';

export const navyBackground = () => rect(0, 0, W, H, HARBOR.navy, { name: 'Background' });

const faces = (
  names: readonly PosterPhotoName[],
  x: number,
  y: number,
  radius: number,
  ring: string,
) => group(names.map((name, index) => avatar(name, x + index * radius * 1.55, y, radius, ring)));

export const transforming = template(W, H, () => [
  navyBackground(),
  text('Northbeam', 90, 90, 400, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 700,
    fill: HARBOR.white,
  }),
  text('Transforming\nthe industry:', 90, 230, 900, {
    fontFamily: HEAD,
    fontSize: 80,
    fontWeight: 700,
    fill: HARBOR.white,
    lineHeight: 1.15,
  }),
  text('Grow smarter\nwith marketing', 90, 420, 900, {
    fontFamily: HEAD,
    fontSize: 80,
    fontWeight: 400,
    fill: HARBOR.white,
    lineHeight: 1.15,
  }),
  poly(
    [
      [0, 820],
      [560, 820],
      [640, 900],
      [W, 900],
      [W, H],
      [0, H],
    ],
    HARBOR.coral,
    { name: 'Rating panel' },
  ),
  faces(['woman-portrait-1', 'man-portrait-1', 'woman-portrait-5'], 170, 1080, 78, HARBOR.white),
  text('4.7', 640, 980, 300, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 700,
    fill: HARBOR.navy,
  }),
  star(5, 930, 990, 60, HARBOR.navy, { innerRatio: 0.45 }),
]);

export const creativeTeams = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.navy, { name: 'Background' }),
  photo('team-1', 0, 0, W, H),
  rect(80, 760, 700, 440, HARBOR.white, { name: 'Card', cornerRadius: 28, ...shadow(40, 16) }),
  text('Creative Teams\nCollaboration', 130, 810, 620, {
    fontFamily: HEAD,
    fontSize: 58,
    fontWeight: 700,
    fill: HARBOR.navy,
    lineHeight: 1.15,
  }),
  text('Practical guides to lift your\ncampaign results and ROI.', 130, 990, 620, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 400,
    fill: '#475569',
    lineHeight: 1.4,
  }),
  star(12, 820, 1060, 180, HARBOR.coral, { innerRatio: 0.32 }),
]);

const arrowDisc = (name: DesignIconName, x: number, y: number) =>
  group(
    circle(x + 70, y + 70, 70, HARBOR.coral),
    icon(name, x + 30, y + 30, 80, HARBOR.navy, { strokeWidth: 2.6 }),
  );

const wordPill = (word: string, x: number, y: number, width: number, filled: boolean) =>
  pill(word, x, y, {
    fill: filled ? HARBOR.white : 'rgba(0,0,0,0)',
    stroke: HARBOR.coral,
    strokeWidth: filled ? 0 : 5,
    color: filled ? HARBOR.navy : HARBOR.white,
    fontSize: 64,
    fontFamily: HEAD,
    fontWeight: 600,
    padY: 20,
    width,
  });

export const growMore = template(W, H, () => [
  navyBackground(),
  arrowDisc('arrow-right', 140, 260),
  wordPill('Grow', 320, 260, 520, true),
  wordPill('More', 140, 460, 420, false),
  wordPill('with', 590, 460, 250, false),
  arrowDisc('arrow-down', 140, 660),
  wordPill('Less', 320, 660, 520, true),
  wordPill('Effort', 140, 860, 520, true),
  arrowDisc('arrow-right', 700, 860),
]);

const STEPS: readonly DesignIconName[] = ['megaphone', 'target', 'message-square'];

export const strategyMotion = template(W, H, () => [
  navyBackground(),
  rect(0, 230, 180, 8, HARBOR.white, { name: 'Track' }),
  rect(172, 230, 8, 900, HARBOR.white, { name: 'Track' }),
  rect(172, 1122, 908, 8, HARBOR.white, { name: 'Track' }),
  STEPS.map((name, index) => [
    circle(176, 400 + index * 250, 62, HARBOR.coral),
    icon(name, 141, 365 + index * 250, 70, HARBOR.navy, { strokeWidth: 2.4 }),
  ]),
  text(['Your', 'strategy', 'actively', 'in motion.'].join('\n'), 340, 400, 700, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 600,
    fill: HARBOR.white,
    lineHeight: 1.15,
  }),
]);

export const targetGoals = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.cream, { name: 'Background' }),
  [300, 240, 180, 120, 60].map((radius, index) =>
    circle(780, 320, radius, index % 2 === 0 ? HARBOR.coral : HARBOR.cream, { name: 'Ring' }),
  ),
  text('Hit your goals\nfaster by', 90, 700, 900, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 600,
    fill: HARBOR.navy,
    lineHeight: 1.15,
  }),
  text('4.0%', 80, 920, 900, {
    fontFamily: HEAD,
    fontSize: 200,
    fontWeight: 800,
    fill: HARBOR.coral,
  }),
]);

const BOLT: readonly (readonly [number, number])[] = [
  [620, 140],
  [960, 140],
  [800, 560],
  [1000, 560],
  [560, 1240],
  [680, 740],
  [480, 740],
];

export const chargedBolt = template(W, H, () => [
  navyBackground(),
  poly(
    BOLT.map(([px, py]): [number, number] => [px + 40, py + 10]),
    HARBOR.white,
    { name: 'Bolt shadow' },
  ),
  poly(BOLT, HARBOR.coral, { name: 'Bolt' }),
  text('50%', 90, 140, 600, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 800,
    fill: HARBOR.coral,
  }),
  text('Charged', 90, 350, 600, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 500,
    fill: HARBOR.white,
  }),
  text('Powering your', 90, 1040, 500, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 400,
    fill: HARBOR.white,
  }),
  text('next big move.', 90, 1110, 520, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 700,
    fill: HARBOR.white,
  }),
]);

export const testimonial = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.white, { name: 'Background' }),
  photo('woman-portrait-1', 60, 110, 440, 1000, { cornerRadius: 36 }),
  text('Customer Experience', 560, 130, 480, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 600,
    fill: HARBOR.coral,
    italic: true,
  }),
  rating(560, 200, 34, 5, HARBOR.coral),
  text('5.0', 800, 196, 120, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 700,
    fill: HARBOR.navy,
  }),
  text(
    'Working with this team changed how we sell. In two weeks they understood our brand, goals and buyers better than we did.',
    560,
    290,
    460,
    {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 500,
      fill: HARBOR.navy,
      lineHeight: 1.4,
    },
  ),
  pill('Head of Growth', 560, 1040, {
    fill: HARBOR.coral,
    color: HARBOR.navy,
    fontSize: 32,
    fontFamily: HEAD,
    fontWeight: 700,
  }),
]);
