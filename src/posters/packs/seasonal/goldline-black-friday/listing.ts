import { linear } from '@/design';
import {
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
import {
  bonus,
  howItWorks,
  type ListingCopy,
  type ListingTemplates,
  type ListingTheme,
  studio,
} from './listing-info';

const { width: W, height: H } = LANDSCAPE;

const splitLine = (
  parts: readonly { content: string; fill: string; glow?: string }[],
  x: number,
  y: number,
  size: number,
  font: { family: string; width: number },
  centered: boolean,
) => {
  const gap = size * 0.34;
  const widthOf = (content: string) => content.length * size * font.width;
  const total = parts.reduce((sum, part) => sum + widthOf(part.content), 0);
  const start = centered ? x - (total + gap * (parts.length - 1)) / 2 : x;
  let cursor = start;
  return parts.map((part) => {
    const width = widthOf(part.content);
    const node = text(part.content, cursor, y, width + size, {
      fontFamily: font.family,
      fontSize: size,
      fontWeight: 800,
      fill: part.fill,
      ...(part.glow === undefined ? {} : shadow(size * 0.4, 0, part.glow)),
    });
    cursor += width + gap;
    return node;
  });
};

const editorBadge = (theme: ListingTheme, x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, theme.glow, theme.brand), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.3, size * 0.1, 'rgba(0,0,0,0.35)'),
    }),
    icon('wand-sparkles', x + size * 0.24, y + size * 0.24, size * 0.52, '#ffffff', {
      strokeWidth: 2,
    }),
  );

const cover = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () =>
  page(
    theme.page,
    mosaic(LANDSCAPE, set.posts, { columns: 5 }),
    rect(0, 0, W, H, 'rgba(0,0,0,0.38)', { name: 'Dim' }),
    card(330, 300, 940, 580, { radius: 44, shadowBlur: 60 }),
    fitWidth(set.feature, 1100, 220, 190),
    text(copy.kicker, 390, 350, 840, {
      fontFamily: theme.headFont,
      fontSize: 88,
      fontWeight: 800,
      fill: theme.ink,
    }),
    text(copy.title, 390, 455, 840, {
      fontFamily: theme.headFont,
      fontSize: 88,
      fontWeight: 800,
      fill: theme.brandText,
    }),
    splitLine(
      [
        { content: copy.line[0], fill: theme.ink },
        { content: copy.line[1], fill: theme.brandText },
      ],
      390,
      582,
      40,
      { family: theme.bodyFont, width: theme.bodyWidth },
      false,
    ),
    text(copy.count, 390, 646, 820, {
      fontFamily: theme.bodyFont,
      fontSize: 36,
      fontWeight: 500,
      fill: theme.muted,
    }),
    pill('YOUR BONUS IS WAITING  →  SWIPE TO DISCOVER', 390, 740, {
      fill: theme.ink,
      color: '#ffffff',
      fontSize: 24,
      fontFamily: theme.bodyFont,
      fontWeight: 700,
      letterSpacing: 1,
      width: 720,
    }),
    icon('gift', 1140, 718, 96, theme.accent, { strokeWidth: 1.8 }),
    editorBadge(theme, 1220, 520, 140),
  );

const showcase = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () => {
  const [a, b, c, d, e] = set.posts;
  return page(
    theme.page,
    splitLine(
      [
        { content: copy.showcase[0], fill: '#ffffff', glow: theme.glow },
        { content: copy.showcase[1], fill: '#ffffff' },
      ],
      W / 2,
      60,
      76,
      { family: theme.headFont, width: theme.headWidth },
      true,
    ),
    text(copy.showcaseNote, 0, 172, W, {
      fontFamily: theme.bodyFont,
      fontSize: 30,
      fontWeight: 500,
      fill: '#cbd5e1',
      align: 'center',
    }),
    fitWidth(a, 470, 250, 300),
    fitWidth(b, 830, 250, 300),
    fitWidth(c, 290, 670, 300),
    fitWidth(d, 650, 670, 300),
    fitWidth(e, 1010, 670, 300),
    star(5, 1230, 220, 90, theme.accent, { innerRatio: 0.42 }),
    star(5, 230, 600, 64, theme.brand, { innerRatio: 0.42, rotation: 12 }),
    text('PREMIUM', 1110, 1110, 560, {
      fontFamily: theme.headFont,
      fontSize: 104,
      fontWeight: 800,
      fill: 'rgba(0,0,0,0)',
      stroke: '#ffffff',
      strokeWidth: 3,
      rotation: -22,
      ...shadow(18, 0, theme.glow),
    }),
  );
};

const PHONE = 230;

const feedPhone = (theme: ListingTheme, x: number, y: number, item: Template, handle: string) => {
  const screen = phoneScreen(PHONE);
  const top = screen.height * 0.16;
  return phone(x, y, PHONE, {
    screen: '#ffffff',
    content: [
      circle(24, top - 30, 12, theme.brand),
      text(handle, 44, top - 42, screen.width - 50, { fontSize: 15, fontWeight: 600 }),
      fitWidth(item, 0, top, screen.width),
      (['heart', 'message-circle', 'send'] as const).map((name, index) =>
        icon(name, 14 + index * 34, top + scaledHeight(item, screen.width) + 14, 22, '#111827'),
      ),
    ],
  });
};

const storyPhone = (x: number, y: number, item: Template) => {
  const screen = phoneScreen(PHONE);
  return phone(x, y, PHONE, {
    screen: '#000000',
    content: [fitBox(item, 0, 0, screen.width, screen.height)],
  });
};

const deliverableColumn = (
  theme: ListingTheme,
  x: number,
  count: string,
  label: string,
  size: string,
) => [
  text(count, x, 600, 200, {
    fontFamily: theme.headFont,
    fontSize: 110,
    fontWeight: 800,
    fill: theme.ink,
  }),
  text(label, x, 740, 380, {
    fontFamily: theme.bodyFont,
    fontSize: 32,
    fontWeight: 500,
    fill: '#374151',
  }),
  line(x, 800, 340, theme.ink, 4, { dashed: true }),
  text(size, x, 828, 380, {
    fontFamily: theme.bodyFont,
    fontSize: 28,
    fontWeight: 500,
    fill: '#6b7280',
  }),
];

const deliverables = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () =>
  page(
    theme.page,
    text('Ready-to-post content.', 120, 70, 1300, {
      fontFamily: theme.headFont,
      fontSize: 84,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    card(120, 220, 1360, 830, { radius: 36 }),
    text('Perfect for:', 200, 290, 400, {
      fontFamily: theme.headFont,
      fontSize: 40,
      fontWeight: 700,
      fill: theme.ink,
    }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(500 + index * 110, 314, 40, linear(135, theme.brand, theme.brandDeep)),
      icon(name, 478 + index * 110, 292, 44, theme.onBrand),
    ]),
    text('What you get:', 200, 420, 600, {
      fontFamily: theme.headFont,
      fontSize: 40,
      fontWeight: 700,
      fill: theme.ink,
    }),
    feedPhone(theme, 200, 490, set.feature, copy.handle),
    deliverableColumn(theme, 480, '5', 'Social media posts', '1080 x 1350 px'),
    storyPhone(840, 490, set.story),
    deliverableColumn(theme, 1120, '5', 'Social media stories', '1080 x 1920 px'),
  );

const editRow = (theme: ListingTheme, y: number, pair: readonly [Template, Template]) => [
  fitBox(pair[0], 600, y, 360, 450),
  circle(1050, y + 225, 56, '#ffffff'),
  icon('arrow-right', 1018, y + 193, 64, theme.brandText, { strokeWidth: 3 }),
  fitBox(pair[1], 1140, y, 360, 450),
];

const editable = (theme: ListingTheme, set: ListingTemplates) => () =>
  page(
    theme.page,
    text(['Editable', 'Social Posts', 'in Your', 'Browser'].join('\n'), 90, 110, 560, {
      fontFamily: theme.headFont,
      fontSize: 74,
      fontWeight: 800,
      fill: '#ffffff',
      lineHeight: 1.14,
    }),
    line(90, 540, 440, '#ffffff', 4, { dashed: true }),
    text('Customize in\nMinutes', 90, 620, 460, {
      fontFamily: theme.bodyFont,
      fontSize: 52,
      fontWeight: 600,
      fill: '#ffffff',
      lineHeight: 1.3,
    }),
    text('100% Editable', 90, 770, 460, {
      fontFamily: theme.bodyFont,
      fontSize: 46,
      fontWeight: 700,
      fill: theme.glow,
    }),
    editRow(theme, 120, set.edits[0]),
    editRow(theme, 640, set.edits[1]),
  );

export const listingPages = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => [
  cover(theme, copy, set),
  showcase(theme, copy, set),
  deliverables(theme, copy, set),
  editable(theme, set),
  howItWorks(theme, copy),
  bonus(theme, copy),
  studio(theme, copy, set),
];
