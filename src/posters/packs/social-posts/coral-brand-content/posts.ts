import {
  icon,
  path,
  pill,
  poly,
  rect,
  rotateNodes,
  SQUARE_SIZE,
  template,
  text,
} from '../../../kit';

export interface CoralPalette {
  primary: string;
  ink: string;
  paper: string;
  accent: string;
}

export const CORAL: CoralPalette = {
  primary: '#ff5a36',
  ink: '#141016',
  paper: '#ffffff',
  accent: '#ffd9a0',
};

export const TEAL: CoralPalette = {
  primary: '#ffd9a0',
  ink: '#ffffff',
  paper: '#0f9d8a',
  accent: '#0b3d36',
};

export const HEAD = 'Lexend';
export const S = SQUARE_SIZE.width;

export const bold = (
  content: string,
  x: number,
  y: number,
  size: number,
  fill: string,
  align: 'left' | 'center' | 'right' = 'left',
  width = S - x - 60,
) =>
  text(content, x, y, width, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 800,
    fill,
    align,
    lineHeight: 1.08,
  });

export const site = (x: number, y: number, fill: string) =>
  text('halcyon.studio', x, y, 400, { fontSize: 26, fontWeight: 600, fill });

export const standOut = template(S, S, () => [
  rect(0, 0, S, S, CORAL.primary, { name: 'Background' }),
  site(680, 80, CORAL.paper),
  bold('Stand Out.', 80, 130, 96, CORAL.paper),
  rotateNodes(-4, 80, 270, [
    rect(80, 260, 420, 86, CORAL.ink, { cornerRadius: 12, name: 'Label' }),
    text('Learn smarter.', 80, 276, 420, {
      fontFamily: HEAD,
      fontSize: 44,
      fontWeight: 700,
      fill: CORAL.paper,
      align: 'center',
    }),
  ]),
  Array.from({ length: 7 }, (_, index) =>
    icon('user-round', 70 + index * 135, 520, 130, index === 3 ? CORAL.ink : CORAL.paper, {
      strokeWidth: 2.4,
    }),
  ),
  rect(60, 690, 960, 6, CORAL.paper, { cornerRadius: 3, name: 'Baseline' }),
  text('Clarity through intelligence', 80, 900, 900, {
    fontSize: 38,
    fontWeight: 500,
    fill: CORAL.paper,
  }),
]);

const highlight = (content: string, x: number, y: number, width: number) => [
  rect(x - 20, y - 8, width, 110, CORAL.primary, { cornerRadius: 14, name: 'Highlight' }),
  bold(content, x, y, 84, CORAL.paper),
];

export const luxury = template(S, S, () => [
  rect(0, 0, S, S, CORAL.ink, { name: 'Background' }),
  highlight('Marketing', 150, 230, 500),
  bold("isn't a luxury.", 150, 360, 84, CORAL.paper),
  bold("It's a business", 150, 470, 84, CORAL.paper),
  highlight('essential.', 150, 590, 480),
  pill('Read the comments', 150, 780, {
    fill: CORAL.paper,
    color: CORAL.ink,
    fontSize: 30,
    fontFamily: HEAD,
  }),
]);

const FOLDERS = ['Search ads', 'Web design', 'Social media', 'Video editing'];
const FOLDER_SHADES = ['#2b2730', '#38323e', '#463f4d', '#544c5c'];

export const howWeGrow = template(S, S, () => [
  rect(0, 0, S, S, CORAL.ink, { name: 'Background' }),
  rect(0, 0, S, 420, CORAL.primary, { name: 'Header' }),
  bold('THIS IS HOW WE', 80, 110, 72, CORAL.paper),
  bold('GROW YOUR BRAND.', 80, 195, 72, CORAL.ink),
  FOLDERS.map((label, index) => {
    const y = 360 + index * 160;
    const fill = FOLDER_SHADES[index] ?? '#2b2730';
    return [
      rect(100 + index * 210, y, 260, 60, fill, { cornerRadius: 14, name: 'Folder tab' }),
      rect(80, y + 36, 920, 170, fill, { cornerRadius: 18, name: 'Folder' }),
      text(label, index % 2 === 0 ? 130 : 560, y + 80, 380, {
        fontFamily: HEAD,
        fontSize: 38,
        fontWeight: 700,
        fill: CORAL.paper,
        align: index % 2 === 0 ? 'left' : 'right',
      }),
    ];
  }),
]);

export const focusBridge = template(S, S, () => [
  rect(0, 0, S, S, CORAL.paper, { name: 'Background' }),
  text('You focus on', 80, 110, 600, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 400,
    fill: CORAL.ink,
  }),
  bold('Walking.', 80, 175, 64, CORAL.ink),
  text('We focus on', 80, 290, 600, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 400,
    fill: CORAL.ink,
  }),
  text('the', 80, 358, 200, { fontFamily: HEAD, fontSize: 60, fontWeight: 400, fill: CORAL.ink }),
  rect(192, 350, 290, 88, CORAL.primary, { cornerRadius: 14, name: 'Highlight' }),
  bold('Bridge.', 210, 358, 64, CORAL.paper),
  icon('pencil', 600, 360, 400, CORAL.ink, { strokeWidth: 1.4 }),
  poly(
    [
      [0, S],
      [0, 780],
      [230, 780],
      [270, S],
    ],
    CORAL.ink,
    { name: 'Left cliff' },
  ),
  poly(
    [
      [S, S],
      [S, 780],
      [860, 780],
      [820, S],
    ],
    CORAL.ink,
    { name: 'Right cliff' },
  ),
  rect(230, 776, 400, 8, CORAL.ink, { name: 'Bridge' }),
  [40, 100, 160].map((x) => icon('user-round', x, 710, 60, CORAL.primary, { strokeWidth: 2.6 })),
]);

const cable = (data: string, x: number, y: number, width: number, height: number) =>
  path(
    data,
    x,
    y,
    width,
    height,
    'rgba(0,0,0,0)',
    { width, height },
    {
      stroke: CORAL.ink,
      strokeWidth: 6,
      name: 'Cable',
    },
  );

export const ourServices = template(S, S, () => [
  rect(0, 0, S, S, CORAL.primary, { name: 'Background' }),
  bold('OUR SERVICES', 0, 120, 92, CORAL.paper, 'center', S),
  text('We bridge the gap between brand and buyer', 0, 245, S, {
    fontSize: 34,
    fontWeight: 500,
    fill: CORAL.ink,
    align: 'center',
  }),
  rect(300, 470, 24, 300, CORAL.ink, { cornerRadius: 6, name: 'Tower' }),
  rect(756, 470, 24, 300, CORAL.ink, { cornerRadius: 6, name: 'Tower' }),
  rect(60, 740, 960, 16, CORAL.ink, { cornerRadius: 4, name: 'Deck' }),
  cable('M0 0 Q228 420 456 0', 312, 480, 456, 210),
  cable('M0 260 Q150 200 252 0', 60, 480, 252, 260),
  cable('M0 0 Q102 200 252 260', 768, 480, 252, 260),
  [380, 450, 540, 630, 700].map((x) =>
    rect(x, x === 540 ? 690 : 640, 4, x === 540 ? 50 : 100, CORAL.ink, { name: 'Hanger' }),
  ),
  pill('Comment "STUDIO"', 355, 830, {
    fill: CORAL.paper,
    color: CORAL.ink,
    fontSize: 32,
    fontFamily: HEAD,
    fontWeight: 700,
    width: 370,
  }),
  text('Your Business x Your Customers', 0, 970, S, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 700,
    fill: CORAL.paper,
    align: 'center',
  }),
]);
