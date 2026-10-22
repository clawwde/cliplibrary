import { linear } from '@/design';
import {
  circle,
  group,
  icon,
  POST_SIZE,
  photo,
  poly,
  rating,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';

export const VOLT = {
  lime: '#c6f432',
  limeDeep: '#9fcc12',
  black: '#0d0d0d',
  charcoal: '#1c1c1c',
  paper: '#f4f4ef',
  white: '#ffffff',
  grey: '#9b9b94',
};

export const DISPLAY = 'Archivo Black';
export const BODY = 'Manrope';

const { width: W, height: H } = POST_SIZE;

export const darkBackdrop = (height: number = H) =>
  rect(0, 0, W, height, linear(180, VOLT.charcoal, VOLT.black), { name: 'Background' });

const handlesRow = (y: number, color: string) =>
  (['camera', 'globe', 'briefcase'] as const).map((name, index) => [
    circle(130 + index * 300, y + 20, 22, VOLT.lime),
    icon(name, 116 + index * 300, y + 6, 28, VOLT.black),
    text('@voltlab', 164 + index * 300, y + 4, 200, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 600,
      fill: color,
    }),
  ]);

export const ultimateMove = template(W, H, () => [
  rect(0, 0, W, H, linear(180, VOLT.lime, VOLT.limeDeep), { name: 'Background' }),
  text('The Ultimate', 0, 140, W, {
    fontFamily: BODY,
    fontSize: 76,
    fontWeight: 700,
    fill: VOLT.black,
    align: 'center',
  }),
  rect(170, 250, 740, 140, VOLT.black, { cornerRadius: 10, rotation: -3, name: 'Label' }),
  text('Growth Play', 180, 268, 720, {
    fontFamily: DISPLAY,
    fontSize: 82,
    fontWeight: 400,
    fill: VOLT.lime,
    align: 'center',
    rotation: -3,
  }),
  poly(
    [
      [0, 900],
      [540, 700],
      [1080, 900],
      [1080, 1350],
      [0, 1350],
    ],
    linear(180, '#1f1f1f', VOLT.black),
    { name: 'Table felt' },
  ),
  poly(
    [
      [0, 780],
      [540, 580],
      [540, 700],
      [0, 900],
    ],
    linear(180, '#e6e6e1', '#8d8d88'),
    { name: 'Left rail' },
  ),
  poly(
    [
      [540, 580],
      [1080, 780],
      [1080, 900],
      [540, 700],
    ],
    linear(180, '#d4d4cf', '#7a7a75'),
    { name: 'Right rail' },
  ),
  circle(540, 720, 160, '#050505', { name: 'Pocket', stroke: VOLT.charcoal, strokeWidth: 10 }),
  text('Comment\nPLAY for\nthe guide', 390, 628, 300, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 700,
    fill: VOLT.white,
    align: 'center',
    lineHeight: 1.2,
  }),
  circle(540, 1130, 96, linear(160, '#3b3b3b', '#000000'), {
    name: 'Eight ball',
    ...shadow(30, 14, 'rgba(0,0,0,0.6)'),
  }),
  circle(540, 1118, 44, VOLT.white, { name: 'Ball spot' }),
  text('8', 500, 1080, 80, {
    fontFamily: DISPLAY,
    fontSize: 60,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
  }),
]);

const folder = (x: number, y: number, width: number, fill: string) => {
  const height = width * 0.7;
  return group(
    rect(x, y, width * 0.42, width * 0.16, fill, { cornerRadius: width * 0.04, name: 'Tab' }),
    rect(x, y + width * 0.08, width, height, fill, {
      cornerRadius: width * 0.05,
      name: 'Folder',
      ...shadow(30, 12, 'rgba(0,0,0,0.18)'),
    }),
  );
};

export const seoFolders = template(W, H, () => [
  rect(0, 0, W, H, VOLT.paper, { name: 'Background' }),
  folder(40, 60, 220, VOLT.lime),
  folder(840, 40, 200, VOLT.limeDeep),
  folder(30, 1080, 200, VOLT.limeDeep),
  folder(840, 1060, 210, VOLT.lime),
  folder(230, 380, 620, VOLT.lime),
  text('3 Tips for', 230, 560, 620, {
    fontFamily: BODY,
    fontSize: 64,
    fontWeight: 600,
    fill: VOLT.black,
    align: 'center',
  }),
  text('SEO Growth', 230, 650, 620, {
    fontFamily: DISPLAY,
    fontSize: 74,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
  }),
  text('Swipe_Through', 0, 900, W, {
    fontFamily: 'Space Mono',
    fontSize: 34,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
  }),
  poly(
    [
      [760, 760],
      [760, 900],
      [792, 870],
      [816, 924],
      [840, 912],
      [816, 860],
      [860, 856],
    ],
    VOLT.white,
    { name: 'Cursor', stroke: VOLT.black, strokeWidth: 5 },
  ),
]);

export const clientSays = template(W, H, () => [
  darkBackdrop(),
  text('what', 120, 130, 300, {
    fontFamily: 'Permanent Marker',
    fontSize: 72,
    fontWeight: 400,
    fill: VOLT.lime,
    rotation: -8,
  }),
  text('Our', 330, 120, 500, {
    fontFamily: DISPLAY,
    fontSize: 104,
    fontWeight: 400,
    fill: VOLT.lime,
  }),
  text('Clients Say', 0, 250, W, {
    fontFamily: DISPLAY,
    fontSize: 104,
    fontWeight: 400,
    fill: VOLT.white,
    align: 'center',
  }),
  icon('quote', 110, 470, 110, VOLT.lime, { strokeWidth: 2.4 }),
  text(
    'Working with this crew changed how we launch. They mapped our audience, sharpened our message and tripled our sign-ups in a single season.',
    260,
    470,
    720,
    { fontFamily: BODY, fontSize: 40, fontWeight: 500, fill: VOLT.white, lineHeight: 1.45 },
  ),
  text('Mara Lindqvist, Ops Lead at Northpeak', 260, 860, 760, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 700,
    fill: VOLT.lime,
  }),
  rating(380, 1080, 64, 5, VOLT.white, 0.35),
]);

export const topOnePercent = template(W, H, () => [
  darkBackdrop(),
  text('Only the', 0, 260, W, {
    fontFamily: DISPLAY,
    fontSize: 96,
    fontWeight: 400,
    fill: VOLT.white,
    align: 'center',
  }),
  rect(300, 400, 480, 130, VOLT.lime, { cornerRadius: 8, name: 'Highlight' }),
  text('top 2%', 300, 408, 480, {
    fontFamily: DISPLAY,
    fontSize: 96,
    fontWeight: 400,
    fill: VOLT.black,
    align: 'center',
  }),
  text('of brands\nship weekly.', 0, 560, W, {
    fontFamily: DISPLAY,
    fontSize: 96,
    fontWeight: 400,
    fill: VOLT.white,
    align: 'center',
    lineHeight: 1.15,
  }),
  text('...so where do you stand?', 0, 860, W, {
    fontFamily: BODY,
    fontSize: 54,
    fontWeight: 600,
    italic: true,
    fill: VOLT.white,
    align: 'center',
  }),
  handlesRow(1170, VOLT.white),
]);

export const marketPortrait = template(W, H, () => [
  rect(0, 0, W, H, linear(180, VOLT.lime, VOLT.limeDeep), { name: 'Background' }),
  rect(0, 0, 250, H, VOLT.black, { name: 'Side band' }),
  text('Market', 30, 1290, 1240, {
    fontFamily: DISPLAY,
    fontSize: 210,
    fontWeight: 400,
    fill: VOLT.lime,
    rotation: -90,
    lineHeight: 1,
  }),
  photo('woman-portrait-4', 330, 560, 680, 790, { cornerRadius: 0 }),
  icon('quote', 330, 110, 90, VOLT.black, { strokeWidth: 2.6 }),
  text('Read the', 450, 110, 560, {
    fontFamily: BODY,
    fontSize: 50,
    fontWeight: 700,
    fill: VOLT.black,
  }),
  rect(450, 180, 470, 80, VOLT.black, { cornerRadius: 8, name: 'Highlight' }),
  text('shifting signals', 470, 190, 440, {
    fontFamily: BODY,
    fontSize: 50,
    fontWeight: 800,
    fill: VOLT.lime,
  }),
  text('early and keep your\nbrand one step ahead.', 450, 280, 580, {
    fontFamily: BODY,
    fontSize: 50,
    fontWeight: 700,
    fill: VOLT.black,
    lineHeight: 1.2,
  }),
]);
