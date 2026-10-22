import {
  numbered,
  POST_SIZE,
  photo,
  pill,
  rect,
  rotateNodes,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { AUT, BODY, HAND, SERIF, snap } from './palette';

const { width: W, height: H } = POST_SIZE;

interface EssentialsCopy {
  first: string;
  second: string;
  tag: string;
  ink: string;
  tagFill: string;
  photos: readonly [PosterPhotoName, PosterPhotoName, PosterPhotoName, PosterPhotoName];
}

const essentials = (copy: EssentialsCopy): Template =>
  template(W, H, () => {
    const [a, b, c, d] = copy.photos;
    return [
      rect(0, 0, W, H, AUT.oat, { name: 'Background' }),
      Array.from({ length: 18 }, (_, index) =>
        rect(index * 64, 0, 2, H, AUT.line, { name: 'Grid line' }),
      ),
      Array.from({ length: 22 }, (_, index) =>
        rect(0, index * 64, W, 2, AUT.line, { name: 'Grid line' }),
      ),
      text(copy.first, 0, 80, W, {
        fontFamily: SERIF,
        fontSize: 140,
        fontWeight: 500,
        fill: copy.ink,
        align: 'center',
        lineHeight: 1,
      }),
      text(copy.second, 0, 220, W, {
        fontFamily: SERIF,
        fontSize: 120,
        fontWeight: 500,
        italic: true,
        fill: copy.ink,
        align: 'center',
        lineHeight: 1,
      }),
      pill(copy.tag, 600, 370, {
        width: 280,
        fill: copy.tagFill,
        color: AUT.oat,
        fontSize: 32,
        fontFamily: SERIF,
        fontWeight: 500,
      }),
      snap(a, 120, 520, 380, 300, -5),
      snap(b, 590, 500, 360, 420, 4),
      snap(c, 140, 900, 360, 300, 3),
      snap(d, 600, 990, 330, 240, -4),
    ];
  });

export const autumnEssentials = essentials({
  first: 'Autumn',
  second: 'Essentials',
  tag: 'Cozy Edition',
  ink: AUT.plum,
  tagFill: AUT.berry,
  photos: ['autumn-mug', 'coffee-book', 'self-care', 'coffee-1'],
});

export const winterFavorites = essentials({
  first: 'Winter',
  second: 'Favorites',
  tag: 'Warm Edition',
  ink: '#2f4a3a',
  tagFill: '#a8323e',
  photos: ['interior-1', 'coffee-1', 'candles', 'coffee-book'],
});

const SIPS = [
  ['Maple\nOat Latte', 60, 430],
  ['Chai\nCinnamon', 60, 700],
  ['Salted\nCaramel Cocoa', 60, 970],
  ['Pumpkin\nCold Brew', 800, 430],
  ['Spiced\nApple Cider', 800, 700],
  ['Honey\nLavender Tea', 800, 970],
] as const;

export const fallSips = template(W, H, () => [
  rect(0, 0, W, H, AUT.espresso, { name: 'Background' }),
  Array.from({ length: 6 }, (_, index) =>
    rect(0, 340 + index * 170, W, 2, 'rgba(245,239,228,0.08)', { name: 'Rule' }),
  ),
  text('Fall Sips', 0, 90, W, {
    fontFamily: 'Pacifico',
    fontSize: 130,
    fontWeight: 400,
    fill: AUT.oat,
    align: 'center',
  }),
  rect(300, 520, 480, 480, AUT.rose, { cornerRadius: 240, name: 'Ring' }),
  photo('coffee-1', 315, 535, 450, 450, { cornerRadius: 225 }),
  SIPS.map(([label, x, y]) =>
    text(label, x, y, 240, {
      fontFamily: HAND,
      fontSize: 50,
      fontWeight: 600,
      fill: AUT.butter,
      align: x < 400 ? 'left' : 'right',
      lineHeight: 1,
    }),
  ),
  text('the mapleandmoss cafe guide', 0, 1230, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: AUT.rose,
    align: 'center',
    letterSpacing: 3,
  }),
]);

export const autumnSnacks = template(W, H, () => [
  rect(0, 0, W, H, AUT.oat, { name: 'Background' }),
  Array.from({ length: 12 }, (_, index) =>
    rect(index * 96, 0, 48, H, 'rgba(201,139,139,0.32)', { name: 'Gingham' }),
  ),
  Array.from({ length: 15 }, (_, index) =>
    rect(0, index * 96, W, 48, 'rgba(201,139,139,0.32)', { name: 'Gingham' }),
  ),
  text('Autumn', 0, 90, W, {
    fontFamily: SERIF,
    fontSize: 130,
    fontWeight: 800,
    fill: AUT.berry,
    align: 'center',
    lineHeight: 1,
    shadow: { color: AUT.oat, blur: 0, offsetX: 6, offsetY: 6 },
  }),
  text('Snacks', 0, 220, W, {
    fontFamily: 'Pacifico',
    fontSize: 104,
    fontWeight: 400,
    fill: AUT.plum,
    align: 'center',
  }),
  rect(150, 450, 780, 740, AUT.white, {
    cornerRadius: 40,
    name: 'Card',
    ...shadow(30, 12, 'rgba(74,35,56,0.2)'),
  }),
  numbered(
    [
      'Maple pecan bread',
      'Apple cider donuts',
      'Pumpkin granola',
      'Cinnamon pear rolls',
      'Baked brie & figs',
    ],
    220,
    530,
    680,
    { fontSize: 42, gap: 130, fontFamily: BODY, color: AUT.espresso, numberColor: AUT.berry },
  ),
]);

const SHADES = [
  ['Plum Wine', 'SHADE 01', AUT.plum, 150, 160, -3],
  ['Dusty Rose', 'SHADE 02', AUT.rose, 570, 180, 3],
  ['Sage Leaf', 'SHADE 03', AUT.sage, 150, 700, 2],
  ['Butter Cream', 'SHADE 04', AUT.butter, 570, 690, -2],
] as const;

export const shadeCards = template(W, H, () => [
  photo('autumn-mug', 0, 0, W, H, { name: 'Backdrop' }),
  rect(0, 0, W, H, 'rgba(43,29,24,0.35)', { name: 'Dim' }),
  SHADES.map(([name, code, color, x, y, rotation]) =>
    rotateNodes(rotation, x + 180, y + 230, [
      rect(x, y, 360, 460, AUT.white, {
        name: `${name} card`,
        ...shadow(24, 10, 'rgba(0,0,0,0.3)'),
      }),
      rect(x + 18, y + 18, 324, 320, color, { name: `${name} swatch` }),
      text(code, x + 24, y + 358, 320, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 700,
        fill: AUT.espresso,
        letterSpacing: 4,
      }),
      text(name, x + 24, y + 392, 320, {
        fontFamily: SERIF,
        fontSize: 36,
        fontWeight: 600,
        fill: AUT.espresso,
      }),
    ]),
  ),
  text('my autumn palette', 0, 1250, W, {
    fontFamily: HAND,
    fontSize: 56,
    fontWeight: 600,
    fill: AUT.oat,
    align: 'center',
  }),
]);
