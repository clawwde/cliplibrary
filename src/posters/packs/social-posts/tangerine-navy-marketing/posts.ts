import { linear } from '@/design';
import {
  circle,
  icon,
  POST_SIZE,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const TAN = {
  navy: '#0f1b3d',
  ink: '#0a1128',
  tangerine: '#ff7a1a',
  peach: '#ffb27a',
  cream: '#fff4e8',
  paper: '#fbf7f2',
  white: '#ffffff',
  slate: '#55607a',
};

export const HEAD = 'Urbanist';
export const BODY = 'Work Sans';
export const { width: W, height: H } = POST_SIZE;

export const hashtag = (y: number, color: string = TAN.navy) =>
  text('#BuildBoldly', 0, y, W, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 800,
    fill: color,
    align: 'center',
  });

type Point = readonly [number, number];

const cut = (a: Point, b: Point, axis: 0 | 1, limit: number): Point => {
  const t = (limit - a[axis]) / (b[axis] - a[axis]);
  return axis === 0 ? [limit, a[1] + t * (b[1] - a[1])] : [a[0] + t * (b[0] - a[0]), limit];
};

const clipToCanvas = (points: readonly Point[]): Point[] => {
  const edges: readonly { axis: 0 | 1; limit: number; keep: (value: number) => boolean }[] = [
    { axis: 0, limit: 0, keep: (value) => value >= 0 },
    { axis: 0, limit: W, keep: (value) => value <= W },
    { axis: 1, limit: 0, keep: (value) => value >= 0 },
    { axis: 1, limit: H, keep: (value) => value <= H },
  ];
  return edges.reduce<Point[]>(
    (input, edge) =>
      input.flatMap((current, index) => {
        const previous = input[(index + input.length - 1) % input.length] ?? current;
        const currentIn = edge.keep(current[edge.axis]);
        const previousIn = edge.keep(previous[edge.axis]);
        if (currentIn) {
          return previousIn ? [current] : [cut(previous, current, edge.axis, edge.limit), current];
        }
        return previousIn ? [cut(previous, current, edge.axis, edge.limit)] : [];
      }),
    [...points],
  );
};

const tape = (
  label: string,
  cx: number,
  cy: number,
  degrees: number,
  fill: string,
  color: string,
  shift = 0,
) => {
  const radians = (degrees * Math.PI) / 180;
  const dx = Math.cos(radians);
  const dy = Math.sin(radians);
  const half = 1600;
  const thick = 50;
  const corners: Point[] = [
    [cx - dx * half - dy * thick, cy - dy * half + dx * thick],
    [cx + dx * half - dy * thick, cy + dy * half + dx * thick],
    [cx + dx * half + dy * thick, cy + dy * half - dx * thick],
    [cx - dx * half + dy * thick, cy - dy * half - dx * thick],
  ];
  return [
    poly(clipToCanvas(corners), fill, { name: 'Tape', ...shadow(20, 6, 'rgba(10,17,40,0.25)') }),
    rotateNodes(degrees, cx + dx * shift, cy + dy * shift, [
      text(label, cx + dx * shift - 300, cy + dy * shift - 27, 600, {
        fontFamily: BODY,
        fontSize: 44,
        fontWeight: 500,
        fill: color,
        align: 'center',
        lineHeight: 1.2,
      }),
    ]),
  ];
};

export const brandTraps = template(W, H, () => [
  rect(0, 0, W, H, linear(160, TAN.peach, TAN.tangerine, '#e85d04'), { name: 'Background' }),
  tape('No Clear Offer', 260, 640, -66, TAN.ink, TAN.white, -360),
  tape('Mixed Messaging', 520, 300, 32, TAN.navy, TAN.white),
  tape('Bland Visuals', 520, 560, -18, TAN.cream, TAN.navy),
  tape('Slow Replies', 600, 800, 10, TAN.white, TAN.navy, 100),
  text('Brand Traps', 380, 1010, 620, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: TAN.white,
    align: 'right',
    lineHeight: 1,
  }),
  text('to Dodge', 380, 1110, 620, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: TAN.navy,
    align: 'right',
    lineHeight: 1,
  }),
]);

export const insightImagination = template(W, H, () => [
  rect(0, 0, W, H, linear(180, TAN.peach, TAN.tangerine), { name: 'Background' }),
  circle(540, 450, 280, TAN.navy, { name: 'Top circle', ...shadow(40, 16, 'rgba(10,17,40,0.3)') }),
  circle(540, 890, 280, TAN.cream, {
    name: 'Bottom circle',
    ...shadow(40, 16, 'rgba(10,17,40,0.25)'),
  }),
  text('Insight', 0, 330, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: TAN.white,
    align: 'center',
  }),
  text('Imagination', 0, 900, W, {
    fontFamily: HEAD,
    fontSize: 68,
    fontWeight: 800,
    fill: TAN.navy,
    align: 'center',
  }),
  circle(540, 660, 52, TAN.tangerine, { name: 'Bolt badge', stroke: TAN.cream, strokeWidth: 6 }),
  icon('zap', 510, 630, 60, TAN.white, { strokeWidth: 2.4 }),
  hashtag(1235, TAN.navy),
]);
