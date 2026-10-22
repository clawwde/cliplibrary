import { linear, NO_FILTERS } from '@/design';
import {
  circle,
  icon,
  line,
  POST_SIZE,
  photo,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';
import { AUT, BODY, HAND, SERIF } from './palette';

const { width: W, height: H } = POST_SIZE;

export const firstDayOfFall = template(W, H, () => [
  rect(0, 0, W, H, AUT.oat, { name: 'Background' }),
  photo('autumn-leaves', 0, 520, W, 830, { name: 'Leaves' }),
  rotateNodes(-3, 540, 330, [
    rect(70, 90, 940, 500, AUT.white, { name: 'Postcard', ...shadow(30, 14, 'rgba(0,0,0,0.25)') }),
    rect(860, 120, 120, 146, AUT.rose, { name: 'Stamp' }),
    rect(872, 132, 96, 122, AUT.oat, { name: 'Stamp inner' }),
    icon('leaf', 890, 160, 60, AUT.berry, { strokeWidth: 2 }),
    text('Hello', 120, 120, 300, {
      fontFamily: HAND,
      fontSize: 76,
      fontWeight: 600,
      fill: AUT.berry,
    }),
    text('FIRST DAY\nOF FALL', 120, 214, 580, {
      fontFamily: SERIF,
      fontSize: 86,
      fontWeight: 700,
      fill: AUT.plum,
      lineHeight: 1,
    }),
    text('SEPTEMBER 22, 2027', 120, 440, 520, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: AUT.sage,
      letterSpacing: 5,
    }),
    rect(700, 300, 3, 240, AUT.line, { name: 'Divider' }),
    text('Hello sweater\nweather, warm\ncider and long\ncrisp walks', 730, 300, 260, {
      fontFamily: HAND,
      fontSize: 44,
      fontWeight: 500,
      fill: AUT.espresso,
      lineHeight: 1.1,
    }),
  ]),
  rect(90, 600, 160, 44, 'rgba(201,139,139,0.85)', { rotation: -12, name: 'Tape' }),
  text('@mapleandmoss', 0, 1250, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 600,
    fill: AUT.white,
    align: 'center',
  }),
]);

const SONGS: readonly (readonly [string, string])[] = [
  ['Cardigan Days', 'Juniper Lane'],
  ['Amber Light', 'The Hollows'],
  ['Cider Season', 'Ivy Marsh'],
  ['Slow Sunday', 'Northbound'],
  ['Copper Leaves', 'Wren & Fox'],
  ['Woodsmoke', 'Pale Harbor'],
];

const song = (x: number, y: number, index: number) => {
  const [title, artist] = SONGS[index] ?? ['Untitled', 'Unknown'];
  const fills = [AUT.plum, AUT.sage, AUT.berry];
  return [
    rect(x, y, 280, 150, fills[index % 3] ?? AUT.plum, {
      cornerRadius: 20,
      opacity: 0.94,
      name: 'Song card',
    }),
    text(title, x + 24, y + 18, 240, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 700,
      fill: AUT.oat,
    }),
    text(artist, x + 24, y + 56, 240, {
      fontFamily: BODY,
      fontSize: 22,
      fontWeight: 500,
      fill: AUT.butter,
    }),
    rect(x + 24, y + 100, 140, 6, 'rgba(245,239,228,0.35)', { cornerRadius: 3, name: 'Track' }),
    rect(x + 24, y + 100, 80, 6, AUT.oat, { cornerRadius: 3, name: 'Progress' }),
    icon('play', x + 210, y + 84, 40, AUT.oat),
  ];
};

export const playlist = template(W, H, () => [
  photo('autumn-leaves', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(43,29,24,0.5)', { name: 'Dim' }),
  text('Autumn', 0, 70, W, {
    fontFamily: SERIF,
    fontSize: 150,
    fontWeight: 600,
    italic: true,
    fill: AUT.oat,
    align: 'center',
  }),
  text('(Playlist Edition)', 0, 260, W, {
    fontFamily: SERIF,
    fontSize: 46,
    fontWeight: 500,
    italic: true,
    fill: AUT.butter,
    align: 'center',
  }),
  photo('woman-portrait-2', 360, 400, 360, 620, { cornerRadius: 180 }),
  song(50, 420, 0),
  song(50, 640, 1),
  song(50, 860, 2),
  song(750, 420, 3),
  song(750, 640, 4),
  song(750, 860, 5),
  text('Press play on sweater season', 0, 1170, W, {
    fontFamily: HAND,
    fontSize: 60,
    fontWeight: 600,
    fill: AUT.oat,
    align: 'center',
  }),
]);

export const notesQuote = template(W, H, () => [
  photo('woman-portrait-1', 0, 0, W, H, { name: 'Portrait' }),
  rect(0, 0, W, H, 'rgba(74,35,56,0.18)', { name: 'Tint' }),
  rect(130, 930, 820, 330, 'rgba(241,220,167,0.96)', {
    cornerRadius: 30,
    name: 'Note card',
    ...shadow(30, 12, 'rgba(0,0,0,0.25)'),
  }),
  icon('arrow-left', 160, 966, 40, AUT.berry),
  text('Notes', 204, 962, 300, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 700,
    fill: AUT.berry,
  }),
  icon('share-2', 820, 964, 40, AUT.berry),
  icon('pencil', 870, 964, 40, AUT.berry),
  line(170, 1030, 740, 'rgba(123,58,82,0.25)', 2),
  text('Slow mornings, warm mugs and\ngolden light. Fall is a soft reset.', 170, 1060, 740, {
    fontFamily: BODY,
    fontSize: 40,
    fontWeight: 500,
    fill: AUT.espresso,
    lineHeight: 1.35,
  }),
]);

const THANKFUL = ['quiet mornings', 'crisp weather', 'simple moments', 'long slow walks'];

export const thankfulFor = template(W, H, () => [
  photo('autumn-mug', 0, 0, W, H, { name: 'Cozy tray' }),
  rect(0, 0, W, H, 'rgba(43,29,24,0.2)', { name: 'Dim' }),
  rect(210, 330, 660, 640, 'rgba(255,255,255,0.88)', {
    cornerRadius: 40,
    name: 'Search card',
    ...shadow(40, 16, 'rgba(0,0,0,0.25)'),
  }),
  rect(250, 370, 580, 100, AUT.white, { cornerRadius: 50, stroke: AUT.line, strokeWidth: 3 }),
  text('thankful for', 300, 396, 400, {
    fontFamily: BODY,
    fontSize: 42,
    fontWeight: 500,
    fill: AUT.espresso,
  }),
  icon('search', 740, 394, 52, AUT.berry, { strokeWidth: 2.4 }),
  THANKFUL.map((item, index) => [
    icon('search', 280, 530 + index * 108, 36, AUT.rose),
    text(item, 340, 522 + index * 108, 480, {
      fontFamily: BODY,
      fontSize: 42,
      fontWeight: 500,
      fill: AUT.plum,
    }),
  ]),
]);

export const lockScreen = template(W, H, () => [
  photo('autumn-leaves', 0, 0, W, H, {
    name: 'Blurred leaves',
    filters: { ...NO_FILTERS, blur: 6, brightness: 0.7 },
  }),
  rect(0, 0, W, H, linear(180, 'rgba(74,35,56,0.35)', 'rgba(43,29,24,0.1)'), { name: 'Tint' }),
  icon('lock', 510, 90, 60, AUT.oat),
  text('10:07', 0, 180, W, {
    fontFamily: BODY,
    fontSize: 240,
    fontWeight: 600,
    fill: AUT.oat,
    align: 'center',
  }),
  text('Sunday, November 7', 0, 470, W, {
    fontFamily: BODY,
    fontSize: 46,
    fontWeight: 500,
    fill: AUT.oat,
    align: 'center',
  }),
  rect(190, 640, 700, 180, 'rgba(245,239,228,0.82)', { cornerRadius: 40, name: 'Reminder' }),
  circle(270, 730, 44, AUT.berry),
  icon('bell', 248, 708, 44, AUT.oat),
  text('Reminder', 340, 676, 500, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 700,
    fill: AUT.espresso,
  }),
  text('It is okay to slow down today.', 340, 730, 520, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: AUT.plum,
  }),
  circle(190, 1190, 64, 'rgba(0,0,0,0.35)'),
  icon('sun', 160, 1160, 60, AUT.oat),
  circle(890, 1190, 64, 'rgba(0,0,0,0.35)'),
  icon('camera', 860, 1160, 60, AUT.oat),
]);
