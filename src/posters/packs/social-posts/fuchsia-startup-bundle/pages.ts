import { linear } from '@/design';
import { card, mosaic, page, phone, pill, rect, type Template, text } from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import { channelIcons, dashes, glow, wandTile } from '../lagoon-saas-stats/listing';
import type { ListingTheme } from '../lagoon-saas-stats/theme';

const { width: W, height: H } = LANDSCAPE;

const pair = (theme: ListingTheme, first: string, second: string, y: number) => {
  const unit = 84 * 0.5;
  const total = (first.length + second.length + 1) * unit;
  const left = 370 + (860 - total) / 2;
  const style = { fontFamily: theme.headFont, fontSize: 84, fontWeight: 800 };
  return [
    text(first, left - 200, y, first.length * unit + 200, {
      ...style,
      fill: theme.ink,
      align: 'right',
    }),
    text(second, left + (first.length + 1) * unit, y, second.length * unit + 200, {
      ...style,
      fill: theme.highlight,
    }),
  ];
};

export const bundleCover =
  (
    theme: ListingTheme,
    copy: { lines: readonly [string, string, string, string]; count: string },
    posts: readonly Template[],
  ) =>
  () =>
    page(
      theme.page,
      mosaic(LANDSCAPE, posts, { columns: 4, gap: 14, offsetY: -170 }),
      rect(0, 0, W, H, 'rgba(0,0,0,0.12)', { name: 'Dim' }),
      card(370, 380, 860, 500, { radius: 36, shadowBlur: 70 }),
      pair(theme, copy.lines[0], copy.lines[1], 412),
      pair(theme, copy.lines[2], copy.lines[3], 512),
      channelIcons(theme, 690, 650, 64),
      pill(copy.count, 560, 750, {
        fill: theme.ink,
        color: '#ffffff',
        fontSize: 26,
        fontFamily: theme.bodyFont,
        fontWeight: 700,
        width: 480,
      }),
      phone(380, 760, 170, { body: theme.brand, screen: theme.brandDeep, rotation: 24 }),
      phone(290, 700, 170, { body: '#16161d', screen: '#05050a', rotation: -16 }),
      wandTile(theme, 1110, 730, 130),
    );

export const whatYouGet = (theme: ListingTheme, items: readonly string[]) => () =>
  page(
    theme.page,
    text('WHAT YOU GET', 0, 100, W, {
      fontFamily: theme.headFont,
      fontSize: 96,
      fontWeight: 400,
      fill: theme.text,
      align: 'center',
      letterSpacing: 2,
      ...glow('rgba(255,255,255,0.4)'),
    }),
    dashes(440, 236, 730, theme.text),
    items.map((item, index) => {
      const x = index % 2 === 0 ? 340 : 830;
      const y = 330 + Math.floor(index / 2) * 150;
      return [
        rect(x, y, 430, 118, linear(90, theme.page, theme.brand), {
          name: 'Category button',
          cornerRadius: 14,
        }),
        text(item, x, y + 34, 430, {
          fontFamily: theme.headFont,
          fontSize: 42,
          fontWeight: 800,
          fill: '#ffffff',
          align: 'center',
        }),
      ];
    }),
  );
