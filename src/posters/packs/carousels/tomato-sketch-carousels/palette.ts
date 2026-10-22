import { linear } from '@/design';
import { line, POST_SIZE, rect, text } from '../../../kit';

export const TOMATO = {
  red: '#e4572e',
  deep: '#b63a1b',
  blush: '#ffd9cc',
  paper: '#f7f5f1',
  sketch: 'rgba(20,20,20,0.32)',
  ink: '#141414',
  note: '#f3f1ec',
  muted: '#55524d',
  white: '#ffffff',
};

export const { width: W, height: H } = POST_SIZE;

export const SANS = 'Space Grotesk';
export const MARKER = 'Permanent Marker';

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

export const estimateWidth = (content: string, size: number) => content.length * size * 0.56;

export const boxed = (
  label: string,
  x: number,
  y: number,
  size: number,
  fill: string,
  color: string,
) => {
  const width = estimateWidth(label, size) + size * 0.5;
  return [
    rect(x, y, width, size * 1.25, fill, { name: `${label} box`, cornerRadius: size * 0.12 }),
    say(label, x, y + size * 0.06, width, size, color, 700, { align: 'center', lineHeight: 1.1 }),
  ];
};

export const paperBackground = () => [
  rect(0, 0, W, H, linear(160, '#fbfaf8', TOMATO.paper), { name: 'Paper' }),
  line(0, 300, W, TOMATO.sketch, 2, { name: 'Sketch line', rotation: -2 }),
  line(0, 1080, W, TOMATO.sketch, 2, { name: 'Sketch line', rotation: 1.5 }),
  line(150, 0, H, TOMATO.sketch, 2, { name: 'Sketch line', rotation: 91 }),
  line(930, 0, H, TOMATO.sketch, 2, { name: 'Sketch line', rotation: 89 }),
];

export const arrowPill = (x: number, y: number, color: string) => [
  rect(x, y, 200, 76, 'rgba(0,0,0,0)', {
    name: 'Arrow pill',
    cornerRadius: 38,
    stroke: color,
    strokeWidth: 3,
  }),
  line(x + 50, y + 38, 100, color, 4, { name: 'Arrow', arrowEnd: true }),
];
