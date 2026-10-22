import { type DesignIconName, type Fill, linear } from '@/design';
import {
  circle,
  cycle,
  fitWidth,
  group,
  icon,
  type Nodes,
  offset,
  page,
  path,
  phone,
  phoneScreen,
  rect,
  rotateNodes,
  shadow,
  type Template,
  text,
} from '../../../kit';

export interface ShowcaseStyle {
  background: string;
  ink: string;
  muted: string;
  brand: string;
  accent: string;
  font: string;
}

const PAGE = 1080;

const ACTIONS: readonly (readonly [DesignIconName, string])[] = [
  ['thumbs-up', 'Like'],
  ['message-circle', 'Comment'],
  ['repeat', 'Repost'],
  ['send', 'Send'],
];

export const trail = (
  data: string,
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  strokeWidth: number,
  dashed = false,
) =>
  path(
    data,
    x,
    y,
    width,
    height,
    'rgba(0,0,0,0)',
    { width, height },
    {
      stroke,
      strokeWidth,
      dashed,
      name: 'Line',
    },
  );

const feedPost = (
  width: number,
  slide: Template,
  handle: string,
  style: ShowcaseStyle,
): Nodes[] => {
  const unit = width / 100;
  const top = unit * 18;
  const slideTop = top + unit * 15;
  const actions = slideTop + (width * slide.height) / slide.width + unit * 4;
  const label = { fontFamily: style.font, fontWeight: 500, fill: '#4b5563' };
  return [
    circle(unit * 9, top + unit * 5, unit * 5, linear(135, style.brand, style.accent)),
    text(handle, unit * 17, top, unit * 60, {
      fontFamily: style.font,
      fontSize: unit * 4.4,
      fontWeight: 700,
      fill: '#111827',
    }),
    text('12,480 followers · 2h', unit * 17, top + unit * 6, unit * 70, {
      ...label,
      fontSize: unit * 3.2,
      fontWeight: 400,
      fill: '#6b7280',
    }),
    [0, 1, 2].map((index) =>
      circle(unit * (86 + index * 3.4), top + unit * 3, unit * 0.9, '#6b7280'),
    ),
    fitWidth(slide, 0, slideTop, width),
    ACTIONS.map(([name, caption], index) => [
      icon(name, unit * (4 + index * 24), actions, unit * 4.2, index === 0 ? '#2563eb' : '#4b5563'),
      text(caption, unit * (9.5 + index * 24), actions + unit * 0.5, unit * 15, {
        ...label,
        fontSize: unit * 3.2,
        fill: index === 0 ? '#2563eb' : '#4b5563',
      }),
    ]),
    text(handle, unit * 4, actions + unit * 9, unit * 60, {
      fontFamily: style.font,
      fontSize: unit * 3.6,
      fontWeight: 700,
      fill: '#111827',
    }),
    rect(unit * 4, actions + unit * 15, unit * 90, unit * 2.6, '#e5e7eb', {
      cornerRadius: unit * 1.3,
      name: 'Caption line',
    }),
    rect(unit * 4, actions + unit * 20, unit * 62, unit * 2.6, '#e5e7eb', {
      cornerRadius: unit * 1.3,
      name: 'Caption line',
    }),
  ];
};

const screenCard = (
  x: number,
  y: number,
  width: number,
  height: number,
  slide: Template,
  handle: string,
  style: ShowcaseStyle,
) =>
  group(
    rect(x, y, width, height, '#ffffff', {
      cornerRadius: width * 0.13,
      name: 'Phone screen',
      ...shadow(30, 12, 'rgba(15,23,42,0.12)'),
    }),
    offset(x, y, feedPost(width, slide, handle, style)),
    rect(x + width * 0.33, y + width * 0.05, width * 0.34, width * 0.08, '#e5e7eb', {
      cornerRadius: width * 0.04,
      name: 'Island',
    }),
  );

export const editorBadge = (x: number, y: number, size: number, from: string, to: string) =>
  group(
    rect(x, y, size, size, linear(135, from, to), {
      cornerRadius: size * 0.28,
      name: 'Editor badge',
      ...shadow(size * 0.2, size * 0.08, 'rgba(15,23,42,0.2)'),
    }),
    icon('wand-sparkles', x + size * 0.24, y + size * 0.24, size * 0.52, '#ffffff'),
  );

export const carouselShowcase =
  (
    style: ShowcaseStyle,
    copy: { title: string; subtitle: string; handle: string },
    slides: readonly [Template, Template, Template],
  ) =>
  () => {
    const [left, center, right] = slides;
    const phoneWidth = 250;
    const phoneX = (PAGE - phoneWidth) / 2;
    const phoneY = 292;
    const screen = phoneScreen(phoneWidth);
    const inset = phoneWidth * 0.045;
    const cardWidth = screen.width + 8;
    const cardY = phoneY + inset;
    return page(
      style.background,
      text(copy.title, 70, 96, 760, {
        fontFamily: style.font,
        fontSize: 46,
        fontWeight: 700,
        fill: style.ink,
      }),
      text(copy.subtitle, 70, 160, 760, {
        fontFamily: style.font,
        fontSize: 40,
        fontWeight: 400,
        fill: style.muted,
      }),
      editorBadge(900, 92, 112, style.brand, style.accent),
      screenCard(
        phoneX - 40 - cardWidth,
        cardY,
        cardWidth,
        screen.height,
        left,
        copy.handle,
        style,
      ),
      phone(phoneX, phoneY, phoneWidth, {
        screen: '#ffffff',
        content: feedPost(screen.width, center, copy.handle, style),
      }),
      screenCard(
        phoneX + phoneWidth + 40,
        cardY,
        cardWidth,
        screen.height,
        right,
        copy.handle,
        style,
      ),
    );
  };

export const tiltedRows =
  (background: Fill, rows: readonly (readonly Template[])[], starts: readonly number[]) => () => {
    const tile = 246;
    const step = tile + 18;
    return page(
      background,
      rotateNodes(
        5,
        PAGE / 2,
        PAGE / 2,
        rows.map((row, rowIndex) =>
          Array.from({ length: 6 }, (_, index) =>
            fitWidth(
              cycle(row, index),
              cycle(starts, rowIndex) + index * step,
              -20 + rowIndex * 355,
              tile,
            ),
          ),
        ),
      ),
    );
  };

export const pickSlides = (
  series: readonly Template[],
  indexes: readonly [number, number, number],
): readonly [Template, Template, Template] => [
  cycle(series, indexes[0]),
  cycle(series, indexes[1]),
  cycle(series, indexes[2]),
];
