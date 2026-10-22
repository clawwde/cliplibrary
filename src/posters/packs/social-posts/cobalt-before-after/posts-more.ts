import {
  circle,
  icon,
  type Nodes,
  photo,
  poly,
  rect,
  rotateNodes,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { POST } from '../lagoon-saas-stats/theme';
import {
  copyStyle,
  type DosCopy,
  dosDonts,
  head,
  type MythCopy,
  mythFact,
  mythStory,
  type ProblemCopy,
  problemsSolution,
  type ShiftTheme,
  spark,
} from './posts';

interface DirectionCopy {
  kicker: string;
  title: string;
  before: string;
  after: string;
  people: readonly [PosterPhotoName, PosterPhotoName];
}

interface HookCopy {
  lines: readonly [string, string];
  punch: string;
  body: string;
}

export interface ShiftCopy {
  myth: MythCopy;
  dos: DosCopy;
  problem: ProblemCopy;
  direction: DirectionCopy;
  hook: HookCopy;
}

const { width: W, height: H } = POST;

const GRAYSCALE = {
  brightness: 0.95,
  contrast: 1.1,
  saturation: 0,
  hue: 0,
  blur: 0,
  grayscale: 1,
  sepia: 0,
  invert: 0,
};

const directionPanel = (
  theme: ShiftTheme,
  x: number,
  fill: string,
  label: string,
  lines: string,
  person: PosterPhotoName,
  after: boolean,
): Nodes[] => [
  rect(x, 330, 450, 1020, fill, { name: `${label} panel`, cornerRadius: 10 }),
  circle(x + 60, 392, 28, after ? theme.pop : theme.paper, { name: 'Badge' }),
  icon(after ? 'check' : 'x', x + 42, 374, 36, theme.ink, { strokeWidth: 3 }),
  text(label, x + 104, 370, 300, head(theme, 40, theme.onBrand)),
  text(lines, x, 470, 450, {
    ...head(theme, 46, theme.onBrand),
    align: 'center',
    lineHeight: 1.2,
  }),
  photo(person, x + 25, 760, 400, 565, {
    cornerRadius: 8,
    ...(after ? {} : { filters: GRAYSCALE }),
  }),
];

const chooseDirection = (theme: ShiftTheme, copy: DirectionCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.dark, { name: 'Background' }),
    text(copy.kicker, 0, 80, W, { ...head(theme, 76, theme.pop), align: 'center' }),
    text(copy.title, 0, 168, W, { ...head(theme, 76, theme.onBrand), align: 'center' }),
    directionPanel(theme, 65, theme.panel, 'Before', copy.before, copy.people[0], false),
    directionPanel(theme, 565, theme.brand, 'After', copy.after, copy.people[1], true),
  ]);

const sign = (
  theme: ShiftTheme,
  label: string,
  y: number,
  pointsLeft: boolean,
  degrees: number,
): Nodes[] => {
  const points: readonly (readonly [number, number])[] = pointsLeft
    ? [
        [230, y + 60],
        [300, y],
        [820, y],
        [820, y + 120],
        [300, y + 120],
      ]
    : [
        [260, y],
        [790, y],
        [860, y + 60],
        [790, y + 120],
        [260, y + 120],
      ];
  return rotateNodes(degrees, 545, y + 60, [
    poly(points, theme.panel, {
      name: `${label} sign`,
      stroke: theme.paper,
      strokeWidth: 6,
      ...shadow(24, 10, 'rgba(0,0,0,0.45)'),
    }),
    text(label, pointsLeft ? 330 : 280, y + 22, 400, {
      ...head(theme, 72, theme.paper),
      letterSpacing: 4,
    }),
    icon(pointsLeft ? 'arrow-left' : 'arrow-right', pointsLeft ? 720 : 680, y + 30, 62, theme.pop, {
      strokeWidth: 3,
    }),
  ]);
};

export const transformHook = (theme: ShiftTheme, copy: HookCopy): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.dark, { name: 'Background' }),
    spark(880, 70, 130, theme.star),
    text(copy.lines[0], 80, 150, 900, head(theme, 64, theme.onBrand)),
    text(copy.lines[1], 80, 225, 900, head(theme, 64, theme.onBrand)),
    text(copy.punch, 80, 300, 900, head(theme, 64, theme.pop)),
    text(copy.body, 80, 420, 860, copyStyle(theme, 32, '#c7cbd6')),
    rect(527, 640, 36, 710, '#9ca3af', { name: 'Sign pole' }),
    circle(545, 640, 26, '#d1d5db', { name: 'Pole cap' }),
    sign(theme, 'BEFORE', 690, true, -6),
    sign(theme, 'AFTER', 900, false, 5),
    spark(70, 1120, 140, theme.star),
  ]);

interface ShiftSet {
  myth: Template;
  dos: Template;
  problem: Template;
  direction: Template;
  hook: Template;
  story: Template;
}

export const shiftTemplates = (theme: ShiftTheme, copy: ShiftCopy): ShiftSet => ({
  myth: mythFact(theme, copy.myth),
  dos: dosDonts(theme, copy.dos),
  problem: problemsSolution(theme, copy.problem),
  direction: chooseDirection(theme, copy.direction),
  hook: transformHook(theme, copy.hook),
  story: mythStory(theme, copy.myth),
});
