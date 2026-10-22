import { linear } from '@/design';
import {
  card,
  circle,
  fitBox,
  fitWidth,
  group,
  icon,
  mosaic,
  type Nodes,
  page,
  phone,
  phoneScreen,
  pill,
  poly,
  postInPhone,
  rect,
  type SlideTheme,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import type { ListingCopy, ListingTheme } from './theme';

const { width: W, height: H } = LANDSCAPE;

export const glow = (color = 'rgba(255,255,255,0.75)') => shadow(28, 0, color);

export const wandTile = (theme: ListingTheme, x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, theme.highlight, theme.brandDeep), {
      name: 'Editor badge',
      cornerRadius: size * 0.24,
      ...shadow(24, 10, 'rgba(0,0,0,0.3)'),
    }),
    icon('wand-sparkles', x + size * 0.24, y + size * 0.24, size * 0.52, '#ffffff'),
  );

export const channelIcons = (theme: ListingTheme, x: number, y: number, size: number) =>
  (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
    rect(x + index * size * 1.45, y, size, size, linear(135, theme.highlight, theme.brandDeep), {
      name: 'Channel badge',
      cornerRadius: size * 0.28,
    }),
    icon(name, x + index * size * 1.45 + size * 0.2, y + size * 0.2, size * 0.6, '#ffffff'),
  ]);

const arrowBadge = (theme: ListingTheme, cx: number, cy: number) =>
  group(
    circle(cx, cy, 58, '#ffffff', { name: 'Arrow badge', ...shadow(20, 6, 'rgba(0,0,0,0.3)') }),
    poly(
      [
        [cx - 28, cy - 11],
        [cx + 2, cy - 11],
        [cx + 2, cy - 28],
        [cx + 30, cy],
        [cx + 2, cy + 28],
        [cx + 2, cy + 11],
        [cx - 28, cy + 11],
      ],
      linear(90, theme.highlight, theme.accent),
      { name: 'Arrow' },
    ),
  );

const splitTitle = (
  theme: ListingTheme,
  parts: readonly [string, string],
  y: number,
  size: number,
) => {
  const gap = size * 0.3;
  const total = (parts[0].length + parts[1].length) * size * 0.52 + gap;
  const boundary = (W - total) / 2 + parts[0].length * size * 0.55;
  const style = { fontFamily: theme.headFont, fontSize: size, fontWeight: 800 };
  return [
    text(parts[0], boundary - 700, y, 700, {
      ...style,
      fill: '#ffffff',
      align: 'right',
      ...glow(),
    }),
    text(parts[1], boundary + gap, y, W - boundary - gap, { ...style, fill: theme.text }),
  ];
};

export const dashes = (x: number, y: number, length: number, color: string) =>
  Array.from({ length: Math.floor(length / 26) }, (_, index) =>
    rect(x + index * 26, y, 16, 4, color, { name: 'Dash' }),
  );

export const coverPage =
  (theme: ListingTheme, copy: ListingCopy, posts: readonly Template[], featured: Template) => () =>
    page(
      theme.page,
      mosaic(LANDSCAPE, posts, { columns: 5, gap: 14 }),
      rect(0, 0, W, H, 'rgba(0,0,0,0.1)', { name: 'Dim' }),
      card(350, 330, 900, 500, { radius: 36, shadowBlur: 70 }),
      text(copy.kicker, 400, 372, 620, {
        fontFamily: theme.headFont,
        fontSize: 80,
        fontWeight: 800,
        fill: theme.ink,
        lineHeight: 1.1,
      }),
      text(copy.title, 400, 466, 640, {
        fontFamily: theme.headFont,
        fontSize: 80,
        fontWeight: 800,
        fill: theme.highlight,
        lineHeight: 1.1,
      }),
      text(copy.line, 400, 574, 620, {
        fontFamily: theme.headFont,
        fontSize: 38,
        fontWeight: 700,
        fill: theme.ink,
      }),
      text(copy.count, 400, 628, 620, {
        fontFamily: theme.bodyFont,
        fontSize: 32,
        fontWeight: 500,
        fill: '#4b5563',
      }),
      pill(copy.bonus, 400, 704, {
        fill: theme.ink,
        color: '#ffffff',
        fontSize: 23,
        fontFamily: theme.bodyFont,
        fontWeight: 700,
        letterSpacing: 0.5,
      }),
      icon('gift', 1050, 690, 96, theme.highlight, { strokeWidth: 1.8 }),
      rect(1032, 360, 190, 238, '#ffffff', { name: 'Featured frame', cornerRadius: 10 }),
      fitBox(featured, 1036, 364, 182, 230),
      wandTile(theme, 1130, 540, 120),
    );

export const showcasePage =
  (
    theme: ListingTheme,
    copy: ListingCopy,
    top: readonly [Template, Template],
    bottom: readonly [Template, Template, Template],
  ) =>
  () =>
    page(
      theme.page,
      splitTitle(theme, copy.showcase, 70, 84),
      text(copy.showcaseNote, 0, 192, W, {
        fontFamily: theme.bodyFont,
        fontSize: 30,
        fontWeight: 500,
        fill: theme.muted,
        align: 'center',
      }),
      top.map((item, index) => fitWidth(item, 470 + index * 360, 262, 300)),
      bottom.map((item, index) => fitWidth(item, 290 + index * 360, 672, 300)),
    );

const deliverable = (
  theme: ListingTheme,
  x: number,
  count: string,
  label: string,
  size: string,
): Nodes[] => [
  text(count, x, 730, 200, {
    fontFamily: theme.headFont,
    fontSize: 120,
    fontWeight: 900,
    fill: theme.ink,
    lineHeight: 1,
  }),
  text(label, x, 870, 380, {
    fontFamily: theme.bodyFont,
    fontSize: 34,
    fontWeight: 500,
    fill: '#1f2937',
  }),
  dashes(x, 932, 370, '#111827'),
  text(size, x, 958, 380, {
    fontFamily: theme.bodyFont,
    fontSize: 32,
    fontWeight: 500,
    fill: '#1f2937',
  }),
];

export const deliverablesPage =
  (theme: ListingTheme, copy: ListingCopy, post: Template, story: Template) => () => {
    const slide: SlideTheme = {
      background: theme.page,
      text: theme.text,
      muted: theme.muted,
      surface: '#ffffff',
      ink: theme.ink,
      brand: theme.highlight,
      accent: theme.accent,
      headFont: theme.headFont,
      bodyFont: theme.bodyFont,
    };
    const storyScreen = phoneScreen(220);
    return page(
      theme.page,
      text('Ready-to-post content.', 120, 70, 1400, {
        fontFamily: theme.headFont,
        fontSize: 96,
        fontWeight: 800,
        fill: theme.text,
      }),
      card(120, 270, 1360, 830, { radius: 28, shadowBlur: 0 }),
      text('Perfect for:', 190, 336, 320, {
        fontFamily: theme.headFont,
        fontSize: 42,
        fontWeight: 800,
        fill: theme.ink,
      }),
      channelIcons(theme, 470, 326, 70),
      text('What You Get:', 190, 470, 500, {
        fontFamily: theme.headFont,
        fontSize: 42,
        fontWeight: 800,
        fill: theme.ink,
      }),
      postInPhone(200, 570, 220, post, slide, copy.handle),
      deliverable(theme, 460, '5', 'Social media posts', '1080 × 1350 px'),
      phone(860, 570, 220, {
        screen: '#000000',
        content: [fitBox(story, 0, 0, storyScreen.width, storyScreen.height)],
      }),
      deliverable(theme, 1120, '1', 'Social media story', '1080 × 1920 px'),
    );
  };

export const editablePage =
  (theme: ListingTheme, copy: ListingCopy, rows: readonly (readonly [Template, Template])[]) =>
  () =>
    page(
      theme.page,
      text(copy.editable, 80, 120, 520, {
        fontFamily: theme.headFont,
        fontSize: 80,
        fontWeight: 800,
        fill: theme.text,
        lineHeight: 1.15,
      }),
      dashes(80, 680, 480, theme.text),
      text('Customize in\nMinutes', 80, 740, 520, {
        fontFamily: theme.bodyFont,
        fontSize: 56,
        fontWeight: 500,
        fill: theme.text,
        lineHeight: 1.3,
      }),
      text('100% Editable', 80, 900, 520, {
        fontFamily: theme.bodyFont,
        fontSize: 50,
        fontWeight: 600,
        fill: theme.accent,
      }),
      rows.map(([before, after], index) => {
        const y = 110 + index * 540;
        return [
          fitWidth(before, 620, y, 340),
          arrowBadge(theme, 1050, y + 212),
          fitWidth(after, 1140, y, 340),
        ];
      }),
    );
