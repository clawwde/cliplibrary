import { linear, radial } from '@/design';
import { circle, icon, POST_SIZE, rect, text } from '../../../kit';

export const SUN = {
  coal: '#0c0c0f',
  graphite: '#24252b',
  sun: '#ffc93c',
  gold: '#f5a800',
  amber: '#b86e00',
  cream: '#fffaf0',
  butter: '#ffefc4',
  ink: '#1c1b1f',
  muted: '#5b5560',
  fog: '#c9c6cf',
  white: '#ffffff',
};

export const { width: W, height: H } = POST_SIZE;

export const SANS = 'Manrope';

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

export const creamBackground = () => [
  rect(0, 0, W, H, linear(180, SUN.cream, SUN.butter), { name: 'Background' }),
  circle(
    900,
    220,
    360,
    radial(
      'rgba(255,201,60,0.45)',
      'rgba(255,201,60,0.15)',
      'rgba(255,201,60,0)',
      'rgba(255,201,60,0)',
    ),
    { name: 'Soft glow' },
  ),
];

export const darkBackground = () => [
  rect(0, 0, W, H, linear(165, SUN.graphite, SUN.coal), { name: 'Background' }),
  circle(
    760,
    520,
    520,
    radial(
      'rgba(255,201,60,0.22)',
      'rgba(255,201,60,0.06)',
      'rgba(255,201,60,0)',
      'rgba(255,201,60,0)',
    ),
    { name: 'Glow' },
  ),
];

export const glowNumber = (
  value: string,
  x: number,
  y: number,
  width: number,
  size: number,
  align: 'left' | 'center' | 'right',
) =>
  text(value, x, y, width, {
    fontFamily: SANS,
    fontSize: size,
    fontWeight: 800,
    fill: linear(180, '#ffe39a', SUN.gold),
    align,
    lineHeight: 1,
    shadow: { color: 'rgba(255,201,60,0.55)', blur: 60, offsetX: 0, offsetY: 0 },
  });

export const swipeArrow = (color: string) =>
  icon('move-right', 900, 1190, 90, color, { strokeWidth: 1.6 });
