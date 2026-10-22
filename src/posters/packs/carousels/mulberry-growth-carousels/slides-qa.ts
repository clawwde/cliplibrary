import { rect, shadow, template } from '../../../kit';
import { backdrop, H, MULBERRY, say, W } from './palette';

const BIG = { lineHeight: 1 } as const;

export const qaCover = template(W, H, () => [
  backdrop(),
  say('?', 640, 120, 200, 240, MULBERRY.peach, 800, BIG),
  say('?', 820, 300, 140, 130, MULBERRY.peach, 800, BIG),
  say('?', 540, 330, 100, 90, MULBERRY.blush, 800, BIG),
  say('?', 860, 560, 100, 80, MULBERRY.blush, 800, BIG),
  say('Q', 80, 330, 420, 400, MULBERRY.white, 800, BIG),
  say('A', 420, 560, 420, 400, MULBERRY.white, 800, BIG),
  say('&', 330, 560, 200, 200, MULBERRY.peach, 800, BIG),
  say('frequently\nasked\nquestions', 90, 830, 330, 46, MULBERRY.peach, 600, {
    lineHeight: 1.15,
  }),
  rect(90, 1130, 360, 84, 'rgba(0,0,0,0)', {
    name: 'Swipe pill',
    cornerRadius: 42,
    stroke: MULBERRY.blush,
    strokeWidth: 3,
  }),
  say('Swipe to read  →', 90, 1152, 360, 34, MULBERRY.white, 600, { align: 'center' }),
]);

const qa = (question: string, answer: string) =>
  template(W, H, () => [
    backdrop(),
    say('Q&A', 40, 1180, 900, 300, 'rgba(255,225,211,0.16)', 800, {
      lineHeight: 1,
      rotation: -90,
    }),
    say('?', 600, 40, 240, 260, 'rgba(255,255,255,0.35)', 800, BIG),
    say('A', 690, 930, 360, 400, 'rgba(255,179,138,0.4)', 800, BIG),
    rect(330, 360, 680, 230, MULBERRY.cream, {
      name: 'Question card',
      cornerRadius: 22,
      ...shadow(30, 12, 'rgba(0,0,0,0.3)'),
    }),
    rect(880, 360, 3, 230, '#d8c2c9', { name: 'Divider' }),
    say('Q', 883, 430, 127, 64, MULBERRY.wine, 600, { align: 'center' }),
    say(question, 370, 395, 490, 34, MULBERRY.ink, 500),
    rect(250, 650, 700, 250, MULBERRY.peach, {
      name: 'Answer card',
      cornerRadius: 22,
      ...shadow(30, 12, 'rgba(0,0,0,0.3)'),
    }),
    rect(377, 650, 3, 250, 'rgba(92,18,51,0.35)', { name: 'Divider' }),
    say('A', 250, 730, 127, 64, MULBERRY.wine, 600, { align: 'center' }),
    say(answer, 410, 685, 510, 34, MULBERRY.ink, 500),
  ]);

export const qaReach = qa(
  'What is the difference\nbetween reach and\nengagement?',
  'Reach counts who saw it.\nEngagement counts who\ncared enough to act.',
);

export const qaPosting = qa(
  'How often should a\nsmall brand post on\nsocial each week?',
  'As often as you can stay\nconsistent. Three strong\nposts beat seven rushed.',
);

export const qaCarousel = qa(
  'Do carousels really\nbeat single images\nin the feed?',
  'They keep people on the\npost longer, which tells\nthe feed it is worth it.',
);
