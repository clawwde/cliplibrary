import { linear } from '@/design';
import {
  card,
  circle,
  cycle,
  fitBox,
  fitWidth,
  group,
  icon,
  line,
  type Nodes,
  page,
  photo,
  pill,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';
import { glow, H, type ListingStyle, W } from './listing';

const swapRow = (y: number, before: Template, after: Template, style: ListingStyle) => [
  fitBox(before, 640, y, 330, 413),
  circle(1090, y + 206, 56, '#ffffff', shadow(20, 6)),
  icon('arrow-right', 1060, y + 176, 60, style.brand, { strokeWidth: 3 }),
  fitBox(after, 1210, y, 330, 413),
];

export const editablePage =
  (
    style: ListingStyle,
    first: readonly [Template, Template],
    second: readonly [Template, Template],
  ) =>
  () =>
    page(
      style.background,
      text('Editable\nSocial Post\nTemplates\nOnline', 90, 140, 540, {
        fontFamily: style.head,
        fontSize: 76,
        fontWeight: 800,
        fill: style.text,
        lineHeight: 1.12,
      }),
      line(90, 600, 470, style.text, 4, { dashed: true }),
      text('Customize in\nMinutes', 90, 650, 520, {
        fontFamily: style.body,
        fontSize: 52,
        fontWeight: 600,
        fill: style.text,
        lineHeight: 1.25,
      }),
      text('100% Editable', 90, 790, 520, {
        fontFamily: style.body,
        fontSize: 46,
        fontWeight: 700,
        fill: style.brand,
      }),
      swapRow(110, first[0], first[1], style),
      swapRow(660, second[0], second[1], style),
    );

export const howItWorksPage =
  (style: ListingStyle, steps: readonly [string, string, string], note: string) => () =>
    page(
      style.background,
      text('How it works?', 120, 80, 1200, {
        fontFamily: style.head,
        fontSize: 96,
        fontWeight: 800,
        fill: style.text,
      }),
      card(120, 260, 1360, 820, { radius: 40 }),
      steps.map((step, index) => [
        text(String(index + 1).padStart(2, '0'), 210, 370 + index * 170, 140, {
          fontFamily: style.head,
          fontSize: 76,
          fontWeight: 800,
          fill: style.brand,
        }),
        text(step, 360, 388 + index * 170, 1040, {
          fontFamily: style.head,
          fontSize: 44,
          fontWeight: 700,
          fill: style.ink,
        }),
      ]),
      line(210, 900, 1180, '#e5e7eb', 3),
      text(note, 210, 945, 1180, {
        fontFamily: style.body,
        fontSize: 32,
        fontWeight: 500,
        fill: '#4b5563',
      }),
    );

export const bonusPage =
  (
    style: ListingStyle,
    copy: {
      offers: readonly [string, string, string];
      brandA: string;
      brandB: string;
      note: string;
      photo: PosterPhotoName;
    },
  ) =>
  () =>
    page(
      style.background,
      icon('gift', 120, 70, 140, style.brand, { strokeWidth: 1.6 }),
      text('Bonus', 290, 112, 500, {
        fontFamily: style.head,
        fontSize: 92,
        fontWeight: 800,
        fill: style.text,
      }),
      copy.offers.map((offer, index) =>
        pill(offer, 120, 300 + index * 132, {
          fill: style.brand,
          color: style.brandText,
          fontSize: 40,
          fontFamily: style.head,
          fontWeight: 700,
        }),
      ),
      circle(380, 1010, 270, linear(135, style.brand, style.folderFrom)),
      photo(copy.photo, 170, 790, 420, 420, { cornerRadius: 210 }),
      text(copy.brandA, 720, 790, 820, {
        fontFamily: style.head,
        fontSize: 116,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.brandB, 720, 920, 820, {
        fontFamily: style.head,
        fontSize: 116,
        fontWeight: 800,
        fill: style.brand,
      }),
      text(copy.note, 720, 1080, 820, {
        fontFamily: style.body,
        fontSize: 26,
        fontWeight: 400,
        fill: style.muted,
      }),
    );

export const brandPage =
  (
    style: ListingStyle,
    copy: { folder: string; size: string; brandA: string; brandB: string },
    tiles: readonly Template[],
  ) =>
  () => {
    const thumbs: Nodes[] = [0, 1, 2, 3, 4, 5].map((index) => {
      const x = -150 + index * 332;
      return [
        fitWidth(cycle(tiles, index + tiles.length - 1), x, 672, 310),
        rect(x - 5, 667, 320, 397, 'rgba(0,0,0,0)', {
          cornerRadius: 10,
          stroke: style.brand,
          strokeWidth: 5,
          name: 'Thumbnail frame',
        }),
        icon('layers', x, 1082, 26, '#6b7280'),
        text(String(index), x + 36, 1080, 80, {
          fontFamily: style.body,
          fontSize: 26,
          fontWeight: 600,
          fill: '#6b7280',
        }),
      ];
    });
    return page(
      style.background,
      group(
        rect(150, 100, 600, 440, linear(135, style.folderFrom, style.folderTo), {
          cornerRadius: 44,
          ...shadow(50, 20, 'rgba(0,0,0,0.45)'),
          name: 'Folder card',
        }),
        icon('folder', 210, 160, 150, '#ffffff', { strokeWidth: 1.5 }),
        text(copy.folder, 400, 190, 330, {
          fontFamily: style.body,
          fontSize: 46,
          fontWeight: 600,
          fill: '#ffffff',
        }),
        text(copy.size, 400, 256, 330, {
          fontFamily: style.body,
          fontSize: 28,
          fontWeight: 500,
          fill: 'rgba(255,255,255,0.8)',
        }),
        rect(190, 390, 520, 100, 'rgba(255,255,255,0.2)', { cornerRadius: 50, name: 'Bar pill' }),
        rect(225, 420, 380, 40, 'rgba(0,0,0,0.3)', { cornerRadius: 20, name: 'Progress track' }),
        rect(225, 420, 270, 40, '#ffffff', { cornerRadius: 20, name: 'Progress' }),
        icon('circle-check', 625, 410, 60, '#ffffff', { strokeWidth: 2.2 }),
      ),
      text('This is', 830, 100, 720, {
        fontFamily: style.head,
        fontSize: 76,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.brandA, 830, 190, 720, {
        fontFamily: style.head,
        fontSize: 96,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.brandB, 830, 300, 720, {
        fontFamily: style.head,
        fontSize: 96,
        fontWeight: 800,
        fill: style.brand,
      }),
      text('More Than a Template', 830, 420, 740, {
        fontFamily: style.head,
        fontSize: 58,
        fontWeight: 800,
        fill: style.text,
        ...glow,
      }),
      rect(0, 620, W, H - 620, style.strip, { name: 'Strip' }),
      thumbs,
    );
  };
