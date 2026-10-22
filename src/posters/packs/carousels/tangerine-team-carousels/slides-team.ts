import { linear } from '@/design';
import {
  checklist,
  circle,
  icon,
  type Nodes,
  photo,
  pill,
  rect,
  shadow,
  template,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { darkBackground, H, nextArrow, orangeBackground, SANS, say, TANGERINE, W } from './palette';

const portrait = (name: PosterPhotoName, label: string, x: number, y: number) => [
  photo(name, x, y, 270, 340, { cornerRadius: 26, stroke: TANGERINE.orange, strokeWidth: 4 }),
  rect(x, y + 200, 270, 140, linear(180, 'rgba(6,35,31,0)', 'rgba(6,35,31,0.9)'), {
    name: 'Fade',
    cornerRadius: 26,
  }),
  say(label, x, y + 290, 270, 28, TANGERINE.white, 700, { align: 'center' }),
];

export const insightsCover = template(W, H, () => [
  darkBackground(),
  icon('quote', 470, 90, 140, TANGERINE.orange, { strokeWidth: 1.6 }),
  say('Insights you\nshould know from', 0, 270, W, 76, TANGERINE.white, 800, {
    align: 'center',
    lineHeight: 1.1,
  }),
  say('our Team', 0, 440, W, 76, TANGERINE.orange, 800, { align: 'center' }),
  say('with', 0, 545, W, 54, TANGERINE.apricot, 700, { align: 'center', fontFamily: 'Caveat' }),
  portrait('man-portrait-1', 'Arjun Mehta', 120, 660),
  portrait('man-portrait-3', 'Theo Brandt', 690, 660),
  portrait('woman-portrait-1', 'Clara Voss', 405, 630),
  nextArrow(TANGERINE.white, 492, 1130),
]);

const insight = (
  person: PosterPhotoName,
  name: string,
  role: string,
  quote: string,
  body: string,
) =>
  template(W, H, () => [
    darkBackground(),
    photo(person, 90, 110, 150, 150, { cornerRadius: 26 }),
    say(name, 270, 128, 600, 46, TANGERINE.white, 800),
    say(role, 270, 192, 600, 30, TANGERINE.apricot, 500),
    icon('quote', 830, 220, 170, TANGERINE.orange, { strokeWidth: 1.4 }),
    say(quote, 90, 430, 900, 62, TANGERINE.white, 800, { lineHeight: 1.15 }),
    say(body, 90, 780, 860, 34, TANGERINE.sage, 400, { lineHeight: 1.45 }),
    pill('Team Insights', 90, 1140, {
      fill: TANGERINE.orange,
      color: TANGERINE.deep,
      fontSize: 32,
      fontFamily: SANS,
      fontWeight: 700,
    }),
    nextArrow(TANGERINE.white),
  ]);

export const insightArjun = insight(
  'man-portrait-1',
  'Arjun Mehta',
  'Head of Growth',
  "Your brand isn't what\nyou say. It's what\npeople repeat.",
  'Consistency beats volume. Every post is a\npromise, and when you keep it people start\ntelling your story for you.',
);

export const insightClara = insight(
  'woman-portrait-1',
  'Clara Voss',
  'Brand Director',
  'Numbers show what\nhappened. Stories\nexplain why.',
  'Data gives you the map, but people connect\nwith people. Never let the dashboard do all\nof the talking.',
);

export const insightTheo = insight(
  'man-portrait-3',
  'Theo Brandt',
  'Content Lead',
  'Solve one problem for\none reader, really\nwell.',
  'Stop shouting at everyone. Pick a single\nreader and write as if they asked you the\nquestion directly.',
);

const spiralTop = (x: number, y: number, width: number) =>
  Array.from({ length: 12 }, (_, index) => {
    const cx = x + 60 + (index * (width - 120)) / 11;
    return [
      circle(cx, y + 26, 11, TANGERINE.forest),
      rect(cx - 5, y - 22, 10, 50, TANGERINE.forest, { name: 'Ring', cornerRadius: 5 }),
    ];
  });

const spiralSide = (x: number, y: number, height: number) =>
  Array.from({ length: 10 }, (_, index) => {
    const cy = y + 60 + (index * (height - 120)) / 9;
    return [
      circle(x + 26, cy, 11, TANGERINE.forest),
      rect(x - 22, cy - 5, 50, 10, TANGERINE.forest, { name: 'Ring', cornerRadius: 5 }),
    ];
  });

const highlight = (label: string, x: number, y: number, width: number, fill: string) => [
  rect(x, y, width, 104, fill, { name: `${label} highlight`, cornerRadius: 10 }),
  say(label, x, y + 6, width, 80, TANGERINE.white, 800, { align: 'center', lineHeight: 1.1 }),
];

export const lessonsCover = template(W, H, () => [
  orangeBackground(),
  say('northpine.co', 0, 70, W, 32, TANGERINE.white, 600, { align: 'center' }),
  rect(110, 190, 860, 1010, TANGERINE.white, {
    name: 'Notebook',
    cornerRadius: 36,
    ...shadow(40, 18, 'rgba(120,40,0,0.25)'),
  }),
  spiralTop(110, 190, 860),
  say('Learn', 170, 300, 260, 80, TANGERINE.forest, 800, { lineHeight: 1.1 }),
  highlight('How To', 420, 296, 320, TANGERINE.orange),
  highlight('Win', 170, 420, 190, TANGERINE.forest),
  say('Clients.', 380, 424, 500, 80, TANGERINE.forest, 800, { lineHeight: 1.1 }),
  icon('corner-down-right', 170, 600, 80, TANGERINE.orange, { strokeWidth: 2.4 }),
  say('Swipe to read\nmore on this\ntopic', 170, 700, 330, 34, TANGERINE.forest, 500),
  photo('man-portrait-3', 520, 600, 400, 560, { cornerRadius: 28 }),
]);

const lesson = (label: string, title: string, content: Nodes[]) =>
  template(W, H, () => [
    orangeBackground(),
    rect(150, 230, 800, 820, TANGERINE.white, {
      name: 'Notebook',
      cornerRadius: 36,
      ...shadow(40, 18, 'rgba(120,40,0,0.25)'),
    }),
    spiralSide(150, 230, 820),
    rect(250, 320, 260, 72, TANGERINE.orange, { name: 'Lesson tag', cornerRadius: 10 }),
    say(label, 250, 332, 260, 40, TANGERINE.white, 800, { align: 'center', lineHeight: 1.2 }),
    say(title, 250, 440, 660, 68, TANGERINE.forest, 800, { lineHeight: 1.12 }),
    content,
    nextArrow(TANGERINE.white, 492, 1140),
  ]);

const lessonBody = (content: string) =>
  say(content, 250, 660, 660, 40, '#24413b', 400, { lineHeight: 1.5 });

export const lessonProof = lesson('Lesson 1', 'Lead With\nReal Proof', [
  checklist(
    ['Share client results', 'Show before and after', 'Quote happy buyers'],
    250,
    680,
    660,
    {
      color: '#24413b',
      iconColor: TANGERINE.orange,
      fontSize: 40,
      fontFamily: SANS,
      gap: 100,
    },
  ),
]);

export const lessonTeach = lesson('Lesson 2', 'Teach Before\nYou Sell', [
  lessonBody(
    'Give away your best tips.\nWhen people learn from you,\nthey already trust you by\nthe time they want to buy.',
  ),
]);

export const lessonNextStep = lesson('Lesson 3', 'Make the Next\nStep Easy', [
  lessonBody(
    'One clear call to action\nper post. When people have\nto guess what to do next,\nthey usually do nothing.',
  ),
]);
