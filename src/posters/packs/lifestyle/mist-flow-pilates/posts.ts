import { type DesignIconName, linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  POST_SIZE,
  photo,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';
import { BODY, MIST, SERIF, TALL } from './palette';

const { width: W, height: H } = POST_SIZE;

const TRACKS: readonly (readonly [string, string, string])[] = [
  ['Slow Tide', 'Luma Rae', '3:42'],
  ['Open Hips', 'Northfield', '4:10'],
  ['Exhale', 'Coral Static', '2:58'],
  ['Still Water', 'Ama Lin', '5:06'],
];

const track = (x: number, y: number, index: number) => {
  const [title, artist, length] = TRACKS[index] ?? ['Untitled', 'Unknown', '0:00'];
  return [
    rect(x, y, 300, 170, 'rgba(238,242,243,0.92)', { cornerRadius: 24, name: 'Track card' }),
    text(title, x + 26, y + 20, 250, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 700,
      fill: MIST.ink,
    }),
    text(artist, x + 26, y + 58, 250, {
      fontFamily: BODY,
      fontSize: 22,
      fontWeight: 500,
      fill: MIST.slate,
    }),
    rect(x + 26, y + 104, 248, 6, MIST.fog, { cornerRadius: 3, name: 'Track bar' }),
    rect(x + 26, y + 104, 110 + index * 30, 6, MIST.ink, { cornerRadius: 3, name: 'Progress' }),
    text('1:24', x + 26, y + 120, 100, {
      fontFamily: BODY,
      fontSize: 20,
      fontWeight: 500,
      fill: MIST.slate,
    }),
    text(length, x + 174, y + 120, 100, {
      fontFamily: BODY,
      fontSize: 20,
      fontWeight: 500,
      fill: MIST.slate,
      align: 'right',
    }),
    icon('play', x + 132, y + 118, 34, MIST.ink),
  ];
};

export const flowJams = template(W, H, () => [
  photo('yoga-2', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(30,42,51,0.5)', { name: 'Dim' }),
  text('Flow Jams', 0, 70, W, {
    fontFamily: SERIF,
    fontSize: 160,
    fontWeight: 400,
    italic: true,
    fill: MIST.white,
    align: 'center',
  }),
  text('(Studio Playlist)', 0, 250, W, {
    fontFamily: SERIF,
    fontSize: 54,
    fontWeight: 400,
    italic: true,
    fill: MIST.mint,
    align: 'center',
  }),
  track(50, 760, 0),
  track(50, 960, 1),
  track(730, 760, 2),
  track(730, 960, 3),
]);

export const pilatesBig = template(W, H, () => [
  rect(0, 0, W, H, MIST.mist, { name: 'Background' }),
  text('PILATES', 0, 10, W, {
    fontFamily: TALL,
    fontSize: 300,
    fontWeight: 400,
    fill: MIST.ink,
    align: 'center',
    lineHeight: 1.1,
  }),
  text("LET'S FLOW AND RISE TOGETHER", 70, 390, 640, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 600,
    fill: MIST.slate,
    letterSpacing: 4,
  }),
  text('Studio Mira', 700, 384, 310, {
    fontFamily: SERIF,
    fontSize: 44,
    fontWeight: 400,
    italic: true,
    fill: MIST.ink,
    align: 'right',
  }),
  photo('yoga-1', 40, 470, 1000, 840, { cornerRadius: 36 }),
  rect(80, 1150, 330, 110, 'rgba(238,242,243,0.92)', { cornerRadius: 55, name: 'Badge' }),
  text('Mon to Sat\n7 AM classes', 80, 1166, 330, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: MIST.ink,
    align: 'center',
    lineHeight: 1.2,
  }),
]);

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const HOURS = ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

export const workoutCalendar = template(W, H, () => [
  rect(0, 0, W, H, linear(180, MIST.white, MIST.mist), { name: 'Background' }),
  DAYS.map((day, index) => {
    const x = 90 + index * 140;
    const today = index === 3;
    return [
      text(day, x - 40, 60, 80, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 600,
        fill: MIST.slate,
        align: 'center',
      }),
      today ? circle(x, 140, 40, MIST.ink) : [],
      text(String(index + 1), x - 40, 120, 80, {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 600,
        fill: today ? MIST.white : MIST.ink,
        align: 'center',
      }),
    ];
  }),
  text('Wednesday  ·  Aug 4, 2027', 0, 210, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: MIST.slate,
    align: 'center',
  }),
  HOURS.map((hour, index) => [
    text(hour, 50, 290 + index * 125, 110, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 500,
      fill: MIST.slate,
    }),
    rect(180, 306 + index * 125, 860, 2, MIST.fog, { name: 'Hour line' }),
  ]),
  text('work\nout', 170, 340, 700, {
    fontFamily: BODY,
    fontSize: 230,
    fontWeight: 900,
    fill: MIST.ink,
    lineHeight: 0.9,
    letterSpacing: -6,
  }),
  rect(690, 690, 330, 120, MIST.mint, { cornerRadius: 10, name: 'Event' }),
  rect(690, 690, 10, 120, MIST.sage, { name: 'Event bar' }),
  text('Morning\nMeditation', 716, 704, 290, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 700,
    fill: MIST.ink,
    lineHeight: 1.15,
  }),
  rect(180, 940, 840, 100, MIST.sky, { cornerRadius: 10, name: 'Event' }),
  rect(180, 940, 10, 100, MIST.slate, { name: 'Event bar' }),
  text('Hot Yoga Flow  ·  18:00', 210, 970, 780, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 700,
    fill: MIST.ink,
  }),
]);

const NAV: readonly DesignIconName[] = ['house', 'search', 'plus', 'heart', 'user'];

export const profileFrame = template(W, H, () => [
  rect(0, 0, W, H, linear(180, MIST.fog, MIST.slate), { name: 'Background' }),
  rotateNodes(-4, 540, 675, [
    rect(150, 150, 780, 1060, MIST.white, {
      cornerRadius: 12,
      name: 'Frame',
      ...shadow(40, 18, 'rgba(30,42,51,0.3)'),
    }),
    avatar('woman-portrait-4', 220, 230, 38),
    text('Lena Ortiz', 278, 196, 500, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 700,
      fill: MIST.ink,
    }),
    text('@mistflow.studio', 278, 236, 500, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 500,
      fill: MIST.slate,
    }),
    icon('badge-check', 450, 200, 32, MIST.sage),
    photo('woman-portrait-2', 190, 300, 700, 780),
    NAV.map((glyph, index) => icon(glyph, 230 + index * 140, 1112, 52, MIST.ink)),
  ]),
]);
