import { linear } from '@/design';
import { circle, icon, POST_SIZE, photo, rect, template, text } from '../../../kit';
import { DISPLAY, HAWKS, iceBackground, LABEL, SCRIPT, toned } from './palette';

const { width: W, height: H } = POST_SIZE;

interface QuoteStyle {
  background: string;
  fade: string;
  ink: string;
  accent: string;
  portrait: 'man-portrait-2' | 'man-portrait-3';
  name: string;
  number: string;
  quote: string;
}

const quote = (style: QuoteStyle) =>
  template(W, H, () => [
    rect(0, 0, W, H, style.background, { name: 'Background' }),
    toned(style.portrait, 240, 60, 600, 800, 'rgba(0,0,0,0)'),
    rect(240, 520, 600, 340, linear(180, style.fade, style.background), { name: 'Fade' }),
    text(style.name, 560, 680, 440, {
      fontFamily: SCRIPT,
      fontSize: 64,
      fontWeight: 400,
      fill: style.ink,
      rotation: -8,
    }),
    text(style.number, 880, 560, 140, {
      fontFamily: LABEL,
      fontSize: 52,
      fontWeight: 600,
      italic: true,
      fill: style.accent,
    }),
    text('“', 90, 790, 200, {
      fontFamily: DISPLAY,
      fontSize: 300,
      fontWeight: 400,
      fill: style.accent,
    }),
    text(style.quote, 140, 900, 800, {
      fontFamily: DISPLAY,
      fontSize: 110,
      fontWeight: 400,
      fill: style.ink,
      align: 'center',
      lineHeight: 1.05,
    }),
    text('”', 850, 1110, 200, {
      fontFamily: DISPLAY,
      fontSize: 300,
      fontWeight: 400,
      fill: style.accent,
    }),
  ]);

export const quoteNight = quote({
  background: HAWKS.deep,
  fade: 'rgba(5,12,29,0)',
  ink: HAWKS.white,
  accent: HAWKS.amber,
  portrait: 'man-portrait-2',
  name: 'Lukas Brandt',
  number: '#19',
  quote: 'EVERY SHIFT IS A\nCHANCE TO PROVE IT',
});

export const quoteFrost = quote({
  background: HAWKS.frost,
  fade: 'rgba(238,245,251,0)',
  ink: HAWKS.navy,
  accent: HAWKS.blue,
  portrait: 'man-portrait-3',
  name: 'Ari Lindqvist',
  number: '#44',
  quote: 'HARD WORK BEATS\nTALENT EVERY TIME',
});

const LINEUP = [
  ['ELI', 'MARSH', '9', 'C'],
  ['NOAH', 'KESSLER', '17', 'LW'],
  ['OWEN', 'PARK', '22', 'RW'],
  ['DANTE', 'RUIZ', '4', 'LD'],
  ['SAMI', 'KORHONEN', '6', 'RD'],
  ['JONAS', 'VALE', '31', 'G'],
] as const;

export const startingLineup = template(W, H, () => [
  rect(0, 0, W, H, linear(160, HAWKS.steel, HAWKS.deep), { name: 'Background' }),
  text('STARTING', 80, 70, 900, {
    fontFamily: DISPLAY,
    fontSize: 160,
    fontWeight: 400,
    fill: HAWKS.white,
    lineHeight: 1,
    letterSpacing: 4,
  }),
  text('LINEUP', 80, 220, 900, {
    fontFamily: DISPLAY,
    fontSize: 160,
    fontWeight: 400,
    fill: HAWKS.ice,
    lineHeight: 1,
    letterSpacing: 4,
  }),
  LINEUP.map(([first, last, number, position], index) => {
    const y = 420 + index * 140;
    return [
      rect(80, y, 920, 116, HAWKS.white, { cornerRadius: 14, name: 'Player row' }),
      text(first, 115, y + 10, 400, {
        fontFamily: LABEL,
        fontSize: 28,
        fontWeight: 600,
        fill: '#64748b',
        letterSpacing: 3,
      }),
      text(last, 115, y + 46, 500, {
        fontFamily: DISPLAY,
        fontSize: 60,
        fontWeight: 400,
        fill: HAWKS.navy,
        lineHeight: 1,
        letterSpacing: 2,
      }),
      text(number, 650, y + 14, 210, {
        fontFamily: DISPLAY,
        fontSize: 96,
        fontWeight: 400,
        fill: HAWKS.navy,
        align: 'right',
        lineHeight: 1,
      }),
      rect(890, y, 110, 116, HAWKS.amber, { cornerRadius: 14, name: 'Position' }),
      text(position, 890, y + 30, 110, {
        fontFamily: DISPLAY,
        fontSize: 60,
        fontWeight: 400,
        fill: HAWKS.navy,
        align: 'center',
        lineHeight: 1,
      }),
    ];
  }),
]);

const GAMES = [
  ['NOV 3', 'RAVENS', 'HOME'],
  ['NOV 7', 'IRONCLADS', 'AWAY'],
  ['NOV 12', 'NORTH STARS', 'HOME'],
  ['NOV 16', 'BLIZZARD', 'AWAY'],
  ['NOV 21', 'TIMBERWOLVES', 'HOME'],
  ['NOV 27', 'RAVENS', 'AWAY'],
] as const;

export const schedule = template(W, H, () => [
  iceBackground(W, H),
  text('NOV GAMES', 0, 60, W, {
    fontFamily: DISPLAY,
    fontSize: 190,
    fontWeight: 400,
    fill: HAWKS.navy,
    align: 'center',
    letterSpacing: 6,
  }),
  GAMES.map(([date, opponent, venue], index) => {
    const y = 300 + index * 150;
    const home = venue === 'HOME';
    return [
      rect(110, y, 860, 110, home ? HAWKS.navy : HAWKS.white, {
        cornerRadius: 14,
        stroke: HAWKS.navy,
        strokeWidth: home ? 0 : 4,
        name: 'Game row',
      }),
      text(date, 145, y + 22, 200, {
        fontFamily: DISPLAY,
        fontSize: 72,
        fontWeight: 400,
        fill: home ? HAWKS.amber : HAWKS.blue,
        lineHeight: 1,
      }),
      text(`vs ${opponent}`, 360, y + 22, 420, {
        fontFamily: DISPLAY,
        fontSize: 72,
        fontWeight: 400,
        fill: home ? HAWKS.white : HAWKS.navy,
        lineHeight: 1,
      }),
      text(`${venue}\n7:00 PM`, 790, y + 18, 150, {
        fontFamily: LABEL,
        fontSize: 32,
        fontWeight: 700,
        fill: home ? HAWKS.ice : HAWKS.navy,
        align: 'right',
        lineHeight: 1.15,
      }),
    ];
  }),
  text('Tickets and streams at frosthawks.club', 0, 1240, W, {
    fontFamily: LABEL,
    fontSize: 38,
    fontWeight: 600,
    fill: HAWKS.navy,
    align: 'center',
  }),
]);

export const rivalGame = template(W, H, () => [
  iceBackground(W, H),
  toned('hockey-2', 0, 0, 535, 800, 'rgba(29,111,184,0.45)'),
  toned('hockey-2', 545, 0, 535, 800, 'rgba(255,184,28,0.4)', { flip: true }),
  circle(540, 470, 90, HAWKS.navy, { stroke: HAWKS.white, strokeWidth: 8 }),
  text('VS', 450, 425, 180, {
    fontFamily: DISPLAY,
    fontSize: 96,
    fontWeight: 400,
    fill: HAWKS.white,
    align: 'center',
    lineHeight: 1,
  }),
  rect(420, 60, 240, 110, HAWKS.white, { cornerRadius: 14, name: 'Day tag' }),
  text('THURSDAY\n7 PM', 420, 72, 240, {
    fontFamily: LABEL,
    fontSize: 38,
    fontWeight: 700,
    fill: HAWKS.navy,
    align: 'center',
    lineHeight: 1.1,
  }),
  text('RIVAL', 0, 830, W, {
    fontFamily: DISPLAY,
    fontSize: 220,
    fontWeight: 400,
    fill: HAWKS.navy,
    align: 'center',
    lineHeight: 1,
    letterSpacing: 10,
  }),
  text('GAME', 170, 1040, 460, {
    fontFamily: DISPLAY,
    fontSize: 220,
    fontWeight: 400,
    fill: HAWKS.navy,
    lineHeight: 1,
    letterSpacing: 10,
  }),
  text('DEC\n12', 650, 1050, 260, {
    fontFamily: DISPLAY,
    fontSize: 100,
    fontWeight: 400,
    fill: HAWKS.blue,
    lineHeight: 1,
  }),
  text('ICEPLEX ARENA', 0, 1280, W, {
    fontFamily: LABEL,
    fontSize: 32,
    fontWeight: 600,
    fill: HAWKS.navy,
    align: 'center',
    letterSpacing: 10,
  }),
]);

export const countdown = template(W, H, () => [
  iceBackground(W, H),
  text('1', 30, 80, 440, {
    fontFamily: DISPLAY,
    fontSize: 1000,
    fontWeight: 400,
    fill: HAWKS.amber,
    align: 'center',
    lineHeight: 1,
  }),
  photo('hockey-1', 470, 90, 540, 620, { cornerRadius: 28, stroke: HAWKS.navy, strokeWidth: 8 }),
  text('RIVALRY GAME', 470, 760, 560, {
    fontFamily: LABEL,
    fontSize: 42,
    fontWeight: 700,
    fill: HAWKS.blue,
    letterSpacing: 14,
  }),
  text('DAY\nTO GO', 470, 820, 560, {
    fontFamily: DISPLAY,
    fontSize: 210,
    fontWeight: 400,
    fill: HAWKS.navy,
    lineHeight: 0.95,
  }),
  icon('feather', 80, 1220, 70, HAWKS.navy, { strokeWidth: 2 }),
  text('HAWKS vs IRONCLADS  |  FRI 7 PM', 170, 1232, 860, {
    fontFamily: LABEL,
    fontSize: 40,
    fontWeight: 700,
    fill: HAWKS.navy,
    letterSpacing: 3,
  }),
]);
