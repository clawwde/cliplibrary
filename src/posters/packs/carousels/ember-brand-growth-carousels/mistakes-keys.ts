import { type DesignIconName, linear } from '@/design';
import { circle, icon, POST_SIZE, poly, rect, template, text } from '../../../kit';
import { textWidth } from '../momentum-carousel-kit/text-width';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Manrope';
const EMBER = '#ff5a1f';
const NIGHT = '#0c0c0e';
const SOFT = '#ffd2bf';
const SITE = 'emberline.studio';

const notch = (fill: string) =>
  poly(
    [
      [1000, 0],
      [W, 0],
      [W, H],
      [1000, H],
      [1000, 1010],
      [870, 950],
      [870, 560],
      [1000, 500],
    ],
    fill,
    { name: 'Notch panel' },
  );

export const mistakesCover = template(W, H, () => [
  rect(0, 0, W, H, '#ffffff', { name: 'Background' }),
  notch(NIGHT),
  text(SITE, 90, 140, 600, {
    fontFamily: FONT,
    fontSize: 32,
    fontWeight: 700,
    fill: NIGHT,
  }),
  rect(78, 412, textWidth('4 Mistakes', 78) + 30, 104, SOFT, {
    name: 'Highlight',
    cornerRadius: 6,
    stroke: EMBER,
    strokeWidth: 3,
  }),
  text('4 Mistakes', 92, 420, 700, {
    fontFamily: FONT,
    fontSize: 78,
    fontWeight: 800,
    fill: '#c2410c',
  }),
  text('Founders Make\non Social Media', 90, 530, 760, {
    fontFamily: FONT,
    fontSize: 78,
    fontWeight: 800,
    fill: NIGHT,
    lineHeight: 1.15,
  }),
  text('Avoid the traps that\nquietly stall growth', 90, 760, 700, {
    fontFamily: FONT,
    fontSize: 42,
    fontWeight: 500,
    fill: '#52525b',
    lineHeight: 1.35,
  }),
  rect(90, 1010, 430, 104, '#ffffff', {
    name: 'Swipe pill',
    cornerRadius: 52,
    stroke: EMBER,
    strokeWidth: 4,
  }),
  text('Swipe to read', 132, 1040, 300, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 600,
    fill: NIGHT,
  }),
  circle(466, 1062, 38, EMBER),
  icon('arrow-right', 444, 1040, 44, '#ffffff', { strokeWidth: 2.5 }),
]);

interface Point {
  plain: string;
  mark: string;
}

const mistake = (dark: boolean, title: string, points: readonly Point[], progress: number) =>
  template(W, H, () => [
    rect(0, 0, W, H, dark ? NIGHT : '#ffffff', { name: 'Background' }),
    notch(dark ? '#ffffff' : NIGHT),
    rect(90, 230, 560, 6, dark ? '#3f3f46' : '#d4d4d8', { name: 'Track', cornerRadius: 3 }),
    rect(90, 230, 560 * progress, 6, EMBER, { name: 'Progress', cornerRadius: 3 }),
    text(title, 90, 310, 760, {
      fontFamily: FONT,
      fontSize: 84,
      fontWeight: 800,
      fill: dark ? '#ffffff' : NIGHT,
      lineHeight: 1.1,
    }),
    points.map((point, index) => {
      const y = 560 + index * 190;
      return [
        text(point.plain, 90, y, 760, {
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 500,
          fill: dark ? '#d4d4d8' : '#3f3f46',
        }),
        rect(84, y + 60, textWidth(point.mark, 40) + 20, 62, EMBER, {
          name: 'Highlight',
          cornerRadius: 6,
        }),
        text(point.mark, 94, y + 66, 760, {
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 700,
          fill: '#ffffff',
        }),
      ];
    }),
  ]);

export const MISTAKE_STEPS = [
  mistake(
    true,
    'Talking Only\nAbout You',
    [
      { plain: 'If every post is a pitch,', mark: 'people scroll past.' },
      { plain: 'Teach, entertain and', mark: 'solve real problems.' },
      { plain: 'Value is what', mark: 'earns the follow.' },
    ],
    0.25,
  ),
  mistake(
    false,
    'Posting\nWithout a Plan',
    [
      { plain: 'Random posting makes it hard', mark: 'to build momentum.' },
      { plain: 'Pick three themes and', mark: 'rotate them weekly.' },
      { plain: 'Consistency builds', mark: 'recognition.' },
    ],
    0.5,
  ),
  mistake(
    true,
    'Ignoring the\nComments',
    [
      { plain: 'Silence tells people', mark: 'you are not listening.' },
      { plain: 'Reply within a day and', mark: 'ask a follow up.' },
      { plain: 'Every conversation is', mark: 'free reach.' },
    ],
    0.75,
  ),
] as const;

const DUSK = linear(180, '#18181b', '#060607');

const keys = (activeColumn: number, mark: DesignIconName) =>
  [0, 1].map((row) =>
    Array.from({ length: 7 }, (_, column) => {
      const x = 30 + column * 150;
      const y = 990 + row * 150;
      const active = row === 0 && column === activeColumn;
      return [
        rect(x, y, 130, 130, active ? EMBER : 'rgba(255,255,255,0.03)', {
          name: 'Key',
          cornerRadius: 26,
          stroke: active ? EMBER : 'rgba(255,255,255,0.35)',
          strokeWidth: 3,
        }),
        active ? icon(mark, x + 33, y + 33, 64, '#ffffff', { strokeWidth: 2.25 }) : [],
      ];
    }),
  );

export const keysCover = template(W, H, () => [
  rect(0, 0, W, H, DUSK, { name: 'Background' }),
  text(SITE, 90, 140, 600, {
    fontFamily: FONT,
    fontSize: 32,
    fontWeight: 700,
    fill: '#ffffff',
  }),
  text('How to\nBuild a', 90, 360, 900, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 400,
    fill: '#ffffff',
    lineHeight: 1.15,
  }),
  text('Loyal\nCommunity', 90, 566, 900, {
    fontFamily: FONT,
    fontSize: 88,
    fontWeight: 800,
    fill: EMBER,
    lineHeight: 1.15,
  }),
  keys(6, 'arrow-right'),
]);

const keyStep = (number: string, title: string, body: string, mark: DesignIconName) =>
  template(W, H, () => [
    rect(0, 0, W, H, DUSK, { name: 'Background' }),
    text(number, 0, 220, W, {
      fontFamily: FONT,
      fontSize: 160,
      fontWeight: 800,
      fill: EMBER,
      align: 'center',
      lineHeight: 1,
    }),
    text(title, 0, 430, W, {
      fontFamily: FONT,
      fontSize: 62,
      fontWeight: 800,
      fill: '#ffffff',
      align: 'center',
    }),
    text(body, 110, 530, 860, {
      fontFamily: FONT,
      fontSize: 44,
      fontWeight: 400,
      fill: '#d4d4d8',
      align: 'center',
      lineHeight: 1.4,
    }),
    keys(3, mark),
  ]);

export const KEY_STEPS = [
  keyStep(
    '01',
    'Widen Your Reach',
    'Grow awareness through guest posts, partners and live sessions.',
    'megaphone',
  ),
  keyStep(
    '02',
    'Spark Conversation',
    'Views are not enough. Ask questions and reply to every comment.',
    'message-square',
  ),
  keyStep(
    '03',
    'Reward Loyalty',
    'Give regulars early access, shout-outs and a place to belong.',
    'users',
  ),
] as const;
