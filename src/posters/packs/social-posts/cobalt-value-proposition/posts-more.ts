import { arrow, circle, icon, path, rect, star, type Template, template, text } from '../../../kit';
import { BODY, COBALT, clearProcess, H, HEAD, ourServices, type ValuePalette, W } from './posts';

const PROMISES = [
  'One clear\nplan',
  'Built for\nresults',
  'Live in\n14 days',
  'Only what\nmatters',
  'Top 1%\nquality',
  'No hidden\nfees',
];

const zeroGuesswork = (p: ValuePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    text('Zero Guesswork', 0, 130, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
    }),
    text('Guaranteed', 0, 240, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: p.brand,
      align: 'center',
    }),
    star(5, 900, 70, 90, p.accent, { innerRatio: 0.42 }),
    PROMISES.map((label, index) => {
      const x = 60 + (index % 3) * 330;
      const y = 440 + Math.floor(index / 3) * 340;
      return [
        rect(x, y, 300, 300, p.brand, { cornerRadius: 10, name: 'Promise box' }),
        circle(x + 50, y + 50, 24, p.paper),
        icon('plus', x + 34, y + 34, 32, p.brand, { strokeWidth: 3 }),
        text(label, x + 30, y + 160, 250, {
          fontFamily: BODY,
          fontSize: 38,
          fontWeight: 700,
          fill: p.paper,
          lineHeight: 1.2,
        }),
      ];
    }),
    text('All in One Place', 0, 1170, W, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 700,
      fill: p.brand,
      align: 'center',
    }),
    star(5, 80, 1200, 80, p.paper, { innerRatio: 0.42 }),
  ]);

export const benefits = (p: ValuePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    path(
      'M 270 0 A 270 270 0 0 1 0 270 L 0 150 A 150 150 0 0 0 150 0 Z',
      0,
      0,
      W,
      H,
      p.paper,
      { width: W, height: H },
      { name: 'Top gauge' },
    ),
    text('90%', 100, 130, 120, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 800,
      fill: p.ink,
      align: 'center',
    }),
    star(5, 250, 40, 70, p.brand, { innerRatio: 0.42 }),
    arrow(330, 190, 150, p.paper, 4),
    text('Boost results you\ncan actually measure.', 510, 150, 520, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: '#d1d5db',
      lineHeight: 1.35,
    }),
    text('Benefits', 80, 420, 900, {
      fontFamily: HEAD,
      fontSize: 100,
      fontWeight: 800,
      fill: p.paper,
    }),
    text('for You', 80, 540, 900, {
      fontFamily: HEAD,
      fontSize: 100,
      fontWeight: 800,
      fill: p.brand,
    }),
    star(5, 900, 470, 90, p.paper, { innerRatio: 0.42 }),
    text('Save time, cut\ncomplexity, work\nsmarter.', 80, 740, 420, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: '#d1d5db',
      lineHeight: 1.35,
    }),
    text('Turn know-how into\nreal business value.', 600, 760, 420, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: '#d1d5db',
      lineHeight: 1.35,
    }),
    path(
      'M 240 1350 A 300 300 0 0 1 532 1050 L 532 1180 A 170 170 0 0 0 370 1350 Z',
      0,
      0,
      W,
      H,
      p.brand,
      { width: W, height: H },
      { name: 'Gauge left' },
    ),
    path(
      'M 548 1050 A 300 300 0 0 1 840 1350 L 710 1350 A 170 170 0 0 0 548 1180 Z',
      0,
      0,
      W,
      H,
      p.paper,
      { width: W, height: H },
      { name: 'Gauge right' },
    ),
    text('60%', 314, 1160, 120, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
    }),
    text('40%', 646, 1160, 120, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 800,
      fill: p.ink,
      align: 'center',
    }),
  ]);

const noteCard = (
  p: ValuePalette,
  x: number,
  y: number,
  height: number,
  number: string,
  body: string,
) => [
  rect(x, y, 440, height, p.paper, { cornerRadius: 10, name: 'Reason card' }),
  circle(x + 400, y + 40, 18, p.ink),
  text(number, x + 382, y + 27, 36, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 800,
    fill: p.paper,
    align: 'center',
  }),
  text(body, x + 30, y + height - 150, 390, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 600,
    fill: p.ink,
    lineHeight: 1.3,
  }),
];

const whyChooseUs = (p: ValuePalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    text('Why choose us?', 0, 90, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
    }),
    rect(80, 250, 440, 120, p.paper, { cornerRadius: 10, name: 'Logo card' }),
    text('Northpeak', 110, 285, 260, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 800,
      fill: p.ink,
    }),
    text('Studio', 345, 285, 160, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 800,
      fill: p.brand,
    }),
    noteCard(p, 80, 400, 360, '1', 'We make the road\nfrom idea to launch\nshort and simple.'),
    noteCard(p, 80, 790, 400, '3', 'We focus on what\nmatters: positioning,\nclarity and results.'),
    noteCard(p, 560, 250, 420, '2', 'No endless drafts.\nWe help you go live\nwith confidence.'),
    noteCard(p, 560, 700, 300, '4', 'Clean, modern and\nmade to turn visitors\ninto clients.'),
    noteCard(p, 560, 1030, 160, '5', 'Support that\nanswers fast.'),
    star(5, 80, 1215, 90, p.accent, { innerRatio: 0.42 }),
  ]);

export const POSTS: readonly [Template, Template, Template, Template, Template] = [
  ourServices(COBALT),
  clearProcess(COBALT),
  zeroGuesswork(COBALT),
  benefits(COBALT),
  whyChooseUs(COBALT),
];
