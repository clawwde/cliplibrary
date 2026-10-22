import { type DesignIconName, type Fill, linear, radial } from '@/design';
import {
  circle,
  fitBox,
  fitWidth,
  icon,
  laptop,
  page,
  poly,
  polygon,
  rect,
  rotateNodes,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { SQUARE } from '../../../pack';
import { BODY, HEAD, TIDE } from './resume';

const { width: W, height: H } = SQUARE;
const DARK = '#0b1514';
const DESK = '#eef2f1';

const shapes = () => [
  circle(930, -10, 150, radial('#5eead4', '#0f9d8a', '#0b6b5e'), { name: 'Ring' }),
  circle(930, -10, 64, DARK, { name: 'Ring hole' }),
  polygon(3, 30, -20, 170, 170, linear(160, '#ffb199', '#ff7a59', '#c2410c'), {
    rotation: 20,
    name: 'Cone',
  }),
  rect(40, 900, 150, 150, linear(150, '#a7f3d0', '#14b8a6'), {
    cornerRadius: 36,
    rotation: -16,
    name: 'Cube',
  }),
  polygon(3, 880, 860, 180, 180, linear(140, '#ffd0c2', '#ff7a59'), {
    rotation: -14,
    name: 'Pyramid',
  }),
];

const pencil = (x: number, y: number) => [
  rect(x, y, 22, 440, TIDE.teal, {
    cornerRadius: 3,
    name: 'Pencil',
    ...shadow(18, 10, 'rgba(15,31,28,0.25)'),
  }),
  poly(
    [
      [x, y],
      [x + 22, y],
      [x + 11, y - 46],
    ],
    '#f3d5b5',
    { name: 'Pencil wood' },
  ),
  poly(
    [
      [x + 6, y - 30],
      [x + 16, y - 30],
      [x + 11, y - 46],
    ],
    TIDE.ink,
    { name: 'Pencil lead' },
  ),
  rect(x, y + 440, 22, 28, TIDE.coral, { cornerRadius: 4, name: 'Eraser' }),
];

export const paperPage = (item: Template) => () =>
  page(
    DESK,
    rect(255, 120, 560, 725, '#ffffff', { ...shadow(60, 28, 'rgba(15,31,28,0.2)'), name: 'Sheet' }),
    fitWidth(item, 255, 120, 560),
    pencil(880, 400),
  );

export const sheetPage = (item: Template) => () => {
  const scale = Math.min(960 / item.width, 990 / item.height);
  const width = item.width * scale;
  const height = item.height * scale;
  const x = (W - width) / 2;
  const y = (H - height) / 2;
  return page(
    '#ffffff',
    rect(x, y, width, height, '#ffffff', {
      stroke: '#d5dcda',
      strokeWidth: 2,
      ...shadow(24, 8, 'rgba(15,31,28,0.12)'),
      name: 'Sheet',
    }),
    fitBox(item, x, y, width, height),
  );
};

const card = (item: Template, x: number, y: number, width: number) => [
  rect(x, y + 8, width, (width * item.height) / item.width, TIDE.deep, {
    ...shadow(40, 24, 'rgba(15,31,28,0.22)'),
    name: 'Card edge',
  }),
  fitWidth(item, x, y, width),
];

export const cardsPage = (front: Template, back: Template) => () =>
  page(
    DESK,
    rotateNodes(24, 660, 320, [card(front, 380, 160, 560)]),
    rotateNodes(24, 420, 720, [card(back, 140, 560, 560)]),
  );

const editorScreen = (item: Template, width: number, height: number) => {
  const bar = height * 0.08;
  return [
    rect(0, 0, width, height, '#e9edec', { name: 'Artboard' }),
    rect(0, 0, width, bar, linear(90, TIDE.deep, TIDE.teal), { name: 'Editor bar' }),
    (
      [
        ['File', 46],
        ['Resize', 92],
        ['Editing', 150],
      ] as const
    ).map(([label, x]) =>
      text(label, x, bar * 0.28, 60, {
        fontFamily: BODY,
        fontSize: bar * 0.38,
        fontWeight: 600,
        fill: '#ffffff',
      }),
    ),
    rect(width - 56, bar * 0.18, 44, bar * 0.64, '#ffffff', { cornerRadius: 6, name: 'Share' }),
    rect(0, bar, width * 0.08, height - bar, '#ffffff', { name: 'Sidebar' }),
    (['layout-grid', 'image', 'pencil', 'palette', 'folder', 'upload'] as const).map(
      (name, index) => icon(name, width * 0.022, bar + 16 + index * 40, 20, TIDE.muted),
    ),
    fitBox(item, width * 0.1, bar + height * 0.04, width * 0.88, height - bar - height * 0.06),
  ];
};

export const editablePage = (item: Template) => () => {
  const width = 680;
  const screenWidth = width * 0.95;
  const screenHeight = width * 0.57;
  return page(
    DARK,
    shapes(),
    text('Edit every detail in your browser', 0, 180, W, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 800,
      fill: '#ffb199',
      align: 'center',
    }),
    text(
      'Change words, fonts and colours, swap icons and photos, and move\nsections around until the layout feels like you.',
      100,
      260,
      880,
      {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 400,
        fill: '#e6efed',
        align: 'center',
        lineHeight: 1.45,
      },
    ),
    laptop(200, 430, width, { content: editorScreen(item, screenWidth, screenHeight) }),
  );
};

const steps: readonly { icon: DesignIconName; title: string; body: string }[] = [
  {
    icon: 'shopping-cart',
    title: '01 Check out',
    body: 'Complete your order in\na couple of clicks',
  },
  {
    icon: 'download',
    title: '02 Open the file',
    body: 'Download the PDF and tap\nthe open editor link',
  },
  {
    icon: 'pencil',
    title: '03 Make it yours',
    body: 'Edit the resume, letter and\ncards right away',
  },
];

export const howToPage = (tile: Fill) => () =>
  page(
    DARK,
    shapes(),
    text('How To Begin', 0, 250, W, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    steps.map((step, index) => {
      const cx = 200 + index * 340;
      return [
        rect(cx - 70, 400, 140, 140, tile, { cornerRadius: 36, name: 'Step tile' }),
        icon(step.icon, cx - 38, 432, 76, '#ffffff', { strokeWidth: 2 }),
        text(step.title, cx - 160, 580, 320, {
          fontFamily: HEAD,
          fontSize: 32,
          fontWeight: 700,
          fill: '#ffffff',
          align: 'center',
        }),
        text(step.body, cx - 160, 630, 320, {
          fontFamily: BODY,
          fontSize: 24,
          fontWeight: 400,
          fill: '#b9c7c4',
          align: 'center',
          lineHeight: 1.45,
        }),
      ];
    }),
  );
