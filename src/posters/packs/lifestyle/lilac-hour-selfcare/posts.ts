import { linear } from '@/design';
import { circle, icon, photo, rect, shadow, template, text } from '../../../kit';
import { H, HAND, HANDLE, LILAC as L, MONO_FONT, SANS, SERIF, SOFT, W } from './palette';

export const lockScreen = template(W, H, () => [
  rect(0, 0, W, H, L.ink, { name: 'Background' }),
  photo('coffee-book', 0, 0, W, H, { filters: SOFT }),
  rect(0, 0, W, H, 'rgba(42,34,51,0.35)', { name: 'Photo tint' }),
  text('10:07', 0, 230, W, {
    fontFamily: SANS,
    fontSize: 240,
    fontWeight: 300,
    fill: L.white,
    align: 'center',
    lineHeight: 1,
    ...shadow(20, 4, 'rgba(0,0,0,0.25)'),
  }),
  text('Sunday, March 9', 0, 500, W, {
    fontFamily: SANS,
    fontSize: 46,
    fontWeight: 400,
    fill: L.white,
    align: 'center',
  }),
  rect(140, 720, 800, 210, 'rgba(250,247,251,0.82)', {
    cornerRadius: 36,
    name: 'Notification',
    ...shadow(30, 10, 'rgba(0,0,0,0.2)'),
  }),
  icon('bell', 190, 770, 40, L.plum, { strokeWidth: 2.2 }),
  text('Reminder', 248, 770, 400, {
    fontFamily: SANS,
    fontSize: 36,
    fontWeight: 700,
    fill: L.ink,
  }),
  text('now', 760, 774, 130, {
    fontFamily: SANS,
    fontSize: 28,
    fontWeight: 500,
    fill: L.grey,
    align: 'right',
  }),
  text('Slow down. Do one kind thing for you.', 190, 836, 720, {
    fontFamily: SANS,
    fontSize: 32,
    fontWeight: 400,
    fill: L.ink,
  }),
  rect(440, 1270, 200, 10, 'rgba(255,255,255,0.8)', { cornerRadius: 5, name: 'Home bar' }),
]);

export const highlightQuote = template(W, H, () => [
  rect(0, 0, W, H, L.mist, { name: 'Background' }),
  photo('woman-portrait-2', 0, 0, W, H, { filters: SOFT }),
  rect(0, 0, W, 640, linear(180, 'rgba(250,247,251,0.9)', 'rgba(250,247,251,0)'), {
    name: 'Top wash',
  }),
  rect(250, 130, 580, 76, L.ink, { cornerRadius: 16, name: 'Text menu' }),
  ['Copy', 'Select All', 'Look Up'].map((label, index) =>
    text(label, 250 + index * 193, 152, 193, {
      fontFamily: SANS,
      fontSize: 27,
      fontWeight: 500,
      fill: L.white,
      align: 'center',
    }),
  ),
  rect(443, 146, 2, 44, 'rgba(255,255,255,0.3)', { name: 'Menu divider' }),
  rect(636, 146, 2, 44, 'rgba(255,255,255,0.3)', { name: 'Menu divider' }),
  rect(110, 250, 860, 200, 'rgba(156,131,181,0.4)', { name: 'Selection' }),
  rect(106, 236, 4, 228, L.mauve, { name: 'Selection handle' }),
  circle(108, 236, 12, L.mauve),
  rect(970, 236, 4, 228, L.mauve, { name: 'Selection handle' }),
  circle(972, 464, 12, L.mauve),
  text('"She grew softer, not smaller,\nand found her strength there."', 130, 268, 820, {
    fontFamily: SERIF,
    fontSize: 58,
    fontWeight: 600,
    italic: true,
    fill: L.ink,
    align: 'center',
    lineHeight: 1.2,
  }),
]);

export const notesCard = template(W, H, () => [
  rect(0, 0, W, H, L.plum, { name: 'Background' }),
  photo('yoga-1', 0, 0, W, H),
  rect(0, 0, W, H, 'rgba(74,58,92,0.25)', { name: 'Photo tint' }),
  rect(110, 150, 860, 330, L.cream, {
    cornerRadius: 30,
    name: 'Notes card',
    ...shadow(36, 12, 'rgba(0,0,0,0.25)'),
  }),
  icon('arrow-left', 140, 186, 34, L.mauve, { strokeWidth: 2.6 }),
  text('Notes', 180, 186, 300, {
    fontFamily: SANS,
    fontSize: 30,
    fontWeight: 600,
    fill: L.mauve,
  }),
  icon('share-2', 830, 184, 34, L.mauve, { strokeWidth: 2.2 }),
  icon('pencil', 890, 184, 34, L.mauve, { strokeWidth: 2.2 }),
  rect(150, 270, 780, 160, L.butter, { cornerRadius: 8, name: 'Highlight' }),
  text('You cannot rush a bloom.\nWater it, wait and let it open.', 175, 288, 740, {
    fontFamily: SANS,
    fontSize: 42,
    fontWeight: 500,
    fill: L.ink,
    lineHeight: 1.4,
  }),
  text(HANDLE, 0, 1240, W, {
    fontFamily: HAND,
    fontSize: 48,
    fontWeight: 600,
    fill: L.white,
    align: 'center',
  }),
]);

const RESULTS = ['is quiet and daily', 'is earned, not given', 'starts with rest'];

export const searchWord = template(W, H, () => [
  rect(0, 0, W, H, L.mist, { name: 'Background' }),
  photo('designer-tablet', 0, 0, W, H, { filters: SOFT }),
  rect(0, 0, W, H, 'rgba(236,230,242,0.3)', { name: 'Photo wash' }),
  rect(170, 420, 740, 500, 'rgba(250,247,251,0.86)', {
    cornerRadius: 34,
    name: 'Search card',
    ...shadow(40, 14, 'rgba(42,34,51,0.25)'),
  }),
  rect(200, 450, 680, 104, L.white, { cornerRadius: 22, name: 'Search field' }),
  text('growth', 236, 478, 520, {
    fontFamily: MONO_FONT,
    fontSize: 40,
    fontWeight: 400,
    fill: L.ink,
  }),
  icon('search', 800, 478, 48, L.ink, { strokeWidth: 2.4 }),
  RESULTS.map((result, index) =>
    text(result, 236, 610 + index * 100, 640, {
      fontFamily: MONO_FONT,
      fontSize: 36,
      fontWeight: 400,
      fill: L.plum,
    }),
  ),
  rect(236, 690, 600, 2, 'rgba(74,58,92,0.12)', { name: 'Divider' }),
  rect(236, 790, 600, 2, 'rgba(74,58,92,0.12)', { name: 'Divider' }),
]);
