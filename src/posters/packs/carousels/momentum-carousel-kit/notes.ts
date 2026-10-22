import {
  avatar,
  checklist,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { textWidth } from './listing';

export interface NotesTheme {
  paper: string;
  ink: string;
  muted: string;
  accent: string;
  highlight: string;
  card: string;
  cardInk: string;
  font: string;
}

const { width: W, height: H } = POST_SIZE;

const toolbar = (theme: NotesTheme) =>
  (['list-checks', 'camera', 'pencil', 'file-text'] as const).map((name, index) =>
    icon(name, [80, 330, 720, 950][index] ?? 80, 1210, 54, theme.accent, { strokeWidth: 2 }),
  );

const notesFrame = (theme: NotesTheme, pageLabel: string, title: string): Nodes[] => [
  rect(0, 0, W, H, theme.paper, { name: 'Background' }),
  icon('arrow-left', 70, 92, 48, theme.accent, { strokeWidth: 2.5 }),
  text(pageLabel, 130, 94, 600, {
    fontFamily: theme.font,
    fontSize: 40,
    fontWeight: 500,
    fill: theme.accent,
  }),
  circle(976, 116, 34, 'rgba(0,0,0,0)', { stroke: theme.accent, strokeWidth: 4 }),
  [0, 1, 2].map((index) => circle(960 + index * 16, 116, 4, theme.accent)),
  text(title, 90, 270, 900, {
    fontFamily: theme.font,
    fontSize: 72,
    fontWeight: 800,
    fill: theme.ink,
    lineHeight: 1.15,
  }),
  toolbar(theme),
];

export const notesCover = (
  theme: NotesTheme,
  copy: {
    name: string;
    handle: string;
    photo: PosterPhotoName;
    title: string;
    hook: string;
    swipe: string;
    count: string;
  },
) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.paper, { name: 'Background' }),
    avatar(copy.photo, 135, 150, 52),
    text(copy.name, 210, 112, 600, {
      fontFamily: theme.font,
      fontSize: 38,
      fontWeight: 700,
      fill: theme.ink,
    }),
    icon('badge-check', 224 + textWidth(copy.name, 38), 114, 40, theme.accent, {
      strokeWidth: 2.25,
    }),
    text(copy.handle, 210, 160, 600, {
      fontFamily: theme.font,
      fontSize: 30,
      fontWeight: 400,
      fill: theme.muted,
    }),
    text(copy.title, 80, 460, 920, {
      fontFamily: theme.font,
      fontSize: 100,
      fontWeight: 800,
      fill: theme.ink,
      lineHeight: 1.12,
    }),
    rect(74, 732, textWidth(copy.hook, 40) + 24, 64, theme.highlight, {
      name: 'Highlight',
      cornerRadius: 6,
    }),
    text(copy.hook, 86, 740, 900, {
      fontFamily: theme.font,
      fontSize: 40,
      fontWeight: 500,
      fill: theme.ink,
    }),
    rect(80, 1060, 920, 116, theme.card, {
      name: 'Swipe card',
      cornerRadius: 22,
      ...shadow(24, 8, 'rgba(15,23,42,0.12)'),
    }),
    icon('folder', 116, 1088, 58, theme.accent, { strokeWidth: 2 }),
    text(copy.swipe, 200, 1094, 600, {
      fontFamily: theme.font,
      fontSize: 40,
      fontWeight: 500,
      fill: theme.cardInk,
    }),
    text(copy.count, 860, 1094, 60, {
      fontFamily: theme.font,
      fontSize: 40,
      fontWeight: 600,
      fill: theme.cardInk,
      align: 'right',
    }),
    icon('chevron-right', 926, 1094, 46, theme.cardInk, { strokeWidth: 2.5 }),
  ]);

export const notesChecklist = (
  theme: NotesTheme,
  copy: { page: string; title: string; items: readonly string[] },
) =>
  template(W, H, () => [
    notesFrame(theme, copy.page, copy.title),
    checklist(copy.items, 92, 520, 900, {
      color: theme.ink,
      iconColor: theme.accent,
      fontSize: 48,
      gap: 104,
      fontFamily: theme.font,
    }),
  ]);

export const notesSayTry = (
  theme: NotesTheme,
  copy: { page: string; title: string; pairs: readonly { label: string; quote: string }[] },
) =>
  template(W, H, () => [
    notesFrame(theme, copy.page, copy.title),
    copy.pairs.map((pair, index) => [
      text(pair.label, 90, 520 + index * 210, 900, {
        fontFamily: theme.font,
        fontSize: 50,
        fontWeight: 700,
        fill: theme.ink,
      }),
      text(pair.quote, 90, 590 + index * 210, 900, {
        fontFamily: theme.font,
        fontSize: 42,
        fontWeight: 400,
        fill: theme.muted,
      }),
    ]),
  ]);

export const notesRows = (
  theme: NotesTheme,
  copy: { page: string; title: string; rows: readonly { when: string; action: string }[] },
) =>
  template(W, H, () => [
    notesFrame(theme, copy.page, copy.title),
    copy.rows.map((row, index) => [
      text(row.when, 90, 530 + index * 120, 380, {
        fontFamily: theme.font,
        fontSize: 42,
        fontWeight: 700,
        fill: theme.ink,
      }),
      icon('chevrons-right', 420, 530 + index * 120, 50, theme.accent, { strokeWidth: 2.5 }),
      text(row.action, 500, 530 + index * 120, 500, {
        fontFamily: theme.font,
        fontSize: 42,
        fontWeight: 400,
        fill: theme.muted,
      }),
    ]),
  ]);

export const notesBody = (theme: NotesTheme, copy: { page: string; title: string; body: string }) =>
  template(W, H, () => [
    notesFrame(theme, copy.page, copy.title),
    text(copy.body, 90, 520, 900, {
      fontFamily: theme.font,
      fontSize: 42,
      fontWeight: 400,
      fill: theme.muted,
      lineHeight: 1.45,
    }),
  ]);
