import { linear } from '@/design';
import { circle, group, icon, POST_SIZE, path, rect, shadow, template, text } from '../../../kit';
import { CRIMSON, deepBackdrop, HEAD, tag } from './posts';

const { width: W, height: H } = POST_SIZE;

interface InteractPalette {
  top: string;
  bottom: string;
  label: string;
  labelText: string;
  word: string;
  wordText: string;
  copy: string;
}

const CRIMSON_INTERACT: InteractPalette = {
  top: CRIMSON.wine,
  bottom: CRIMSON.deep,
  label: CRIMSON.white,
  labelText: CRIMSON.ink,
  word: CRIMSON.red,
  wordText: CRIMSON.white,
  copy: CRIMSON.blush,
};

export const AMBER_INTERACT: InteractPalette = {
  top: '#ffd85c',
  bottom: '#f5b800',
  label: '#ffffff',
  labelText: '#1a1300',
  word: '#1a1300',
  wordText: '#ffd85c',
  copy: '#1a1300',
};

export const interact = (palette: InteractPalette, lines: readonly [string, string, string]) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, palette.top, palette.bottom), { name: 'Background' }),
    tag(lines[0], 90, 140, 44, { fill: palette.label, color: palette.labelText, width: 470 }),
    tag(lines[1], 90, 240, 130, { fill: palette.word, color: palette.wordText, width: 820 }),
    text(lines[2], 90, 450, 900, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 500,
      fill: palette.copy,
    }),
    icon('handshake', 190, 620, 700, palette.copy, { strokeWidth: 1.1 }),
  ]);

export const INTERACT_POST = interact(CRIMSON_INTERACT, [
  "It's vital to",
  'Engage',
  'with every customer',
]);

const wedge = (cx: number, cy: number, radius: number, start: number, end: number) => {
  const point = (angle: number) => {
    const radians = ((angle - 90) * Math.PI) / 180;
    return `${(cx + radius * Math.cos(radians)).toFixed(1)} ${(cy + radius * Math.sin(radians)).toFixed(1)}`;
  };
  const large = end - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${point(start)} A ${radius} ${radius} 0 ${large} 1 ${point(end)} Z`;
};

const SLICES = [
  { label: 'Sales', value: 54.2, fill: CRIMSON.wine, x: 650, y: 760 },
  { label: 'Finance', value: 28.6, fill: CRIMSON.red, x: 250, y: 820 },
  { label: 'Marketing', value: 17.2, fill: CRIMSON.bright, x: 330, y: 560 },
] as const;

export const departmentsPie = template(W, H, () => {
  let angle = 0;
  return [
    rect(0, 0, W, H, linear(180, CRIMSON.white, CRIMSON.blush), { name: 'Background' }),
    text('Teams', 0, 110, W, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 500,
      fill: CRIMSON.ink,
      align: 'center',
    }),
    text('by the numbers', 0, 210, W, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 700,
      fill: CRIMSON.red,
      align: 'center',
    }),
    SLICES.map((slice) => {
      const start = angle;
      angle += (slice.value / 100) * 360;
      return group(
        path(
          wedge(540, 780, 380, start, angle),
          0,
          0,
          W,
          H,
          slice.fill,
          { width: W, height: H },
          {
            name: `${slice.label} slice`,
            stroke: CRIMSON.white,
            strokeWidth: 6,
          },
        ),
        text(`${slice.value}%`, slice.x, slice.y, 220, {
          fontFamily: HEAD,
          fontSize: 54,
          fontWeight: 700,
          fill: CRIMSON.white,
          align: 'center',
        }),
        text(slice.label, slice.x, slice.y + 66, 220, {
          fontFamily: HEAD,
          fontSize: 30,
          fontWeight: 500,
          fill: CRIMSON.blush,
          align: 'center',
        }),
      );
    }),
  ];
});

const STEPS = [
  { label: 'Identify', icon: 'arrow-down', x: 300, side: 'right' },
  { label: 'Evaluate', icon: 'arrow-down', x: 180, side: 'left' },
  { label: 'Compare', icon: 'arrow-right', x: 320, side: 'right' },
  { label: 'Decide', icon: 'arrow-left', x: 480, side: 'left' },
  { label: 'Succeed', icon: 'arrow-down', x: 230, side: 'right' },
] as const;

export const decisionSteps = template(W, H, () => [
  deepBackdrop(),
  text('Five steps to a smarter call', 0, 110, W, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 600,
    fill: CRIMSON.blush,
    align: 'center',
  }),
  STEPS.map((step, index) => {
    const y = 270 + index * 190;
    const width = step.label.length * 44 + 80;
    const filled = index % 2 === 1;
    const iconX = step.side === 'right' ? step.x + width + 24 : step.x - 124;
    return group(
      rect(step.x, y, width, 130, filled ? CRIMSON.red : CRIMSON.white, {
        cornerRadius: 22,
        name: `${step.label} step`,
        ...shadow(24, 10, 'rgba(0,0,0,0.35)'),
      }),
      text(step.label, step.x, y + 28, width, {
        fontFamily: HEAD,
        fontSize: 64,
        fontWeight: 700,
        fill: filled ? CRIMSON.white : CRIMSON.ink,
        align: 'center',
      }),
      circle(iconX + 50, y + 65, 50, filled ? CRIMSON.white : CRIMSON.red),
      icon(step.icon, iconX + 18, y + 33, 64, filled ? CRIMSON.red : CRIMSON.white, {
        strokeWidth: 2.6,
      }),
    );
  }),
]);

export const hiring = template(W, H, () => [
  rect(0, 0, W, H, linear(180, CRIMSON.white, CRIMSON.blush), { name: 'Background' }),
  tag('We are', 90, 150, 56, { fill: CRIMSON.ink, width: 300 }),
  text('Apply today', 420, 162, 400, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 500,
    fill: CRIMSON.ink,
  }),
  tag('HIRING', 90, 270, 170, { width: 900 }),
  circle(540, 860, 290, CRIMSON.red, {
    name: 'Seat circle',
    ...shadow(40, 16, 'rgba(92,8,22,0.3)'),
  }),
  icon('armchair', 340, 660, 400, CRIMSON.white, { strokeWidth: 1.4 }),
  text('Senior Brand Strategist  ·  Remote friendly', 0, 1200, W, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 500,
    fill: CRIMSON.grey,
    align: 'center',
  }),
]);
