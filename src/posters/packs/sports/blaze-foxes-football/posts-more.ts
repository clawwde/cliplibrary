import { linear } from '@/design';
import { icon, POST_SIZE, photo, pill, rect, template, text } from '../../../kit';
import { BLOCK, COND, crest, DISPLAY, FOX } from './palette';

const { width: W, height: H } = POST_SIZE;

const POLL = [
  ['FOXES', '9-0'],
  ['KNIGHTS', '8-1'],
  ['RAMS', '7-1'],
  ['OWLS', '7-2'],
  ['WOLVES', '6-3'],
];

export const topFive = template(W, H, () => [
  rect(0, 0, W, H, FOX.ink, { name: 'Background' }),
  rect(0, 0, W, 16, FOX.blaze, { name: 'Top rule' }),
  text('TOP 5', 0, 90, W, {
    fontFamily: BLOCK,
    fontSize: 170,
    fontWeight: 400,
    fill: FOX.blaze,
    align: 'center',
    lineHeight: 1,
  }),
  text('POWER POLL', 0, 270, W, {
    fontFamily: BLOCK,
    fontSize: 84,
    fontWeight: 400,
    fill: FOX.white,
    align: 'center',
    lineHeight: 1,
  }),
  POLL.map(([team, recordValue], index) => {
    const y = 450 + index * 150;
    const lead = index === 0;
    return [
      rect(90, y, 900, 120, lead ? FOX.blaze : FOX.smoke, { cornerRadius: 20, name: 'Poll row' }),
      text(String(index + 1), 120, y + 18, 90, {
        fontFamily: DISPLAY,
        fontSize: 72,
        fontWeight: 400,
        fill: lead ? FOX.ink : FOX.blaze,
        align: 'center',
      }),
      text(team ?? '', 240, y + 24, 400, {
        fontFamily: COND,
        fontSize: 62,
        fontWeight: 700,
        fill: FOX.white,
        letterSpacing: 2,
      }),
      text(recordValue ?? '', 640, y + 34, 160, {
        fontFamily: COND,
        fontSize: 44,
        fontWeight: 600,
        fill: lead ? FOX.ink : FOX.grey,
        align: 'right',
      }),
      icon(lead ? 'crown' : 'shield', 870, y + 30, 60, lead ? FOX.ink : FOX.white),
    ];
  }),
  text('Week 9 standings  ·  Valley Conference', 0, 1240, W, {
    fontFamily: COND,
    fontSize: 34,
    fontWeight: 500,
    fill: FOX.grey,
    align: 'center',
    letterSpacing: 2,
  }),
]);

const STATS = [
  ['418', 'TOTAL YARDS', '352'],
  ['271', 'PASS YARDS', '230'],
  ['147', 'RUSH YARDS', '122'],
];

export const gameStats = template(W, H, () => [
  rect(0, 0, W, H, FOX.ink, { name: 'Background' }),
  photo('football-1', 0, 0, W, 640, { name: 'Hero' }),
  rect(0, 420, W, 230, linear(180, 'rgba(20,20,20,0)', FOX.ink), { name: 'Fade' }),
  text('GAME STATS', 0, 640, W, {
    fontFamily: DISPLAY,
    fontSize: 120,
    fontWeight: 400,
    fill: FOX.white,
    align: 'center',
  }),
  pill('FOXES', 250, 810, {
    width: 260,
    fill: FOX.blaze,
    color: FOX.white,
    fontSize: 34,
    fontFamily: COND,
    fontWeight: 700,
    letterSpacing: 3,
  }),
  pill('RAMS', 570, 810, {
    width: 260,
    fill: FOX.rival,
    color: FOX.white,
    fontSize: 34,
    fontFamily: COND,
    fontWeight: 700,
    letterSpacing: 3,
  }),
  STATS.map(([home, label, away], index) => {
    const y = 920 + index * 120;
    return [
      rect(110, y, 860, 96, FOX.smoke, { cornerRadius: 16, name: 'Stat row' }),
      text(home ?? '', 140, y + 16, 180, {
        fontFamily: DISPLAY,
        fontSize: 58,
        fontWeight: 400,
        fill: FOX.blaze,
        align: 'center',
      }),
      text(label ?? '', 340, y + 26, 400, {
        fontFamily: COND,
        fontSize: 40,
        fontWeight: 700,
        fill: FOX.white,
        align: 'center',
        letterSpacing: 4,
      }),
      text(away ?? '', 760, y + 16, 180, {
        fontFamily: DISPLAY,
        fontSize: 58,
        fontWeight: 400,
        fill: FOX.rival,
        align: 'center',
      }),
    ];
  }),
]);

export const finalScore = template(W, H, () => [
  rect(0, 0, W, H, FOX.ink, { name: 'Background' }),
  photo('football-field', 0, 0, 700, H, { name: 'Field' }),
  rect(700, 0, 380, H, FOX.blaze, { name: 'Score panel' }),
  crest(830, 90, 120, FOX.ink, 'flame', FOX.blaze),
  text('FOXES', 700, 260, 380, {
    fontFamily: COND,
    fontSize: 48,
    fontWeight: 700,
    fill: FOX.ink,
    align: 'center',
    letterSpacing: 6,
  }),
  text('31', 700, 310, 380, {
    fontFamily: DISPLAY,
    fontSize: 230,
    fontWeight: 400,
    fill: FOX.white,
    align: 'center',
  }),
  rect(760, 640, 260, 70, FOX.ink, { cornerRadius: 35, name: 'Final tag' }),
  text('FINAL', 760, 652, 260, {
    fontFamily: COND,
    fontSize: 40,
    fontWeight: 700,
    fill: FOX.blaze,
    align: 'center',
    letterSpacing: 8,
  }),
  text('24', 700, 740, 380, {
    fontFamily: DISPLAY,
    fontSize: 230,
    fontWeight: 400,
    fill: FOX.ink,
    align: 'center',
  }),
  text('RAMS', 700, 1040, 380, {
    fontFamily: COND,
    fontSize: 48,
    fontWeight: 700,
    fill: FOX.ink,
    align: 'center',
    letterSpacing: 6,
  }),
  text('OCT 10  ·  WEEK 6', 700, 1220, 380, {
    fontFamily: COND,
    fontSize: 30,
    fontWeight: 600,
    fill: FOX.ink,
    align: 'center',
    letterSpacing: 3,
  }),
]);

export const playerOfWeek = template(W, H, () => [
  rect(0, 0, W, H, FOX.cream, { name: 'Background' }),
  photo('man-portrait-3', 600, 0, 480, H, { name: 'Player' }),
  rect(600, 900, 480, 450, linear(180, 'rgba(20,20,20,0)', 'rgba(20,20,20,0.85)'), {
    name: 'Fade',
  }),
  text('PLAYER', 60, 90, 540, {
    fontFamily: DISPLAY,
    fontSize: 190,
    fontWeight: 400,
    fill: FOX.ink,
    lineHeight: 1,
  }),
  rect(60, 330, 250, 90, FOX.blaze, { name: 'Of the tag' }),
  text('OF THE', 60, 344, 250, {
    fontFamily: COND,
    fontSize: 54,
    fontWeight: 700,
    fill: FOX.white,
    align: 'center',
    letterSpacing: 4,
  }),
  text('WEEK', 60, 440, 540, {
    fontFamily: DISPLAY,
    fontSize: 190,
    fontWeight: 400,
    fill: FOX.blaze,
    lineHeight: 1,
  }),
  text('DANTE\nREYES', 60, 760, 500, {
    fontFamily: BLOCK,
    fontSize: 84,
    fontWeight: 400,
    fill: FOX.ink,
    lineHeight: 1.05,
  }),
  text('#7  ·  RUNNING BACK', 60, 960, 500, {
    fontFamily: COND,
    fontSize: 36,
    fontWeight: 600,
    fill: FOX.deep,
    letterSpacing: 2,
  }),
  text('186', 640, 1140, 200, {
    fontFamily: DISPLAY,
    fontSize: 110,
    fontWeight: 400,
    fill: FOX.white,
  }),
  text('RUSH\nYARDS', 830, 1160, 220, {
    fontFamily: COND,
    fontSize: 40,
    fontWeight: 700,
    fill: FOX.blaze,
    lineHeight: 1.1,
    letterSpacing: 3,
  }),
]);
