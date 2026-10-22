import { type DesignIconName, type Fill, isDesignIcon, linear } from '@/design';
import {
  circle,
  cycle,
  decorations,
  fitBox,
  howToStart,
  icon,
  laptop,
  page,
  path,
  rect,
  type SlideTheme,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';

export interface DeckListing {
  background: string;
  ink: string;
  muted: string;
  brand: string;
  accent: string;
  glow: string;
  font: string;
  total: number;
  style: string;
}

type TextStyle = NonNullable<Parameters<typeof text>[4]>;

export const typeset = (headFont: string, bodyFont: string) => ({
  head: (
    content: string,
    x: number,
    y: number,
    width: number,
    size: number,
    fill: Fill,
    extra: TextStyle = {},
  ) =>
    text(content, x, y, width, {
      fontFamily: headFont,
      fontSize: size,
      fontWeight: 700,
      fill,
      lineHeight: 1.08,
      ...extra,
    }),
  body: (
    content: string,
    x: number,
    y: number,
    width: number,
    size: number,
    fill: Fill,
    extra: TextStyle = {},
  ) =>
    text(content, x, y, width, {
      fontFamily: bodyFont,
      fontSize: size,
      fontWeight: 400,
      fill,
      lineHeight: 1.4,
      ...extra,
    }),
});

const point = (center: number, radius: number, angle: number) =>
  `${(center + radius * Math.cos(angle)).toFixed(2)} ${(center + radius * Math.sin(angle)).toFixed(2)}`;

export const arcBand = (
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  from: number,
  to: number,
  fill: Fill,
) => {
  const start = ((from - 90) * Math.PI) / 180;
  const end = ((to - 90) * Math.PI) / 180;
  const large = to - from > 180 ? 1 : 0;
  const data = [
    `M${point(outer, outer, start)}`,
    `A${outer} ${outer} 0 ${large} 1 ${point(outer, outer, end)}`,
    `L${point(outer, inner, end)}`,
    `A${inner} ${inner} 0 ${large} 0 ${point(outer, inner, start)}`,
    'Z',
  ].join(' ');
  return path(data, cx - outer, cy - outer, outer * 2, outer * 2, fill, {
    width: outer * 2,
    height: outer * 2,
  });
};

export const donut = (
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  segments: readonly (readonly [number, Fill])[],
) => {
  const total = segments.reduce((sum, [value]) => sum + value, 0);
  let cursor = 0;
  return segments.map(([value, fill]) => {
    const from = (cursor / total) * 360;
    cursor += value;
    return arcBand(cx, cy, outer, inner, from, (cursor / total) * 360 - 0.01, fill);
  });
};

const { width: W, height: H } = LANDSCAPE;

const tile = (item: Template, x: number, y: number, width: number) => {
  const height = (width * item.height) / item.width;
  return [
    rect(x, y, width, height, '#0f172a', {
      name: 'Slide shadow',
      ...shadow(width * 0.05, width * 0.02, 'rgba(15,23,42,0.28)'),
    }),
    fitBox(item, x, y, width, height),
  ];
};

const formats = (listing: DeckListing, x: number, y: number, size: number) => [
  circle(x + size / 2, y + size / 2, size / 2, listing.ink),
  icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, '#ffffff'),
  rect(x + size * 1.25, y, size, size, linear(135, listing.brand, listing.accent), {
    name: 'Slides format badge',
    cornerRadius: size * 0.22,
  }),
  icon('monitor', x + size * 1.5, y + size * 0.25, size * 0.5, '#ffffff'),
];

export const deckCover =
  (listing: DeckListing, center: Template, around: readonly Template[]) => () => {
    const width = 660;
    const gap = 48;
    const height = (width * 9) / 16;
    const left = (W - width) / 2 - (width + gap);
    const top = (H - height) / 2 - (height + gap);
    return page(
      listing.background,
      Array.from({ length: 9 }, (_, index) =>
        tile(
          index === 4 ? center : cycle(around, index < 4 ? index : index - 1),
          left + (index % 3) * (width + gap),
          top + Math.floor(index / 3) * (height + gap),
          width,
        ),
      ),
    );
  };

export const deckShowcase =
  (
    listing: DeckListing,
    big: readonly [Template, Template, Template],
    small: readonly Template[],
  ) =>
  () =>
    page(
      listing.background,
      big.map((item, index) => tile(item, 560, index * 420, 640)),
      small.slice(0, 5).map((item, index) => tile(item, 1244, -16 + index * 252, 380)),
      circle(150, 150, 76, listing.ink),
      icon('wand-sparkles', 110, 110, 80, '#ffffff'),
      text(`${listing.total} Editable\nSlide Deck\nTemplates`, 70, 410, 480, {
        fontFamily: listing.font,
        fontSize: 72,
        fontWeight: 700,
        fill: listing.ink,
        lineHeight: 1.2,
      }),
      text(listing.style, 70, 690, 480, {
        fontFamily: listing.font,
        fontSize: 48,
        fontWeight: 400,
        fill: listing.muted,
      }),
      text('File Formats', 70, 950, 480, {
        fontFamily: listing.font,
        fontSize: 42,
        fontWeight: 700,
        fill: listing.ink,
      }),
      formats(listing, 70, 1030, 80),
    );

export const deckGrid = (listing: DeckListing, items: readonly Template[]) => () =>
  page(
    listing.background,
    text(`${listing.total} Editable Slide Deck Templates`, 88, 120, 1420, {
      fontFamily: listing.font,
      fontSize: 58,
      fontWeight: 700,
      fill: listing.ink,
    }),
    items
      .slice(0, 6)
      .map((item, index) =>
        tile(item, 80 + (index % 3) * 496, 282 + Math.floor(index / 3) * 300, 456),
      ),
    text('File Formats', 88, 930, 600, {
      fontFamily: listing.font,
      fontSize: 42,
      fontWeight: 700,
      fill: listing.ink,
    }),
    formats(listing, 88, 1010, 80),
    text(listing.style, 820, 990, 700, {
      fontFamily: listing.font,
      fontSize: 52,
      fontWeight: 400,
      fill: listing.ink,
      align: 'right',
    }),
  );

const ICON_SET: readonly DesignIconName[] = [
  'wifi zap cloud code monitor database refresh-cw download upload smartphone phone',
  'rocket files headphones keyboard laptop play cpu mouse gamepad-2 mic',
  'message-square share-2 workflow git-branch camera layers video settings',
  'chart-column radio-tower tablet brain bot terminal server shield-check lock',
  'key-round qr-code scan-face globe link search bell calendar clock mail inbox',
  'send users user-check briefcase building-2 target trending-up chart-pie',
  'chart-line dollar-sign wallet credit-card shopping-cart tag gift award trophy',
  'star heart thumbs-up lightbulb puzzle megaphone handshake file-text folder',
  'printer map-pin compass flag sparkles wand-sparkles palette pen-tool pencil',
  'scissors image tv satellite cloud-upload server-cog',
]
  .join(' ')
  .split(' ')
  .filter(isDesignIcon);

const iconRows = (
  x: number,
  y: number,
  columns: number,
  rows: number,
  stepX: number,
  stepY: number,
  size: number,
  color: string,
  start: number,
) =>
  Array.from({ length: columns * rows }, (_, index) =>
    icon(
      cycle(ICON_SET, start + index),
      x + (index % columns) * stepX,
      y + Math.floor(index / columns) * stepY,
      size,
      color,
      { strokeWidth: 2 },
    ),
  );

export const iconSlides = (listing: DeckListing) => () =>
  page(
    listing.background,
    rect(0, 292, W, 350, 'rgba(255,255,255,0.75)', { name: 'Icon band' }),
    iconRows(30, 336, 6, 5, 56, 56, 30, listing.muted, 40),
    iconRows(1262, 336, 6, 5, 56, 56, 30, listing.muted, 10),
    rect(370, 222, 860, 488, '#ffffff', {
      name: 'Icon card',
      cornerRadius: 28,
      ...shadow(60, 24, 'rgba(15,23,42,0.18)'),
    }),
    iconRows(418, 268, 15, 6, 52.5, 68, 36, listing.ink, 0),
    text('3 Editable Icon Slides', 0, 800, W, {
      fontFamily: listing.font,
      fontSize: 64,
      fontWeight: 700,
      fill: listing.ink,
      align: 'center',
    }),
    formats(listing, W / 2 - 101, 940, 90),
  );

export const deckEditor = (listing: DeckListing, templates: readonly Template[]) => () => {
  const laptopWidth = 880;
  const bezel = laptopWidth * 0.025;
  const screenWidth = laptopWidth - bezel * 2;
  const columns = 6;
  const gap = 14;
  const cellWidth = (screenWidth - 40 - gap * (columns - 1)) / columns;
  const cellHeight = (cellWidth * 9) / 16;
  return page(
    '#050505',
    decorations(LANDSCAPE, '#050505'),
    text('Fully editable in the built-in editor', 0, 210, W, {
      fontFamily: listing.font,
      fontSize: 60,
      fontWeight: 700,
      fill: listing.glow,
      align: 'center',
    }),
    text(
      'Rewrite any text, switch fonts and colours, swap icons\nand rearrange layouts to match your brand.',
      200,
      310,
      1200,
      {
        fontFamily: listing.font,
        fontSize: 36,
        fontWeight: 400,
        fill: '#e5e7eb',
        align: 'center',
        lineHeight: 1.4,
      },
    ),
    laptop((W - laptopWidth) / 2, 500, laptopWidth, {
      screen: '#f4f4f5',
      body: '#27272a',
      content: [
        rect(0, 0, screenWidth, 34, linear(90, listing.brand, listing.accent), {
          name: 'Editor bar',
        }),
        Array.from({ length: columns * 5 }, (_, index) =>
          tile(
            cycle(templates, index),
            20 + (index % columns) * (cellWidth + gap),
            54 + Math.floor(index / columns) * (cellHeight + 18),
            cellWidth,
          ),
        ),
      ],
    }),
  );
};

export const deckHowTo = (listing: DeckListing) => {
  const theme: SlideTheme = {
    background: '#050505',
    text: '#ffffff',
    muted: '#d1d5db',
    surface: '#18181b',
    ink: '#ffffff',
    brand: listing.brand,
    accent: listing.glow,
    headFont: listing.font,
    bodyFont: listing.font,
  };
  return howToStart(LANDSCAPE, theme, {
    title: 'How To Start',
    steps: [
      {
        icon: 'shopping-cart',
        title: '01 Check out',
        body: 'Pay securely in a couple of clicks',
      },
      {
        icon: 'download',
        title: '02 Get the link',
        body: 'Open the note and follow the link',
      },
      {
        icon: 'file-text',
        title: '03 Start editing',
        body: 'Edit the deck right in your browser',
      },
    ],
  });
};
