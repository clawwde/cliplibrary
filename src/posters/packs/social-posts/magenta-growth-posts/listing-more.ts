import { linear } from '@/design';
import {
  card,
  circle,
  cycle,
  fitWidth,
  group,
  icon,
  line,
  page,
  phone,
  phoneScreen,
  rect,
  scaledHeight,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { glow, H, LISTING, W } from './listing';

const postPhone = (x: number, y: number, width: number, item: Template) => {
  const screen = phoneScreen(width);
  const top = screen.height * 0.13;
  const bottom = top + scaledHeight(item, screen.width);
  return phone(x, y, width, {
    screen: '#ffffff',
    content: [
      circle(screen.width * 0.1, top * 0.62, screen.width * 0.045, LISTING.brand),
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
    ],
  });
};

const storyPhone = (x: number, y: number, width: number, item: Template) => {
  const screen = phoneScreen(width);
  const itemHeight = scaledHeight(item, screen.width * 0.9);
  return phone(x, y, width, {
    screen: LISTING.ink,
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
      fitWidth(item, screen.width * 0.05, (screen.height - itemHeight) / 2, screen.width * 0.9),
    ],
  });
};

const countBlock = (x: number, y: number, label: string, size: string) => [
  text('10', x, y, 300, {
    fontFamily: LISTING.head,
    fontSize: 120,
    fontWeight: 800,
    fill: 'rgba(0,0,0,0)',
    stroke: LISTING.brand,
    strokeWidth: 4,
  }),
  text(label, x, y + 150, 340, {
    fontFamily: LISTING.head,
    fontSize: 32,
    fontWeight: 500,
    fill: '#374151',
  }),
  line(x, y + 212, 290, '#111827', 4, { dashed: true }),
  text(size, x, y + 238, 340, {
    fontFamily: LISTING.head,
    fontSize: 28,
    fontWeight: 500,
    fill: '#6b7280',
  }),
];

export const readyPage = (post: Template, story: Template) => () =>
  page(
    LISTING.background,
    text('Ready-to-post content.', 120, 70, 1360, {
      fontFamily: LISTING.head,
      fontSize: 88,
      fontWeight: 800,
      fill: LISTING.text,
    }),
    card(120, 230, 1360, 880, { radius: 40 }),
    text('Perfect for:', 200, 300, 320, {
      fontFamily: LISTING.head,
      fontSize: 42,
      fontWeight: 700,
      fill: LISTING.ink,
    }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      rect(500 + index * 110, 290, 80, 80, linear(135, '#ff7ab6', LISTING.brand), {
        cornerRadius: 20,
        name: 'Network badge',
      }),
      icon(name, 518 + index * 110, 308, 44, '#ffffff'),
    ]),
    text('What you get:', 200, 420, 400, {
      fontFamily: LISTING.head,
      fontSize: 42,
      fontWeight: 700,
      fill: LISTING.ink,
    }),
    postPhone(200, 520, 230, post),
    countBlock(480, 600, 'Social media posts', '1080 × 1350 px'),
    storyPhone(860, 520, 230, story),
    countBlock(1130, 600, 'Social media stories', '1080 × 1920 px'),
  );

export const howItWorksPage = (steps: readonly [string, string, string], note: string) => () =>
  page(
    LISTING.background,
    text('How it works?', 120, 80, 1200, {
      fontFamily: LISTING.head,
      fontSize: 96,
      fontWeight: 800,
      fill: LISTING.text,
    }),
    card(120, 260, 1360, 820, { radius: 40 }),
    steps.map((step, index) => [
      text(String(index + 1).padStart(2, '0'), 210, 370 + index * 170, 140, {
        fontFamily: LISTING.head,
        fontSize: 76,
        fontWeight: 800,
        fill: LISTING.brand,
      }),
      text(step, 360, 388 + index * 170, 1040, {
        fontFamily: LISTING.head,
        fontSize: 44,
        fontWeight: 700,
        fill: LISTING.ink,
      }),
    ]),
    line(210, 900, 1180, '#e5e7eb', 3),
    text(note, 210, 945, 1180, {
      fontFamily: LISTING.head,
      fontSize: 32,
      fontWeight: 500,
      fill: '#4b5563',
    }),
  );

export const brandPage =
  (
    copy: { folder: string; size: string; brandA: string; brandB: string },
    tiles: readonly Template[],
  ) =>
  () =>
    page(
      LISTING.background,
      text('More Than Just a Template', 100, 60, 1200, {
        fontFamily: LISTING.head,
        fontSize: 62,
        fontWeight: 800,
        fill: LISTING.text,
        ...glow,
      }),
      group(
        rect(120, 180, 560, 380, 'rgba(255,255,255,0.18)', {
          cornerRadius: 44,
          stroke: 'rgba(255,255,255,0.4)',
          strokeWidth: 2,
          ...shadow(50, 20, 'rgba(0,0,0,0.35)'),
          name: 'Folder card',
        }),
        icon('folder', 170, 230, 140, '#ffffff', { strokeWidth: 1.5 }),
        text(copy.folder, 350, 258, 310, {
          fontFamily: LISTING.head,
          fontSize: 44,
          fontWeight: 600,
          fill: '#ffffff',
        }),
        text(copy.size, 350, 320, 310, {
          fontFamily: LISTING.head,
          fontSize: 28,
          fontWeight: 500,
          fill: 'rgba(255,255,255,0.8)',
        }),
        rect(160, 430, 480, 90, 'rgba(255,255,255,0.2)', { cornerRadius: 45, name: 'Bar pill' }),
        rect(190, 455, 350, 40, 'rgba(0,0,0,0.3)', { cornerRadius: 20, name: 'Progress track' }),
        rect(190, 455, 240, 40, '#ffffff', { cornerRadius: 20, name: 'Progress' }),
        icon('circle-check', 560, 445, 60, '#ffffff', { strokeWidth: 2.2 }),
      ),
      text(copy.brandA, 780, 220, 760, {
        fontFamily: LISTING.head,
        fontSize: 110,
        fontWeight: 800,
        fill: LISTING.text,
      }),
      text(copy.brandB, 780, 350, 760, {
        fontFamily: LISTING.head,
        fontSize: 110,
        fontWeight: 800,
        fill: 'rgba(255,255,255,0.35)',
      }),
      rect(0, 640, W, H - 640, '#f6f3f8', { name: 'Strip' }),
      Array.from({ length: 14 }, (_, index) => {
        const x = 22 + (index % 7) * 224;
        const y = 668 + Math.floor(index / 7) * 300;
        return [
          fitWidth(cycle(tiles, index), x, y, 200),
          rect(x - 4, y - 4, 208, 258, 'rgba(0,0,0,0)', {
            cornerRadius: 8,
            stroke: '#a78bfa',
            strokeWidth: 3,
            name: 'Thumbnail frame',
          }),
          text(String((index % tiles.length) + 1), x, y + 260, 60, {
            fontFamily: LISTING.head,
            fontSize: 18,
            fontWeight: 600,
            fill: '#6b7280',
          }),
        ];
      }),
    );
