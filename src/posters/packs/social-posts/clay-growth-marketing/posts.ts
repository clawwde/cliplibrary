import { linear } from '@/design';
import {
  avatar,
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  pill,
  poly,
  rating,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

interface ClayPalette {
  light: string;
  soft: string;
  brand: string;
  deep: string;
  ink: string;
  paper: string;
}

export const CLAY: ClayPalette = {
  light: '#fdf3ec',
  soft: '#f3c9b1',
  brand: '#c8553d',
  deep: '#4a1f17',
  ink: '#2a120d',
  paper: '#ffffff',
};

export const TIDE: ClayPalette = {
  light: '#eef6fb',
  soft: '#b7d9ee',
  brand: '#1f7fb6',
  deep: '#123a56',
  ink: '#0b2233',
  paper: '#ffffff',
};

export const HEAD = 'Sora';
export const BODY = 'DM Sans';

const { width: W, height: H } = POST_SIZE;

export const softBackdrop = (palette: ClayPalette, height: number = H) =>
  rect(0, 0, W, height, linear(180, palette.light, palette.soft), { name: 'Background' });

export const deepBackdrop = (palette: ClayPalette, height: number = H) =>
  rect(0, 0, W, height, linear(165, palette.brand, palette.deep), { name: 'Background' });

const button = (label: string, x: number, y: number, fill: string, color: string) =>
  pill(label, x, y, { fill, color, fontSize: 26, fontFamily: BODY, fontWeight: 600 });

export const reviewWords = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#e48a6a', CLAY.brand), { name: 'Background' }),
  text('rev', 40, 10, 1000, {
    fontFamily: HEAD,
    fontSize: 400,
    fontWeight: 800,
    fill: 'rgba(255,255,255,0.92)',
    lineHeight: 1,
    letterSpacing: -16,
  }),
  text('iew', 300, 900, 760, {
    fontFamily: HEAD,
    fontSize: 400,
    fontWeight: 800,
    fill: 'rgba(255,255,255,0.92)',
    lineHeight: 1,
    letterSpacing: -16,
  }),
  group(
    rect(930, 80, 90, 360, CLAY.paper, { cornerRadius: 45, name: 'Tag' }),
    text('#review', 954, 410, 320, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 700,
      fill: CLAY.brand,
      rotation: -90,
    }),
  ),
  group(
    rect(110, 500, 860, 360, CLAY.paper, {
      cornerRadius: 32,
      name: 'Review card',
      ...shadow(40, 18, 'rgba(74,31,23,0.3)'),
    }),
    avatar('man-portrait-3', 200, 590, 50),
    text('Daniel Okafor', 275, 552, 400, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 700,
      fill: CLAY.ink,
    }),
    text('Head of Growth, Brightmill', 275, 598, 420, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 500,
      fill: '#7a5a50',
    }),
    rating(730, 566, 34, 5, CLAY.brand, 0.2),
    text(
      'Our pipeline doubled in one quarter. They listened first, then built a plan that fit our brand.',
      160,
      680,
      760,
      { fontFamily: BODY, fontSize: 32, fontWeight: 500, fill: '#3d2a24', lineHeight: 1.4 },
    ),
  ),
]);

export const marketPortrait = template(W, H, () => [
  softBackdrop(CLAY),
  text('market', 70, 1240, 1100, {
    fontFamily: HEAD,
    fontSize: 230,
    fontWeight: 800,
    fill: CLAY.deep,
    rotation: -90,
    lineHeight: 1,
    letterSpacing: -6,
  }),
  photo('woman-portrait-5', 330, 110, 470, 960, { cornerRadius: 40 }),
  group(
    rect(700, 230, 320, 280, CLAY.deep, { cornerRadius: 28, name: 'Strategy card' }),
    text('A Plan\nThat Keeps\nYou Moving', 740, 300, 260, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 700,
      fill: CLAY.paper,
      lineHeight: 1.1,
    }),
  ),
  group(
    rect(700, 560, 320, 260, CLAY.brand, { cornerRadius: 28, name: 'Solutions card' }),
    text('Solut\nions', 740, 600, 260, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: CLAY.paper,
      lineHeight: 1,
    }),
  ),
  icon('phone', 330, 1130, 44, CLAY.deep),
  text('Call us\n(555) 014-2290', 390, 1124, 300, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: CLAY.ink,
    lineHeight: 1.3,
  }),
  icon('map-pin', 700, 1130, 44, CLAY.deep),
  text('Visit us\n48 Harbor Lane', 760, 1124, 280, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: CLAY.ink,
    lineHeight: 1.3,
  }),
]);

export const doorHanger = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#6b2e22', CLAY.deep), { name: 'Background' }),
  rect(0, 0, 250, H, linear(90, '#3a170f', '#5a261b'), { name: 'Door edge' }),
  rect(240, 0, 12, H, 'rgba(255,255,255,0.08)', { name: 'Door seam' }),
  group(
    rect(310, 110, 460, 1120, linear(180, '#f7d9c7', CLAY.soft), {
      cornerRadius: 60,
      name: 'Door hanger',
      ...shadow(50, 24, 'rgba(0,0,0,0.4)'),
    }),
    circle(540, 290, 92, '#5f281d', { name: 'Hanger hole' }),
    rect(140, 270, 480, 40, linear(180, '#e9e2dc', '#9c928b'), {
      cornerRadius: 20,
      name: 'Handle lever',
      ...shadow(20, 8, 'rgba(0,0,0,0.35)'),
    }),
    circle(540, 290, 44, linear(180, '#f1ebe6', '#8f857e'), { name: 'Handle knob' }),
    text('Online', 310, 450, 460, {
      fontFamily: 'Dancing Script',
      fontSize: 92,
      fontWeight: 700,
      fill: CLAY.deep,
      align: 'center',
    }),
    text('Webinar', 310, 556, 460, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 800,
      fill: CLAY.brand,
      align: 'center',
    }),
    text('Growth Basics 101', 310, 680, 460, {
      fontFamily: HEAD,
      fontSize: 36,
      fontWeight: 700,
      fill: CLAY.ink,
      align: 'center',
    }),
    text('Thursday, May 22\nat 7 PM CET', 310, 742, 460, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: '#5b3a31',
      align: 'center',
      lineHeight: 1.35,
    }),
    rect(390, 900, 300, 76, CLAY.deep, { cornerRadius: 38, name: 'Join button' }),
    text('Save your seat', 390, 920, 300, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 700,
      fill: CLAY.paper,
      align: 'center',
    }),
  ),
]);

const toggle = (x: number, y: number, on: boolean) => [
  rect(x, y, 72, 40, on ? CLAY.brand : '#e7d6cd', { cornerRadius: 20, name: 'Toggle' }),
  circle(on ? x + 52 : x + 20, y + 20, 15, CLAY.paper),
];

const SEO_TASKS = [
  { label: 'Site health audit', icon: 'search' },
  { label: 'Keyword shortlist', icon: 'key' },
  { label: 'Refresh key pages', icon: 'refresh-cw' },
  { label: 'Publish two articles', icon: 'file-text' },
  { label: 'Earn quality links', icon: 'link' },
  { label: 'Review the results', icon: 'chart-line' },
] as const;

export const seoChecklist = template(W, H, () => [
  softBackdrop(CLAY),
  text('Your Monthly', 0, 120, W, {
    fontFamily: HEAD,
    fontSize: 58,
    fontWeight: 500,
    fill: CLAY.deep,
    align: 'center',
  }),
  text('SEO Checklist', 0, 196, W, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: CLAY.brand,
    align: 'center',
  }),
  rect(150, 380, 780, 800, CLAY.paper, {
    cornerRadius: 40,
    name: 'Checklist card',
    ...shadow(50, 22, 'rgba(74,31,23,0.22)'),
  }),
  SEO_TASKS.map((task, index) => {
    const y = 440 + index * 120;
    return [
      toggle(210, y + 4, index < 4),
      text(task.label, 310, y + 2, 460, {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 600,
        fill: CLAY.ink,
      }),
      icon(task.icon, 820, y, 46, CLAY.brand),
      index < SEO_TASKS.length - 1 ? rect(210, y + 84, 660, 2, '#f1e3db', { name: 'Divider' }) : [],
    ];
  }),
]);

export const didYouKnow = template(W, H, () => [
  rect(0, 0, W, H, linear(170, '#eba487', CLAY.brand), { name: 'Background' }),
  text('?', 640, 120, 400, {
    fontFamily: HEAD,
    fontSize: 520,
    fontWeight: 800,
    fill: 'rgba(255,255,255,0.75)',
    lineHeight: 1,
  }),
  text('?', 760, 760, 260, {
    fontFamily: HEAD,
    fontSize: 340,
    fontWeight: 800,
    fill: 'rgba(255,255,255,0.45)',
    lineHeight: 1,
  }),
  text('DID', 90, 200, 600, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 800,
    fill: CLAY.paper,
    lineHeight: 1,
  }),
  rect(90, 400, 420, 170, CLAY.deep, { cornerRadius: 18, rotation: -5, name: 'Highlight' }),
  text('YOU', 120, 405, 400, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 800,
    fill: CLAY.paper,
    lineHeight: 1,
    rotation: -5,
  }),
  text('KNOW?', 90, 590, 960, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 800,
    fill: CLAY.paper,
    lineHeight: 1,
  }),
  text('One clear plan', 90, 840, 700, {
    fontFamily: BODY,
    fontSize: 46,
    fontWeight: 500,
    fill: CLAY.paper,
  }),
  text('Triples Your Reach', 90, 900, 760, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 800,
    fill: CLAY.ink,
  }),
  button('Read more', 90, 1100, CLAY.paper, CLAY.deep),
]);

const hourglass = (palette: ClayPalette): Nodes[] => [
  rect(640, 120, 380, 40, palette.deep, { cornerRadius: 20, name: 'Hourglass cap' }),
  rect(640, 1180, 380, 40, palette.deep, { cornerRadius: 20, name: 'Hourglass base' }),
  poly(
    [
      [670, 160],
      [990, 160],
      [850, 670],
      [810, 670],
    ],
    palette.soft,
    { name: 'Upper glass', opacity: 0.45, stroke: palette.deep, strokeWidth: 4 },
  ),
  poly(
    [
      [810, 670],
      [850, 670],
      [990, 1180],
      [670, 1180],
    ],
    palette.soft,
    { name: 'Lower glass', opacity: 0.45, stroke: palette.deep, strokeWidth: 4 },
  ),
  poly(
    [
      [740, 420],
      [920, 420],
      [850, 670],
      [810, 670],
    ],
    palette.brand,
    { name: 'Upper sand' },
  ),
  rect(824, 670, 12, 330, palette.brand, { name: 'Sand stream' }),
  poly(
    [
      [830, 990],
      [960, 1180],
      [700, 1180],
    ],
    palette.brand,
    { name: 'Lower sand' },
  ),
];

export const timeWaits = (palette: ClayPalette, lines: readonly [string, string, string]) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, palette.paper, palette.light), { name: 'Background' }),
    hourglass(palette),
    text(lines[0], 80, 470, 620, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 800,
      fill: palette.brand,
      lineHeight: 1,
    }),
    text(lines[1], 80, 580, 620, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 400,
      fill: palette.deep,
    }),
    button(lines[2], 80, 720, palette.deep, palette.paper),
  ]);

export const TIME_WAITS = timeWaits(CLAY, ['Time Waits', 'for nobody', 'Start today']);
