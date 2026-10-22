import { linear } from '@/design';
import {
  icon,
  line,
  type Nodes,
  POST_SIZE,
  path,
  phone,
  phoneScreen,
  poly,
  rect,
  rotateNodes,
  shadow,
  star,
  template,
  text,
} from '../../../kit';

export const IRIS = {
  deep: '#24127e',
  royal: '#4b2ed6',
  iris: '#7356ff',
  soft: '#a58bff',
  lilac: '#c9bcff',
  pale: '#f1edff',
  white: '#ffffff',
  ink: '#1d1450',
  grey: '#6e6894',
};

export const HEAD = 'Figtree';
export const BODY = 'Inter';

export const { width: W, height: H } = POST_SIZE;

export const darkBackdrop = (height: number) =>
  rect(0, 0, W, height, linear(160, IRIS.royal, IRIS.deep), { name: 'Background' });

export const lightBackdrop = (height: number) =>
  rect(0, 0, W, height, linear(180, IRIS.white, '#e2d9ff'), { name: 'Background' });

export const irisText = linear(90, IRIS.iris, IRIS.soft);

export const brand = (y: number, color: string, align: 'left' | 'center' | 'right' = 'center') =>
  text('LUMENFLOW AI', align === 'center' ? 0 : 80, y, align === 'center' ? W : 920, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 800,
    fill: color,
    align,
    letterSpacing: 3,
  });

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

export const sparkle = (x: number, y: number, size: number, fill: string) =>
  star(4, x, y, size, fill, { innerRatio: 0.28, name: 'Sparkle' });

export const cursor = (x: number, y: number, scale: number, fill: string) =>
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

export const tag = (label: string, x: number, y: number, rotation: number, width: number) =>
  rotateNodes(rotation, x + width / 2, y + 32, [
    rect(x, y, width, 64, linear(90, IRIS.lilac, IRIS.pale), {
      cornerRadius: 18,
      stroke: IRIS.white,
      strokeWidth: 2,
      name: `${label} tag`,
      ...shadow(24, 10, 'rgba(36,18,126,0.35)'),
    }),
    text(label, x, y + 16, width, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 700,
      fill: IRIS.ink,
      align: 'center',
    }),
  ]);

const TILE_ICONS = ['rocket', 'mic', 'send'] as const;

export const magicRoutines = template(W, H, () => [
  lightBackdrop(H),
  centered('The magic of', 220, 74, 500, IRIS.ink),
  centered('Smart Routines', 308, 84, 800, irisText),
  TILE_ICONS.map((name, index) =>
    rotateNodes((index - 1) * 9, 335 + index * 205, 625 - (index === 1 ? 24 : 0), [
      rect(
        240 + index * 205,
        530 - (index === 1 ? 24 : 0),
        190,
        190,
        linear(160, IRIS.iris, IRIS.royal),
        {
          cornerRadius: 36,
          stroke: IRIS.lilac,
          strokeWidth: 3,
          name: 'Icon tile',
          ...shadow(30, 16, 'rgba(36,18,126,0.3)'),
        },
      ),
      icon(name, 285 + index * 205, 575 - (index === 1 ? 24 : 0), 100, IRIS.white, {
        strokeWidth: 2,
      }),
    ]),
  ),
  rotateNodes(-4, 530, 830, [
    rect(400, 795, 260, 70, IRIS.white, {
      cornerRadius: 12,
      stroke: IRIS.ink,
      strokeWidth: 2,
      name: 'Tag',
    }),
    text('Get started', 400, 812, 260, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 600,
      fill: IRIS.ink,
      align: 'center',
    }),
  ]),
  rotateNodes(3, 700, 930, [
    rect(600, 895, 200, 70, IRIS.white, {
      cornerRadius: 12,
      stroke: IRIS.ink,
      strokeWidth: 2,
      name: 'Tag',
    }),
    text('Today', 600, 912, 200, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 600,
      fill: IRIS.ink,
      align: 'center',
    }),
  ]),
  brand(1220, IRIS.ink),
]);

export const growOnline = template(W, H, () => [
  darkBackdrop(H),
  line(90, 452, 150, 'rgba(255,255,255,0.6)', 3, { name: 'Spark line' }),
  sparkle(226, 420, 64, IRIS.white),
  centered('Grow', 360, 170, 800, IRIS.white),
  centered('Online', 540, 140, 400, IRIS.white),
  sparkle(770, 680, 54, IRIS.lilac),
  line(820, 707, 180, 'rgba(255,255,255,0.6)', 3, { name: 'Spark line' }),
  sparkle(850, 300, 40, IRIS.white),
  centered('Let smart tools carry the load', 780, 42, 500, IRIS.lilac),
  rect(390, 880, 300, 88, linear(90, IRIS.lilac, IRIS.pale), {
    cornerRadius: 44,
    name: 'Button',
  }),
  text('Learn more', 390, 904, 300, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 700,
    fill: IRIS.ink,
    align: 'center',
  }),
  brand(1220, IRIS.white),
]);

export const stayAhead = template(W, H, () => {
  const screen = phoneScreen(400);
  const content: Nodes[] = [
    sparkle(screen.width / 2 - 60, 220, 80, IRIS.iris),
    sparkle(screen.width / 2 + 10, 190, 44, IRIS.soft),
    text('Hello, Alex', 0, 340, screen.width, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 800,
      fill: IRIS.ink,
      align: 'center',
    }),
    text('How can I help today?', 0, 384, screen.width, {
      fontFamily: BODY,
      fontSize: 22,
      fontWeight: 500,
      fill: IRIS.grey,
      align: 'center',
    }),
    rect(30, 450, screen.width - 60, 60, IRIS.white, {
      cornerRadius: 30,
      stroke: '#d8d0f5',
      strokeWidth: 2,
      name: 'Prompt field',
    }),
    icon('search', screen.width - 82, 464, 32, IRIS.iris, { strokeWidth: 2.4 }),
  ];
  return [
    lightBackdrop(H),
    path(
      'M 0 1350 L 0 1160 C 300 1040 760 1040 1080 1160 L 1080 1350 Z',
      0,
      0,
      W,
      H,
      linear(180, IRIS.lilac, IRIS.pale),
      { width: W, height: H },
      { name: 'Wave' },
    ),
    phone(70, 250, 400, { screen: linear(180, IRIS.white, IRIS.pale), content }),
    text('LUMENFLOW AI', 540, 330, 480, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 800,
      fill: IRIS.iris,
      letterSpacing: 3,
    }),
    text('Stay one step\nahead.', 540, 420, 480, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 500,
      fill: IRIS.ink,
      lineHeight: 1.15,
    }),
    text('Level up your\nday with AI.', 540, 590, 480, {
      fontFamily: HEAD,
      fontSize: 68,
      fontWeight: 800,
      fill: irisText,
      lineHeight: 1.12,
    }),
  ];
});

export const quoteFloat = template(W, H, () => [
  darkBackdrop(H),
  rect(820, 160, 160, 160, 'rgba(255,255,255,0.16)', { cornerRadius: 22, rotation: 20 }),
  rect(110, 140, 100, 100, 'rgba(255,255,255,0.1)', { cornerRadius: 16, rotation: 10 }),
  rect(60, 980, 220, 220, 'rgba(255,255,255,0.12)', { cornerRadius: 28, rotation: -15 }),
  rect(860, 1000, 140, 140, 'rgba(255,255,255,0.2)', { cornerRadius: 20, rotation: 35 }),
  icon('quote', 250, 560, 140, IRIS.white, { strokeWidth: 2.4, rotation: 180 }),
  text('Make it simple.', 290, 430, 720, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: IRIS.lilac,
  }),
  text("That's how great\nservice should\nfeel.", 290, 524, 720, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 500,
    fill: IRIS.white,
    lineHeight: 1.15,
  }),
  brand(1220, IRIS.white),
]);
