import { linear, radial } from '@/design';
import {
  avatar,
  circle,
  dots,
  icon,
  POST_SIZE,
  path,
  poly,
  rating,
  rect,
  rotateNodes,
  shadow,
  star,
  template,
  text,
} from '../../../kit';

export const MINT = {
  black: '#0c0d0d',
  coal: '#191c1b',
  green: '#10b981',
  deep: '#047857',
  soft: '#6ee7b7',
  paper: '#f3f6f5',
  white: '#ffffff',
  ink: '#0c0d0d',
  grey: '#9ca3a0',
};

const HEAD = 'Manrope';
export const { width: W, height: H } = POST_SIZE;
const CLEAR = 'rgba(0,0,0,0)';
export const GREEN_FILL = linear(160, '#34d399', MINT.deep);

export const copy = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  weight = 500,
  align: 'left' | 'center' | 'right' = 'left',
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    align,
    lineHeight: 1.15,
  });

export const brandLine = (y: number, color: string) =>
  copy('brightlane.studio', 0, y, W, 28, color, 600, 'center');

export const starReviews = template(W, H, () => [
  rect(0, 0, W, H, GREEN_FILL, { name: 'Background' }),
  [
    { x: 300, face: 'man-portrait-1' as const, right: true },
    { x: 200, face: 'woman-portrait-4' as const, right: false },
    { x: 320, face: 'woman-portrait-1' as const, right: false },
  ].map((bar, index) => {
    const y = 210 + index * 150;
    return [
      rect(bar.x, y, 560, 104, MINT.white, {
        name: 'Rating bar',
        cornerRadius: 52,
        ...shadow(30, 12, 'rgba(4,120,87,0.45)'),
      }),
      rating(bar.x + (bar.right ? 50 : 140), y + 30, 44, 5, MINT.green, 0.3),
      avatar(bar.face, bar.right ? bar.x + 560 : bar.x, y + 52, 64, MINT.white),
    ];
  }),
  copy('5', 120, 720, 300, 380, MINT.white, 800),
  rect(400, 800, 420, 86, MINT.black, { name: 'Label box', cornerRadius: 6 }),
  copy('Star Client', 400, 810, 420, 56, MINT.white, 700, 'center'),
  copy('Experiences', 410, 910, 560, 62, MINT.white, 700),
  brandLine(1230, 'rgba(255,255,255,0.8)'),
]);

export const webinarNote = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  rect(0, 640, 130, 340, MINT.coal, { name: 'Side card', cornerRadius: 16 }),
  rect(950, 640, 130, 340, MINT.coal, { name: 'Side card', cornerRadius: 16 }),
  copy('Marketing', 0, 120, W, 56, MINT.white, 400, 'center'),
  copy('ONLINE', 0, 190, W, 136, MINT.green, 800, 'center'),
  copy('WEBINAR', 0, 335, W, 136, MINT.green, 800, 'center'),
  rotateNodes(-4, 540, 800, [
    rect(290, 560, 500, 500, '#f6f5f2', {
      name: 'Pinned note',
      ...shadow(40, 18, 'rgba(0,0,0,0.6)'),
    }),
    text('Brand\nGrowth\nLab', 290, 650, 500, {
      fontFamily: 'Permanent Marker',
      fontSize: 96,
      fontWeight: 400,
      fill: MINT.ink,
      align: 'center',
      lineHeight: 1.05,
    }),
  ]),
  circle(530, 580, 32, MINT.green, { name: 'Pin', ...shadow(12, 6, 'rgba(0,0,0,0.5)') }),
  circle(522, 572, 10, MINT.soft, { name: 'Pin shine' }),
  icon('calendar-days', 210, 1170, 46, MINT.green),
  copy('May 14, 2027', 270, 1176, 300, 34, MINT.white, 500),
  icon('map-pin', 620, 1170, 46, MINT.green),
  copy('Austin, TX', 680, 1176, 300, 34, MINT.white, 500),
]);

const folder = (x: number, y: number, width: number, rotation: number) =>
  rotateNodes(rotation, x + width / 2, y + width * 0.36, [
    rect(x, y, width * 0.42, width * 0.2, MINT.deep, { name: 'Folder tab', cornerRadius: 18 }),
    rect(x, y + width * 0.08, width, width * 0.62, MINT.deep, {
      name: 'Folder back',
      cornerRadius: 22,
    }),
    rect(x, y + width * 0.16, width, width * 0.54, linear(160, '#34d399', MINT.green, '#059669'), {
      name: 'Folder front',
      cornerRadius: 22,
      ...shadow(30, 16, 'rgba(4,120,87,0.35)'),
    }),
  ]);

export const struggling = (height: number) => {
  const ty = height / 2 - 205;
  return template(W, height, () => [
    rect(0, 0, W, height, linear(180, MINT.white, '#e3ebe8'), { name: 'Background' }),
    folder(90, 70, 420, -12),
    folder(720, ty - 230, 300, 14),
    folder(110, height - 400, 460, 8),
    copy('Struggling', 120, ty, 520, 78, MINT.green, 800),
    copy('to', 552, ty, 200, 78, MINT.ink, 500),
    copy('keep up with\ncampaign ideas?', 120, ty + 92, 800, 78, MINT.ink, 500),
    icon('corner-down-right', 470, ty + 300, 70, MINT.green, { strokeWidth: 2.4 }),
    copy(
      'Learn more on\nhow we can help\nyou get organised.',
      560,
      ty + 300,
      440,
      32,
      MINT.ink,
      600,
    ),
  ]);
};

export const connectingTeams = template(W, H, () => {
  const pins: readonly (readonly [number, number])[] = [
    [250, 250],
    [520, 160],
    [430, 400],
    [720, 300],
    [900, 190],
    [620, 580],
    [880, 640],
    [300, 640],
  ];
  const links = [
    [2, 0],
    [2, 1],
    [2, 3],
    [3, 4],
    [2, 5],
    [5, 6],
    [2, 7],
    [3, 6],
  ]
    .map(([from = 0, to = 0]) => {
      const [x1, y1] = pins[from] ?? [0, 0];
      const [x2, y2] = pins[to] ?? [0, 0];
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    })
    .join(' ');
  return [
    rect(0, 0, W, H, MINT.black, { name: 'Background' }),
    dots(60, 70, 18, 14, 56, 'rgba(255,255,255,0.09)', 5),
    path(links, 0, 0, W, H, CLEAR, POST_SIZE, {
      name: 'Links',
      stroke: 'rgba(255,255,255,0.4)',
      strokeWidth: 3,
    }),
    pins.map(([x, y]) => [
      circle(x, y, 40, MINT.white, { name: 'Pin', ...shadow(24, 0, 'rgba(16,185,129,0.6)') }),
      circle(x, y, 28, MINT.green, { name: 'Pin core' }),
      icon('user', x - 15, y - 15, 30, MINT.white, { strokeWidth: 2.5 }),
    ]),
    copy('Connecting\nteams', 80, 840, 900, 88, MINT.white, 600),
    copy('worldwide', 80, 1042, 900, 88, MINT.green, 800),
    avatar('woman-portrait-6', 124, 1226, 44, MINT.white),
    avatar('man-portrait-1', 194, 1226, 44, MINT.white),
    avatar('woman-portrait-2', 264, 1226, 44, MINT.white),
    circle(334, 1226, 46, MINT.white, { name: 'More' }),
    icon('plus', 314, 1206, 40, MINT.ink, { strokeWidth: 3 }),
  ];
});

export const ideasResults = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  copy('Where Ideas', 80, 140, 900, 78, MINT.white, 500),
  copy('Turn Into', 80, 236, 420, 78, MINT.white, 500),
  rect(470, 234, 330, 98, MINT.green, { name: 'Highlight', cornerRadius: 10 }),
  copy('Results', 470, 240, 330, 72, MINT.ink, 800, 'center'),
  copy('Comment "GROW" to\nget the free playbook', 80, 410, 600, 32, MINT.grey, 500),
  path('M 140 520 Q 170 640 330 650', 0, 0, W, H, CLEAR, POST_SIZE, {
    name: 'Arrow curve',
    stroke: MINT.green,
    strokeWidth: 6,
  }),
  poly(
    [
      [320, 628],
      [356, 652],
      [318, 672],
    ],
    MINT.green,
    { name: 'Arrow head' },
  ),
  circle(640, 820, 330, radial('rgba(16,185,129,0.4)', CLEAR), { name: 'Glow' }),
  icon('alarm-clock', 420, 600, 440, MINT.white, { strokeWidth: 1.4 }),
  star(4, 900, 500, 80, MINT.white, { innerRatio: 0.3 }),
  star(4, 180, 1040, 64, MINT.white, { innerRatio: 0.3 }),
  star(4, 940, 1120, 40, MINT.green, { innerRatio: 0.3 }),
  brandLine(1240, MINT.grey),
]);
