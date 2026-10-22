import { linear, radial } from '@/design';
import {
  circle,
  ellipse,
  photo,
  poly,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import { brandMark, H, MONO, SIGNAL as S, W } from './palette';

const BLOCK = 'Archivo Black';
const DISPLAY = 'Anton';
const BODY = 'Barlow';

export const countdown = template(W, H, () => [
  rect(0, 0, W, H, S.paper, { name: 'Background' }),
  text('NEW EPISODE', 0, 140, W, {
    fontFamily: DISPLAY,
    fontSize: 170,
    fontWeight: 400,
    fill: S.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('DROPS IN', 0, 320, W, {
    fontFamily: DISPLAY,
    fontSize: 170,
    fontWeight: 400,
    fill: S.ink,
    align: 'center',
    lineHeight: 1,
  }),
  [
    { value: '03', label: 'DAYS' },
    { value: '12', label: 'HOURS' },
    { value: '45', label: 'MINS' },
  ].map((item, index) => {
    const x = 115 + index * 300;
    return [
      rect(x, 590, 250, 270, linear(180, S.amber, S.flame), {
        cornerRadius: 20,
        name: 'Count box',
      }),
      text(item.value, x, 620, 250, {
        fontFamily: DISPLAY,
        fontSize: 200,
        fontWeight: 400,
        fill: S.white,
        align: 'center',
        lineHeight: 1,
      }),
      text(item.label, x, 890, 250, {
        fontFamily: BODY,
        fontSize: 38,
        fontWeight: 800,
        fill: S.ink,
        align: 'center',
        letterSpacing: 5,
      }),
    ];
  }),
  text('Set a reminder so you never miss a drop.', 0, 1010, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: S.slate,
    align: 'center',
  }),
  brandMark(S.ink, 1200),
]);

export const meetTheHost = template(W, H, () => [
  rect(0, 0, W, H, S.ink, { name: 'Background' }),
  text('MEET THE HOST', 0, 90, W, {
    fontFamily: DISPLAY,
    fontSize: 140,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1,
  }),
  rect(390, 248, 300, 10, S.amber, { cornerRadius: 5, name: 'Underline' }),
  rotateNodes(-4, 540, 620, [
    rect(250, 310, 580, 620, S.paper, {
      name: 'Photo frame',
      ...shadow(40, 16, 'rgba(0,0,0,0.5)'),
    }),
    photo('woman-portrait-4', 275, 335, 530, 570, { filters: MONO }),
  ]),
  rect(760, 300, 200, 70, S.amber, { cornerRadius: 35, rotation: 8, name: 'Episode tag' }),
  text('EP. 112', 760, 312, 200, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 800,
    fill: S.ink,
    align: 'center',
    rotation: 8,
  }),
  text('NOOR ABADI', 0, 990, W, {
    fontFamily: DISPLAY,
    fontSize: 104,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('CO-HOST  ·  @NOOR.ONAIR', 0, 1110, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 600,
    fill: S.mute,
    align: 'center',
    letterSpacing: 3,
  }),
  brandMark(S.white, 1220),
]);

const tuneInNodes = (height: number) => {
  const cx = 480;
  const cy = height - 500;
  const top = height - 1050;
  return [
    rect(0, 0, W, height, S.paper, { name: 'Background' }),
    brandMark(S.ink, height > H ? 200 : top - 160),
    [470, 430, 390].map((radius) =>
      ellipse(cx - radius, cy - radius, radius * 2, radius * 2, 'rgba(0,0,0,0)', {
        name: 'Groove ring',
        stroke: S.ink,
        strokeWidth: 12,
      }),
    ),
    circle(cx, cy, 340, S.ink, { name: 'Record' }),
    circle(cx, cy, 250, radial(S.amber, S.flame), { name: 'Label' }),
    circle(cx, cy, 60, S.ink, { name: 'Spindle ring' }),
    circle(cx, cy, 18, S.paper, { name: 'Spindle' }),
    rect(510, top, 480, 560, S.paper, { name: 'Title box', ...shadow(30, 10, 'rgba(0,0,0,0.12)') }),
    text('TUNE\nINTO\nLUMEN', 550, top + 30, 420, {
      fontFamily: DISPLAY,
      fontSize: 150,
      fontWeight: 400,
      fill: S.ink,
      lineHeight: 1,
    }),
    text('NEW EPISODE EVERY FRIDAY', 550, top + 495, 420, {
      fontFamily: BODY,
      fontSize: 27,
      fontWeight: 800,
      fill: S.flame,
      letterSpacing: 2,
    }),
  ];
};

export const tuneIn = template(W, H, () => tuneInNodes(H));

export const tuneInStory = template(STORY_SIZE.width, STORY_SIZE.height, () => [
  tuneInNodes(STORY_SIZE.height),
  text('EPISODE 48', 0, 360, W, {
    fontFamily: DISPLAY,
    fontSize: 150,
    fontWeight: 400,
    fill: S.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('Out now on every app', 0, 540, W, {
    fontFamily: 'Dancing Script',
    fontSize: 84,
    fontWeight: 700,
    fill: S.flame,
    align: 'center',
  }),
]);

interface WeeklyStyle {
  background: string;
  ink: string;
  accent: string;
  script: string;
  word: string;
  label: string;
}

const weeklyShow = (style: WeeklyStyle) =>
  template(W, H, () => [
    rect(0, 0, W, H, style.background, { name: 'Background' }),
    text(style.label, 0, 90, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 800,
      fill: style.ink,
      align: 'center',
      letterSpacing: 5,
    }),
    circle(540, 530, 340, style.accent, { name: 'Circle' }),
    photo('microphone-1', 250, 240, 580, 580, { cornerRadius: 290, filters: MONO }),
    star(4, 860, 200, 90, style.accent, { innerRatio: 0.3, name: 'Sparkle' }),
    star(4, 150, 760, 60, style.accent, { innerRatio: 0.3, name: 'Sparkle' }),
    text(style.script, 0, 880, W, {
      fontFamily: 'Dancing Script',
      fontSize: 110,
      fontWeight: 700,
      fill: style.accent,
      align: 'center',
    }),
    text(style.word, 0, 1000, W, {
      fontFamily: DISPLAY,
      fontSize: 150,
      fontWeight: 400,
      fill: style.ink,
      align: 'center',
      lineHeight: 1,
    }),
    brandMark(style.ink, 1225),
  ]);

export const weeklyBefore = weeklyShow({
  background: S.paper,
  ink: S.ink,
  accent: S.flame,
  script: 'Streaming',
  word: 'WEEKLY',
  label: 'AVAILABLE ON 92.1 FM',
});

export const weeklyAfter = weeklyShow({
  background: '#0d1b1e',
  ink: '#ffffff',
  accent: '#c6f432',
  script: 'Stream it',
  word: 'TONIGHT',
  label: 'FRESH EPISODES EVERY FRIDAY',
});

export const liveQa = template(W, H, () => [
  rect(0, 0, W, H, S.ink, { name: 'Background' }),
  text('ASK US', 90, 110, 900, {
    fontFamily: BLOCK,
    fontSize: 190,
    fontWeight: 400,
    fill: S.white,
    lineHeight: 1,
  }),
  text('ANYTHING', 90, 320, 900, {
    fontFamily: BLOCK,
    fontSize: 130,
    fontWeight: 400,
    fill: S.amber,
    lineHeight: 1,
  }),
  rect(110, 560, 540, 330, linear(160, S.amber, S.flame), { cornerRadius: 40, name: 'Bubble' }),
  poly(
    [
      [190, 880],
      [300, 880],
      [160, 990],
    ],
    S.flame,
    { name: 'Bubble tail' },
  ),
  text('LIVE  ·  THU 8PM', 150, 600, 460, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 800,
    fill: S.ink,
    letterSpacing: 2,
  }),
  rect(470, 740, 500, 330, S.white, { cornerRadius: 40, name: 'Bubble', ...shadow(40, 14) }),
  poly(
    [
      [800, 1060],
      [900, 1060],
      [940, 1160],
    ],
    S.white,
    { name: 'Bubble tail' },
  ),
  text('Q&A', 470, 815, 500, {
    fontFamily: BLOCK,
    fontSize: 150,
    fontWeight: 400,
    fill: S.flame,
    align: 'center',
    lineHeight: 1,
  }),
  brandMark(S.white, 1230, 400),
]);
