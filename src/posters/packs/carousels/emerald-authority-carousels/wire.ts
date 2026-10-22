import { poly, rect, type Template, template } from '../../../kit';
import { bodyText, brandMark, H, LEAF, leafBackground, titleLine, W } from './palette';

const TOP = 170;
const BOTTOM = 1180;
const THICK = 12;
const POST_X = 64;

const doubleChevron = (x: number, y: number) =>
  [0, 64].map((shift) =>
    poly(
      [
        [x + shift, y - 40],
        [x + shift + 28, y - 40],
        [x + shift + 68, y],
        [x + shift + 28, y + 40],
        [x + shift, y + 40],
        [x + shift + 40, y],
      ],
      LEAF.wire,
      { name: 'Chevron' },
    ),
  );

const wireCover = template(W, H, () => [
  leafBackground(),
  brandMark(90, 140),
  titleLine('How to Sharpen\nYour Content', 90, 400, 88, LEAF.white),
  titleLine('Strategy', 90, 604, 88, LEAF.mint),
  rect(0, BOTTOM - THICK / 2, W, THICK, LEAF.wire, { name: 'Wire' }),
  doubleChevron(860, BOTTOM),
]);

const wireStep = (lead: string, accent: string, body: string, entry: 'bottom' | 'top') =>
  template(W, H, () => {
    const enter = entry === 'bottom' ? BOTTOM : TOP;
    const leave = entry === 'bottom' ? TOP : BOTTOM;
    return [
      leafBackground(),
      rect(0, enter - THICK / 2, POST_X + THICK, THICK, LEAF.wire, { name: 'Wire' }),
      rect(POST_X, TOP - THICK / 2, THICK, BOTTOM - TOP + THICK, LEAF.wire, { name: 'Wire' }),
      rect(POST_X, leave - THICK / 2, W - POST_X, THICK, LEAF.wire, { name: 'Wire' }),
      doubleChevron(860, leave),
      titleLine(lead, 150, 440, 84, LEAF.white),
      titleLine(accent, 150, 540, 84, LEAF.mint),
      bodyText(body, 150, 690, 800),
    ];
  });

export const WIRE_SERIES: readonly Template[] = [
  wireCover,
  wireStep(
    'Sharpen Your',
    'Core Message',
    'If people cannot repeat your message, they will not remember it.',
    'bottom',
  ),
  wireStep(
    'Check What Is',
    'Working',
    'Better results start with an honest look at the numbers.',
    'top',
  ),
  wireStep('Trim the', 'Funnel', 'Fewer steps and clearer offers lead to a faster yes.', 'bottom'),
  wireStep(
    'Automate the',
    'Busywork',
    'Hand repeat tasks to tools and give your team time to think.',
    'top',
  ),
];
