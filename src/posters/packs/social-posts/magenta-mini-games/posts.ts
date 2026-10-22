import {
  type Nodes,
  POST_SIZE,
  rect,
  rotateNodes,
  STORY_SIZE,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { maze } from './maze';

export interface GameTheme {
  brand: string;
  ink: string;
  paper: string;
  night: string;
  nightText: string;
  nightMuted: string;
}

export const MAGENTA: GameTheme = {
  brand: '#ff2f86',
  ink: '#120a10',
  paper: '#ffffff',
  night: '#120a10',
  nightText: '#ffffff',
  nightMuted: '#d6c8d1',
};

export const OCEAN: GameTheme = {
  brand: '#0fa3a3',
  ink: '#04201f',
  paper: '#ffffff',
  night: '#04201f',
  nightText: '#ffffff',
  nightMuted: '#bfe3df',
};

export const LILAC: GameTheme = {
  brand: '#7b3fe4',
  ink: '#1c0b3b',
  paper: '#ffffff',
  night: '#e9defc',
  nightText: '#1c0b3b',
  nightMuted: '#4b3a6b',
};

const HEAD = 'Montserrat';
const BODY = 'Inter';
const { width: PW, height: PH } = POST_SIZE;

const tile = (
  theme: GameTheme,
  glyph: string,
  x: number,
  y: number,
  size: number,
  fill: string,
) => [
  rect(x, y, size, size, fill, { name: 'Tile', cornerRadius: size * 0.12 }),
  text(glyph, x, y + size * 0.16, size, {
    fontFamily: HEAD,
    fontSize: size * 0.55,
    fontWeight: 800,
    fill: fill === theme.paper ? theme.ink : theme.paper,
    align: 'center',
    lineHeight: 1.2,
  }),
];

export const routeMaze = (theme: GameTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.brand, { name: 'Background' }),
    text('FIND THE ROUTE TO\nYOUR SECRET DEAL', 0, 80, PW, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
      lineHeight: 1.15,
    }),
    ['A', 'B', 'C'].map((glyph, index) =>
      tile(theme, glyph, 160 + (1 + index * 4) * 63.33 - 2, 256, 68, theme.paper),
    ),
    maze(160, 340, 760, theme.ink, 9, {
      columns: 12,
      rows: 12,
      seed: 20260,
      entrances: [1, 5, 9],
      exit: 6,
    }),
    text('Comment the right letter and\ncheck your inbox for the deal', 0, 1135, PW, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
      lineHeight: 1.35,
    }),
    star(5, 490, 1240, 100, theme.ink, { innerRatio: 0.42 }),
  ]);

export const pickNumber = (theme: GameTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.night, { name: 'Background' }),
    star(5, 120, 70, 170, theme.brand, { innerRatio: 0.42 }),
    star(5, 70, 110, 90, theme.nightText, { innerRatio: 0.42 }),
    text("IT'S\nMONDAY", 90, 380, 560, {
      fontFamily: HEAD,
      fontSize: 100,
      fontWeight: 800,
      fill: theme.nightText,
      lineHeight: 1.05,
    }),
    text('Pick a number and find\nout what your week holds', 90, 620, 560, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 500,
      fill: theme.nightMuted,
      lineHeight: 1.35,
    }),
    rect(90, 760, 500, 130, theme.brand, { name: 'Callout' }),
    text('Answers are waiting\nin the caption below', 120, 784, 460, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 700,
      fill: theme.paper,
      lineHeight: 1.25,
    }),
    [1, 2, 3, 4].map((value, index) => [
      tile(theme, String(value), 700, 250 + index * 220, 110, theme.paper),
      rect(840, 290 + index * 220, 180, 30, theme.nightText, {
        name: 'Answer bar',
        cornerRadius: 15,
      }),
    ]),
    star(5, 880, 1200, 100, theme.brand, { innerRatio: 0.42 }),
  ]);

const OPTIONS = ['Fast shipping', 'Friendly support', 'Fair prices', 'Loyalty perks'];

const quiz = (theme: GameTheme, height: number, story: boolean): Nodes[] => {
  const shift = story ? 240 : 0;
  const gap = story ? 160 : 130;
  return [
    rect(0, 0, PW, height, theme.brand, { name: 'Background' }),
    text('TIME!', 0, 150 + shift, PW, {
      fontFamily: HEAD,
      fontSize: 180,
      fontWeight: 900,
      fill: theme.paper,
      align: 'center',
      lineHeight: 1,
    }),
    rotateNodes(-12, 650, 110 + shift, [
      rect(650, 110 + shift, 230, 92, theme.ink, { name: 'Quiz tag', cornerRadius: 12 }),
      text('QUIZ', 650, 122 + shift, 230, {
        fontFamily: HEAD,
        fontSize: 60,
        fontWeight: 900,
        fill: theme.paper,
        align: 'center',
      }),
    ]),
    text('What keeps customers\ncoming back for more?', 0, 400 + shift, PW, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
      lineHeight: 1.2,
    }),
    OPTIONS.map((option, index) => {
      const y = 600 + shift + index * gap;
      return [
        tile(theme, String(index + 1), 170, y, 100, theme.ink),
        rect(290, y, 620, 100, theme.paper, { name: 'Option', cornerRadius: 12 }),
        text(option, 330, y + 28, 560, {
          fontFamily: BODY,
          fontSize: 38,
          fontWeight: 600,
          fill: theme.ink,
        }),
      ];
    }),
    story
      ? text('Vote in the poll and see the answer tomorrow', 140, 1520, 800, {
          fontFamily: BODY,
          fontSize: 34,
          fontWeight: 600,
          fill: theme.paper,
          align: 'center',
          lineHeight: 1.35,
        })
      : [],
    star(5, 480, height - 150, 120, theme.ink, { innerRatio: 0.42 }),
  ];
};

export const quizTime = (theme: GameTheme): Template =>
  template(PW, PH, () => quiz(theme, PH, false));

export const quizStory = (theme: GameTheme): Template =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => quiz(theme, STORY_SIZE.height, true));

const CROSSWORD: readonly (readonly [number, number, string, boolean])[] = [
  ...[...'REFERRAL'].map((glyph, index): [number, number, string, boolean] => [
    index,
    1,
    glyph,
    index % 3 !== 1,
  ]),
  ...[...'BRAND'].map((glyph, index): [number, number, string, boolean] => [
    4,
    index,
    glyph,
    index !== 2 && index !== 3,
  ]),
  ...[...'EALS'].map((glyph, index): [number, number, string, boolean] => [
    5 + index,
    4,
    glyph,
    index === 1,
  ]),
];

export const hiddenWords = (theme: GameTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.night, { name: 'Background' }),
    text('Can you spot the 3\nhidden words?', 90, 110, 900, {
      fontFamily: HEAD,
      fontSize: 62,
      fontWeight: 800,
      fill: theme.brand,
      lineHeight: 1.15,
    }),
    CROSSWORD.map(([column, row, glyph, shown]) =>
      tile(theme, shown ? glyph : '', 134 + column * 92, 380 + row * 92, 84, theme.paper),
    ),
    star(5, 900, 860, 90, theme.brand, { innerRatio: 0.42 }),
    rect(0, 1010, PW, 340, theme.brand, { name: 'Answer panel' }),
    text('Found all three?\nDrop them in the comments', 90, 1080, 760, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.2,
    }),
    star(5, 900, 1190, 110, theme.paper, { innerRatio: 0.42 }),
  ]);

export const unscramble = (theme: GameTheme): Template =>
  template(PW, PH, () => [
    rect(0, 0, PW, PH, theme.night, { name: 'Background' }),
    text('CAN YOU\nUNSCRAMBLE THIS?', 0, 140, PW, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 800,
      fill: theme.nightText,
      align: 'center',
      lineHeight: 1.15,
    }),
    [...'DKECBEFA'].map((glyph, index) =>
      tile(
        theme,
        glyph,
        150 + (index % 4) * 210,
        420 + Math.floor(index / 4) * 210,
        150,
        theme.brand,
      ),
    ),
    text('COMMENT BELOW:', 0, 880, PW, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 800,
      fill: theme.nightText,
      align: 'center',
      letterSpacing: 2,
    }),
    Array.from({ length: 8 }, (_, index) => [
      rect(150 + index * 100, 970, 80, 80, theme.paper, {
        name: 'Answer box',
        cornerRadius: 8,
        stroke: theme.brand,
        strokeWidth: 3,
      }),
      rect(170 + index * 100, 1020, 40, 5, theme.ink, { name: 'Answer dash', cornerRadius: 2 }),
    ]),
    star(5, 900, 60, 100, theme.brand, { innerRatio: 0.42 }),
    star(5, 90, 1180, 100, theme.nightText, { innerRatio: 0.42 }),
  ]);
