import { linear } from '@/design';
import {
  circle,
  ellipse,
  type Nodes,
  poly,
  rect,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { H, HEAD, type TipPalette, W } from './posts';

const person = (cx: number, baseY: number, size: number, color: string): Nodes[] => [
  rect(cx - size * 0.3, baseY - size * 0.62, size * 0.6, size * 0.62, color, {
    cornerRadius: size * 0.22,
    name: 'Person body',
  }),
  circle(cx, baseY - size * 0.82, size * 0.19, color),
];

const CROWD_ROWS = [
  { y: 600, size: 70, count: 12, span: 780 },
  { y: 680, size: 86, count: 10, span: 740 },
  { y: 775, size: 104, count: 8, span: 700 },
  { y: 885, size: 124, count: 6, span: 620 },
];

export const targeting = (p: TipPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.paper, { name: 'Background' }),
    star(5, 900, 80, 100, p.ink, { innerRatio: 0.45 }),
    text("You're", 110, 160, 600, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 500,
      fill: p.ink,
    }),
    text('TARGETING', 110, 226, 900, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: p.brand,
    }),
    ellipse(120, 880, 840, 70, 'rgba(0,0,0,0.07)', { name: 'Crowd shadow' }),
    CROWD_ROWS.map((row, rowIndex) => {
      const step = row.span / (row.count - 1);
      return Array.from({ length: row.count }, (_, index) =>
        person(
          540 - row.span / 2 + index * step + (((index + rowIndex) * 37) % 30) - 15,
          row.y,
          row.size,
          (index * 3 + rowIndex) % 7 === 0 ? p.brand : p.ink,
        ),
      );
    }),
    text('a massive', 520, 990, 500, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 500,
      fill: p.ink,
    }),
    text('MARKET.', 520, 1046, 520, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: p.brand,
    }),
  ]);

const jagged = (x: number, depth: number, flip: number): [number, number][] =>
  Array.from({ length: 19 }, (_, index) => [
    x + flip * (((index * 41) % depth) + 6),
    (index * H) / 18,
  ]);

export const turnSuccess = (p: TipPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    rect(690, 0, 250, H, linear(90, '#2c2d33', '#9a9ca6', '#3b3d45'), { name: 'Stone wall' }),
    poly([[690, 0], ...jagged(690, 34, 1), [690, H]], p.ink, { name: 'Wall edge' }),
    poly([[940, 0], ...jagged(940, 34, -1), [940, H]], p.ink, { name: 'Wall edge' }),
    [0, 1, 2, 3, 4, 5].map((index) =>
      rect(740 + ((index * 53) % 120), 120 + index * 200, 46, 22, 'rgba(0,0,0,0.28)', {
        cornerRadius: 6,
        rotation: (index * 31) % 50,
        name: 'Stone chip',
      }),
    ),
    circle(780, 560, 132, p.paper),
    circle(780, 560, 102, p.brand),
    circle(780, 560, 72, p.paper),
    circle(780, 560, 42, p.brand),
    circle(780, 560, 12, p.ink),
    [0, 1, 2].map((index) =>
      rect(130 + index * 30, 500 + index * 50, 130 - index * 30, 6, 'rgba(255,255,255,0.3)', {
        cornerRadius: 3,
        name: 'Motion line',
      }),
    ),
    rect(330, 552, 420, 16, '#e5e7eb', { cornerRadius: 8, name: 'Dart shaft' }),
    rect(560, 542, 130, 36, p.brand, { cornerRadius: 12, name: 'Dart barrel' }),
    poly(
      [
        [748, 550],
        [782, 560],
        [748, 570],
      ],
      '#d1d5db',
      { name: 'Dart tip' },
    ),
    poly(
      [
        [360, 560],
        [270, 490],
        [300, 560],
      ],
      p.brand,
      { name: 'Dart flight' },
    ),
    poly(
      [
        [360, 560],
        [270, 630],
        [300, 560],
      ],
      p.paper,
      { name: 'Dart flight' },
    ),
    text("WE'RE HERE TO", 80, 710, 560, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 800,
      fill: p.brand,
      letterSpacing: 2,
    }),
    text('TURN\nYOUR\nBUSINESS\nINTO\nA SUCCESS!', 80, 770, 580, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1.08,
    }),
    star(5, 70, 70, 84, p.brand, { innerRatio: 0.45 }),
    star(5, 440, 1210, 76, p.paper, { innerRatio: 0.45 }),
  ]);
