import { IMAGE_FILTER_PRESETS, linear } from '@/design';
import {
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const SUNSET = {
  orange: '#ff6a1a',
  ember: '#d94a00',
  glow: '#ff9a5c',
  soft: '#fff3ea',
  peach: '#ffd9c2',
  charcoal: '#16120f',
  smoke: '#2a221d',
  white: '#ffffff',
  grey: '#8a7f78',
};

export const HEAD = 'Urbanist';

const { width: W, height: H } = POST_SIZE;

export const orangeBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(165, SUNSET.glow, SUNSET.ember), { name: 'Background' });

export const darkBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(180, SUNSET.smoke, SUNSET.charcoal), { name: 'Background' });

export const label = (
  content: string,
  x: number,
  y: number,
  size: number,
  width: number,
  fill: string = SUNSET.charcoal,
  color: string = SUNSET.white,
) =>
  group(
    rect(x, y, width, size * 1.4, fill, { cornerRadius: 8, name: `${content} label` }),
    text(content, x, y + size * 0.16, width, {
      fontFamily: HEAD,
      fontSize: size,
      fontWeight: 800,
      fill: color,
      align: 'center',
    }),
  );

const bubble = (x: number, y: number, kind: 'heart' | 'message-circle', count: string) =>
  group(
    rect(x, y, 190, 84, SUNSET.orange, {
      cornerRadius: 18,
      name: 'Reaction',
      ...shadow(20, 8, 'rgba(0,0,0,0.25)'),
    }),
    icon(kind, x + 22, y + 20, 44, SUNSET.white, { strokeWidth: 2.4 }),
    text(count, x + 80, y + 20, 100, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 800,
      fill: SUNSET.white,
    }),
  );

export const startImpact = template(W, H, () => [
  rect(0, 0, W, H, SUNSET.white, { name: 'Background' }),
  photo('team-2', 0, 760, W, 590, { filters: IMAGE_FILTER_PRESETS.mono }),
  rect(0, 760, W, 160, linear(180, '#ffffff', 'rgba(255,255,255,0)'), { name: 'Fade' }),
  label('Stop chasing likes', 300, 130, 40, 480),
  text('Start Building', 0, 240, W, {
    fontFamily: HEAD,
    fontSize: 100,
    fontWeight: 800,
    fill: SUNSET.charcoal,
    align: 'center',
  }),
  text('Real Influence', 0, 360, W, {
    fontFamily: HEAD,
    fontSize: 100,
    fontWeight: 800,
    fill: SUNSET.orange,
    align: 'center',
  }),
  bubble(150, 560, 'heart', '128'),
  bubble(440, 620, 'message-circle', '64'),
  bubble(730, 540, 'heart', '310'),
  bubble(90, 800, 'message-circle', '42'),
  bubble(800, 820, 'heart', '96'),
]);

interface DayPalette {
  background: string;
  word: string;
  face: string;
  ring: string;
  hand: string;
  copy: string;
  button: string;
  buttonText: string;
}

const ORANGE_DAY: DayPalette = {
  background: SUNSET.orange,
  word: SUNSET.white,
  face: SUNSET.white,
  ring: SUNSET.charcoal,
  hand: SUNSET.orange,
  copy: SUNSET.white,
  button: SUNSET.white,
  buttonText: SUNSET.charcoal,
};

export const TEAL_DAY: DayPalette = {
  background: '#e9f7f5',
  word: '#0d3b3a',
  face: '#ffffff',
  ring: '#14b8a6',
  hand: '#0d3b3a',
  copy: '#0d3b3a',
  button: '#0d3b3a',
  buttonText: '#ffffff',
};

const dial = (cx: number, cy: number, radius: number, palette: DayPalette): Nodes[] => [
  circle(cx, cy, radius + 16, palette.ring, { name: 'Clock rim', ...shadow(30, 12) }),
  circle(cx, cy, radius, palette.face, { name: 'Clock face' }),
  Array.from({ length: 12 }, (_, index) =>
    rotateNodes(index * 30, cx, cy, [
      rect(cx - 4, cy - radius + 12, 8, index % 3 === 0 ? 26 : 14, palette.ring, {
        cornerRadius: 3,
        name: 'Mark',
      }),
    ]),
  ),
  rotateNodes(-40, cx, cy, [
    rect(cx - 6, cy - radius * 0.5, 12, radius * 0.5, palette.hand, {
      cornerRadius: 6,
      name: 'Hand',
    }),
  ]),
  rotateNodes(90, cx, cy, [
    rect(cx - 4, cy - radius * 0.75, 8, radius * 0.75, palette.ring, {
      cornerRadius: 4,
      name: 'Hand',
    }),
  ]),
  circle(cx, cy, 10, palette.hand),
];

export const dayPost = (palette: DayPalette, words: readonly [string, string, string, string]) =>
  template(W, H, () => [
    rect(0, 0, W, H, palette.background, { name: 'Background' }),
    text(words[0], 0, 210, W, {
      fontFamily: HEAD,
      fontSize: 300,
      fontWeight: 900,
      fill: palette.word,
      align: 'center',
      lineHeight: 1,
    }),
    text('D', 130, 500, 260, {
      fontFamily: HEAD,
      fontSize: 300,
      fontWeight: 900,
      fill: palette.word,
      align: 'center',
      lineHeight: 1,
    }),
    dial(540, 650, 140, palette),
    text('Y', 690, 500, 260, {
      fontFamily: HEAD,
      fontSize: 300,
      fontWeight: 900,
      fill: palette.word,
      align: 'center',
      lineHeight: 1,
    }),
    text(words[1], 0, 880, W, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 700,
      fill: palette.copy,
      align: 'center',
      letterSpacing: 3,
    }),
    group(
      rect(370, 990, 340, 84, palette.button, { cornerRadius: 42, name: 'Button' }),
      text(words[2], 370, 1012, 340, {
        fontFamily: HEAD,
        fontSize: 32,
        fontWeight: 800,
        fill: palette.buttonText,
        align: 'center',
      }),
    ),
    text(words[3], 0, 1210, W, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 600,
      fill: palette.copy,
      align: 'center',
    }),
  ]);

export const MONDAY = dayPost(ORANGE_DAY, [
  'MON',
  "LET'S SET THE AGENDA",
  'Book a call',
  'emberline.co',
]);

export const webinarSpeaker = template(W, H, () => [
  rect(0, 0, W, H, linear(180, SUNSET.white, SUNSET.soft), { name: 'Background' }),
  rect(0, 0, 230, H, SUNSET.orange, { name: 'Band' }),
  text('WEBINAR', 40, 1250, 1200, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 900,
    fill: SUNSET.white,
    rotation: -90,
    lineHeight: 1,
  }),
  photo('man-portrait-2', 230, 500, 440, 850, { filters: IMAGE_FILTER_PRESETS.mono }),
  text('Set\nYour', 700, 150, 360, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 500,
    fill: SUNSET.charcoal,
    lineHeight: 1.05,
  }),
  text('Growth\nTargets', 700, 316, 360, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 900,
    fill: SUNSET.orange,
    lineHeight: 1.05,
  }),
  text('Thursday, June 12\nat 5 PM CET', 700, 520, 360, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 600,
    fill: SUNSET.charcoal,
    lineHeight: 1.35,
  }),
  label('Save a seat', 700, 640, 32, 260),
]);

export const everythingCtrl = template(W, H, () => [
  rect(0, 0, W, H, linear(180, SUNSET.white, SUNSET.peach), { name: 'Background' }),
  text('EVERY\nTHING', 0, 140, W, {
    fontFamily: HEAD,
    fontSize: 190,
    fontWeight: 900,
    fill: SUNSET.charcoal,
    align: 'center',
    lineHeight: 0.92,
  }),
  text('IS UNDER', 0, 500, W, {
    fontFamily: HEAD,
    fontSize: 110,
    fontWeight: 500,
    fill: SUNSET.charcoal,
    align: 'center',
    letterSpacing: 6,
  }),
  rect(330, 720, 420, 420, SUNSET.ember, {
    cornerRadius: 90,
    name: 'Key base',
    ...shadow(60, 30, 'rgba(217,74,0,0.45)'),
  }),
  rect(350, 700, 380, 380, linear(160, SUNSET.glow, SUNSET.orange), {
    cornerRadius: 80,
    name: 'Key top',
  }),
  text('ctrl', 390, 740, 300, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 600,
    fill: SUNSET.white,
  }),
]);
