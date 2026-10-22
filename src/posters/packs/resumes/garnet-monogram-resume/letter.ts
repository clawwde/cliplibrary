import { CARD_SIZE, circle, icon, line, rect, template, text } from '../../../kit';
import {
  BODY,
  caps,
  contacts,
  doubleRule,
  GARNET,
  HEAD,
  iconTile,
  LETTER,
  LETTER_TEXT,
  monogram,
} from './brand';

export const coverLetter = template(LETTER.width, LETTER.height, () => [
  rect(0, 0, LETTER.width, LETTER.height, GARNET.paper, { name: 'Background' }),
  rect(0, 0, 400, LETTER.height, GARNET.wine, { name: 'Sidebar' }),
  monogram(125, 90, 150, GARNET.rose, GARNET.wine),
  text('ARLO VANCE', 60, 300, 320, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 500,
    fill: '#ffffff',
    letterSpacing: 1,
  }),
  caps('BRAND DESIGNER\nART DIRECTOR', 62, 380, 300, 28, '#f6d3e0'),
  line(60, 490, 280, '#f6d3e0', 2, { dashed: true }),
  text('CONTACT', 60, 540, 300, {
    fontFamily: HEAD,
    fontSize: 42,
    fontWeight: 500,
    fill: '#ffffff',
  }),
  contacts.map((item, index) => [
    icon(item.icon, 60, 618 + index * 64, 30, GARNET.rose, { strokeWidth: 2.2 }),
    caps(item.label, 108, 618 + index * 64, 280, 22, '#ffffff'),
  ]),
  rect(500, 130, 775, 90, GARNET.rose, { name: 'Title bar' }),
  circle(510, 175, 66, '#ffffff', { stroke: GARNET.rose, strokeWidth: 8 }),
  icon('pen-tool', 478, 143, 64, GARNET.wine, { strokeWidth: 2 }),
  text('COVER LETTER', 600, 146, 600, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 600,
    fill: GARNET.wine,
    letterSpacing: 2,
  }),
  text('MAY 4, 2026', 480, 300, 600, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 600,
    fill: GARNET.ink,
  }),
  text(LETTER_TEXT, 480, 360, 720, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 400,
    fill: GARNET.ink,
    lineHeight: 1.6,
  }),
  text('Arlo Vance', 480, 1250, 500, {
    fontFamily: 'Dancing Script',
    fontSize: 72,
    fontWeight: 700,
    fill: GARNET.wine,
  }),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const cardFront = template(CW, CH, () => [
  rect(0, 0, CW, CH, GARNET.wine, { name: 'Background' }),
  monogram(180, 150, 300, GARNET.rose, GARNET.wine),
  text('VANCE\nSTUDIO', 560, 210, 420, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 600,
    fill: '#ffffff',
    lineHeight: 1,
    letterSpacing: 4,
  }),
  rect(0, CH - 14, CW, 14, GARNET.rose, { name: 'Edge' }),
]);

export const cardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, GARNET.paper, { name: 'Background' }),
  rect(0, 0, 400, CH, GARNET.wine, { name: 'Panel' }),
  monogram(100, 200, 200, GARNET.rose, GARNET.wine),
  text('ARLO VANCE', 460, 80, 560, {
    fontFamily: HEAD,
    fontSize: 68,
    fontWeight: 600,
    fill: GARNET.ink,
    letterSpacing: 1,
  }),
  caps('BRAND DESIGNER\nART DIRECTOR', 462, 160, 400, 26, GARNET.muted),
  doubleRule(460, 260, 540),
  contacts.map((item, index) => [
    iconTile(item.icon, 460, 310 + index * 74, 46),
    caps(item.label, 524, 316 + index * 74, 480, 28),
  ]),
  rect(0, CH - 14, CW, 14, GARNET.rose, { name: 'Edge' }),
]);
