import { linear } from '@/design';
import { circle, group, icon, POST_SIZE, rect, shadow, template, text } from '../../../kit';
import { darkBackdrop, HEAD, label, orangeBackdrop, SUNSET } from './posts';

const { width: W, height: H } = POST_SIZE;

const MYTHS = [
  {
    tag: 'Myth',
    copy: 'Top performers should always reply\nto messages late at night.',
    y: 560,
  },
  {
    tag: 'Fact',
    copy: 'Protected evenings keep teams sharp\nand make better decisions.',
    y: 870,
  },
] as const;

export const mythFact = template(W, H, () => [
  darkBackdrop(),
  Array.from({ length: 6 }, (_, index) =>
    rect(index * 180, 0, 90, H, 'rgba(255,255,255,0.03)', { name: 'Stripe' }),
  ),
  text('Myth', 0, 130, W, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 900,
    fill: SUNSET.white,
    align: 'center',
    lineHeight: 1,
  }),
  circle(540, 340, 46, SUNSET.orange),
  text('or', 490, 314, 100, {
    fontFamily: HEAD,
    fontSize: 42,
    fontWeight: 800,
    fill: SUNSET.white,
    align: 'center',
  }),
  text('Fact', 0, 370, W, {
    fontFamily: HEAD,
    fontSize: 170,
    fontWeight: 900,
    fill: SUNSET.white,
    align: 'center',
    lineHeight: 1,
  }),
  MYTHS.map((item, index) =>
    group(
      rect(110, item.y, 860, 200, SUNSET.smoke, {
        cornerRadius: 26,
        stroke: 'rgba(255,255,255,0.35)',
        strokeWidth: 2,
        name: `${item.tag} card`,
        ...shadow(30, 12, 'rgba(0,0,0,0.5)'),
      }),
      label(item.tag, index === 0 ? 150 : 790, item.y - 28, 30, 140, SUNSET.orange),
      text(item.copy, 110, item.y + 62, 860, {
        fontFamily: HEAD,
        fontSize: 36,
        fontWeight: 600,
        fill: SUNSET.white,
        align: 'center',
        lineHeight: 1.3,
      }),
    ),
  ),
]);

export const didYouKnow = template(W, H, () => [
  orangeBackdrop(),
  text('?', 500, 40, 560, {
    fontFamily: HEAD,
    fontSize: 760,
    fontWeight: 900,
    fill: SUNSET.white,
    lineHeight: 1,
    ...shadow(40, 16, 'rgba(120,40,0,0.35)'),
  }),
  text('Did You', 90, 700, 700, {
    fontFamily: HEAD,
    fontSize: 120,
    fontWeight: 900,
    fill: SUNSET.white,
  }),
  label('Know?', 90, 850, 110, 380),
  text('A sharp strategy', 90, 1060, 700, {
    fontFamily: HEAD,
    fontSize: 48,
    fontWeight: 500,
    fill: SUNSET.white,
  }),
  text('Drives 3x Growth', 90, 1120, 700, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 800,
    fill: SUNSET.charcoal,
  }),
]);

export const peopleStat = template(W, H, () => [
  rect(0, 0, W, H, linear(180, SUNSET.white, SUNSET.soft), { name: 'Background' }),
  Array.from({ length: 40 }, (_, index) => {
    const column = index % 8;
    const row = Math.floor(index / 8);
    const highlighted = index < 24;
    return icon(
      'user-round',
      100 + column * 112,
      120 + row * 120,
      100,
      highlighted ? SUNSET.orange : '#d9cfc8',
      {
        strokeWidth: 2.6,
      },
    );
  }),
  text('60%', 0, 760, W, {
    fontFamily: HEAD,
    fontSize: 260,
    fontWeight: 900,
    fill: SUNSET.orange,
    align: 'center',
    lineHeight: 1,
  }),
  text('of buyers check your posts\nbefore they ever reply', 0, 1060, W, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 600,
    fill: SUNSET.charcoal,
    align: 'center',
    lineHeight: 1.3,
  }),
]);

const STATS = [
  { value: '10x', copy: 'Return on spend\nthrough clear strategy' },
  { value: '20h', copy: 'Saved every week\non routine operations' },
  { value: '5+', copy: 'New markets reached\nin a single year' },
] as const;

export const roiStats = template(W, H, () => [
  orangeBackdrop(),
  text('The numbers\nspeak for us', 90, 110, 900, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 900,
    fill: SUNSET.white,
    lineHeight: 1.05,
  }),
  STATS.map((stat, index) => {
    const y = 420 + index * 300;
    return group(
      text(stat.value, 90, y, 380, {
        fontFamily: HEAD,
        fontSize: 150,
        fontWeight: 900,
        fill: SUNSET.white,
        lineHeight: 1,
      }),
      text(stat.copy, 500, y + 30, 520, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 700,
        fill: SUNSET.charcoal,
        lineHeight: 1.25,
      }),
      index < STATS.length - 1
        ? rect(90, y + 230, 900, 3, 'rgba(255,255,255,0.6)', { name: 'Divider' })
        : [],
    );
  }),
]);
