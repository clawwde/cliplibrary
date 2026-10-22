import { linear } from '@/design';
import { icon, POST_SIZE, rect, text } from '../../../kit';

export const MULBERRY = {
  deep: '#2b0716',
  wine: '#5c1233',
  berry: '#7a1d44',
  peach: '#ffb38a',
  blush: '#ffe1d3',
  cream: '#fff6f0',
  white: '#ffffff',
  ink: '#2a1019',
};

export const { width: W, height: H } = POST_SIZE;

export const CONDENSED = 'Barlow Condensed';
export const SCRIPT = 'Caveat';
export const SANS = 'Outfit';

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
    lineHeight: 1.3,
    ...extra,
  });

export const backdrop = () =>
  rect(0, 0, W, H, linear(180, MULBERRY.berry, MULBERRY.deep), { name: 'Background' });

export const nextArrow = (color: string = MULBERRY.white) =>
  icon('arrow-right', 900, 1180, 96, color, { strokeWidth: 1.6 });
