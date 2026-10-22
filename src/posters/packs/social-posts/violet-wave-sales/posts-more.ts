import { avatar, circle, poly, rating, rect, shadow, template } from '../../../kit';
import { bold, copy, H, handle, heavy, PW, W } from './posts';

const slot = (x: number, y: number, width: number, fill: string, outline = false) =>
  rect(x, y, width, 150, outline ? 'rgba(0,0,0,0)' : fill, {
    cornerRadius: 75,
    stroke: fill,
    strokeWidth: outline ? 5 : 0,
    name: 'Slot',
  });

export const expertsBuilt = template(W, H, () => [
  rect(0, 0, W, H, PW.white, { name: 'Background' }),
  heavy('Built', 80, 150, 520, 160, PW.ink),
  slot(600, 160, 300, PW.violet),
  avatar('man-portrait-1', 678, 235, 62),
  slot(920, 160, 160, PW.violet, true),
  slot(0, 380, 200, PW.ink),
  slot(220, 380, 280, PW.violet),
  avatar('woman-portrait-4', 298, 455, 62),
  heavy('by', 540, 370, 300, 160, PW.ink),
  heavy('the', 80, 590, 340, 160, PW.ink),
  slot(440, 600, 280, PW.violet),
  avatar('man-portrait-2', 518, 675, 62),
  slot(760, 600, 320, PW.ink),
  slot(40, 820, 260, PW.violet),
  avatar('woman-portrait-2', 118, 895, 62),
  heavy('experts', 330, 810, 720, 160, PW.ink),
  copy('Meet the team behind your growth.', 80, 1080, 900, 34, PW.grey),
  handle(1240, PW.grey),
]);

const ARMS = [
  { text: 'Chasing trends\nwithout strategy', x: 360, y: 210, width: 360, number: [540, 440] },
  { text: 'Avoiding data\nand feedback', x: 360, y: 990, width: 360, number: [540, 910] },
  { text: 'Mixed\nmessages', x: 70, y: 630, width: 230, number: [320, 675] },
  { text: 'Obsessing\nover vanity\nmetrics', x: 780, y: 610, width: 230, number: [760, 675] },
] as const;

export const badHabits = template(W, H, () => [
  rect(0, 0, W, H, PW.violet, { name: 'Background' }),
  rect(360, 120, 360, 1110, PW.white, { cornerRadius: 36, name: 'Cross' }),
  rect(60, 495, 960, 360, PW.white, { cornerRadius: 36, name: 'Cross' }),
  bold('MARKETERS', 360, 560, 360, 34, PW.ink, { align: 'center', letterSpacing: 2 }),
  heavy('BAD', 360, 600, 360, 124, PW.ink, { align: 'center' }),
  bold('HABITS', 360, 735, 360, 50, PW.ink, { align: 'center', letterSpacing: 4 }),
  ARMS.map((arm, index) => [
    copy(arm.text, arm.x, arm.y, arm.width, 30, PW.violet, {
      align: 'center',
      fontWeight: 600,
      lineHeight: 1.3,
    }),
    circle(arm.number[0], arm.number[1], 28, PW.violet),
    bold(String(index + 1), arm.number[0] - 28, arm.number[1] - 18, 56, 28, PW.white, {
      align: 'center',
    }),
  ]),
  handle(1265, PW.lilac),
]);

export const feedbackQuote = template(W, H, () => [
  rect(0, 0, W, H, PW.violet, { name: 'Background' }),
  Array.from({ length: 8 }, (_, index) =>
    heavy('Feedback', 50, 40 + index * 160, 1000, 170, 'rgba(255,255,255,0.12)'),
  ),
  rect(170, 360, 740, 450, PW.white, {
    cornerRadius: 44,
    name: 'Quote card',
    ...shadow(40, 18, 'rgba(20,17,43,0.3)'),
  }),
  poly(
    [
      [490, 806],
      [590, 806],
      [540, 880],
    ],
    PW.white,
    { name: 'Card tail' },
  ),
  avatar('man-portrait-1', 290, 470, 60, PW.lilac),
  bold('Marcus Hale', 380, 428, 420, 34, PW.ink),
  rating(380, 482, 26, 5, PW.violet, 0.2),
  copy(
    'Working with them lifted our brand\nand drove real growth. Strategy,\nexecution and communication\nwere outstanding.',
    220,
    570,
    660,
    30,
    PW.ink,
    { lineHeight: 1.45 },
  ),
  handle(1240, PW.white),
]);
