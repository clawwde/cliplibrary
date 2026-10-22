import { linear, radial } from '@/design';
import {
  circle,
  ellipse,
  icon,
  type Nodes,
  POST_SIZE,
  phone,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const ICE = {
  night: '#030a14',
  navy: '#071a33',
  deep: '#0b2a52',
  cyan: '#22d3ee',
  electric: '#0ea5e9',
  ice: '#cffafe',
  paper: '#f0fbff',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.72)',
};

export const HEAD = 'Outfit';
export const BODY = 'DM Sans';
export const { width: W, height: H } = POST_SIZE;

export const brandMark = (
  x: number,
  y: number,
  width: number,
  color: string,
  align: 'left' | 'center' | 'right' = 'center',
) =>
  text('QUANTA GRID', x, y, width, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: color,
    align,
    letterSpacing: 4,
  });

const glow = (x: number, y: number, width: number, height: number, alpha = 0.32) =>
  ellipse(
    x,
    y,
    width,
    height,
    radial(
      `rgba(34,211,238,${alpha})`,
      `rgba(34,211,238,${alpha * 0.3})`,
      'rgba(34,211,238,0)',
      'rgba(34,211,238,0)',
    ),
    { name: 'Glow' },
  );

export const darkBg = (height: number): Nodes[] => [
  rect(0, 0, W, height, linear(180, '#0a2546', ICE.night, ICE.night), { name: 'Background' }),
  glow(140, 0, 800, 640),
];

export const button = (label: string, x: number, y: number, width: number, filled: boolean) => [
  rect(x, y, width, 72, filled ? linear(90, ICE.cyan, ICE.electric) : 'rgba(255,255,255,0.04)', {
    name: `${label} button`,
    cornerRadius: 36,
    stroke: 'rgba(255,255,255,0.65)',
    strokeWidth: filled ? 0 : 2,
  }),
  text(label, x, y + 20, width, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: filled ? ICE.night : ICE.white,
    align: 'center',
  }),
];

const BIG = { fontFamily: HEAD, fontSize: 230, fontWeight: 800, fill: ICE.white, lineHeight: 1 };

export const planBuildShip = template(W, H, () => [
  darkBg(H),
  text('Plan.', 70, 170, 960, BIG),
  text('Build.', 70, 500, 960, BIG),
  text('Ship.', 70, 830, 960, BIG),
  phone(590, 300, 330, {
    rotation: 10,
    screen: linear(180, '#38bdf8', '#cffafe'),
    content: [
      circle(110, 190, 48, ICE.white),
      circle(165, 165, 64, ICE.white),
      circle(220, 195, 46, ICE.white),
      rect(62, 190, 210, 50, ICE.white, { name: 'Cloud base', cornerRadius: 25 }),
      rect(30, 440, 240, 70, 'rgba(255,255,255,0.75)', { name: 'Card', cornerRadius: 18 }),
      rect(30, 526, 170, 46, 'rgba(255,255,255,0.5)', { name: 'Card', cornerRadius: 14 }),
    ],
  }),
  brandMark(0, 1240, W, ICE.white),
]);

export const riseOfAutopilot = template(W, H, () => [
  darkBg(H),
  rect(40, 330, 240, 240, 'rgba(34,211,238,0.08)', {
    name: 'Side tile',
    cornerRadius: 44,
    stroke: 'rgba(34,211,238,0.35)',
    strokeWidth: 2,
  }),
  rect(800, 330, 240, 240, 'rgba(34,211,238,0.08)', {
    name: 'Side tile',
    cornerRadius: 44,
    stroke: 'rgba(34,211,238,0.35)',
    strokeWidth: 2,
  }),
  rect(390, 290, 300, 300, linear(135, '#a5f3fc', ICE.cyan, ICE.electric), {
    name: 'Glowing tile',
    cornerRadius: 56,
    ...shadow(90, 0, 'rgba(34,211,238,0.85)'),
  }),
  icon('sparkles', 465, 365, 150, ICE.white, { strokeWidth: 1.8 }),
  text('The rise of', 0, 720, W, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 400,
    fill: ICE.white,
    align: 'center',
  }),
  text('Autopilot', 0, 810, W, {
    fontFamily: HEAD,
    fontSize: 124,
    fontWeight: 800,
    fill: ICE.cyan,
    align: 'center',
  }),
  button('Learn More', 250, 1020, 270, false),
  button('Book a Demo', 560, 1020, 270, true),
  brandMark(0, 1240, W, ICE.white),
]);

const ORBS: readonly (readonly [number, number])[] = [
  [170, 300],
  [930, 250],
  [940, 900],
  [160, 1060],
];

export const topThree = template(W, H, () => [
  darkBg(H),
  [500, 380, 260].map((radius) =>
    circle(540, 700, radius, 'rgba(0,0,0,0)', {
      name: 'Ring',
      stroke: 'rgba(34,211,238,0.16)',
      strokeWidth: 3,
    }),
  ),
  ORBS.map(([cx, cy]) =>
    circle(cx, cy, 24, radial(ICE.white, ICE.cyan), {
      name: 'Orb',
      ...shadow(40, 0, 'rgba(34,211,238,0.9)'),
    }),
  ),
  text('Top 3', 0, 300, W, {
    fontFamily: HEAD,
    fontSize: 124,
    fontWeight: 800,
    fill: ICE.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('Pipelines', 0, 430, W, {
    fontFamily: HEAD,
    fontSize: 100,
    fontWeight: 700,
    fill: ICE.cyan,
    align: 'center',
    lineHeight: 1,
  }),
  ['Vision Models', 'Language Agents', 'Edge Inference'].map((label, index) => {
    const y = 640 + index * 120;
    return [
      rect(280, y, 520, 86, 'rgba(255,255,255,0.07)', {
        name: 'Row',
        cornerRadius: 22,
        stroke: 'rgba(255,255,255,0.5)',
        strokeWidth: 2,
      }),
      icon('arrow-up-right', 312, y + 23, 40, ICE.cyan, { strokeWidth: 2.4 }),
      text(label, 376, y + 24, 400, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: ICE.white,
      }),
    ];
  }),
  brandMark(0, 1240, W, ICE.white),
]);
