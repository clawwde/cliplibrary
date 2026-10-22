import { IMAGE_FILTER_PRESETS, linear } from '@/design';
import {
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  poly,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const MERIDIAN = {
  navy: '#16233f',
  deep: '#0b1426',
  mid: '#24375f',
  coral: '#ff7a59',
  coralSoft: '#ffa184',
  cream: '#f6f1ea',
  sand: '#e7dfd4',
  white: '#ffffff',
  grey: '#5b6475',
};

export const HEAD = 'Outfit';
export const BODY = 'DM Sans';

const { width: W, height: H } = POST_SIZE;

export const navyBackdrop = (height: number) =>
  rect(0, 0, W, height, linear(165, MERIDIAN.mid, MERIDIAN.deep), { name: 'Background' });

export const coralBackdrop = (height: number) =>
  rect(0, 0, W, height, linear(160, MERIDIAN.coralSoft, MERIDIAN.coral), { name: 'Background' });

export const cta = (
  label: string,
  x: number,
  y: number,
  style: { fill: string; color: string; dot: string; dotIcon: string },
): Nodes[] => {
  const width = label.length * 15 + 120;
  return group(
    rect(x, y, width, 68, style.fill, { cornerRadius: 34, name: `${label} button` }),
    circle(x + 34, y + 34, 24, style.dot),
    icon('arrow-up-right', x + 20, y + 20, 28, style.dotIcon, { strokeWidth: 2.6 }),
    text(label, x + 72, y + 19, width - 84, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 600,
      fill: style.color,
    }),
  );
};

export const ideasHeights = template(W, H, () => [
  rect(0, 0, W, H, linear(180, MERIDIAN.white, MERIDIAN.sand), { name: 'Background' }),
  photo('city-night', 650, 90, 370, 1170, {
    cornerRadius: 185,
    filters: { ...IMAGE_FILTER_PRESETS.mono, brightness: 1.15 },
    crop: { zoom: 2, focusX: 0.5, focusY: 0.5 },
  }),
  text('Where Plans\nBecome', 80, 380, 560, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 400,
    fill: MERIDIAN.navy,
    lineHeight: 1.08,
  }),
  text('Real\nMomentum', 80, 562, 560, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: MERIDIAN.coral,
    lineHeight: 1.04,
  }),
  cta('Scale with us', 80, 820, {
    fill: MERIDIAN.navy,
    color: MERIDIAN.white,
    dot: MERIDIAN.coral,
    dotIcon: MERIDIAN.navy,
  }),
  text('meridian.co', 80, 1220, 400, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: MERIDIAN.grey,
    letterSpacing: 2,
  }),
]);

const zigzag = (x: number, y: number, width: number, height: number) => {
  const teeth = 12;
  const step = width / teeth;
  const bottom: [number, number][] = Array.from({ length: teeth * 2 + 1 }, (_, index) => [
    x + width - (index * step) / 2,
    y + height - (index % 2 === 0 ? 0 : 20),
  ]);
  return poly([[x, y], [x + width, y], ...bottom], MERIDIAN.white, {
    name: 'Receipt',
    ...shadow(30, 16, 'rgba(11,20,38,0.22)'),
  });
};

const BARCODE = [6, 3, 9, 3, 4, 10, 3, 6, 3, 8, 4, 3, 10, 5, 3, 7, 3, 9, 4, 6, 3, 10, 3, 5, 8];

export const receiptPartners = template(W, H, () => [
  coralBackdrop(H),
  rect(220, 260, 640, 70, linear(180, '#f8fafc', '#a3acb9'), {
    cornerRadius: 18,
    name: 'Slot',
    ...shadow(24, 10, 'rgba(0,0,0,0.25)'),
  }),
  rect(260, 300, 560, 12, MERIDIAN.deep, { cornerRadius: 6, name: 'Slit' }),
  zigzag(300, 306, 480, 760),
  text('meridian.co', 300, 360, 480, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 500,
    fill: MERIDIAN.grey,
    align: 'center',
  }),
  rect(350, 410, 380, 3, MERIDIAN.sand, { name: 'Rule' }),
  text('We Craft', 300, 450, 480, {
    fontFamily: HEAD,
    fontSize: 56,
    fontWeight: 400,
    fill: MERIDIAN.navy,
    align: 'center',
  }),
  text('Lasting', 300, 515, 480, {
    fontFamily: HEAD,
    fontSize: 66,
    fontWeight: 800,
    fill: MERIDIAN.coral,
    align: 'center',
  }),
  text('Alliances', 300, 592, 480, {
    fontFamily: HEAD,
    fontSize: 56,
    fontWeight: 400,
    fill: MERIDIAN.navy,
    align: 'center',
  }),
  rect(350, 700, 380, 3, MERIDIAN.sand, { name: 'Rule' }),
  text('Partners who stay for years', 300, 726, 480, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 500,
    fill: MERIDIAN.grey,
    align: 'center',
  }),
  rect(350, 790, 380, 3, MERIDIAN.sand, { name: 'Rule' }),
  BARCODE.reduce<{ x: number; nodes: Nodes[] }>(
    (state, size, index) => ({
      x: state.x + size + 5,
      nodes: [
        ...state.nodes,
        index % 2 === 0 ? rect(state.x, 830, size, 140, MERIDIAN.deep, { name: 'Bar' }) : [],
      ],
    }),
    { x: 380, nodes: [] },
  ).nodes,
  text('Book a partner call this week', 0, 1180, W, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 600,
    fill: MERIDIAN.navy,
    align: 'center',
  }),
]);

export const bigNumber = template(W, H, () => [
  navyBackdrop(H),
  photo('man-portrait-1', 0, 230, 560, 1120, { filters: IMAGE_FILTER_PRESETS.mono }),
  rect(360, 230, 200, 1120, linear(90, 'rgba(14,25,48,0)', '#0f1a32'), { name: 'Fade' }),
  text('7', 500, 90, 540, {
    fontFamily: HEAD,
    fontSize: 640,
    fontWeight: 800,
    fill: linear(180, MERIDIAN.coralSoft, MERIDIAN.coral),
    align: 'center',
    lineHeight: 1,
  }),
  text('Moves That\nDefine the', 580, 860, 460, {
    fontFamily: HEAD,
    fontSize: 60,
    fontWeight: 400,
    fill: MERIDIAN.white,
    lineHeight: 1.1,
  }),
  text('Next Decade', 580, 992, 460, {
    fontFamily: HEAD,
    fontSize: 60,
    fontWeight: 800,
    fill: MERIDIAN.coral,
  }),
  text('Read the full playbook', 580, 1120, 440, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 500,
    fill: MERIDIAN.sand,
  }),
]);

const TABS = ['Audience Insight', 'Budget Planning', 'Workflow Design', 'Risk Review'];

export const strategyTabs = template(W, H, () => [
  navyBackdrop(H),
  text('Our Plan', 0, 150, W, {
    fontFamily: HEAD,
    fontSize: 86,
    fontWeight: 400,
    fill: MERIDIAN.white,
    align: 'center',
  }),
  text('Powers Growth', 0, 248, W, {
    fontFamily: HEAD,
    fontSize: 86,
    fontWeight: 800,
    fill: MERIDIAN.coral,
    align: 'center',
  }),
  TABS.map((label, index) => {
    const y = 560 + index * 150;
    const tabX = index % 2 === 0 ? 110 : 560;
    const fill = index % 2 === 0 ? MERIDIAN.cream : MERIDIAN.white;
    return [
      rect(tabX, y - 62, 410, 80, fill, { cornerRadius: 18, name: 'Tab' }),
      rect(70, y, 940, H - y, fill, {
        cornerRadius: 22,
        name: 'Folder',
        ...shadow(24, -6, 'rgba(0,0,0,0.18)'),
      }),
      text(label, tabX + 30, y - 46, 360, {
        fontFamily: HEAD,
        fontSize: 36,
        fontWeight: 700,
        fill: MERIDIAN.navy,
      }),
    ];
  }),
  rect(0, 1230, W, 120, linear(90, MERIDIAN.coral, MERIDIAN.coralSoft), { name: 'Strip' }),
]);

export const pocketOps = template(W, H, () => [
  coralBackdrop(H),
  rect(320, 120, 440, 800, MERIDIAN.navy, {
    cornerRadius: 70,
    name: 'Phone',
    ...shadow(40, 20, 'rgba(11,20,38,0.35)'),
  }),
  rect(344, 144, 392, 752, MERIDIAN.cream, { cornerRadius: 52, name: 'Screen' }),
  rect(480, 168, 120, 30, MERIDIAN.navy, { cornerRadius: 15, name: 'Island' }),
  text('OPS', 344, 296, 392, {
    fontFamily: HEAD,
    fontSize: 112,
    fontWeight: 800,
    fill: MERIDIAN.navy,
    align: 'center',
    lineHeight: 1,
  }),
  text('ON\nTHE', 344, 408, 392, {
    fontFamily: HEAD,
    fontSize: 112,
    fontWeight: 800,
    fill: MERIDIAN.coral,
    align: 'center',
    lineHeight: 1,
  }),
  text('MOVE', 344, 632, 392, {
    fontFamily: HEAD,
    fontSize: 112,
    fontWeight: 800,
    fill: MERIDIAN.navy,
    align: 'center',
    lineHeight: 1,
  }),
  text('Lead your people', 0, 990, W, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 400,
    fill: MERIDIAN.navy,
    align: 'center',
  }),
  text('from anywhere', 0, 1060, W, {
    fontFamily: HEAD,
    fontSize: 60,
    fontWeight: 800,
    fill: MERIDIAN.white,
    align: 'center',
  }),
]);
