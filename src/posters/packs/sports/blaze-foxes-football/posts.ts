import { linear } from '@/design';
import {
  circle,
  icon,
  line,
  POST_SIZE,
  photo,
  pill,
  rect,
  STORY_SIZE,
  type Template,
  template,
  text,
} from '../../../kit';
import { BLOCK, COND, crest, DISPLAY, FOX } from './palette';

const { width: W, height: H } = POST_SIZE;

const matchup = (y: number, home: string, away: string, color: string) => [
  crest(330, y, 120, FOX.blaze, 'flame', FOX.white),
  crest(630, y, 120, FOX.rival, 'zap', FOX.white),
  text('VS', 470, y + 34, 140, {
    fontFamily: DISPLAY,
    fontSize: 64,
    fontWeight: 400,
    fill: color,
    align: 'center',
  }),
  text(home, 290, y + 148, 200, {
    fontFamily: COND,
    fontSize: 30,
    fontWeight: 700,
    fill: color,
    align: 'center',
    letterSpacing: 3,
  }),
  text(away, 590, y + 148, 200, {
    fontFamily: COND,
    fontSize: 30,
    fontWeight: 700,
    fill: color,
    align: 'center',
    letterSpacing: 3,
  }),
];

export const gameDay = template(W, H, () => [
  rect(0, 0, W, H, linear(180, FOX.blaze, FOX.cream), { name: 'Background' }),
  text('SATURDAY, SEP 19  ·  7:00 PM', 0, 80, W, {
    fontFamily: COND,
    fontSize: 46,
    fontWeight: 700,
    fill: FOX.ink,
    align: 'center',
    letterSpacing: 3,
  }),
  text('GAMEDAY', 0, 150, W, {
    fontFamily: DISPLAY,
    fontSize: 260,
    fontWeight: 400,
    fill: FOX.white,
    align: 'center',
    lineHeight: 1.1,
  }),
  photo('football-1', 150, 470, 780, 560, { cornerRadius: 36 }),
  text('Malik Ortega', 440, 940, 480, {
    fontFamily: 'Pacifico',
    fontSize: 56,
    fontWeight: 400,
    fill: FOX.white,
    align: 'center',
  }),
  matchup(1080, 'FOXES', 'RAMS', FOX.ink),
]);

const countdown = (height: number) =>
  template(W, height, () => {
    const mid = height / 2;
    return [
      rect(0, 0, W, height, linear(180, FOX.smoke, FOX.ink), { name: 'Background' }),
      rect(W / 2 - 3, 0, 6, height, 'rgba(255,255,255,0.18)', { name: 'Midfield line' }),
      Array.from({ length: Math.floor(height / 54) }, (_, index) => [
        rect(40, 20 + index * 54, index % 5 === 0 ? 60 : 34, 6, 'rgba(255,255,255,0.3)', {
          name: 'Hash mark',
        }),
        rect(
          W - 40 - (index % 5 === 0 ? 60 : 34),
          20 + index * 54,
          index % 5 === 0 ? 60 : 34,
          6,
          'rgba(255,255,255,0.3)',
          {
            name: 'Hash mark',
          },
        ),
      ]),
      crest(470, mid - 520, 64, FOX.blaze, 'flame', FOX.white),
      text('RIDGEVIEW FOOTBALL', 0, mid - 430, W, {
        fontFamily: COND,
        fontSize: 40,
        fontWeight: 700,
        fill: FOX.white,
        align: 'center',
        letterSpacing: 6,
      }),
      text('36', 0, mid - 360, W, {
        fontFamily: DISPLAY,
        fontSize: 560,
        fontWeight: 400,
        fill: FOX.blaze,
        align: 'center',
        lineHeight: 1.1,
      }),
      text('HOURS UNTIL KICKOFF', 0, mid + 300, W, {
        fontFamily: COND,
        fontSize: 64,
        fontWeight: 700,
        fill: FOX.white,
        align: 'center',
        letterSpacing: 8,
      }),
      pill('FOXES VS RAMS  ·  HOLLIS FIELD', 250, mid + 410, {
        width: 580,
        fill: 'rgba(255,255,255,0.1)',
        color: FOX.cream,
        fontSize: 28,
        fontFamily: COND,
        fontWeight: 600,
        letterSpacing: 2,
      }),
    ];
  });

export const countdownPost = countdown(H);
export const countdownStory = countdown(STORY_SIZE.height);

const play = (x: number, y: number, mark: 'x' | 'o') =>
  mark === 'x'
    ? text('X', x, y, 60, {
        fontFamily: 'Permanent Marker',
        fontSize: 56,
        fontWeight: 400,
        fill: FOX.blaze,
        align: 'center',
      })
    : circle(x + 30, y + 34, 22, 'rgba(0,0,0,0)', { stroke: FOX.ink, strokeWidth: 6 });

export const matchups = template(W, H, () => [
  rect(0, 0, W, H, FOX.cream, { name: 'Background' }),
  [
    [560, 120, 'x'],
    [680, 90, 'x'],
    [800, 140, 'x'],
    [620, 220, 'o'],
    [740, 250, 'o'],
    [860, 230, 'x'],
    [500, 300, 'o'],
    [640, 330, 'o'],
    [780, 350, 'o'],
    [900, 320, 'x'],
  ].map(([x, y, mark]) => play(Number(x), Number(y), mark === 'x' ? 'x' : 'o')),
  line(110, 360, 300, FOX.ink, 6, { arrowEnd: true, rotation: 18, name: 'Play arrow' }),
  line(700, 1080, 260, FOX.ink, 6, { arrowEnd: true, rotation: -24, name: 'Play arrow' }),
  text('2027', 0, 470, W, {
    fontFamily: DISPLAY,
    fontSize: 130,
    fontWeight: 400,
    fill: FOX.blaze,
    align: 'center',
  }),
  text('SEASON\nMATCHUPS', 0, 640, W, {
    fontFamily: BLOCK,
    fontSize: 128,
    fontWeight: 400,
    fill: FOX.ink,
    align: 'center',
    lineHeight: 1.02,
  }),
  pill('VIEW SCHEDULE', 360, 960, {
    width: 360,
    fill: FOX.blaze,
    color: FOX.white,
    fontSize: 34,
    fontFamily: COND,
    fontWeight: 700,
    letterSpacing: 3,
  }),
  icon('flame', 510, 1200, 60, FOX.ink),
]);

const GAMES = [
  ['HOME', '9.05', 'Bay City Rams', '7:45 PM'],
  ['AWAY', '9.12', 'Northgate Owls', '5:00 PM'],
  ['HOME', '9.19', 'Pine Hill Wolves', 'NOON'],
  ['AWAY', '9.26', 'Coral Bay Sharks', '3:30 PM'],
  ['HOME', '10.03', 'Ashford Knights', '7:45 PM'],
  ['AWAY', '10.10', 'Delmar Hawks', '2:00 PM'],
  ['HOME', '10.17', 'Granite Bears', 'NOON'],
];

export const gameTimes = template(W, H, () => [
  rect(0, 0, W, H, linear(160, FOX.blaze, FOX.deep), { name: 'Background' }),
  text('GAME', 0, 70, W, {
    fontFamily: BLOCK,
    fontSize: 150,
    fontWeight: 400,
    fill: FOX.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('TIMES', 0, 215, W, {
    fontFamily: BLOCK,
    fontSize: 150,
    fontWeight: 400,
    fill: FOX.white,
    align: 'center',
    lineHeight: 1,
  }),
  GAMES.map(([where, date, team, time], index) => {
    const y = 430 + index * 112;
    const home = where === 'HOME';
    return [
      rect(80, y, 920, 88, home ? FOX.ink : 'rgba(255,255,255,0.18)', {
        cornerRadius: 44,
        name: 'Game row',
      }),
      text(where ?? '', 120, y + 28, 110, {
        fontFamily: COND,
        fontSize: 30,
        fontWeight: 700,
        fill: home ? FOX.blaze : FOX.ink,
        letterSpacing: 2,
      }),
      text(date ?? '', 230, y + 18, 120, {
        fontFamily: COND,
        fontSize: 46,
        fontWeight: 700,
        fill: FOX.white,
      }),
      text(team ?? '', 370, y + 20, 400, {
        fontFamily: COND,
        fontSize: 42,
        fontWeight: 600,
        fill: FOX.white,
      }),
      text(time ?? '', 760, y + 20, 200, {
        fontFamily: COND,
        fontSize: 42,
        fontWeight: 700,
        fill: home ? FOX.blaze : FOX.ink,
        align: 'right',
      }),
    ];
  }),
  text('All home games at Hollis Field', 0, 1250, W, {
    fontFamily: COND,
    fontSize: 36,
    fontWeight: 500,
    fill: FOX.ink,
    align: 'center',
    letterSpacing: 2,
  }),
]);

interface RivalCopy {
  home: string;
  away: string;
  homeColor: string;
  awayColor: string;
  top: string;
  bottom: string;
  topColor: string;
  bottomColor: string;
  tag: string;
  footer: string;
}

const rival = (copy: RivalCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, FOX.white, { name: 'Background' }),
    rect(0, 0, W, 640, linear(180, '#ececec', FOX.white), { name: 'Glow' }),
    crest(70, 90, 400, copy.homeColor, 'flame', FOX.white),
    crest(610, 90, 400, copy.awayColor, 'zap', FOX.white),
    text('VS', 470, 260, 140, {
      fontFamily: DISPLAY,
      fontSize: 96,
      fontWeight: 400,
      fill: FOX.ink,
      align: 'center',
    }),
    text(copy.home, 70, 560, 400, {
      fontFamily: COND,
      fontSize: 34,
      fontWeight: 700,
      fill: copy.homeColor,
      align: 'center',
      letterSpacing: 6,
    }),
    text(copy.away, 610, 560, 400, {
      fontFamily: COND,
      fontSize: 34,
      fontWeight: 700,
      fill: copy.awayColor,
      align: 'center',
      letterSpacing: 6,
    }),
    text(copy.top, 0, 680, W, {
      fontFamily: BLOCK,
      fontSize: 150,
      fontWeight: 400,
      fill: copy.topColor,
      align: 'center',
      lineHeight: 1,
    }),
    text(copy.bottom, 0, 840, W, {
      fontFamily: BLOCK,
      fontSize: 150,
      fontWeight: 400,
      fill: copy.bottomColor,
      align: 'center',
      lineHeight: 1,
    }),
    pill(copy.tag, 390, 1040, {
      width: 300,
      fill: copy.bottomColor,
      color: FOX.white,
      fontSize: 38,
      fontFamily: COND,
      fontWeight: 700,
      letterSpacing: 4,
    }),
    text(copy.footer, 0, 1190, W, {
      fontFamily: COND,
      fontSize: 34,
      fontWeight: 600,
      fill: FOX.ink,
      align: 'center',
      letterSpacing: 8,
    }),
  ]);

export const rivalNight = rival({
  home: 'FOXES',
  away: 'RAMS',
  homeColor: FOX.blaze,
  awayColor: FOX.rival,
  top: 'RIVAL',
  bottom: 'NIGHT',
  topColor: FOX.ink,
  bottomColor: FOX.blaze,
  tag: 'OCT 24',
  footer: 'HOLLIS MEMORIAL FIELD',
});

export const rivalRemix = rival({
  home: 'TITANS',
  away: 'COMETS',
  homeColor: '#6d28d9',
  awayColor: '#e11d48',
  top: 'CLASH OF',
  bottom: 'CHAMPIONS',
  topColor: '#e11d48',
  bottomColor: '#6d28d9',
  tag: 'NOV 07',
  footer: 'SATURDAY  ·  LAKESIDE BOWL',
});
