import { type DesignIconName, linear } from '@/design';
import {
  circle,
  ellipse,
  group,
  icon,
  line,
  POST_SIZE,
  photo,
  pill,
  rect,
  rotateNodes,
  template,
  text,
} from '../../../kit';
import { BODY, bat, COND, CRYPT, SPOOKY } from './palette';

const { width: W, height: H } = POST_SIZE;

const SERVICES: readonly (readonly [string, DesignIconName])[] = [
  ['Branding', 'sparkles'],
  ['Website', 'globe'],
  ['Interface', 'mouse'],
  ['Illustration', 'pen-tool'],
  ['Animation', 'zap'],
];

const spider = (x: number, length: number) => [
  line(x, 0, length, CRYPT.ink, 3, { rotation: 90, name: 'Thread' }),
  circle(x, length + 16, 18, CRYPT.ink),
  line(x - 34, length + 4, 68, CRYPT.ink, 4, { name: 'Legs' }),
  line(x - 30, length + 26, 60, CRYPT.ink, 4, { name: 'Legs' }),
];

export const servicesTags = template(W, H, () => [
  rect(0, 0, W, H, CRYPT.mustard, { name: 'Background' }),
  spider(180, 120),
  spider(900, 220),
  text('WHAT WE CONJURE', 0, 110, W, {
    fontFamily: COND,
    fontSize: 64,
    fontWeight: 400,
    fill: CRYPT.ink,
    align: 'center',
    letterSpacing: 8,
  }),
  SERVICES.map(([label, glyph], index) => {
    const dark = index % 2 === 0;
    const x = index % 2 === 0 ? 150 : 330;
    const y = 300 + index * 180;
    return rotateNodes(index % 2 === 0 ? -6 : 5, x + 300, y + 60, [
      rect(x, y, 600, 120, dark ? CRYPT.ink : CRYPT.bone, {
        cornerRadius: 60,
        name: `${label} tag`,
      }),
      icon(glyph, x + 50, y + 30, 60, dark ? CRYPT.mustard : CRYPT.ink, { strokeWidth: 2.4 }),
      text(label, x + 140, y + 26, 440, {
        fontFamily: BODY,
        fontSize: 54,
        fontWeight: 700,
        fill: dark ? CRYPT.bone : CRYPT.ink,
      }),
    ]);
  }),
]);

export const frightNight = template(W, H, () => [
  rect(0, 0, W, H, linear(180, CRYPT.blood, CRYPT.wine), { name: 'Background' }),
  text('OCTOBER 31, 2027', 0, 80, W, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 700,
    fill: CRYPT.bone,
    align: 'center',
    letterSpacing: 6,
  }),
  bat(90, 200, 160, CRYPT.ink),
  bat(820, 170, 130, CRYPT.ink),
  bat(240, 300, 80, CRYPT.ink),
  rect(510, 230, 60, 120, CRYPT.ink, { cornerRadius: 14, rotation: 12, name: 'Stem' }),
  ellipse(150, 330, 400, 660, CRYPT.ink, { name: 'Pumpkin' }),
  ellipse(530, 330, 400, 660, CRYPT.ink, { name: 'Pumpkin' }),
  ellipse(320, 310, 440, 700, CRYPT.ink, { name: 'Pumpkin' }),
  text('FRIGHT\nNIGHT', 150, 470, 780, {
    fontFamily: SPOOKY,
    fontSize: 170,
    fontWeight: 400,
    fill: CRYPT.mustard,
    align: 'center',
    lineHeight: 1,
  }),
  text('JOIN US FOR GAMES, CANDY & PRIZES', 0, 1110, W, {
    fontFamily: COND,
    fontSize: 54,
    fontWeight: 400,
    fill: CRYPT.bone,
    align: 'center',
    letterSpacing: 4,
  }),
  text('Doors open at 7 PM  ·  Hollow Hall', 0, 1200, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: CRYPT.bone,
    align: 'center',
  }),
]);

const TASKS = [
  ['Define your target audience', true],
  ['Plan a spooky offer', true],
  ['Refresh your landing page', false],
  ['Schedule October posts', true],
  ['Track campaign results', false],
] as const;

export const octoberChecklist = template(W, H, () => [
  rect(0, 0, W, H, linear(160, CRYPT.mustard, CRYPT.amber), { name: 'Background' }),
  bat(820, 90, 140, CRYPT.ink),
  rect(130, 220, 820, 860, CRYPT.bone, { cornerRadius: 36, name: 'Card' }),
  rect(130, 220, 820, 150, CRYPT.ink, { cornerRadius: 36, name: 'Card header' }),
  rect(130, 330, 820, 40, CRYPT.ink, { name: 'Card header edge' }),
  text('OCTOBER CHECKLIST', 130, 258, 820, {
    fontFamily: COND,
    fontSize: 76,
    fontWeight: 400,
    fill: CRYPT.mustard,
    align: 'center',
    letterSpacing: 4,
  }),
  TASKS.map(([task, done], index) => {
    const y = 430 + index * 126;
    return group(
      text(task, 190, y + 8, 560, {
        fontFamily: BODY,
        fontSize: 36,
        fontWeight: 600,
        fill: CRYPT.ink,
      }),
      rect(770, y, 120, 64, done ? CRYPT.ink : '#cfc6b2', { cornerRadius: 32, name: 'Toggle' }),
      circle(done ? 858 : 802, y + 32, 24, done ? CRYPT.mustard : '#ffffff'),
    );
  }),
  text('Save this for your Q4 plan', 0, 1150, W, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 700,
    fill: CRYPT.ink,
    align: 'center',
  }),
]);

export const spookyDeal = template(W, H, () => [
  rect(0, 0, W, H, CRYPT.night, { name: 'Background' }),
  photo('pumpkins', 0, 700, W, 650, { name: 'Pumpkins' }),
  rect(0, 690, W, 260, linear(180, CRYPT.night, 'rgba(12,35,40,0)'), { name: 'Fade' }),
  text('TAKE AN EXTRA', 0, 110, W, {
    fontFamily: COND,
    fontSize: 60,
    fontWeight: 400,
    fill: CRYPT.mustard,
    align: 'center',
    letterSpacing: 12,
  }),
  text('15% OFF', 0, 170, W, {
    fontFamily: COND,
    fontSize: 300,
    fontWeight: 400,
    fill: CRYPT.bone,
    align: 'center',
  }),
  text('Every brand package booked this October', 0, 500, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: CRYPT.bone,
    align: 'center',
  }),
  pill('CLAIM THE OFFER', 360, 590, {
    width: 360,
    fill: CRYPT.blood,
    color: CRYPT.bone,
    fontSize: 36,
    fontFamily: COND,
    fontWeight: 400,
    letterSpacing: 4,
  }),
]);
