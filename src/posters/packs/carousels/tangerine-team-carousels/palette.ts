import { type Fill, linear } from '@/design';
import { icon, POST_SIZE, rect, text } from '../../../kit';

export const TANGERINE = {
  deep: '#06231f',
  forest: '#0b3a33',
  teal: '#145c50',
  orange: '#ff8a3d',
  apricot: '#ffc59e',
  sage: '#b7d3cb',
  cream: '#fff7ef',
  white: '#ffffff',
};

export const { width: W, height: H } = POST_SIZE;

export const SANS = 'Plus Jakarta Sans';

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

const grid = (color: string) => [
  Array.from({ length: 17 }, (_, index) =>
    rect(30 + index * 64, 0, 2, H, color, { name: 'Grid line' }),
  ),
  Array.from({ length: 21 }, (_, index) =>
    rect(0, 35 + index * 64, W, 2, color, { name: 'Grid line' }),
  ),
];

const background = (fill: Fill, lines?: string) => [
  rect(0, 0, W, H, fill, { name: 'Background' }),
  lines === undefined ? [] : grid(lines),
];

export const darkBackground = () =>
  background(linear(180, TANGERINE.forest, TANGERINE.deep), 'rgba(255,255,255,0.045)');

export const orangeBackground = () =>
  background(linear(180, '#ff9b55', '#ff7426'), 'rgba(255,255,255,0.13)');

export const lightBackground = () => background(linear(180, '#ffffff', '#ffdcc2'));

export const nextArrow = (color: string, x = 890, y = 1150) =>
  icon('arrow-right', x, y, 96, color, { strokeWidth: 1.8 });
