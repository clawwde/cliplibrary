import { linear, radial } from '@/design';
import {
  circle,
  ellipse,
  icon,
  POST_SIZE,
  path,
  poly,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const FLARE = {
  black: '#080605',
  coal: '#16120f',
  panel: '#221c17',
  orange: '#ff6a1a',
  amber: '#ffb648',
  white: '#ffffff',
  grey: '#a8a29e',
  violet: '#8b5cf6',
  lilac: '#c4b5fd',
};

export const HEAD = 'Sora';
export const BODY = 'Inter';
export const { width: W, height: H } = POST_SIZE;
export const CLEAR = 'rgba(0,0,0,0)';

export const glow = (cx: number, cy: number, radius: number, color: string) =>
  circle(cx, cy, radius, radial(color, CLEAR), { name: 'Glow' });

export const headline = (
  content: string,
  y: number,
  size: number,
  fill: string,
  weight = 700,
  x = 0,
  width: number = W,
  align: 'left' | 'center' = 'center',
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    align,
    lineHeight: 1.05,
  });

export const gridFloor = (top: number, bottom: number, color: string) => {
  const depth = bottom - top;
  const rows = Array.from({ length: 7 }, (_, index) => {
    const y = top + depth * (index / 6) ** 2;
    return `M 0 ${y.toFixed(1)} L ${W} ${y.toFixed(1)}`;
  });
  const rays = Array.from({ length: 9 }, (_, index) => {
    const step = index - 4;
    return `M ${540 + step * 60} ${top} L ${540 + step * 125} ${bottom}`;
  });
  return path([...rows, ...rays].join(' '), 0, 0, W, H, CLEAR, POST_SIZE, {
    name: 'Grid floor',
    stroke: color,
    strokeWidth: 3,
  });
};

export const percentCharged = template(W, H, () => [
  rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
  glow(640, 650, 420, 'rgba(255,106,26,0.35)'),
  headline('50%', 90, 180, FLARE.amber, 800, 80, 600, 'left'),
  headline('Charged', 290, 64, FLARE.white, 500, 84, 600, 'left'),
  poly(
    [
      [760, 140],
      [330, 720],
      [580, 720],
      [400, 1120],
      [940, 540],
      [680, 540],
      [930, 140],
    ],
    linear(160, FLARE.amber, FLARE.orange, 'rgba(255,106,26,0.25)'),
    { name: 'Bolt', ...shadow(60, 0, 'rgba(255,140,40,0.6)') },
  ),
  headline('Powering your', 1100, 54, FLARE.white, 500, 80, 800, 'left'),
  headline('next big move.', 1170, 54, FLARE.amber, 700, 80, 800, 'left'),
]);

export const buildPatterns = template(W, H, () => [
  rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
  Array.from({ length: 12 }, (_, index) =>
    rect(index * 90 + 45, 0, 2, H, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
  ),
  Array.from({ length: 15 }, (_, index) =>
    rect(0, index * 90 + 45, W, 2, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
  ),
  glow(700, 330, 300, 'rgba(255,182,72,0.4)'),
  ellipse(220, 360, 300, 300, CLEAR, {
    name: 'Ring',
    stroke: 'rgba(255,255,255,0.45)',
    strokeWidth: 4,
  }),
  ellipse(390, 270, 300, 300, CLEAR, {
    name: 'Ring',
    stroke: 'rgba(255,255,255,0.75)',
    strokeWidth: 4,
  }),
  ellipse(560, 180, 300, 300, 'rgba(255,182,72,0.12)', {
    name: 'Ring',
    stroke: FLARE.amber,
    strokeWidth: 6,
    ...shadow(30, 0, 'rgba(255,182,72,0.8)'),
  }),
  headline("Don't follow patterns,", 880, 58, FLARE.white, 500),
  headline('Build them', 960, 120, FLARE.amber, 800),
  text('HALOGEN AI', 0, 1230, W, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: FLARE.grey,
    align: 'center',
    letterSpacing: 6,
  }),
]);

interface BeamCopy {
  lines: readonly [string, string, string];
  left: readonly [string, string];
  right: readonly [string, string];
}

const solutionsBeam = (accent: string, rim: string, copy: BeamCopy) => {
  const bank: readonly (readonly [number, number])[] = [
    [0, 1050],
    [70, 990],
    [150, 1010],
    [220, 940],
    [310, 980],
    [350, 1060],
    [420, 1110],
    [430, 1200],
    [400, 1270],
    [430, 1350],
  ];
  const cloud = (mirror: boolean) => {
    const at = (x: number) => (mirror ? W - x : x).toFixed(0);
    const [first, ...rest] = bank;
    const start = first ?? [0, 1050];
    const segments = rest.map(([x, y], index) => {
      const [px, py] = bank[index] ?? start;
      return `Q ${at((px + x) / 2)} ${Math.min(py, y) - 50} ${at(x)} ${y}`;
    });
    const contour = [`M ${at(start[0])} ${start[1]}`, ...segments].join(' ');
    return [
      path(
        `M ${at(0)} ${H} L ${contour.slice(2)} Z`,
        0,
        0,
        W,
        H,
        radial('#3b3531', '#0f0c0a'),
        POST_SIZE,
        {
          name: 'Cloud bank',
        },
      ),
      path(contour, 0, 0, W, H, CLEAR, POST_SIZE, {
        name: 'Cloud rim',
        stroke: rim,
        strokeWidth: 8,
        ...shadow(40, 0, rim),
      }),
    ];
  };
  return template(W, H, () => [
    rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
    headline(copy.lines[0], 110, 104, FLARE.white, 700),
    headline(copy.lines[1], 220, 104, accent, 700),
    headline(copy.lines[2], 330, 104, FLARE.white, 700),
    rect(440, 480, 200, 870, linear(180, CLEAR, accent), { name: 'Beam' }),
    headline(copy.right[0], 560, 90, accent, 800, 680, 300),
    text(copy.right[1], 680, 670, 300, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 500,
      fill: FLARE.white,
      align: 'center',
      lineHeight: 1.3,
    }),
    headline(copy.left[0], 720, 90, accent, 800, 100, 300),
    text(copy.left[1], 100, 830, 300, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 500,
      fill: FLARE.white,
      align: 'center',
      lineHeight: 1.3,
    }),
    cloud(false),
    cloud(true),
  ]);
};

export const solutionsAmber = solutionsBeam(FLARE.amber, 'rgba(255,182,72,0.55)', {
  lines: ['AI Solutions', 'that carry you', 'Further'],
  left: ['6x', 'Tasks finished\nevery day'],
  right: ['12+', 'Hours saved\neach week'],
});

export const solutionsViolet = solutionsBeam(FLARE.lilac, 'rgba(139,92,246,0.6)', {
  lines: ['Lift your', 'Workflow to', 'New Heights'],
  left: ['9+', 'Industry\nawards'],
  right: ['#1', 'Rated by\nteams'],
});

export const blueprint = template(W, H, () => [
  rect(0, 0, W, H, linear(180, FLARE.black, '#1a1209'), { name: 'Background' }),
  glow(540, 620, 460, 'rgba(255,106,26,0.22)'),
  text('The', 0, 220, 365, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 700,
    fill: FLARE.white,
    align: 'right',
  }),
  text('Blueprint', 390, 220, 600, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 700,
    fill: FLARE.amber,
  }),
  headline('for Growth', 330, 92, FLARE.white, 400),
  [
    { x: 170, name: 'rocket' as const, active: false },
    { x: 430, name: 'mic' as const, active: true },
    { x: 690, name: 'navigation' as const, active: false },
  ].map((tile) => [
    rect(tile.x, 560, 220, 220, linear(160, FLARE.panel, FLARE.coal), {
      name: 'Tool tile',
      cornerRadius: 40,
      stroke: tile.active ? FLARE.amber : 'rgba(255,255,255,0.25)',
      strokeWidth: tile.active ? 5 : 2,
      ...shadow(40, 16, 'rgba(0,0,0,0.6)'),
    }),
    icon(tile.name, tile.x + 60, 620, 100, FLARE.white, { strokeWidth: 1.8 }),
    circle(tile.x + 20, 560, 30, tile.active ? FLARE.amber : FLARE.panel, {
      name: 'Check badge',
      stroke: FLARE.amber,
      strokeWidth: 3,
    }),
    icon('check', tile.x + 4, 544, 32, tile.active ? FLARE.black : FLARE.amber, {
      strokeWidth: 3,
    }),
  ]),
  text('Turn hours of manual work into\nseconds of precision.\nReclaim your week.', 0, 900, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 400,
    fill: FLARE.grey,
    align: 'center',
    lineHeight: 1.45,
  }),
]);

export const builtForPower = (height: number) => {
  const dy = (height - H) / 2;
  return template(W, height, () => [
    rect(0, 0, W, height, FLARE.black, { name: 'Background' }),
    glow(540, 520 + dy, 420, 'rgba(255,140,40,0.35)'),
    rect(495, 0, 90, 280 + dy, linear(90, '#57504a', '#c9c2bb', '#57504a'), { name: 'Cable' }),
    circle(540, 300 + dy, 56, linear(90, '#6b635c', '#e7e2dc', '#6b635c'), { name: 'Joint' }),
    circle(540, 520 + dy, 150, radial('#fff7e8', FLARE.amber, FLARE.orange), {
      name: 'Orb',
      ...shadow(80, 0, 'rgba(255,150,50,0.9)'),
    }),
    icon('sparkles', 470, 450 + dy, 140, FLARE.black, { strokeWidth: 1.6 }),
    poly(
      [
        [505, 320 + dy],
        [390, 410 + dy],
        [360, 620 + dy],
        [400, 690 + dy],
        [420, 640 + dy],
        [410, 440 + dy],
        [520, 350 + dy],
      ],
      linear(90, '#4a443f', '#d6d0ca'),
      { name: 'Claw arm' },
    ),
    poly(
      [
        [575, 320 + dy],
        [690, 410 + dy],
        [720, 620 + dy],
        [680, 690 + dy],
        [660, 640 + dy],
        [670, 440 + dy],
        [560, 350 + dy],
      ],
      linear(90, '#d6d0ca', '#4a443f'),
      { name: 'Claw arm' },
    ),
    headline('Built for', 760 + dy, 100, FLARE.white, 700),
    headline('Intelligent', 865 + dy, 100, FLARE.amber, 800),
    headline('Power', 970 + dy, 100, FLARE.white, 700),
    rect(290, 1130 + dy, 500, 96, 'rgba(255,255,255,0.06)', {
      name: 'Button group',
      cornerRadius: 48,
      stroke: 'rgba(255,255,255,0.35)',
      strokeWidth: 2,
    }),
    rect(298, 1138 + dy, 250, 80, FLARE.amber, { name: 'Primary button', cornerRadius: 40 }),
    text('Learn More', 298, 1160 + dy, 250, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: FLARE.black,
      align: 'center',
    }),
    text('Talk to Us', 548, 1160 + dy, 236, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: FLARE.white,
      align: 'center',
    }),
  ]);
};
