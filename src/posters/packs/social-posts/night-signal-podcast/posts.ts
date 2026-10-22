import { linear, radial } from '@/design';
import { circle, photo, poly, rect, shadow, template, text } from '../../../kit';
import { brandMark, H, MONO, SIGNAL as S, W, waveform } from './palette';

const BLOCK = 'Archivo Black';
const DISPLAY = 'Anton';
const BODY = 'Barlow';

const METRICS = [
  { value: '88%', title: 'Stay for ads', body: 'Most listeners keep the\nsponsor reads playing.' },
  { value: '71%', title: 'Daily habit', body: 'Tune in at least five\ndays every week.' },
  { value: '64%', title: 'Share clips', body: 'Send a favourite moment\nto a friend.' },
  { value: '49%', title: 'Buy from hosts', body: 'Tried a product a host\nrecommended on air.' },
];

export const audiencePulse = template(W, H, () => [
  rect(0, 0, W, H, linear(160, S.amber, S.flame), { name: 'Background' }),
  rect(100, 120, 600, 140, S.ink, { cornerRadius: 6, name: 'Title box' }),
  text('AUDIENCE', 100, 138, 600, {
    fontFamily: BLOCK,
    fontSize: 92,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1.1,
  }),
  rect(380, 250, 600, 140, S.white, { cornerRadius: 6, name: 'Title box' }),
  text('PULSE', 380, 268, 600, {
    fontFamily: BLOCK,
    fontSize: 92,
    fontWeight: 400,
    fill: S.ink,
    align: 'center',
    lineHeight: 1.1,
  }),
  METRICS.map((metric, index) => {
    const x = 100 + (index % 2) * 460;
    const y = 500 + Math.floor(index / 2) * 330;
    return [
      rect(x, y, 420, 270, S.white, { cornerRadius: 18, name: 'Metric card' }),
      rect(x + 28, y - 36, 190, 76, S.ink, { cornerRadius: 8, name: 'Metric value box' }),
      text(metric.value, x + 28, y - 28, 190, {
        fontFamily: BLOCK,
        fontSize: 50,
        fontWeight: 400,
        fill: S.amber,
        align: 'center',
        lineHeight: 1.2,
      }),
      text(metric.title, x + 32, y + 70, 360, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 800,
        fill: S.ink,
        uppercase: true,
        letterSpacing: 1,
      }),
      text(metric.body, x + 32, y + 124, 360, {
        fontFamily: BODY,
        fontSize: 27,
        fontWeight: 500,
        fill: S.slate,
        lineHeight: 1.35,
      }),
    ];
  }),
  brandMark(S.ink, 1210),
]);

export const onAirNightly = template(W, H, () => [
  rect(0, 0, W, H, S.ink, { name: 'Background' }),
  ['LIVE', 'LIVE'].map((word, index) =>
    text(word, 0, 90 + index * 590, W, {
      fontFamily: DISPLAY,
      fontSize: 560,
      fontWeight: 400,
      fill: 'rgba(0,0,0,0)',
      stroke: 'rgba(255,180,60,0.32)',
      strokeWidth: 3,
      align: 'center',
      lineHeight: 1,
    }),
  ),
  circle(540, 640, 420, radial('rgba(255,122,61,0.55)', 'rgba(20,15,38,0)'), { name: 'Glow' }),
  photo('microphone-1', 300, 220, 480, 840, { cornerRadius: 240 }),
  rect(300, 220, 480, 840, 'rgba(20,15,38,0.25)', { cornerRadius: 240, name: 'Photo tint' }),
  text('ON AIR', 0, 430, W, {
    fontFamily: DISPLAY,
    fontSize: 240,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1,
    ...shadow(30, 8, 'rgba(0,0,0,0.5)'),
  }),
  rect(300, 690, 480, 66, S.amber, { cornerRadius: 8, name: 'Label' }),
  text('STREAMING ON 92.1 FM', 300, 704, 480, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 800,
    fill: S.ink,
    align: 'center',
    letterSpacing: 2,
  }),
  text('NIGHTLY', 0, 770, W, {
    fontFamily: DISPLAY,
    fontSize: 240,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1,
    ...shadow(30, 8, 'rgba(0,0,0,0.5)'),
  }),
  brandMark(S.white, 1200),
]);

export const thankYou = template(W, H, () => [
  rect(0, 0, W, H, S.paper, { name: 'Background' }),
  circle(930, 150, 150, 'rgba(255,180,60,0.18)', { name: 'Dot' }),
  circle(150, 1200, 150, 'rgba(255,122,61,0.14)', { name: 'Dot' }),
  text('Thank you!', 0, 150, W, {
    fontFamily: 'Dancing Script',
    fontSize: 140,
    fontWeight: 700,
    fill: S.ink,
    align: 'center',
  }),
  text('FOR LISTENING IN', 0, 340, W, {
    fontFamily: DISPLAY,
    fontSize: 124,
    fontWeight: 400,
    fill: S.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('Monthly', 150, 560, 400, {
    fontFamily: BODY,
    fontSize: 60,
    fontWeight: 800,
    fill: S.flame,
  }),
  rect(150, 650, 780, 290, linear(90, S.amber, S.flame), { cornerRadius: 22, name: 'Number box' }),
  text('180K', 150, 665, 780, {
    fontFamily: DISPLAY,
    fontSize: 250,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('Listeners', 430, 960, 500, {
    fontFamily: BODY,
    fontSize: 64,
    fontWeight: 800,
    fill: S.ink,
    align: 'right',
  }),
  brandMark(S.ink, 1200),
]);

export const lateNight = template(W, H, () => [
  rect(0, 0, W, H, S.ink, { name: 'Background' }),
  text('New Episode', 90, 100, 500, {
    fontFamily: BODY,
    fontSize: 42,
    fontWeight: 600,
    fill: S.amber,
  }),
  photo('man-portrait-3', 90, 180, 820, 880, { cornerRadius: 36, filters: MONO }),
  rect(90, 520, 820, 540, linear(180, 'rgba(20,15,38,0)', 'rgba(20,15,38,0.96)'), {
    cornerRadius: 36,
    name: 'Fade',
  }),
  text('Late Night\nSessions', 140, 620, 720, {
    fontFamily: BLOCK,
    fontSize: 98,
    fontWeight: 400,
    fill: S.white,
    lineHeight: 1.05,
  }),
  text('Live at 11PM EST', 140, 850, 600, {
    fontFamily: BODY,
    fontSize: 46,
    fontWeight: 500,
    fill: S.white,
  }),
  waveform(140, 980, 720, 90, 36, S.amber),
  rect(966, 130, 6, 1080, S.white, { name: 'Progress line' }),
  poly(
    [
      [934, 104],
      [1004, 104],
      [969, 160],
    ],
    S.flame,
    { name: 'Progress marker' },
  ),
  brandMark(S.white, 1180, 500),
]);

const STATS = [
  { value: '48', label: 'EPISODES' },
  { value: '2.3M', label: 'TOTAL PLAYS' },
  { value: '96', label: 'GUESTS' },
];

export const inNumbers = template(W, H, () => [
  rect(0, 0, W, H, linear(180, S.night, S.ink), { name: 'Background' }),
  text('Season Two', 0, 90, W, {
    fontFamily: 'Dancing Script',
    fontSize: 96,
    fontWeight: 700,
    fill: S.amber,
    align: 'center',
  }),
  waveform(90, 500, 900, 300, 41, 'rgba(255,140,70,0.75)'),
  text('IN NUMBERS', 0, 420, W, {
    fontFamily: DISPLAY,
    fontSize: 160,
    fontWeight: 400,
    fill: S.white,
    align: 'center',
    lineHeight: 1,
    ...shadow(24, 6, 'rgba(0,0,0,0.6)'),
  }),
  STATS.map((item, index) => [
    text(item.value, 90 + index * 300, 760, 300, {
      fontFamily: DISPLAY,
      fontSize: 120,
      fontWeight: 400,
      fill: S.amber,
      align: 'center',
      lineHeight: 1,
    }),
    text(item.label, 90 + index * 300, 900, 300, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 700,
      fill: S.white,
      align: 'center',
      letterSpacing: 3,
    }),
  ]),
  rect(388, 780, 3, 160, S.plum, { name: 'Divider' }),
  rect(688, 780, 3, 160, S.plum, { name: 'Divider' }),
  text('TUNE IN ON 92.1 FM', 0, 1050, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 700,
    fill: S.mute,
    align: 'center',
    letterSpacing: 5,
  }),
  brandMark(S.white, 1200),
]);
