import { linear } from '@/design';
import {
  card,
  circle,
  fitBox,
  group,
  icon,
  numbered,
  page,
  photo,
  pill,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import type { PosterPhotoName } from '../../../photos';

export interface ListingTheme {
  page: string;
  brand: string;
  brandDeep: string;
  brandText: string;
  onBrand: string;
  accent: string;
  glow: string;
  glowDeep: string;
  ink: string;
  muted: string;
  headFont: string;
  bodyFont: string;
  headWidth: number;
  bodyWidth: number;
}

export interface ListingCopy {
  kicker: string;
  title: string;
  line: readonly [string, string];
  count: string;
  showcase: readonly [string, string];
  showcaseNote: string;
  handle: string;
  steps: readonly string[];
  stepsNote: string;
  offers: readonly string[];
  offerNote: string;
  studio: readonly [string, string];
  folder: string;
  host: PosterPhotoName;
}

export interface ListingTemplates {
  posts: readonly [Template, Template, Template, Template, Template];
  story: Template;
  feature: Template;
  edits: readonly [readonly [Template, Template], readonly [Template, Template]];
}

const { width: W } = LANDSCAPE;

export const howItWorks = (theme: ListingTheme, copy: ListingCopy) => () =>
  page(
    theme.page,
    text('How it works?', 120, 90, 1200, {
      fontFamily: theme.headFont,
      fontSize: 92,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    card(120, 260, 1100, 640, { radius: 36 }),
    numbered(copy.steps, 200, 360, 980, {
      fontSize: 44,
      fontFamily: theme.bodyFont,
      color: theme.ink,
      numberColor: theme.brandText,
      gap: 120,
    }),
    text(copy.stepsNote, 200, 790, 980, {
      fontFamily: theme.bodyFont,
      fontSize: 30,
      fontWeight: 500,
      fill: '#4b5563',
    }),
    icon('mouse', 1290, 480, 180, theme.accent, { strokeWidth: 1.5 }),
  );

export const bonus = (theme: ListingTheme, copy: ListingCopy) => () =>
  page(
    theme.page,
    icon('gift', 110, 70, 150, theme.accent, { strokeWidth: 1.6 }),
    text('Bonus', 280, 110, 500, {
      fontFamily: theme.headFont,
      fontSize: 90,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    copy.offers.map((offer, index) =>
      pill(offer, 110, 300 + index * 130, {
        fill: linear(90, theme.brand, theme.brandDeep),
        fontSize: 40,
        fontFamily: theme.bodyFont,
        fontWeight: 700,
        color: theme.onBrand,
      }),
    ),
    circle(400, 1010, 250, linear(135, theme.brand, theme.glow)),
    photo(copy.host, 190, 800, 420, 420, { cornerRadius: 210 }),
    text(copy.studio[0], 760, 800, 800, {
      fontFamily: theme.headFont,
      fontSize: 110,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(copy.studio[1], 760, 910, 800, {
      fontFamily: theme.headFont,
      fontSize: 110,
      fontWeight: 800,
      fill: theme.glow,
    }),
    text(copy.offerNote, 760, 1060, 780, {
      fontFamily: theme.bodyFont,
      fontSize: 26,
      fontWeight: 400,
      fill: '#9ca3af',
    }),
  );

export const studio = (theme: ListingTheme, copy: ListingCopy, set: ListingTemplates) => () =>
  page(
    theme.page,
    group(
      rect(120, 90, 560, 420, linear(135, theme.glow, theme.glowDeep), {
        cornerRadius: 40,
        ...shadow(40, 18, 'rgba(0,0,0,0.45)'),
      }),
      icon('folder', 180, 160, 140, '#ffffff', { strokeWidth: 1.6 }),
      text(copy.folder, 360, 190, 300, {
        fontFamily: theme.bodyFont,
        fontSize: 44,
        fontWeight: 600,
        fill: '#ffffff',
      }),
      text('24.6 MB', 360, 250, 300, {
        fontFamily: theme.bodyFont,
        fontSize: 28,
        fontWeight: 500,
        fill: 'rgba(255,255,255,0.8)',
      }),
      rect(180, 380, 400, 44, 'rgba(0,0,0,0.22)', { cornerRadius: 22, name: 'Progress track' }),
      rect(180, 380, 320, 44, '#ffffff', { cornerRadius: 22, name: 'Progress' }),
      icon('circle-check', 510, 300, 70, '#ffffff'),
    ),
    text('This is', 800, 110, 760, {
      fontFamily: theme.headFont,
      fontSize: 70,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(copy.studio[0], 800, 200, 760, {
      fontFamily: theme.headFont,
      fontSize: 90,
      fontWeight: 800,
      fill: '#ffffff',
    }),
    text(copy.studio[1], 800, 300, 760, {
      fontFamily: theme.headFont,
      fontSize: 90,
      fontWeight: 800,
      fill: theme.glow,
    }),
    text('More than a template', 800, 420, 760, {
      fontFamily: theme.headFont,
      fontSize: 52,
      fontWeight: 700,
      fill: '#ffffff',
      ...shadow(16, 0, 'rgba(255,255,255,0.45)'),
    }),
    rect(0, 640, W, 560, '#f1f1f5', { name: 'Strip' }),
    set.posts.map((item, index) => [
      rect(36 + index * 312, 680, 280, 350, '#ffffff', {
        cornerRadius: 14,
        stroke: theme.brand,
        strokeWidth: 4,
      }),
      fitBox(item, 40 + index * 312, 684, 272, 342),
      icon('heart', 44 + index * 312, 1050, 26, '#6b7280'),
      text(String(index + 1), 80 + index * 312, 1050, 60, {
        fontFamily: theme.bodyFont,
        fontSize: 24,
        fontWeight: 600,
        fill: '#6b7280',
      }),
    ]),
  );
