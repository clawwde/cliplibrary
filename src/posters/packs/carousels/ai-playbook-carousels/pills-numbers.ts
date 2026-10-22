import { linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  rect,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Plus Jakarta Sans';
const INK = '#0b2b26';
const TEAL = '#0f766e';
const BRIGHT = '#14b8a6';
const PILL = linear(90, '#14b8a6', '#0f766e');
const MIST = linear(180, '#f8fbfa', '#dfece8');

const halfPill = (x: number, width: number, y: number, fill: string, side: 'left' | 'right') => {
  const r = 55;
  const data =
    side === 'left'
      ? `M0 0 H${width - r} A${r} ${r} 0 0 1 ${width - r} ${r * 2} H0 Z`
      : `M${width} 0 H${r} A${r} ${r} 0 0 0 ${r} ${r * 2} H${width} Z`;
  return path(data, x, y, width, r * 2, fill, { width, height: r * 2 }, { name: 'Pill' });
};

const namePill = (x: number, y: number, name: string, handle: string): Nodes[] => [
  rect(x, y, 470, 110, PILL, { name: 'Name pill', cornerRadius: 55 }),
  text(name, x + 50, y + 18, 380, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: '#ffffff',
  }),
  text(handle, x + 50, y + 62, 380, {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 500,
    fill: '#ccfbf1',
  }),
];

export const pillsCover = template(W, H, () => [
  rect(0, 0, W, H, MIST, { name: 'Background' }),
  text('LEVEL UP YOUR SKILLS', 90, 260, 900, {
    fontFamily: FONT,
    fontSize: 30,
    fontWeight: 700,
    fill: TEAL,
    letterSpacing: 2,
  }),
  text('Mastering the\nArt of AI\nPrompts', 90, 320, 920, {
    fontFamily: FONT,
    fontSize: 100,
    fontWeight: 800,
    fill: INK,
    lineHeight: 1.08,
  }),
  halfPill(0, 140, 720, INK, 'left'),
  avatar('woman-portrait-1', 240, 775, 58, '#ffffff'),
  namePill(330, 720, 'Isla Moreno', '@islamoreno'),
  halfPill(830, 250, 720, INK, 'right'),
  rect(90, 860, 470, 110, PILL, { name: 'Swipe pill', cornerRadius: 55 }),
  text('Swipe to continue', 90, 894, 470, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
  }),
  circle(650, 915, 55, TEAL),
  icon('arrow-right', 620, 885, 60, '#ffffff', { strokeWidth: 2.5 }),
  halfPill(740, 340, 860, INK, 'right'),
]);

const pager = (active: number, y: number, on: string, off: string) => {
  let x = 454;
  return [0, 1, 2, 3].map((index) => {
    const node =
      index === active
        ? rect(x, y, 64, 18, on, { name: 'Pager', cornerRadius: 9 })
        : circle(x + 9, y + 9, 9, off);
    x += index === active ? 82 : 36;
    return node;
  });
};

const pillStep = (
  active: number,
  title: string,
  person: { photo: PosterPhotoName; name: string; handle: string },
  message: string,
) =>
  template(W, H, () => [
    rect(0, 0, W, H, MIST, { name: 'Background' }),
    pager(active, 230, TEAL, '#b6cfc9'),
    text(title, 60, 330, 960, {
      fontFamily: FONT,
      fontSize: 80,
      fontWeight: 800,
      fill: INK,
      align: 'center',
      lineHeight: 1.12,
    }),
    halfPill(0, 150, 670, INK, 'left'),
    avatar(person.photo, 250, 725, 58, '#ffffff'),
    namePill(340, 670, person.name, person.handle),
    halfPill(840, 240, 670, INK, 'right'),
    halfPill(0, 110, 820, BRIGHT, 'left'),
    rect(140, 820, 680, 110, PILL, { name: 'Message pill', cornerRadius: 55 }),
    text(message, 190, 838, 590, {
      fontFamily: FONT,
      fontSize: 29,
      fontWeight: 600,
      fill: '#ffffff',
      lineHeight: 1.3,
    }),
    halfPill(850, 230, 820, INK, 'right'),
  ]);

export const PILL_STEPS = [
  pillStep(
    1,
    'Be Clear About\nthe Result First',
    { photo: 'woman-portrait-2', name: 'Isla Moreno', handle: '@islamoreno' },
    'Describe the finished result before\nyou ask for the work itself.',
  ),
  pillStep(
    2,
    'Share Context\nLike a Teammate',
    { photo: 'man-portrait-1', name: 'Theo Grant', handle: '@theogrant' },
    'Better background gives you a\nbetter first draft every time.',
  ),
  pillStep(
    3,
    'Set the Tone,\nStyle and Length',
    { photo: 'woman-portrait-5', name: 'Kira Chen', handle: '@kirachen' },
    'Name the voice you want and how\nlong the answer should run.',
  ),
] as const;

export const numbersCover = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#ffffff', '#e6efed'), { name: 'Background' }),
  avatar('woman-portrait-2', 150, 180, 46),
  text('Nora Bell', 216, 146, 500, {
    fontFamily: FONT,
    fontSize: 32,
    fontWeight: 700,
    fill: INK,
  }),
  text('Marketing Director', 216, 188, 500, {
    fontFamily: FONT,
    fontSize: 24,
    fontWeight: 500,
    fill: '#64748b',
  }),
  text('AI Will Not\nTake Your Job', 90, 440, 920, {
    fontFamily: FONT,
    fontSize: 100,
    fontWeight: 800,
    fill: TEAL,
    lineHeight: 1.12,
  }),
  text('It will change how you do it.', 90, 720, 900, {
    fontFamily: FONT,
    fontSize: 42,
    fontWeight: 500,
    fill: INK,
  }),
  rect(540, 1080, 450, 104, PILL, { name: 'Swipe pill', cornerRadius: 52 }),
  circle(598, 1132, 38, '#ffffff'),
  icon('arrow-right', 576, 1110, 44, TEAL, { strokeWidth: 2.5 }),
  text('Swipe to continue', 650, 1113, 330, {
    fontFamily: FONT,
    fontSize: 34,
    fontWeight: 700,
    fill: '#ffffff',
  }),
]);

const numberStep = (active: number, body: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, '#ffffff', '#e6efed'), { name: 'Background' }),
    rect(470, 150, 140, 46, TEAL, { name: 'Pager', cornerRadius: 23 }),
    [0, 1, 2, 3].map((index) =>
      circle(498 + index * 28, 173, 7, index === active ? '#ffffff' : 'rgba(255,255,255,0.45)'),
    ),
    text(String(active), 50, 330, 520, {
      fontFamily: FONT,
      fontSize: 600,
      fontWeight: 300,
      fill: 'rgba(0,0,0,0)',
      stroke: BRIGHT,
      strokeWidth: 4,
      lineHeight: 1,
    }),
    text(body, 390, 560, 630, {
      fontFamily: FONT,
      fontSize: 38,
      fontWeight: 500,
      fill: INK,
      lineHeight: 1.45,
    }),
    circle(950, 1190, 42, TEAL),
    icon('arrow-right', 926, 1166, 48, '#ffffff', { strokeWidth: 2.5 }),
  ]);

export const NUMBER_STEPS = [
  numberStep(
    1,
    'AI is best at clearing busywork, not replacing ideas. Use it for drafts, summaries and sorting so your real thinking starts sooner.',
  ),
  numberStep(
    2,
    'Output quality follows input quality. Vague prompts get generic answers. Clear goals, limits and examples get work that sounds like you.',
  ),
  numberStep(
    3,
    'Review everything before it ships. AI is fast and confident, so a quick human check keeps facts, tone and brand on track.',
  ),
] as const;
