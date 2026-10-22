import { linear, radial } from '@/design';
import { card, numbered, pill } from './blocks';
import { laptop } from './devices';
import { circle, icon, page, polygon, rect, text } from './elements';
import { body, heading } from './slide-text';
import {
  cycle,
  fitBox,
  type PageSize,
  type SlideTheme,
  scaledHeight,
  type Template,
} from './template';

export interface DecorationPalette {
  primary: string;
  secondary: string;
}

const DEFAULT_DECORATION: DecorationPalette = { primary: '#ff5fa8', secondary: '#f59e0b' };

export const decorations = (
  size: PageSize,
  hole = '#000000',
  palette: DecorationPalette = DEFAULT_DECORATION,
) => [
  circle(
    size.width * 0.86,
    -size.width * 0.02,
    size.width * 0.12,
    radial(palette.primary, palette.secondary),
    {
      name: 'Donut',
    },
  ),
  circle(size.width * 0.86, -size.width * 0.02, size.width * 0.05, hole, {
    name: 'Donut hole',
  }),
  polygon(
    3,
    -size.width * 0.03,
    -size.width * 0.02,
    size.width * 0.14,
    size.width * 0.14,
    linear(160, palette.primary, palette.secondary),
    { rotation: 30, name: 'Cone' },
  ),
  rect(
    size.width * 0.04,
    size.height * 0.84,
    size.width * 0.13,
    size.width * 0.13,
    linear(150, palette.secondary, palette.primary),
    { cornerRadius: size.width * 0.03, rotation: -18, name: 'Cube' },
  ),
  polygon(
    3,
    size.width * 0.8,
    size.height * 0.82,
    size.width * 0.16,
    size.width * 0.16,
    linear(140, palette.primary, palette.secondary),
    { rotation: -14, name: 'Pyramid' },
  ),
];

export const editableLaptop =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { title: string; body: string },
    templates: readonly Template[],
  ) =>
  () => {
    const width = size.width * 0.62;
    const screenWidth = width * 0.95;
    const screenHeight = width * 0.57;
    const cell = screenWidth / 6;
    return page(
      theme.background,
      decorations(size, typeof theme.background === 'string' ? theme.background : '#000000', {
        primary: theme.accent,
        secondary: theme.brand,
      }),
      text(copy.title, 0, size.height * 0.2, size.width, {
        fontFamily: theme.headFont,
        fontSize: size.width * 0.046,
        fontWeight: 700,
        fill: theme.accent,
        align: 'center',
      }),
      body(
        theme,
        copy.body,
        size.width * 0.18,
        size.height * 0.2 + size.width * 0.05,
        size.width * 0.64,
        size.width * 0.026,
        'center',
      ),
      laptop(size.width * 0.19, size.height * 0.46, width, {
        screen: '#f8fafc',
        content: [
          rect(0, 0, screenWidth, screenHeight * 0.08, theme.brand, { name: 'Editor bar' }),
          Array.from({ length: 12 }, (_, index) =>
            fitBox(
              cycle(templates, index),
              (index % 6) * cell + cell * 0.08,
              screenHeight * 0.14 + Math.floor(index / 6) * cell * 1.3,
              cell * 0.84,
              cell * 1.15,
            ),
          ),
        ],
      }),
    );
  };

export const howToStart =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: {
      title: string;
      steps: readonly { icon: Parameters<typeof icon>[0]; title: string; body: string }[];
    },
  ) =>
  () => {
    const column = size.width / (copy.steps.length + 1);
    return page(
      theme.background,
      decorations(size, typeof theme.background === 'string' ? theme.background : '#000000', {
        primary: theme.accent,
        secondary: theme.brand,
      }),
      heading(theme, copy.title, 0, size.height * 0.24, size.width, size.width * 0.05, 'center'),
      copy.steps.map((step, index) => {
        const cx = column * (index + 1);
        return [
          icon(
            step.icon,
            cx - size.width * 0.04,
            size.height * 0.4,
            size.width * 0.08,
            theme.accent,
            { strokeWidth: 1.8 },
          ),
          text(step.title, cx - column * 0.45, size.height * 0.56, column * 0.9, {
            fontFamily: theme.headFont,
            fontSize: size.width * 0.026,
            fontWeight: 700,
            fill: theme.text,
            align: 'center',
          }),
          body(
            theme,
            step.body,
            cx - column * 0.45,
            size.height * 0.6,
            column * 0.9,
            size.width * 0.02,
            'center',
          ),
        ];
      }),
    );
  };

export const stepsCard =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { title: string; steps: readonly string[]; note: string },
  ) =>
  () =>
    page(
      theme.background,
      heading(
        theme,
        copy.title,
        size.width * 0.075,
        size.height * 0.08,
        size.width * 0.8,
        size.width * 0.055,
      ),
      card(size.width * 0.075, size.height * 0.24, size.width * 0.7, size.height * 0.62, {
        fill: theme.surface,
        radius: 36,
      }),
      numbered(copy.steps, size.width * 0.125, size.height * 0.32, size.width * 0.6, {
        fontSize: size.width * 0.026,
        color: theme.ink,
        numberColor: theme.brand,
        gap: size.height * 0.11,
      }),
      text(copy.note, size.width * 0.125, size.height * 0.74, size.width * 0.6, {
        fontFamily: theme.bodyFont,
        fontSize: size.width * 0.018,
        fontWeight: 500,
        fill: '#6b7280',
      }),
    );

export const offerPills = (
  theme: SlideTheme,
  offers: readonly string[],
  x: number,
  y: number,
  fontSize: number,
) =>
  offers.map((offer, index) =>
    pill(offer, x, y + index * fontSize * 3.2, {
      fill: theme.brand,
      color: '#ffffff',
      fontSize,
      fontFamily: theme.bodyFont,
    }),
  );

export const slideGrid =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { title: string; footer?: string; tag?: string },
    templates: readonly Template[],
    options: { columns?: number; rows?: number; start?: number } = {},
  ) =>
  () => {
    const columns = options.columns ?? 3;
    const rows = options.rows ?? 2;
    const left = size.width * 0.06;
    const gap = size.width * 0.016;
    const cellWidth = (size.width - left * 2 - gap * (columns - 1)) / columns;
    const cellHeight = scaledHeight(cycle(templates, 0), cellWidth);
    const top = size.height * 0.22;
    return page(
      theme.background,
      heading(theme, copy.title, left, size.height * 0.08, size.width * 0.8, size.width * 0.026),
      Array.from({ length: columns * rows }, (_, index) =>
        fitBox(
          cycle(templates, index + (options.start ?? 0)),
          left + (index % columns) * (cellWidth + gap),
          top + Math.floor(index / columns) * (cellHeight + gap),
          cellWidth,
          cellHeight,
        ),
      ),
      copy.footer === undefined
        ? []
        : body(theme, copy.footer, left, size.height * 0.84, size.width * 0.4, size.width * 0.018),
      copy.tag === undefined
        ? []
        : body(
            theme,
            copy.tag,
            size.width * 0.54,
            size.height * 0.84,
            size.width * 0.4,
            size.width * 0.022,
          ),
    );
  };
