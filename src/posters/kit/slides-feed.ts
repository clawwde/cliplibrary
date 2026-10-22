import { linear } from '@/design';
import { checklist, offset } from './blocks';
import { phone, phoneScreen } from './devices';
import { circle, icon, type Nodes, page, rect, text } from './elements';
import { body, heading } from './slide-text';
import {
  cycle,
  fitBox,
  fitWidth,
  type PageSize,
  type SlideTheme,
  scaledHeight,
  type Template,
} from './template';

export const mosaic = (
  size: PageSize,
  templates: readonly Template[],
  options: {
    columns?: number;
    gap?: number;
    offsetX?: number;
    offsetY?: number;
    start?: number;
  } = {},
): Nodes[] => {
  const columns = options.columns ?? 5;
  const gap = options.gap ?? 14;
  const tileWidth = (size.width - gap * (columns + 1)) / columns;
  const first = cycle(templates, 0);
  const tileHeight = scaledHeight(first, tileWidth);
  const rows = Math.ceil(size.height / (tileHeight + gap)) + 1;
  return Array.from({ length: rows * columns }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const item = cycle(templates, index + (options.start ?? 0));
    return fitBox(
      item,
      gap + column * (tileWidth + gap) + (options.offsetX ?? 0),
      gap + row * (tileHeight + gap) + (options.offsetY ?? 0),
      tileWidth,
      tileHeight,
    );
  });
};

export const mosaicCover =
  (
    size: PageSize,
    theme: SlideTheme,
    templates: readonly Template[],
    overlay: Nodes[] = [],
    options: { columns?: number; dim?: number } = {},
  ) =>
  () =>
    page(
      theme.background,
      mosaic(size, templates, { columns: options.columns ?? 5 }),
      (options.dim ?? 0) > 0
        ? rect(0, 0, size.width, size.height, `rgba(0,0,0,${options.dim})`, { name: 'Dim' })
        : [],
      overlay,
    );

export const postInPhone = (
  x: number,
  y: number,
  width: number,
  item: Template,
  theme: SlideTheme,
  handle: string,
) => {
  const screen = phoneScreen(width);
  const top = screen.height * 0.12;
  return phone(x, y, width, {
    screen: '#ffffff',
    body: '#e5e7eb',
    content: [
      circle(screen.width * 0.09, top * 0.62, screen.width * 0.04, theme.brand),
      text(handle, screen.width * 0.16, top * 0.5, screen.width * 0.7, {
        fontSize: screen.width * 0.045,
        fontWeight: 600,
        fill: '#111827',
      }),
      fitWidth(item, 0, top, screen.width),
      rect(
        screen.width * 0.06,
        top + scaledHeight(item, screen.width) + screen.width * 0.06,
        screen.width * 0.5,
        screen.width * 0.03,
        '#e5e7eb',
        { cornerRadius: 6, name: 'Caption line' },
      ),
      rect(
        screen.width * 0.06,
        top + scaledHeight(item, screen.width) + screen.width * 0.12,
        screen.width * 0.7,
        screen.width * 0.03,
        '#e5e7eb',
        { cornerRadius: 6, name: 'Caption line' },
      ),
    ],
  });
};

export const phoneTrio =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { title: string; subtitle: string; handle: string },
    templates: readonly [Template, Template, Template],
  ) =>
  () => {
    const width = size.width * 0.25;
    const y = size.height * 0.27;
    return page(
      theme.background,
      heading(
        theme,
        copy.title,
        size.width * 0.08,
        size.height * 0.07,
        size.width * 0.84,
        size.width * 0.042,
      ),
      body(
        theme,
        copy.subtitle,
        size.width * 0.08,
        size.height * 0.07 + size.width * 0.06,
        size.width * 0.84,
        size.width * 0.03,
      ),
      templates.map((item, index) =>
        postInPhone(
          size.width * 0.085 + index * size.width * 0.29,
          y - (index === 1 ? size.height * 0.02 : 0),
          width,
          item,
          theme,
          copy.handle,
        ),
      ),
    );
  };

export const phoneWithMosaic =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { handle: string; bullets: readonly string[] },
    hero: Template,
    side: readonly Template[],
  ) =>
  () => {
    const columnX = size.width * 0.62;
    return page(
      theme.background,
      offset(
        columnX,
        0,
        mosaic({ width: size.width * 0.4, height: size.height }, side, { columns: 2, start: 1 }),
      ),
      postInPhone(
        size.width * 0.1,
        size.height * 0.06,
        size.width * 0.36,
        hero,
        theme,
        copy.handle,
      ),
      checklist(copy.bullets, size.width * 0.08, size.height * 0.76, size.width * 0.5, {
        color: theme.text,
        iconColor: theme.text,
        icon: 'check',
        fontSize: size.width * 0.026,
        gap: size.width * 0.045,
      }),
    );
  };

export const beforeAfter =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { title: string; body: string; before?: string; after?: string },
    before: Template,
    after: Template,
  ) =>
  () => {
    const cardWidth = size.width * 0.34;
    const cardHeight = size.height * 0.48;
    const y = size.height * 0.42;
    return page(
      theme.background,
      heading(theme, copy.title, 0, size.height * 0.07, size.width, size.width * 0.048, 'center'),
      body(
        theme,
        copy.body,
        size.width * 0.15,
        size.height * 0.07 + size.width * 0.055,
        size.width * 0.7,
        size.width * 0.026,
        'center',
      ),
      text(copy.before ?? 'Before:', size.width * 0.12, y - size.height * 0.07, cardWidth, {
        fontFamily: theme.headFont,
        fontSize: size.width * 0.03,
        fontWeight: 600,
        fill: theme.text,
        align: 'center',
      }),
      text(copy.after ?? 'After:', size.width * 0.54, y - size.height * 0.07, cardWidth, {
        fontFamily: theme.headFont,
        fontSize: size.width * 0.03,
        fontWeight: 600,
        fill: theme.text,
        align: 'center',
      }),
      fitBox(before, size.width * 0.12, y, cardWidth, cardHeight),
      icon(
        'arrow-right',
        size.width * 0.47,
        y + cardHeight / 2 - size.width * 0.025,
        size.width * 0.05,
        theme.text,
        { strokeWidth: 2.5 },
      ),
      fitBox(after, size.width * 0.54, y, cardWidth, cardHeight),
    );
  };

export const canvasSizes =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: {
      title: string;
      postLabel: string;
      storyLabel: string;
      postSize: string;
      storySize: string;
      handle: string;
    },
    post: Template,
    story: Template,
  ) =>
  () => {
    const width = size.width * 0.23;
    const storyScreen = phoneScreen(width);
    return page(
      theme.background,
      heading(theme, copy.title, 0, size.height * 0.08, size.width, size.width * 0.045, 'center'),
      body(
        theme,
        copy.postLabel,
        size.width * 0.14,
        size.height * 0.2,
        size.width * 0.3,
        size.width * 0.03,
        'center',
      ),
      body(
        theme,
        copy.storyLabel,
        size.width * 0.56,
        size.height * 0.2,
        size.width * 0.3,
        size.width * 0.03,
        'center',
      ),
      postInPhone(size.width * 0.175, size.height * 0.27, width, post, theme, copy.handle),
      phone(size.width * 0.595, size.height * 0.27, width, {
        screen: '#000000',
        content: [fitBox(story, 0, 0, storyScreen.width, storyScreen.height)],
      }),
      body(
        theme,
        copy.postSize,
        size.width * 0.14,
        size.height * 0.88,
        size.width * 0.3,
        size.width * 0.026,
        'center',
      ),
      body(
        theme,
        copy.storySize,
        size.width * 0.56,
        size.height * 0.88,
        size.width * 0.3,
        size.width * 0.026,
        'center',
      ),
    );
  };

export const profileFeed =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { handle: string; bio: string; button: string },
    templates: readonly Template[],
  ) =>
  () => {
    const width = size.width * 0.36;
    const screen = phoneScreen(width);
    const cell = screen.width / 3;
    const gridTop = screen.height * 0.42;
    return page(
      theme.background,
      mosaic(size, templates, { columns: 6 }),
      rect(0, 0, size.width, size.height, 'rgba(255,255,255,0.55)', { name: 'Haze' }),
      phone(size.width * 0.32, size.height * 0.08, width, {
        screen: '#ffffff',
        rotation: -12,
        content: [
          circle(
            screen.width * 0.16,
            screen.height * 0.16,
            screen.width * 0.1,
            linear(135, theme.brand, theme.accent),
          ),
          text(copy.handle, screen.width * 0.06, screen.height * 0.23, screen.width * 0.8, {
            fontSize: screen.width * 0.05,
            fontWeight: 700,
            fill: '#111827',
          }),
          text(copy.bio, screen.width * 0.06, screen.height * 0.27, screen.width * 0.86, {
            fontSize: screen.width * 0.035,
            fontWeight: 400,
            fill: '#4b5563',
            lineHeight: 1.3,
          }),
          rect(
            screen.width * 0.06,
            screen.height * 0.35,
            screen.width * 0.42,
            screen.height * 0.035,
            theme.brand,
            { cornerRadius: 10, name: 'Follow button' },
          ),
          text(copy.button, screen.width * 0.06, screen.height * 0.357, screen.width * 0.42, {
            fontSize: screen.width * 0.035,
            fontWeight: 700,
            fill: '#ffffff',
            align: 'center',
          }),
          Array.from({ length: 9 }, (_, index) =>
            fitBox(
              cycle(templates, index),
              (index % 3) * cell,
              gridTop + Math.floor(index / 3) * cell,
              cell - 3,
              cell - 3,
            ),
          ),
        ],
      }),
    );
  };
