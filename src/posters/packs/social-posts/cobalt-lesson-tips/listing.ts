import { type Fill, linear } from '@/design';
import {
  card,
  circle,
  fitWidth,
  group,
  icon,
  line,
  mosaic,
  page,
  phone,
  phoneScreen,
  pill,
  rect,
  scaledHeight,
  shadow,
  star,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';

export interface ListingStyle {
  background: Fill;
  text: string;
  muted: string;
  ink: string;
  brand: string;
  brandText: string;
  strip: string;
  folderFrom: string;
  folderTo: string;
  head: string;
  body: string;
}

export const { width: W, height: H } = LANDSCAPE;

export const glow = shadow(34, 0, 'rgba(255,255,255,0.55)');

const editorBadge = (x: number, y: number, size: number, from: string, to: string) =>
  group(
    rect(x, y, size, size, linear(135, from, to), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.2, size * 0.08),
    }),
    icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, '#ffffff'),
  );

export const coverPage =
  (
    style: ListingStyle,
    copy: { title: string; lead: string; accent: string; bonus: string },
    tiles: readonly Template[],
    hero: Template,
  ) =>
  () =>
    page(
      style.background,
      mosaic(LANDSCAPE, tiles, { columns: 5, gap: 24, offsetY: -60 }),
      card(330, 320, 940, 560, { radius: 44, shadowBlur: 60 }),
      text('Ready-to-Use', 390, 368, 640, {
        fontFamily: style.head,
        fontSize: 80,
        fontWeight: 800,
        fill: style.ink,
      }),
      text(copy.title, 390, 462, 640, {
        fontFamily: style.head,
        fontSize: 80,
        fontWeight: 800,
        fill: style.brand,
      }),
      text(copy.lead, 390, 578, 640, {
        fontFamily: style.body,
        fontSize: 36,
        fontWeight: 700,
        fill: style.ink,
      }),
      text(copy.accent, 390, 628, 640, {
        fontFamily: style.body,
        fontSize: 32,
        fontWeight: 500,
        fill: '#374151',
      }),
      pill(copy.bonus, 390, 712, {
        fill: style.ink,
        color: '#ffffff',
        fontSize: 25,
        fontFamily: style.body,
        fontWeight: 700,
      }),
      fitWidth(hero, 1050, 360, 180),
      editorBadge(1150, 560, 104, style.folderFrom, style.brand),
      icon('gift', 1110, 700, 92, style.brand, { strokeWidth: 1.8 }),
    );

export const showcasePage =
  (
    style: ListingStyle,
    copy: { title: string; subtitle: string; outline?: string },
    tiles: readonly [Template, Template, Template, Template, Template],
  ) =>
  () => {
    const [first, second, third, fourth, fifth] = tiles;
    return page(
      style.background,
      text(copy.title, 0, 70, W, {
        fontFamily: style.head,
        fontSize: 76,
        fontWeight: 800,
        fill: style.text,
        align: 'center',
        ...glow,
      }),
      text(copy.subtitle, 0, 178, W, {
        fontFamily: style.body,
        fontSize: 28,
        fontWeight: 500,
        fill: style.muted,
        align: 'center',
      }),
      fitWidth(first, 487, 260, 292),
      fitWidth(second, 821, 260, 292),
      fitWidth(third, 320, 680, 292),
      fitWidth(fourth, 654, 680, 292),
      fitWidth(fifth, 988, 680, 292),
      star(5, 440, 236, 52, style.brand, { innerRatio: 0.45 }),
      star(5, 1130, 610, 44, style.text, { innerRatio: 0.45 }),
      copy.outline === undefined
        ? []
        : text(copy.outline, 1060, 1120, 620, {
            fontFamily: style.head,
            fontSize: 120,
            fontWeight: 800,
            fill: 'rgba(0,0,0,0)',
            stroke: style.text,
            strokeWidth: 3,
            rotation: -22,
            ...glow,
          }),
    );
  };

const postPhone = (x: number, y: number, width: number, item: Template, style: ListingStyle) => {
  const screen = phoneScreen(width);
  const top = screen.height * 0.13;
  const bottom = top + scaledHeight(item, screen.width);
  return phone(x, y, width, {
    screen: '#ffffff',
    content: [
      circle(screen.width * 0.1, top * 0.62, screen.width * 0.045, style.brand),
      rect(screen.width * 0.2, top * 0.5, screen.width * 0.4, screen.width * 0.035, '#d1d5db', {
        cornerRadius: 6,
        name: 'Handle line',
      }),
      fitWidth(item, 0, top, screen.width),
      (['heart', 'message-circle', 'send'] as const).map((name, index) =>
        icon(
          name,
          screen.width * (0.06 + index * 0.12),
          bottom + screen.width * 0.04,
          screen.width * 0.08,
          '#111827',
        ),
      ),
      rect(
        screen.width * 0.06,
        bottom + screen.width * 0.17,
        screen.width * 0.6,
        screen.width * 0.03,
        '#e5e7eb',
        { cornerRadius: 6, name: 'Caption line' },
      ),
    ],
  });
};

const storyPhone = (x: number, y: number, width: number, item: Template, style: ListingStyle) => {
  const screen = phoneScreen(width);
  const itemHeight = scaledHeight(item, screen.width * 0.9);
  return phone(x, y, width, {
    screen: style.ink,
    content: [
      [0, 1, 2].map((index) =>
        rect(
          screen.width * (0.06 + index * 0.3),
          screen.height * 0.07,
          screen.width * 0.27,
          screen.width * 0.015,
          index === 0 ? '#ffffff' : 'rgba(255,255,255,0.35)',
          { cornerRadius: 4, name: 'Story progress' },
        ),
      ),
      circle(screen.width * 0.11, screen.height * 0.11, screen.width * 0.045, style.brand),
      fitWidth(item, screen.width * 0.05, (screen.height - itemHeight) / 2, screen.width * 0.9),
      rect(
        screen.width * 0.06,
        screen.height * 0.9,
        screen.width * 0.7,
        screen.width * 0.1,
        'rgba(0,0,0,0)',
        { cornerRadius: 30, stroke: 'rgba(255,255,255,0.6)', strokeWidth: 2, name: 'Reply box' },
      ),
      icon('heart', screen.width * 0.8, screen.height * 0.9, screen.width * 0.1, '#ffffff'),
    ],
  });
};

const countBlock = (
  x: number,
  y: number,
  count: string,
  label: string,
  size: string,
  style: ListingStyle,
) => [
  text(count, x, y, 300, {
    fontFamily: style.head,
    fontSize: 120,
    fontWeight: 800,
    fill: style.ink,
  }),
  text(label, x, y + 150, 340, {
    fontFamily: style.body,
    fontSize: 32,
    fontWeight: 500,
    fill: '#374151',
  }),
  line(x, y + 212, 290, '#111827', 4, { dashed: true }),
  text(size, x, y + 238, 340, {
    fontFamily: style.body,
    fontSize: 28,
    fontWeight: 500,
    fill: '#6b7280',
  }),
];

export const deliverablesPage =
  (style: ListingStyle, copy: { count: string }, post: Template, story: Template) => () =>
    page(
      style.background,
      text('Ready-to-post content.', 120, 70, 1360, {
        fontFamily: style.head,
        fontSize: 88,
        fontWeight: 800,
        fill: style.text,
      }),
      card(120, 230, 1360, 880, { radius: 40 }),
      text('Perfect for:', 200, 302, 320, {
        fontFamily: style.head,
        fontSize: 42,
        fontWeight: 700,
        fill: style.ink,
      }),
      (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
        circle(520 + index * 110, 330, 40, style.brand),
        icon(name, 498 + index * 110, 308, 44, style.brandText),
      ]),
      text('What you get:', 200, 420, 400, {
        fontFamily: style.head,
        fontSize: 42,
        fontWeight: 700,
        fill: style.ink,
      }),
      postPhone(200, 520, 230, post, style),
      countBlock(480, 600, copy.count, 'Social media posts', '1080 × 1350 px', style),
      storyPhone(860, 520, 230, story, style),
      countBlock(1130, 600, copy.count, 'Social media stories', '1080 × 1920 px', style),
    );
