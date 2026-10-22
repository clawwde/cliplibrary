import { linear } from '@/design';
import { avatar, circle, icon, phone, pill, rect, template } from '../../../kit';
import { BL, bold, copy, H, handle, heavy, W } from './posts';

export const heyYou = template(W, H, () => [
  rect(0, 0, W, H, BL.white, { name: 'Background' }),
  Array.from({ length: 12 }, (_, index) =>
    rect(index * 90, 0, 2, H, 'rgba(18,18,18,0.06)', { name: 'Grid line' }),
  ),
  Array.from({ length: 15 }, (_, index) =>
    rect(0, index * 90, W, 2, 'rgba(18,18,18,0.06)', { name: 'Grid line' }),
  ),
  heavy('Hey,\nYou', 90, 200, 700, 210, BL.ink, { lineHeight: 0.95 }),
  circle(720, 520, 84, BL.magenta, { name: 'Badge' }),
  icon('thumbs-up', 674, 474, 92, BL.white, { strokeWidth: 2 }),
  copy('Ready to level\nup your sales?', 90, 700, 800, 62, BL.ink, { lineHeight: 1.2 }),
  avatar('woman-portrait-1', 145, 1010, 55, BL.magenta),
  bold('Nora Field', 220, 968, 400, 32, BL.ink),
  copy('Sales Director', 220, 1010, 400, 26, BL.grey),
  handle(1240, BL.grey),
]);

export const boostViews = template(W, H, () => [
  rect(0, 0, W, H, linear(170, BL.magenta, BL.magentaDeep), { name: 'Background' }),
  rect(250, 150, 14, 90, BL.ink, { cornerRadius: 7, rotation: -35, name: 'Burst' }),
  rect(310, 100, 14, 80, BL.ink, { cornerRadius: 7, rotation: -12, name: 'Burst' }),
  rect(800, 120, 14, 90, BL.ink, { cornerRadius: 7, rotation: 30, name: 'Burst' }),
  phone(330, 190, 420, {
    rotation: -6,
    screen: BL.white,
    content: [
      pill('Hey, you', 40, 130, {
        fill: BL.ink,
        color: BL.white,
        fontSize: 22,
        fontFamily: 'Poppins',
      }),
      heavy('Boost\nYour', 40, 220, 320, 86, BL.ink),
      heavy('Views', 40, 400, 320, 86, BL.magenta),
      pill('with us', 40, 520, {
        fill: BL.ink,
        color: BL.white,
        fontSize: 22,
        fontFamily: 'Poppins',
      }),
      pill('Learn More Today', 40, 640, {
        fill: BL.white,
        color: BL.ink,
        stroke: BL.ink,
        strokeWidth: 3,
        fontSize: 20,
        fontFamily: 'Poppins',
      }),
    ],
  }),
  bold('Grow your reach in 30 days', 0, 1130, W, 44, BL.white, { align: 'center' }),
  handle(1230, BL.white),
]);

const ORIGIN_X = 140;
const ORIGIN_Y = 560;

const cell = (column: number, row: number, fill: string) =>
  rect(ORIGIN_X + column * 100, ORIGIN_Y + row * 100, 90, 90, fill, {
    cornerRadius: 6,
    name: 'Block',
  });

const WHITES = [
  [0, 1],
  [1, 1],
  [1, 0],
  [2, 1],
  [3, 1],
  [3, 0],
  [4, 1],
  [5, 1],
] as const;

const PINKS = [
  [6, 2],
  [7, 2],
  [7, 1],
] as const;

export const rightLeads = template(W, H, () => [
  rect(0, 0, W, H, BL.ink, { name: 'Background' }),
  bold('Finding the right leads', 0, 190, W, 60, BL.white, {
    align: 'center',
    fontWeight: 600,
  }),
  heavy('for the right people', 0, 275, W, 62, BL.magenta, { align: 'center' }),
  WHITES.map(([column, row]) => cell(column, row, BL.white)),
  PINKS.map(([column, row]) => cell(column, row, BL.magenta)),
  rect(0, 756, 736, 6, BL.white, { name: 'Ground' }),
  rect(736, 756, 6, 114, BL.white, { name: 'Notch' }),
  rect(736, 864, 206, 6, BL.white, { name: 'Notch' }),
  rect(936, 756, 6, 114, BL.white, { name: 'Notch' }),
  rect(936, 756, 144, 6, BL.white, { name: 'Ground' }),
  copy('Targeting that brings buyers, not browsers.', 0, 1040, W, 32, BL.silver, {
    align: 'center',
  }),
  handle(1230, BL.grey),
]);

export const mythTruth = template(W, H, () => [
  rect(0, 0, W, H, BL.ink, { name: 'Background' }),
  pill('Myth vs Truth', 90, 130, {
    fill: BL.magenta,
    color: BL.white,
    fontSize: 26,
    fontFamily: 'Poppins',
    fontWeight: 700,
  }),
  icon('arrow-right', 90, 320, 70, BL.magenta, { strokeWidth: 2.6 }),
  heavy('Myth:', 185, 312, 600, 70, BL.white),
  copy('Marketing is just advertising.', 90, 430, 900, 42, BL.white),
  rect(90, 580, 900, 2, 'rgba(255,255,255,0.18)', { name: 'Divider' }),
  icon('arrow-right', 90, 680, 70, BL.magenta, { strokeWidth: 2.6 }),
  heavy('Truth:', 185, 672, 600, 70, BL.white),
  copy('Marketing is a full system of', 90, 790, 900, 42, BL.white),
  bold('research, strategy and engagement.', 90, 850, 900, 42, BL.white),
  rect(90, 1010, 900, 120, 'rgba(255,45,135,0.14)', { cornerRadius: 24, name: 'Callout' }),
  bold('Follow for a new truth every week.', 130, 1050, 820, 34, BL.magenta),
  handle(1230, BL.grey),
]);
