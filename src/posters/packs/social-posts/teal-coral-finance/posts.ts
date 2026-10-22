import { linear } from '@/design';
import {
  avatar,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  pill,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const NV = {
  teal: '#0f5560',
  deep: '#0a3840',
  coral: '#ff7a5c',
  coralSoft: '#ffd6c9',
  cream: '#fff6ef',
  mist: '#e6f1f0',
  ink: '#16323a',
  white: '#ffffff',
};

const HEAD = 'Plus Jakarta Sans';
const BODY = 'DM Sans';
export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

type TextStyle = Parameters<typeof text>[4];

export const head = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  weight = 700,
  style: TextStyle = {},
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    lineHeight: 1.15,
    ...style,
  });

export const copy = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  style: TextStyle = {},
) =>
  text(content, x, y, width, {
    fontFamily: BODY,
    fontSize: size,
    fontWeight: 400,
    fill,
    lineHeight: 1.4,
    ...style,
  });

export const logo = (cx: number, y: number, color: string): Nodes[] => {
  const left = cx - 100;
  return group(
    [18, 30, 42].map((height, index) =>
      rect(left + index * 16, y + 46 - height, 11, height, color, {
        cornerRadius: 3,
        name: 'Logo bar',
      }),
    ),
    head('NORTHVALE\nCAPITAL', left + 58, y, 160, 22, color, 800, {
      lineHeight: 1.05,
      letterSpacing: 1.5,
    }),
  );
};

export const button = (label: string, x: number, y: number, fill: string, color: string) =>
  pill(label, x, y, { fill, color, fontSize: 26, fontFamily: BODY, fontWeight: 700 });

const chip = (name: Parameters<typeof icon>[0], x: number, y: number) =>
  group(
    rect(x, y, 112, 112, NV.white, {
      cornerRadius: 30,
      name: 'Icon chip',
      ...shadow(30, 12, 'rgba(0,0,0,0.25)'),
    }),
    icon(name, x + 30, y + 30, 52, NV.teal, { strokeWidth: 2.2 }),
  );

export const bankingChoice = template(W, H, () => [
  rect(0, 0, W, H, linear(170, NV.teal, NV.deep), { name: 'Background' }),
  logo(540, 80, NV.white),
  head('Choose the right', 0, 200, W, 62, NV.white, 500, { align: 'center' }),
  head('Banking for You', 0, 280, W, 88, NV.coral, 800, { align: 'center' }),
  rect(310, 500, 520, 700, NV.coral, { cornerRadius: 44, name: 'Accent block' }),
  photo('man-portrait-1', 270, 460, 520, 700, { cornerRadius: 44 }),
  chip('house', 190, 560),
  chip('car', 760, 520),
  chip('chart-line', 790, 900),
  chip('piggy-bank', 180, 980),
  copy('Accounts that grow with every stage of life', 0, 1240, W, 30, NV.mist, {
    align: 'center',
  }),
]);

export const fasterLoans = template(W, H, () => [
  rect(0, 0, W, H, NV.cream, { name: 'Background' }),
  rect(700, 0, 160, 230, NV.teal, { cornerRadius: 28, name: 'Column block' }),
  rect(700, 1110, 160, 240, NV.coral, { cornerRadius: 28, name: 'Column block' }),
  rect(880, 0, 160, 360, NV.coral, { cornerRadius: 28, name: 'Column block' }),
  rect(880, 960, 160, 390, NV.teal, { cornerRadius: 28, name: 'Column block' }),
  photo('man-portrait-3', 640, 270, 400, 660, { cornerRadius: 36 }),
  rect(640, 950, 200, 140, NV.coralSoft, { cornerRadius: 28, name: 'Column block' }),
  head('We provide', 80, 360, 540, 54, NV.teal, 600),
  head('5x', 66, 420, 560, 330, NV.coral, 800, { lineHeight: 1 }),
  head('faster loans', 80, 770, 540, 62, NV.teal, 700),
  copy('Approval in hours, not weeks.\nNo paperwork piles.', 80, 860, 520, 30, NV.ink),
  button('Apply Today', 80, 990, NV.teal, NV.white),
  logo(180, 1210, NV.teal),
]);

const LINES: readonly [number, number, number, number][] = [
  [80, 200, 900, 4],
  [300, 200, 4, 460],
  [300, 656, 520, 4],
  [816, 300, 4, 360],
  [816, 300, 264, 4],
  [560, 200, 4, 240],
  [560, 436, 520, 4],
  [160, 436, 4, 340],
  [0, 772, 164, 4],
];

export const smarterPlans = template(W, H, () => [
  rect(0, 0, W, H, linear(165, NV.teal, NV.deep), { name: 'Background' }),
  LINES.map(([x, y, width, height]) =>
    rect(x, y, width, height, 'rgba(255,255,255,0.28)', { name: 'Circuit line' }),
  ),
  [
    [560, 202],
    [818, 658],
    [1000, 438],
    [162, 560],
  ].map(([x = 0, y = 0]) =>
    rect(x - 18, y - 18, 36, 36, NV.coral, { cornerRadius: 8, name: 'Node' }),
  ),
  avatar('woman-portrait-1', 302, 202, 62, NV.white),
  avatar('man-portrait-2', 818, 302, 62, NV.white),
  avatar('woman-portrait-4', 562, 438, 62, NV.white),
  avatar('man-portrait-1', 302, 658, 62, NV.white),
  head('Enabling Smarter', 0, 830, W, 58, NV.white, 500, { align: 'center' }),
  head('Financial Plans', 0, 900, W, 92, NV.coral, 800, { align: 'center' }),
  pill('Book a Call', 316, 1060, {
    fill: 'rgba(0,0,0,0)',
    stroke: NV.white,
    strokeWidth: 3,
    color: NV.white,
    fontSize: 26,
    fontFamily: BODY,
    fontWeight: 700,
  }),
  button('Get Started', 556, 1060, NV.coral, NV.white),
  logo(540, 1210, NV.white),
]);

export const webinarSteps = template(W, H, () => [
  rect(0, 0, W, H, linear(180, NV.white, NV.mist), { name: 'Background' }),
  head('Webinar', 80, 120, 400, 40, NV.teal, 500),
  head('Practical steps', 80, 190, 920, 84, NV.deep, 800),
  head('for growing your', 80, 290, 920, 84, NV.coral, 800),
  head('wealth plan.', 80, 390, 920, 84, NV.deep, 800),
  rect(0, 600, 190, 120, NV.teal, { cornerRadius: 60, name: 'Band' }),
  avatar('woman-portrait-1', 290, 660, 62, NV.white),
  rect(370, 600, 420, 120, NV.coral, { cornerRadius: 60, name: 'Name chip' }),
  head('Maya Linwood', 410, 620, 360, 34, NV.white, 700),
  copy('Wealth Strategist', 410, 664, 360, 24, NV.white),
  rect(810, 600, 270, 120, NV.teal, { cornerRadius: 60, name: 'Band' }),
  rect(0, 750, 120, 120, NV.coral, { cornerRadius: 60, name: 'Band' }),
  rect(140, 750, 440, 120, NV.teal, { cornerRadius: 60, name: 'Name chip' }),
  head('Daniel Okafor', 186, 770, 360, 34, NV.white, 700),
  copy('Retirement Advisor', 186, 814, 360, 24, NV.white),
  avatar('man-portrait-2', 660, 810, 62, NV.white),
  rect(750, 750, 330, 120, NV.coralSoft, { cornerRadius: 60, name: 'Band' }),
  copy('Live session  ·  Thursday, 6 PM', 0, 960, W, 32, NV.teal, {
    align: 'center',
    fontWeight: 600,
  }),
  logo(540, 1170, NV.deep),
]);
