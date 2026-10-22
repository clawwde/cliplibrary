import { fitWidth, page, type Template, text } from '../../../kit';
import { LANDSCAPE } from '../../../pack';
import { glow } from '../lagoon-saas-stats/listing';
import type { ListingTheme } from '../lagoon-saas-stats/theme';

const { width: W } = LANDSCAPE;

export const transformationShowcase =
  (
    theme: ListingTheme,
    copy: { title: string; note: string; stamp: string },
    top: readonly [Template, Template],
    bottom: readonly [Template, Template, Template],
  ) =>
  () =>
    page(
      theme.page,
      text(copy.title, 0, 40, W, {
        fontFamily: theme.headFont,
        fontSize: 78,
        fontWeight: 800,
        fill: theme.text,
        align: 'center',
        lineHeight: 1.1,
      }),
      text(copy.note, 0, 232, W, {
        fontFamily: theme.bodyFont,
        fontSize: 28,
        fontWeight: 500,
        fill: theme.muted,
        align: 'center',
      }),
      top.map((item, index) => fitWidth(item, 495 + index * 340, 296, 270)),
      bottom.map((item, index) => fitWidth(item, 290 + index * 365, 664, 290)),
      text(copy.stamp, 1010, 1150, 640, {
        fontFamily: theme.headFont,
        fontSize: 110,
        fontWeight: 800,
        fill: 'rgba(0,0,0,0)',
        stroke: '#ffffff',
        strokeWidth: 3,
        rotation: -22,
        ...glow('rgba(255,255,255,0.6)'),
      }),
    );
