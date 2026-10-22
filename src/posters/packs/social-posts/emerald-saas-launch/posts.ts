import { linear } from '@/design';
import { circle, icon, type Nodes, POST_SIZE, photo, rect, template, text } from '../../../kit';

export interface SaasPalette {
  top: string;
  mid: string;
  bottom: string;
  accent: string;
  deep: string;
}

export const EMERALD: SaasPalette = {
  top: '#10b981',
  mid: '#065f46',
  bottom: '#021a14',
  accent: '#a7f3d0',
  deep: '#04281f',
};

export const SUNSET: SaasPalette = {
  top: '#fb923c',
  mid: '#9a3412',
  bottom: '#1c0a04',
  accent: '#fed7aa',
  deep: '#2a1006',
};

export const HEAD = 'Manrope';
export const W = POST_SIZE.width;
export const H = POST_SIZE.height;
export const WHITE = '#ffffff';

export const backdrop = (p: SaasPalette) =>
  rect(0, 0, W, H, linear(180, p.top, p.mid, p.bottom), { name: 'Background' });

export const title = (content: string, y: number, size: number, fill = WHITE, weight = 800) =>
  text(content, 0, y, W, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    align: 'center',
    lineHeight: 1.08,
  });

export const brandMark = (p: SaasPalette, y = 1250, fill = WHITE) => [
  text('Northpeak', 0, y, W / 2 + 60, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 800,
    fill,
    align: 'right',
  }),
  text('Studio', W / 2 + 72, y, 300, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 800,
    fill: p.accent,
  }),
];

export const glass = (x: number, y: number, width: number, height: number, radius = 28) =>
  rect(x, y, width, height, 'rgba(255,255,255,0.12)', {
    cornerRadius: radius,
    stroke: 'rgba(255,255,255,0.35)',
    strokeWidth: 2,
    name: 'Glass card',
  });

export const darkTile = (p: SaasPalette, x: number, y: number, width: number, height: number) =>
  rect(x, y, width, height, linear(180, p.mid, p.deep), {
    cornerRadius: 28,
    stroke: 'rgba(255,255,255,0.22)',
    strokeWidth: 2,
    name: 'Tile',
  });

const windowDots = (x: number, y: number) =>
  [0, 1, 2].map((index) => circle(x + index * 22, y, 7, 'rgba(255,255,255,0.7)'));

export const allInOne = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('All in One Place', 120, 84),
    title('Built to deliver', 225, 54, p.accent, 500),
    glass(280, 420, 520, 140),
    windowDots(310, 450),
    glass(250, 490, 580, 140),
    windowDots(280, 520),
    darkTile(p, 220, 560, 640, 440),
    windowDots(260, 600),
    text('Find clients\nfaster and\neasier', 260, 650, 520, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 800,
      fill: WHITE,
      lineHeight: 1.1,
    }),
    circle(790, 930, 42, WHITE),
    icon('plus', 764, 904, 52, p.mid, { strokeWidth: 3 }),
    brandMark(p),
  ]);

const ZERO_TILES = [
  ['Only one\nclear process', 'workflow'],
  ['Designed\nfor impact', 'target'],
  ['Only what\nmatters', 'sparkles'],
  ['Top 1%\nquality', 'award'],
] as const;

export const zeroConfusion = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('Zero confusion', 110, 84),
    title('guaranteed', 210, 84, p.accent),
    ZERO_TILES.map(([label, name], index) => {
      const x = 90 + (index % 2) * 470;
      const y = 400 + Math.floor(index / 2) * 330;
      return [
        darkTile(p, x, y, 430, 290),
        circle(x + 70, y + 70, 40, WHITE),
        icon(name, x + 48, y + 48, 44, p.mid, { strokeWidth: 2.4 }),
        text(label, x + 40, y + 140, 370, {
          fontFamily: HEAD,
          fontSize: 40,
          fontWeight: 700,
          fill: WHITE,
          lineHeight: 1.15,
        }),
      ];
    }),
    brandMark(p),
  ]);

const SAAS_TILES = [
  ['Designed for impact', 'target'],
  ['Built to scale', 'trending-up'],
  ['Top 1% quality', 'award'],
] as const;

export const saasBusiness = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    text('For SaaS and', 80, 110, 920, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: WHITE,
    }),
    text('AI Business', 80, 205, 920, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: p.accent,
    }),
    photo('laptop-analytics', 80, 380, 520, 720, { cornerRadius: 30 }),
    SAAS_TILES.map(([label, name], index) => {
      const y = 380 + index * 255;
      return [
        darkTile(p, 630, y, 370, 210),
        icon(name, 670, y + 36, 54, p.accent, { strokeWidth: 2.2 }),
        text(label, 670, y + 116, 310, {
          fontFamily: HEAD,
          fontSize: 34,
          fontWeight: 700,
          fill: WHITE,
        }),
      ];
    }),
    brandMark(p),
  ]);

const toggle = (p: SaasPalette, label: string, x: number, y: number): Nodes[] => [
  glass(x, y, 560, 120, 60),
  text(label, x + 50, y + 38, 360, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 700,
    fill: WHITE,
  }),
  rect(x + 420, y + 30, 110, 60, p.accent, { cornerRadius: 30, name: 'Toggle' }),
  circle(x + 500, y + 60, 24, WHITE),
];

export const hundredClients = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('+100 Clients', 140, 116),
    title('have chosen Northpeak Studio', 290, 40, p.accent, 600),
    toggle(p, 'Round-the-clock help', 120, 470),
    toggle(p, 'Quick replies', 400, 680),
    toggle(p, 'Simple setup', 180, 890),
    brandMark(p),
  ]);

export const usersChoose = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    circle(300, 960, 220, 'rgba(0,0,0,0)', { stroke: p.accent, strokeWidth: 28, name: 'Ring' }),
    circle(300, 960, 140, 'rgba(0,0,0,0)', {
      stroke: 'rgba(255,255,255,0.35)',
      strokeWidth: 20,
      name: 'Ring',
    }),
    text('85%', 80, 120, 900, {
      fontFamily: HEAD,
      fontSize: 210,
      fontWeight: 800,
      fill: p.accent,
      lineHeight: 1,
    }),
    text('of users choose\nfaster solutions.', 80, 360, 920, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: WHITE,
      lineHeight: 1.12,
    }),
    glass(600, 800, 400, 270),
    text('Average setup', 640, 840, 340, { fontSize: 30, fontWeight: 500, fill: p.accent }),
    text('4 min', 640, 890, 340, { fontFamily: HEAD, fontSize: 110, fontWeight: 800, fill: WHITE }),
    brandMark(p),
  ]);
