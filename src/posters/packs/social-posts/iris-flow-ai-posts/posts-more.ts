import { linear } from '@/design';
import {
  avatar,
  circle,
  ellipse,
  icon,
  path,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  brand,
  centered,
  cursor,
  darkBackdrop,
  growOnline,
  H,
  HEAD,
  IRIS,
  irisText,
  lightBackdrop,
  magicRoutines,
  quoteFloat,
  sparkle,
  stayAhead,
  tag,
  W,
} from './posts';

const outlineButton = (label: string, x: number, y: number) => [
  rect(x, y, 260, 76, 'rgba(0,0,0,0)', {
    cornerRadius: 38,
    stroke: IRIS.iris,
    strokeWidth: 3,
    name: 'Button',
  }),
  text(label, x, y + 22, 260, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: IRIS.iris,
    align: 'center',
  }),
];

const streamlined = template(W, H, () => [
  lightBackdrop(H),
  centered('Streamlined.', 220, 120, 800, irisText),
  centered('Workflows made easy', 370, 44, 500, IRIS.ink),
  outlineButton('Learn more', 260, 470),
  outlineButton('Join today', 560, 470),
  path(
    'M 120 1200 C 220 900 500 770 780 800',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { stroke: IRIS.soft, strokeWidth: 64, name: 'Arc' },
  ),
  sparkle(790, 690, 110, IRIS.iris),
  sparkle(900, 620, 56, IRIS.soft),
  sparkle(890, 800, 46, IRIS.iris),
  brand(1220, IRIS.ink),
]);

const buildSystem = template(W, H, () => [
  darkBackdrop(H),
  centered("Let's Help You", 220, 72, 500, IRIS.white),
  centered('Build A System', 306, 72, 500, IRIS.white),
  centered('Worth Keeping', 394, 80, 800, IRIS.lilac),
  rect(230, 620, 620, 100, 'rgba(255,255,255,0.08)', {
    cornerRadius: 50,
    stroke: IRIS.white,
    strokeWidth: 3,
    name: 'Prompt field',
  }),
  text('Ask anything...', 290, 650, 460, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: IRIS.white,
  }),
  icon('search', 766, 646, 48, IRIS.white, { strokeWidth: 2.4 }),
  cursor(560, 700, 1.4, IRIS.white),
  brand(1220, IRIS.white),
]);

const stackedWords = template(W, H, () => [
  darkBackdrop(H),
  ['Draft.', 'Plan.', 'Ship.', 'Grow.'].map((word, index) =>
    text(word, 70, 130 + index * 210, 940, {
      fontFamily: HEAD,
      fontSize: 190,
      fontWeight: 800,
      fill: index % 2 === 0 ? IRIS.white : 'rgba(255,255,255,0.82)',
      lineHeight: 1,
    }),
  ),
  tag('Live examples', 520, 300, -6, 240),
  tag('Templates', 690, 520, 5, 200),
  tag('Smart prompts', 110, 720, -4, 250),
  tag('Commands', 560, 930, 4, 200),
  brand(1220, IRIS.white),
]);

const trustedGlobe = template(W, H, () => [
  lightBackdrop(H),
  centered('Trusted by', 160, 72, 500, IRIS.ink),
  centered('Thousands Worldwide', 248, 68, 800, irisText),
  ellipse(330, 1080, 420, 46, 'rgba(29,20,80,0.14)', { name: 'Shadow' }),
  circle(540, 760, 300, linear(160, IRIS.soft, IRIS.royal), {
    name: 'Globe',
    ...shadow(40, 20, 'rgba(36,18,126,0.3)'),
  }),
  ellipse(320, 590, 210, 150, 'rgba(255,255,255,0.35)', { name: 'Land' }),
  ellipse(570, 640, 170, 250, 'rgba(255,255,255,0.35)', { name: 'Land' }),
  ellipse(350, 800, 140, 160, 'rgba(255,255,255,0.35)', { name: 'Land' }),
  ellipse(640, 920, 120, 70, 'rgba(255,255,255,0.3)', { name: 'Land' }),
  ellipse(380, 520, 160, 70, 'rgba(255,255,255,0.4)', { name: 'Glare', rotation: -20 }),
  avatar('woman-portrait-1', 220, 560, 54, IRIS.white),
  avatar('man-portrait-1', 870, 540, 48, IRIS.white),
  avatar('woman-portrait-6', 890, 900, 58, IRIS.white),
  avatar('man-portrait-3', 210, 960, 46, IRIS.white),
  avatar('woman-portrait-4', 720, 430, 42, IRIS.white),
  brand(1220, IRIS.ink),
]);

const statCard = (
  x: number,
  y: number,
  width: number,
  height: number,
  value: string,
  label: string,
  featured: boolean,
) => [
  rect(
    x,
    y,
    width,
    height,
    featured ? linear(160, IRIS.lilac, IRIS.pale) : 'rgba(255,255,255,0.08)',
    {
      cornerRadius: 26,
      stroke: featured ? IRIS.white : 'rgba(201,188,255,0.6)',
      strokeWidth: 2,
      name: 'Stat card',
    },
  ),
  text(value, x + 36, y + 34, width - 60, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: featured ? IRIS.ink : IRIS.white,
    lineHeight: 1,
  }),
  text(label, x + 36, y + 146, width - 60, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: featured ? IRIS.ink : IRIS.lilac,
    lineHeight: 1.3,
  }),
];

const statsGrid = template(W, H, () => [
  darkBackdrop(H),
  brand(90, IRIS.white, 'right'),
  text('Why teams\nchoose our', 80, 200, 900, {
    fontFamily: HEAD,
    fontSize: 80,
    fontWeight: 500,
    fill: IRIS.white,
    lineHeight: 1.12,
  }),
  text('Platform', 80, 380, 900, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 800,
    fill: IRIS.lilac,
  }),
  statCard(80, 600, 560, 240, '12+', 'Years of product experience', false),
  statCard(80, 870, 270, 280, '6%', 'Lower churn\nthis quarter', false),
  statCard(370, 870, 270, 280, '3x', 'Faster\nonboarding', false),
  statCard(670, 740, 330, 410, '250+', 'Teams onboarded\nthis year', true),
]);

const effortless = (height: number, cy: number) => [
  darkBackdrop(height),
  tag('Assist', 210, cy - 400, -6, 170),
  tag('Create', 720, cy - 310, 6, 170),
  tag('Launch', 240, cy + 250, 4, 170),
  centered('AI that feels', cy - 210, 60, 500, IRIS.white),
  rect(220, cy - 120, 640, 160, 'rgba(255,255,255,0.08)', {
    stroke: IRIS.white,
    strokeWidth: 3,
    name: 'Selection box',
  }),
  [
    [212, cy - 128],
    [852, cy - 128],
    [212, cy + 32],
    [852, cy + 32],
  ].map(([x = 0, y = 0]) => rect(x, y, 16, 16, IRIS.white, { name: 'Handle' })),
  centered('Effortless', cy - 110, 108, 800, IRIS.white),
  cursor(850, cy + 30, 1.3, IRIS.white),
  centered('Begin your journey', cy + 110, 46, 500, IRIS.lilac),
  brand(height > H ? height - 260 : cy + 420, IRIS.white),
];

export const effortlessPost = template(W, H, () => effortless(H, 640));

export const effortlessStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  effortless(STORY_SIZE.height, 900),
);

export const POSTS = [
  magicRoutines,
  growOnline,
  stayAhead,
  quoteFloat,
  streamlined,
  effortlessPost,
  buildSystem,
  stackedWords,
  trustedGlobe,
  statsGrid,
];
