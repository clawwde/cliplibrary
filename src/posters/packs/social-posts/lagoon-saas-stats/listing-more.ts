import { linear } from '@/design';
import {
  card,
  circle,
  fitWidth,
  group,
  icon,
  page,
  photo,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import type { PosterPhotoName } from '../../../photos';
import { channelIcons, glow } from './listing';
import type { ListingCopy, ListingTheme } from './theme';

const { width: W, height: H } = LANDSCAPE;

export const howItWorksPage =
  (theme: ListingTheme, copy: ListingCopy, options: { perfectFor?: boolean } = {}) =>
  () => {
    const perfectFor = options.perfectFor ?? false;
    const top = perfectFor ? 340 : 400;
    const gap = perfectFor ? 135 : 150;
    return page(
      theme.page,
      text('How it works ?', 150, 70, 1300, {
        fontFamily: theme.headFont,
        fontSize: 100,
        fontWeight: 800,
        fill: theme.text,
      }),
      card(120, 270, 1360, 810, { radius: 28, shadowBlur: 0 }),
      copy.steps.map((step, index) => [
        text(String(index + 1).padStart(2, '0'), 190, top + index * gap, 140, {
          fontFamily: theme.headFont,
          fontSize: 70,
          fontWeight: 800,
          fill: theme.highlight,
          lineHeight: 1,
        }),
        text(step, 330, top + index * gap + 14, 1100, {
          fontFamily: theme.headFont,
          fontSize: 46,
          fontWeight: 700,
          fill: theme.ink,
        }),
      ]),
      text(copy.stepsNote, 190, top + (perfectFor ? 420 : 500), 1240, {
        fontFamily: theme.bodyFont,
        fontSize: 32,
        fontWeight: 400,
        fill: '#374151',
      }),
      perfectFor
        ? [
            text('Perfect for:', 190, 924, 320, {
              fontFamily: theme.headFont,
              fontSize: 42,
              fontWeight: 800,
              fill: theme.ink,
            }),
            channelIcons(theme, 470, 910, 70),
          ]
        : [],
    );
  };

export const bonusPage = (theme: ListingTheme, copy: ListingCopy, host: PosterPhotoName) => () => {
  return page(
    theme.page,
    group(
      rect(130, 70, 150, 150, linear(135, theme.highlight, theme.brandDeep), {
        name: 'Gift badge',
        cornerRadius: 36,
        rotation: -6,
      }),
      icon('gift', 160, 96, 96, '#ffffff', { strokeWidth: 1.8 }),
    ),
    text('Bonus', 310, 110, 500, {
      fontFamily: theme.headFont,
      fontSize: 84,
      fontWeight: 800,
      fill: theme.text,
    }),
    copy.offers.map((offer, index) => {
      const width = Math.min(1370, offer.length * 46 * 0.55 + 100);
      return [
        rect(130, 330 + index * 160, width, 104, linear(90, theme.brandDeep, theme.brand), {
          name: 'Offer pill',
          cornerRadius: 22,
        }),
        text(offer, 170, 352 + index * 160, width - 60, {
          fontFamily: theme.headFont,
          fontSize: 46,
          fontWeight: 800,
          fill: '#ffffff',
        }),
      ];
    }),
    circle(330, 985, 230, linear(135, theme.brand, theme.brandDeep), { name: 'Host halo' }),
    photo(host, 130, 785, 400, 400, { cornerRadius: 200, stroke: theme.text, strokeWidth: 8 }),
    text(copy.studio[0], 640, 850, 900, {
      fontFamily: theme.headFont,
      fontSize: 108,
      fontWeight: 800,
      fill: theme.text,
      lineHeight: 1,
    }),
    text(copy.studio[1], 640, 960, 900, {
      fontFamily: theme.headFont,
      fontSize: 108,
      fontWeight: 800,
      fill: theme.accent,
      lineHeight: 1,
    }),
    text(copy.offerNote, 640, 1100, 900, {
      fontFamily: theme.bodyFont,
      fontSize: 28,
      fontWeight: 400,
      fill: theme.muted,
    }),
  );
};

const folderCard = (theme: ListingTheme, copy: ListingCopy, x: number, y: number) =>
  group(
    rect(x, y, 580, 440, theme.folder, {
      name: 'Folder card',
      cornerRadius: 44,
      ...shadow(50, 20, 'rgba(0,0,0,0.45)'),
    }),
    rect(x + 60, y + 70, 80, 30, '#ffffff', { name: 'Folder tab', cornerRadius: 10 }),
    rect(x + 60, y + 88, 160, 112, '#ffffff', { name: 'Folder', cornerRadius: 14 }),
    rect(x + 60, y + 108, 160, 6, 'rgba(0,0,0,0.08)', { name: 'Folder crease' }),
    text(copy.folder, x + 250, y + 92, 320, {
      fontFamily: theme.bodyFont,
      fontSize: 42,
      fontWeight: 500,
      fill: '#ffffff',
    }),
    text(copy.folderSize, x + 250, y + 150, 320, {
      fontFamily: theme.bodyFont,
      fontSize: 28,
      fontWeight: 500,
      fill: 'rgba(255,255,255,0.85)',
    }),
    rect(x + 40, y + 270, 500, 120, 'rgba(255,255,255,0.22)', {
      name: 'Download panel',
      cornerRadius: 34,
      ...shadow(30, 10, 'rgba(0,0,0,0.18)'),
    }),
    rect(x + 80, y + 312, 300, 38, '#ffffff', {
      name: 'Progress track',
      cornerRadius: 19,
      stroke: 'rgba(0,0,0,0.6)',
      strokeWidth: 3,
    }),
    Array.from({ length: 8 }, (_, index) =>
      rect(x + 92 + index * 14, y + 318, 8, 26, '#111827', { name: 'Progress tick' }),
    ),
    icon('circle-check', x + 420, y + 300, 66, '#ffffff', { strokeWidth: 2.4 }),
  );

export const brandPage =
  (theme: ListingTheme, copy: ListingCopy, strip: readonly Template[] = []) =>
  () => {
    const shift = strip.length === 0 ? 300 : 0;
    const head = { fontFamily: theme.headFont, fontWeight: 800, lineHeight: 1 } as const;
    return page(
      theme.page,
      folderCard(theme, copy, 150, 110 + shift),
      text('This is', 820, 130 + shift, 760, { ...head, fontSize: 86, fill: theme.text }),
      text(copy.studio[0], 820, 232 + shift, 760, { ...head, fontSize: 86, fill: theme.text }),
      text(copy.studio[1], 820, 334 + shift, 760, { ...head, fontSize: 86, fill: theme.accent }),
      text('More Than a Template', 820, 446 + shift, 760, {
        ...head,
        fontSize: 58,
        fill: theme.text,
        ...glow('rgba(255,255,255,0.55)'),
      }),
      strip.length === 0
        ? []
        : [
            rect(0, 680, W, H - 680, '#f3f2f8', { name: 'Feed strip' }),
            strip.map((item, index) => {
              const x = -150 + index * 380;
              return [
                rect(x - 6, 714, 312, 387, theme.brand, { name: 'Post frame', cornerRadius: 14 }),
                fitWidth(item, x, 720, 300),
                icon('bookmark', x, 1124, 30, '#4b5563'),
                text(String(index + 1), x + 40, 1122, 80, {
                  fontFamily: theme.bodyFont,
                  fontSize: 28,
                  fontWeight: 500,
                  fill: '#4b5563',
                }),
              ];
            }),
          ],
    );
  };
