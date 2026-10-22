import { linear, radial } from '@/design';
import { circle, POST_SIZE, rect, text } from '../../../kit';

export const NEON = {
  black: '#07040d',
  night: '#140b24',
  plum: '#2a1748',
  pink: '#ff5fa2',
  rose: '#ffb3d1',
  lilac: '#e6d9ff',
  mist: '#f7f2ff',
  muted: '#c7bad9',
  ink: '#1a1027',
  white: '#ffffff',
};

export const { width: W, height: H } = POST_SIZE;

const SANS = 'Sora';

type TextStyle = NonNullable<Parameters<typeof text>[4]>;

export const say = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  weight = 400,
  extra: TextStyle = {},
) =>
  text(content, x, y, width, {
    fontFamily: SANS,
    fontSize: size,
    fontWeight: weight,
    fill,
    lineHeight: 1.25,
    ...extra,
  });

export const centered = (
  content: string,
  y: number,
  size: number,
  fill: string,
  weight = 400,
  extra: TextStyle = {},
) => say(content, 60, y, W - 120, size, fill, weight, { align: 'center', ...extra });

export const darkGlow = () => [
  rect(0, 0, W, H, linear(180, NEON.night, NEON.black), { name: 'Background' }),
  circle(
    W / 2,
    880,
    470,
    radial(
      'rgba(255,95,162,0.4)',
      'rgba(255,95,162,0.16)',
      'rgba(255,95,162,0)',
      'rgba(255,95,162,0)',
    ),
    { name: 'Glow' },
  ),
];

export const lightWash = () =>
  rect(0, 0, W, H, linear(180, NEON.white, NEON.lilac), { name: 'Background' });

export const site = (x: number, y: number, fill: string, align: 'left' | 'center' | 'right') =>
  say('loomwork.ai', x, y, 400, 30, fill, 500, { align });
