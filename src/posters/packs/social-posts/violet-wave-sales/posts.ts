import { linear } from '@/design';
import {
  circle,
  icon,
  POST_SIZE,
  photo,
  pill,
  rect,
  rotateNodes,
  template,
  text,
} from '../../../kit';

export const PW = {
  violet: '#5b3df5',
  violetDeep: '#3a22c4',
  ink: '#14112b',
  lilac: '#e4defe',
  white: '#ffffff',
  grey: '#7a7690',
};

export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

type TextStyle = Parameters<typeof text>[4];

const font =
  (fontWeight: number, lineHeight: number) =>
  (
    content: string,
    x: number,
    y: number,
    width: number,
    size: number,
    fill: string,
    style: TextStyle = {},
  ) =>
    text(content, x, y, width, {
      fontFamily: 'Poppins',
      fontSize: size,
      fontWeight,
      fill,
      lineHeight,
      ...style,
    });

export const heavy = font(800, 1.05);
export const bold = font(700, 1.2);
export const copy = font(400, 1.4);

export const tag = (
  label: string,
  x: number,
  y: number,
  fill: string,
  color: string,
  fontSize: number,
  stroke?: string,
) =>
  pill(label, x, y, {
    fill,
    color,
    fontSize,
    fontFamily: 'Poppins',
    fontWeight: 700,
    stroke: stroke ?? fill,
    strokeWidth: stroke === undefined ? 0 : 4,
  });

export const handle = (y: number, color: string) =>
  copy('pulsewave.media', 0, y, W, 26, color, {
    align: 'center',
    fontWeight: 600,
    letterSpacing: 2,
  });

const STACK = [
  { label: 'Build', x: 200, fill: PW.white, color: PW.ink, angle: -4 },
  { label: 'Your', x: 560, fill: PW.ink, color: PW.white, angle: 6 },
  { label: 'Social Media', x: 170, fill: PW.white, color: PW.ink, angle: -2 },
  { label: 'Branding', x: 260, fill: PW.ink, color: PW.white, angle: 3 },
  { label: 'Through', x: 200, fill: PW.white, color: PW.ink, angle: -3 },
  { label: 'Our Team', x: 300, fill: PW.ink, color: PW.white, angle: 2 },
] as const;

export const buildPills = template(W, H, () => [
  rect(0, 0, W, H, linear(165, PW.violet, PW.violetDeep), { name: 'Background' }),
  STACK.map((item, index) => {
    const y = 200 + index * 145;
    return rotateNodes(item.angle, item.x + 200, y + 76, [
      tag(item.label, item.x, y, item.fill, item.color, 64, PW.ink),
    ]);
  }),
  icon('navigation', 700, 800, 110, PW.white, { strokeWidth: 2, rotation: -90 }),
  handle(1230, PW.lilac),
]);

const notice = (x: number, y: number, title: string, detail: string) => [
  rect(x, y, 440, 104, PW.ink, { cornerRadius: 52, name: 'Notification' }),
  circle(x + 52, y + 52, 34, PW.violet),
  icon('bell', x + 32, y + 32, 40, PW.white, { strokeWidth: 2.2 }),
  bold(title, x + 104, y + 18, 320, 26, PW.white),
  copy(detail, x + 104, y + 52, 320, 22, PW.lilac),
];

export const opportunities = template(W, H, () => [
  rect(0, 0, W, H, PW.white, { name: 'Background' }),
  copy('Tap into New', 0, 110, W, 60, PW.ink, { align: 'center' }),
  heavy('Opportunities', 0, 195, W, 96, PW.violet, { align: 'center' }),
  rect(270, 400, 540, 760, PW.violet, { cornerRadius: 44, name: 'Photo block' }),
  photo('man-portrait-3', 300, 430, 480, 700, { cornerRadius: 30 }),
  notice(560, 700, 'Notification', 'Engagement up 158%'),
  notice(80, 930, 'Notification', 'Search traffic up 250%'),
  handle(1240, PW.grey),
]);

export const unlockInsights = template(W, H, () => [
  rect(0, 0, W, H, PW.ink, { name: 'Background' }),
  photo('woman-portrait-5', 0, 0, W, H, { crop: { zoom: 1, focusX: 0.6, focusY: 0.3 } }),
  rect(0, 0, W, H, linear(90, 'rgba(20,17,43,0.55)', 'rgba(20,17,43,0)'), { name: 'Shade' }),
  rect(70, 380, 580, 580, PW.violet, { cornerRadius: 40, name: 'Card' }),
  copy('Unlock\nExclusive', 115, 420, 500, 66, PW.white, { fontWeight: 500, lineHeight: 1.15 }),
  tag('Sales Insights', 115, 600, PW.ink, PW.white, 40),
  tag('Delivered Daily', 115, 712, PW.ink, PW.white, 40),
  circle(143, 878, 28, PW.white),
  icon('arrow-right', 125, 860, 36, PW.ink, { strokeWidth: 2.6 }),
  copy('Learn More', 190, 856, 300, 34, PW.white, { fontWeight: 600 }),
]);

const VERBS = [
  { word: 'Convert', alpha: 0.4 },
  { word: 'Engage', alpha: 0.65 },
  { word: 'Authorize', alpha: 1 },
  { word: 'Visualize', alpha: 0.65 },
  { word: 'Position', alpha: 0.4 },
  { word: 'Retain', alpha: 0.22 },
] as const;

export const verbList = template(W, H, () => [
  rect(0, 0, W, H, linear(165, PW.violet, PW.violetDeep), { name: 'Background' }),
  VERBS.map((verb, index) => {
    const y = 200 + index * 150;
    const active = verb.alpha === 1;
    return [
      active ? icon('arrow-right', 90, y + 18, 96, PW.white, { strokeWidth: 2.6 }) : [],
      heavy(verb.word, active ? 210 : 90, y, 860, 104, `rgba(255,255,255,${verb.alpha})`),
    ];
  }),
  handle(1230, PW.lilac),
]);
