import { linear } from '@/design';
import { circle, icon, pill, rect, template, text } from '../../../kit';
import {
  backdrop,
  brandMark,
  darkTile,
  glass,
  H,
  HEAD,
  type SaasPalette,
  title,
  W,
  WHITE,
} from './posts';

const ORBIT = [
  ['sparkles', 300, 610],
  ['zap', 780, 610],
  ['workflow', 300, 1030],
  ['brain', 780, 1030],
] as const;

export const aiAutomations = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('AI Automations', 130, 90),
    title('A solution built for you.', 245, 44, p.accent, 600),
    pill('Learn more', 390, 340, {
      fill: p.deep,
      color: WHITE,
      fontSize: 34,
      fontFamily: HEAD,
      fontWeight: 700,
      width: 300,
      stroke: 'rgba(255,255,255,0.4)',
      strokeWidth: 2,
    }),
    circle(540, 820, 250, 'rgba(255,255,255,0.1)', {
      stroke: 'rgba(255,255,255,0.35)',
      strokeWidth: 2,
      name: 'Orbit',
    }),
    circle(540, 820, 150, linear(180, p.top, p.deep), { name: 'Core' }),
    icon('bot', 450, 730, 180, WHITE, { strokeWidth: 1.6 }),
    ORBIT.map(([name, cx, cy]) => [
      circle(cx, cy, 56, p.deep, { stroke: p.accent, strokeWidth: 3, name: 'Satellite' }),
      icon(name, cx - 30, cy - 30, 60, p.accent, { strokeWidth: 2 }),
    ]),
    brandMark(p),
  ]);

export const newFeature = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('New Feature', 150, 100),
    title('Check your app today!', 275, 46, WHITE, 600),
    glass(150, 420, 780, 560, 40),
    icon('folder', 220, 490, 180, WHITE, { strokeWidth: 1.4 }),
    text('Smart Inbox', 440, 520, 460, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 800,
      fill: WHITE,
    }),
    text('Version 2.4 · 38.6 MB', 440, 595, 460, { fontSize: 30, fontWeight: 500, fill: p.accent }),
    rect(220, 780, 640, 120, p.deep, { cornerRadius: 60, name: 'Progress track' }),
    rect(256, 818, 470, 44, p.accent, { cornerRadius: 22, name: 'Progress' }),
    icon('circle-check', 752, 802, 76, WHITE, { strokeWidth: 2 }),
    brandMark(p),
  ]);

export const getInformed = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('Get informed', 120, 100),
    title('Turn on alerts and win $100', 245, 42, p.accent, 600),
    rect(290, 400, 500, 950, '#0b0b0f', { cornerRadius: 70, name: 'Phone body' }),
    rect(310, 420, 460, 930, linear(180, '#f8fafc', p.accent), {
      cornerRadius: 56,
      name: 'Phone screen',
    }),
    rect(470, 440, 140, 40, '#0b0b0f', { cornerRadius: 20, name: 'Dynamic island' }),
    rect(200, 680, 680, 180, 'rgba(255,255,255,0.94)', {
      cornerRadius: 34,
      stroke: 'rgba(255,255,255,1)',
      strokeWidth: 2,
      name: 'Notification',
    }),
    circle(290, 770, 50, p.mid),
    icon('bell', 262, 742, 56, WHITE, { strokeWidth: 2.2 }),
    text('Notification', 370, 712, 480, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 800,
      fill: p.deep,
    }),
    text('A reward is waiting for you', 370, 774, 480, {
      fontSize: 30,
      fontWeight: 500,
      fill: '#475569',
    }),
    brandMark(p, 1230, p.deep),
  ]);

const STEPS = [
  'Know your audience and the\nproblem they need solved.',
  'Post one useful idea a day\nand reply to every comment.',
  'Track what works, then\ndouble down every week.',
];

export const threeSteps = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    title('3 Steps to Boost', 120, 84),
    title('Engagement', 225, 70, p.accent, 600),
    STEPS.map((step, index) => {
      const y = 400 + index * 250;
      return [
        glass(110, y, 860, 200, 36),
        circle(215, y + 100, 58, p.deep, { stroke: p.accent, strokeWidth: 3, name: 'Step badge' }),
        text(String(index + 1).padStart(2, '0'), 157, y + 74, 116, {
          fontFamily: HEAD,
          fontSize: 44,
          fontWeight: 800,
          fill: WHITE,
          align: 'center',
        }),
        text(step, 310, y + 52, 620, {
          fontSize: 34,
          fontWeight: 500,
          fill: WHITE,
          lineHeight: 1.35,
        }),
      ];
    }),
    brandMark(p),
  ]);

const SLIDERS = [0.3, 0.55, 0.2, 0.7, 0.45, 0.6];

export const clearDecision = (p: SaasPalette) =>
  template(W, H, () => [
    backdrop(p),
    SLIDERS.map((level, index) => {
      const x = 190 + index * 140;
      return [
        rect(x - 30, 150, 60, 440, 'rgba(255,255,255,0.15)', {
          cornerRadius: 30,
          name: 'Slider track',
        }),
        circle(x, 150 + 30 + level * 380, 36, index === 3 ? p.accent : WHITE),
      ];
    }),
    darkTile(p, 140, 670, 800, 420),
    title('Clear decisions', 720, 76),
    title('based on clear data', 815, 50, p.accent, 600),
    pill('Try it now', 400, 940, {
      fill: WHITE,
      color: p.deep,
      fontSize: 36,
      fontFamily: HEAD,
      fontWeight: 800,
      width: 280,
    }),
    brandMark(p),
  ]);
