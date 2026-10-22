import { circle, icon, pill, rect, template } from '../../../kit';
import { darkBackground, glowNumber, H, SANS, SUN, say, W } from './palette';

export const tipsCover = template(W, H, () => [
  darkBackground(),
  glowNumber('3', 90, 300, 200, 220, 'left'),
  say('Branding', 260, 370, 800, 96, SUN.white, 500, { lineHeight: 1.05 }),
  say('Tips to\nConsider', 90, 530, 900, 110, SUN.white, 500, { lineHeight: 1.05 }),
  say('Want a brand people remember\nat first glance? Start here.', 90, 800, 900, 38, SUN.fog, 400),
  pill('Swipe  ›', 760, 1150, {
    fill: SUN.sun,
    color: SUN.coal,
    fontSize: 36,
    fontFamily: SANS,
    fontWeight: 700,
  }),
]);

const tip = (number: string, title: readonly string[], body: string) =>
  template(W, H, () => [
    darkBackground(),
    glowNumber(number, 440, 250, 600, 820, 'right'),
    say(title.join('\n'), 90, 560, 700, 84, SUN.white, 500, { lineHeight: 1.08 }),
    say(body, 90, 900, 480, 34, SUN.fog, 400, { lineHeight: 1.45 }),
  ]);

export const tipConsistent = tip(
  '1',
  ['Stay', 'consistent', 'everywhere'],
  'Your brand should look,\nsound and feel the same\non every channel.',
);

export const tipAudience = tip(
  '2',
  ['Know your', 'audience', 'deeply'],
  'Strong brands speak to\nthe right people. Clarity\nbuilds connection fast.',
);

export const tipValues = tip(
  '3',
  ['Lead with', 'your', 'values'],
  'Looks are nice, but what\nyou stand for is what\nbrings people back.',
);

const slider = (position: number) => [
  rect(160, 760, 760, 4, 'rgba(201,198,207,0.4)', { name: 'Slider track', cornerRadius: 2 }),
  rect(160, 760, 760 * position, 4, SUN.sun, { name: 'Slider fill', cornerRadius: 2 }),
  circle(160 + 760 * position, 762, 16, SUN.sun, {
    shadow: { color: 'rgba(255,201,60,0.7)', blur: 24, offsetX: 0, offsetY: 0 },
  }),
];

const centered = (content: string, y: number, size: number, fill: string, weight: number) =>
  say(content, 70, y, W - 140, size, fill, weight, { align: 'center', lineHeight: 1.4 });

export const stepsCover = template(W, H, () => [
  darkBackground(),
  glowNumber('3', 0, 180, W, 420, 'center'),
  centered('Steps to Elevate', 640, 64, SUN.white, 700),
  slider(0.08),
  centered('Your brand, ready to stand\nout in a crowded market.', 830, 38, SUN.fog, 400),
  rect(420, 1090, 240, 96, SUN.sun, { name: 'Swipe button', cornerRadius: 48 }),
  icon('move-right', 495, 1098, 80, SUN.coal, { strokeWidth: 2 }),
]);

const step = (number: string, title: string, body: string, position: number) =>
  template(W, H, () => [
    darkBackground(),
    glowNumber(number, 0, 180, W, 420, 'center'),
    centered(title, 640, 64, SUN.white, 700),
    slider(position),
    centered(body, 830, 38, SUN.fog, 400),
  ]);

export const stepTrust = step(
  '1',
  'Earn Trust Fast',
  "People don't buy from brands\nthey don't trust. First\nimpressions form in seconds.",
  0.35,
);

export const stepClients = step(
  '2',
  'Win Better Clients',
  'A clear brand filters for the\nright people, so the wrong\nones quietly opt out.',
  0.65,
);

export const stepShowUp = step(
  '3',
  'Keep Showing Up',
  'Branding is not a one-time\nproject. It compounds every\ntime you stay consistent.',
  0.92,
);
