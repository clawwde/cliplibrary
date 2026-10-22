import { type DesignIconName, linear, radial } from '@/design';
import {
  circle,
  fitBox,
  fitWidth,
  group,
  icon,
  laptop,
  type Nodes,
  page,
  poly,
  polygon,
  rect,
  rotateNodes,
  shadow,
  type Template,
  text,
} from '../../../kit';

export interface ListingTheme {
  desk: string;
  sheet: string;
  night: string;
  accent: string;
  edge: string;
  glow: readonly [string, string];
  spark: readonly [string, string];
  font: string;
}

export interface ListingStep {
  icon: DesignIconName;
  title: string;
  body: string;
}

const SIZE = 1080;

const pencil = (x: number, y: number, length: number) =>
  group(
    rect(x, y + 70, 22, length - 70, '#1c1c1e', {
      name: 'Pencil body',
      cornerRadius: 3,
      ...shadow(18, 10, 'rgba(0,0,0,0.25)'),
    }),
    poly(
      [
        [x, y + 70],
        [x + 22, y + 70],
        [x + 11, y],
      ],
      '#e3c39a',
      { name: 'Pencil tip' },
    ),
    poly(
      [
        [x + 6, y + 22],
        [x + 16, y + 22],
        [x + 11, y],
      ],
      '#2b2b2b',
      { name: 'Graphite' },
    ),
  );

export const resumeOnDesk = (theme: ListingTheme, resume: Template) => () =>
  page(
    theme.desk,
    rect(285, 110, 510, 721, '#ffffff', {
      name: 'Paper shadow',
      ...shadow(70, 34, 'rgba(15,23,42,0.28)'),
    }),
    fitWidth(resume, 285, 110, 510),
    pencil(886, 380, 480),
  );

const cardStack = (item: Template, edge: string, x: number, y: number, width: number) => {
  const height = (item.height * width) / item.width;
  return rotateNodes(17, x + width / 2, y + height / 2, [
    rect(x, y + 9, width, height, edge, {
      name: 'Card edge',
      cornerRadius: 4,
      ...shadow(40, 24, 'rgba(15,23,42,0.28)'),
    }),
    fitWidth(item, x, y, width),
  ]);
};

export const cardsOnDesk = (theme: ListingTheme, front: Template, back: Template) => () =>
  page(
    theme.desk,
    cardStack(front, theme.edge, 400, 170, 540),
    cardStack(back, theme.edge, 140, 540, 540),
  );

export const letterOnDesk = (theme: ListingTheme, letter: Template) => () =>
  page(
    theme.sheet,
    rect(194, 48, 692, 984, '#ffffff', {
      name: 'Paper shadow',
      ...shadow(50, 20, 'rgba(15,23,42,0.22)'),
    }),
    fitBox(letter, 0, 48, SIZE, 984),
  );

const decorations = (theme: ListingTheme): Nodes[] => [
  circle(930, 10, 150, radial(theme.glow[0], theme.glow[1]), { name: 'Donut' }),
  circle(930, 10, 60, theme.night, { name: 'Donut hole' }),
  polygon(3, -30, -40, 190, 190, linear(160, theme.spark[0], theme.spark[1]), {
    rotation: 28,
    name: 'Cone',
  }),
  rect(30, 900, 150, 150, linear(150, theme.spark[0], theme.spark[1]), {
    cornerRadius: 36,
    rotation: -16,
    name: 'Cube',
  }),
  polygon(3, 870, 880, 190, 190, linear(140, theme.glow[0], theme.glow[1]), {
    rotation: -14,
    name: 'Pyramid',
  }),
];

const EDITOR_TOOLS: readonly DesignIconName[] = [
  'layout-grid',
  'layers',
  'pencil',
  'image',
  'upload',
  'folder',
  'settings',
];

export const editorLaptop =
  (theme: ListingTheme, resume: Template, copy: { title: string; body: string }) => () => {
    const width = 680;
    const screenWidth = width * 0.95;
    const screenHeight = width * 0.57;
    const bar = 30;
    const rail = 56;
    const sheetHeight = screenHeight - bar - 28;
    const sheetWidth = (resume.width * sheetHeight) / resume.height;
    const sheetX = rail + (screenWidth - rail - sheetWidth) / 2;
    return page(
      theme.night,
      decorations(theme),
      text(copy.title, 0, 200, SIZE, {
        fontFamily: theme.font,
        fontSize: 52,
        fontWeight: 700,
        fill: theme.accent,
        align: 'center',
      }),
      text(copy.body, 150, 280, 780, {
        fontFamily: theme.font,
        fontSize: 29,
        fontWeight: 400,
        fill: '#e5e7eb',
        align: 'center',
        lineHeight: 1.45,
      }),
      laptop(200, 450, width, {
        screen: '#eef0f4',
        body: '#2a2d33',
        content: [
          rect(0, 0, screenWidth, bar, linear(90, theme.glow[1], theme.spark[1]), {
            name: 'Editor bar',
          }),
          text('File     Resize     Editing', 54, 8, 300, {
            fontFamily: theme.font,
            fontSize: 12,
            fontWeight: 600,
            fill: '#ffffff',
          }),
          rect(screenWidth - 70, 6, 56, 18, '#ffffff', { cornerRadius: 5, name: 'Share button' }),
          text('Share', screenWidth - 70, 9, 56, {
            fontFamily: theme.font,
            fontSize: 11,
            fontWeight: 700,
            fill: '#111827',
            align: 'center',
          }),
          rect(0, bar, rail, screenHeight - bar, '#ffffff', { name: 'Tool rail' }),
          EDITOR_TOOLS.map((tool, index) =>
            icon(tool, 18, bar + 16 + index * 42, 20, '#6b7280', { strokeWidth: 2 }),
          ),
          rect(sheetX, bar + 14, sheetWidth, sheetHeight, '#ffffff', {
            name: 'Canvas',
            ...shadow(16, 4, 'rgba(15,23,42,0.18)'),
          }),
          fitWidth(resume, sheetX, bar + 14, sheetWidth),
        ],
      }),
    );
  };

export const howToStart =
  (theme: ListingTheme, copy: { title: string; steps: readonly ListingStep[] }) => () =>
    page(
      theme.night,
      decorations(theme),
      text(copy.title, 0, 250, SIZE, {
        fontFamily: theme.font,
        fontSize: 60,
        fontWeight: 700,
        fill: '#ffffff',
        align: 'center',
      }),
      copy.steps.map((step, index) => {
        const cx = 190 + index * 350;
        return [
          circle(cx, 500, 78, linear(140, theme.spark[0], theme.spark[1]), { name: 'Step badge' }),
          icon(step.icon, cx - 42, 458, 84, '#ffffff', { strokeWidth: 1.8 }),
          text(step.title, cx - 160, 615, 320, {
            fontFamily: theme.font,
            fontSize: 30,
            fontWeight: 700,
            fill: '#ffffff',
            align: 'center',
          }),
          text(step.body, cx - 150, 665, 300, {
            fontFamily: theme.font,
            fontSize: 23,
            fontWeight: 400,
            fill: '#d1d5db',
            align: 'center',
            lineHeight: 1.4,
          }),
        ];
      }),
    );
