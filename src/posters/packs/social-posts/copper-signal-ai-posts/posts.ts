import { linear } from '@/design';
import {
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  pill,
  poly,
  polygon,
  rect,
  template,
  text,
} from '../../../kit';

export const COPPER = {
  black: '#110b07',
  panel: '#211710',
  copper: '#ff8a3d',
  burnt: '#7a3a12',
  amber: '#ffc07a',
  pale: '#ffeedd',
  grey: '#b8a291',
  white: '#ffffff',
  cream: '#fff7ef',
  ink: '#2a1a10',
  clear: 'rgba(255,138,61,0)',
};

export const HEAD = 'Urbanist';
export const BODY = 'DM Sans';

export const { width: W, height: H } = POST_SIZE;

export const copperText = linear(90, COPPER.copper, COPPER.amber);

export const brand = (y: number, color: string = COPPER.white) =>
  text('KILNWORKS AI', 0, y, W, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 800,
    fill: color,
    align: 'center',
    letterSpacing: 4,
  });

export const glow = (cx: number, cy: number, radius: number, strength = 0.4, height: number = H) =>
  circle(
    cx,
    cy,
    Math.min(radius, cx, W - cx, cy, height - cy),
    {
      type: 'radial',
      stops: [
        { offset: 0, color: `rgba(255,138,61,${strength})` },
        { offset: 0.7, color: COPPER.clear },
        { offset: 1, color: COPPER.clear },
      ],
    },
    { name: 'Glow' },
  );

const cursor = (x: number, y: number, scale: number, fill: string) =>
  poly(
    [
      [x, y],
      [x, y + 70 * scale],
      [x + 18 * scale, y + 54 * scale],
      [x + 32 * scale, y + 84 * scale],
      [x + 44 * scale, y + 78 * scale],
      [x + 30 * scale, y + 49 * scale],
      [x + 54 * scale, y + 49 * scale],
    ],
    fill,
    { name: 'Cursor' },
  );

export const centered = (
  content: string,
  y: number,
  size: number,
  weight: number,
  fill: string | ReturnType<typeof linear>,
) =>
  text(content, 0, y, W, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    align: 'center',
  });

const TOGGLES = [
  { label: '24/7\nSupport', x: 150, y: 480 },
  { label: 'Expert\nTeam', x: 490, y: 650 },
  { label: 'Clear\nReports', x: 150, y: 820 },
];

export const toggles = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#26180e', COPPER.black), { name: 'Background' }),
  glow(540, 760, 460, 0.32),
  centered('Designed to Deliver', 150, 64, 500, COPPER.white),
  centered('Real Outcomes', 230, 92, 800, copperText),
  TOGGLES.map((item) => [
    rect(item.x, item.y, 440, 130, linear(90, COPPER.burnt, COPPER.copper), {
      cornerRadius: 65,
      name: 'Toggle',
    }),
    circle(item.x + 375, item.y + 65, 50, COPPER.white, { name: 'Knob' }),
    text(item.label, item.x + 44, item.y + 26, 280, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 700,
      fill: COPPER.white,
      lineHeight: 1.15,
    }),
  ]),
  brand(1220),
]);

export const mistakes = template(W, H, () => [
  rect(0, 0, W, H, linear(180, COPPER.cream, '#ffdcc0'), { name: 'Background' }),
  glow(860, 1150, 300, 0.35),
  brand(90, COPPER.ink),
  pill('Bias', 250, 320, { fill: COPPER.ink, color: COPPER.white, fontSize: 26 }),
  pill('Overreliance', 640, 400, { fill: COPPER.ink, color: COPPER.white, fontSize: 26 }),
  centered('AI Mistakes', 470, 120, 800, copperText),
  centered("You Can't Afford", 610, 70, 500, COPPER.ink),
  text('Skip these traps and get better\nresults from every model you use.', 0, 720, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: '#6b5446',
    align: 'center',
    lineHeight: 1.4,
  }),
  pill('Data leaks', 200, 900, { fill: COPPER.ink, color: COPPER.white, fontSize: 26 }),
  cursor(600, 930, 1.3, COPPER.ink),
  rect(700, 1080, 260, 76, 'rgba(0,0,0,0)', {
    cornerRadius: 38,
    stroke: COPPER.ink,
    strokeWidth: 3,
    name: 'Button',
  }),
  text('Learn more', 700, 1100, 260, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 700,
    fill: COPPER.ink,
    align: 'center',
  }),
]);

const STATS: {
  icon: 'users' | 'clipboard-list' | 'gauge';
  label: string;
  value: string;
  unit: string;
}[] = [
  { icon: 'users', label: 'Active members', value: '2.4', unit: 'Million' },
  { icon: 'clipboard-list', label: 'Approval score', value: '98.7', unit: '' },
  { icon: 'gauge', label: 'Growth rate', value: '86%', unit: '' },
];

export const statRows = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#26180e', COPPER.black), { name: 'Background' }),
  glow(760, 640, 380, 0.3),
  STATS.map((item, index): Nodes[] => {
    const y = 170 + index * 320;
    return [
      polygon(6, 110, y, 200, 200, 'rgba(255,138,61,0.08)', {
        stroke: COPPER.copper,
        strokeWidth: 4,
        name: 'Hexagon',
      }),
      icon(item.icon, 160, y + 50, 100, COPPER.amber, { strokeWidth: 1.8 }),
      text(item.label, 360, y + 20, 600, {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 600,
        fill: COPPER.grey,
      }),
      text(item.value, 356, y + 64, 400, {
        fontFamily: HEAD,
        fontSize: 124,
        fontWeight: 800,
        fill: COPPER.white,
        lineHeight: 1,
      }),
      item.unit === ''
        ? []
        : text(item.unit, 548, y + 128, 300, {
            fontFamily: HEAD,
            fontSize: 48,
            fontWeight: 800,
            fill: copperText,
          }),
    ];
  }),
  brand(1220),
]);

export const quotePost = template(W, H, () => [
  rect(0, 0, W, H, linear(150, '#24170e', COPPER.black), { name: 'Background' }),
  Array.from({ length: 70 }, (_, index) => {
    const column = index % 10;
    const row = Math.floor(index / 10);
    return circle(
      620 + column * 44,
      80 + row * 44,
      3 + (column + row) * 0.35,
      'rgba(255,192,122,0.25)',
      {
        name: 'Dot',
      },
    );
  }),
  text('Stay inspired', 100, 300, 600, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: COPPER.grey,
  }),
  icon('quote', 250, 620, 150, COPPER.copper, { strokeWidth: 2.4, rotation: 180 }),
  text('Good AI hands\npeople back', 290, 480, 720, {
    fontFamily: HEAD,
    fontSize: 82,
    fontWeight: 600,
    fill: COPPER.white,
    lineHeight: 1.12,
  }),
  text('their time.', 290, 664, 720, {
    fontFamily: HEAD,
    fontSize: 82,
    fontWeight: 800,
    fill: copperText,
  }),
  rect(290, 820, 620, 3, 'rgba(255,255,255,0.3)', { name: 'Rule' }),
  text('Rhea Sandoval', 290, 850, 600, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 600,
    fill: COPPER.grey,
  }),
  brand(1220),
]);
