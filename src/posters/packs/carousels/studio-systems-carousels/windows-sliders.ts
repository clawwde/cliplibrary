import { linear } from '@/design';
import { circle, icon, type Nodes, POST_SIZE, poly, rect, template, text } from '../../../kit';

const { width: W, height: H } = POST_SIZE;
export const FONT = 'Urbanist';
export const NAVY = '#0b1d3a';
export const SKY = '#7dd3fc';
export const MUTED = '#cbd5e1';
const OCEAN = linear(160, '#0b1d3a', '#123a7a');

const streaks = (): Nodes[] =>
  [0, 1, 2].map((index) =>
    poly(
      [
        [0, 300 + index * 380],
        [W, 40 + index * 380],
        [W, 120 + index * 380],
        [0, 380 + index * 380],
      ],
      'rgba(255,255,255,0.035)',
      { name: 'Streak' },
    ),
  );

const kicker = (y: number, align: 'left' | 'center' = 'left') =>
  text('STUDIO SYSTEMS', align === 'left' ? 90 : 0, y, align === 'left' ? 800 : W, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 800,
    fill: '#ffffff',
    letterSpacing: 2,
    align,
  });

const swipeStrip = (x: number) => [
  rect(0, 1160, W, 190, '#ffffff', { name: 'Strip' }),
  rect(x, 1108, 260, 100, '#ffffff', {
    name: 'Chevron pill',
    cornerRadius: 50,
    stroke: NAVY,
    strokeWidth: 5,
  }),
  icon('chevrons-right', x + 100, 1128, 60, '#2563eb', { strokeWidth: 2.75 }),
];

export const windowsCover = template(W, H, () => [
  rect(0, 0, W, H, OCEAN, { name: 'Background' }),
  streaks(),
  kicker(130),
  text('Ship Work Faster,', 90, 420, 940, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 800,
    fill: '#ffffff',
  }),
  text('Not Longer', 90, 525, 940, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 800,
    fill: SKY,
  }),
  text('Small process shifts that\nfree up hours each week', 90, 670, 900, {
    fontFamily: FONT,
    fontSize: 44,
    fontWeight: 500,
    fill: MUTED,
    lineHeight: 1.35,
  }),
  text('Swipe to see more', 90, 1060, 500, {
    fontFamily: FONT,
    fontSize: 38,
    fontWeight: 600,
    fill: '#ffffff',
    italic: true,
  }),
  swipeStrip(720),
]);

const windowStep = (number: string, title: string, body: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, OCEAN, { name: 'Background' }),
    streaks(),
    rect(110, 330, 860, 560, linear(180, 'rgba(18,58,122,0.55)', 'rgba(2,6,23,0.95)'), {
      name: 'Window',
      cornerRadius: 30,
      stroke: 'rgba(125,211,252,0.65)',
      strokeWidth: 3,
    }),
    rect(110, 250, 140, 96, '#ffffff', { name: 'Number tab', cornerRadius: 16 }),
    poly(
      [
        [250, 270],
        [300, 330],
        [250, 330],
      ],
      '#ffffff',
      { name: 'Tab fold' },
    ),
    text(number, 110, 270, 140, {
      fontFamily: FONT,
      fontSize: 50,
      fontWeight: 800,
      fill: NAVY,
      align: 'center',
    }),
    [0, 1, 2].map((index) => circle(870 + index * 26, 390, 7, '#ffffff')),
    text(title, 160, 430, 760, {
      fontFamily: FONT,
      fontSize: 66,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(body, 160, 540, 760, {
      fontFamily: FONT,
      fontSize: 40,
      fontWeight: 500,
      fill: MUTED,
      lineHeight: 1.4,
    }),
    swipeStrip(410),
  ]);

export const WINDOW_STEPS = [
  windowStep(
    '01',
    'Build a System',
    'Templates remove decision fatigue and give every project the same strong start.',
  ),
  windowStep(
    '02',
    'Reuse Over Rebuild',
    'Starting from scratch feels creative, but reusable parts are where the speed lives.',
  ),
  windowStep(
    '03',
    'Automate Repeats',
    'If you do it more than twice, it is probably worth a template or a shortcut.',
  ),
  windowStep(
    '04',
    'Write It Down',
    'One shared page of decisions saves ten meetings later in the project.',
  ),
] as const;

export const slidersCover = template(W, H, () => [
  rect(0, 0, W, H, OCEAN, { name: 'Background' }),
  streaks(),
  kicker(130),
  text('Why Templates', 90, 470, 940, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 800,
    fill: '#ffffff',
  }),
  text('Are a Smart Bet', 90, 575, 940, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 800,
    fill: SKY,
  }),
  text('Learn how templates save time\nand protect your quality', 90, 720, 900, {
    fontFamily: FONT,
    fontSize: 44,
    fontWeight: 500,
    fill: MUTED,
    lineHeight: 1.35,
  }),
  circle(920, 1170, 76, '#ffffff'),
  icon('arrow-right', 880, 1130, 80, NAVY, { strokeWidth: 2.75 }),
]);

const sliderStep = (number: string, lead: string, accent: string, body: string, knob: number) =>
  template(W, H, () => {
    const x = W * knob;
    return [
      rect(0, 0, W, H, OCEAN, { name: 'Background' }),
      streaks(),
      text(lead, 90, 300, 940, {
        fontFamily: FONT,
        fontSize: 84,
        fontWeight: 800,
        fill: '#ffffff',
      }),
      text(accent, 90, 400, 940, {
        fontFamily: FONT,
        fontSize: 84,
        fontWeight: 800,
        fill: SKY,
      }),
      text(body, 90, 540, 880, {
        fontFamily: FONT,
        fontSize: 42,
        fontWeight: 500,
        fill: MUTED,
        lineHeight: 1.4,
      }),
      rect(x, 975, W - x, 50, '#020617', { name: 'Track', cornerRadius: 25 }),
      rect(0, 975, x, 50, linear(90, '#e0f2fe', SKY), { name: 'Progress', cornerRadius: 25 }),
      circle(x, 1000, 82, '#07142b', { stroke: SKY, strokeWidth: 5 }),
      text(number, x - 82, 972, 164, {
        fontFamily: FONT,
        fontSize: 50,
        fontWeight: 800,
        fill: '#ffffff',
        align: 'center',
      }),
    ];
  });

export const SLIDER_STEPS = [
  sliderStep(
    '01',
    'Consistency',
    'Builds Trust',
    'Repeated visual structure makes your brand easy to recognise and look professional.',
    0.42,
  ),
  sliderStep(
    '02',
    'Speed Creates',
    'Momentum',
    'When design is easy, content gets published far more often.',
    0.56,
  ),
  sliderStep(
    '03',
    'Less Guessing,',
    'More Making',
    'Templates remove friction so ideas reach the page faster.',
    0.7,
  ),
  sliderStep(
    '04',
    'Great Systems',
    'Scale Up',
    'One well designed system can support months of content.',
    0.84,
  ),
] as const;
