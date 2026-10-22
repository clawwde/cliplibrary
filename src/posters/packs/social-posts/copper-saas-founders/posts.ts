import { type Fill, linear, NO_FILTERS } from '@/design';
import {
  ellipse,
  group,
  icon,
  POST_SIZE,
  photo,
  pill,
  poly,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export interface SaasTheme {
  background: Fill;
  base: string;
  text: string;
  brand: string;
  glow: string;
  muted: string;
  panel: string;
  onBrand: string;
}

export const COPPER: SaasTheme = {
  background: '#0d0d10',
  base: '#0d0d10',
  text: '#ffffff',
  brand: '#ff6a1f',
  glow: '#ffb067',
  muted: '#a1a1aa',
  panel: '#1a1a20',
  onBrand: '#ffffff',
};

export const LILAC: SaasTheme = {
  background: linear(150, '#f1ecff', '#c4b5fd'),
  base: '#ddd3ff',
  text: '#1e1240',
  brand: '#6d28d9',
  glow: '#a78bfa',
  muted: '#4c3d75',
  panel: '#ffffff',
  onBrand: '#ffffff',
};

const { width: W, height: H } = POST_SIZE;
const DISPLAY = 'Archivo Black';
export const HEAD = 'Outfit';
export const BODY = 'DM Sans';
const BRAND_NAME = 'Northpeak Labs';

export const backdrop = (theme: SaasTheme) =>
  rect(0, 0, W, H, theme.background, { name: 'Background' });

export const footerMark = (theme: SaasTheme, x: number, y: number, color = theme.text) =>
  group(
    rect(x, y + 4, 34, 34, theme.brand, { cornerRadius: 9, name: 'Mark' }),
    icon('arrow-up-right', x + 5, y + 9, 24, theme.onBrand, { strokeWidth: 3 }),
    text(BRAND_NAME, x + 48, y + 4, 400, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 700,
      fill: color,
    }),
  );

export const header = (theme: SaasTheme, left: string, right: string) => [
  text(left, 70, 60, 400, { fontFamily: BODY, fontSize: 28, fontWeight: 500, fill: theme.text }),
  text(right, W - 470, 60, 400, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 500,
    fill: theme.text,
    align: 'right',
  }),
];

export const trend = (
  points: readonly (readonly [number, number])[],
  thickness: number,
  fill: Fill,
) => {
  const last = points.at(-1) ?? [0, 0];
  const before = points.at(-2) ?? [0, 0];
  const angle = Math.atan2(last[1] - before[1], last[0] - before[0]);
  const head = thickness * 3.2;
  const tip: [number, number] = [
    last[0] + Math.cos(angle) * head,
    last[1] + Math.sin(angle) * head,
  ];
  const side = (sign: number): [number, number] => [
    last[0] + Math.cos(angle + (sign * Math.PI) / 2) * head * 0.7,
    last[1] + Math.sin(angle + (sign * Math.PI) / 2) * head * 0.7,
  ];
  return group(
    poly(
      [
        ...points.map(([px, py]): [number, number] => [px, py - thickness / 2]),
        ...[...points].reverse().map(([px, py]): [number, number] => [px, py + thickness / 2]),
      ],
      fill,
      { name: 'Trend line' },
    ),
    poly([side(-1), tip, side(1)], fill, { name: 'Trend arrow' }),
  );
};

export const systemsPost = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    photo('city-night', 0, 0, W, H, { filters: { ...NO_FILTERS, grayscale: 1 } }),
    rect(0, 0, W, H, linear(180, 'rgba(0,0,0,0.35)', 'rgba(0,0,0,0.85)'), { name: 'Shade' }),
    text('TOOLS THAT\nGIVE YOU TIME\nBACK, NOT\nMORE WORK', 0, 280, W, {
      fontFamily: DISPLAY,
      fontSize: 92,
      fontWeight: 400,
      fill: '#ffffff',
      align: 'center',
      lineHeight: 1.05,
    }),
    trend(
      [
        [80, 1180],
        [380, 1040],
        [560, 1100],
        [880, 860],
      ],
      18,
      theme.brand,
    ),
    footerMark(theme, 80, 1240, '#ffffff'),
  ]);

export const introNumber = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    header(theme, 'Start today', 'Join us'),
    text('01.', 430, 250, 600, {
      fontFamily: HEAD,
      fontSize: 220,
      fontWeight: 800,
      fill: theme.text,
      align: 'right',
    }),
    text(
      'We help SaaS teams ship faster with clear strategy and sharp design.\nNo bloated decks. No guesswork.\nJust launches that land.',
      130,
      560,
      820,
      {
        fontFamily: BODY,
        fontSize: 38,
        fontWeight: 500,
        fill: theme.text,
        lineHeight: 1.45,
      },
    ),
    rect(130, 1020, 950, 330, theme.brand, { name: 'Brand block', cornerRadius: 40 }),
    rect(1040, 1020, 40, 330, theme.brand, { name: 'Brand block edge' }),
    rect(130, 1310, 950, 40, theme.brand, { name: 'Brand block edge' }),
    group(
      rect(190, 1170, 42, 42, theme.onBrand, { cornerRadius: 10, name: 'Mark' }),
      icon('arrow-up-right', 197, 1177, 28, theme.brand, { strokeWidth: 3 }),
      text(BRAND_NAME, 250, 1172, 500, {
        fontFamily: HEAD,
        fontSize: 34,
        fontWeight: 700,
        fill: theme.onBrand,
      }),
    ),
  ]);

export const smartStrategy = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    photo('desk-imac', 0, 0, W, H),
    rect(0, 0, W, H, 'rgba(0,0,0,0.35)', { name: 'Shade' }),
    rect(190, 300, 700, 700, theme.brand, {
      name: 'Card',
      cornerRadius: 50,
      ...shadow(50, 20, 'rgba(0,0,0,0.45)'),
    }),
    ellipse(230, 340, 70, 70, theme.onBrand, { name: 'Plus disc' }),
    icon('plus', 245, 355, 40, theme.brand, { strokeWidth: 3 }),
    text('Smart\ncontent &\nstrategy', 190, 440, 700, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: theme.onBrand,
      align: 'center',
      lineHeight: 1.05,
    }),
    pill('Talk to us', 390, 840, {
      fill: '#0d0d10',
      color: '#ffffff',
      fontSize: 36,
      fontFamily: HEAD,
      fontWeight: 700,
      width: 300,
    }),
    footerMark(theme, 80, 1240, '#ffffff'),
  ]);

export const allInOne = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    rect(210, 170, 660, 1000, linear(160, theme.brand, theme.glow), {
      name: 'Card',
      cornerRadius: 40,
      ...shadow(60, 0, 'rgba(255,106,31,0.45)'),
    }),
    text('Everything in\none place.', 260, 230, 580, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: theme.onBrand,
      lineHeight: 1.08,
    }),
    text('Docs, tasks and launch plans living\nin one shared workspace.', 260, 420, 580, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: theme.onBrand,
      lineHeight: 1.4,
    }),
    [0, 1, 2].map((index) => {
      const x = 300 + index * 50;
      const y = 600 + index * 110;
      return group(
        rect(x, y, 190, 60, 'rgba(0,0,0,0.35)', { cornerRadius: 14, name: 'Folder tab' }),
        rect(x, y + 36, 400, 250, index === 2 ? '#1a1a20' : 'rgba(0,0,0,0.3)', {
          cornerRadius: 18,
          name: 'Folder',
        }),
      );
    }),
    footerMark(theme, 380, 1070, theme.onBrand),
  ]);
