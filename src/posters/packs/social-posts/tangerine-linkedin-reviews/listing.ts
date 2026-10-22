import { linear } from '@/design';
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
  type Nodes,
  page,
  phone,
  phoneScreen,
  pill,
  rect,
  scaledHeight,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import type { PosterPhotoName } from '../../../photos';

export interface ListingTheme {
  page: string;
  brand: string;
  brandText: string;
  onBrand: string;
  accent: string;
  ink: string;
  muted: string;
  folder: readonly [string, string];
  frame: string;
  strip: string;
  storyFill: string;
  headFont: string;
  headScale: number;
  bodyFont: string;
  bodyScale: number;
}

export interface Part {
  content: string;
  fill?: string;
  glow?: boolean;
  weight?: number;
}

export interface ListingCopy {
  title: string;
  channel: readonly Part[];
  count: readonly Part[];
  bonus: string;
  showcase: readonly Part[];
  showcaseSecond?: readonly Part[];
  showcaseNote: string;
  stamp?: string;
  editTitle: string;
  editLines: readonly [string, string];
  steps: readonly string[];
  stepsNote: string;
  offers: readonly string[];
  offerNote: string;
  studio: readonly [string, string];
  tagline: string;
  folder: readonly [string, string];
  host: PosterPhotoName;
}

export interface ListingTemplates {
  posts: readonly Template[];
  mosaic: readonly Template[];
  feature: Template;
  story: Template;
  showcase: readonly [Template, Template, Template, Template, Template];
  edits: readonly [readonly [Template, Template], readonly [Template, Template]];
}

export const W = LANDSCAPE.width;
export const H = LANDSCAPE.height;

const GLYPHS: readonly (readonly [RegExp, number])[] = [
  [/[iIl|.,:;!'j ]/, 0.28],
  [/[ftr()-]/, 0.38],
  [/[mw]/, 0.92],
  [/[MW%]/, 0.95],
  [/[J*]/, 0.5],
  [/[A-Z&]/, 0.68],
  [/[0-9+?>$#]/, 0.6],
];

export const advance = (content: string, size: number, scale: number): number =>
  [...content].reduce(
    (sum, glyph) => sum + (GLYPHS.find(([pattern]) => pattern.test(glyph))?.[1] ?? 0.56),
    0,
  ) *
  size *
  scale;

export const partsLine = (
  theme: ListingTheme,
  parts: readonly Part[],
  x: number,
  y: number,
  size: number,
  options: { weight?: number; center?: boolean; fill?: string; body?: boolean } = {},
): Nodes[] => {
  const scale = options.body === true ? theme.bodyScale : theme.headScale;
  const family = options.body === true ? theme.bodyFont : theme.headFont;
  const widthOf = (content: string) => advance(content, size, scale);
  const total = parts.reduce((sum, part) => sum + widthOf(part.content), 0);
  let cursor = options.center === true ? x - total / 2 : x;
  return parts.map((part) => {
    const start = cursor;
    cursor += widthOf(part.content);
    return text(part.content, start, y, widthOf(part.content) + size * 2, {
      fontFamily: family,
      fontSize: size,
      fontWeight: part.weight ?? options.weight ?? 800,
      fill: part.fill ?? options.fill ?? '#ffffff',
      ...(part.glow === true ? shadow(size * 0.5, 0, 'rgba(255,255,255,0.75)') : {}),
    });
  });
};

const editorBadge = (x: number, y: number, size: number, theme: ListingTheme) =>
  group(
    rect(x, y, size, size, linear(135, theme.folder[0], theme.brand), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.2, size * 0.08),
    }),
    icon('wand-sparkles', x + size * 0.24, y + size * 0.24, size * 0.52, '#ffffff', {
      strokeWidth: 2,
    }),
  );

const tileShadow = (x: number, y: number, item: Template, width: number) =>
  rect(x, y, width, scaledHeight(item, width), '#000000', {
    name: 'Tile shadow',
    ...shadow(30, 12, 'rgba(0,0,0,0.45)'),
  });

export const shadowed = (item: Template, x: number, y: number, width: number): Nodes[] => [
  tileShadow(x, y, item, width),
  fitWidth(item, x, y, width),
];

export const coverPage = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () =>
  page(
    theme.page,
    mosaic(LANDSCAPE, set.mosaic, { columns: 5, gap: 16 }),
    rect(0, 0, W, H, 'rgba(0,0,0,0.18)', { name: 'Dim' }),
    card(300, 320, 1000, 540, { radius: 44, shadowBlur: 60 }),
    text('Ready-to-Use', 360, 372, 700, {
      fontFamily: theme.headFont,
      fontSize: 76,
      fontWeight: 800,
      fill: theme.ink,
    }),
    text(copy.title, 360, 462, 700, {
      fontFamily: theme.headFont,
      fontSize: 76,
      fontWeight: 800,
      fill: theme.brandText,
    }),
    partsLine(theme, copy.channel, 360, 572, 40, { fill: theme.ink, weight: 700 }),
    partsLine(theme, copy.count, 360, 636, 32, { fill: theme.ink, weight: 500, body: true }),
    pill(copy.bonus, 360, 722, {
      fill: theme.ink,
      color: '#ffffff',
      fontSize: 24,
      fontFamily: theme.bodyFont,
      fontWeight: 700,
      letterSpacing: 1,
      padX: 34,
    }),
    shadowed(set.feature, 1050, 280, 210),
    editorBadge(1150, 580, 112, theme),
    icon('gift', 1150, 722, 88, theme.accent, { strokeWidth: 1.8 }),
  );

export const showcasePage = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => {
  const stacked = copy.showcaseSecond !== undefined;
  const top = stacked ? 330 : 300;
  const size = stacked ? 300 : 320;
  const height = size * 1.25;
  const rowGap = stacked ? 40 : 50;
  return () =>
    page(
      theme.page,
      partsLine(theme, copy.showcase, W / 2, 70, 82, { center: true }),
      copy.showcaseSecond === undefined
        ? []
        : partsLine(theme, copy.showcaseSecond, W / 2, 168, 82, { center: true }),
      text(copy.showcaseNote, 0, stacked ? 276 : 196, W, {
        fontFamily: theme.bodyFont,
        fontSize: 28,
        fontWeight: 500,
        fill: '#d4d4d8',
        align: 'center',
      }),
      [0, 1].map((index) =>
        shadowed(
          set.showcase[index] ?? set.feature,
          W / 2 - size - 18 + index * (size + 36),
          top,
          size,
        ),
      ),
      [2, 3, 4].map((index) =>
        shadowed(
          set.showcase[index] ?? set.feature,
          W / 2 - size * 1.5 - 36 + (index - 2) * (size + 36),
          top + height + rowGap,
          size,
        ),
      ),
      copy.stamp === undefined
        ? []
        : [0, 1].map((index) =>
            text(copy.stamp ?? '', 1240 - index * 80, 1060 + index * 115, 700, {
              fontFamily: theme.headFont,
              fontSize: 120,
              fontWeight: 800,
              fill: index === 0 ? 'rgba(0,0,0,0)' : '#ffffff',
              stroke: '#ffffff',
              strokeWidth: 3,
              rotation: -20,
              ...shadow(40, 0, 'rgba(255,255,255,0.7)'),
            }),
          ),
    );
};

const feedPhone = (x: number, y: number, width: number, item: Template, theme: ListingTheme) => {
  const screen = phoneScreen(width);
  const top = screen.height * 0.14;
  const below = top + scaledHeight(item, screen.width) + screen.width * 0.06;
  const iconSize = screen.width * 0.09;
  return phone(x, y, width, {
    screen: '#ffffff',
    body: '#111111',
    content: [
      circle(screen.width * 0.12, top * 0.62, screen.width * 0.055, theme.brand),
      rect(screen.width * 0.22, top * 0.5, screen.width * 0.4, screen.width * 0.035, '#d4d4d8', {
        name: 'Handle',
        cornerRadius: 6,
      }),
      rect(screen.width * 0.22, top * 0.72, screen.width * 0.26, screen.width * 0.03, '#e4e4e7', {
        name: 'Location',
        cornerRadius: 6,
      }),
      fitWidth(item, 0, top, screen.width),
      (['heart', 'message-circle', 'send'] as const).map((name, index) =>
        icon(name, screen.width * 0.06 + index * iconSize * 1.4, below, iconSize, '#111111'),
      ),
      rect(
        screen.width * 0.06,
        below + iconSize * 1.6,
        screen.width * 0.7,
        screen.width * 0.03,
        '#e4e4e7',
        {
          name: 'Caption',
          cornerRadius: 6,
        },
      ),
      rect(
        screen.width * 0.06,
        below + iconSize * 2.2,
        screen.width * 0.5,
        screen.width * 0.03,
        '#e4e4e7',
        {
          name: 'Caption',
          cornerRadius: 6,
        },
      ),
    ],
  });
};

const storyPhone = (x: number, y: number, width: number, item: Template, theme: ListingTheme) => {
  const screen = phoneScreen(width);
  return phone(x, y, width, {
    screen: theme.storyFill,
    body: '#111111',
    content: [fitBox(item, 0, 0, screen.width, screen.height)],
  });
};

const deliverable = (theme: ListingTheme, x: number, label: string, size: string): Nodes[] => [
  text('5', x, 690, 200, {
    fontFamily: theme.headFont,
    fontSize: 120,
    fontWeight: 800,
    fill: theme.ink,
  }),
  text(label, x, 840, 340, {
    fontFamily: theme.bodyFont,
    fontSize: 32,
    fontWeight: 500,
    fill: theme.ink,
  }),
  line(x, 900, 320, theme.ink, 4, { dashed: true }),
  text(size, x, 930, 340, {
    fontFamily: theme.bodyFont,
    fontSize: 30,
    fontWeight: 500,
    fill: theme.muted,
  }),
];

export const deliverablesPage = (theme: ListingTheme, set: ListingTemplates) => () =>
  page(
    theme.page,
    text('Ready-to-post content.', 120, 80, 1300, {
      fontFamily: theme.headFont,
      fontSize: 90,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    card(110, 250, 1380, 850, { radius: 36, shadowBlur: 0 }),
    text('Perfect for:', 190, 320, 380, {
      fontFamily: theme.headFont,
      fontSize: 42,
      fontWeight: 800,
      fill: theme.ink,
    }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(530 + index * 120, 346, 42, index === 1 ? theme.ink : theme.brand),
      icon(name, 506 + index * 120, 322, 48, index === 1 ? '#ffffff' : theme.onBrand, {
        strokeWidth: 2,
      }),
    ]),
    text('What you get:', 190, 450, 600, {
      fontFamily: theme.headFont,
      fontSize: 42,
      fontWeight: 800,
      fill: theme.ink,
    }),
    feedPhone(200, 545, 230, set.feature, theme),
    deliverable(theme, 470, 'Social media posts', '1080 x 1350 px'),
    storyPhone(890, 545, 230, set.story, theme),
    deliverable(theme, 1160, 'Social media stories', '1080 x 1920 px'),
  );

const swapArrow = (cx: number, cy: number, theme: ListingTheme) =>
  group(
    circle(cx, cy, 54, '#ffffff', shadow(24, 8, 'rgba(0,0,0,0.4)')),
    arrow(cx - 26, cy, 52, theme.brandText, 12),
  );

export const editablePage = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () =>
  page(
    theme.page,
    text(copy.editTitle, 90, 150, 600, {
      fontFamily: theme.headFont,
      fontSize: 72,
      fontWeight: 800,
      fill: '#ffffff',
      lineHeight: 1.14,
    }),
    line(90, 640, 560, '#ffffff', 4, { dashed: true }),
    text(copy.editLines[0], 90, 700, 600, {
      fontFamily: theme.bodyFont,
      fontSize: 50,
      fontWeight: 600,
      fill: '#ffffff',
      lineHeight: 1.3,
    }),
    text(copy.editLines[1], 90, 850, 600, {
      fontFamily: theme.bodyFont,
      fontSize: 44,
      fontWeight: 700,
      fill: theme.accent,
    }),
    set.edits.map((pair, row) => [
      shadowed(pair[0], 720, 120 + row * 520, 300),
      swapArrow(1150, 307 + row * 520, theme),
      shadowed(pair[1], 1270, 120 + row * 520, 300),
    ]),
  );
