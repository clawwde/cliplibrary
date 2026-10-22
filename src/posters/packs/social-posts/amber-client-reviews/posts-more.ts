import { linear } from '@/design';
import {
  avatar,
  circle,
  icon,
  type Nodes,
  pill,
  poly,
  rating,
  rect,
  rotateNodes,
  STORY_SIZE,
  template,
  text,
} from '../../../kit';
import { AMBER, H, HEAD, type ReviewPalette, reviewCard, sparkle, W } from './posts';

const FACES = ['woman-portrait-1', 'man-portrait-2', 'woman-portrait-5', 'man-portrait-3'] as const;

const typewriterBody = (p: ReviewPalette): Nodes[] => [
  rect(130, 860, 520, 70, '#3a3a3f', { cornerRadius: 30, name: 'Roller' }),
  circle(130, 895, 40, p.from),
  circle(650, 895, 40, p.from),
  rect(180, 880, 420, 26, '#d4d4d8', { cornerRadius: 6, name: 'Paper guide' }),
  rect(100, 920, 580, 330, linear(180, p.from, p.to), {
    cornerRadius: 50,
    name: 'Typewriter body',
  }),
  rect(150, 1000, 480, 190, p.ink, { cornerRadius: 26, name: 'Keyboard' }),
  [0, 1, 2].map((row) =>
    Array.from({ length: 8 - row }, (_, key) =>
      circle(195 + row * 28 + key * 56, 1045 + row * 52, 18, p.paper),
    ),
  ),
];

export const typewriter = (p: ReviewPalette) =>
  template(W, H, () => [
    rect(0, 0, W, H, p.ink, { name: 'Background' }),
    rect(560, 300, 520, 560, linear(160, p.from, p.to), { name: 'Panel' }),
    rect(200, 60, 380, 830, '#fff8ec', { name: 'Paper roll', cornerRadius: 6 }),
    FACES.map((face, index) => {
      const y = 100 + index * 190;
      return [
        avatar(face, 250, y + 40, 26),
        rect(290, y + 20, 180, 14, '#2b2b2b', { cornerRadius: 7, name: 'Name line' }),
        rating(290, y + 46, 16, 5, p.to, 0.2),
        rect(230, y + 92, 320, 10, '#cfc6b6', { cornerRadius: 5, name: 'Text line' }),
        rect(230, y + 116, 260, 10, '#cfc6b6', { cornerRadius: 5, name: 'Text line' }),
        rect(220, y + 160, 340, 2, '#e6dccb', { name: 'Rule' }),
      ];
    }),
    typewriterBody(p),
    text('Digital\nMarketing', 640, 420, 420, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 900,
      fill: p.paper,
      lineHeight: 1.05,
    }),
    text('Results\nthat speak', 640, 600, 420, {
      fontFamily: HEAD,
      fontSize: 72,
      fontWeight: 900,
      fill: p.ink,
      lineHeight: 1.05,
    }),
    sparkle(560, 230, 110),
    sparkle(900, 900, 120),
  ]);

const envelope = (top: number): Nodes[] => [
  rect(220, top, 640, 400, '#1f1f1f', { cornerRadius: 30, name: 'Envelope' }),
  poly(
    [
      [220, top + 30],
      [540, top + 250],
      [860, top + 30],
      [860, top + 370],
      [220, top + 370],
    ],
    '#2c2c2c',
    { name: 'Envelope front' },
  ),
  poly(
    [
      [240, top + 380],
      [540, top + 170],
      [840, top + 380],
    ],
    '#383838',
    { name: 'Envelope fold' },
  ),
];

const REVIEWS = [
  { name: 'Ava Kim', face: 'woman-portrait-2', quote: 'Clear plan, fast results.' },
  { name: 'Leo Grant', face: 'man-portrait-1', quote: 'Best agency call we made.' },
  { name: 'Nia Brooks', face: 'woman-portrait-6', quote: 'Our reach tripled in a month.' },
] as const;

const envelopeScene = (p: ReviewPalette, offsetY: number): Nodes[] => [
  REVIEWS.map((review, index) =>
    rotateNodes([-6, 5, -3][index] ?? 0, 540, offsetY + 100 + index * 165, [
      reviewCard(250 + (index % 2) * 60, offsetY + index * 165, 520, p, review, 0.85),
    ]),
  ),
  envelope(offsetY + 500),
];

export const clientEnvelope = template(W, H, () => [
  rect(0, 0, W, H, linear(160, AMBER.from, AMBER.to), { name: 'Background' }),
  text('CLIENT', 0, 90, W, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 900,
    fill: AMBER.ink,
    align: 'center',
    letterSpacing: 4,
  }),
  text('reviews', 0, 240, W, {
    fontFamily: HEAD,
    fontSize: 56,
    fontWeight: 600,
    fill: AMBER.paper,
    align: 'center',
  }),
  envelopeScene(AMBER, 400),
  sparkle(860, 380, 110),
  sparkle(120, 1150, 90, AMBER.ink),
]);

export const clientEnvelopeStory = template(STORY_SIZE.width, STORY_SIZE.height, () => [
  rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, linear(160, AMBER.from, AMBER.to), {
    name: 'Background',
  }),
  text('CLIENT', 0, 230, W, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 900,
    fill: AMBER.ink,
    align: 'center',
    letterSpacing: 4,
  }),
  text('reviews', 0, 400, W, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 600,
    fill: AMBER.paper,
    align: 'center',
  }),
  envelopeScene(AMBER, 620),
  pill('Read them all', 370, 1600, {
    fill: AMBER.ink,
    color: AMBER.paper,
    fontSize: 36,
    fontFamily: HEAD,
    fontWeight: 800,
  }),
  icon('arrow-down', 510, 1750, 60, AMBER.ink, { strokeWidth: 2.6 }),
  sparkle(860, 560, 120),
]);
