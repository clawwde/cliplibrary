import type { DesignIconName } from '@/design';
import { checklist, icon, line, type Nodes, template } from '../../../kit';
import {
  arrowPill,
  boxed,
  estimateWidth,
  H,
  paperBackground,
  SANS,
  say,
  TOMATO,
  W,
} from './palette';

const doodle = (name: DesignIconName, x: number, y: number, size: number) =>
  icon(name, x, y, size, TOMATO.red, { strokeWidth: 1.4 });

export const goalsCover = template(W, H, () => [
  paperBackground(),
  doodle('sparkles', 200, 120, 150),
  say('2027', 700, 360, 240, 54, TOMATO.ink, 700),
  say('Our', 290, 380, 400, 150, TOMATO.ink, 700, { fontFamily: 'Caveat', lineHeight: 1 }),
  say('Goals', 280, 500, 700, 190, TOMATO.red, 700, { lineHeight: 1 }),
  say("What we're focusing on next", 290, 720, 700, 36, TOMATO.ink, 500),
  doodle('lightbulb', 190, 820, 200),
  doodle('target', 700, 800, 200),
  arrowPill(760, 1170, TOMATO.ink),
]);

const goal = (
  lead: string,
  accent: string,
  body: string,
  top: DesignIconName,
  bottom: DesignIconName,
) =>
  template(W, H, () => [
    paperBackground(),
    doodle(top, 720, 110, 220),
    say(lead, 200, 430, 760, 80, TOMATO.ink, 700, { lineHeight: 1.1 }),
    say(accent, 200, 520, 760, 80, TOMATO.red, 700, { lineHeight: 1.1 }),
    say(body, 200, 660, 760, 36, TOMATO.ink, 400, { lineHeight: 1.45 }),
    doodle(bottom, 190, 900, 210),
    arrowPill(760, 1170, TOMATO.ink),
  ]);

export const goalAuthority = goal(
  'Building on',
  'Authority',
  'We will show up every week with\nuseful insights that make us the\ngo-to name in our niche.',
  'crown',
  'megaphone',
);

export const goalSystems = goal(
  'Systemize',
  'Our Growth',
  'We will build repeatable systems\nfor content, leads and sales so\nwe can scale without burnout.',
  'rocket',
  'chart-pie',
);

export const goalRevenue = goal(
  'Monetize',
  'With Intention',
  'We will focus on offers that truly\nhelp our clients and price them\nfor the value they create.',
  'banknote',
  'piggy-bank',
);

const inlineRow = (y: number, size: number, parts: readonly [string, boolean][]) => {
  let x = 90;
  return parts.map(([label, highlighted]) => {
    const start = x;
    x += estimateWidth(label, size) + size * (highlighted ? 0.85 : 0.35);
    return highlighted
      ? boxed(label, start, y, size, TOMATO.red, TOMATO.white)
      : say(
          label,
          start,
          y + size * 0.06,
          estimateWidth(label, size) + size,
          size,
          TOMATO.ink,
          700,
          {
            lineHeight: 1.1,
          },
        );
  });
};

export const attractCover = template(W, H, () => [
  paperBackground(),
  doodle('zap', 760, 160, 200),
  boxed('Stop Cold Pitching.', 90, 470, 40, TOMATO.ink, TOMATO.white),
  inlineRow(560, 96, [
    ['Learn', false],
    ['How To', true],
  ]),
  inlineRow(700, 96, [
    ['Earn', true],
    ['Attention.', false],
  ]),
  line(90, 1120, 140, TOMATO.red, 5, { name: 'Arrow', arrowEnd: true }),
  say('Swipe left', 260, 1100, 300, 32, TOMATO.ink, 500),
]);

const lesson = (label: string, title: string, symbol: DesignIconName, content: Nodes[]) =>
  template(W, H, () => [
    paperBackground(),
    doodle(symbol, 760, 90, 220),
    boxed(label, 200, 400, 44, TOMATO.red, TOMATO.white),
    say(title, 200, 490, 800, 70, TOMATO.ink, 700, { lineHeight: 1.12 }),
    content,
    line(200, 1170, 140, TOMATO.red, 5, { name: 'Arrow', arrowEnd: true }),
  ]);

const lessonBody = (content: string) =>
  say(content, 200, 700, 780, 40, TOMATO.muted, 400, { lineHeight: 1.5 });

export const lessonPull = lesson('Lesson 1', 'Create Content That\nPulls People In', 'zap', [
  checklist(
    ['Share real insights', 'Solve one clear problem', 'Show proof and results'],
    200,
    700,
    720,
    {
      color: TOMATO.ink,
      iconColor: TOMATO.red,
      icon: 'check',
      fontSize: 42,
      fontFamily: SANS,
      gap: 96,
    },
  ),
]);

export const lessonKnown = lesson('Lesson 2', 'Become Known\nfor One Thing', 'megaphone', [
  lessonBody(
    'Show up with the same value\nagain and again, and people\narrive already interested\nand already trusting you.',
  ),
]);

export const lessonMemorable = lesson('Lesson 3', 'Make Yourself\nEasy to Remember', 'target', [
  lessonBody(
    'Clear positioning makes you\nmemorable. Speak to everyone\nand you end up reaching\nno one at all.',
  ),
]);
