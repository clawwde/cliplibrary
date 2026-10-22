import { A4_SIZE, avatar, CARD_SIZE, circle, icon, rect, template } from '../../../kit';
import { copy, GRAPHITE, roleTag, tile } from './resume';

const CONTACTS = [
  ['mail', 'theo@albright.dev'],
  ['phone', '+1 (555) 719 3302'],
  ['map-pin', '8 Granite Row'],
] as const;

const LETTER_BODY = [
  'Dear Hiring Manager,',
  'I am excited to apply for the Software Engineer position at Tidewater Cloud. With a strong background across frontend and backend development, I build products that are fast, accessible and pleasant to maintain.',
  'At Quarry Labs I lead the team behind our realtime editor. We shipped live collaboration to more than 30,000 teams, halved API response times and set up release automation that turned risky deploys into routine ones. I enjoy pairing with designers and product managers to find the simplest version of every idea.',
  'I am particularly drawn to Tidewater because of your focus on developer experience and thoughtful engineering culture. I am confident my technical skills, curiosity and steady approach would make me a strong addition to your team.',
  'Thank you for considering my application. I would welcome the chance to discuss how I can contribute to what Tidewater builds next.',
  'Warm regards,',
].join('\n\n');

const { width: W, height: H } = A4_SIZE;

export const engineerLetter = template(W, H, () => [
  rect(0, 0, W, H, GRAPHITE.page, { name: 'Background' }),
  rect(0, 0, W, 300, GRAPHITE.crimson, { name: 'Header' }),
  copy('Theo Albright', 110, 84, 480, 56, GRAPHITE.white, { fontWeight: 500, lineHeight: 1.2 }),
  roleTag(112, 172, 210, 22),
  avatar('man-portrait-1', 640, 150, 96, GRAPHITE.amber),
  CONTACTS.map(([glyph, value], index) => [
    circle(822, 96 + index * 58, 22, GRAPHITE.tag),
    icon(glyph, 810, 84 + index * 58, 24, GRAPHITE.page, { strokeWidth: 2 }),
    copy(value, 862, 82 + index * 58, 320, 22, GRAPHITE.white, { fontWeight: 500 }),
  ]),
  copy(
    'Hiring Manager\nTidewater Cloud\n2450 Lakeview Plaza\nPort Ellis, CA 90411',
    110,
    400,
    600,
    24,
    GRAPHITE.white,
  ),
  copy('October 12, 2027', 730, 560, 400, 24, GRAPHITE.white, { align: 'right' }),
  copy(LETTER_BODY, 110, 620, 1020, 24, GRAPHITE.white, { lineHeight: 1.65 }),
  copy('Theo Albright', 110, 1420, 600, 40, GRAPHITE.white, { fontWeight: 500 }),
  rect(0, 1680, W, 74, GRAPHITE.crimson, { name: 'Footer' }),
]);

const { width: CW, height: CH } = CARD_SIZE;

export const engineerCardFront = template(CW, CH, () => [
  rect(0, 0, CW, CH, GRAPHITE.page, { name: 'Background' }),
  avatar('man-portrait-1', 250, 300, 120, GRAPHITE.amber),
  copy('Theo Albright', 410, 238, 600, 62, GRAPHITE.white, { fontWeight: 500, lineHeight: 1.2 }),
  roleTag(414, 330, 220, 24),
]);

export const engineerCardBack = template(CW, CH, () => [
  rect(0, 0, CW, CH, GRAPHITE.page, { name: 'Background' }),
  rect(0, 0, 420, CH, GRAPHITE.crimson, { name: 'Name panel' }),
  copy('Theo\nAlbright', 50, 60, 360, 52, GRAPHITE.white, { fontWeight: 500, lineHeight: 1.15 }),
  roleTag(52, 200, 190, 20),
  avatar('man-portrait-1', 210, 420, 92, GRAPHITE.amber),
  CONTACTS.map(([glyph, value], index) => [
    tile(470, 60 + index * 100, 360, 80, index === 0),
    icon(glyph, 494, 84 + index * 100, 30, GRAPHITE.amber, { strokeWidth: 2 }),
    copy(value, 540, 84 + index * 100, 280, 22, GRAPHITE.white, { fontWeight: 500 }),
  ]),
  rect(470, 420, 300, 64, GRAPHITE.crimson, { cornerRadius: 32, name: 'Website pill' }),
  copy('albright.dev', 470, 438, 300, 24, GRAPHITE.white, {
    fontWeight: 600,
    align: 'center',
    lineHeight: 1.2,
  }),
  rect(860, 376, 150, 150, GRAPHITE.white, { cornerRadius: 10, name: 'QR tile' }),
  icon('qr-code', 872, 388, 126, GRAPHITE.page, { strokeWidth: 2 }),
]);
