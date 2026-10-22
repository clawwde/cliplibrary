import { IMAGE_FILTER_PRESETS, linear } from '@/design';
import {
  avatar,
  circle,
  group,
  icon,
  type Nodes,
  POST_SIZE,
  photo,
  poly,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';

export const CRIMSON = {
  red: '#c8102e',
  bright: '#e63950',
  wine: '#5c0816',
  deep: '#22040a',
  blush: '#fde8ea',
  white: '#ffffff',
  ink: '#1a0b0e',
  grey: '#6b5a5e',
};

export const HEAD = 'Lexend';

const { width: W, height: H } = POST_SIZE;

export const deepBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(170, CRIMSON.wine, CRIMSON.deep), { name: 'Background' });

const blushBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(180, CRIMSON.white, CRIMSON.blush), { name: 'Background' });

export const tag = (
  label: string,
  x: number,
  y: number,
  size: number,
  style: { fill?: string; color?: string; width?: number } = {},
) => {
  const width = style.width ?? label.length * size * 0.62 + size * 0.9;
  return group(
    rect(x, y, width, size * 1.45, style.fill ?? CRIMSON.red, {
      cornerRadius: 6,
      name: `${label} tag`,
    }),
    text(label, x, y + size * 0.16, width, {
      fontFamily: HEAD,
      fontSize: size,
      fontWeight: 700,
      fill: style.color ?? CRIMSON.white,
      align: 'center',
    }),
  );
};

export const sevenHundred = template(W, H, () => [
  blushBackdrop(),
  text('700+', 60, 280, 960, {
    fontFamily: HEAD,
    fontSize: 340,
    fontWeight: 800,
    fill: linear(180, CRIMSON.bright, CRIMSON.red),
    lineHeight: 1,
    letterSpacing: -10,
  }),
  text('Happy clients who trust\nour growth services', 80, 680, 900, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 500,
    fill: CRIMSON.ink,
    lineHeight: 1.25,
  }),
  avatar('woman-portrait-1', 140, 1100, 54, CRIMSON.white),
  avatar('man-portrait-1', 220, 1100, 54, CRIMSON.white),
  circle(300, 1100, 58, CRIMSON.red),
  icon('plus', 272, 1072, 56, CRIMSON.white, { strokeWidth: 2.6 }),
  text('Join the founders who\ngrow with us', 400, 1056, 600, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 500,
    fill: CRIMSON.ink,
    lineHeight: 1.25,
  }),
]);

const SERVICES = ['Strategy', 'Auditing', 'Coaching', 'Training', 'Finance', 'Hiring'] as const;

export const whatYouNeed = template(W, H, () => [
  blushBackdrop(),
  text('We have', 0, 120, W, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 500,
    fill: CRIMSON.ink,
    align: 'center',
  }),
  tag('Everything You Need', 170, 220, 64, { width: 740 }),
  SERVICES.map((service, index) => {
    const x = 120 + index * 145;
    const y = index === 3 ? 560 : 430;
    const active = index === 3;
    return group(
      rect(x, y, 115, 520, active ? CRIMSON.red : CRIMSON.deep, {
        cornerRadius: 10,
        name: `${service} tab`,
        ...shadow(20, 8, 'rgba(34,4,10,0.25)'),
      }),
      text(service, x + 28, y + 470, 420, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 600,
        fill: CRIMSON.white,
        rotation: -90,
      }),
    );
  }),
  text('Consider it handled.', 0, 1180, W, {
    fontFamily: HEAD,
    fontSize: 48,
    fontWeight: 700,
    italic: true,
    fill: CRIMSON.red,
    align: 'center',
  }),
]);

const clock = (cx: number, cy: number, radius: number): Nodes[] => [
  circle(cx, cy, radius + 26, CRIMSON.ink, { name: 'Clock rim', ...shadow(40, 16) }),
  circle(cx, cy, radius, CRIMSON.white, { name: 'Clock face' }),
  Array.from({ length: 12 }, (_, index) =>
    rotateNodes(index * 30, cx, cy, [
      rect(cx - 8, cy - radius + 24, 16, index % 3 === 0 ? 70 : 40, CRIMSON.ink, {
        cornerRadius: 4,
        name: 'Hour mark',
      }),
    ]),
  ),
  rotateNodes(-60, cx, cy, [
    rect(cx - 9, cy - radius * 0.55, 18, radius * 0.55, CRIMSON.ink, {
      cornerRadius: 9,
      name: 'Hour hand',
    }),
  ]),
  rotateNodes(70, cx, cy, [
    rect(cx - 6, cy - radius * 0.8, 12, radius * 0.8, CRIMSON.red, {
      cornerRadius: 6,
      name: 'Minute hand',
    }),
  ]),
  circle(cx, cy, 18, CRIMSON.red),
];

export const clockPost = template(W, H, () => [
  deepBackdrop(),
  tag('Time Waits', 340, 120, 50, { fill: CRIMSON.white, color: CRIMSON.red, width: 400 }),
  tag('For No One', 240, 220, 90, { width: 600 }),
  text('Post when it counts', 0, 380, W, {
    fontFamily: HEAD,
    fontSize: 44,
    fontWeight: 500,
    fill: CRIMSON.blush,
    align: 'center',
  }),
  clock(540, 900, 330),
]);

const spotlightArt = (height: number): Nodes[] => {
  const top = (height - H) / 2;
  return [
    deepBackdrop(height),
    poly(
      [
        [440, 0],
        [640, 0],
        [940, top + 1060],
        [140, top + 1060],
      ],
      linear(180, 'rgba(255,220,225,0.55)', 'rgba(255,220,225,0)'),
      { name: 'Spotlight' },
    ),
    rect(400, 0, 280, 40, CRIMSON.ink, { cornerRadius: 12, name: 'Lamp' }),
    photo('man-portrait-2', 260, top + 230, 560, 620, {
      cornerRadius: 280,
      filters: IMAGE_FILTER_PRESETS.mono,
    }),
    tag('Team Spotlight', 300, top + 880, 44, {
      fill: CRIMSON.white,
      color: CRIMSON.ink,
      width: 480,
    }),
    tag('1,200 Leads', 210, top + 960, 100, { width: 660 }),
    text('This Quarter', 0, top + 1130, W, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 500,
      fill: CRIMSON.white,
      align: 'center',
    }),
  ];
};

export const spotlightPost = template(W, H, () => spotlightArt(H));

export const spotlightStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  spotlightArt(STORY_SIZE.height),
);
