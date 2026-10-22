import type { Fill } from '@/design';
import {
  circle,
  fitBox,
  fitWidth,
  group,
  icon,
  type Nodes,
  offset,
  page,
  rect,
  rotateNodes,
  scaledHeight,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { SQUARE } from '../../../pack';

export interface ListingStyle {
  background: Fill;
  text: string;
  muted: string;
  badge: Fill;
  avatar: Fill;
  handle: string;
  feed: 'business' | 'photo';
}

const { width: W, height: H } = SQUARE;

const NARROW = new Set([...'iljtfrI.,:;!| ']);
const WIDE = new Set([...'WMmw@']);

export const textWidth = (label: string, fontSize: number): number =>
  [...label].reduce((sum, char) => {
    if (NARROW.has(char)) {
      return sum + 0.32;
    }
    if (WIDE.has(char)) {
      return sum + 0.95;
    }
    return sum + (char === char.toUpperCase() && char !== char.toLowerCase() ? 0.72 : 0.6);
  }, 0) * fontSize;
const FONT = 'Figtree';
const GREY = '#e5e7eb';
const INK = '#111827';

export const badge = (style: ListingStyle, cx: number, cy: number, size: number) =>
  group(
    rect(cx - size / 2, cy - size / 2, size, size, style.badge, {
      name: 'Editor badge',
      cornerRadius: size * 0.28,
      ...shadow(size * 0.3, size * 0.1, 'rgba(15,23,42,0.18)'),
    }),
    icon('wand-sparkles', cx - size * 0.27, cy - size * 0.27, size * 0.54, '#ffffff', {
      strokeWidth: 2,
    }),
  );

const moreDots = (x: number, y: number, size: number) =>
  [0, 1, 2].map((index) => circle(x + index * size * 2.4, y, size, '#6b7280'));

const captionLines = (w: number, y: number) => [
  rect(w * 0.06, y, w * 0.86, w * 0.03, GREY, { name: 'Caption line', cornerRadius: w * 0.015 }),
  rect(w * 0.06, y + w * 0.055, w * 0.6, w * 0.03, GREY, {
    name: 'Caption line',
    cornerRadius: w * 0.015,
  }),
];

const businessFeed = (style: ListingStyle, w: number, post: Template): Nodes[] => {
  const top = w * 0.16;
  const postTop = top + w * 0.16;
  const below = postTop + scaledHeight(post, w) + w * 0.045;
  const actions = [
    { name: 'thumbs-up', label: 'Like' },
    { name: 'message-square', label: 'Comment' },
    { name: 'repeat', label: 'Repost' },
    { name: 'send', label: 'Send' },
  ] as const;
  return [
    circle(w * 0.11, top + w * 0.06, w * 0.055, style.avatar),
    icon('sparkles', w * 0.08, top + w * 0.03, w * 0.06, '#ffffff', { strokeWidth: 2.5 }),
    text(style.handle, w * 0.2, top + w * 0.005, w * 0.6, {
      fontFamily: FONT,
      fontSize: w * 0.045,
      fontWeight: 600,
      fill: INK,
    }),
    text('18,420 followers\n2h', w * 0.2, top + w * 0.058, w * 0.6, {
      fontFamily: FONT,
      fontSize: w * 0.03,
      fontWeight: 400,
      fill: '#6b7280',
      lineHeight: 1.25,
    }),
    moreDots(w * 0.84, top + w * 0.03, w * 0.012),
    fitWidth(post, 0, postTop, w),
    actions.map((action, index) => [
      icon(
        action.name,
        w * (0.05 + index * 0.235),
        below,
        w * 0.045,
        index === 0 ? '#2563eb' : INK,
        {
          strokeWidth: 2,
        },
      ),
      text(action.label, w * (0.105 + index * 0.235), below + w * 0.004, w * 0.2, {
        fontFamily: FONT,
        fontSize: w * 0.032,
        fontWeight: 500,
        fill: index === 0 ? '#2563eb' : INK,
      }),
    ]),
    text(style.handle, w * 0.06, below + w * 0.085, w * 0.6, {
      fontFamily: FONT,
      fontSize: w * 0.036,
      fontWeight: 600,
      fill: INK,
    }),
    captionLines(w, below + w * 0.15),
  ];
};

const photoFeed = (style: ListingStyle, w: number, post: Template): Nodes[] => {
  const top = w * 0.16;
  const postTop = top + w * 0.13;
  const below = postTop + scaledHeight(post, w) + w * 0.045;
  return [
    circle(w * 0.11, top + w * 0.05, w * 0.05, style.avatar),
    icon('sparkles', w * 0.083, top + w * 0.023, w * 0.054, '#ffffff', { strokeWidth: 2.5 }),
    text(style.handle, w * 0.2, top + w * 0.025, w * 0.6, {
      fontFamily: FONT,
      fontSize: w * 0.04,
      fontWeight: 600,
      fill: INK,
    }),
    moreDots(w * 0.84, top + w * 0.05, w * 0.012),
    fitWidth(post, 0, postTop, w),
    icon('heart', w * 0.06, below, w * 0.065, '#ef4444', { strokeWidth: 2.5 }),
    icon('message-circle', w * 0.17, below, w * 0.065, INK, { strokeWidth: 2 }),
    icon('send', w * 0.28, below, w * 0.065, INK, { strokeWidth: 2 }),
    icon('bookmark', w * 0.87, below, w * 0.065, INK, { strokeWidth: 2 }),
    text(style.handle, w * 0.06, below + w * 0.1, w * 0.6, {
      fontFamily: FONT,
      fontSize: w * 0.036,
      fontWeight: 600,
      fill: INK,
    }),
    captionLines(w, below + w * 0.165),
  ];
};

const feedPhone = (
  style: ListingStyle,
  x: number,
  y: number,
  w: number,
  post: Template,
  dark: boolean,
) => {
  const h = w * 1.98;
  const inset = dark ? w * 0.035 : 0;
  const screenWidth = w - inset * 2;
  const content =
    style.feed === 'business'
      ? businessFeed(style, screenWidth, post)
      : photoFeed(style, screenWidth, post);
  return group(
    rect(x, y, w, h, dark ? '#0b0b0f' : '#ffffff', {
      name: 'Phone body',
      cornerRadius: w * 0.14,
      ...shadow(dark ? w * 0.22 : w * 0.12, dark ? w * 0.1 : w * 0.04, 'rgba(15,23,42,0.22)'),
    }),
    dark
      ? rect(x + inset, y + inset, screenWidth, h - inset * 2, '#ffffff', {
          name: 'Phone screen',
          cornerRadius: w * 0.11,
        })
      : [],
    offset(x + inset, y + inset, content),
    rect(x + w * 0.33, y + w * 0.05, w * 0.34, w * 0.085, dark ? '#0b0b0f' : '#e5e7eb', {
      name: 'Dynamic island',
      cornerRadius: w * 0.045,
    }),
  );
};

export const carouselPage =
  (
    style: ListingStyle,
    title: string,
    subtitle: string,
    posts: readonly [Template, Template, Template],
  ) =>
  () =>
    page(
      style.background,
      text(title, 70, 92, 760, {
        fontFamily: FONT,
        fontSize: 46,
        fontWeight: 700,
        fill: style.text,
      }),
      text(subtitle, 70, 152, 760, {
        fontFamily: FONT,
        fontSize: 36,
        fontWeight: 400,
        fill: style.muted,
      }),
      badge(style, 960, 145, 100),
      feedPhone(style, 126, 300, 248, posts[0], false),
      feedPhone(style, 706, 300, 248, posts[2], false),
      feedPhone(style, 411, 290, 258, posts[1], true),
    );

const tile = (item: Template, x: number, y: number, w: number, h: number) => [
  rect(x, y, w, h, '#ffffff', { name: 'Tile', ...shadow(14, 6, 'rgba(15,23,42,0.18)') }),
  fitBox(item, x, y, w, h),
];

export const carouselCover =
  (
    style: ListingStyle,
    copy: { count: string; lines: string; pages: string },
    rows: readonly (readonly Template[])[],
  ) =>
  () =>
    page(
      style.background,
      rows.map((row, rowIndex) =>
        row.map((item, column) => tile(item, 416 + column * 176, 6 + rowIndex * 216, 166, 207.5)),
      ),
      badge(style, 108, 98, 96),
      text(copy.count, 68, 350, 330, {
        fontFamily: FONT,
        fontSize: 84,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.lines, 68, 450, 340, {
        fontFamily: FONT,
        fontSize: 50,
        fontWeight: 400,
        fill: style.text,
        lineHeight: 1.3,
      }),
      text(copy.pages, 68, 960, 120, {
        fontFamily: FONT,
        fontSize: 60,
        fontWeight: 800,
        fill: style.text,
      }),
      text('Pages', 160, 980, 200, {
        fontFamily: FONT,
        fontSize: 34,
        fontWeight: 400,
        fill: style.text,
      }),
    );

export const tiltedCover =
  (style: ListingStyle, rows: readonly (readonly Template[])[], tilt = 5) =>
  () => {
    const tileWidth = 296;
    const tileHeight = 370;
    const gap = 24;
    const nodes = rows.map((row, rowIndex) =>
      row.map((item, column) =>
        tile(
          item,
          -170 + column * (tileWidth + gap) + rowIndex * 50,
          -51 + rowIndex * (tileHeight + gap),
          tileWidth,
          tileHeight,
        ),
      ),
    );
    return page(style.background, rotateNodes(tilt, W / 2, H / 2, nodes));
  };
