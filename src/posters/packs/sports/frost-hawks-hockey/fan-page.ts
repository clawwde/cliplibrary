import {
  checklist,
  mosaic,
  offset,
  type PageSize,
  page,
  postInPhone,
  type SlideTheme,
  type Template,
} from '../../../kit';

export const fanPhonePage =
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
      iconColor: theme.text,
      icon: 'check',
      fontSize: size.width * 0.026,
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
