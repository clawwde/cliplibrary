import {
  circle,
  dots,
  icon,
  type Nodes,
  path,
  rect,
  rotateNodes,
  shadow,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { POST, type PostTheme, STORY } from './theme';

export interface StatsCopy {
  useCases: {
    title: string;
    subtitle: string;
    main: readonly [string, string];
    second: readonly [string, string];
    star: string;
    small: string;
    notes: readonly [string, string];
  };
  leaders: {
    kicker: string;
    title: string;
    points: readonly [
      readonly [string, string],
      readonly [string, string],
      readonly [string, string],
    ];
    footer: string;
  };
  profit: { title: string; value: string; body: string };
  bars: { value: string; title: string; source: string };
  results: { kicker: string; title: string; items: readonly [string, string, string] };
}

const W = POST.width;

const head = (theme: PostTheme, size: number, fill: string) => ({
  fontFamily: theme.headFont,
  fontSize: size,
  fontWeight: 800,
  fill,
  lineHeight: 1.1,
});

const copyText = (theme: PostTheme, size: number, fill: string, weight = 400) => ({
  fontFamily: theme.bodyFont,
  fontSize: size,
  fontWeight: weight,
  fill,
  lineHeight: 1.35,
});

const backdrop = (theme: PostTheme, height: number) =>
  rect(0, 0, W, height, theme.background, { name: 'Background' });

const disc = (
  theme: PostTheme,
  cx: number,
  cy: number,
  radius: number,
  value: readonly [string, string],
): Nodes[] => [
  circle(cx, cy, radius, theme.deep, { name: 'Stat disc', ...shadow(40, 16, 'rgba(0,0,0,0.25)') }),
  text(value[0], cx - radius, cy - 62, radius * 2, {
    ...head(theme, 84, theme.surface),
    align: 'center',
    lineHeight: 1,
  }),
  text(value[1], cx - radius, cy + 36, radius * 2, {
    ...copyText(theme, 26, theme.surface, 500),
    align: 'center',
  }),
];

const starStat = (
  theme: PostTheme,
  x: number,
  y: number,
  size: number,
  value: string,
  colors: { fill: string; label: string },
) => [
  star(5, x, y, size, colors.fill, { innerRatio: 0.48, name: 'Stat star' }),
  text(value, x, y + size * 0.47, size, {
    ...head(theme, size * 0.15, colors.label),
    align: 'center',
    lineHeight: 1,
  }),
];

const useCases = (theme: PostTheme, copy: StatsCopy['useCases']) =>
  template(W, POST.height, () => [
    backdrop(theme, POST.height),
    text(copy.title, 80, 100, 920, head(theme, 66, theme.text)),
    text(copy.subtitle, 80, 270, 900, copyText(theme, 36, theme.muted)),
    disc(theme, 320, 790, 200, copy.main),
    disc(theme, 700, 1080, 170, copy.second),
    starStat(theme, 560, 480, 380, copy.star, { fill: theme.star, label: theme.ink }),
    starStat(theme, 150, 950, 230, copy.small, { fill: theme.brand, label: theme.brandText }),
    text(copy.notes[0], 830, 420, 220, copyText(theme, 24, theme.text, 600)),
    rect(830, 400, 60, 4, theme.brand, { name: 'Note rule', cornerRadius: 2 }),
    text(copy.notes[1], 80, 1260, 480, copyText(theme, 24, theme.text, 600)),
  ]);

const leaders = (theme: PostTheme, copy: StatsCopy['leaders']) =>
  template(W, POST.height, () => {
    const anchors = [
      { x: 300, y: 1150, top: 860 },
      { x: 530, y: 1110, top: 700 },
      { x: 770, y: 1030, top: 560 },
    ];
    return [
      backdrop(theme, POST.height),
      text(copy.kicker, 80, 100, 700, copyText(theme, 26, theme.muted, 600)),
      text(copy.title, 80, 146, 920, head(theme, 66, theme.text)),
      star(5, 860, 50, 130, theme.brand, { innerRatio: 0.48, name: 'Star' }),
      path(
        'M0 380 C120 370 220 300 300 300 C400 300 440 260 530 260 C630 260 680 180 770 180 C870 180 980 140 1080 110',
        0,
        850,
        W,
        400,
        'rgba(0,0,0,0)',
        { width: W, height: 400 },
        { stroke: theme.brand, strokeWidth: 8, name: 'Trend line' },
      ),
      anchors.map((anchor, index) => {
        const point = copy.points[index] ?? copy.points[0];
        const labelEnd = anchor.top + 170;
        return [
          text(point[0], anchor.x - 120, anchor.top, 240, {
            ...head(theme, 76, index === 2 ? theme.brand : theme.text),
            align: 'center',
            lineHeight: 1,
          }),
          text(point[1], anchor.x - 120, anchor.top + 88, 240, {
            ...copyText(theme, 24, theme.muted, 500),
            align: 'center',
            lineHeight: 1.2,
          }),
          dots(
            anchor.x,
            labelEnd,
            1,
            Math.floor((anchor.y - labelEnd - 20) / 18),
            18,
            theme.text,
            3,
          ),
          circle(anchor.x, anchor.y, 14, theme.surface, { name: 'Point' }),
        ];
      }),
      star(5, 940, 820, 130, theme.star, { innerRatio: 0.48, name: 'Star' }),
      text(copy.footer, 0, 1268, W, { ...copyText(theme, 26, theme.text, 600), align: 'center' }),
    ];
  });

const profit = (theme: PostTheme, copy: StatsCopy['profit']) =>
  template(W, POST.height, () => [
    backdrop(theme, POST.height),
    [0, 1, 2, 3].map((index) =>
      rect(80 + index * 200, 110, 170, 12, index === 1 ? theme.brand : theme.muted, {
        name: 'Progress segment',
        cornerRadius: 6,
        opacity: index === 1 ? 1 : 0.5,
      }),
    ),
    star(5, 920, 50, 130, theme.star, { innerRatio: 0.48, name: 'Star' }),
    text(copy.title, 80, 300, 920, { ...head(theme, 100, theme.text), lineHeight: 1.05 }),
    text(copy.value, 80, 560, 400, { ...head(theme, 160, theme.text), lineHeight: 1 }),
    circle(470, 640, 62, theme.brand, { name: 'Arrow disc' }),
    icon('arrow-up-right', 434, 604, 72, theme.brandText, { strokeWidth: 2.6 }),
    star(5, 60, 850, 64, theme.brand, { innerRatio: 0.48, name: 'Star' }),
    text(copy.body, 80, 950, 860, copyText(theme, 38, theme.muted)),
  ]);

const barNodes = (theme: PostTheme, copy: StatsCopy['bars'], height: number): Nodes[] => {
  const ratios = [0.34, 0.22, 0.42, 0.3];
  return [
    backdrop(theme, height),
    star(5, 860, 70, 150, theme.star, { innerRatio: 0.48, name: 'Star' }),
    text(copy.value, 80, 120, 700, { ...head(theme, 160, theme.text), lineHeight: 1 }),
    text(copy.title, 80, 310, 920, { ...head(theme, 48, theme.text), lineHeight: 1.2 }),
    text(copy.source, 80, 450, 920, copyText(theme, 24, theme.muted, 500)),
    ratios.map((ratio, index) => {
      const barHeight = height * ratio;
      const x = 40 + index * 255;
      return [
        rect(x, height - barHeight, 235, barHeight, index === 2 ? theme.brand : theme.deep, {
          name: 'Bar',
          cornerRadius: 8,
        }),
        rect(x, height - barHeight * 0.4, 235, barHeight * 0.4, theme.surface, {
          name: 'Bar base',
          opacity: index === 2 ? 0 : 0.92,
        }),
      ];
    }),
  ];
};

const results = (theme: PostTheme, copy: StatsCopy['results']) =>
  template(W, POST.height, () => {
    const slots = [
      { x: 140, y: 440, rotation: -4 },
      { x: 250, y: 680, rotation: 3 },
      { x: 150, y: 920, rotation: -3 },
    ];
    return [
      backdrop(theme, POST.height),
      text(copy.kicker, 80, 100, 700, copyText(theme, 26, theme.muted, 600)),
      text(copy.title, 80, 146, 920, head(theme, 66, theme.text)),
      star(5, 20, 560, 110, theme.brand, { innerRatio: 0.48, name: 'Star' }),
      slots.map((slot, index) =>
        rotateNodes(slot.rotation, slot.x + 340, slot.y + 90, [
          rect(slot.x, slot.y, 680, 180, theme.surface, {
            name: 'Result card',
            cornerRadius: 16,
            ...shadow(30, 14, 'rgba(0,0,0,0.3)'),
          }),
          circle(slot.x + 90, slot.y + 90, 50, theme.deep, { name: 'Result icon' }),
          icon('arrow-up-right', slot.x + 64, slot.y + 64, 52, theme.surface, { strokeWidth: 2.6 }),
          text(copy.items[index] ?? '', slot.x + 170, slot.y + 42, 480, {
            ...copyText(theme, 36, theme.ink, 500),
            lineHeight: 1.25,
          }),
        ]),
      ),
      star(5, 880, 1080, 150, theme.star, { innerRatio: 0.48, name: 'Star' }),
    ];
  });

interface StatSet {
  useCases: Template;
  leaders: Template;
  profit: Template;
  bars: Template;
  results: Template;
  story: Template;
}

export const statTemplates = (theme: PostTheme, copy: StatsCopy): StatSet => ({
  useCases: useCases(theme, copy.useCases),
  leaders: leaders(theme, copy.leaders),
  profit: profit(theme, copy.profit),
  bars: template(W, POST.height, () => barNodes(theme, copy.bars, POST.height)),
  results: results(theme, copy.results),
  story: template(W, STORY.height, () => barNodes(theme, copy.bars, STORY.height)),
});
