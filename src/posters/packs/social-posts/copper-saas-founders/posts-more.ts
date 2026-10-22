import { linear } from '@/design';
import {
  bars,
  circle,
  ellipse,
  group,
  laptop,
  line,
  POST_SIZE,
  photo,
  pill,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';
import { BODY, backdrop, footerMark, HEAD, header, type SaasTheme, trend } from './posts';

const { width: W, height: H } = POST_SIZE;

export const quotePhone = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    ellipse(540, 40, 500, 500, 'rgba(0,0,0,0)', {
      stroke: theme.brand,
      strokeWidth: 4,
      name: 'Orbit',
    }),
    ellipse(660, 160, 260, 260, 'rgba(0,0,0,0)', {
      stroke: theme.brand,
      strokeWidth: 4,
      name: 'Orbit',
    }),
    rect(150, 380, 640, 420, theme.panel, {
      name: 'Quote card',
      cornerRadius: 30,
      stroke: theme.brand,
      strokeWidth: 3,
    }),
    text(
      '“The launch kit paid for itself in a week. Our trial signups jumped and the team finally had one voice.”',
      200,
      430,
      540,
      {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 500,
        fill: theme.text,
        lineHeight: 1.4,
      },
    ),
    text('Priya Raman, COO', 200, 720, 540, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 700,
      fill: theme.brand,
    }),
    photo('phone-hand-1', 560, 760, 440, 440, { cornerRadius: 220 }),
    footerMark(theme, 80, 1240),
  ]);

export const bookDemo = (theme: SaasTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(160, theme.brand, theme.glow), { name: 'Background' }),
    text('Book', 0, 90, W, {
      fontFamily: HEAD,
      fontSize: 170,
      fontWeight: 800,
      fill: theme.onBrand,
      align: 'center',
      ...shadow(30, 0, 'rgba(255,255,255,0.6)'),
    }),
    text('a Demo', 0, 290, W, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 700,
      fill: theme.onBrand,
      align: 'center',
    }),
    rect(150, 430, 780, 520, '#0d0d10', { name: 'Photo frame', cornerRadius: 24 }),
    photo('desk-imac', 170, 450, 740, 480, { cornerRadius: 16 }),
    text('Launch, optimize and scale\nfrom one simple dashboard.', 0, 1010, W, {
      fontFamily: BODY,
      fontSize: 36,
      fontWeight: 500,
      fill: theme.onBrand,
      align: 'center',
      lineHeight: 1.4,
    }),
    footerMark(theme, 80, 1240, theme.onBrand),
  ]);

const wedge = (cx: number, cy: number, radius: number, fromDeg: number, toDeg: number) => {
  const steps = 8;
  return [
    [cx, cy] as [number, number],
    ...Array.from({ length: steps + 1 }, (_, index): [number, number] => {
      const angle = ((fromDeg + ((toDeg - fromDeg) * index) / steps) * Math.PI) / 180;
      return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
    }),
  ];
};

export const statDonut = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    header(theme, '', 'Join us'),
    circle(340, 440, 260, theme.brand),
    poly(wedge(340, 440, 270, -90, -29), theme.base, { name: 'Remaining share' }),
    circle(340, 440, 180, theme.base),
    text('83%', 160, 380, 360, {
      fontFamily: HEAD,
      fontSize: 110,
      fontWeight: 800,
      fill: theme.text,
      align: 'center',
    }),
    text('Of users want\nsimpler tools', 90, 790, 900, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: theme.text,
      lineHeight: 1.05,
    }),
    text('Keep your product clear.', 90, 1010, 900, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 500,
      fill: theme.muted,
    }),
    footerMark(theme, 90, 1240),
  ]);

const BENEFITS = [
  { label: 'Faster', x: 90, y: 470 },
  { label: 'Secure', x: 760, y: 420 },
  { label: 'Automated', x: 90, y: 900 },
  { label: 'Insightful', x: 740, y: 960 },
] as const;

export const benefitsApp = (theme: SaasTheme) =>
  template(W, H, () => [
    backdrop(theme),
    text('Why teams switch\nto our app', 0, 110, W, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: theme.text,
      align: 'center',
      lineHeight: 1.1,
    }),
    line(250, 505, 120, theme.text, 3),
    line(700, 455, 70, theme.text, 3),
    line(290, 935, 110, theme.text, 3),
    line(670, 995, 80, theme.text, 3),
    laptop(330, 520, 420, {
      screen: theme.panel,
      body: '#2a2a33',
      content: [
        rect(0, 0, 399, 26, theme.brand, { name: 'App bar' }),
        bars(30, 70, 220, 160, [3, 5, 4, 7, 6, 9], theme.brand),
        rect(270, 70, 110, 70, theme.glow, { cornerRadius: 10, name: 'Tile' }),
        rect(270, 160, 110, 70, 'rgba(255,255,255,0.18)', { cornerRadius: 10, name: 'Tile' }),
      ],
    }),
    BENEFITS.map((item) =>
      pill(item.label, item.x, item.y, {
        fill: 'rgba(0,0,0,0)',
        stroke: theme.text,
        strokeWidth: 3,
        color: theme.text,
        fontSize: 32,
        fontFamily: HEAD,
        fontWeight: 600,
        width: 230,
      }),
    ),
    footerMark(theme, 380, 1220),
  ]);

const ROTATIONS = [-8, 10, -14, 18, -6, 12, -10, 6] as const;

export const ourServices = (theme: SaasTheme, title: string, words: readonly string[]) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, theme.brand, theme.glow), { name: 'Background' }),
    text(title, 0, 70, W, {
      fontFamily: 'Bebas Neue',
      fontSize: 200,
      fontWeight: 400,
      fill: 'rgba(0,0,0,0)',
      stroke: theme.onBrand,
      strokeWidth: 4,
      align: 'center',
      ...shadow(24, 0, 'rgba(255,255,255,0.7)'),
    }),
    words.slice(0, 8).map((word, index) => {
      const x = index % 2 === 0 ? 70 : 560;
      const y = 380 + Math.floor(index / 2) * 220;
      const degrees = ROTATIONS[index] ?? 0;
      return rotateNodes(degrees, x + 210, y + 50, [
        rect(x, y, 420, 100, 'rgba(0,0,0,0)', {
          name: 'Word pill',
          cornerRadius: 50,
          stroke: theme.onBrand,
          strokeWidth: 4,
        }),
        text(word, x, y + 24, 420, {
          fontFamily: HEAD,
          fontSize: 46,
          fontWeight: 600,
          fill: theme.onBrand,
          align: 'center',
          uppercase: true,
        }),
      ]);
    }),
  ]);

export const fromZero = (
  theme: SaasTheme,
  copy: { left: string; right: string; tag: string; word: string },
) =>
  template(W, H, () => [
    backdrop(theme),
    header(theme, copy.left, copy.right),
    trend(
      [
        [0, 1080],
        [300, 830],
        [520, 900],
        [960, 360],
      ],
      30,
      theme.brand,
    ),
    group(
      pill(copy.tag, 340, 520, {
        fill: theme.brand,
        color: theme.onBrand,
        fontSize: 40,
        fontFamily: HEAD,
        fontWeight: 600,
        width: 300,
      }),
      text(copy.word, 0, 600, W, {
        fontFamily: HEAD,
        fontSize: 190,
        fontWeight: 800,
        fill: theme.text,
        align: 'center',
        ...shadow(20, 6, 'rgba(0,0,0,0.35)'),
      }),
    ),
    footerMark(theme, 380, 1220),
  ]);
