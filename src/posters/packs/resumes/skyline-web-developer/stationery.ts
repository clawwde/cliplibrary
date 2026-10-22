import { A4_SIZE, CARD_SIZE, icon, rect, template } from '../../../kit';
import { copy, SKY } from './resume';

const CONTACTS = [
  ['map-pin', '12 Lisbon Street'],
  ['mail', 'kai@moreno.dev'],
  ['phone', '+1 (555) 300 1290'],
] as const;

const LETTER_BODY = [
  'I am excited to apply for the Frontend Developer role at Brightwave Digital. With a strong background in interface engineering and a habit of obsessing over details, I build web experiences that are quick to load, easy to use and pleasant to look at.',
  'In my current role at Northbeam Labs, I lead the component library behind our customer dashboard. I turned a tangle of one-off screens into reusable building blocks, improved accessibility scores across the product and helped cut load times by 40%.',
  'I am especially drawn to Brightwave because of your focus on thoughtful, human-centred products. I would love to bring my craft, curiosity and teamwork to your frontend group.',
  'Thank you for your time and consideration. I look forward to talking about how I can help Brightwave build what comes next.',
  'Kind regards,',
].join('\n\n');

const { width: W, height: H } = A4_SIZE;

export const developerLetter = template(W, H, () => [
  rect(0, 0, W, H, '#ffffff', { name: 'Background' }),
  rect(0, 0, W, 300, SKY.haze, { name: 'Header' }),
  copy('KAI', 0, 92, 512, 86, SKY.navy, { fontWeight: 700, align: 'right', lineHeight: 1.1 }),
  copy('MORENO', 530, 92, 640, 86, SKY.cyan, { fontWeight: 700, lineHeight: 1.1 }),
  copy('FRONTEND DEVELOPER', 0, 200, W, 32, SKY.text, { align: 'center', letterSpacing: 5 }),
  rect(0, 300, W, 84, SKY.navy, { name: 'Contact bar' }),
  CONTACTS.map(([glyph, value], index) => [
    icon(glyph, 130 + index * 360, 326, 30, SKY.cyan, { strokeWidth: 2 }),
    copy(value, 176 + index * 360, 326, 300, 22, SKY.white),
  ]),
  copy(
    'Hiring Manager\nBrightwave Digital\n77 Harbour Road\nPort Ellis, CA 90411',
    150,
    470,
    600,
    25,
    SKY.text,
    {
      fontWeight: 700,
    },
  ),
  copy('Dear Hiring Manager,', 150, 700, 600, 24, SKY.text),
  copy('March 4, 2027', 690, 700, 400, 24, SKY.text, { align: 'right' }),
  copy(LETTER_BODY, 150, 770, 940, 24, SKY.text, { lineHeight: 1.55 }),
  copy('Kai Moreno', 150, 1470, 600, 64, SKY.navy, { fontFamily: 'Satisfy' }),
  rect(0, 1680, W, 74, SKY.navy, { name: 'Footer' }),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const developerCardFront = template(CW, CH, () => [
  rect(0, 0, CW, CH, SKY.white, { name: 'Background' }),
  rect(0, 120, CW, 360, SKY.haze, { name: 'Center band' }),
  rect(250, 0, 12, CH, SKY.cyan, { name: 'Accent line' }),
  copy('KAI', 320, 210, 200, 76, SKY.navy, { fontWeight: 700, lineHeight: 1.1 }),
  copy('MORENO', 472, 210, 520, 76, SKY.cyan, { fontWeight: 700, lineHeight: 1.1 }),
  copy('FRONTEND DEVELOPER', 324, 318, 680, 28, SKY.text, { letterSpacing: 4 }),
]);

export const developerCardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, SKY.haze, { name: 'Background' }),
  copy('KAI', 120, 150, 200, 76, SKY.navy, { fontWeight: 700, lineHeight: 1.1 }),
  copy('MORENO', 272, 150, 520, 76, SKY.cyan, { fontWeight: 700, lineHeight: 1.1 }),
  copy('FRONTEND DEVELOPER', 124, 256, 680, 28, SKY.text, { letterSpacing: 4 }),
  rect(0, 400, CW, 100, SKY.navy, { name: 'Contact bar' }),
  CONTACTS.map(([glyph, value], index) => [
    icon(glyph, 50 + index * 340, 436, 28, SKY.cyan, { strokeWidth: 2 }),
    copy(value, 90 + index * 340, 435, 270, 20, SKY.white),
  ]),
  rect(0, CH - 16, CW, 16, SKY.cyan, { name: 'Edge stripe' }),
]);
