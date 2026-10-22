import type { DesignIconName } from '@/design';
import { circle, icon, rect, type Template, template, text } from '../../../kit';
import { BODY, bodyText, brandMark, H, HEAD, LEAF, leafBackground, titleLine, W } from './palette';

const LINE_Y = 300;

const trustCover = template(W, H, () => [
  leafBackground(),
  text("Here's how to earn it", 300, 218, 630, {
    fontFamily: BODY,
    fontSize: 42,
    fontWeight: 600,
    fill: LEAF.white,
    align: 'right',
  }),
  icon('arrow-right', 944, 218, 52, LEAF.white, { strokeWidth: 2.6 }),
  rect(0, LINE_Y - 2, W, 4, 'rgba(209,250,229,0.7)', { name: 'Line' }),
  titleLine('How to Build', 90, 420, 88, LEAF.white),
  titleLine('Lasting Trust\nWith Readers', 90, 521, 88, LEAF.mint),
  bodyText('Because attention fades,\nbut trust compounds.', 90, 800, 800),
  brandMark(90, 1170),
]);

const trustCard = (name: DesignIconName, lead: string, accent: string, body: string) =>
  template(W, H, () => [
    leafBackground(),
    rect(0, LINE_Y - 2, W, 4, 'rgba(209,250,229,0.7)', { name: 'Line' }),
    rect(150, 440, 780, 720, 'rgba(255,255,255,0.04)', {
      cornerRadius: 40,
      stroke: 'rgba(209,250,229,0.75)',
      strokeWidth: 4,
      name: 'Panel',
    }),
    circle(540, LINE_Y, 72, LEAF.white),
    icon(name, 505, LINE_Y - 35, 70, LEAF.mid, { strokeWidth: 2 }),
    text(lead, 150, 560, 780, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 700,
      fill: LEAF.white,
      align: 'center',
    }),
    text(accent, 150, 645, 780, {
      fontFamily: HEAD,
      fontSize: 66,
      fontWeight: 700,
      fill: LEAF.mint,
      align: 'center',
    }),
    bodyText(body, 210, 790, 660, 'center'),
  ]);

export const TRUST_SERIES: readonly Template[] = [
  trustCover,
  trustCard(
    'calendar-days',
    'Show Up Often,',
    'Not Loudly',
    'Trust grows when your tone, timing and values stay steady. Consistency beats volume.',
  ),
  trustCard(
    'send',
    'Share the',
    'Real Process',
    'Show the drafts, the lessons and the misses. Honesty turns content into connection.',
  ),
  trustCard(
    'lightbulb',
    'Teach First,',
    'Sell Second',
    'When you teach, people lean in. Pitch too early and they scroll right past.',
  ),
  trustCard(
    'badge-check',
    'Prove It',
    'With Results',
    'Back every claim with numbers, client stories and examples people can check.',
  ),
];
