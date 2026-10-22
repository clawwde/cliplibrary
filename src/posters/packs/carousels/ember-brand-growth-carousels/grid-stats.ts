import { type DesignIconName, linear } from '@/design';
import { icon, POST_SIZE, rect, template, text } from '../../../kit';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Manrope';
const EMBER = '#ff5a1f';
const NIGHT = '#0c0c0e';
const SITE = 'emberline.studio';

const gridLines = () => [
  Array.from({ length: 7 }, (_, index) =>
    rect(135 + index * 135, 0, 2, H, 'rgba(255,255,255,0.07)', { name: 'Grid line' }),
  ),
  Array.from({ length: 9 }, (_, index) =>
    rect(0, 135 + index * 135, W, 2, 'rgba(255,255,255,0.07)', { name: 'Grid line' }),
  ),
];

const handle = (x: number, y: number) => rect(x - 10, y - 10, 20, 20, EMBER, { name: 'Handle' });

export const gridCover = template(W, H, () => [
  rect(0, 0, W, H, NIGHT, { name: 'Background' }),
  gridLines(),
  text('How to', 90, 330, 900, {
    fontFamily: FONT,
    fontSize: 68,
    fontWeight: 400,
    fill: '#ffffff',
  }),
  text('Grow Your\nAudience', 90, 415, 920, {
    fontFamily: FONT,
    fontSize: 104,
    fontWeight: 800,
    fill: EMBER,
    lineHeight: 1.04,
  }),
  rect(90, 670, 660, 116, 'rgba(0,0,0,0)', {
    name: 'Selection box',
    stroke: '#ffffff',
    strokeWidth: 3,
  }),
  [
    [90, 670],
    [750, 670],
    [90, 786],
    [750, 786],
  ].map(([x = 0, y = 0]) => handle(x, y)),
  text('with Short Video', 118, 690, 620, {
    fontFamily: FONT,
    fontSize: 60,
    fontWeight: 500,
    fill: '#ffffff',
  }),
  text(SITE, 90, 1196, 600, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: '#ffffff',
  }),
  icon('bookmark', 940, 1186, 56, EMBER, { strokeWidth: 2.5 }),
]);

const gridStep = (
  number: string,
  lead: string,
  accent: string,
  paragraphs: readonly string[],
  closer: string,
) =>
  template(W, H, () => [
    rect(0, 0, W, H, NIGHT, { name: 'Background' }),
    gridLines(),
    rect(90, 290, 104, 104, 'rgba(0,0,0,0)', {
      name: 'Number box',
      stroke: '#ffffff',
      strokeWidth: 4,
    }),
    text(number, 90, 302, 104, {
      fontFamily: FONT,
      fontSize: 66,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text(lead, 90, 450, 920, {
      fontFamily: FONT,
      fontSize: 80,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(accent, 90, 540, 920, {
      fontFamily: FONT,
      fontSize: 80,
      fontWeight: 800,
      fill: EMBER,
    }),
    paragraphs.map((paragraph, index) =>
      text(paragraph, 90, 690 + index * 150, 880, {
        fontFamily: FONT,
        fontSize: 40,
        fontWeight: 500,
        fill: '#d4d4d8',
        lineHeight: 1.35,
      }),
    ),
    text(closer, 90, 690 + paragraphs.length * 150, 880, {
      fontFamily: FONT,
      fontSize: 40,
      fontWeight: 800,
      fill: '#ffffff',
      lineHeight: 1.35,
    }),
  ]);

export const GRID_STEPS = [
  gridStep(
    '1',
    'Pick One',
    'Clear Topic',
    [
      'Fast growing accounts repeat one idea often.',
      'Choose one audience, one problem and one promise.',
    ],
    'Focus turns viewers into followers.',
  ),
  gridStep(
    '2',
    'Post on a',
    'Steady Rhythm',
    ['You do not need a new video every day.', 'You do need to show up every single week.'],
    'Rhythm builds trust and reach.',
  ),
  gridStep(
    '3',
    'Teach Before',
    'You Pitch',
    ['Lead with a useful tip or a short story.', 'Give first, then invite the next step.'],
    'Value earns attention.',
  ),
] as const;

const DUSK = linear(180, '#1c1c20', '#050506');

export const statsCover = template(W, H, () => [
  rect(0, 0, W, H, DUSK, { name: 'Background' }),
  text(SITE, 90, 120, 600, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: '#ffffff',
  }),
  icon('chevrons-right', 560, 360, 460, EMBER, { strokeWidth: 2.75 }),
  text('Quarterly\nRecap:', 90, 560, 700, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 800,
    fill: '#ffffff',
    lineHeight: 1.1,
  }),
  text('Reach and\nRevenue', 90, 770, 700, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 400,
    fill: '#ffffff',
    lineHeight: 1.1,
  }),
]);

const statStep = (value: string, label: string, mark: DesignIconName, top: boolean) =>
  template(W, H, () => [
    rect(0, 0, W, H, DUSK, { name: 'Background' }),
    top
      ? icon(mark, 640, 80, 360, EMBER, { strokeWidth: 1.75 })
      : icon(mark, 560, 780, 460, EMBER, { strokeWidth: 1.75 }),
    text(value, 90, top ? 480 : 250, 900, {
      fontFamily: FONT,
      fontSize: 190,
      fontWeight: 800,
      fill: EMBER,
      lineHeight: 1,
    }),
    text(label, 90, top ? 700 : 470, 700, {
      fontFamily: FONT,
      fontSize: 68,
      fontWeight: 500,
      fill: '#ffffff',
      lineHeight: 1.15,
    }),
  ]);

export const STAT_STEPS = [
  statStep('48%', 'growth in\nrevenue', 'circle-dollar-sign', false),
  statStep('3x', 'more saves\nper post', 'thumbs-up', true),
  statStep('12k', 'new email\nsubscribers', 'mail', false),
] as const;
