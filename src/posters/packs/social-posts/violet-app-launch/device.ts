import { type DesignIconName, linear } from '@/design';
import { circle, group, icon, type Nodes, phone, phoneScreen, rect, text } from '../../../kit';

export interface AppPalette {
  brand: string;
  deep: string;
  soft: string;
  accent: string;
  ink: string;
  night: string;
  paper: string;
  muted: string;
}

export const VIOLET: AppPalette = {
  brand: '#6d4aff',
  deep: '#3b1fd1',
  soft: '#b9a8ff',
  accent: '#ff7a59',
  ink: '#140f2e',
  night: '#241a5c',
  paper: '#f6f3ff',
  muted: '#5b5675',
};

export const SUNSET: AppPalette = {
  brand: '#ff6a3d',
  deep: '#c2410c',
  soft: '#ffc2a8',
  accent: '#ffd23f',
  ink: '#1a0f0a',
  night: '#3a1d12',
  paper: '#fff4ec',
  muted: '#6b5a50',
};

export const HEAD = 'Plus Jakarta Sans';

const appUi = (width: number, height: number, p: AppPalette): Nodes[] => {
  const pad = width * 0.08;
  const inner = width - pad * 2;
  return [
    rect(0, 0, width, height * 0.38, linear(150, p.brand, p.deep), {
      cornerRadius: width * 0.12,
      name: 'App header',
    }),
    text('Hi, Maya', pad, height * 0.09, inner, {
      fontFamily: HEAD,
      fontSize: width * 0.065,
      fontWeight: 500,
      fill: 'rgba(255,255,255,0.8)',
    }),
    text('$12,480', pad, height * 0.14, inner, {
      fontFamily: HEAD,
      fontSize: width * 0.14,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    rect(pad, height * 0.27, width * 0.36, height * 0.05, 'rgba(255,255,255,0.22)', {
      cornerRadius: height * 0.025,
      name: 'Chip',
    }),
    rect(pad, height * 0.42, inner, height * 0.2, '#ffffff', {
      cornerRadius: width * 0.06,
      name: 'Chart card',
    }),
    [0.45, 0.7, 0.55, 0.9, 0.65, 1].map((value, index) =>
      rect(
        pad + inner * 0.1 + index * inner * 0.14,
        height * 0.44 + height * 0.15 * (1 - value),
        inner * 0.08,
        height * 0.15 * value,
        index === 5 ? p.accent : p.brand,
        { cornerRadius: inner * 0.03, name: 'Bar' },
      ),
    ),
    [0, 1, 2].map((row) => [
      circle(pad + width * 0.06, height * (0.69 + row * 0.085), width * 0.06, p.soft),
      rect(
        pad + width * 0.16,
        height * (0.675 + row * 0.085),
        inner * 0.55,
        height * 0.016,
        p.ink,
        {
          cornerRadius: height * 0.008,
          name: 'Row title',
        },
      ),
      rect(
        pad + width * 0.16,
        height * (0.7 + row * 0.085),
        inner * 0.35,
        height * 0.012,
        '#c9c4dc',
        {
          cornerRadius: height * 0.006,
          name: 'Row detail',
        },
      ),
    ]),
  ];
};

export const device = (x: number, y: number, width: number, p: AppPalette, rotation?: number) => {
  const screen = phoneScreen(width);
  return phone(x, y, width, {
    screen: p.paper,
    content: appUi(screen.width, screen.height, p),
    ...(rotation === undefined ? {} : { rotation }),
  });
};

const badge = (x: number, y: number, name: DesignIconName, top: string, bottom: string) =>
  group(
    rect(x, y, 230, 72, '#0b0b12', {
      cornerRadius: 16,
      stroke: 'rgba(255,255,255,0.6)',
      strokeWidth: 2,
      name: 'Store badge',
    }),
    icon(name, x + 18, y + 16, 40, '#ffffff'),
    text(top, x + 72, y + 10, 150, {
      fontSize: 16,
      fontWeight: 500,
      fill: '#ffffff',
    }),
    text(bottom, x + 72, y + 30, 150, {
      fontSize: 26,
      fontWeight: 700,
      fill: '#ffffff',
    }),
  );

export const badges = (x: number, y: number) => [
  badge(x, y, 'play', 'GET IT ON', 'Android'),
  badge(x + 250, y, 'smartphone', 'DOWNLOAD ON', 'iPhone'),
];
