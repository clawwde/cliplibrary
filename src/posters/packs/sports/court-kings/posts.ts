import { linear, radial } from '@/design';
import {
  bars,
  circle,
  POST_SIZE,
  photo,
  pill,
  poly,
  rect,
  STORY_SIZE,
  star,
  stat,
  template,
  text,
} from '../../../kit';

const COURT = {
  green: '#0f5132',
  deep: '#062a1b',
  gold: '#f5b700',
  cream: '#fff8e7',
  white: '#ffffff',
};

const { width: W, height: H } = POST_SIZE;
const DISPLAY = 'Anton';

export const playerFeature = template(W, H, () => [
  rect(0, 0, W, H, linear(160, COURT.green, COURT.deep), { name: 'Background' }),
  text('23', -40, 120, 1160, {
    fontFamily: DISPLAY,
    fontSize: 900,
    fontWeight: 400,
    fill: 'rgba(245,183,0,0.22)',
    align: 'center',
    lineHeight: 1,
  }),
  photo('basketball-1', 140, 260, 800, 760, { cornerRadius: 40 }),
  text('MARCUS', 0, 1040, W, {
    fontFamily: DISPLAY,
    fontSize: 150,
    fontWeight: 400,
    fill: COURT.white,
    align: 'center',
    letterSpacing: 8,
  }),
  text('REED', 0, 1190, W, {
    fontFamily: DISPLAY,
    fontSize: 90,
    fontWeight: 400,
    fill: COURT.gold,
    align: 'center',
    letterSpacing: 30,
  }),
  pill('CAREER HIGH 41 PTS', 700, 80, {
    fill: COURT.gold,
    color: COURT.deep,
    fontSize: 30,
    fontFamily: 'Oswald',
    fontWeight: 600,
  }),
]);

export const saveTheDate = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#e9c48f', '#c9955a'), { name: 'Hardwood' }),
  Array.from({ length: 9 }, (_, index) =>
    rect(index * 120, 0, 4, H, 'rgba(120,72,30,0.18)', { name: 'Board seam' }),
  ),
  text('SAVE', 80, 140, 900, {
    fontFamily: DISPLAY,
    fontSize: 260,
    fontWeight: 400,
    fill: COURT.deep,
    lineHeight: 1,
  }),
  text('the', 90, 420, 400, {
    fontFamily: 'Pacifico',
    fontSize: 120,
    fontWeight: 400,
    fill: COURT.green,
  }),
  text('DATE', 80, 560, 900, {
    fontFamily: DISPLAY,
    fontSize: 260,
    fontWeight: 400,
    fill: COURT.deep,
    lineHeight: 1,
  }),
  rect(680, 160, 330, 560, COURT.deep, { cornerRadius: 24, name: 'Date card' }),
  text('TIP OFF', 680, 200, 330, {
    fontFamily: 'Oswald',
    fontSize: 44,
    fontWeight: 600,
    fill: COURT.gold,
    align: 'center',
  }),
  text('03\n14', 680, 270, 330, {
    fontFamily: DISPLAY,
    fontSize: 150,
    fontWeight: 400,
    fill: COURT.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('7:30 PM', 680, 600, 330, {
    fontFamily: 'Oswald',
    fontSize: 52,
    fontWeight: 600,
    fill: COURT.white,
    align: 'center',
  }),
  circle(880, 1110, 170, radial('#f58a2c', '#b4501a'), { name: 'Ball' }),
  text('Riverside Arena · Court 2', 80, 1180, 640, {
    fontFamily: 'Oswald',
    fontSize: 40,
    fontWeight: 500,
    fill: COURT.deep,
  }),
]);

export const startingFive = template(W, H, () => [
  rect(0, 0, W, H, COURT.cream, { name: 'Background' }),
  text('STARTING', 0, 70, W, {
    fontFamily: DISPLAY,
    fontSize: 170,
    fontWeight: 400,
    fill: COURT.green,
    align: 'center',
    lineHeight: 1,
  }),
  text('FIVE', 0, 240, W, {
    fontFamily: DISPLAY,
    fontSize: 170,
    fontWeight: 400,
    fill: 'rgba(0,0,0,0)',
    stroke: COURT.green,
    strokeWidth: 4,
    align: 'center',
    lineHeight: 1,
  }),
  photo('basketball-2', 60, 450, 960, 600, { cornerRadius: 28 }),
  ['Reed', 'Okoye', 'Lindqvist', 'Park', 'Duarte'].map((name, index) =>
    text(name.toUpperCase(), 60 + index * 196, 1100, 190, {
      fontFamily: 'Oswald',
      fontSize: 34,
      fontWeight: 600,
      fill: COURT.deep,
      align: 'center',
    }),
  ),
  rect(60, 1180, 960, 6, COURT.gold, { name: 'Rule' }),
  text('HOME OPENER · FRIDAY', 0, 1220, W, {
    fontFamily: 'Oswald',
    fontSize: 40,
    fontWeight: 500,
    fill: COURT.green,
    align: 'center',
    letterSpacing: 6,
  }),
]);

export const schedule = template(W, H, () => [
  rect(0, 0, W, H, COURT.green, { name: 'Background' }),
  text('MARCH', 80, 80, 600, {
    fontFamily: DISPLAY,
    fontSize: 160,
    fontWeight: 400,
    fill: COURT.white,
  }),
  text('2027 SCHEDULE', 80, 270, 600, {
    fontFamily: 'Oswald',
    fontSize: 46,
    fontWeight: 500,
    fill: COURT.gold,
    letterSpacing: 4,
  }),
  Array.from({ length: 28 }, (_, index) => {
    const x = 80 + (index % 7) * 132;
    const y = 400 + Math.floor(index / 7) * 150;
    const game = [3, 9, 12, 17, 24].includes(index);
    return [
      rect(x, y, 120, 130, game ? COURT.gold : 'rgba(255,255,255,0.08)', {
        cornerRadius: 14,
        name: 'Day',
      }),
      text(String(index + 1), x, y + 18, 120, {
        fontFamily: 'Oswald',
        fontSize: 44,
        fontWeight: 600,
        fill: game ? COURT.deep : COURT.white,
        align: 'center',
      }),
      game
        ? text(index % 2 === 0 ? 'HOME' : 'AWAY', x, y + 80, 120, {
            fontFamily: 'Oswald',
            fontSize: 22,
            fontWeight: 600,
            fill: COURT.deep,
            align: 'center',
          })
        : [],
    ];
  }),
  text('All games stream live on the team app', 80, 1040, 920, {
    fontFamily: 'Oswald',
    fontSize: 38,
    fontWeight: 400,
    fill: COURT.cream,
  }),
  pill('GET TICKETS', 80, 1150, {
    fill: COURT.gold,
    color: COURT.deep,
    fontSize: 36,
    fontFamily: 'Oswald',
    fontWeight: 600,
  }),
]);

const teamStats = template(W, H, () => [
  rect(0, 0, W, H, COURT.deep, { name: 'Background' }),
  text('TEAM', 80, 80, 900, {
    fontFamily: DISPLAY,
    fontSize: 190,
    fontWeight: 400,
    fill: COURT.white,
    lineHeight: 1,
  }),
  text('STATS', 80, 270, 900, {
    fontFamily: DISPLAY,
    fontSize: 190,
    fontWeight: 400,
    fill: COURT.gold,
    lineHeight: 1,
  }),
  stat('48%', 'Field goals', 80, 560, 420, {
    valueColor: COURT.white,
    labelColor: COURT.cream,
    fontFamily: DISPLAY,
    valueSize: 130,
  }),
  stat('112', 'Points per game', 580, 560, 420, {
    valueColor: COURT.white,
    labelColor: COURT.cream,
    fontFamily: DISPLAY,
    valueSize: 130,
  }),
  bars(80, 900, 920, 300, [62, 78, 70, 92, 84, 101, 112], linear(180, COURT.gold, '#c98a00')),
  text('Last seven games', 80, 1230, 600, {
    fontFamily: 'Oswald',
    fontSize: 34,
    fontWeight: 400,
    fill: COURT.cream,
  }),
]);

export const record = template(W, H, () => [
  rect(0, 0, W, H, COURT.cream, { name: 'Background' }),
  poly(
    [
      [0, 0],
      [W, 0],
      [W, 520],
      [0, 820],
    ],
    COURT.green,
    { name: 'Split' },
  ),
  text('UNDEFEATED', 80, 90, 900, {
    fontFamily: 'Oswald',
    fontSize: 64,
    fontWeight: 600,
    fill: COURT.gold,
    letterSpacing: 10,
  }),
  text('7-0', 60, 160, 960, {
    fontFamily: DISPLAY,
    fontSize: 470,
    fontWeight: 400,
    fill: COURT.white,
    lineHeight: 1,
  }),
  text('RECORD', 660, 840, 360, {
    fontFamily: DISPLAY,
    fontSize: 110,
    fontWeight: 400,
    fill: COURT.green,
    rotation: 0,
  }),
  star(5, 90, 900, 140, COURT.gold, { innerRatio: 0.42 }),
  text('Best start in club history.\nThank you for the noise.', 80, 1080, 900, {
    fontFamily: 'Oswald',
    fontSize: 52,
    fontWeight: 500,
    fill: COURT.deep,
    lineHeight: 1.3,
  }),
]);

export const allStar = template(STORY_SIZE.width, STORY_SIZE.height, () => [
  rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, linear(170, COURT.green, COURT.deep), {
    name: 'Background',
  }),
  photo('basketball-1', 0, 0, STORY_SIZE.width, 1150, { name: 'Hero' }),
  rect(0, 900, STORY_SIZE.width, 260, linear(180, 'rgba(6,42,27,0)', COURT.deep), { name: 'Fade' }),
  star(5, 780, 120, 220, COURT.gold, { innerRatio: 0.42 }),
  text('ALL-STAR', 0, 1180, STORY_SIZE.width, {
    fontFamily: DISPLAY,
    fontSize: 240,
    fontWeight: 400,
    fill: COURT.white,
    align: 'center',
  }),
  text('Player of the month', 0, 1470, STORY_SIZE.width, {
    fontFamily: 'Pacifico',
    fontSize: 96,
    fontWeight: 400,
    fill: COURT.gold,
    align: 'center',
  }),
  pill('VOTE NOW', 380, 1700, {
    fill: COURT.gold,
    color: COURT.deep,
    fontSize: 44,
    fontFamily: 'Oswald',
    fontWeight: 600,
  }),
]);

export const allStarPost = template(W, H, () => [
  rect(0, 0, W, H, linear(170, COURT.green, COURT.deep), { name: 'Background' }),
  photo('basketball-1', 0, 0, W, 760, { name: 'Hero' }),
  star(5, 820, 60, 180, COURT.gold, { innerRatio: 0.42 }),
  text('ALL-STAR', 0, 800, W, {
    fontFamily: DISPLAY,
    fontSize: 210,
    fontWeight: 400,
    fill: COURT.white,
    align: 'center',
  }),
  text('Player of the month', 0, 1060, W, {
    fontFamily: 'Pacifico',
    fontSize: 80,
    fontWeight: 400,
    fill: COURT.gold,
    align: 'center',
  }),
]);

export const CRIMSON_RECORD = template(W, H, () => [
  rect(0, 0, W, H, '#fdeaea', { name: 'Background' }),
  poly(
    [
      [0, 0],
      [W, 0],
      [W, 520],
      [0, 820],
    ],
    '#9f1d2d',
    { name: 'Split' },
  ),
  text('UNDEFEATED', 80, 90, 900, {
    fontFamily: 'Oswald',
    fontSize: 64,
    fontWeight: 600,
    fill: '#ffd1d1',
    letterSpacing: 10,
  }),
  text('7-0', 60, 160, 960, {
    fontFamily: DISPLAY,
    fontSize: 470,
    fontWeight: 400,
    fill: COURT.white,
    lineHeight: 1,
  }),
  text('RECORD', 660, 840, 360, {
    fontFamily: DISPLAY,
    fontSize: 110,
    fontWeight: 400,
    fill: '#9f1d2d',
  }),
  star(5, 90, 900, 140, '#9f1d2d', { innerRatio: 0.42 }),
  text('Best start in club history.\nThank you for the noise.', 80, 1080, 900, {
    fontFamily: 'Oswald',
    fontSize: 52,
    fontWeight: 500,
    fill: '#3b0a12',
    lineHeight: 1.3,
  }),
]);

export const POSTS = [
  playerFeature,
  saveTheDate,
  startingFive,
  schedule,
  teamStats,
  record,
  allStarPost,
];
