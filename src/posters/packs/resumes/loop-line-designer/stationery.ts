import { A4_SIZE, CARD_SIZE, icon, rect, template } from '../../../kit';
import { bezier, copy, grid, LOOP, swatches, swirl } from './art';

const CONTACTS = [
  ['phone', '+1 (555) 610 2234'],
  ['mail', 'ivy@sorensen.design'],
  ['globe', 'sorensen.design'],
] as const;

const LETTER_BODY = [
  'I am writing to share my enthusiasm for the Graphic Designer position at Northlight Collective. I have followed your studio for a while, especially the bold riverfront festival identity, and I would love to bring fresh ideas and careful craft to your team.',
  'Over the last few years I have built a solid foundation in identity, editorial and campaign design. My portfolio covers type-led posters, packaging systems and playful illustration, and I enjoy turning messy briefs into clear, memorable visuals that work across print and screen.',
  'Joining Northlight would be the perfect next step. I am available for an interview at your convenience and would be glad to walk you through recent projects.',
  'Sincerely,',
].join('\n\n');

const { width: W, height: H } = A4_SIZE;

export const designerLetter = template(W, H, () => [
  rect(0, 0, W, H, LOOP.night, { name: 'Background' }),
  rect(0, 0, W, 330, LOOP.lime, { name: 'Header' }),
  swirl(36, 24, 236, LOOP.night, 16),
  bezier(1000, 150, 140, 140, LOOP.night),
  copy('Ivy Sorensen', 0, 66, W, 100, LOOP.night, {
    fontWeight: 700,
    align: 'center',
    lineHeight: 1.1,
  }),
  rect(470, 216, 300, 64, LOOP.night, { cornerRadius: 32, name: 'Role pill' }),
  copy('Graphic Designer', 470, 232, 300, 25, LOOP.white, {
    fontWeight: 600,
    align: 'center',
    lineHeight: 1.2,
  }),
  copy(
    'Hiring Manager\nNorthlight Collective\n18 Foundry Yard\nRiverton, OR 97014',
    150,
    420,
    600,
    24,
    LOOP.white,
  ),
  copy('Dear Hiring Team,', 150, 640, 500, 25, LOOP.lime, { fontWeight: 700 }),
  copy('Date: 03/11/27', 690, 640, 400, 25, LOOP.lime, { fontWeight: 700, align: 'right' }),
  copy(LETTER_BODY, 150, 712, 940, 24, LOOP.white, { lineHeight: 1.7 }),
  copy('Ivy Sorensen', 150, 1380, 500, 28, LOOP.lime, { fontWeight: 700 }),
  rect(0, 1630, W, 124, LOOP.lime, { name: 'Footer' }),
  CONTACTS.map(([glyph, value], index) => [
    icon(glyph, 140 + index * 360, 1676, 32, LOOP.night, { strokeWidth: 2 }),
    copy(value, 186 + index * 360, 1677, 300, 22, LOOP.night, { fontWeight: 500 }),
  ]),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const designerCardFront = template(CW, CH, () => [
  rect(0, 0, CW, CH, LOOP.night, { name: 'Background' }),
  grid(CW, CH, 50),
  swirl(30, 20, 250, LOOP.lime, 18),
  swatches(80, 360, 110),
  copy('Ivy\nSorensen', 400, 110, 620, 104, LOOP.white, { fontWeight: 700, lineHeight: 1.02 }),
  rect(940, 230, 4, 90, LOOP.white, { name: 'Text cursor' }),
  rect(404, 352, 330, 62, LOOP.lime, { cornerRadius: 31, name: 'Role pill' }),
  copy('Graphic Designer', 404, 367, 330, 26, LOOP.night, {
    fontWeight: 600,
    align: 'center',
    lineHeight: 1.2,
  }),
  bezier(810, 450, 170, 100, LOOP.white),
]);

export const designerCardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, LOOP.night, { name: 'Background' }),
  grid(525, CH, 50),
  rect(525, 0, 525, CH, LOOP.lime, { name: 'Lime half' }),
  copy('Ivy Sorensen', 56, 90, 460, 52, LOOP.white, { fontWeight: 700, lineHeight: 1.1 }),
  rect(56, 172, 270, 54, LOOP.lime, { cornerRadius: 27, name: 'Role pill' }),
  copy('Graphic Designer', 56, 186, 270, 22, LOOP.night, {
    fontWeight: 600,
    align: 'center',
    lineHeight: 1.2,
  }),
  CONTACTS.slice(0, 2).map(([glyph, value], index) => [
    icon(glyph, 58, 300 + index * 64, 30, LOOP.lime, { strokeWidth: 2 }),
    copy(value, 104, 301 + index * 64, 400, 23, LOOP.white),
  ]),
  rect(667, 90, 240, 240, LOOP.white, { cornerRadius: 18, name: 'QR tile' }),
  icon('qr-code', 687, 110, 200, LOOP.night, { strokeWidth: 2 }),
  rect(612, 400, 350, 72, LOOP.night, { cornerRadius: 36, name: 'Website pill' }),
  copy('sorensen.design', 612, 420, 350, 25, LOOP.white, {
    fontWeight: 600,
    align: 'center',
    lineHeight: 1.2,
  }),
]);
