import {
  avatar,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  pill,
  rating,
  rect,
  rotateNodes,
  shadow,
  template,
  text,
} from '../../../kit';

export const FH = {
  forest: '#1f4a36',
  deep: '#133024',
  mustard: '#f2b632',
  mustardDark: '#c98e0e',
  mustardSoft: '#f9dd92',
  cream: '#fbf5e6',
  ink: '#1b2a22',
  white: '#ffffff',
  grey: '#7c8580',
};

export const W = POST_SIZE.width;
export const H = POST_SIZE.height;

type TextStyle = Parameters<typeof text>[4];

const font =
  (fontFamily: string, fontWeight: number, lineHeight: number) =>
  (
    content: string,
    x: number,
    y: number,
    width: number,
    size: number,
    fill: string,
    style: TextStyle = {},
  ) =>
    text(content, x, y, width, {
      fontFamily,
      fontSize: size,
      fontWeight,
      fill,
      lineHeight,
      ...style,
    });

export const display = font('Anton', 400, 1);
const serif = font('DM Serif Display', 400, 1);
export const script = font('Caveat', 700, 1);
export const copy = font('Poppins', 400, 1.4);
export const bold = font('Poppins', 700, 1.2);

export const button = (label: string, x: number, y: number, fill: string, color: string) =>
  pill(label, x, y, { fill, color, fontSize: 26, fontFamily: 'Poppins', fontWeight: 600 });

export const handle = (y: number, color: string) =>
  copy('fernhill.studio', 0, y, W, 26, color, {
    align: 'center',
    fontWeight: 600,
    letterSpacing: 2,
  });

const folder = (x: number, y: number, width: number, height: number, fill: string, tab: string) => [
  rect(x, y, width * 0.38, 80, tab, { cornerRadius: 20, name: 'Folder tab' }),
  rect(x + 40, y + 10, width - 80, 200, FH.white, {
    cornerRadius: 12,
    rotation: -3,
    name: 'Paper',
  }),
  rect(x, y + 50, width, height - 50, fill, {
    cornerRadius: 30,
    name: 'Folder',
    ...shadow(30, 12, 'rgba(19,48,36,0.22)'),
  }),
];

export const catalogNewest = template(W, H, () => [
  rect(0, 0, W, H, FH.cream, { name: 'Background' }),
  serif('Catalog', 90, 100, 900, 200, FH.forest),
  serif('Newest', 500, 330, 480, 72, FH.mustardDark, { align: 'right' }),
  folder(150, 450, 540, 420, FH.mustard, FH.mustardDark),
  copy('Spring Collection 2027', 190, 790, 460, 28, FH.deep, { fontWeight: 600 }),
  folder(600, 820, 400, 360, FH.forest, FH.deep),
  copy('New arrivals', 640, 1110, 320, 26, FH.cream, { fontWeight: 600 }),
  icon('navigation', 600, 530, 76, FH.deep, { strokeWidth: 2.2, rotation: -90 }),
  serif('Stay\nTuned', 90, 930, 460, 120, FH.forest, { lineHeight: 0.95 }),
  handle(1250, FH.grey),
]);

const HOURS = [
  ['Mon to Fri', '9:00 to 18:00'],
  ['Saturday', '10:00 to 16:00'],
  ['Sunday', 'Closed'],
] as const;

export const openingHours = template(W, H, () => [
  rect(0, 0, W, H, FH.mustard, { name: 'Background' }),
  rect(538, 0, 4, 230, FH.deep, { name: 'String' }),
  rotateNodes(-5, 540, 230, [
    rect(300, 200, 480, 800, FH.cream, {
      cornerRadius: 36,
      name: 'Tag',
      ...shadow(36, 16, 'rgba(19,48,36,0.25)'),
    }),
    circle(540, 262, 24, FH.mustard, { name: 'Tag hole' }),
    display('OPENING', 300, 330, 480, 120, FH.forest, { align: 'center' }),
    display('HOURS', 300, 450, 480, 120, FH.forest, { align: 'center' }),
    rect(360, 610, 360, 3, 'rgba(31,74,54,0.35)', { name: 'Divider' }),
    HOURS.map(([day, time], index) => [
      bold(day, 350, 650 + index * 80, 200, 30, FH.ink),
      copy(time, 530, 650 + index * 80, 200, 30, FH.ink, { align: 'right' }),
    ]),
    copy('Walk-ins always welcome', 300, 910, 480, 26, FH.forest, { align: 'center' }),
  ]),
  bold('Visit us at 24 Linden Row', 0, 1120, W, 36, FH.deep, { align: 'center' }),
  handle(1220, FH.deep),
]);

const REVIEWS = [
  {
    photo: 'man-portrait-1',
    name: 'Theo Marsh',
    quote: 'They lifted our brand and our\nsales in a single quarter.',
  },
  {
    photo: 'woman-portrait-5',
    name: 'Ivy Castellan',
    quote: 'Sharp strategy, friendly team,\nand results we can measure.',
  },
  {
    photo: 'woman-portrait-2',
    name: 'Rosa Kendrick',
    quote: 'Every campaign landed on time\nand beat our targets.',
  },
] as const;

export const whatTheySay = template(W, H, (): Nodes[] => [
  rect(0, 0, W, H, FH.forest, { name: 'Background' }),
  button('Client Reviews', 410, 100, FH.mustard, FH.deep),
  display('WHAT THEY SAY?', 0, 200, W, 140, FH.cream, { align: 'center' }),
  REVIEWS.map((review, index) => {
    const y = 420 + index * 230;
    const x = index === 1 ? 160 : 100;
    return [
      rect(x, y, 820, 196, FH.cream, { cornerRadius: 28, name: 'Review card' }),
      avatar(review.photo, x + 90, y + 98, 54, FH.mustard),
      bold(review.name, x + 175, y + 34, 360, 30, FH.forest),
      rating(x + 610, y + 38, 26, 5, FH.mustardDark, 0.2),
      copy(review.quote, x + 175, y + 82, 600, 26, FH.ink),
    ];
  }),
  handle(1220, FH.mustardSoft),
]);
