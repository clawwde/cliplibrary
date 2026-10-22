import { circle, icon, rect, template } from '../../../kit';
import { backdrop, H, MULBERRY, say, W } from './palette';

const RING_XS = [95, 245, 395, 545, 695, 845, 995];
const WAVE_START = 900;

const ringY = (globalX: number) =>
  globalX < WAVE_START ? 800 : 800 + 250 * Math.sin((globalX - WAVE_START) / 480);

const ringRadius = (globalX: number) =>
  globalX < WAVE_START
    ? 28 + globalX * 0.035
    : 34 + 26 * (0.5 + 0.5 * Math.cos((globalX - WAVE_START) / 300));

const rings = (slide: number, from: number, to: number) =>
  RING_XS.filter((x) => x >= from && x <= to).map((x) => {
    const globalX = slide * W + x;
    const radius = ringRadius(globalX);
    return circle(x, ringY(globalX), radius, 'rgba(0,0,0,0)', {
      name: 'Ring',
      stroke: MULBERRY.peach,
      strokeWidth: radius * 0.42,
    });
  });

export const waveCover = template(W, H, () => [
  backdrop(),
  say('Guess what?', 90, 490, 800, 44, MULBERRY.blush, 500),
  say('We are', 90, 560, 800, 110, MULBERRY.white, 800, { lineHeight: 1 }),
  say('so', 90, 720, 200, 130, MULBERRY.peach, 800, { lineHeight: 1 }),
  rings(0, 300, W),
  say('fernway.studio', 90, 1230, 600, 34, MULBERRY.blush, 500),
]);

export const waveMiddle = template(W, H, () => [backdrop(), rings(1, 0, W)]);

export const waveRise = template(W, H, () => [backdrop(), rings(2, 0, W)]);

export const waveFinale = template(W, H, () => [
  backdrop(),
  say('excited to share\nsome big news.', 90, 230, 900, 76, MULBERRY.white, 800, {
    lineHeight: 1.1,
  }),
  rings(3, 0, 700),
  icon('party-popper', 860, 1140, 120, MULBERRY.peach, { strokeWidth: 1.6 }),
]);

const folder = (x: number, y: number, width: number, label: string, tabX: number) => [
  rect(tabX, y - 74, 300, 110, '#efdcd2', { name: 'Folder tab', cornerRadius: 22 }),
  rect(x, y, width, H - y, MULBERRY.cream, {
    name: 'Folder',
    cornerRadius: 26,
    shadow: { color: 'rgba(0,0,0,0.28)', blur: 30, offsetX: 0, offsetY: -6 },
  }),
  rect(tabX + 24, y - 100, 34, 120, 'rgba(0,0,0,0)', {
    name: 'Clip',
    cornerRadius: 17,
    stroke: '#a38d93',
    strokeWidth: 6,
  }),
  say(label, tabX + 76, y - 58, 220, 36, MULBERRY.ink, 700),
];

export const termsCover = template(W, H, () => [
  backdrop(),
  say('3', 70, 40, 260, 360, MULBERRY.peach, 800, { lineHeight: 1 }),
  say('Growth Terms\nEvery Founder\nShould Know', 330, 110, 700, 62, MULBERRY.white, 500, {
    lineHeight: 1.15,
  }),
  folder(60, 600, 960, 'Retention', 110),
  folder(60, 790, 960, 'Churn', 560),
  folder(60, 980, 960, 'Pipeline', 220),
  say('Swipe now', 120, 1180, 400, 46, MULBERRY.wine, 700),
  icon('arrow-right', 360, 1178, 56, MULBERRY.wine, { strokeWidth: 2.4 }),
]);

const term = (number: string, name: string, definition: string, why: string) =>
  template(W, H, () => [
    backdrop(),
    say(number, 560, 10, 460, 520, MULBERRY.peach, 800, { align: 'right', lineHeight: 1 }),
    folder(80, 420, 920, name, 130),
    say(name, 150, 500, 800, 104, MULBERRY.wine, 800, { lineHeight: 1 }),
    say('Definition:', 150, 680, 780, 38, MULBERRY.wine, 700),
    say(definition, 150, 730, 780, 38, MULBERRY.ink, 400),
    say('Why it matters:', 150, 920, 780, 38, MULBERRY.wine, 700),
    say(why, 150, 970, 780, 38, MULBERRY.ink, 400),
  ]);

export const termRetention = term(
  '1',
  'Retention',
  'The share of customers who keep\nbuying from you over time.',
  'Keeping a customer costs far less\nthan winning a brand new one.',
);

export const termChurn = term(
  '2',
  'Churn',
  'The rate at which customers stop\nusing or paying for your product.',
  'High churn quietly erases every\nwin your marketing brings in.',
);

export const termPipeline = term(
  '3',
  'Pipeline',
  'Every open deal, sorted by how\nclose it is to a signed contract.',
  'A healthy pipeline turns next\nquarter into a forecast, not a guess.',
);
