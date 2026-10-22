import { linear, radial } from '@/design';
import { circle, rect, shadow, template } from '../../../kit';
import { estimateWidth, H, MARKER, say, TOMATO, W } from './palette';

const backdrop = () => [
  rect(0, 0, W, H, linear(180, '#2b2b2b', '#0c0c0c'), { name: 'Background' }),
  circle(
    540,
    780,
    520,
    radial(
      'rgba(255,255,255,0.14)',
      'rgba(255,255,255,0.05)',
      'rgba(255,255,255,0)',
      'rgba(255,255,255,0)',
    ),
    { name: 'Spotlight' },
  ),
  rect(0, 640, 120, 320, 'rgba(243,241,236,0.3)', { name: 'Side note', cornerRadius: 6 }),
  rect(960, 610, 120, 320, 'rgba(243,241,236,0.3)', { name: 'Side note', cornerRadius: 6 }),
];

const stickyNote = (content: string) => [
  rect(320, 600, 440, 440, TOMATO.note, {
    name: 'Sticky note',
    rotation: -3,
    ...shadow(40, 18, 'rgba(0,0,0,0.55)'),
  }),
  say(content, 340, 720, 400, 70, TOMATO.ink, 400, {
    fontFamily: MARKER,
    align: 'center',
    lineHeight: 1.15,
    rotation: -3,
  }),
  circle(540, 600, 28, TOMATO.red, shadow(10, 6, 'rgba(0,0,0,0.5)')),
  circle(532, 592, 9, 'rgba(255,255,255,0.6)'),
];

const twoTone = (lead: string, accent: string, y: number, size: number) => {
  const leadWidth = estimateWidth(`${lead} `, size);
  const total = leadWidth + estimateWidth(accent, size);
  const start = (W - total) / 2;
  return [
    say(lead, start, y, leadWidth + size, size, TOMATO.white, 700, { lineHeight: 1.1 }),
    say(accent, start + leadWidth, y, estimateWidth(accent, size) + size, size, TOMATO.red, 700, {
      lineHeight: 1.1,
    }),
  ];
};

const centered = (content: string, y: number, size: number, fill: string, weight: number) =>
  say(content, 60, y, W - 120, size, fill, weight, { align: 'center', lineHeight: 1.3 });

export const notesCover = template(W, H, () => [
  backdrop(),
  centered('Learn How to Make', 140, 48, TOMATO.white, 500),
  centered('Content', 210, 112, TOMATO.red, 700),
  centered('That Converts', 340, 100, TOMATO.white, 700),
  stickyNote('Swipe to\nLearn More'),
]);

const noteStep = (lead: string, accent: string, subtitle: string, note: string) =>
  template(W, H, () => [
    backdrop(),
    twoTone(lead, accent, 180, 84),
    centered(subtitle, 310, 40, TOMATO.white, 400),
    stickyNote(note),
  ]);

export const noteDisconnect = noteStep(
  'The',
  'Disconnect',
  'Plenty of engagement, but the\nsales still are not coming in.',
  "Likes don't\nequal leads",
);

export const noteFramework = noteStep(
  'The',
  'Framework',
  'Every post should move your\nreader closer to a decision.',
  'Guide your\nreader',
);

export const noteShift = noteStep(
  'The',
  'Shift',
  'Your audience wants answers,\nclarity and real results.',
  'Think like\na buyer',
);
