import { type Fill, linear, radial } from '@/design';
import {
  avatar,
  circle,
  ellipse,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  pill,
  poly,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const VIO = {
  night: '#07040f',
  ink: '#110b22',
  plum: '#1d1238',
  violet: '#8b5cf6',
  bright: '#a78bfa',
  lilac: '#ddd6fe',
  white: '#ffffff',
  muted: 'rgba(255,255,255,0.7)',
};

export const HEAD = 'Plus Jakarta Sans';
export const BODY = 'Manrope';
export const { width: W, height: H } = POST_SIZE;

export const brandMark = (
  x: number,
  y: number,
  width: number,
  color: string = VIO.white,
  align: 'left' | 'center' | 'right' = 'center',
) =>
  text('LUMEN STACK', x, y, width, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 800,
    fill: color,
    align,
    letterSpacing: 3,
  });

export const violetGlow = (x: number, y: number, width: number, height: number, alpha = 0.4) =>
  ellipse(
    x,
    y,
    width,
    height,
    radial(
      `rgba(139,92,246,${alpha})`,
      `rgba(139,92,246,${alpha * 0.3})`,
      'rgba(139,92,246,0)',
      'rgba(139,92,246,0)',
    ),
    { name: 'Glow' },
  );

export const darkBg = (height: number): Nodes[] => [
  rect(0, 0, W, height, linear(180, VIO.plum, VIO.night, VIO.night), { name: 'Background' }),
];

export const button = (label: string, x: number, y: number, width: number, filled: boolean) => [
  rect(x, y, width, 70, filled ? linear(90, VIO.bright, VIO.violet) : 'rgba(255,255,255,0.03)', {
    name: `${label} button`,
    cornerRadius: 35,
    stroke: VIO.bright,
    strokeWidth: filled ? 0 : 2,
  }),
  text(label, x, y + 20, width, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 700,
    fill: VIO.white,
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

export const crewPower = template(W, H, () => [
  darkBg(H),
  violetGlow(240, 300, 600, 500),
  brandMark(0, 90, W),
  avatar('woman-portrait-1', 300, 470, 95, VIO.white),
  avatar('man-portrait-2', 470, 470, 95, VIO.white),
  avatar('woman-portrait-5', 640, 470, 95, VIO.white),
  circle(810, 470, 95, linear(135, VIO.bright, VIO.violet), {
    name: 'Plus badge',
    ...shadow(60, 0, 'rgba(139,92,246,0.9)'),
  }),
  icon('plus', 760, 420, 100, VIO.white, { strokeWidth: 2.6 }),
  text('Software made to', 0, 680, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 600,
    fill: VIO.white,
    align: 'center',
  }),
  text('lift your crew', 0, 780, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: VIO.bright,
    align: 'center',
  }),
  pill('Join 8,000+ growing teams', 290, 960, {
    fill: linear(90, VIO.bright, VIO.violet),
    color: VIO.white,
    fontSize: 30,
    fontFamily: BODY,
    fontWeight: 700,
    width: 500,
  }),
]);

export const campaignRoi = template(W, H, () => [
  darkBg(H),
  brandMark(0, 90, W),
  text('Elevate Your', 0, 220, W, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 500,
    fill: VIO.white,
    align: 'center',
  }),
  text('Campaign ROI', 0, 320, W, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: VIO.bright,
    align: 'center',
  }),
  text('Unlock 3x more conversions', 0, 460, W, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 600,
    fill: VIO.muted,
    align: 'center',
  }),
  path(
    'M 0 1180 C 180 1180 260 900 380 960 S 520 1180 640 1020 S 820 700 1080 640',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { name: 'Growth curve', stroke: 'rgba(255,255,255,0.8)', strokeWidth: 4 },
  ),
  violetGlow(540, 920, 200, 200, 0.7),
  circle(640, 1020, 26, VIO.lilac, { name: 'Point', ...shadow(50, 0, VIO.violet) }),
]);

const cursor = (x: number, y: number, size: number, fill: Fill) =>
  poly(
    [
      [x, y],
      [x + size, y + size * 0.42],
      [x + size * 0.48, y + size * 0.52],
      [x + size * 0.42, y + size],
    ],
    fill,
    { name: 'Cursor' },
  );

export const pickDirection = template(W, H, () => [
  darkBg(H),
  brandMark(0, 90, W),
  text('Pick your direction', 0, 220, W, {
    fontFamily: HEAD,
    fontSize: 80,
    fontWeight: 600,
    fill: VIO.white,
    align: 'center',
  }),
  text('Shape your journey with\nflexible, scalable tools', 0, 340, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: VIO.muted,
    align: 'center',
    lineHeight: 1.4,
  }),
  Array.from({ length: 12 }, (_, index) => {
    const column = index % 4;
    const row = Math.floor(index / 4);
    const alpha = 0.95 - (column + row) * 0.13;
    return cursor(70 + column * 150, 740 + row * 170, 110, `rgba(255,255,255,${alpha.toFixed(2)})`);
  }),
  path(
    'M 760 1060 C 760 900 820 820 930 760',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { name: 'Dashed path', stroke: VIO.bright, strokeWidth: 5, dashed: true },
  ),
  poly(
    [
      [1010, 700],
      [960, 820],
      [890, 730],
    ],
    VIO.bright,
    { name: 'Arrow head', ...shadow(40, 0, 'rgba(139,92,246,0.9)') },
  ),
]);
