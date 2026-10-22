import { linear } from '@/design';
import {
  browser,
  checklist,
  circle,
  icon,
  type Nodes,
  POST_SIZE,
  path,
  rect,
  shadow,
  template,
  text,
} from '../../../kit';
import { textWidth } from './listing';

const { width: W, height: H } = POST_SIZE;
const FONT = 'Inter';
const INK = '#0f172a';
const DAWN = linear(160, '#134e4a', '#0d9488', '#a3e635');
const FROST = 'rgba(255,255,255,0.8)';

const notice = (
  x: number,
  y: number,
  width: number,
  title: string,
  body: string,
  active: boolean,
): Nodes[] => {
  const opacity = active ? 1 : 0.45;
  return [
    rect(x, y, width, 180, FROST, {
      name: 'Notification',
      cornerRadius: 40,
      opacity,
      ...(active ? shadow(30, 12, 'rgba(15,23,42,0.2)') : {}),
    }),
    rect(x + 36, y + 34, 112, 112, active ? linear(180, '#4ade80', '#16a34a') : '#94a3b8', {
      name: 'App icon',
      cornerRadius: 28,
      opacity,
    }),
    icon(active ? 'message-circle' : 'bell', x + 60, y + 58, 64, '#ffffff', {
      strokeWidth: 2.25,
      opacity,
    }),
    text(title, x + 180, y + 38, width - 210, {
      fontFamily: FONT,
      fontSize: 48,
      fontWeight: 700,
      fill: INK,
      opacity,
    }),
    text(body, x + 180, y + 102, width - 210, {
      fontFamily: FONT,
      fontSize: 36,
      fontWeight: 400,
      fill: '#334155',
      opacity,
    }),
  ];
};

export const tipsCover = template(W, H, () => [
  rect(0, 0, W, H, DAWN, { name: 'Background' }),
  text('08:30', 0, 170, W, {
    fontFamily: FONT,
    fontSize: 240,
    fontWeight: 300,
    fill: '#ffffff',
    align: 'center',
    lineHeight: 1,
  }),
  text('brightdesk.co', 0, 440, W, {
    fontFamily: FONT,
    fontSize: 42,
    fontWeight: 500,
    fill: '#ecfeff',
    align: 'center',
  }),
  notice(110, 590, 860, '3 Tips', 'To Protect Your Focus', true),
  rect(310, 1070, 460, 104, FROST, { name: 'Swipe pill', cornerRadius: 52 }),
  circle(372, 1122, 36, '#0d9488'),
  icon('arrow-right', 352, 1102, 40, '#ffffff', { strokeWidth: 2.5 }),
  text('Swipe to continue', 424, 1100, 340, {
    fontFamily: FONT,
    fontSize: 36,
    fontWeight: 500,
    fill: INK,
  }),
]);

const tipStep = (active: number, title: string, body: string) =>
  template(W, H, () => [
    rect(0, 0, W, H, DAWN, { name: 'Background' }),
    [0, 1, 2].map((index) =>
      index === active
        ? notice(80, 300 + index * 230, 920, title, body, true)
        : notice(150, 300 + index * 230, 780, 'Reminder', 'Swipe to read', false),
    ),
    rect(460, 1150, 160, 56, 'rgba(15,23,42,0.55)', { name: 'Pager', cornerRadius: 28 }),
    [0, 1, 2].map((index) =>
      circle(510 + index * 30, 1178, 8, index === active ? '#ffffff' : 'rgba(255,255,255,0.45)'),
    ),
  ]);

export const TIP_STEPS = [
  tipStep(0, 'Tip 1', 'Do the hardest task first'),
  tipStep(1, 'Tip 2', 'Mute every non-urgent alert'),
  tipStep(2, 'Tip 3', 'Plan tomorrow before you leave'),
] as const;

const FOLDER_BACK =
  'M12 0 H74 Q82 0 88 8 L98 22 H188 Q200 22 200 34 V148 Q200 160 188 160 H12 Q0 160 0 148 V12 Q0 0 12 0 Z';
const FOLDER_FRONT =
  'M0 52 Q0 40 12 40 H188 Q200 40 200 52 V148 Q200 160 188 160 H12 Q0 160 0 148 Z';

const folder = (x: number, y: number, width: number, rotation = 0) => {
  const height = width * 0.8;
  const view = { width: 200, height: 160 };
  return [
    path(FOLDER_BACK, x, y, width, height, linear(180, '#fb923c', '#ea580c'), view, {
      rotation,
      ...shadow(width * 0.08, width * 0.03, 'rgba(154,52,18,0.25)'),
    }),
    path(FOLDER_FRONT, x, y, width, height, linear(180, '#fdba74', '#f97316'), view, {
      rotation,
    }),
  ];
};

const scatter = () => [
  folder(40, 150, 170, -14),
  folder(860, 250, 170, 12),
  folder(50, 1090, 170, 10),
  folder(860, 1110, 170, -12),
];

const PEACH = linear(180, '#fff7ed', '#fed7aa');

export const foldersCover = template(W, H, () => [
  rect(0, 0, W, H, PEACH, { name: 'Background' }),
  scatter(),
  folder(290, 420, 500),
  text('3 STEPS\nTO MOMENTUM', 290, 600, 500, {
    fontFamily: 'Space Mono',
    fontSize: 50,
    fontWeight: 700,
    fill: '#ffffff',
    align: 'center',
    lineHeight: 1.2,
  }),
  text('swipe_left', 0, 860, W, {
    fontFamily: 'Space Mono',
    fontSize: 34,
    fontWeight: 400,
    fill: '#7c2d12',
    align: 'center',
  }),
  icon('navigation', 700, 860, 100, INK, { rotation: -90, strokeWidth: 2 }),
]);

const browserSlide = (title: string, word: string, body: Nodes[]) =>
  template(W, H, () => [
    rect(0, 0, W, H, PEACH, { name: 'Background' }),
    scatter(),
    browser(110, 340, 860, 660, {
      bar: '#ffedd5',
      content: [
        text(title, 0, 50, 420, {
          fontFamily: FONT,
          fontSize: 58,
          fontWeight: 600,
          fill: INK,
          align: 'right',
        }),
        rect(436, 44, textWidth(word, 58) + 24, 80, '#fed7aa', {
          name: 'Highlight',
          cornerRadius: 8,
          stroke: '#ea580c',
          strokeWidth: 3,
        }),
        text(word, 448, 50, 400, {
          fontFamily: FONT,
          fontSize: 58,
          fontWeight: 700,
          fill: '#9a3412',
        }),
        body,
      ],
    }),
    text('brightdesk.co', 230, 352, 400, {
      fontFamily: FONT,
      fontSize: 28,
      fontWeight: 500,
      fill: '#7c2d12',
    }),
  ]);

const toggles = (items: readonly { label: string; on: boolean }[]) =>
  items.map((item, index) => {
    const y = 180 + index * 82;
    return [
      rect(60, y, 92, 50, item.on ? '#22c55e' : '#cbd5e1', { name: 'Toggle', cornerRadius: 25 }),
      circle(item.on ? 127 : 85, y + 25, 20, '#ffffff'),
      text(item.label, 180, y + 4, 560, {
        fontFamily: FONT,
        fontSize: 38,
        fontWeight: 400,
        fill: INK,
      }),
    ];
  });

const slots = (items: readonly { time: string; task: string }[]) =>
  items.map((item, index) => {
    const y = 190 + index * 130;
    return [
      text(item.time, 50, y + 20, 140, {
        fontFamily: FONT,
        fontSize: 36,
        fontWeight: 700,
        fill: INK,
      }),
      item.task === ''
        ? rect(200, y + 44, 580, 4, '#cbd5e1', { name: 'Empty slot' })
        : [
            rect(200, y, 600, 96, index === 0 ? '#fef3c7' : '#ffedd5', {
              name: 'Slot',
              cornerRadius: 8,
            }),
            rect(200, y, 10, 96, index === 0 ? '#d97706' : '#ea580c', { name: 'Slot edge' }),
            text(item.task, 236, y + 26, 540, {
              fontFamily: FONT,
              fontSize: 36,
              fontWeight: 600,
              fill: INK,
            }),
          ],
    ];
  });

export const FOLDER_STEPS = [
  browserSlide(
    'Keep What',
    'Works',
    toggles([
      { label: 'Test fresh hooks', on: true },
      { label: 'Copy every trend', on: false },
      { label: 'Track the numbers', on: true },
      { label: 'Guess at timing', on: false },
      { label: 'Repeat the winners', on: true },
    ]),
  ),
  browserSlide(
    'Plan Your',
    'Week',
    slots([
      { time: '9 AM', task: 'Deep work block' },
      { time: '11 AM', task: '' },
      { time: '1 PM', task: 'Write the newsletter' },
    ]),
  ),
  browserSlide('Set Your', 'Focus', [
    checklist(
      ['One clear goal', 'A short offer', 'A simple funnel', 'Real proof', 'A next step'],
      60,
      180,
      700,
      { color: INK, iconColor: '#ea580c', icon: 'check', fontSize: 38, gap: 76 },
    ),
  ]),
] as const;
