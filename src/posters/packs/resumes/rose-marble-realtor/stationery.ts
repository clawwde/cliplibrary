import { A4_SIZE, CARD_SIZE, icon, photo, rect, template } from '../../../kit';
import { copy, marble, outline, ROSE } from './art';

const CONTACTS = [
  ['mail', 'amara@quinnhomes.co'],
  ['phone', '+1 (555) 482 1170'],
  ['map-pin', '9 Seaview Terrace'],
] as const;

const LETTER_BODY = [
  'Dear Hiring Manager,',
  'I am excited to apply for the Real Estate Advisor position at Cedar Lane Realty. Helping people find the right home is what I love most, and over the past eight years I have built a steady record of happy clients, strong referrals and well-run sales.',
  'At Harborview Realty I have guided more than 60 households through purchases and sales worth over $40 million in total. I pride myself on honest advice, careful preparation and listings that stand out, from styled photography to welcoming open houses.',
  'Cedar Lane is known for its warm, community-first approach, and I would be proud to bring my local knowledge, energy and client care to your growing team.',
  'Thank you for your time. I would love the chance to talk about how I can help your clients feel at home.',
  'Warm regards,',
].join('\n\n');

const { width: W, height: H } = A4_SIZE;

export const realtorLetter = template(W, H, () => [
  marble(0, 0, W, H, { flip: true }),
  rect(90, 90, 1060, 300, ROSE.blush, { name: 'Header' }),
  copy('AMARA', 150, 128, 560, 62, ROSE.navy, { fontWeight: 300, lineHeight: 1.05 }),
  copy('QUINN', 150, 190, 560, 80, ROSE.navy, { fontWeight: 800, lineHeight: 1.05 }),
  copy('REAL ESTATE ADVISOR', 152, 300, 500, 22, ROSE.navy, { fontWeight: 700, letterSpacing: 2 }),
  CONTACTS.map(([glyph, value], index) => [
    icon(glyph, 740, 156 + index * 60, 28, ROSE.navy, { strokeWidth: 2 }),
    copy(value, 784, 156 + index * 60, 340, 22, ROSE.navy),
  ]),
  rect(90, 390, 1060, 1190, ROSE.white, { name: 'Letter body' }),
  copy(
    'Hiring Manager\nCedar Lane Realty\n310 Orchard Avenue\nBayfield, FL 32801',
    150,
    450,
    600,
    23,
    ROSE.ink,
  ),
  copy(LETTER_BODY, 150, 650, 940, 23, ROSE.ink, { lineHeight: 1.55 }),
  copy('Amara Quinn', 150, 1440, 600, 62, ROSE.navy, { fontFamily: 'Satisfy' }),
  rect(90, 1580, 1060, 84, ROSE.blush, { name: 'Footer band' }),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const realtorCardFront = template(CW, CH, () => [
  marble(0, 0, CW, CH),
  outline(240, 110, 640, 330, 3),
  outline(170, 160, 640, 330, 3),
  rect(200, 135, 650, 330, ROSE.navy, { name: 'Name panel' }),
  copy('AMARA', 270, 190, 520, 56, ROSE.blush, { fontWeight: 300, lineHeight: 1.05 }),
  copy('QUINN', 270, 248, 520, 76, ROSE.blush, { fontWeight: 800, lineHeight: 1.05 }),
  copy('REAL ESTATE ADVISOR', 274, 348, 520, 20, ROSE.blush, {
    fontWeight: 700,
    letterSpacing: 2,
  }),
]);

export const realtorCardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, ROSE.blush, { name: 'Background' }),
  rect(36, 36, 36, 36, ROSE.navy, { name: 'Corner block' }),
  rect(0, 300, 14, 230, ROSE.navy, { name: 'Edge bar' }),
  copy('AMARA', 90, 70, 500, 50, ROSE.navy, { fontWeight: 300, lineHeight: 1.05 }),
  copy('QUINN', 90, 120, 500, 66, ROSE.navy, { fontWeight: 800, lineHeight: 1.05 }),
  copy('REAL ESTATE ADVISOR', 92, 206, 500, 18, ROSE.navy, { fontWeight: 700, letterSpacing: 2 }),
  CONTACTS.map(([glyph, value], index) => [
    icon(glyph, 92, 300 + index * 62, 28, ROSE.navy, { strokeWidth: 2 }),
    copy(value, 136, 300 + index * 62, 460, 23, ROSE.navy),
  ]),
  marble(620, 0, 430, CH, { flip: true }),
  outline(706, 50, 300, 430, 3),
  photo('woman-portrait-1', 672, 86, 300, 440, { cornerRadius: 14 }),
]);
