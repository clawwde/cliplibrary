import { circle, icon, poly, rect, rotateNodes, star, template, text } from '../../../kit';
import {
  EMBER as E,
  glow,
  H,
  HEAD,
  laptopDevice,
  phoneDevice,
  siteLine,
  tablet,
  W,
} from './devices';

const headline = (content: string, y: number, size: number, fill: string) =>
  text(content, 0, y, W, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 800,
    fill,
    align: 'center',
    lineHeight: 1.05,
  });

const subline = (content: string, y: number, fill = E.grey) =>
  text(content, 0, y, W, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 500,
    fill,
    align: 'center',
    lineHeight: 1.4,
  });

export const performBetter = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(540, 1000, 620),
  headline('Built to', 110, 96, E.white),
  headline('Work Smarter', 215, 96, E.glow),
  subline('Streamline your workflow and ship\nmore in less time.', 360),
  rect(400, 490, 280, 8, E.glow, { cornerRadius: 4, name: 'Underline' }),
  tablet(250, 640, 440, 600, { body: E.silver, rotation: -14 }),
  tablet(470, 610, 470, 650),
]);

export const assistLaunch = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(540, 680, 560),
  ['Assist.', 'Launch.', 'Create.'].map((word, index) =>
    text(word, 80, 110 + index * 350, 960, {
      fontFamily: HEAD,
      fontSize: 210,
      fontWeight: 800,
      fill: E.white,
      lineHeight: 1,
    }),
  ),
  rotateNodes(-14, 550, 640, [laptopDevice(250, 440, 600)]),
  siteLine(1250),
]);

export const showcase = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(540, 520, 520),
  text('Visit us today!', 0, 100, W, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 700,
    italic: true,
    fill: E.white,
    align: 'center',
  }),
  rotateNodes(-8, 540, 470, [laptopDevice(240, 270, 600)]),
  headline('Showcase', 790, 150, E.glow),
  subline('Work that works as hard as you do.', 980, E.white),
  (['globe', 'mail', 'phone'] as const).map((name, index) => [
    circle(440 + index * 100, 1150, 34, E.glow),
    icon(name, 422 + index * 100, 1132, 36, E.black, { strokeWidth: 2.4 }),
  ]),
]);

export const smartKit = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(540, 800, 540),
  headline('Smart UI Kit', 140, 112, E.white),
  subline('Effortless pricing pages for every product.', 290),
  laptopDevice(150, 560, 640),
  phoneDevice(770, 640, 170),
  star(16, 90, 450, 220, E.glow, { innerRatio: 0.84, name: 'Sticker' }),
  text('TRY IT\nFREE', 110, 515, 180, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 800,
    fill: E.black,
    align: 'center',
    lineHeight: 1.05,
    rotation: -10,
  }),
  siteLine(1220),
]);

export const monthlyPlan = template(W, H, () => [
  rect(0, 0, W, H, E.black, { name: 'Background' }),
  glow(540, 860, 520),
  headline('Monthly\nPackage', 120, 112, E.white),
  icon('square-check', 368, 384, 48, E.glow, { strokeWidth: 2.2 }),
  text('No hidden fees', 430, 388, 400, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 500,
    fill: E.white,
  }),
  poly(
    [
      [500, 960],
      [580, 960],
      [640, 1080],
      [440, 1080],
    ],
    E.silver,
    { name: 'Stand' },
  ),
  rect(400, 1072, 280, 22, E.silver, { cornerRadius: 11, name: 'Stand foot' }),
  tablet(230, 600, 620, 420, { rotation: -8 }),
  siteLine(1230),
]);
