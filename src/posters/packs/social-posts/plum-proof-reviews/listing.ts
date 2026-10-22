import { type Fill, linear } from '@/design';
import {
  arrow,
  card,
  circle,
  fitBox,
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
  highlight: string;
  strip: string;
  folderFrom: string;
  folderTo: string;
  badgeFrom: string;
  badgeTo: string;
  head: string;
  body: string;
}

export const { width: W, height: H } = LANDSCAPE;

export const glow = shadow(30, 0, 'rgba(255,255,255,0.6)');

const glyphWidth = (glyph: string): number => {
  if (glyph === ' ') {
    return 0.27;
  }
  if (glyph === '&') {
    return 0.7;
  }
  return glyph === glyph.toUpperCase() && glyph !== glyph.toLowerCase() ? 0.66 : 0.53;
};

const measure = (label: string, size: number) =>
  [...label].reduce((total, glyph) => total + glyphWidth(glyph) * size, 0);

export const editorBadge = (style: ListingStyle, x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, style.badgeFrom, style.badgeTo), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.2, size * 0.08),
    }),
    icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, '#ffffff'),
  );

const giftBox = (x: number, y: number, size: number, style: ListingStyle) =>
  group(
    rect(x, y + size * 0.3, size, size * 0.7, style.brand, { cornerRadius: size * 0.08 }),
    rect(x - size * 0.06, y + size * 0.16, size * 1.12, size * 0.22, style.brand, {
      cornerRadius: size * 0.06,
    }),
    rect(x + size * 0.42, y + size * 0.16, size * 0.16, size * 0.84, style.highlight),
    icon('gift', x + size * 0.18, y - size * 0.2, size * 0.64, style.highlight, {
      strokeWidth: 2.4,
    }),
  );

export const coverPage =
  (
    style: ListingStyle,
    copy: { title: string; lead: string; accent: string; count: string; bonus: string },
    tiles: readonly Template[],
    hero: Template,
  ) =>
  () =>
    page(
      style.background,
      mosaic(LANDSCAPE, tiles, { columns: 5, gap: 24, offsetY: -70 }),
      rect(0, 0, W, H, 'rgba(0,0,0,0.25)', { name: 'Dim' }),
      card(330, 330, 940, 540, { radius: 44, shadowBlur: 60 }),
      text('Ready-to-Use', 390, 376, 620, {
        fontFamily: style.head,
        fontSize: 78,
        fontWeight: 800,
        fill: style.ink,
      }),
      text(copy.title, 390, 468, 640, {
        fontFamily: style.head,
        fontSize: 78,
        fontWeight: 800,
        fill: style.brand,
      }),
      text(copy.lead, 390, 586, 620, {
        fontFamily: style.body,
        fontSize: 36,
        fontWeight: 700,
        fill: style.ink,
      }),
      text(copy.accent, 390 + measure(copy.lead, 36) + 14, 586, 320, {
        fontFamily: style.body,
        fontSize: 36,
        fontWeight: 700,
        fill: style.brand,
      }),
      text(copy.count, 390, 640, 640, {
        fontFamily: style.body,
        fontSize: 32,
        fontWeight: 500,
        fill: '#374151',
      }),
      pill(copy.bonus, 390, 716, {
        fill: style.ink,
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 700,
        width: 640,
        letterSpacing: 1,
      }),
      group(
        rect(1060, 370, 168, 210, '#0b0b0f', { cornerRadius: 18, name: 'Hero frame' }),
        fitBox(hero, 1064, 374, 160, 202),
      ),
      editorBadge(style, 1170, 560, 130),
      giftBox(1060, 712, 74, style),
    );

export const showcasePage =
  (
    style: ListingStyle,
    copy: { glowWord: string; title: string; subtitle: string },
    tiles: readonly [Template, Template, Template, Template, Template],
  ) =>
  () => {
    const glowWidth = measure(copy.glowWord, 76);
    const titleWidth = measure(copy.title, 76);
    const start = (W - glowWidth - titleWidth - 24) / 2;
    const [a, b, c, d, e] = tiles;
    return page(
      style.background,
      text(copy.glowWord, start, 70, glowWidth + 40, {
        fontFamily: style.head,
        fontSize: 76,
        fontWeight: 800,
        fill: '#ffffff',
        ...glow,
      }),
      text(copy.title, start + glowWidth + 24, 70, titleWidth + 60, {
        fontFamily: style.head,
        fontSize: 76,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.subtitle, 0, 180, W, {
        fontFamily: style.body,
        fontSize: 28,
        fontWeight: 500,
        fill: style.muted,
        align: 'center',
      }),
      fitWidth(a, 470, 270, 300),
      fitWidth(b, 830, 270, 300),
      fitWidth(c, 290, 690, 300),
      fitWidth(d, 650, 690, 300),
      fitWidth(e, 1010, 690, 300),
      star(5, 430, 240, 70, '#ffffff', { innerRatio: 0.42 }),
      star(5, 1100, 610, 60, style.highlight, { innerRatio: 0.42 }),
      star(5, 260, 1050, 54, '#ffffff', { innerRatio: 0.42 }),
    );
  };

const miniPhone = (x: number, y: number, item: Template, story: boolean) => {
  const screen = phoneScreen(170);
  return phone(x, y, 170, {
    screen: '#ffffff',
    content: story
      ? [fitBox(item, 0, 0, screen.width, screen.height)]
      : [
          circle(16, 22, 8, '#d1d5db'),
          rect(30, 18, 60, 8, '#e5e7eb', { cornerRadius: 4 }),
          fitWidth(item, 0, screen.height * 0.12, screen.width),
          rect(8, screen.height * 0.12 + scaledHeight(item, screen.width) + 12, 90, 7, '#e5e7eb', {
            cornerRadius: 4,
          }),
        ],
  });
};

export const deliverablesPage =
  (
    style: ListingStyle,
    copy: { title: string; posts: string; stories: string; storyLabel: string },
    post: Template,
    story: Template,
  ) =>
  () =>
    page(
      style.background,
      text(copy.title, 120, 70, 1300, {
        fontFamily: style.head,
        fontSize: 84,
        fontWeight: 800,
        fill: style.text,
      }),
      card(120, 220, 1360, 780, { radius: 36 }),
      text('Perfect for:', 200, 290, 400, {
        fontFamily: style.body,
        fontSize: 40,
        fontWeight: 700,
        fill: style.ink,
      }),
      (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
        circle(500 + index * 110, 314, 40, style.brand),
        icon(name, 478 + index * 110, 292, 44, style.brandText),
      ]),
      text('What you get:', 200, 420, 600, {
        fontFamily: style.body,
        fontSize: 40,
        fontWeight: 700,
        fill: style.ink,
      }),
      [
        {
          x: 200,
          item: post,
          count: copy.posts,
          label: 'Social media posts',
          size: '1080 × 1350 px',
        },
        {
          x: 840,
          item: story,
          count: copy.stories,
          label: copy.storyLabel,
          size: '1080 × 1920 px',
        },
      ].map((entry, index) => [
        miniPhone(entry.x, 510, entry.item, index === 1),
        text(entry.count, entry.x + 220, 640, 200, {
          fontFamily: style.head,
          fontSize: 110,
          fontWeight: 800,
          fill: style.ink,
        }),
        text(entry.label, entry.x + 220, 780, 360, {
          fontFamily: style.body,
          fontSize: 32,
          fontWeight: 500,
          fill: '#374151',
        }),
        line(entry.x + 220, 842, 340, '#111827', 4, { dashed: true }),
        text(entry.size, entry.x + 220, 870, 360, {
          fontFamily: style.body,
          fontSize: 28,
          fontWeight: 500,
          fill: '#6b7280',
        }),
      ]),
    );

export const editablePage =
  (
    style: ListingStyle,
    rows: readonly [readonly [Template, Template], readonly [Template, Template]],
  ) =>
  () =>
    page(
      style.background,
      text('Editable\nsocial post\ntemplates in\nyour browser', 90, 120, 560, {
        fontFamily: style.head,
        fontSize: 74,
        fontWeight: 800,
        fill: style.text,
        lineHeight: 1.14,
      }),
      line(90, 560, 520, style.text, 4, { dashed: true }),
      text('Customize in\nminutes', 90, 620, 560, {
        fontFamily: style.body,
        fontSize: 48,
        fontWeight: 600,
        fill: style.text,
        lineHeight: 1.3,
      }),
      text('Every layer stays editable', 90, 770, 560, {
        fontFamily: style.body,
        fontSize: 34,
        fontWeight: 600,
        fill: style.highlight,
      }),
      rows.map(([before, after], index) => {
        const y = 110 + index * 530;
        return [
          fitWidth(before, 690, y, 340),
          circle(1110, y + 212, 54, '#ffffff', shadow(20, 6)),
          arrow(1082, y + 212, 56, style.brand, 10),
          fitWidth(after, 1210, y, 340),
          star(5, 1500, y - 24, 56, '#ffffff', { innerRatio: 0.42 }),
        ];
      }),
    );
