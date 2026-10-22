import { circle, icon, POST_SIZE, rect, star, template, text } from '../../../kit';
import type { EventPalette } from './posts';

const HEAD = 'Sora';
const BODY = 'DM Sans';
const { width: W, height: H } = POST_SIZE;

const IDEAS = [
  'Behind the\nscenes reel',
  'Customer\nshout-out',
  'Weekly tip\ncarousel',
  'Team photo\nFriday',
  'Product\nteaser',
  'Poll: pick\nthe colour',
  'Founder\nstory',
  'Event\nreminder',
  'Before and\nafter',
  'FAQ\nanswered',
  'Giveaway\nlaunch',
  'Monthly\nrecap',
];

export const contentCalendar = (p: EventPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, '#f4f7f6', { name: 'Background' }),
    text('Plan Your Content\nCalendar', 0, 60, W, {
      fontFamily: HEAD,
      fontSize: 70,
      fontWeight: 800,
      fill: p.top,
      align: 'center',
      lineHeight: 1.1,
    }),
    text('12 ready post ideas for the month', 0, 236, W, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 700,
      fill: p.ink,
      align: 'center',
    }),
    rect(170, 340, 740, 920, '#ffffff', {
      cornerRadius: 20,
      stroke: '#d1d5db',
      strokeWidth: 3,
      shadow: { color: 'rgba(0,0,0,0.12)', blur: 30, offsetX: 0, offsetY: 12 },
      name: 'Notebook',
    }),
    Array.from({ length: 9 }, (_, index) => [
      circle(222 + index * 80, 378, 11, '#d1d5db'),
      rect(213 + index * 80, 312, 18, 70, '#1f2937', { cornerRadius: 9, name: 'Ring' }),
    ]),
    IDEAS.map((idea, index) => {
      const x = 210 + (index % 3) * 225;
      const y = 420 + Math.floor(index / 3) * 205;
      return [
        rect(x, y, 210, 190, '#f3f4f6', {
          cornerRadius: 8,
          stroke: '#1f2937',
          strokeWidth: 2,
          name: 'Idea cell',
        }),
        rect(x, y, 210, 40, p.ink, { cornerRadius: 8, name: 'Idea header' }),
        text(`DAY ${String(index * 2 + 1).padStart(2, '0')}`, x + 16, y + 9, 180, {
          fontFamily: BODY,
          fontSize: 18,
          fontWeight: 700,
          fill: p.paper,
          letterSpacing: 2,
        }),
        text(idea, x + 16, y + 62, 180, {
          fontFamily: BODY,
          fontSize: 26,
          fontWeight: 600,
          fill: '#1f2937',
          lineHeight: 1.25,
        }),
      ];
    }),
    star(5, 50, 520, 90, p.top, { innerRatio: 0.42, rotation: -12 }),
    star(5, 945, 780, 80, p.top, { innerRatio: 0.42 }),
    circle(960, 1270, 46, p.ink),
    icon('arrow-up-right', 936, 1246, 48, p.paper),
  ]);
