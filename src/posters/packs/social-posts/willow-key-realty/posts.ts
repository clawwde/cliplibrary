import { linear } from '@/design';
import { avatar, icon, photo, pill, rect, shadow, template, text } from '../../../kit';
import {
  AGENT,
  contactLine,
  contactRow,
  footerBar,
  H,
  KEY,
  SANS,
  SCRIPT,
  SERIF,
  W,
} from './palette';

export const trueFalse = template(W, H, () => [
  rect(0, 0, W, H, KEY.cream, { name: 'Background' }),
  photo('interior-2', 0, 0, W, 1200),
  rect(0, 0, W, 1200, 'rgba(247,245,239,0.3)', { name: 'Photo wash' }),
  rect(170, 380, 740, 500, 'rgba(228,233,222,0.95)', {
    cornerRadius: 26,
    name: 'Quiz card',
    ...shadow(40, 16, 'rgba(31,38,32,0.2)'),
  }),
  rect(340, 340, 400, 84, KEY.forest, { cornerRadius: 14, name: 'Quiz tag' }),
  text('True or False?', 340, 357, 400, {
    fontFamily: SERIF,
    fontSize: 42,
    fontWeight: 600,
    italic: true,
    fill: KEY.cream,
    align: 'center',
  }),
  text('Waiting for spring always\ngets you a better price\non your first home.', 210, 480, 660, {
    fontFamily: SANS,
    fontSize: 38,
    fontWeight: 500,
    fill: KEY.ink,
    align: 'center',
    lineHeight: 1.4,
  }),
  pill('TRUE', 270, 740, {
    fill: KEY.cream,
    color: KEY.forest,
    stroke: KEY.forest,
    strokeWidth: 3,
    fontSize: 32,
    fontFamily: SANS,
    width: 240,
    letterSpacing: 6,
  }),
  pill('FALSE', 570, 740, {
    fill: KEY.cream,
    color: KEY.forest,
    stroke: KEY.forest,
    strokeWidth: 3,
    fontSize: 32,
    fontFamily: SANS,
    width: 240,
    letterSpacing: 6,
  }),
  footerBar(1200, 150, `Have a question? Call us today at ${AGENT.phone}`),
]);

export const newListing = template(W, H, () => [
  rect(0, 0, W, H, linear(180, KEY.mist, KEY.cream), { name: 'Background' }),
  text('NEW', 0, 60, W, {
    fontFamily: 'Oswald',
    fontSize: 380,
    fontWeight: 700,
    fill: KEY.forest,
    align: 'center',
    lineHeight: 1,
  }),
  text('Listing', 0, 250, W, {
    fontFamily: SCRIPT,
    fontSize: 170,
    fontWeight: 400,
    fill: KEY.brass,
    align: 'center',
    rotation: -6,
    ...shadow(12, 4, 'rgba(31,38,32,0.25)'),
  }),
  text('48 Alder Lane, Brookfield', 0, 560, W, {
    fontFamily: SANS,
    fontSize: 38,
    fontWeight: 500,
    fill: KEY.ink,
    align: 'center',
  }),
  photo('house-2', 70, 640, 940, 570, { cornerRadius: 20 }),
  rect(0, 1240, W, 110, KEY.forest, { name: 'Footer bar' }),
  contactRow(1280, KEY.cream),
]);

const FEATURES = ['4 Bedrooms', '2 Stories', '3 Bathrooms', '2,850 Sq Ft'];

export const openHouse = template(W, H, () => [
  rect(0, 0, W, H, KEY.forest, { name: 'Background' }),
  photo('house-1', 0, 0, W, 560),
  text('Join our', 70, 600, 520, {
    fontFamily: SCRIPT,
    fontSize: 84,
    fontWeight: 400,
    fill: KEY.brass,
  }),
  text('Open\nHouse', 70, 700, 540, {
    fontFamily: SERIF,
    fontSize: 124,
    fontWeight: 500,
    fill: KEY.cream,
    lineHeight: 1,
  }),
  text(
    'Tour the light filled rooms,\nthe garden and the new\nchef kitchen in person.',
    70,
    970,
    540,
    {
      fontFamily: SANS,
      fontSize: 26,
      fontWeight: 400,
      fill: KEY.mist,
      lineHeight: 1.5,
    },
  ),
  FEATURES.map((feature, index) => [
    icon('circle-check', 70 + (index % 2) * 270, 1110 + Math.floor(index / 2) * 52, 30, KEY.brass, {
      strokeWidth: 2.4,
    }),
    text(feature, 112 + (index % 2) * 270, 1112 + Math.floor(index / 2) * 52, 220, {
      fontFamily: SANS,
      fontSize: 26,
      fontWeight: 600,
      fill: KEY.cream,
    }),
  ]),
  (['interior-1', 'interior-2', 'house-2'] as const).map((name, index) =>
    photo(name, 650, 610 + index * 205, 370, 185, { stroke: KEY.cream, strokeWidth: 8 }),
  ),
  rect(0, 1240, W, 110, KEY.cream, { name: 'Footer bar' }),
  text('Saturday, May 18  ·  10AM to 2PM', 0, 1274, W, {
    fontFamily: SERIF,
    fontSize: 34,
    fontWeight: 600,
    fill: KEY.forest,
    align: 'center',
  }),
]);

export const justSold = template(W, H, () => [
  rect(0, 0, W, H, linear(180, KEY.sage, KEY.mist), { name: 'Background' }),
  text(AGENT.site, 0, 60, W, {
    fontFamily: SANS,
    fontSize: 28,
    fontWeight: 500,
    fill: KEY.cream,
    align: 'center',
    letterSpacing: 2,
  }),
  text('JUST', 0, 110, W, {
    fontFamily: 'Oswald',
    fontSize: 390,
    fontWeight: 700,
    fill: 'rgba(255,255,255,0.92)',
    align: 'center',
    lineHeight: 1,
  }),
  text('Sold', 0, 270, W, {
    fontFamily: SCRIPT,
    fontSize: 220,
    fontWeight: 400,
    fill: KEY.forest,
    align: 'center',
    rotation: -8,
  }),
  photo('house-1', 60, 540, 960, 540, { cornerRadius: 20 }),
  rect(0, 1130, W, 220, KEY.cream, { name: 'Agent panel' }),
  avatar('woman-portrait-1', 160, 1130, 90, KEY.cream),
  text(AGENT.name, 280, 1160, 360, {
    fontFamily: SERIF,
    fontSize: 38,
    fontWeight: 700,
    fill: KEY.forest,
  }),
  text(AGENT.role, 280, 1214, 360, {
    fontFamily: SANS,
    fontSize: 26,
    fontWeight: 500,
    fill: KEY.grey,
  }),
  contactLine('phone', AGENT.phone, 640, 1166, KEY.forest),
  contactLine('mail', AGENT.mail, 640, 1220, KEY.forest),
]);
