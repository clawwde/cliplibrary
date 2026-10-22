import { linear } from '@/design';
import { circle, icon, type Nodes, POST_SIZE, poly, rect, template, text } from '../../../kit';

export const MINT = {
  black: '#050807',
  panel: '#0e1a16',
  mint: '#5ef2b4',
  deep: '#139a6a',
  pale: '#dcfff1',
  grey: '#8fa69c',
  white: '#ffffff',
  clear: 'rgba(94,242,180,0)',
};

export const HEAD = 'Sora';
export const BODY = 'Manrope';

export const { width: W, height: H } = POST_SIZE;

export const mintText = linear(90, MINT.mint, MINT.pale);

export const brand = (y: number, width = W, x = 0) =>
  text('NODEWAVE LABS', x, y, width, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: MINT.white,
    align: 'center',
    letterSpacing: 4,
  });

export const headline = (
  first: string,
  second: string,
  y: number,
  size: number,
  width = W,
  x = 0,
): Nodes[] => [
  text(first, x, y, width, {
    fontFamily: HEAD,
    fontSize: size * 0.86,
    fontWeight: 400,
    fill: MINT.white,
    align: 'center',
  }),
  text(second, x, y + size * 1.08, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 800,
    fill: mintText,
    align: 'center',
  }),
];

export const glow = (cx: number, cy: number, radius: number, strength = 0.45, height: number = H) =>
  circle(
    cx,
    cy,
    Math.min(radius, cx, W - cx, cy, height - cy),
    {
      type: 'radial',
      stops: [
        { offset: 0, color: `rgba(94,242,180,${strength})` },
        { offset: 0.7, color: MINT.clear },
        { offset: 1, color: MINT.clear },
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

const ring = (radius: number, alpha: number) =>
  circle(540, 860, radius, 'rgba(0,0,0,0)', {
    stroke: `rgba(94,242,180,${alpha})`,
    strokeWidth: 3,
    name: 'Ring',
  });

export const powerRings = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  glow(540, 860, 520, 0.18),
  brand(90),
  headline('The pulse of', 'Smart Workflows', 190, 82),
  [440, 360, 280, 200].map((radius, index) => ring(radius, 0.12 + index * 0.12)),
  glow(540, 860, 220, 0.6),
  icon('sparkles', 460, 780, 160, MINT.white, { strokeWidth: 1.6 }),
]);

const FOLDERS = ['Roadmap', 'Release Notes', 'Help Center'];

const folder = (x: number, y: number, label: string) => [
  rect(x, y, 80, 34, MINT.deep, { cornerRadius: 10, name: 'Folder tab' }),
  rect(x, y + 20, 200, 140, linear(160, MINT.mint, MINT.deep), {
    cornerRadius: 16,
    name: 'Folder',
  }),
  text(label, x - 40, y + 180, 280, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: MINT.grey,
    align: 'center',
  }),
];

export const docsFolders = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#0f2019', MINT.black), { name: 'Background' }),
  glow(330, 560, 330, 0.3),
  text('Smart folders', 80, 340, 560, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 400,
    fill: MINT.white,
  }),
  text('Docs That\nStay Tidy', 80, 420, 680, {
    fontFamily: HEAD,
    fontSize: 112,
    fontWeight: 800,
    fill: mintText,
    lineHeight: 1,
  }),
  FOLDERS.map((label, index) => folder(780, 170 + index * 330, label)),
  cursor(860, 380, 1.3, MINT.white),
  text('NODEWAVE LABS', 80, 1240, 600, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: MINT.white,
    letterSpacing: 4,
  }),
]);

const GLOBE = { cx: 540, cy: 1500, r: 560 };

const globeDots = () => {
  const nodes: Nodes[] = [];
  for (let y = 980; y < 1340; y += 34) {
    for (let x = 20; x < 1070; x += 34) {
      const dx = x - GLOBE.cx;
      const dy = y - GLOBE.cy;
      const inside = Math.hypot(dx, dy) < GLOBE.r - 30;
      const land = Math.sin(x / 90) + Math.cos(y / 60) + Math.sin((x + y) / 140) > 0.4;
      if (inside && land) {
        nodes.push(circle(x, y, 6, 'rgba(220,255,241,0.55)', { name: 'Map dot' }));
      }
    }
  }
  return nodes;
};

export const worldReach = template(W, H, () => {
  const lift = Math.asin((GLOBE.cy - H) / GLOBE.r);
  return [
    rect(0, 0, W, H, MINT.black, { name: 'Background' }),
    glow(540, 980, 620, 0.35),
    brand(90),
    headline('Worldwide Reach', 'Local Speed', 200, 84),
    rect(330, 440, 420, 84, 'rgba(255,255,255,0.06)', {
      cornerRadius: 42,
      stroke: 'rgba(94,242,180,0.5)',
      strokeWidth: 2,
      name: 'Button',
    }),
    circle(378, 482, 30, MINT.mint),
    icon('play', 364, 468, 28, MINT.black),
    text('Join the network', 420, 462, 320, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: MINT.white,
    }),
    poly(
      Array.from({ length: 49 }, (_, index): [number, number] => {
        const t = Math.PI + lift + ((Math.PI - 2 * lift) * index) / 48;
        return [GLOBE.cx + GLOBE.r * Math.cos(t), GLOBE.cy + GLOBE.r * Math.sin(t)];
      }),
      linear(180, '#1d4a39', MINT.black),
      { name: 'Globe', stroke: MINT.mint, strokeWidth: 4 },
    ),
    globeDots(),
  ];
});

const BAR_HEIGHTS = [
  260, 420, 330, 520, 380, 600, 450, 300, 560, 480, 640, 400, 520, 360, 580, 440, 310, 500, 380,
  560, 290, 450,
];

export const amplifyBars = template(W, H, () => [
  rect(0, 0, W, H, linear(180, MINT.black, '#0c1f18'), { name: 'Background' }),
  glow(540, 1000, 350, 0.4),
  brand(90),
  headline('Amplify Your', 'Output', 200, 96),
  rect(300, 470, 480, 84, 'rgba(255,255,255,0.06)', {
    cornerRadius: 42,
    stroke: 'rgba(94,242,180,0.4)',
    strokeWidth: 2,
    name: 'Button group',
  }),
  rect(308, 478, 236, 68, linear(90, MINT.mint, MINT.pale), {
    cornerRadius: 34,
    name: 'Primary button',
  }),
  text('Learn more', 308, 494, 236, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 700,
    fill: MINT.black,
    align: 'center',
  }),
  text('Contact us', 544, 494, 236, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: MINT.white,
    align: 'center',
  }),
  BAR_HEIGHTS.map((height, index) =>
    rect(70 + index * 43, 1300 - height, 28, height, linear(180, MINT.pale, MINT.clear), {
      cornerRadius: 14,
      name: 'Bar',
    }),
  ),
]);
