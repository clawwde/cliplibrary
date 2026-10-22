import { type Fill, linear } from '@/design';
import {
  circle,
  fitBox,
  fitWidth,
  group,
  icon,
  type Nodes,
  offset,
  type PageSize,
  page,
  rect,
  rotateNodes,
  type SlideTheme,
  scaledHeight,
  shadow,
  type Template,
  text,
} from '../../../kit';

export type CarouselRow = readonly Template[];

const brandBadge = (theme: SlideTheme, cx: number, cy: number, radius: number) =>
  group(
    circle(cx, cy, radius, linear(135, theme.brand, theme.accent), {
      name: 'Editor badge',
      ...shadow(radius * 0.4, radius * 0.12, 'rgba(0,0,0,0.18)'),
    }),
    icon('wand-sparkles', cx - radius * 0.5, cy - radius * 0.5, radius, '#ffffff', {
      strokeWidth: 2,
    }),
  );

export const carouselCover =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { count: string; label: string; pages: string },
    rows: readonly CarouselRow[],
  ) =>
  () => {
    const gap = 12;
    const tileHeight = (size.height - gap * (rows.length + 1)) / rows.length;
    const tileWidth = tileHeight * 0.8;
    const left = size.width - 3.72 * (tileWidth + gap);
    return page(
      theme.background,
      rows.map((row, rowIndex) =>
        row
          .slice(0, 4)
          .map((item, column) =>
            fitBox(
              item,
              left + column * (tileWidth + gap),
              gap + rowIndex * (tileHeight + gap),
              tileWidth,
              tileHeight,
            ),
          ),
      ),
      brandBadge(theme, size.width * 0.09, size.height * 0.1, size.width * 0.045),
      text(copy.count, size.width * 0.05, size.height * 0.36, left - size.width * 0.08, {
        fontFamily: theme.headFont,
        fontSize: size.width * 0.085,
        fontWeight: 700,
        fill: theme.text,
        lineHeight: 1,
      }),
      text(copy.label, size.width * 0.05, size.height * 0.46, left - size.width * 0.06, {
        fontFamily: theme.bodyFont,
        fontSize: size.width * 0.044,
        fontWeight: 400,
        fill: theme.text,
        lineHeight: 1.3,
      }),
      text(copy.pages, size.width * 0.05, size.height * 0.87, left - size.width * 0.08, {
        fontFamily: theme.headFont,
        fontSize: size.width * 0.05,
        fontWeight: 700,
        fill: theme.text,
        lineHeight: 1,
      }),
    );
  };

export const carouselWall =
  (
    size: PageSize,
    theme: SlideTheme,
    rows: readonly CarouselRow[],
    options: { tileWidth?: number; angle?: number; shiftX?: number; shiftY?: number } = {},
  ) =>
  () => {
    const tileWidth = options.tileWidth ?? size.width * 0.26;
    const first = rows[0]?.[0];
    const tileHeight = first === undefined ? tileWidth * 1.25 : scaledHeight(first, tileWidth);
    const gap = tileWidth * 0.055;
    const columns = Math.max(...rows.map((row) => row.length));
    const gridWidth = columns * tileWidth + (columns - 1) * gap;
    const gridHeight = rows.length * tileHeight + (rows.length - 1) * gap;
    const x0 = (size.width - gridWidth) / 2 + (options.shiftX ?? 0);
    const y0 = (size.height - gridHeight) / 2 + (options.shiftY ?? 0);
    const tiles: Nodes[] = rows.map((row, rowIndex) =>
      row.map((item, column) => {
        const x = x0 + column * (tileWidth + gap);
        const y = y0 + rowIndex * (tileHeight + gap);
        return [
          rect(x, y, tileWidth, tileHeight, '#ffffff', {
            name: 'Tile shadow',
            ...shadow(tileWidth * 0.08, tileWidth * 0.03, 'rgba(0,0,0,0.22)'),
          }),
          fitBox(item, x, y, tileWidth, tileHeight),
        ];
      }),
    );
    return page(
      theme.background,
      rotateNodes(options.angle ?? 4, size.width / 2, size.height / 2, tiles),
    );
  };

const FEED_ACTIONS = [
  { name: 'thumbs-up', label: 'Like' },
  { name: 'message-square', label: 'Comment' },
  { name: 'repeat', label: 'Repost' },
  { name: 'send', label: 'Send' },
] as const;

const feedContent = (
  width: number,
  item: Template,
  copy: { handle: string; followers: string },
  avatarFill: Fill,
) => {
  const top = width * 0.16;
  const postTop = top + width * 0.2;
  const postHeight = scaledHeight(item, width);
  const actionsTop = postTop + postHeight + width * 0.05;
  return [
    circle(width * 0.1, top + width * 0.065, width * 0.055, avatarFill),
    text(copy.handle, width * 0.19, top, width * 0.6, {
      fontSize: width * 0.042,
      fontWeight: 700,
      fill: '#111827',
    }),
    text(copy.followers, width * 0.19, top + width * 0.055, width * 0.6, {
      fontSize: width * 0.03,
      fontWeight: 400,
      fill: '#6b7280',
    }),
    text('2h', width * 0.19, top + width * 0.095, width * 0.2, {
      fontSize: width * 0.03,
      fontWeight: 400,
      fill: '#6b7280',
    }),
    text('...', width * 0.84, top - width * 0.02, width * 0.12, {
      fontSize: width * 0.06,
      fontWeight: 700,
      fill: '#6b7280',
    }),
    fitWidth(item, 0, postTop, width),
    FEED_ACTIONS.map((action, index) => [
      icon(action.name, width * (0.06 + index * 0.235), actionsTop, width * 0.04, '#4b5563', {
        strokeWidth: 2.4,
      }),
      text(action.label, width * (0.11 + index * 0.235), actionsTop, width * 0.18, {
        fontSize: width * 0.03,
        fontWeight: 600,
        fill: index === 0 ? '#2563eb' : '#4b5563',
      }),
    ]),
    text(copy.handle, width * 0.06, actionsTop + width * 0.09, width * 0.6, {
      fontSize: width * 0.034,
      fontWeight: 600,
      fill: '#111827',
    }),
    rect(width * 0.06, actionsTop + width * 0.16, width * 0.86, width * 0.03, '#e5e7eb', {
      cornerRadius: 6,
      name: 'Caption line',
    }),
    rect(width * 0.06, actionsTop + width * 0.22, width * 0.62, width * 0.03, '#e5e7eb', {
      cornerRadius: 6,
      name: 'Caption line',
    }),
  ];
};

const feedPhone = (
  x: number,
  y: number,
  width: number,
  item: Template,
  copy: { handle: string; followers: string },
  avatarFill: Fill,
  hero: boolean,
) => {
  const height = width * 2.12;
  const inset = hero ? width * 0.04 : 0;
  const screenWidth = width - inset * 2;
  return group(
    rect(x, y, width, height, hero ? '#0b0b0f' : '#ffffff', {
      name: hero ? 'Phone body' : 'Flat phone',
      cornerRadius: width * 0.14,
      ...shadow(width * 0.16, width * 0.06, 'rgba(15,23,42,0.22)'),
    }),
    hero
      ? rect(x + inset, y + inset, screenWidth, height - inset * 2, '#ffffff', {
          name: 'Phone screen',
          cornerRadius: width * 0.11,
        })
      : [],
    rect(
      x + width * 0.35,
      y + inset + width * 0.035,
      width * 0.3,
      width * 0.075,
      hero ? '#0b0b0f' : '#e5e7eb',
      { name: 'Notch', cornerRadius: width * 0.04 },
    ),
    offset(x + inset, y + inset, feedContent(screenWidth, item, copy, avatarFill)),
  );
};

const carouselPhones =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { title: string; subtitle: string; handle: string; followers: string },
    slides: readonly [Template, Template, Template],
  ) =>
  () => {
    const side = size.width * 0.214;
    const hero = size.width * 0.226;
    const top = size.height * 0.27;
    const avatarFill = linear(135, theme.brand, theme.accent);
    const [left, middle, right] = slides;
    return page(
      theme.background,
      text(copy.title, size.width * 0.065, size.height * 0.07, size.width * 0.7, {
        fontFamily: theme.headFont,
        fontSize: size.width * 0.033,
        fontWeight: 700,
        fill: theme.text,
      }),
      text(copy.subtitle, size.width * 0.065, size.height * 0.125, size.width * 0.7, {
        fontFamily: theme.bodyFont,
        fontSize: size.width * 0.033,
        fontWeight: 300,
        fill: theme.muted,
      }),
      brandBadge(theme, size.width * 0.89, size.height * 0.135, size.width * 0.046),
      feedPhone(size.width * 0.145, top + size.height * 0.01, side, left, copy, avatarFill, false),
      feedPhone(size.width * 0.641, top + size.height * 0.01, side, right, copy, avatarFill, false),
      feedPhone(
        size.width * 0.387,
        top - size.height * 0.005,
        hero,
        middle,
        copy,
        avatarFill,
        true,
      ),
    );
  };

export const carouselRowPhones = (
  size: PageSize,
  theme: SlideTheme,
  copy: { title: string; subtitle: string; handle: string; followers: string },
  row: CarouselRow,
) => {
  const [first, second, third] = row;
  if (first === undefined || second === undefined || third === undefined) {
    throw new Error('A carousel row needs three slides');
  }
  return carouselPhones(size, theme, copy, [first, second, third]);
};
