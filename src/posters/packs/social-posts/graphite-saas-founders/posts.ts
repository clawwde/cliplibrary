import { linear } from '@/design';
import {
  avatar,
  bars,
  checklist,
  circle,
  icon,
  line,
  POST_SIZE,
  path,
  photo,
  pill,
  rating,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export interface SaasPalette {
  top: string;
  deep: string;
  accent: string;
  paper: string;
  soft: string;
  card: string;
  onAccent: string;
}

export const LIME: SaasPalette = {
  top: '#26330f',
  deep: '#0b0d10',
  accent: '#c6f432',
  paper: '#ffffff',
  soft: '#aab3a0',
  card: '#171b20',
  onAccent: '#0b0d10',
};

export const LILAC: SaasPalette = {
  top: '#8b5cf6',
  deep: '#2e1065',
  accent: '#f5d0fe',
  paper: '#ffffff',
  soft: '#ddd6fe',
  card: '#3b1a7a',
  onAccent: '#2e1065',
};

export const HEAD = 'Space Grotesk';
export const BODY = 'Inter';
export const { width: W, height: H } = POST_SIZE;

export const base = (p: SaasPalette, label: string) => [
  rect(0, 0, W, H, linear(170, p.deep, p.top), { name: 'Background' }),
  rect(70, 70, label.length * 14 + 48, 52, 'rgba(0,0,0,0)', {
    cornerRadius: 26,
    stroke: p.soft,
    strokeWidth: 2,
    name: 'Section tag',
  }),
  text(label, 70, 83, label.length * 14 + 48, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 600,
    fill: p.paper,
    align: 'center',
  }),
  line(label.length * 14 + 140, 96, 260, p.soft, 2),
];

export const brandMark = (p: SaasPalette, x: number, y: number) =>
  text('Vectra Labs', x, y, 240, {
    fontFamily: HEAD,
    fontSize: 26,
    fontWeight: 700,
    fill: p.soft,
  });

const globeDots = (p: SaasPalette) =>
  Array.from({ length: 30 * 15 }, (_, index) => {
    const column = index % 30;
    const row = Math.floor(index / 30);
    const x = 120 + column * 29;
    const y = 935 + row * 28;
    const inside = (x - 540) ** 2 + (y - 1350) ** 2 < 420 ** 2 && y < 1335;
    const land = (column * 7 + row * 13 + Math.floor(column / 4) * 5) % 9 < 4;
    return inside && land ? [circle(x, y, 6, p.accent, { opacity: 0.55 })] : [];
  });

export const globalCoverage = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Product demo'),
    brandMark(p, 800, 82),
    text('Global reach,', 0, 290, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 500,
      fill: p.paper,
      align: 'center',
    }),
    text('Local speed', 0, 385, W, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 700,
      fill: p.accent,
      align: 'center',
      ...shadow(30, 0, p.accent),
    }),
    pill('Start free today', 370, 540, {
      fill: p.card,
      color: p.paper,
      stroke: p.accent,
      strokeWidth: 2,
      fontSize: 32,
      fontFamily: BODY,
      width: 340,
    }),
    path(
      'M 90 1350 A 450 450 0 0 1 990 1350 Z',
      0,
      0,
      W,
      H,
      linear(180, p.card, p.deep),
      { width: W, height: H },
      { stroke: p.accent, strokeWidth: 4, name: 'Globe' },
    ),
    path(
      'M 240 1350 A 300 450 0 0 1 840 1350',
      0,
      0,
      W,
      H,
      'rgba(0,0,0,0)',
      { width: W, height: H },
      { stroke: p.soft, strokeWidth: 2, name: 'Meridian' },
    ),
    path(
      'M 390 1350 A 150 450 0 0 1 690 1350',
      0,
      0,
      W,
      H,
      'rgba(0,0,0,0)',
      { width: W, height: H },
      { stroke: p.soft, strokeWidth: 2, name: 'Meridian' },
    ),
    line(116, 1200, 848, p.soft, 2),
    line(205, 1050, 670, p.soft, 2),
    globeDots(p),
  ]);

export const aiAnalytics = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Feature breakdown'),
    text('AI Analytics', 0, 200, W, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 700,
      fill: p.paper,
      align: 'center',
    }),
    text('See what drives growth, in real time.', 0, 330, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: p.soft,
      align: 'center',
    }),
    rect(110, 430, 860, 560, p.card, {
      cornerRadius: 28,
      stroke: 'rgba(255,255,255,0.1)',
      strokeWidth: 2,
      name: 'Dashboard',
    }),
    text('Weekly revenue', 160, 475, 400, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 500,
      fill: p.soft,
    }),
    text('$48.2k', 160, 515, 400, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 700,
      fill: p.paper,
    }),
    pill('+18%', 790, 490, {
      fill: p.accent,
      color: p.onAccent,
      fontSize: 28,
      fontFamily: BODY,
      fontWeight: 700,
      width: 130,
    }),
    bars(160, 640, 760, 310, [40, 62, 48, 80, 66, 92, 74], p.accent, 0.4),
    checklist(
      ['Spot trends before they peak', 'Forecast with one click', 'Share reports with your team'],
      150,
      1050,
      820,
      { color: p.paper, iconColor: p.accent, fontSize: 32, gap: 62 },
    ),
  ]);

export const quoteCard = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'User reviews'),
    rect(170, 330, 760, 760, 'rgba(0,0,0,0)', {
      cornerRadius: 24,
      stroke: p.paper,
      strokeWidth: 3,
      name: 'Quote frame',
    }),
    rect(110, 250, 150, 150, p.deep, { cornerRadius: 20, name: 'Quote backdrop' }),
    icon('quote', 120, 260, 130, p.accent, { strokeWidth: 2.4 }),
    text(
      'Time is money.\nWith Vectra we\nsave hours every\nweek and win\nmore customers.',
      230,
      430,
      660,
      {
        fontFamily: HEAD,
        fontSize: 60,
        fontWeight: 700,
        fill: p.paper,
        lineHeight: 1.22,
      },
    ),
    text('Maya Chen, founder at Brightpath', 230, 900, 660, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 500,
      fill: p.soft,
    }),
    rect(820, 1020, 150, 150, p.deep, { cornerRadius: 20, name: 'Quote backdrop' }),
    icon('quote', 830, 1030, 130, p.accent, { strokeWidth: 2.4 }),
    brandMark(p, 80, 1260),
  ]);

export const feedbackWall = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'User reviews'),
    Array.from({ length: 5 }, (_, index) =>
      text('Feedback', 40, 170 + index * 230, 1040, {
        fontFamily: HEAD,
        fontSize: 200,
        fontWeight: 700,
        fill: 'rgba(255,255,255,0.08)',
        lineHeight: 1,
      }),
    ),
    rect(250, 440, 620, 470, p.paper, {
      cornerRadius: 26,
      name: 'Review card',
      ...shadow(40, 18, 'rgba(0,0,0,0.4)'),
    }),
    avatar('woman-portrait-4', 335, 530, 50),
    text('Lena Ortiz', 405, 488, 400, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 700,
      fill: '#111827',
    }),
    rating(405, 538, 28, 5, '#f59e0b'),
    text(
      'Clear, fast and easy to set\nup. Our reports now take\nminutes instead of days.\nA real time saver.',
      295,
      620,
      540,
      {
        fontFamily: BODY,
        fontSize: 30,
        fontWeight: 500,
        fill: '#374151',
        lineHeight: 1.4,
      },
    ),
    brandMark(p, 800, 1260),
  ]);

export const clientsCount = (p: SaasPalette) =>
  template(W, H, () => [
    base(p, 'Client stories'),
    text('300+', 70, 250, 800, {
      fontFamily: HEAD,
      fontSize: 230,
      fontWeight: 700,
      fill: p.accent,
      lineHeight: 1,
    }),
    text('happy clients use our\ngrowth services', 70, 520, 900, {
      fontFamily: HEAD,
      fontSize: 54,
      fontWeight: 600,
      fill: p.paper,
      lineHeight: 1.15,
    }),
    pill('Let us talk', 70, 720, {
      fill: p.accent,
      color: p.onAccent,
      fontSize: 34,
      fontFamily: BODY,
      fontWeight: 700,
      width: 260,
    }),
    circle(380, 760, 40, p.paper),
    icon('arrow-right', 358, 738, 44, p.onAccent, { strokeWidth: 2.5 }),
    photo('man-portrait-2', 600, 780, 400, 500, { cornerRadius: 30 }),
    brandMark(p, 80, 1260),
  ]);
