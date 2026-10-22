import { linear } from '@/design';
import { circle, icon, photo, rect, template } from '../../../kit';
import { body, darkBg, EV, GRAY, glass, head, lightBg, SH, SW } from './theme';

export const coverSlide = template(SW, SH, () => [
  darkBg(),
  circle(960, 540, 510, 'rgba(95,211,168,0.06)', {
    stroke: EV.emerald,
    strokeWidth: 26,
  }),
  circle(960, 540, 430, 'rgba(0,0,0,0)', {
    stroke: 'rgba(95,211,168,0.3)',
    strokeWidth: 4,
  }),
  circle(960, 540, 360, EV.forest, {
    stroke: 'rgba(95,211,168,0.22)',
    strokeWidth: 3,
  }),
  body('fernbrook.ai', 0, 330, SW, 28, EV.soft, { align: 'center', letterSpacing: 2 }),
  head('AI Platform\nPitch Deck', 0, 390, SW, 100, EV.white, {
    align: 'center',
    fontWeight: 800,
  }),
  body('Powering the next generation of\nself-running operations', 0, 640, SW, 30, EV.mint, {
    align: 'center',
  }),
]);

const CHAPTERS = ['Overview', 'Platform', 'Our team', 'Pricing', 'Metrics', 'Roadmap'];

export const contentsSlide = template(SW, SH, () => [
  lightBg(),
  photo('workspace-1', 140, 140, 560, 440, { cornerRadius: 24, ...GRAY }),
  head('Table of\nContents', 140, 660, 600, 96, EV.ink, { fontWeight: 600 }),
  CHAPTERS.map((chapter, index) => [
    head(chapter.toUpperCase(), 1000, 190 + index * 120, 560, 54, EV.ink, {
      fontWeight: 500,
    }),
    head(String(index + 1).padStart(2, '0'), 1580, 190 + index * 120, 200, 54, EV.emerald, {
      align: 'right',
    }),
  ]),
]);

const TILES = ['Automation', 'Insights', 'Security', 'Workflows', 'Forecasts', 'Support'];

const tileRow = (labels: readonly string[], y: number, opacity: number) =>
  labels.map((label, column) => {
    const x = 140 + column * 240;
    const top = y + (column === 1 ? -50 : 0);
    return [
      rect(x, top, 210, 250, linear(180, 'rgba(95,211,168,0.55)', 'rgba(47,158,124,0.12)'), {
        name: 'Glass tile',
        cornerRadius: 18,
        stroke: 'rgba(255,255,255,0.25)',
        strokeWidth: 2,
        opacity,
      }),
      body(label, x + 20, top + 20, 180, 22, EV.white, { opacity: opacity * 0.9 }),
    ];
  });

export const welcomeSlide = template(SW, SH, () => [
  darkBg(),
  tileRow(TILES.slice(0, 3), 150, 1),
  tileRow(TILES.slice(3), 440, 1),
  tileRow(['', '', ''], 730, 0.22),
  head('Welcome to', 1000, 190, 800, 80, EV.white),
  head('Fernbrook AI', 1000, 280, 800, 80, EV.mint),
  body(
    'Fernbrook replaces repetitive busywork with an intelligent layer that forecasts demand, routes tasks and keeps every team in sync. Built for scale, tuned for people.',
    1000,
    420,
    780,
    30,
    EV.soft,
  ),
  rect(1000, 870, 60, 6, EV.mint, { name: 'Rule', cornerRadius: 3 }),
  head('FERNBROOK', 1000, 900, 600, 36, EV.white, { letterSpacing: 6 }),
]);

export const quoteSlide = template(SW, SH, () => [
  lightBg(),
  head('“', 380, 170, 300, 420, EV.mint, { fontWeight: 800, lineHeight: 1 }),
  head('Artificial\nintelligence', 680, 250, 1100, 104, EV.ink, {
    fontWeight: 500,
    lineHeight: 1.18,
  }),
  head('is a co-pilot,', 680, 495, 1100, 104, EV.emerald, { fontWeight: 600 }),
  head('not a stand-in.', 680, 618, 1100, 104, EV.ink, { fontWeight: 500 }),
]);

const PILLARS = [
  { icon: 'cpu', title: 'Edge Devices', text: 'Procurement and lifecycle care for every device.' },
  {
    icon: 'share-2',
    title: 'Core Platform',
    text: 'Cuts cycle times by 40% with live orchestration.',
  },
  {
    icon: 'shield-check',
    title: 'Managed Ops',
    text: 'Round-the-clock monitoring and self-healing.',
  },
] as const;

export const empoweringSlide = template(SW, SH, () => [
  darkBg(),
  head('Empowering Teams', 140, 120, 900, 64, EV.white),
  head('Digital Transformation', 140, 200, 900, 64, EV.mint, { fontWeight: 500 }),
  body(
    'Partnering with you to navigate a shifting tech\nlandscape with solutions that scale.',
    140,
    310,
    900,
    28,
    EV.soft,
  ),
  PILLARS.map((pillar, index) => {
    const x = 140 + index * 310;
    return [
      glass(x, 480, 280, 400, 22),
      rect(x + 30, 510, 76, 76, 'rgba(255,255,255,0.14)', { name: 'Icon chip', cornerRadius: 18 }),
      icon(pillar.icon, x + 48, 528, 40, EV.white, { strokeWidth: 2 }),
      head(pillar.title, x + 30, 680, 240, 30, EV.white),
      body(pillar.text, x + 30, 730, 230, 22, EV.soft),
    ];
  }),
  photo('laptop-analytics', 1100, 120, 680, 760, { cornerRadius: 28, ...GRAY }),
]);
