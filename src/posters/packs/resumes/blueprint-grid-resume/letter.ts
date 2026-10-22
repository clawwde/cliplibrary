import { CARD_SIZE, icon, rect, template, text } from '../../../kit';
import {
  BODY,
  contactItems,
  GRID,
  gridPaper,
  HEAD,
  LETTER,
  monoPhoto,
  selectionName,
} from './resume';

const LETTER_TEXT = [
  'Dear Hiring Team,',
  'I am writing to apply for the Brand Designer role at Lumen and Oak. I have admired your packaging work for years, especially the coastal tea range, and I would love to bring a fresh, systems-minded eye to your studio.',
  'Over the last six years I have built identities for food, travel and hospitality brands, moving from strategy workshops to type, colour and launch campaigns. At Kestrel Studio I lead a small team and recently rebranded a bakery chain that grew online orders by 40%.',
  'I care about clear ideas, careful craft and design systems that stay flexible as a brand grows. I would be glad to walk you through my portfolio and talk about what is next for Lumen and Oak.',
  'Sincerely,',
].join('\n\n');

const contactBlock = (x: number, y: number, size: number) =>
  contactItems.map((item, index) => {
    const top = y + index * size * 3.2;
    return [
      icon(item.icon, x, top + size * 0.15, size * 1.5, GRID.accent, { strokeWidth: 2.4 }),
      text(item.label.toUpperCase(), x + size * 2.3, top, 420, {
        fontFamily: BODY,
        fontSize: size,
        fontWeight: 700,
        fill: GRID.ink,
        letterSpacing: 1,
      }),
      text(item.value, x + size * 2.3, top + size * 1.35, 420, {
        fontFamily: BODY,
        fontSize: size,
        fontWeight: 400,
        fill: GRID.muted,
      }),
    ];
  });

export const coverLetter = template(LETTER.width, LETTER.height, () => [
  gridPaper(LETTER.width, LETTER.height),
  rect(0, 0, 400, 1110, GRID.accent, { name: 'Accent column' }),
  monoPhoto('man-portrait-3', 0, 130, 400, 560),
  text('CONTACT', 60, 1170, 320, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 800,
    fill: GRID.ink,
  }),
  contactBlock(60, 1260, 24),
  selectionName('Theo Marlowe', 500, 110, 680, 140, 84),
  text('BRAND DESIGNER', 500, 280, 680, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 800,
    fill: GRID.ink,
    align: 'center',
    letterSpacing: 3,
  }),
  text('APRIL 9, 2026', 470, 390, 400, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 800,
    fill: GRID.ink,
  }),
  rect(470, 446, 70, 8, GRID.accent, { name: 'Date rule' }),
  text(LETTER_TEXT, 470, 500, 720, {
    fontFamily: BODY,
    fontSize: 25,
    fontWeight: 400,
    fill: GRID.ink,
    lineHeight: 1.65,
  }),
  text('Theo Marlowe', 470, 1340, 600, {
    fontFamily: 'Satisfy',
    fontSize: 64,
    fontWeight: 400,
    fill: GRID.ink,
  }),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const cardFront = template(CW, CH, () => [
  gridPaper(CW, CH, 40),
  selectionName('Theo Marlowe', 150, 180, 750, 150, 92),
  text('BRAND DESIGNER', 0, 380, CW, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 800,
    fill: GRID.ink,
    align: 'center',
    letterSpacing: 3,
  }),
  rect(0, CH - 12, CW, 12, GRID.accent, { name: 'Edge' }),
]);

export const cardBack = template(CW, CH, () => [
  gridPaper(CW, CH, 40),
  monoPhoto('man-portrait-3', 0, 0, 420, CH),
  rect(420, 0, 22, CH, GRID.accent, { name: 'Accent stripe' }),
  selectionName('Theo Marlowe', 490, 60, 510, 100, 48),
  text('BRAND DESIGNER', 490, 182, 510, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 800,
    fill: GRID.ink,
    align: 'center',
    letterSpacing: 2,
  }),
  contactBlock(520, 270, 24),
]);
