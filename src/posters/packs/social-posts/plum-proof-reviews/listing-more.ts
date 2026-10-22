import { linear } from '@/design';
import {
  card,
  circle,
  fitWidth,
  group,
  icon,
  type Nodes,
  numbered,
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

export const howItWorksPage =
  (
    style: ListingStyle,
    copy: { title: string; steps: readonly string[]; note: string },
    options: { listX?: number; aside?: Nodes[] } = {},
  ) =>
  () => {
    const listX = options.listX ?? 160;
    const gap = copy.steps.length > 3 ? 116 : 150;
    return page(
      style.background,
      text(copy.title, listX - 40, 90, 1200, {
        fontFamily: style.head,
        fontSize: 92,
        fontWeight: 800,
        fill: style.text,
      }),
      card(listX - 60, 260, 1500 - listX, 700, { radius: 36 }),
      numbered(copy.steps, listX, 360, 1340 - listX, {
        fontSize: copy.steps.length > 3 ? 38 : 42,
        fontFamily: style.body,
        numberColor: style.brand,
        color: style.ink,
        gap,
      }),
      text(copy.note, listX, 860, 1400 - listX, {
        fontFamily: style.body,
        fontSize: 30,
        fontWeight: 500,
        fill: '#4b5563',
      }),
      options.aside ?? [],
    );
  };

export const bonusPage =
  (
    style: ListingStyle,
    copy: {
      offers: readonly string[];
      brandA: string;
      brandB: string;
      note: string;
      face: PosterPhotoName;
    },
  ) =>
  () =>
    page(
      style.background,
      icon('gift', 110, 70, 140, style.highlight, { strokeWidth: 1.6 }),
      text('Bonus', 270, 104, 500, {
        fontFamily: style.head,
        fontSize: 88,
        fontWeight: 800,
        fill: style.text,
      }),
      copy.offers.map((offer, index) =>
        pill(offer, 110, 290 + index * 128, {
          fill: style.brand,
          color: style.brandText,
          fontSize: 40,
          fontFamily: style.body,
          fontWeight: 700,
        }),
      ),
      circle(400, 1010, 250, linear(135, style.brand, style.folderTo)),
      photo(copy.face, 190, 800, 420, 420, { cornerRadius: 210 }),
      text(copy.brandA, 760, 790, 780, {
        fontFamily: style.head,
        fontSize: 104,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.brandB, 760, 900, 780, {
        fontFamily: style.head,
        fontSize: 104,
        fontWeight: 800,
        fill: style.highlight,
      }),
      text(copy.note, 760, 1060, 780, {
        fontFamily: style.body,
        fontSize: 26,
        fontWeight: 400,
        fill: style.muted,
      }),
    );

export const brandPage =
  (
    style: ListingStyle,
    copy: { folder: string; size: string; brandA: string; brandB: string; tagline: string },
    tiles: readonly Template[],
  ) =>
  () =>
    page(
      style.background,
      group(
        rect(120, 90, 560, 420, linear(135, style.folderFrom, style.folderTo), {
          name: 'Folder card',
          cornerRadius: 40,
          ...shadow(40, 18, 'rgba(0,0,0,0.35)'),
        }),
        icon('folder', 180, 150, 150, '#ffffff', { strokeWidth: 1.6 }),
        text(copy.folder, 360, 186, 300, {
          fontFamily: style.body,
          fontSize: 42,
          fontWeight: 600,
          fill: '#ffffff',
        }),
        text(copy.size, 360, 246, 300, {
          fontFamily: style.body,
          fontSize: 28,
          fontWeight: 500,
          fill: 'rgba(255,255,255,0.85)',
        }),
        rect(170, 360, 460, 100, 'rgba(255,255,255,0.22)', { cornerRadius: 50 }),
        rect(200, 390, 320, 40, 'rgba(0,0,0,0.35)', { cornerRadius: 20, name: 'Progress track' }),
        rect(200, 390, 250, 40, '#ffffff', { cornerRadius: 20, name: 'Progress' }),
        icon('circle-check', 545, 380, 60, '#ffffff'),
      ),
      text('This is', 790, 100, 760, {
        fontFamily: style.head,
        fontSize: 76,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.brandA, 790, 190, 760, {
        fontFamily: style.head,
        fontSize: 88,
        fontWeight: 800,
        fill: style.text,
      }),
      text(copy.brandB, 790, 290, 760, {
        fontFamily: style.head,
        fontSize: 88,
        fontWeight: 800,
        fill: style.folderFrom,
      }),
      text(copy.tagline, 790, 400, 780, {
        fontFamily: style.head,
        fontSize: 54,
        fontWeight: 700,
        fill: '#ffffff',
        ...glow,
      }),
      rect(0, 640, W, H - 640, style.strip, { name: 'Strip' }),
      tiles.slice(0, 5).map((item, index) => {
        const x = 34 + index * 312;
        return [
          rect(x - 6, 684, 296, 366, style.brand, { cornerRadius: 14, name: 'Selection' }),
          fitWidth(item, x, 690, 284),
          icon('bookmark', x, 1072, 28, '#6b7280'),
          text(String(index + 1), x + 36, 1070, 60, {
            fontFamily: style.body,
            fontSize: 26,
            fontWeight: 600,
            fill: '#6b7280',
          }),
        ];
      }),
    );
