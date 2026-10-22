import type { TextElement } from '@/design';
import { A4_SIZE, avatar, circle, icon, poly, rect, template, text } from '../../../kit';

export const FOCAL = {
  ink: '#12343b',
  paper: '#f4efe6',
  amber: '#d9932f',
  text: '#1f2d32',
  muted: '#55666b',
  mist: '#cfe0dc',
  white: '#ffffff',
};

const FONT = 'Poppins';

const { width: W, height: H } = A4_SIZE;

export const copy = (
  content: string,
  x: number,
  y: number,
  width: number,
  fontSize: number,
  fill: string,
  style: Partial<TextElement> = {},
) =>
  text(content, x, y, width, {
    fontFamily: FONT,
    fontSize,
    fontWeight: 400,
    fill,
    lineHeight: 1.45,
    ...style,
  });

const bandEdge = (y: number) => 380 + (260 * y) / H;
const column = (y: number) => bandEdge(y) + 64;

const label = (content: string, y: number) => {
  const x = column(y);
  const width = content.length * 17.6 + 40;
  return [
    rect(x, y, width, 54, FOCAL.ink, { name: `${content} label` }),
    copy(content, x + 20, y + 11, width, 26, FOCAL.white, {
      fontWeight: 700,
      letterSpacing: 2,
      lineHeight: 1.2,
    }),
  ];
};

const entry = (
  title: string,
  meta: string,
  detail: string,
  y: number,
  options: { metaInline: boolean },
) => {
  const x = column(y) + 4;
  const titleWidth = title.length * 15.6;
  return [
    circle(x + 6, y + 19, 6, FOCAL.ink),
    copy(title, x + 26, y, titleWidth + 20, 26, FOCAL.text, { fontWeight: 700, lineHeight: 1.3 }),
    options.metaInline
      ? copy(meta, x + 26 + titleWidth + 18, y + 4, 240, 22, FOCAL.amber, { fontWeight: 600 })
      : copy(meta, x + 26, y + 38, 640, 22, FOCAL.amber, { fontWeight: 600 }),
    copy(detail, x + 26, y + (options.metaInline ? 40 : 74), W - x - 110, 21, FOCAL.muted),
  ];
};

export const photographerResume = template(W, H, () => [
  rect(0, 0, W, H, FOCAL.paper, { name: 'Background' }),
  poly(
    [
      [0, 0],
      [380, 0],
      [640, H],
      [210, H],
    ],
    FOCAL.ink,
    { name: 'Slanted band' },
  ),
  poly(
    [
      [398, 0],
      [406, 0],
      [666, H],
      [658, H],
    ],
    FOCAL.amber,
    { name: 'Band rule' },
  ),
  avatar('woman-portrait-4', 284, 690, 168, FOCAL.amber),
  copy('NOA\nWHITFIELD', 132, 905, 400, 58, FOCAL.white, { fontWeight: 700, lineHeight: 1.05 }),
  copy('PHOTOGRAPHER', 140, 1042, 380, 28, FOCAL.mist, { letterSpacing: 5 }),
  rect(142, 1096, 80, 6, FOCAL.amber, { name: 'Name rule' }),
  copy('CONTACT', 162, 1200, 300, 30, FOCAL.white, { fontWeight: 700, letterSpacing: 2 }),
  (
    [
      ['mail', 'noa@whitfield.studio'],
      ['phone', '+1 (555) 214 7788'],
      ['globe', 'whitfield.studio'],
    ] as const
  ).map(([name, value], index) => {
    const y = 1272 + index * 62;
    const x = (210 * y) / H + 44;
    return [
      icon(name, x, y, 30, FOCAL.amber, { strokeWidth: 2 }),
      copy(value, x + 46, y + 1, 360, 22, FOCAL.white),
    ];
  }),
  label('ABOUT ME', 110),
  copy(
    'Photography, to me, is the craft of noticing. I chase soft window light, honest laughter and the small in-between moments, then shape them into images people want to keep for years.',
    column(186),
    186,
    W - column(186) - 70,
    23,
    FOCAL.muted,
  ),
  label('WORK EXPERIENCE', 380),
  entry(
    'Freelance Photographer',
    '2021 - Now',
    'Portrait, brand and lifestyle sessions for 250+ clients, from planning to final edit.',
    462,
    { metaInline: true },
  ),
  entry(
    'Studio Photographer',
    '2018 - 2021',
    'Shot product catalogues and campaign imagery for local makers and retailers.',
    610,
    { metaInline: true },
  ),
  entry(
    'Wedding Second Shooter',
    '2016 - 2018',
    'Covered ceremonies, candid moments and family groups alongside lead artists.',
    758,
    { metaInline: true },
  ),
  label('EDUCATION', 930),
  entry(
    'BFA in Photography',
    'Northgate School of Arts  |  2012 - 2016',
    'Studied lighting, darkroom printing and visual storytelling.',
    1012,
    { metaInline: false },
  ),
  entry(
    'Certificate in Digital Imaging',
    'Harbourline Institute  |  2017',
    'Colour management, retouching and print workflows.',
    1182,
    { metaInline: false },
  ),
  label('SKILLS', 1360),
  [
    ['Lightroom Editing', 'Studio Lighting', 'Art Direction', 'Colour Grading'],
    ['Client Relations', 'Shot Planning', 'Drone Capture', 'Visual Storytelling'],
  ].map((items, columnIndex) =>
    items.map((item, row) => {
      const y = 1446 + row * 54;
      const x = column(1446) + columnIndex * 270;
      return [
        circle(x + 6, y + 16, 5, FOCAL.amber),
        copy(item, x + 24, y, 250, 22, FOCAL.text, { fontWeight: 500 }),
      ];
    }),
  ),
]);
