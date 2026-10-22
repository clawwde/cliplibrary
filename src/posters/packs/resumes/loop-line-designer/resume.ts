import { A4_SIZE, circle, icon, rect, template } from '../../../kit';
import { copy, grid, LOOP, outlinePill, ring, swatches, swirl } from './art';

const { width: W, height: H } = A4_SIZE;

const SPECIALTIES = [
  ['Typography', 0.92],
  ['Illustration', 0.74],
  ['Brand Identity', 0.86],
  ['Motion Design', 0.66],
  ['Print Production', 0.8],
] as const;

const TOOLS = [
  ['layout-grid', 'Layout', 0.85, LOOP.lime],
  ['image', 'Photo Edit', 0.7, LOOP.violet],
  ['pen-tool', 'Vector Art', 0.9, LOOP.coral],
  ['film', 'Motion', 0.6, LOOP.sky],
] as const;

const entry = (title: string, years: string, place: string, detail: string, y: number) => [
  copy(title, 610, y, 380, 23, LOOP.lime, { fontWeight: 600 }),
  copy(years, 900, y + 1, 260, 22, LOOP.white, { align: 'right', fontWeight: 500 }),
  copy(place, 610, y + 36, 550, 22, LOOP.white, { fontWeight: 600 }),
  detail === '' ? [] : copy(detail, 610, y + 74, 550, 19, LOOP.lilac),
];

export const designerResume = template(W, H, () => [
  rect(0, 0, W, H, LOOP.night, { name: 'Background' }),
  grid(W, H, 62),
  copy('Ivy\nSorensen', 90, 80, 640, 118, LOOP.white, { fontWeight: 700, lineHeight: 1.02 }),
  rect(712, 210, 4, 104, LOOP.white, { name: 'Text cursor' }),
  rect(90, 344, 380, 70, LOOP.lime, { cornerRadius: 35, name: 'Role pill' }),
  copy('Graphic Designer', 90, 361, 380, 29, LOOP.night, {
    fontWeight: 600,
    align: 'center',
    lineHeight: 1.2,
  }),
  swirl(860, 40, 300, LOOP.lime, 22),
  swatches(760, 250, 120),
  rect(558, 500, 3, 1180, 'rgba(255,255,255,0.6)', { name: 'Divider' }),
  rect(551, 494, 16, 16, LOOP.white, { name: 'Divider handle' }),
  rect(551, 1080, 16, 16, LOOP.white, { name: 'Divider handle' }),
  rect(551, 1672, 16, 16, LOOP.white, { name: 'Divider handle' }),
  outlinePill('Contact', 90, 500, 300),
  (
    [
      ['phone', '+1 (555) 610 2234'],
      ['mail', 'ivy@sorensen.design'],
      ['globe', 'sorensen.design'],
    ] as const
  ).map(([glyph, value], index) => [
    icon(glyph, 92, 596 + index * 58, 30, LOOP.lime, { strokeWidth: 2 }),
    copy(value, 142, 597 + index * 58, 380, 22, LOOP.white),
  ]),
  outlinePill('Specialties', 90, 800, 300),
  SPECIALTIES.map(([label, share], index) => {
    const y = 900 + index * 76;
    return [
      rect(90, y, 400, 14, 'rgba(255,255,255,0.85)', { cornerRadius: 7, name: 'Track' }),
      rect(90, y, 400 * share, 14, LOOP.lime, { cornerRadius: 7, name: 'Level' }),
      circle(90 + 400 * share, y + 7, 11, LOOP.night, {
        stroke: LOOP.lime,
        strokeWidth: 4,
        name: 'Knob',
      }),
      copy(label, 90, y + 24, 400, 19, LOOP.white, { align: 'center' }),
    ];
  }),
  outlinePill('Portfolio', 90, 1310, 300),
  rect(90, 1410, 180, 180, LOOP.white, { cornerRadius: 14, name: 'QR tile' }),
  icon('qr-code', 105, 1425, 150, LOOP.night, { strokeWidth: 2 }),
  copy('Scan to browse\nmy latest work', 296, 1452, 240, 21, LOOP.white, { lineHeight: 1.4 }),
  icon('pen-tool', 420, 1540, 50, LOOP.lime, { strokeWidth: 2 }),
  outlinePill('Education', 610, 500, 300),
  entry('Brightmoor University', '2016 - 2020', 'BA Visual Communication', '', 596),
  entry('Oakridge Art College', '2014 - 2016', 'Diploma in Illustration', '', 696),
  outlinePill('Experience', 610, 820, 300),
  entry(
    'Senior Designer',
    '2022 - Now',
    'Copperleaf Agency',
    'Leads identity and campaign work for food, travel and culture brands.',
    916,
  ),
  entry(
    'Junior Designer',
    '2020 - 2022',
    'Inkwell Press',
    'Designed book covers, posters and packaging ready for print.',
    1086,
  ),
  outlinePill('Tools', 610, 1270, 220),
  TOOLS.map(([glyph, label, share, color], index) => {
    const cx = 666 + index * 142;
    return [
      ring(cx, 1430, 46, share, color, 10),
      icon(glyph, cx - 18, 1412, 36, color, { strokeWidth: 2 }),
      copy(label, cx - 70, 1494, 140, 19, LOOP.white, { align: 'center' }),
    ];
  }),
  copy('Open to freelance projects from May 2027', 610, 1600, 560, 21, LOOP.lime, {
    fontWeight: 500,
  }),
]);
