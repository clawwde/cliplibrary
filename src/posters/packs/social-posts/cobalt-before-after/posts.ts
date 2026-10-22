import {
  circle,
  icon,
  type Nodes,
  path,
  poly,
  rect,
  rotateNodes,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { POST } from '../lagoon-saas-stats/theme';

export interface ShiftTheme {
  brand: string;
  panel: string;
  dark: string;
  paper: string;
  ink: string;
  onBrand: string;
  pop: string;
  star: string;
  headFont: string;
  bodyFont: string;
}

export interface MythCopy {
  myth: string;
  fact: string;
}

export interface DosCopy {
  kicker: string;
  title: string;
  dos: readonly string[];
  donts: readonly string[];
}

const W = POST.width;

export const head = (theme: ShiftTheme, size: number, fill: string) => ({
  fontFamily: theme.headFont,
  fontSize: size,
  fontWeight: 800,
  fill,
  lineHeight: 1.08,
});

export const copyStyle = (theme: ShiftTheme, size: number, fill: string, weight = 400) => ({
  fontFamily: theme.bodyFont,
  fontSize: size,
  fontWeight: weight,
  fill,
  lineHeight: 1.35,
});

export const spark = (x: number, y: number, size: number, fill: string) =>
  star(5, x, y, size, fill, { innerRatio: 0.45, name: 'Star' });

const mythNodes = (theme: ShiftTheme, copy: MythCopy, height: number): Nodes[] => {
  const dy = (height - POST.height) / 2;
  return [
    rect(0, 0, W, height, theme.brand, { name: 'Background' }),
    spark(30, 40 + dy * 0.3, 100, theme.star),
    text('Myth', 90, 140 + dy * 0.5, 600, head(theme, 150, theme.dark)),
    text('Fact', 90, 300 + dy * 0.5, 600, head(theme, 150, theme.onBrand)),
    rect(420, 340 + dy * 0.5, 84, 70, theme.dark, { name: 'Or tag', cornerRadius: 6 }),
    text('Or', 420, 356 + dy * 0.5, 84, { ...head(theme, 32, theme.onBrand), align: 'center' }),
    rotateNodes(-6, 570, 690 + dy, [
      rect(250, 590 + dy, 640, 210, theme.dark, {
        name: 'Myth card',
        cornerRadius: 10,
        ...shadow(30, 14, 'rgba(0,0,0,0.35)'),
      }),
      text('Myth', 290, 622 + dy, 300, head(theme, 34, theme.onBrand)),
      text(copy.myth, 290, 676 + dy, 560, copyStyle(theme, 32, theme.onBrand)),
    ]),
    path(
      'M10 0 C -40 120 120 160 180 230',
      430,
      800 + dy,
      190,
      230,
      'rgba(0,0,0,0)',
      { width: 190, height: 230 },
      { stroke: theme.onBrand, strokeWidth: 4, name: 'Connector' },
    ),
    rotateNodes(4, 650, 1110 + dy, [
      rect(330, 1010 + dy, 640, 210, theme.paper, {
        name: 'Fact card',
        cornerRadius: 10,
        ...shadow(30, 14, 'rgba(0,0,0,0.3)'),
      }),
      text('Fact', 370, 1040 + dy, 560, { ...head(theme, 34, theme.ink), align: 'right' }),
      text(copy.fact, 370, 1094 + dy, 560, copyStyle(theme, 32, theme.ink)),
    ]),
    spark(880, 1150 + dy, 150, theme.star),
  ];
};

export const mythFact = (theme: ShiftTheme, copy: MythCopy): Template =>
  template(W, POST.height, () => mythNodes(theme, copy, POST.height));

export const mythStory = (theme: ShiftTheme, copy: MythCopy): Template =>
  template(W, 1920, () => mythNodes(theme, copy, 1920));

const bulletList = (
  theme: ShiftTheme,
  items: readonly string[],
  x: number,
  y: number,
  color: string,
) =>
  items.map((item, index) => [
    circle(x + 7, y + index * 96 + 19, 6, color, { name: 'Bullet' }),
    text(item, x + 28, y + index * 96, 330, { ...copyStyle(theme, 28, color), lineHeight: 1.25 }),
  ]);

export const dosDonts = (theme: ShiftTheme, copy: DosCopy): Template =>
  template(W, POST.height, () => [
    rect(0, 0, W, POST.height, theme.dark, { name: 'Background' }),
    text(copy.kicker, 80, 110, 700, head(theme, 96, theme.pop)),
    text(copy.title, 80, 330, 900, head(theme, 70, theme.onBrand)),
    spark(880, 120, 150, theme.star),
    rect(80, 500, 445, 700, theme.paper, { name: 'Do card', cornerRadius: 12 }),
    icon('circle-check', 116, 536, 64, theme.ink, { strokeWidth: 2.4 }),
    text("Do's", 196, 542, 300, head(theme, 48, theme.ink)),
    rect(116, 630, 373, 3, '#e5e7eb', { name: 'Divider' }),
    bulletList(theme, copy.dos, 116, 664, theme.ink),
    rect(555, 500, 445, 700, theme.panel, { name: 'Dont card', cornerRadius: 12 }),
    icon('circle-x', 591, 536, 64, theme.onBrand, { strokeWidth: 2.4 }),
    text("Don'ts", 671, 542, 300, head(theme, 48, theme.onBrand)),
    rect(591, 630, 373, 3, 'rgba(255,255,255,0.35)', { name: 'Divider' }),
    bulletList(theme, copy.donts, 591, 664, theme.onBrand),
    spark(860, 1130, 190, theme.star),
  ]);

export interface ProblemCopy {
  problem: string;
  solution: string;
}

const bubble = (
  theme: ShiftTheme,
  x: number,
  y: number,
  fill: string,
  side: 'left' | 'right',
  content: string,
) => [
  rect(x, y, 600, 200, fill, {
    name: 'Chat bubble',
    cornerRadius: 22,
    ...shadow(24, 10, 'rgba(0,0,0,0.18)'),
  }),
  poly(
    side === 'left'
      ? [
          [x + 50, y + 190],
          [x + 40, y + 260],
          [x + 130, y + 190],
        ]
      : [
          [x + 470, y + 190],
          [x + 560, y + 260],
          [x + 550, y + 190],
        ],
    fill,
    { name: 'Bubble tail' },
  ),
  text(content, x + 40, y + 46, 520, { ...head(theme, 38, theme.onBrand), lineHeight: 1.25 }),
];

export const problemsSolution = (theme: ShiftTheme, copy: ProblemCopy): Template =>
  template(W, POST.height, () => [
    rect(0, 0, W, POST.height, theme.paper, { name: 'Background' }),
    spark(900, 50, 130, theme.dark),
    text('Your Problems', 80, 150, 700, head(theme, 80, theme.ink)),
    rect(700, 162, 96, 70, theme.dark, { name: 'VS tag', cornerRadius: 6 }),
    text('VS', 700, 178, 96, { ...head(theme, 34, theme.paper), align: 'center' }),
    text('Our Solution', 340, 250, 700, { ...head(theme, 80, theme.brand), align: 'right' }),
    bubble(theme, 100, 500, theme.dark, 'left', copy.problem),
    bubble(theme, 380, 860, theme.brand, 'right', copy.solution),
    spark(50, 1150, 150, theme.dark),
  ]);
