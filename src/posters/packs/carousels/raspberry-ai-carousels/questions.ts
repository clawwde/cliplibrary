import { circle, icon, rect, type Template, template, text } from '../../../kit';
import { BERRY, berryBackground, brandMark, FONT, H, swipeFooter, W } from './palette';

const questionsCover = template(W, H, () => [
  berryBackground(),
  brandMark(0, 330, 'center'),
  text('AI is rewriting the\nrules of marketing.', 60, 530, 960, {
    fontFamily: FONT,
    fontSize: 80,
    fontWeight: 800,
    fill: BERRY.white,
    align: 'center',
    lineHeight: 1.18,
  }),
  rect(160, 840, 760, 110, 'rgba(255,255,255,0.14)', {
    cornerRadius: 55,
    stroke: BERRY.white,
    strokeWidth: 4,
    name: 'Search bar',
  }),
  text('Top 5 questions about AI |', 210, 873, 520, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 600,
    fill: BERRY.white,
  }),
  rect(770, 852, 136, 86, BERRY.white, { cornerRadius: 43, name: 'Search button' }),
  icon('arrow-right', 806, 863, 64, BERRY.hot, { strokeWidth: 2.6 }),
  swipeFooter(),
]);

const questionSlide = (number: number, question: string, body: string) =>
  template(W, H, () => [
    berryBackground(),
    rect(60, 250, 1020, 760, 'rgba(255,255,255,0.08)', {
      cornerRadius: 44,
      stroke: 'rgba(255,255,255,0.55)',
      strokeWidth: 4,
      name: 'Panel',
    }),
    circle(190, 250, 64, BERRY.white),
    text(`#${number}`, 126, 224, 128, {
      fontFamily: FONT,
      fontSize: 44,
      fontWeight: 800,
      fill: BERRY.hot,
      align: 'center',
    }),
    text(question, 120, 380, 900, {
      fontFamily: FONT,
      fontSize: 66,
      fontWeight: 800,
      fill: BERRY.white,
      lineHeight: 1.15,
    }),
    rect(120, 660, 820, 220, BERRY.white, { cornerRadius: 12, name: 'Answer box' }),
    text(body, 150, 690, 760, {
      fontFamily: FONT,
      fontSize: 40,
      fontWeight: 500,
      fill: BERRY.ink,
      lineHeight: 1.4,
    }),
    swipeFooter(),
  ]);

export const QUESTION_SERIES: readonly Template[] = [
  questionsCover,
  questionSlide(
    1,
    'Will AI Replace\nMarketers?',
    'Not the good ones. It takes the busywork so people can focus on ideas, taste and trust.',
  ),
  questionSlide(
    2,
    'Are You Working\nWith It, or Against It?',
    'Teams that pair tools with judgment ship faster. Pick one task and try it this week.',
  ),
  questionSlide(
    3,
    'Is AI Making Us\nSmarter or Lazier?',
    'It depends on the habit. Use it to think deeper and check every answer it gives.',
  ),
  questionSlide(
    4,
    'Where Should\nYou Start?',
    'Start with the task you repeat most. Automate it, measure it, then pick the next.',
  ),
];
