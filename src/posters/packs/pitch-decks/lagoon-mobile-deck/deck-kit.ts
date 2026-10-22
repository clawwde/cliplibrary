import { type DesignIconName, linear } from '@/design';
import {
  avatar,
  bars,
  circle,
  icon,
  type Nodes,
  path,
  phone,
  phoneScreen,
  rect,
  SLIDE_SIZE,
  shadow,
  text,
} from '../../../kit';

export interface DeckTheme {
  deep: string;
  mid: string;
  glow: string;
  surface: string;
  soft: string;
  ink: string;
  muted: string;
  warm: string;
}

export const LAGOON: DeckTheme = {
  deep: '#04263a',
  mid: '#0b6477',
  glow: '#2dd4bf',
  surface: '#e3f8f4',
  soft: '#bfeee6',
  ink: '#062433',
  muted: '#4b6670',
  warm: '#ffb547',
};

export const SUNSET: DeckTheme = {
  deep: '#3a0f1d',
  mid: '#c2410c',
  glow: '#fdba74',
  surface: '#fff1e8',
  soft: '#fed7c3',
  ink: '#2a0d14',
  muted: '#7a4b3f',
  warm: '#fde047',
};

export const SW = SLIDE_SIZE.width;
export const SH = SLIDE_SIZE.height;
export const HEAD = 'Manrope';
export const BODY = 'Inter';

export const darkBg = (theme: DeckTheme) =>
  rect(0, 0, SW, SH, linear(125, theme.deep, theme.mid), { name: 'Background' });

export const lightBg = (theme: DeckTheme) =>
  rect(0, 0, SW, SH, linear(125, '#ffffff', theme.surface, theme.soft), { name: 'Background' });

export const title = (
  label: string,
  x: number,
  y: number,
  width: number,
  size: number,
  color: string,
  align: 'left' | 'center' = 'left',
) =>
  text(label, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 800,
    fill: color,
    align,
    lineHeight: 1.08,
  });

export const copy = (
  label: string,
  x: number,
  y: number,
  width: number,
  size: number,
  color: string,
  align: 'left' | 'center' = 'left',
) =>
  text(label, x, y, width, {
    fontFamily: BODY,
    fontSize: size,
    fontWeight: 400,
    fill: color,
    align,
    lineHeight: 1.45,
  });

export const kicker = (label: string, x: number, y: number, color: string) =>
  text(label, x, y, 900, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 700,
    fill: color,
    letterSpacing: 3,
    uppercase: true,
  });

export const iconTile = (
  name: DesignIconName,
  x: number,
  y: number,
  size: number,
  fill: string,
  color = '#ffffff',
) => [
  rect(x, y, size, size, fill, { cornerRadius: size * 0.28, name: 'Icon tile' }),
  icon(name, x + size * 0.22, y + size * 0.22, size * 0.56, color, { strokeWidth: 2.2 }),
];

export const chip = (
  theme: DeckTheme,
  x: number,
  y: number,
  width: number,
  heading: string,
  sub: string,
  name: DesignIconName,
) => [
  rect(x, y, width, 110, '#ffffff', {
    cornerRadius: 24,
    name: 'Chip',
    ...shadow(30, 12, 'rgba(4,38,58,0.18)'),
  }),
  iconTile(name, x + 20, y + 22, 66, theme.mid),
  text(heading, x + 104, y + 22, width - 120, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 800,
    fill: theme.ink,
  }),
  text(sub, x + 104, y + 60, width - 120, {
    fontFamily: BODY,
    fontSize: 21,
    fontWeight: 400,
    fill: theme.muted,
  }),
];

export const statCard = (
  theme: DeckTheme,
  x: number,
  y: number,
  value: string,
  label: string,
  dark = false,
) => [
  rect(x, y, 240, 150, dark ? theme.mid : '#ffffff', {
    cornerRadius: 24,
    name: 'Stat card',
    ...shadow(30, 12, 'rgba(4,38,58,0.16)'),
  }),
  text(value, x + 26, y + 22, 200, {
    fontFamily: HEAD,
    fontSize: 58,
    fontWeight: 800,
    fill: dark ? '#ffffff' : theme.ink,
    lineHeight: 1,
  }),
  text(label, x + 26, y + 96, 200, {
    fontFamily: BODY,
    fontSize: 21,
    fontWeight: 500,
    fill: dark ? theme.soft : theme.muted,
  }),
];

const area = (theme: DeckTheme, x: number, y: number, width: number, height: number) => [
  path(
    'M0 80 C 40 70 60 42 100 52 S 160 20 200 34 S 262 8 300 14 L300 100 L0 100 Z',
    x,
    y,
    width,
    height,
    linear(180, theme.glow, 'rgba(255,255,255,0)'),
    { width: 300, height: 100 },
  ),
  path(
    'M0 80 C 40 70 60 42 100 52 S 160 20 200 34 S 262 8 300 14',
    x,
    y,
    width,
    height,
    'rgba(0,0,0,0)',
    { width: 300, height: 100 },
    { stroke: theme.glow, strokeWidth: 4 },
  ),
];

export const chartScreen = (theme: DeckTheme, width: number, height: number): Nodes[] => [
  rect(0, 0, width, height, theme.deep, { cornerRadius: width * 0.12, name: 'Screen' }),
  text('Performance\nDigest', width * 0.1, height * 0.1, width * 0.8, {
    fontFamily: HEAD,
    fontSize: width * 0.1,
    fontWeight: 800,
    fill: '#ffffff',
    lineHeight: 1.05,
  }),
  text('Live team charts', width * 0.1, height * 0.23, width * 0.8, {
    fontFamily: BODY,
    fontSize: width * 0.055,
    fontWeight: 500,
    fill: theme.soft,
  }),
  area(theme, 0, height * 0.32, width, height * 0.22),
  bars(
    width * 0.08,
    height * 0.62,
    width * 0.84,
    height * 0.2,
    [40, 62, 48, 80, 66, 92],
    theme.glow,
  ),
  rect(width * 0.08, height * 0.87, width * 0.84, height * 0.06, 'rgba(255,255,255,0.12)', {
    cornerRadius: height * 0.03,
    name: 'Tab bar',
  }),
];

export const dashboardScreen = (theme: DeckTheme, width: number, height: number): Nodes[] => {
  const tile = (x: number, y: number, value: string, fill: string) => [
    rect(x, y, width * 0.39, height * 0.11, fill, { cornerRadius: width * 0.05, name: 'Tile' }),
    text(value, x + width * 0.04, y + height * 0.035, width * 0.33, {
      fontFamily: HEAD,
      fontSize: width * 0.07,
      fontWeight: 800,
      fill: '#ffffff',
    }),
  ];
  return [
    rect(0, 0, width, height, linear(180, theme.deep, theme.mid), {
      cornerRadius: width * 0.12,
      name: 'Screen',
    }),
    text('My Overview', width * 0.08, height * 0.08, width * 0.8, {
      fontFamily: HEAD,
      fontSize: width * 0.075,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    tile(width * 0.08, height * 0.16, '$18.4k', 'rgba(255,255,255,0.14)'),
    tile(width * 0.53, height * 0.16, '$12.2k', theme.glow),
    tile(width * 0.08, height * 0.29, '3.9%', theme.warm),
    tile(width * 0.53, height * 0.29, '+24%', 'rgba(255,255,255,0.14)'),
    circle(width * 0.5, height * 0.56, width * 0.2, theme.glow),
    circle(width * 0.5, height * 0.56, width * 0.13, theme.deep),
    text('82%', width * 0.3, height * 0.545, width * 0.4, {
      fontFamily: HEAD,
      fontSize: width * 0.07,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    [0, 1, 2].map((index) =>
      rect(
        width * 0.08,
        height * (0.72 + index * 0.07),
        width * 0.84,
        height * 0.05,
        'rgba(255,255,255,0.12)',
        {
          cornerRadius: width * 0.03,
          name: 'Row',
        },
      ),
    ),
  ];
};

export const profileScreen = (theme: DeckTheme, width: number, height: number): Nodes[] => [
  rect(0, 0, width, height, '#ffffff', { cornerRadius: width * 0.12, name: 'Screen' }),
  text('User Profile', 0, height * 0.08, width, {
    fontFamily: HEAD,
    fontSize: width * 0.08,
    fontWeight: 800,
    fill: theme.ink,
    align: 'center',
  }),
  avatar('woman-portrait-1', width / 2, height * 0.24, width * 0.13, theme.glow),
  text('Nora Lindqvist', 0, height * 0.33, width, {
    fontFamily: BODY,
    fontSize: width * 0.06,
    fontWeight: 700,
    fill: theme.ink,
    align: 'center',
  }),
  ['48', '12', '96%'].map((value, index) =>
    text(value, width * (0.08 + index * 0.29), height * 0.41, width * 0.26, {
      fontFamily: HEAD,
      fontSize: width * 0.075,
      fontWeight: 800,
      fill: theme.mid,
      align: 'center',
    }),
  ),
  [0, 1, 2].map((index) => [
    rect(width * 0.08, height * (0.52 + index * 0.13), width * 0.84, height * 0.1, theme.surface, {
      cornerRadius: width * 0.05,
      name: 'Card',
    }),
    circle(width * 0.18, height * (0.57 + index * 0.13), width * 0.05, theme.glow),
    rect(width * 0.3, height * (0.555 + index * 0.13), width * 0.48, height * 0.025, theme.soft, {
      cornerRadius: 6,
      name: 'Line',
    }),
  ]),
];

type ScreenBuilder = (theme: DeckTheme, width: number, height: number) => Nodes[];

export const device = (
  theme: DeckTheme,
  screen: ScreenBuilder,
  x: number,
  y: number,
  width: number,
  rotation?: number,
) => {
  const inner = phoneScreen(width);
  return phone(x, y, width, {
    screen: theme.deep,
    content: screen(theme, inner.width, inner.height),
    ...(rotation === undefined ? {} : { rotation }),
  });
};

export const wordmark = (x: number, y: number, size: number, color: string, accent: string) => [
  rect(x, y + size * 0.12, size * 0.8, size * 0.8, accent, {
    cornerRadius: size * 0.24,
    name: 'Logo mark',
  }),
  circle(x + size * 0.4, y + size * 0.52, size * 0.18, color),
  text('nimbo', x + size, y, size * 4, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 800,
    fill: color,
    lineHeight: 1,
  }),
];
