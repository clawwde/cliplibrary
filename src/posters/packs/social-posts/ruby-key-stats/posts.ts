import { linear } from '@/design';
import {
  bars,
  card,
  circle,
  icon,
  line,
  POST_SIZE,
  path,
  pill,
  rect,
  rotateNodes,
  STORY_SIZE,
  star,
  type Template,
  template,
  text,
} from '../../../kit';

interface StatPalette {
  top: string;
  deep: string;
  accent: string;
  paper: string;
  ink: string;
  soft: string;
}

export const RUBY: StatPalette = {
  top: '#e11d48',
  deep: '#22040c',
  accent: '#fbbf24',
  paper: '#ffffff',
  ink: '#16050a',
  soft: '#fecdd3',
};

export const TEAL: StatPalette = {
  top: '#14b8a6',
  deep: '#032b2a',
  accent: '#a3e635',
  paper: '#ffffff',
  ink: '#04201f',
  soft: '#ccfbf1',
};

const HEAD = 'Plus Jakarta Sans';
const BODY = 'Inter';
const { width: W, height: H } = POST_SIZE;

const background = (p: StatPalette, height = H) =>
  rect(0, 0, W, height, linear(165, p.deep, p.top), { name: 'Background' });

const kicker = (label: string, y: number, fill: string) =>
  text(label, 80, y, 700, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill,
    letterSpacing: 1,
  });

const POINTS = [
  { x: 230, y: 1060, value: '48%', label: 'Workflow\nautomation' },
  { x: 520, y: 900, value: '71%', label: 'Customer\nretention' },
  { x: 820, y: 800, value: '86%', label: 'Speed to\nlaunch' },
];

export const leadersChart = (p: StatPalette) =>
  template(W, H, () => [
    background(p),
    kicker('Growth report 2026', 90, p.soft),
    text('Where top teams\nare investing now', 80, 140, 900, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1.1,
    }),
    star(5, 900, 80, 110, p.accent, { innerRatio: 0.42 }),
    path(
      'M0 1160 C 120 1140 180 1080 230 1060 S 420 960 520 900 S 700 820 820 800 S 1000 770 1080 760',
      0,
      0,
      W,
      H,
      'rgba(0,0,0,0)',
      { width: W, height: H },
      { stroke: p.paper, strokeWidth: 6, name: 'Trend line' },
    ),
    POINTS.map((point) => [
      text(point.value, point.x - 110, point.y - 300, 220, {
        fontFamily: HEAD,
        fontSize: 68,
        fontWeight: 800,
        fill: p.paper,
        align: 'center',
      }),
      text(point.label, point.x - 110, point.y - 214, 220, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 500,
        fill: p.soft,
        align: 'center',
        lineHeight: 1.25,
      }),
      line(point.x, point.y - 140, 120, p.soft, 3, { dashed: true, rotation: 90 }),
      circle(point.x, point.y, 16, p.accent),
    ]),
    text('Want numbers like these? Send us a message.', 0, 1250, W, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 500,
      fill: p.soft,
      align: 'center',
    }),
  ]);

const bubble = (
  cx: number,
  cy: number,
  r: number,
  value: string,
  label: string,
  p: StatPalette,
) => [
  circle(cx, cy, r, 'rgba(0,0,0,0.32)', { stroke: p.soft, strokeWidth: 3 }),
  text(value, cx - r, cy - r * 0.42, r * 2, {
    fontFamily: HEAD,
    fontSize: r * 0.44,
    fontWeight: 800,
    fill: p.paper,
    align: 'center',
  }),
  text(label, cx - r, cy + r * 0.18, r * 2, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 500,
    fill: p.soft,
    align: 'center',
  }),
];

const caseBubbles = (p: StatPalette) =>
  template(W, H, () => [
    background(p),
    text('Where AI pays off\nfor small teams', 80, 100, 920, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1.1,
    }),
    text('How owners use AI to grow faster.\nWhere would you start?', 80, 270, 920, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 400,
      fill: p.soft,
      lineHeight: 1.35,
    }),
    bubble(310, 760, 180, '64%', 'Content creation', p),
    text('Lead generation', 600, 470, 240, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 600,
      fill: p.paper,
      align: 'center',
    }),
    star(5, 560, 520, 320, p.paper, { innerRatio: 0.48 }),
    text('49%', 620, 668, 200, {
      fontFamily: HEAD,
      fontSize: 58,
      fontWeight: 800,
      fill: p.ink,
      align: 'center',
    }),
    bubble(720, 1050, 150, '57%', 'Smart support', p),
    star(5, 200, 1000, 190, p.accent, { innerRatio: 0.48 }),
    text('22%', 215, 1090, 160, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 800,
      fill: p.ink,
      align: 'center',
    }),
    text('Admin tasks', 160, 1220, 280, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 600,
      fill: p.paper,
      align: 'center',
    }),
  ]);

const RESULTS = [
  { label: 'Engagement up\nby 32%', x: 100, y: 420, tilt: -3 },
  { label: 'Bounce rate down\nby 18%', x: 200, y: 690, tilt: 2.5 },
  { label: 'Mobile sales up\nby 24%', x: 120, y: 960, tilt: -2 },
];

const results = (p: StatPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, '#fff7f8', { name: 'Background' }),
    kicker('Client wins', 90, p.top),
    text('The results our\nclients saw', 80, 140, 900, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: p.ink,
      lineHeight: 1.1,
    }),
    star(5, 80, 330, 64, p.top, { innerRatio: 0.42, rotation: -10 }),
    RESULTS.map((item) =>
      rotateNodes(item.tilt, item.x + 390, item.y + 110, [
        card(item.x, item.y, 780, 220, { radius: 22 }),
        circle(item.x + 110, item.y + 110, 58, p.top),
        icon('trending-up', item.x + 78, item.y + 78, 64, p.paper),
        text(item.label, item.x + 205, item.y + 56, 560, {
          fontFamily: BODY,
          fontSize: 42,
          fontWeight: 600,
          fill: p.ink,
          lineHeight: 1.2,
        }),
      ]),
    ),
    star(5, 890, 1200, 110, p.accent, { innerRatio: 0.42 }),
  ]);

export const bigStat = (p: StatPalette) =>
  template(W, H, () => [
    background(p),
    star(5, 880, 80, 120, p.accent, { innerRatio: 0.42 }),
    text('73%', 80, 110, 700, {
      fontFamily: HEAD,
      fontSize: 200,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1,
    }),
    text('of small businesses spend\n20+ hours a week on tasks\nAI could handle', 80, 350, 920, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 700,
      fill: p.paper,
      lineHeight: 1.2,
    }),
    text('Brightline Ops Survey 2026, 1,200 owners', 80, 560, 920, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 500,
      fill: p.soft,
    }),
    bars(
      80,
      720,
      920,
      630,
      [58, 34, 82, 100],
      linear(180, p.paper, 'rgba(255,255,255,0.15)'),
      0.22,
    ),
  ]);

const growAt = (p: StatPalette, height: number): Template => {
  const shift = height > H ? 260 : 0;
  return template(W, height, () => [
    rect(0, 0, W, height, p.ink, { name: 'Background' }),
    [0, 1, 2, 3].map((index) =>
      rect(80 + index * 200, 110 + shift, 180, 12, index === 1 ? p.top : '#3f3f46', {
        cornerRadius: 6,
        name: 'Progress segment',
      }),
    ),
    star(5, 900, 70 + shift, 90, p.paper, { innerRatio: 0.42 }),
    text('Grow', 80, 220 + shift, 900, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 800,
      fill: p.top,
    }),
    text('Your Profit\nWith Us', 80, 330 + shift, 900, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1.1,
    }),
    text('92%', 80, 590 + shift, 400, {
      fontFamily: HEAD,
      fontSize: 140,
      fontWeight: 800,
      fill: p.paper,
    }),
    circle(470, 680 + shift, 56, p.top),
    icon('arrow-up-right', 438, 648 + shift, 64, p.paper, { strokeWidth: 2.5 }),
    star(5, 80, 860 + shift, 50, p.top, { innerRatio: 0.42 }),
    text(
      'Grow sales with a proven playbook\nbuilt to keep your business\nmoving forward every month.',
      160,
      860 + shift,
      860,
      {
        fontFamily: BODY,
        fontSize: 34,
        fontWeight: 400,
        fill: '#d4d4d8',
        lineHeight: 1.4,
      },
    ),
    pill('Book a free growth call', 160, 1110 + shift * 1.6, {
      fill: p.top,
      color: p.paper,
      fontSize: 34,
      fontFamily: BODY,
      fontWeight: 700,
    }),
  ]);
};

export const growProfit = (p: StatPalette) => growAt(p, H);

export const growStory = growAt(RUBY, STORY_SIZE.height);

export const POSTS: readonly [Template, Template, Template, Template, Template] = [
  leadersChart(RUBY),
  caseBubbles(RUBY),
  results(RUBY),
  bigStat(RUBY),
  growProfit(RUBY),
];
