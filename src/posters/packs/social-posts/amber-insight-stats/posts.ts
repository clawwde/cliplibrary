import {
  circle,
  icon,
  line,
  POST_SIZE,
  path,
  rect,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

export interface StatPalette {
  brand: string;
  deep: string;
  paper: string;
  muted: string;
}

export const AMBER: StatPalette = {
  brand: '#ffb020',
  deep: '#1b1740',
  paper: '#ffffff',
  muted: '#b9b4dc',
};

export const SKY: StatPalette = {
  brand: '#38bdf8',
  deep: '#0b1e33',
  paper: '#ffffff',
  muted: '#a9c4dc',
};

export const HEAD = 'Sora';
export const BODY = 'Manrope';
export const { width: W, height: H } = POST_SIZE;

const resultCard = (
  x: number,
  y: number,
  label: string,
  name: 'trending-up' | 'trending-down',
  filled: boolean,
  p: StatPalette,
) => [
  rect(x, y, 760, 170, filled ? p.brand : p.paper, {
    cornerRadius: 22,
    name: 'Result card',
    shadow: { color: 'rgba(0,0,0,0.35)', blur: 30, offsetX: 0, offsetY: 12 },
  }),
  circle(x + 90, y + 85, 50, filled ? p.deep : p.brand),
  icon(name, x + 62, y + 57, 56, filled ? p.brand : p.deep, { strokeWidth: 2.6 }),
  text(label, x + 175, y + 40, 560, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 600,
    fill: p.deep,
    lineHeight: 1.25,
  }),
];

export const resultsList = (p: StatPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    text('BOOST ENGAGEMENT', 100, 110, 700, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 700,
      fill: p.muted,
      letterSpacing: 3,
    }),
    text("The results we've\ncome up with", 100, 160, 900, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 700,
      fill: p.paper,
      lineHeight: 1.15,
    }),
    resultCard(160, 470, 'Engagement rose\nby 25 percent', 'trending-up', false, p),
    resultCard(240, 690, 'Bounce rate fell\nby 15 percent', 'trending-down', true, p),
    resultCard(160, 910, 'Mobile sales climbed\nby 20 percent', 'trending-up', false, p),
    star(5, 50, 560, 110, p.brand, { innerRatio: 0.45 }),
    star(5, 890, 1110, 120, p.paper, { innerRatio: 0.45 }),
  ]);

const CHART_POINTS = [
  { x: 292, y: 1135, value: '51%', label: 'AI tools', top: 860 },
  { x: 685, y: 1035, value: '72%', label: 'New clients', top: 680 },
  { x: 880, y: 972, value: '85%', label: 'Faster delivery', top: 520 },
];

export const leadersChart = (p: StatPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    text('REVENUE PLANNING', 90, 110, 700, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 700,
      fill: p.deep,
      letterSpacing: 3,
    }),
    text('Where leaders', 90, 160, 900, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 700,
      fill: p.paper,
    }),
    text('are focusing now', 90, 245, 900, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 700,
      fill: p.deep,
    }),
    star(5, 880, 60, 110, p.deep, { innerRatio: 0.45 }),
    path(
      'M80 1180 C300 1180 300 1090 460 1090 C640 1090 700 990 1000 950',
      0,
      0,
      W,
      H,
      'rgba(0,0,0,0)',
      { width: W, height: H },
      { stroke: p.deep, strokeWidth: 8, name: 'Trend line' },
    ),
    CHART_POINTS.map((point) => [
      line(point.x, point.top + 150, point.y - point.top - 150, p.deep, 3, {
        rotation: 90,
        name: 'Leader line',
      }),
      circle(point.x, point.y, 16, p.paper, { stroke: p.deep, strokeWidth: 6 }),
      text(point.value, point.x - 120, point.top, 240, {
        fontFamily: HEAD,
        fontSize: 72,
        fontWeight: 700,
        fill: p.deep,
        align: 'center',
      }),
      text(point.label, point.x - 120, point.top + 92, 240, {
        fontFamily: BODY,
        fontSize: 28,
        fontWeight: 600,
        fill: p.deep,
        align: 'center',
      }),
    ]),
    star(5, 960, 860, 90, p.paper, { innerRatio: 0.45 }),
    text('Need a plan? Send us a message.', 90, 1250, 900, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 600,
      fill: p.deep,
    }),
  ]);

export const growProfit = (p: StatPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    [0, 1, 2, 3].map((index) =>
      rect(100 + index * 190, 110, 160, 14, index === 1 ? p.brand : 'rgba(255,255,255,0.3)', {
        cornerRadius: 7,
        name: 'Progress segment',
      }),
    ),
    star(5, 900, 60, 120, p.paper, { innerRatio: 0.45 }),
    text('Grow', 100, 260, 800, {
      fontFamily: HEAD,
      fontSize: 110,
      fontWeight: 700,
      fill: p.brand,
    }),
    text('your profit\nwith us', 100, 390, 900, {
      fontFamily: HEAD,
      fontSize: 110,
      fontWeight: 700,
      fill: p.paper,
      lineHeight: 1.1,
    }),
    text('92%', 100, 660, 500, {
      fontFamily: HEAD,
      fontSize: 170,
      fontWeight: 700,
      fill: p.paper,
    }),
    circle(640, 770, 70, p.brand),
    icon('arrow-up-right', 595, 725, 90, p.deep, { strokeWidth: 3 }),
    star(5, 40, 940, 70, p.brand, { innerRatio: 0.45 }),
    text(
      'Lift revenue with our proven playbook, built to give small teams steady, measurable growth month after month.',
      140,
      980,
      820,
      {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 500,
        fill: p.muted,
        lineHeight: 1.45,
      },
    ),
  ]);
