import { linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
  laptop,
  POST_SIZE,
  photo,
  pill,
  poly,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const VG = {
  black: '#0c0c0c',
  charcoal: '#1c1c1c',
  orange: '#ff6b1a',
  orangeLight: '#ff9a52',
  orangeDeep: '#d9480b',
  paper: '#f4f1ec',
  grey: '#8a8580',
  white: '#ffffff',
};

const HEAD = 'Poppins';
export const DISPLAY = 'Anton';
export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

type TextStyle = Parameters<typeof text>[4];

export const head = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  weight = 700,
  style: TextStyle = {},
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: weight,
    fill,
    lineHeight: 1.15,
    ...style,
  });

export const display = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  style: TextStyle = {},
) =>
  text(content, x, y, width, {
    fontFamily: DISPLAY,
    fontSize: size,
    fontWeight: 400,
    fill,
    lineHeight: 1,
    ...style,
  });

export const copy = (
  content: string,
  x: number,
  y: number,
  width: number,
  size: number,
  fill: string,
  style: TextStyle = {},
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 400,
    fill,
    lineHeight: 1.4,
    ...style,
  });

export const button = (label: string, x: number, y: number, fill: string, color: string) =>
  pill(label, x, y, { fill, color, fontSize: 26, fontFamily: HEAD, fontWeight: 600 });

const RECORD = [
  { label: 'Return on\nad spend', value: '3x' },
  { label: 'Clients\nreached', value: '128' },
  { label: 'New\nleads', value: '6+' },
] as const;

export const trackRecord = template(W, H, () => [
  rect(0, 0, W, H, VG.black, { name: 'Background' }),
  head('Third Quarter', 90, 110, 900, 78, VG.orange, 700),
  head('Track Record', 90, 200, 900, 78, VG.white, 700),
  RECORD.map((item, index) => {
    const x = 90 + index * 315;
    return [
      rect(x, 380, 270, 760, linear(180, VG.orangeLight, VG.orange), {
        cornerRadius: 26,
        name: 'Record column',
      }),
      poly(
        [
          [x + 100, 1138],
          [x + 170, 1138],
          [x + 135, 1186],
        ],
        VG.orange,
        { name: 'Column pointer' },
      ),
      copy(item.label, x, 410, 270, 28, VG.black, { align: 'center', fontWeight: 600 }),
      display(item.value, x + 40, 1100, 560, 200, VG.black, {
        rotation: -90,
        align: 'center',
      }),
    ];
  }),
  copy('Q3 results  ·  vantor.group', 90, 1240, 900, 28, VG.grey),
]);

export const leadershipTips = template(W, H, () => [
  rect(0, 0, W, H, VG.paper, { name: 'Background' }),
  display('3', 110, 100, 200, 300, VG.orange),
  display('TIPS TO', 280, 110, 700, 150, VG.black),
  display('LEADERSHIP', 280, 265, 760, 150, VG.black),
  rect(280, 440, 430, 130, VG.orange, { cornerRadius: 14, name: 'Label' }),
  display('SUCCESS', 280, 450, 430, 110, VG.white, { align: 'center' }),
  laptop(200, 690, 680, { photo: 'laptop-analytics', body: VG.charcoal }),
  circle(960, 1236, 54, VG.white, { name: 'Saucer', ...shadow(20, 8, 'rgba(0,0,0,0.18)') }),
  circle(960, 1236, 36, '#3b2416', { name: 'Coffee' }),
  copy('Swipe for all three', 90, 1220, 500, 30, VG.black, { fontWeight: 600 }),
  icon('arrow-right', 410, 1222, 36, VG.orange, { strokeWidth: 2.6 }),
]);

const CALLS = ['Growth call', 'Revenue call', 'Partner call'] as const;

export const answerCall = template(W, H, () => [
  rect(0, 0, W, H, linear(170, VG.orangeLight, VG.orangeDeep), { name: 'Background' }),
  head('Answer the Call.', 90, 100, 900, 80, VG.white, 800),
  copy('Every missed call is a missed client.', 90, 210, 900, 32, VG.white),
  CALLS.map((label, index) => {
    const y = 320 + index * 150;
    const x = 90 + index * 40;
    return [
      rect(x, y, 640, 124, VG.white, {
        cornerRadius: 28,
        name: 'Call card',
        ...shadow(30, 12, 'rgba(0,0,0,0.18)'),
      }),
      circle(x + 62, y + 62, 38, VG.black),
      icon('phone', x + 42, y + 42, 40, VG.white, { strokeWidth: 2.2 }),
      head(label, x + 120, y + 24, 300, 30, VG.black, 700),
      copy('Incoming now', x + 120, y + 64, 300, 24, VG.grey),
      circle(x + 470, y + 62, 34, VG.black),
      icon('x', x + 452, y + 44, 36, VG.white, { strokeWidth: 2.6 }),
      circle(x + 562, y + 62, 34, VG.orange),
      icon('phone', x + 544, y + 44, 36, VG.white, { strokeWidth: 2.4 }),
    ];
  }),
  head('Pick up faster.\nClose bigger.', 90, 860, 520, 58, VG.white, 800),
  button('Book a Demo', 90, 1070, VG.black, VG.white),
  photo('man-portrait-2', 630, 800, 370, 460, { cornerRadius: 40 }),
]);

const TICKS = [-60, -30, 0, 30, 60];

export const powerFull = template(W, H, () => [
  rect(0, 0, W, H, linear(180, VG.orangeLight, VG.orangeDeep), { name: 'Background' }),
  TICKS.map((angle) =>
    rotateNodes(angle, 540, 600, [
      rect(530, 240, 20, angle === 0 ? 90 : 64, VG.white, { cornerRadius: 10, name: 'Tick' }),
    ]),
  ),
  display('E', 130, 560, 80, 64, VG.white, { align: 'center' }),
  display('F', 870, 560, 80, 64, VG.white, { align: 'center' }),
  circle(540, 600, 200, 'rgba(0,0,0,0.12)', { name: 'Saucer shadow' }),
  circle(540, 600, 190, '#f1ece6', { name: 'Saucer' }),
  rect(650, 572, 120, 56, VG.white, { cornerRadius: 28, name: 'Cup handle' }),
  circle(540, 600, 140, VG.white, { name: 'Cup', ...shadow(24, 10, 'rgba(0,0,0,0.2)') }),
  circle(540, 600, 116, '#2e1b10', { name: 'Coffee' }),
  ellipse(470, 540, 90, 40, 'rgba(255,255,255,0.14)', { name: 'Crema', rotation: -20 }),
  copy('Power Full', 0, 880, W, 54, VG.white, { align: 'center', letterSpacing: 10 }),
  copy('Fuel your week with focused work.', 0, 970, W, 30, VG.white, { align: 'center' }),
  copy('VANTOR GROUP', 0, 1230, W, 26, VG.black, {
    align: 'center',
    letterSpacing: 8,
    fontWeight: 700,
  }),
]);
