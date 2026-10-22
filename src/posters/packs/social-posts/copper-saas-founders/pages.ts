import { linear } from '@/design';
import {
  card,
  circle,
  cycle,
  fitBox,
  fitWidth,
  group,
  icon,
  mosaic,
  page,
  phone,
  phoneScreen,
  photo,
  pill,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import { editorBadge, type ListingStyle } from '../plum-proof-reviews/listing';

const { width: W, height: H } = LANDSCAPE;

export const profilePhone = (
  style: ListingStyle,
  x: number,
  y: number,
  width: number,
  rotation: number,
  tiles: readonly Template[],
) => {
  const screen = phoneScreen(width);
  const unit = screen.width / 100;
  const cell = screen.width / 3;
  const gridTop = screen.height * 0.4;
  return phone(x, y, width, {
    screen: '#ffffff',
    rotation,
    content: [
      circle(unit * 14, screen.height * 0.12, unit * 9, linear(135, style.brand, style.highlight)),
      icon('arrow-up-right', unit * 9, screen.height * 0.12 - unit * 5, unit * 10, '#ffffff', {
        strokeWidth: 3,
      }),
      [
        ['128', 'Posts'],
        ['24.6k', 'Followers'],
        ['412', 'Following'],
      ].map(([value, caption], index) => [
        text(value ?? '', unit * (30 + index * 24), screen.height * 0.095, unit * 22, {
          fontSize: unit * 4.6,
          fontWeight: 700,
          fill: '#111827',
          align: 'center',
        }),
        text(caption ?? '', unit * (30 + index * 24), screen.height * 0.125, unit * 22, {
          fontSize: unit * 3.4,
          fontWeight: 500,
          fill: '#6b7280',
          align: 'center',
        }),
      ]),
      text('@northpeak.labs', unit * 6, screen.height * 0.18, unit * 88, {
        fontSize: unit * 4.4,
        fontWeight: 700,
        fill: '#111827',
      }),
      text(
        'Launch-ready templates for SaaS builders.\nShip faster, post smarter.',
        unit * 6,
        screen.height * 0.215,
        unit * 88,
        {
          fontSize: unit * 3.6,
          fontWeight: 400,
          fill: '#374151',
          lineHeight: 1.3,
        },
      ),
      rect(unit * 6, screen.height * 0.3, unit * 42, screen.height * 0.04, style.brand, {
        cornerRadius: unit * 2,
        name: 'Follow button',
      }),
      text('Follow', unit * 6, screen.height * 0.308, unit * 42, {
        fontSize: unit * 3.8,
        fontWeight: 700,
        fill: '#ffffff',
        align: 'center',
      }),
      rect(unit * 52, screen.height * 0.3, unit * 42, screen.height * 0.04, '#e5e7eb', {
        cornerRadius: unit * 2,
        name: 'Message button',
      }),
      text('Message', unit * 52, screen.height * 0.308, unit * 42, {
        fontSize: unit * 3.8,
        fontWeight: 700,
        fill: '#111827',
        align: 'center',
      }),
      Array.from({ length: 9 }, (_, index) =>
        fitBox(
          cycle(tiles, index),
          (index % 3) * cell,
          gridTop + Math.floor(index / 3) * cell * 1.25,
          cell - 3,
          cell * 1.25 - 3,
        ),
      ),
    ],
  });
};

export const saasCover = (style: ListingStyle, tiles: readonly Template[]) => () =>
  page(
    style.background,
    mosaic(LANDSCAPE, tiles, { columns: 5, gap: 20, offsetY: -40 }),
    rect(0, 0, W, H, 'rgba(0,0,0,0.3)', { name: 'Dim' }),
    card(380, 90, 840, 520, { radius: 44, shadowBlur: 60 }),
    text('Posts for SaaS', 380, 130, 840, {
      fontFamily: style.head,
      fontSize: 100,
      fontWeight: 800,
      fill: style.ink,
      align: 'center',
    }),
    text('& AI founders', 380, 250, 840, {
      fontFamily: style.head,
      fontSize: 100,
      fontWeight: 800,
      fill: style.brand,
      align: 'center',
    }),
    text('22 SaaS templates you edit in your browser', 380, 392, 840, {
      fontFamily: style.body,
      fontSize: 34,
      fontWeight: 500,
      fill: '#374151',
      align: 'center',
    }),
    pill('+22 story bonus', 640, 470, {
      fill: style.ink,
      color: '#ffffff',
      fontSize: 38,
      fontFamily: style.head,
      fontWeight: 700,
      width: 320,
    }),
    profilePhone(style, 260, 470, 330, -10, tiles),
    editorBadge(style, 1080, 620, 190),
  );

export const saasGrid =
  (style: ListingStyle, copy: { title: string; subtitle: string }, tiles: readonly Template[]) =>
  () =>
    page(
      style.background,
      text(copy.title, 0, 50, W, {
        fontFamily: style.head,
        fontSize: 68,
        fontWeight: 800,
        fill: style.text,
        align: 'center',
        lineHeight: 1.12,
      }),
      text(copy.subtitle, 0, 230, W, {
        fontFamily: style.body,
        fontSize: 30,
        fontWeight: 500,
        fill: style.muted,
        align: 'center',
      }),
      Array.from({ length: 10 }, (_, index) =>
        fitWidth(
          cycle(tiles, index),
          18 + (index % 5) * 316,
          320 + Math.floor(index / 5) * 395,
          300,
        ),
      ),
    );

const CHANNELS = ['globe', 'briefcase', 'camera'] as const;

export const saasChannels =
  (style: ListingStyle, slogans: readonly string[], tiles: readonly Template[]) => () =>
    page(
      style.background,
      CHANNELS.map((name, index) =>
        group(
          rect(590 + index * 160, 60, 120, 120, linear(135, style.badgeFrom, style.badgeTo), {
            cornerRadius: 30,
            ...shadow(20, 8),
          }),
          icon(name, 620 + index * 160, 90, 60, '#ffffff'),
        ),
      ),
      slogans.map((slogan, index) =>
        pill(slogan, 260, 250 + index * 150, {
          fill: style.brand,
          color: style.brandText,
          fontSize: 54,
          fontFamily: style.head,
          fontWeight: 800,
          width: 1080,
        }),
      ),
      tiles.slice(0, 3).map((item, index) => fitWidth(item, 120 + index * 320, 740, 280)),
      circle(1330, 930, 220, linear(135, style.brand, style.highlight)),
      photo('man-portrait-1', 1130, 730, 400, 400, { cornerRadius: 200 }),
    );
