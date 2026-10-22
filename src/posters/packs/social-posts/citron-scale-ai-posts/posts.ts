import { type Fill, linear, radial } from '@/design';
import {
  circle,
  ellipse,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const CITRON = {
  night: '#0a0b07',
  coal: '#16180f',
  olive: '#23271a',
  lime: '#a3e635',
  bright: '#d9f99d',
  deep: '#65a30d',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.68)',
};

export const HEAD = 'Lexend';
export const BODY = 'Figtree';
export const { width: W, height: H } = POST_SIZE;

export const brandMark = (y: number, color: string = CITRON.white) =>
  text('KESTREL AI', 0, y, W, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: color,
    align: 'center',
    letterSpacing: 4,
  });

export const limeGlow = (x: number, y: number, width: number, height: number, alpha = 0.35) =>
  ellipse(
    x,
    y,
    width,
    height,
    radial(
      `rgba(163,230,53,${alpha})`,
      `rgba(163,230,53,${alpha * 0.3})`,
      'rgba(163,230,53,0)',
      'rgba(163,230,53,0)',
    ),
    { name: 'Glow' },
  );

export const darkBg = (height: number): Nodes[] => [
  rect(0, 0, W, height, linear(180, '#1b1e13', CITRON.night, CITRON.night), {
    name: 'Background',
  }),
];

export const button = (label: string, x: number, y: number, width: number, filled: boolean) => [
  rect(x, y, width, 70, filled ? linear(90, CITRON.bright, CITRON.lime) : 'rgba(0,0,0,0)', {
    name: `${label} button`,
    cornerRadius: 35,
    stroke: CITRON.lime,
    strokeWidth: filled ? 0 : 2,
  }),
  text(label, x, y + 20, width, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 700,
    fill: filled ? CITRON.night : CITRON.white,
    align: 'center',
  }),
];

export const ringArc = (
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  start: number,
  end: number,
  fill: Fill,
) => {
  const point = (radius: number, degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return `${(cx + radius * Math.cos(radians)).toFixed(1)} ${(cy + radius * Math.sin(radians)).toFixed(1)}`;
  };
  const large = end - start > 180 ? 1 : 0;
  const data = [
    `M ${point(outer, start)}`,
    `A ${outer} ${outer} 0 ${large} 1 ${point(outer, end)}`,
    `L ${point(inner, end)}`,
    `A ${inner} ${inner} 0 ${large} 0 ${point(inner, start)}`,
    'Z',
  ].join(' ');
  return path(data, 0, 0, W, H, fill, { width: W, height: H }, { name: 'Arc' });
};

export const levelUp = template(W, H, () => [
  darkBg(H),
  [
    [110, 170],
    [970, 170],
    [110, 1110],
    [970, 1110],
  ].map(([cx = 0, cy = 0]) => circle(cx, cy, 9, CITRON.lime, { name: 'Dot' })),
  circle(540, 640, 400, linear(160, CITRON.bright, CITRON.lime, CITRON.deep), {
    name: 'Sun',
    ...shadow(90, 0, 'rgba(163,230,53,0.55)'),
  }),
  text('The Power of', 0, 330, W, {
    fontFamily: HEAD,
    fontSize: 44,
    fontWeight: 600,
    fill: CITRON.night,
    align: 'center',
  }),
  text('LEVEL', 0, 400, W, {
    fontFamily: HEAD,
    fontSize: 220,
    fontWeight: 800,
    fill: CITRON.night,
    align: 'center',
    lineHeight: 1,
  }),
  text('UP', 0, 620, W, {
    fontFamily: HEAD,
    fontSize: 220,
    fontWeight: 800,
    fill: CITRON.night,
    align: 'center',
    lineHeight: 1,
  }),
  icon('sparkles', 360, 880, 52, CITRON.night, { strokeWidth: 2.2 }),
  text('through smarter\nsystems', 428, 872, 320, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 700,
    fill: CITRON.night,
    lineHeight: 1.2,
  }),
  brandMark(1240),
]);

export const counterGrow = template(W, H, () => [
  darkBg(H),
  limeGlow(240, 380, 600, 500, 0.25),
  rect(110, 170, 150, 150, linear(135, CITRON.bright, CITRON.lime), {
    name: 'Icon tile',
    cornerRadius: 34,
    ...shadow(60, 0, 'rgba(163,230,53,0.6)'),
  }),
  icon('sparkles', 145, 205, 80, CITRON.night, { strokeWidth: 2 }),
  text('Grow faster with', 300, 190, 720, {
    fontFamily: BODY,
    fontSize: 46,
    fontWeight: 400,
    fill: CITRON.white,
  }),
  text('your AI copilot', 300, 248, 720, {
    fontFamily: BODY,
    fontSize: 46,
    fontWeight: 800,
    fill: CITRON.white,
  }),
  text('06', 30, 560, 280, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 700,
    fill: 'rgba(255,255,255,0.2)',
    lineHeight: 1,
  }),
  text('08', 770, 560, 280, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 700,
    fill: 'rgba(255,255,255,0.2)',
    align: 'right',
    lineHeight: 1,
  }),
  text('07', 0, 500, W, {
    fontFamily: HEAD,
    fontSize: 300,
    fontWeight: 800,
    fill: CITRON.white,
    align: 'center',
    lineHeight: 1,
  }),
  [-3, -2, -1, 1, 2, 3].map((step) =>
    rotateNodes(step * 9, 540, 1500, [
      rect(535, 920, 10, 150, 'rgba(255,255,255,0.55)', { name: 'Tick', cornerRadius: 5 }),
    ]),
  ),
  rect(533, 900, 14, 230, linear(180, CITRON.bright, CITRON.lime), {
    name: 'Active tick',
    cornerRadius: 7,
    ...shadow(30, 0, CITRON.lime),
  }),
  circle(540, 1130, 22, CITRON.lime, { name: 'Pivot', ...shadow(40, 0, CITRON.lime) }),
  brandMark(1250),
]);

export const versionLive = template(W, H, () => [
  darkBg(H),
  limeGlow(240, 100, 600, 700, 0.3),
  rect(290, 400, 500, 320, '#2a2e20', { name: 'Envelope back', cornerRadius: 26 }),
  rect(345, 270, 390, 300, linear(180, CITRON.bright, CITRON.lime), {
    name: 'Card',
    cornerRadius: 22,
    ...shadow(70, 0, 'rgba(163,230,53,0.7)'),
  }),
  icon('sparkles', 480, 330, 120, CITRON.night, { strokeWidth: 1.8 }),
  poly(
    [
      [290, 480],
      [540, 640],
      [790, 480],
      [790, 694],
      [764, 720],
      [316, 720],
      [290, 694],
    ],
    linear(180, '#3d4330', '#1f2217'),
    { name: 'Envelope front' },
  ),
  text('Version 4.0', 0, 790, W, {
    fontFamily: HEAD,
    fontSize: 88,
    fontWeight: 800,
    fill: CITRON.lime,
    align: 'center',
  }),
  text('is live now!', 0, 895, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 500,
    fill: CITRON.white,
    align: 'center',
  }),
  button('Changelog', 250, 1050, 270, false),
  button('Update Now', 560, 1050, 270, true),
  brandMark(1250),
]);
