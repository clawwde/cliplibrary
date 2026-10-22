import { linear, type Page } from '@/design';
import {
  card,
  circle,
  group,
  icon,
  numbered,
  page,
  photo,
  pill,
  rect,
  shadow,
  text,
} from '../../../kit';
import {
  advance,
  coverPage,
  deliverablesPage,
  editablePage,
  H,
  type ListingCopy,
  type ListingTemplates,
  type ListingTheme,
  partsLine,
  shadowed,
  showcasePage,
  W,
} from './listing';

const howItWorksPage = (theme: ListingTheme, copy: ListingCopy) => () =>
  page(
    theme.page,
    text('How it works?', 120, 80, 1200, {
      fontFamily: theme.headFont,
      fontSize: 92,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    card(120, 270, 1360, 800, { radius: 36, shadowBlur: 0 }),
    numbered(copy.steps, 210, 380, 1200, {
      fontSize: 46,
      gap: 140,
      numberColor: theme.brandText,
      color: theme.ink,
      fontFamily: theme.headFont,
      fontWeight: 700,
    }),
    rect(210, 820, 1180, 3, '#e4e4e7', { name: 'Divider' }),
    text(copy.stepsNote, 210, 870, 1060, {
      fontFamily: theme.bodyFont,
      fontSize: 32,
      fontWeight: 500,
      fill: theme.muted,
    }),
    group(
      circle(1370, 960, 64, theme.brand),
      icon('mouse', 1336, 926, 68, theme.onBrand, { strokeWidth: 1.8 }),
    ),
  );

const bonusPage = (theme: ListingTheme, copy: ListingCopy) => () => {
  const name = `${copy.studio[0]} ${copy.studio[1]}`;
  const size = Math.min(104, 860 / advance(name, 1, theme.headScale));
  return page(
    theme.page,
    icon('gift', 110, 60, 150, theme.accent, { strokeWidth: 1.6 }),
    text('Bonus', 280, 118, 500, {
      fontFamily: theme.headFont,
      fontSize: 72,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    copy.offers.map((offer, index) =>
      pill(offer, 120, 300 + index * 150, {
        fill: theme.brand,
        color: theme.onBrand,
        fontSize: 44,
        fontFamily: theme.headFont,
        fontWeight: 700,
        padX: 40,
        padY: 22,
        width: advance(offer, 44, theme.headScale) + 80,
      }),
    ),
    circle(370, 1180, 300, linear(135, theme.brand, theme.folder[0])),
    photo(copy.host, 170, 790, 400, 410, { cornerRadius: 200 }),
    partsLine(
      theme,
      [{ content: `${copy.studio[0]}  ` }, { content: copy.studio[1], fill: theme.accent }],
      660,
      860 + (104 - size) / 2,
      size,
    ),
    text(copy.offerNote, 660, 1030, 860, {
      fontFamily: theme.bodyFont,
      fontSize: 28,
      fontWeight: 400,
      fill: '#a1a1aa',
    }),
  );
};

const brandPage = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () =>
  page(
    theme.page,
    group(
      rect(120, 90, 580, 440, linear(135, theme.folder[0], theme.folder[1]), {
        name: 'Download card',
        cornerRadius: 44,
        ...shadow(50, 20, 'rgba(0,0,0,0.5)'),
      }),
      icon('folder', 180, 150, 150, '#ffffff', { strokeWidth: 1.6 }),
      text(copy.folder[0], 370, 180, 320, {
        fontFamily: theme.bodyFont,
        fontSize: 44,
        fontWeight: 600,
        fill: '#ffffff',
      }),
      text(copy.folder[1], 370, 240, 300, {
        fontFamily: theme.bodyFont,
        fontSize: 28,
        fontWeight: 500,
        fill: 'rgba(255,255,255,0.8)',
      }),
      rect(180, 380, 460, 90, 'rgba(255,255,255,0.22)', {
        name: 'Progress card',
        cornerRadius: 45,
      }),
      rect(210, 410, 330, 30, 'rgba(0,0,0,0.35)', { name: 'Progress track', cornerRadius: 15 }),
      rect(210, 410, 250, 30, '#ffffff', { name: 'Progress', cornerRadius: 15 }),
      icon('circle-check', 562, 397, 56, '#ffffff', { strokeWidth: 2.2 }),
    ),
    text('This is', 800, 110, 700, {
      fontFamily: theme.headFont,
      fontSize: 76,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(copy.studio[0], 800, 205, 760, {
      fontFamily: theme.headFont,
      fontSize: 92,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(copy.studio[1], 800, 315, 760, {
      fontFamily: theme.headFont,
      fontSize: 92,
      fontWeight: 800,
      fill: theme.accent,
    }),
    text(copy.tagline, 800, 440, 780, {
      fontFamily: theme.headFont,
      fontSize: 56,
      fontWeight: 700,
      fill: '#ffffff',
      ...shadow(30, 0, 'rgba(255,255,255,0.6)'),
    }),
    rect(0, 680, W, H - 680, theme.strip, { name: 'Strip' }),
    [0, 1, 2, 3, 4].map((index) => {
      const item = set.posts[index % set.posts.length] ?? set.feature;
      const x = 34 + index * 312;
      return [
        rect(x - 8, 722, 296, 366, theme.frame, { name: 'Tile frame', cornerRadius: 14 }),
        shadowed(item, x, 730, 280),
        icon('bookmark', x, 1110, 34, '#52525b'),
        text(String(index + 1), x + 44, 1112, 60, {
          fontFamily: theme.bodyFont,
          fontSize: 28,
          fontWeight: 600,
          fill: '#52525b',
        }),
      ];
    }),
  );

export const listingPages = (
  theme: ListingTheme,
  copy: ListingCopy,
  set: ListingTemplates,
): (() => Page)[] => [
  coverPage(theme, copy, set),
  showcasePage(theme, copy, set),
  deliverablesPage(theme, set),
  editablePage(theme, copy, set),
  howItWorksPage(theme, copy),
  bonusPage(theme, copy),
  brandPage(theme, copy, set),
];
