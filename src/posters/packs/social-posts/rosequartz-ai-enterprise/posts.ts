import { linear, radial } from '@/design';
import {
  circle,
  ellipse,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  pill,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const ROSE = {
  night: '#12050e',
  plum: '#2c0c24',
  wine: '#4a1238',
  magenta: '#d6246e',
  pink: '#ff6fa8',
  blush: '#ffd3e6',
  paper: '#fff7fb',
  ink: '#1c0a16',
  muted: '#5b4352',
  white: '#ffffff',
};

export const HEAD = 'Sora';
export const BODY = 'Inter';
export const { width: W, height: H } = POST_SIZE;

export const brandMark = (
  x: number,
  y: number,
  width: number,
  color: string,
  align: 'left' | 'center' | 'right' = 'left',
) =>
  text('NOVAFIELD LABS', x, y, width, {
    fontFamily: HEAD,
    fontSize: 26,
    fontWeight: 700,
    fill: color,
    align,
    letterSpacing: 3,
  });

export const darkBackdrop = (height: number): Nodes[] => [
  rect(0, 0, W, height, linear(180, ROSE.wine, ROSE.night, ROSE.night), { name: 'Background' }),
  ellipse(
    90,
    0,
    900,
    620,
    radial(
      'rgba(255,111,168,0.34)',
      'rgba(255,111,168,0.1)',
      'rgba(255,111,168,0)',
      'rgba(255,111,168,0)',
    ),
    { name: 'Top glow' },
  ),
];

export const promptPipelines = template(W, H, () => [
  rect(0, 0, W, H, linear(180, ROSE.paper, ROSE.blush, '#f59bc2'), { name: 'Background' }),
  brandMark(0, 90, W, ROSE.ink, 'center'),
  text('Smarter', 90, 210, 900, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 400,
    fill: ROSE.ink,
    lineHeight: 1,
  }),
  text('AI Agent', 90, 330, 900, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 700,
    fill: ROSE.magenta,
    lineHeight: 1,
  }),
  text('Pipelines', 90, 450, 900, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 400,
    fill: ROSE.ink,
    lineHeight: 1,
  }),
  rotateNodes(
    -8,
    300,
    700,
    pill('Ask Agent', 170, 660, {
      fill: linear(90, ROSE.pink, ROSE.magenta),
      color: ROSE.white,
      fontSize: 34,
      fontFamily: HEAD,
    }),
  ),
  rotateNodes(
    9,
    720,
    660,
    pill('Start Run', 590, 620, {
      fill: linear(90, ROSE.pink, ROSE.magenta),
      color: ROSE.white,
      fontSize: 34,
      fontFamily: HEAD,
    }),
  ),
  text('Optimize', 0, 880, W, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 800,
    fill: 'rgba(255,255,255,0.9)',
    align: 'center',
    lineHeight: 1,
  }),
  text('Optimize', 0, 1090, W, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 800,
    fill: 'rgba(255,255,255,0.4)',
    align: 'center',
    lineHeight: 1,
  }),
]);

export const engineeredToScale = template(W, H, () => [
  darkBackdrop(H),
  brandMark(80, 90, 600, ROSE.white),
  text('Engineered', 80, 360, 920, {
    fontFamily: HEAD,
    fontSize: 118,
    fontWeight: 700,
    fill: 'rgba(255,255,255,0.42)',
    lineHeight: 1,
  }),
  text('to Scale', 80, 500, 920, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 800,
    fill: ROSE.white,
    lineHeight: 1,
    ...shadow(40, 0, 'rgba(255,111,168,0.85)'),
  }),
  rect(538, 760, 4, 440, linear(180, ROSE.pink, 'rgba(255,111,168,0)'), { name: 'Beam' }),
  circle(540, 760, 18, ROSE.white, { ...shadow(40, 0, ROSE.pink) }),
  group(
    rect(880, 1150, 110, 110, linear(135, ROSE.pink, ROSE.magenta), {
      name: 'Arrow tile',
      cornerRadius: 26,
      ...shadow(36, 0, 'rgba(255,111,168,0.7)'),
    }),
    icon('arrow-up-right', 905, 1175, 60, ROSE.white, { strokeWidth: 2.4 }),
  ),
]);

const tile = (
  x: number,
  y: number,
  size: number,
  degrees: number,
  name: 'mic-vocal' | 'search' | 'rocket',
) =>
  rotateNodes(degrees, x + size / 2, y + size / 2, [
    rect(x, y, size, size, linear(160, '#ff9cc4', ROSE.magenta), {
      name: 'Feature tile',
      cornerRadius: 54,
      ...shadow(40, 18, 'rgba(120,10,60,0.3)'),
    }),
    icon(name, x + size * 0.25, y + size * 0.25, size * 0.5, 'rgba(255,255,255,0.92)', {
      strokeWidth: 1.6,
    }),
  ]);

export const shipPlaybooks = template(W, H, () => [
  rect(0, 0, W, H, linear(180, ROSE.paper, '#ffe0ee', '#ffc4dc'), { name: 'Background' }),
  brandMark(0, 90, W, ROSE.ink, 'center'),
  text('Ship', 0, 200, W, {
    fontFamily: HEAD,
    fontSize: 140,
    fontWeight: 800,
    fill: ROSE.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('Playbooks', 0, 350, W, {
    fontFamily: HEAD,
    fontSize: 132,
    fontWeight: 700,
    fill: ROSE.magenta,
    align: 'center',
    lineHeight: 1,
  }),
  pill('3x Quicker', 420, 540, {
    fill: ROSE.ink,
    color: ROSE.white,
    fontSize: 32,
    fontFamily: HEAD,
    width: 240,
  }),
  tile(50, 860, 320, -10, 'mic-vocal'),
  tile(380, 800, 320, 0, 'search'),
  tile(710, 860, 320, 10, 'rocket'),
]);

export const standApart = template(W, H, () => [
  rect(0, 0, W, H, linear(180, ROSE.wine, ROSE.night), { name: 'Background' }),
  ellipse(
    160,
    380,
    760,
    760,
    radial(
      'rgba(255,111,168,0.5)',
      'rgba(255,111,168,0.14)',
      'rgba(255,111,168,0)',
      'rgba(255,111,168,0)',
    ),
    {
      name: 'Glow',
    },
  ),
  [
    [900, 200, 110],
    [150, 560, 70],
    [890, 1010, 80],
    [240, 1150, 56],
  ].map(([cx = 0, cy = 0, r = 0]) =>
    circle(cx, cy, r, 'rgba(0,0,0,0)', {
      name: 'Ring',
      stroke: 'rgba(255,255,255,0.4)',
      strokeWidth: 3,
    }),
  ),
  text('Stand apart.', 0, 380, W, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 700,
    fill: ROSE.white,
    align: 'center',
  }),
  circle(540, 760, 120, radial(ROSE.white, '#ffd0e4', ROSE.pink), {
    name: 'Orb',
    ...shadow(90, 0, 'rgba(255,111,168,0.9)'),
  }),
  brandMark(0, 1210, W, ROSE.white, 'center'),
]);
