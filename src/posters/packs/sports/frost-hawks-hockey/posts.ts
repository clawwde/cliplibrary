import { linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
  POST_SIZE,
  photo,
  poly,
  rect,
  STORY_SIZE,
  star,
  template,
  text,
} from '../../../kit';
import { DISPLAY, HAWKS, iceBackground, LABEL, SCRIPT, toned } from './palette';

const { width: W, height: H } = POST_SIZE;

const STAT_ROWS = [
  ['FINAL SCORE', '5', '2'],
  ['SHOTS ON GOAL', '38', '24'],
  ['POWER PLAY', '2/4', '0/3'],
  ['HITS', '21', '17'],
  ['FACEOFFS', '56%', '44%'],
  ['SAVES', '22', '33'],
] as const;

const STARS = [
  ['man-portrait-1', 'J. LAINE'],
  ['man-portrait-2', 'M. OKAFOR'],
  ['man-portrait-3', 'T. REYES'],
] as const;

export const finalStats = template(W, H, () => [
  rect(0, 0, W, H, linear(170, HAWKS.navy, HAWKS.deep), { name: 'Background' }),
  rect(0, 0, 300, H, linear(180, HAWKS.steel, HAWKS.navy), { name: 'Side band' }),
  text('FINAL STATS', 30, 1290, 1230, {
    fontFamily: DISPLAY,
    fontSize: 250,
    fontWeight: 400,
    fill: HAWKS.ice,
    rotation: -90,
    letterSpacing: 4,
    lineHeight: 1,
  }),
  text('HAWKS  vs  RAVENS', 340, 110, 680, {
    fontFamily: LABEL,
    fontSize: 44,
    fontWeight: 700,
    fill: HAWKS.white,
    letterSpacing: 4,
  }),
  STAT_ROWS.map(([label, home, away], index) => {
    const y = 200 + index * 92;
    return [
      rect(340, y, 680, 76, HAWKS.white, { cornerRadius: 12, name: 'Stat row' }),
      text(label, 370, y + 16, 380, {
        fontFamily: LABEL,
        fontSize: 40,
        fontWeight: 700,
        fill: HAWKS.navy,
      }),
      rect(770, y + 10, 110, 56, HAWKS.navy, { cornerRadius: 8, name: 'Home value' }),
      text(home, 770, y + 16, 110, {
        fontFamily: LABEL,
        fontSize: 40,
        fontWeight: 700,
        fill: HAWKS.amber,
        align: 'center',
      }),
      text(away, 900, y + 16, 100, {
        fontFamily: LABEL,
        fontSize: 40,
        fontWeight: 600,
        fill: HAWKS.navy,
        align: 'center',
      }),
    ];
  }),
  text('THREE STARS', 340, 790, 680, {
    fontFamily: LABEL,
    fontSize: 40,
    fontWeight: 700,
    fill: HAWKS.ice,
    letterSpacing: 6,
  }),
  STARS.map(([portrait, name], index) => {
    const x = 340 + index * 235;
    return [
      photo(portrait, x, 860, 210, 250, {
        cornerRadius: 16,
        stroke: HAWKS.ice,
        strokeWidth: 4,
      }),
      star(5, x + 160, 875, 36, HAWKS.amber, { innerRatio: 0.45 }),
      text(name, x - 10, 1130, 230, {
        fontFamily: LABEL,
        fontSize: 36,
        fontWeight: 700,
        fill: HAWKS.white,
        align: 'center',
      }),
    ];
  }),
  text('FROST HAWKS HOCKEY CLUB', 340, 1240, 680, {
    fontFamily: LABEL,
    fontSize: 32,
    fontWeight: 600,
    fill: HAWKS.ice,
    letterSpacing: 6,
  }),
]);

export const puckDrop = template(W, H, () => [
  iceBackground(W, H),
  circle(540, 520, 350, linear(180, '#1f2a40', '#04070e'), {
    name: 'Puck',
    shadow: { color: 'rgba(5,12,29,0.35)', blur: 50, offsetX: 0, offsetY: 24 },
  }),
  ellipse(220, 200, 640, 640, 'rgba(0,0,0,0)', {
    stroke: 'rgba(143,211,255,0.35)',
    strokeWidth: 6,
    name: 'Puck ring',
  }),
  text('PUCK DROP', 190, 270, 700, {
    fontFamily: DISPLAY,
    fontSize: 110,
    fontWeight: 400,
    fill: HAWKS.white,
    align: 'center',
    letterSpacing: 8,
  }),
  circle(540, 520, 105, linear(150, HAWKS.amber, HAWKS.gold)),
  icon('feather', 480, 460, 120, HAWKS.navy, { strokeWidth: 1.8 }),
  text('NOV 08, 2027', 190, 655, 700, {
    fontFamily: DISPLAY,
    fontSize: 84,
    fontWeight: 400,
    fill: HAWKS.ice,
    align: 'center',
    letterSpacing: 4,
  }),
  text('7:30', 60, 920, 640, {
    fontFamily: DISPLAY,
    fontSize: 360,
    fontWeight: 400,
    fill: HAWKS.navy,
    align: 'right',
    lineHeight: 1,
  }),
  text('PM', 730, 960, 300, {
    fontFamily: DISPLAY,
    fontSize: 150,
    fontWeight: 400,
    fill: HAWKS.gold,
    lineHeight: 1,
  }),
  text('EST', 730, 1100, 300, {
    fontFamily: DISPLAY,
    fontSize: 150,
    fontWeight: 400,
    fill: HAWKS.navy,
    lineHeight: 1,
  }),
]);

export const playerCard = template(W, H, () => [
  rect(0, 0, W, H, linear(160, HAWKS.steel, HAWKS.deep), { name: 'Background' }),
  poly(
    [
      [120, 120],
      [960, 120],
      [960, 1100],
      [880, 1190],
      [120, 1190],
    ],
    linear(160, '#cfe8f7', '#3d6f99'),
    { name: 'Card frame' },
  ),
  toned('hockey-2', 145, 145, 790, 950, 'rgba(10,22,49,0.28)'),
  rect(80, 80, 210, 230, HAWKS.navy, { stroke: HAWKS.ice, strokeWidth: 6, name: 'Rating box' }),
  text('94', 80, 96, 210, {
    fontFamily: DISPLAY,
    fontSize: 150,
    fontWeight: 400,
    fill: HAWKS.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('OVERALL', 80, 250, 210, {
    fontFamily: LABEL,
    fontSize: 36,
    fontWeight: 700,
    fill: HAWKS.ice,
    align: 'center',
    letterSpacing: 4,
  }),
  rect(500, 1010, 500, 230, HAWKS.navy, { stroke: HAWKS.ice, strokeWidth: 6, name: 'Name box' }),
  text('LUKAS', 535, 1030, 300, {
    fontFamily: DISPLAY,
    fontSize: 80,
    fontWeight: 400,
    fill: HAWKS.white,
    letterSpacing: 4,
  }),
  text('#19', 830, 1040, 140, {
    fontFamily: LABEL,
    fontSize: 48,
    fontWeight: 700,
    fill: HAWKS.ice,
    align: 'right',
  }),
  text('BRANDT', 535, 1105, 440, {
    fontFamily: DISPLAY,
    fontSize: 120,
    fontWeight: 400,
    fill: HAWKS.amber,
    letterSpacing: 4,
    lineHeight: 1,
  }),
  text('FROST HAWKS', 1050, 200, 600, {
    fontFamily: LABEL,
    fontSize: 44,
    fontWeight: 700,
    fill: HAWKS.ice,
    rotation: 90,
    letterSpacing: 10,
  }),
]);

const playerStat = (value: string, label: string, y: number) => [
  text(value, 760, y, 260, {
    fontFamily: DISPLAY,
    fontSize: 100,
    fontWeight: 400,
    fill: HAWKS.navy,
    lineHeight: 1,
  }),
  text(label, 760, y + 100, 260, {
    fontFamily: LABEL,
    fontSize: 32,
    fontWeight: 700,
    fill: HAWKS.gold,
    letterSpacing: 3,
  }),
];

export const playerOfYear = template(W, H, () => [
  iceBackground(W, H),
  poly(
    [
      [0, 1220],
      [W, 1110],
      [W, H],
      [0, H],
    ],
    linear(90, HAWKS.navy, HAWKS.blue),
    { name: 'Ice band' },
  ),
  text('PLAYER OF THE YEAR', 0, 80, W, {
    fontFamily: LABEL,
    fontSize: 46,
    fontWeight: 700,
    italic: true,
    fill: HAWKS.navy,
    align: 'center',
    letterSpacing: 14,
  }),
  text('150', 0, 150, W, {
    fontFamily: DISPLAY,
    fontSize: 430,
    fontWeight: 400,
    fill: HAWKS.navy,
    align: 'center',
    lineHeight: 1,
  }),
  text('POINTS', 600, 560, 400, {
    fontFamily: DISPLAY,
    fontSize: 90,
    fontWeight: 400,
    fill: HAWKS.gold,
    align: 'right',
    letterSpacing: 6,
  }),
  text('MILO', 80, 600, 400, {
    fontFamily: DISPLAY,
    fontSize: 80,
    fontWeight: 400,
    fill: HAWKS.navy,
  }),
  text('HARTLEY', 80, 670, 600, {
    fontFamily: DISPLAY,
    fontSize: 120,
    fontWeight: 400,
    fill: HAWKS.blue,
  }),
  text('#27  CENTER', 80, 800, 400, {
    fontFamily: LABEL,
    fontSize: 32,
    fontWeight: 600,
    fill: HAWKS.navy,
    letterSpacing: 4,
  }),
  toned('hockey-2', 80, 860, 620, 400, 'rgba(29,111,184,0.18)', { radius: 28 }),
  playerStat('61.2', 'FACEOFF WIN %', 680),
  playerStat('94', 'ASSISTS', 860),
  playerStat('56', 'GOALS', 1040),
]);

const gameDay = (height: number) => {
  const top = (height - H) / 2;
  return template(W, height, () => [
    iceBackground(W, height),
    text('Game Day', 0, 60 + top * 0.6, W, {
      fontFamily: SCRIPT,
      fontSize: 140,
      fontWeight: 400,
      fill: HAWKS.gold,
      align: 'center',
    }),
    text('NOV. 8', 0, 220 + top * 0.6, W, {
      fontFamily: DISPLAY,
      fontSize: 400,
      fontWeight: 400,
      fill: linear(180, HAWKS.blue, HAWKS.navy),
      align: 'center',
      lineHeight: 1,
    }),
    rect(190, 640 + top * 0.6, 700, 64, HAWKS.navy, { cornerRadius: 6, name: 'Info bar' }),
    text('HAWKS vs RAVENS  |  7:30 PM EST', 190, 652 + top * 0.6, 700, {
      fontFamily: LABEL,
      fontSize: 36,
      fontWeight: 700,
      fill: HAWKS.white,
      align: 'center',
      letterSpacing: 3,
    }),
    photo('hockey-1', 60, 760 + top * 0.6, 960, height - 820 - top * 0.6, {
      cornerRadius: 28,
      stroke: HAWKS.navy,
      strokeWidth: 8,
    }),
  ]);
};

export const gameDayPost = gameDay(H);
export const gameDayStory = gameDay(STORY_SIZE.height);
