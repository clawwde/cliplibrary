import { A4_SIZE, avatar, CARD_SIZE, icon, photo, rect, template } from '../../../kit';
import { copy, FOCAL } from './resume';

const CONTACTS = [
  ['mail', 'noa@whitfield.studio'],
  ['phone', '+1 (555) 214 7788'],
  ['globe', 'whitfield.studio'],
] as const;

const LETTER_BODY = [
  'Dear Hiring Manager,',
  'I am delighted to apply for the Lead Photographer role at Harbor & Pine Studio. With a patient eye for composition, a love of natural light and years spent photographing homes, people and products, I know how to make every frame feel considered and warm.',
  'Over the past seven years I have partnered with architects, stylists and small brands to create imagery that tells a clear story. I plan every shoot carefully, light it with intention and finish each set with a calm, consistent edit.',
  'A recent highlight was a seasonal campaign for a local furniture maker that lifted their online enquiries by more than a third in two months. It reminded me how much strong pictures can move a business forward.',
  'Your thoughtful, story-led work is exactly where I want to grow next, and I would love to bring my craft and energy to your team.',
  'Warm regards,',
].join('\n\n');

export const photographerLetter = template(A4_SIZE.width, A4_SIZE.height, () => [
  rect(0, 0, A4_SIZE.width, A4_SIZE.height, FOCAL.paper, { name: 'Background' }),
  rect(0, 0, A4_SIZE.width, 320, FOCAL.ink, { name: 'Header' }),
  rect(110, 262, 90, 6, FOCAL.amber, { name: 'Header rule' }),
  copy('NOA WHITFIELD', 110, 100, 640, 70, FOCAL.white, { fontWeight: 700, lineHeight: 1.1 }),
  copy('PHOTOGRAPHER', 112, 192, 500, 32, FOCAL.mist, { letterSpacing: 5 }),
  CONTACTS.map(([name, value], index) => [
    icon(name, 770, 104 + index * 58, 32, FOCAL.amber, { strokeWidth: 2 }),
    copy(value, 822, 105 + index * 58, 380, 25, FOCAL.white),
  ]),
  copy(
    'Hiring Manager\nCreative Department\nHarbor & Pine Studio\n48 Wharf Lane, Port Ellis',
    160,
    410,
    700,
    26,
    FOCAL.text,
    { fontWeight: 600 },
  ),
  copy(LETTER_BODY, 160, 610, 920, 24, FOCAL.text, { lineHeight: 1.7 }),
  copy('Noa Whitfield', 160, 1445, 600, 72, FOCAL.ink, { fontFamily: 'Dancing Script' }),
  rect(0, 1650, A4_SIZE.width, 104, FOCAL.ink, { name: 'Footer' }),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const photographerCardFront = template(CW, CH, () => [
  rect(0, 0, CW, CH, FOCAL.paper, { name: 'Background' }),
  rect(0, 0, 440, CH, FOCAL.ink, { name: 'Photo panel' }),
  rect(456, 0, 8, CH, FOCAL.amber, { name: 'Panel rule' }),
  avatar('woman-portrait-4', 220, 300, 168, FOCAL.amber),
  rect(500, 222, 500, 84, FOCAL.ink, { name: 'Name label' }),
  copy('NOA WHITFIELD', 524, 238, 470, 42, FOCAL.white, { fontWeight: 700, lineHeight: 1.2 }),
  copy('PHOTOGRAPHY\n& PORTRAITS', 528, 336, 470, 32, FOCAL.text, {
    letterSpacing: 3,
    lineHeight: 1.3,
  }),
]);

const STRIP = ['autumn-leaves', 'city-night', 'yoga-1', 'house-2'] as const;

export const photographerCardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, FOCAL.paper, { name: 'Background' }),
  STRIP.map((name, index) => photo(name, 24, index * 150 + 2, 376, 146)),
  rect(0, 0, 24, CH, FOCAL.amber, { name: 'Edge stripe' }),
  copy('NOA WHITFIELD', 450, 104, 560, 50, FOCAL.ink, { fontWeight: 700, lineHeight: 1.2 }),
  copy('PHOTOGRAPHY & PORTRAITS', 452, 176, 560, 23, FOCAL.muted, { letterSpacing: 3 }),
  rect(452, 228, 70, 5, FOCAL.amber, { name: 'Name rule' }),
  CONTACTS.map(([name, value], index) => [
    icon(name, 452, 290 + index * 66, 32, FOCAL.amber, { strokeWidth: 2 }),
    copy(value, 504, 291 + index * 66, 500, 25, FOCAL.text),
  ]),
]);
