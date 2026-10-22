import { type DesignIconName, linear, radial } from '@/design';
import { circle, ellipse, icon, rect, template } from '../../../kit';
import { darkBackground, H, lightBackground, nextArrow, say, TANGERINE, W } from './palette';

const person = (cx: number, top: number, scale: number, fill: string) => [
  circle(cx, top + 90 * scale, 90 * scale, fill),
  ellipse(cx - 170 * scale, top + 200 * scale, 340 * scale, H - top - 200 * scale, fill, {
    name: 'Shoulders',
  }),
];

const swipePill = (x: number, y: number, color: string) => [
  rect(x, y, 330, 76, 'rgba(0,0,0,0)', {
    name: 'Swipe pill',
    cornerRadius: 38,
    stroke: color,
    strokeWidth: 3,
  }),
  say('Swipe to read  →', x, y + 19, 330, 30, color, 600, { align: 'center' }),
];

export const archetypesCover = template(W, H, () => [
  darkBackground(),
  rect(90, 260, 320, 70, TANGERINE.white, { name: 'Tag', cornerRadius: 8 }),
  say('The Creator', 90, 272, 320, 38, TANGERINE.forest, 800, {
    align: 'center',
    lineHeight: 1.2,
  }),
  rect(90, 350, 680, 140, TANGERINE.orange, { name: 'Title box', cornerRadius: 10 }),
  say('Archetypes', 90, 362, 680, 104, TANGERINE.white, 800, {
    align: 'center',
    lineHeight: 1.1,
  }),
  swipePill(90, 540, TANGERINE.white),
  person(250, 900, 0.75, TANGERINE.teal),
  person(830, 900, 0.75, TANGERINE.teal),
  person(540, 820, 1, '#ff9f5f'),
]);

const archetype = (title: string, body: string, symbol: DesignIconName) =>
  template(W, H, () => [
    darkBackground(),
    icon('quote', 90, 110, 110, TANGERINE.orange, { strokeWidth: 1.6 }),
    say(title, 90, 250, 900, 84, TANGERINE.orange, 800),
    say(body, 90, 370, 880, 40, TANGERINE.white, 400, { lineHeight: 1.4 }),
    circle(700, 940, 290, radial('rgba(255,138,61,0.35)', 'rgba(255,138,61,0)'), {
      name: 'Glow',
    }),
    circle(700, 940, 210, linear(160, TANGERINE.teal, TANGERINE.forest), {
      name: 'Badge',
      stroke: TANGERINE.orange,
      strokeWidth: 6,
    }),
    icon(symbol, 570, 810, 260, TANGERINE.white, { strokeWidth: 1.3 }),
  ]);

export const archetypeStoryteller = archetype(
  'Storyteller',
  'Turns complex ideas into\nstories people remember.',
  'megaphone',
);

export const archetypeBuilder = archetype(
  'Builder',
  'Designs content systems that\ngrow with data, not guesses.',
  'pen-tool',
);

export const archetypeExplorer = archetype(
  'Explorer',
  'Tests new channels with a\ncurious, hands-on strategy.',
  'compass',
);

export const searchCover = template(W, H, () => [
  lightBackground(),
  say('northpine.co', 0, 70, W, 32, TANGERINE.forest, 600, { align: 'center' }),
  circle(540, 440, 170, TANGERINE.forest, { name: 'Lens badge' }),
  icon('search', 440, 340, 200, TANGERINE.white, { strokeWidth: 2 }),
  rect(140, 690, 800, 140, TANGERINE.orange, { name: 'Title box', cornerRadius: 12 }),
  say('Rank Higher', 140, 704, 800, 100, TANGERINE.white, 800, {
    align: 'center',
    lineHeight: 1.1,
  }),
  say('in a Noisy Search World', 0, 870, W, 48, TANGERINE.forest, 600, { align: 'center' }),
  rect(370, 990, 340, 84, TANGERINE.forest, { name: 'Swipe pill', cornerRadius: 42 }),
  say('Swipe to read  →', 370, 1012, 340, 32, TANGERINE.white, 600, { align: 'center' }),
]);

const searchTip = (word: string, title: string, body: string) =>
  template(W, H, () => [
    darkBackground(),
    say(word, 50, 1300, 1250, 250, 'rgba(255,138,61,0.16)', 800, {
      lineHeight: 1,
      rotation: -90,
      uppercase: true,
    }),
    say(title, 380, 220, 640, 76, TANGERINE.white, 800, { lineHeight: 1.1 }),
    rect(380, 420, 120, 8, TANGERINE.orange, { name: 'Accent rule', cornerRadius: 4 }),
    say(body, 380, 470, 640, 36, TANGERINE.sage, 400, { lineHeight: 1.5 }),
    nextArrow(TANGERINE.white),
  ]);

export const tipSpeed = searchTip(
  'Speed',
  'Fast\nPages',
  'Visitors and search bots\nboth leave slow sites.\nCompress images, trim\nscripts and aim for a load\nunder two seconds.',
);

export const tipIntent = searchTip(
  'Intent',
  'Search\nIntent',
  'Match what people really\nwant. A how-to search\nneeds clear steps, not a\nsales page. Answer the\nwhy behind every query.',
);

export const tipTrust = searchTip(
  'Trust',
  'Earned\nLinks',
  'One mention from a trusted\nsite in your niche is worth\nmore than a hundred\nrandom directory links.',
);
