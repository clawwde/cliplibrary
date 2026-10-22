import { linear } from '@/design';
import { circle, rect, star, template, text } from '../../../kit';
import { backdrop, CONDENSED, H, MULBERRY, nextArrow, SCRIPT, say, W } from './palette';

const timeline = (dotX: number) => [
  rect(0, 206, W, 10, MULBERRY.blush, { name: 'Timeline' }),
  circle(dotX, 211, 40, MULBERRY.peach, { stroke: MULBERRY.blush, strokeWidth: 8 }),
];

const scriptLabel = (content: string, y: number) =>
  text(content, 84, y, 700, {
    fontFamily: SCRIPT,
    fontSize: 150,
    fontWeight: 700,
    fill: MULBERRY.peach,
    rotation: -4,
    lineHeight: 1,
  });

const condensed = (content: string, y: number, size: number) =>
  text(content, 90, y, 940, {
    fontFamily: CONDENSED,
    fontSize: size,
    fontWeight: 700,
    fill: MULBERRY.white,
    lineHeight: 0.95,
    uppercase: true,
  });

export const movesCover = template(W, H, () => [
  backdrop(),
  timeline(420),
  condensed(['To Own', 'Your', 'Niche'].join('\n'), 420, 210),
  scriptLabel('3 Moves', 300),
  say('A simple plan for a crowded feed', 90, 1080, 760, 38, MULBERRY.blush),
  nextArrow(),
]);

const move = (index: number, label: string, title: string, body: string) =>
  template(W, H, () => [
    backdrop(),
    timeline(420 + index * 160),
    condensed(title, 420, 180),
    scriptLabel(label, 300),
    say(body, 90, 860, 820, 40, MULBERRY.blush),
    nextArrow(),
  ]);

export const moveResearch = move(
  1,
  'Move 1',
  'Research\n& Position',
  'Pick one problem and own it\nbefore you chase reach.',
);

export const movePublish = move(
  2,
  'Move 2',
  'Publish\n& Hook',
  'Lead with the payoff so people\nstop scrolling in a second.',
);

export const moveRepeat = move(
  3,
  'Move 3',
  'Repeat\n& Retain',
  'Turn quick attention into\ntrust that lasts all year.',
);

const BAR_TOP = 720;
const BAR_HEIGHT = 230;

const gapBars = (gap: number) => {
  const leftEnd = (W - gap) / 2;
  const fill = linear(180, MULBERRY.peach, '#f2875b');
  return [
    rect(0, BAR_TOP, leftEnd, BAR_HEIGHT, fill, {
      name: 'Left bar',
      cornerRadius: BAR_HEIGHT / 2,
    }),
    rect(0, BAR_TOP + BAR_HEIGHT + 40, leftEnd - 120, 110, MULBERRY.blush, {
      name: 'Left bar small',
      cornerRadius: 55,
    }),
    rect(leftEnd + gap, BAR_TOP, W - leftEnd - gap, BAR_HEIGHT, fill, {
      name: 'Right bar',
      cornerRadius: BAR_HEIGHT / 2,
    }),
    rect(leftEnd + gap + 120, BAR_TOP - 150, W - leftEnd - gap - 120, 110, MULBERRY.blush, {
      name: 'Right bar small',
      cornerRadius: 55,
    }),
  ];
};

export const gapCover = template(W, H, () => [
  backdrop(),
  say('Close', 90, 150, 800, 150, MULBERRY.white, 800, { lineHeight: 1 }),
  say('the', 90, 310, 300, 150, MULBERRY.white, 800, { lineHeight: 1 }),
  say('Gap', 350, 310, 500, 150, MULBERRY.peach, 800, { lineHeight: 1 }),
  say("You're this close", 90, 500, 600, 40, MULBERRY.blush, 500),
  gapBars(440),
  say('fernway.studio', 90, 1230, 600, 34, MULBERRY.blush, 500),
]);

const gapStep = (gap: number, line: string, accent: string) =>
  template(W, H, () => [
    backdrop(),
    say(line, 90, 360, 800, 64, MULBERRY.white, 700, { lineHeight: 1.1 }),
    say(accent, 90, 436, 800, 64, MULBERRY.peach, 700, { lineHeight: 1.1 }),
    gapBars(gap),
    star(4, 520, 230, 50, MULBERRY.peach, { innerRatio: 0.3 }),
  ]);

export const gapCloser = gapStep(260, 'Getting', 'closer.');
export const gapSwipe = gapStep(130, 'Keep', 'swiping.');
export const gapLast = gapStep(30, 'One swipe', 'away.');
