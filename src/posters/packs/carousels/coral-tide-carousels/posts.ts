import { circle, icon, pill, rect, type Template, template, text } from '../../../kit';
import { BODY, brandFooter, darkBackground, H, HEAD, TIDE, W } from './palette';
import { trail } from './slide-kit';

const highlight = (label: string, x: number, y: number, size: number) => {
  const width = label.length * size * 0.7 + size * 0.9;
  return [
    rect(x, y, width, size * 1.55, TIDE.coral, { cornerRadius: 10, name: 'Highlight' }),
    text(label, x, y + size * 0.2, width, {
      fontFamily: HEAD,
      fontSize: size,
      fontWeight: 800,
      fill: TIDE.deep,
      align: 'center',
    }),
  ];
};

const sparkCover = template(W, H, () => [
  darkBackground(),
  text('Turn', 90, 290, 600, {
    fontFamily: HEAD,
    fontSize: 110,
    fontWeight: 400,
    italic: true,
    fill: TIDE.white,
  }),
  text('Sparks', 90, 410, 800, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 800,
    fill: TIDE.coral,
  }),
  text('Into', 90, 610, 600, {
    fontFamily: HEAD,
    fontSize: 110,
    fontWeight: 400,
    italic: true,
    fill: TIDE.white,
  }),
  highlight('Momentum', 80, 760, 110),
  trail('M0 70 C70 10 150 110 210 40', 850, 790, 220, 120, TIDE.mist, 6, true),
  brandFooter(TIDE.white, TIDE.coral),
]);

const planeStep = (title: string, body: string) =>
  template(W, H, () => [
    darkBackground(),
    trail(
      'M0 330 C140 330 200 190 300 230 C390 266 340 340 290 300 C240 260 330 110 560 60',
      0,
      170,
      580,
      360,
      TIDE.mist,
      6,
      true,
    ),
    icon('send', 560, 120, 200, TIDE.white, { strokeWidth: 1.4 }),
    highlight(title, 240, 560, 62),
    text(body, 240, 700, 720, {
      fontFamily: BODY,
      fontSize: 52,
      fontWeight: 500,
      fill: TIDE.white,
      lineHeight: 1.4,
    }),
    trail(
      'M0 130 C80 130 120 20 220 40 C260 48 280 20 300 0',
      780,
      1110,
      300,
      140,
      TIDE.mist,
      6,
      true,
    ),
  ]);

const keepGoing = template(W, H, () => [
  darkBackground(),
  highlight('Keep Going', 280, 300, 66),
  text('Follow for more and\nsend this to someone\nwho needs a push!', 60, 470, 960, {
    fontFamily: HEAD,
    fontSize: 74,
    fontWeight: 600,
    fill: TIDE.white,
    align: 'center',
    lineHeight: 1.25,
  }),
  pill('Comment below', 370, 880, {
    fill: TIDE.coral,
    color: TIDE.deep,
    fontSize: 38,
    fontFamily: BODY,
    fontWeight: 700,
    width: 340,
  }),
  trail(
    'M0 260 C120 260 200 120 340 150 C420 168 440 80 360 60',
    0,
    920,
    440,
    280,
    TIDE.mist,
    6,
    true,
  ),
]);

const eraCover = template(W, H, () => [
  darkBackground(),
  text('The next era of', 0, 330, W, {
    fontFamily: BODY,
    fontSize: 60,
    fontWeight: 600,
    fill: TIDE.coral,
    align: 'center',
  }),
  text('Growth', 0, 430, W, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 800,
    fill: TIDE.white,
    align: 'center',
  }),
  text('&', 0, 610, W, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 800,
    fill: TIDE.coral,
    align: 'center',
  }),
  text('Strategy', 0, 740, W, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 800,
    fill: TIDE.white,
    align: 'center',
  }),
  brandFooter(TIDE.white, TIDE.coral),
]);

const numbered = (number: string, body: string, dark: boolean) =>
  template(W, H, () => [
    dark ? darkBackground() : rect(0, 0, W, H, TIDE.cream, { name: 'Background' }),
    rect(830, 110, 160, 72, dark ? TIDE.coral : TIDE.deep, { cornerRadius: 36, name: 'Toggle' }),
    circle(dark ? 954 : 866, 146, 26, TIDE.white),
    text(number, 80, 300, 900, {
      fontFamily: HEAD,
      fontSize: 280,
      fontWeight: 800,
      fill: dark ? TIDE.white : TIDE.coral,
      lineHeight: 1,
    }),
    text(body, 90, 680, 900, {
      fontFamily: BODY,
      fontSize: 56,
      fontWeight: 600,
      fill: dark ? TIDE.coral : TIDE.deep,
      lineHeight: 1.4,
    }),
    rect(90, 1160, 900, 5, dark ? TIDE.white : TIDE.coral, { name: 'Rule' }),
  ]);

export const SPARK_SERIES: readonly Template[] = [
  sparkCover,
  planeStep(
    'Catch Ideas',
    'Every big win starts as a small thought. Write it down before it slips away.',
  ),
  planeStep(
    'Map the Route',
    'Break the idea into clear steps, set a goal and pick the first move today.',
  ),
  planeStep('Make the Move', 'Plans only work once you act. Ship a rough version and learn fast.'),
  planeStep(
    'Read the Signals',
    'Track what lands, cut what does not and let real numbers guide the next step.',
  ),
  keepGoing,
];

export const ERA_SERIES: readonly Template[] = [
  eraCover,
  numbered(
    '01',
    'Automation is already here. Let tools handle the busywork so your team can focus on ideas.',
    true,
  ),
  numbered(
    '02',
    'People still set the direction. Judgment, taste and trust are what clients pay for.',
    false,
  ),
  numbered(
    '03',
    'Blend smart tools with human craft to move faster without losing your voice.',
    true,
  ),
  numbered(
    '04',
    'Stay curious. Test one new workflow each month and keep the ones that save time.',
    false,
  ),
];
