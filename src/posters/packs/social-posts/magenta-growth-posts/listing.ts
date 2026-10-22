import { linear } from '@/design';
import {
  circle,
  fitBox,
  fitWidth,
  group,
  icon,
  line,
  mosaic,
  page,
  rect,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { LANDSCAPE } from '../../../pack';

export const LISTING = {
  background: linear(135, '#2b0d3f', '#6a1f72', '#b0306f'),
  ink: '#140f1c',
  text: '#ffffff',
  muted: '#f3d6ea',
  brand: '#e11d74',
  soft: '#ffd1e6',
  head: 'Poppins',
};

export const { width: W, height: H } = LANDSCAPE;

export const glow = shadow(30, 0, 'rgba(255,255,255,0.45)');

const editorBadge = (x: number, y: number, size: number) =>
  group(
    rect(x, y, size, size, linear(135, '#ff7ab6', '#7c3aed'), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.2, size * 0.08),
    }),
    icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, '#ffffff'),
  );

export const coverMosaic = (tiles: readonly Template[]) => () =>
  page(LISTING.ink, mosaic(LANDSCAPE, tiles, { columns: 5, gap: 18, offsetY: -110 }));

export const ideasGrid =
  (copy: { title: string; subtitle: string }, tiles: readonly Template[]) => () =>
    page(
      LISTING.background,
      text(copy.title, 0, 50, W, {
        fontFamily: LISTING.head,
        fontSize: 70,
        fontWeight: 800,
        fill: LISTING.text,
        align: 'center',
        lineHeight: 1.1,
        ...glow,
      }),
      text(copy.subtitle, 0, 232, W, {
        fontFamily: LISTING.head,
        fontSize: 32,
        fontWeight: 500,
        fill: LISTING.muted,
        align: 'center',
      }),
      tiles
        .slice(0, 10)
        .map((item, index) =>
          fitWidth(item, 26 + (index % 5) * 314, 330 + Math.floor(index / 5) * 432, 290),
        ),
    );

const swapRow = (y: number, before: Template, after: Template) => [
  fitBox(before, 760, y, 320, 400),
  circle(1180, y + 200, 54, '#ffffff', shadow(20, 6)),
  icon('arrow-right', 1151, y + 171, 58, LISTING.brand, { strokeWidth: 3 }),
  fitBox(after, 1270, y, 320, 400),
];

export const customizePage =
  (first: readonly [Template, Template], second: readonly [Template, Template]) => () =>
    page(
      LISTING.background,
      editorBadge(40, 40, 130),
      text('Customize\nin Minutes', 90, 280, 640, {
        fontFamily: LISTING.head,
        fontSize: 96,
        fontWeight: 800,
        fill: LISTING.text,
        lineHeight: 1.08,
      }),
      text('100% Editable', 90, 500, 640, {
        fontFamily: LISTING.head,
        fontSize: 46,
        fontWeight: 700,
        fill: LISTING.soft,
      }),
      line(90, 640, 560, LISTING.text, 4, { dashed: true }),
      text('Editable social templates\nthat work right in the\nbuilt-in editor', 90, 700, 640, {
        fontFamily: LISTING.head,
        fontSize: 40,
        fontWeight: 600,
        fill: LISTING.text,
        lineHeight: 1.35,
      }),
      swapRow(130, first[0], first[1]),
      swapRow(670, second[0], second[1]),
    );
