import { circle, icon, rect, type Template, template, text } from '../../../kit';
import { BERRY, berryBackground, brandMark, FONT, H, swipeFooter, W } from './palette';

const shiftsCover = template(W, H, () => [
  berryBackground(),
  rect(60, 250, 1020, 230, BERRY.ink, { cornerRadius: 34, name: 'Number box' }),
  text('5 Shifts', 110, 282, 900, {
    fontFamily: FONT,
    fontSize: 150,
    fontWeight: 800,
    fill: BERRY.hot,
    lineHeight: 1.05,
  }),
  text('AI Is Reshaping\nMarketing in 2026', 80, 560, 920, {
    fontFamily: FONT,
    fontSize: 78,
    fontWeight: 800,
    fill: BERRY.white,
    lineHeight: 1.15,
  }),
  text('It is not replacing marketers.\nIt is upgrading them.', 80, 780, 900, {
    fontFamily: FONT,
    fontSize: 40,
    fontWeight: 500,
    fill: BERRY.blush,
    lineHeight: 1.4,
  }),
  brandMark(80, 1140),
  circle(950, 1170, 60, BERRY.ink),
  icon('chevron-right', 915, 1135, 70, BERRY.white, { strokeWidth: 2.6 }),
]);

const shiftSlide = (number: string, title: string, body: string, dark: boolean) =>
  template(W, H, () => [
    berryBackground(),
    rect(60, 250, 340, 230, dark ? BERRY.ink : BERRY.white, {
      cornerRadius: 34,
      name: 'Number box',
    }),
    text(number, 60, 282, 340, {
      fontFamily: FONT,
      fontSize: 150,
      fontWeight: 800,
      fill: dark ? BERRY.hot : BERRY.deep,
      align: 'center',
      lineHeight: 1.05,
    }),
    rect(900, 250, 180, 230, dark ? BERRY.white : BERRY.ink, {
      cornerRadius: 34,
      name: 'Next box',
    }),
    text(title, 80, 580, 920, {
      fontFamily: FONT,
      fontSize: 84,
      fontWeight: 800,
      fill: BERRY.white,
      lineHeight: 1.15,
    }),
    text(body, 80, 820, 860, {
      fontFamily: FONT,
      fontSize: 46,
      fontWeight: 500,
      fill: BERRY.blush,
      lineHeight: 1.4,
    }),
    swipeFooter(),
  ]);

export const SHIFT_SERIES: readonly Template[] = [
  shiftsCover,
  shiftSlide(
    '01',
    'One-to-One\nat Scale',
    'Smart tools tailor every message to each customer as they browse.',
    true,
  ),
  shiftSlide(
    '02',
    'Sharper Ad\nTargeting',
    'Models learn who converts and move budget to the best audiences on their own.',
    false,
  ),
  shiftSlide(
    '03',
    'Predictive\nInsights',
    'Forecasts show what your audience will want next, before they ask for it.',
    true,
  ),
  shiftSlide(
    '04',
    'Content on\nDemand',
    'Drafts, captions and variations in minutes, ready for a human polish.',
    false,
  ),
];
