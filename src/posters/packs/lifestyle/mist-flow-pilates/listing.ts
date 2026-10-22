import { linear, type Page } from '@/design';
import {
  checklist,
  group,
  icon,
  mosaic,
  type Nodes,
  offset,
  type PageSize,
  page,
  postInPhone,
  rect,
  type SlideTheme,
  shadow,
  type Template,
} from '../../../kit';

export const withNodes =
  (build: () => Page, ...nodes: Nodes[]) =>
  () => {
    const base = build();
    return page(base.background, base.elements, nodes);
  };

export const editorBadge = (x: number, y: number, size: number, from: string, to: string) =>
  group(
    rect(x, y, size, size, linear(135, from, to), {
      name: 'Editor badge',
      cornerRadius: size * 0.26,
      ...shadow(size * 0.2, size * 0.08),
    }),
    icon('wand-sparkles', x + size * 0.25, y + size * 0.25, size * 0.5, '#ffffff'),
  );

export const phoneChecklist =
  (
    size: PageSize,
    theme: SlideTheme,
    copy: { handle: string; bullets: readonly [string, string, string, string] },
    hero: Template,
    side: readonly Template[],
  ) =>
  () => {
    const [first, second, third, fourth] = copy.bullets;
    const listStyle = {
      color: theme.text,
      iconColor: theme.brand,
      icon: 'check',
      fontSize: size.width * 0.023,
      gap: size.width * 0.05,
    } as const;
    return page(
      theme.background,
      offset(
        size.width * 0.62,
        0,
        mosaic({ width: size.width * 0.4, height: size.height }, side, { columns: 2, start: 1 }),
      ),
      postInPhone(
        size.width * 0.12,
        size.height * 0.06,
        size.width * 0.33,
        hero,
        theme,
        copy.handle,
      ),
      checklist(
        [first, second],
        size.width * 0.06,
        size.height * 0.83,
        size.width * 0.28,
        listStyle,
      ),
      checklist(
        [third, fourth],
        size.width * 0.34,
        size.height * 0.83,
        size.width * 0.28,
        listStyle,
      ),
    );
  };
