import { linear } from '@/design';
import { circle, icon, photo, rect, STORY_SIZE, shadow, template, text } from '../../../kit';
import { H, HAND, HANDLE, LILAC as L, SANS, SERIF, SOFT, W } from './palette';

const DAYS = [
  'Day 1: Ten minutes of morning stretch',
  'Day 2: A screen free evening',
  'Day 3: Tidy one small corner',
  'Day 4: Write three thank yous',
  'Day 5: A long, slow bath',
];

export const challenge = template(W, H, () => [
  rect(0, 0, W, H, linear(180, L.lilac, L.mist), { name: 'Background' }),
  icon('heart', 500, 110, 80, L.plum, { strokeWidth: 1.6 }),
  text('5 Day Self Care\nChallenge', 0, 220, W, {
    fontFamily: SERIF,
    fontSize: 92,
    fontWeight: 600,
    fill: L.plum,
    align: 'center',
    lineHeight: 1.05,
  }),
  DAYS.map((day, index) => [
    rect(150, 490 + index * 128, 780, 92, 'rgba(250,247,251,0.7)', {
      cornerRadius: 46,
      stroke: L.plum,
      strokeWidth: 3,
      name: 'Day pill',
    }),
    text(day, 150, 516 + index * 128, 780, {
      fontFamily: SANS,
      fontSize: 32,
      fontWeight: 500,
      fill: L.ink,
      align: 'center',
    }),
  ]),
  text(HANDLE, 0, 1180, W, {
    fontFamily: SANS,
    fontSize: 30,
    fontWeight: 500,
    fill: L.plum,
    align: 'center',
    letterSpacing: 2,
  }),
]);

export const definition = template(W, H, () => [
  rect(0, 0, W, H, L.cream, { name: 'Background' }),
  circle(820, 260, 260, 'rgba(205,187,224,0.45)', { name: 'Soft circle' }),
  circle(760, 420, 120, 'rgba(246,231,168,0.6)', { name: 'Soft circle' }),
  text('Muse', 100, 600, 800, {
    fontFamily: SERIF,
    fontSize: 150,
    fontWeight: 500,
    fill: L.ink,
    lineHeight: 1,
  }),
  text('[ myooz ]  ·  Noun', 104, 770, 600, {
    fontFamily: SANS,
    fontSize: 32,
    fontWeight: 400,
    italic: true,
    fill: L.grey,
  }),
  rect(100, 840, 880, 3, L.plum, { name: 'Rule' }),
  text(
    'A woman who moves through the world\nwith quiet confidence, inspiring the\npeople around her simply by being\nexactly who she is.',
    100,
    880,
    880,
    {
      fontFamily: SERIF,
      fontSize: 46,
      fontWeight: 500,
      fill: L.ink,
      lineHeight: 1.35,
    },
  ),
  text('ines', 820, 1220, 200, {
    fontFamily: HAND,
    fontSize: 64,
    fontWeight: 600,
    fill: L.mauve,
    align: 'right',
  }),
]);

const BUBBLES = ['beyond the comfort zone', 'through every season', 'into your own light'];

const bloomNodes = (height: number) => {
  const bubbleTop = height * 0.36;
  return [
    rect(0, 0, W, height, linear(180, L.mist, L.lilac), { name: 'Background' }),
    photo('woman-portrait-6', 0, height * 0.26, 640, height * 0.74, { filters: SOFT }),
    text('bloom', 80, height * 0.08, 500, {
      fontFamily: SANS,
      fontSize: 110,
      fontWeight: 300,
      fill: L.ink,
      letterSpacing: 4,
    }),
    rect(440, height * 0.08 + 14, 6, 120, L.plum, { name: 'Cursor' }),
    BUBBLES.map((bubble, index) => [
      rect(560, bubbleTop + index * 130, 440, 92, L.plum, {
        cornerRadius: 46,
        name: 'Chat bubble',
        ...shadow(20, 8, 'rgba(42,34,51,0.25)'),
      }),
      text(bubble, 560, bubbleTop + index * 130 + 28, 440, {
        fontFamily: SANS,
        fontSize: 29,
        fontWeight: 500,
        fill: L.cream,
        align: 'center',
      }),
    ]),
  ];
};

export const bloom = template(W, H, () => bloomNodes(H));

export const bloomStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  bloomNodes(STORY_SIZE.height),
);

export const polaroid = template(W, H, () => [
  rect(0, 0, W, H, L.plum, { name: 'Background' }),
  photo('yoga-2', 0, 0, W, H, { filters: { ...SOFT, blur: 14 } }),
  rect(0, 0, W, H, 'rgba(74,58,92,0.3)', { name: 'Photo tint' }),
  text('INES MARLOW', 0, 110, W, {
    fontFamily: SANS,
    fontSize: 30,
    fontWeight: 600,
    fill: L.cream,
    align: 'center',
    letterSpacing: 10,
  }),
  rect(210, 230, 660, 860, L.cream, {
    name: 'Polaroid',
    rotation: 0,
    ...shadow(40, 18, 'rgba(0,0,0,0.35)'),
  }),
  photo('yoga-2', 245, 265, 590, 650, { filters: SOFT }),
  text('Slow mornings', 210, 950, 660, {
    fontFamily: HAND,
    fontSize: 84,
    fontWeight: 600,
    fill: L.ink,
    align: 'center',
  }),
  text('Rest is part of the work.', 0, 1170, W, {
    fontFamily: SERIF,
    fontSize: 50,
    fontWeight: 500,
    italic: true,
    fill: L.cream,
    align: 'center',
  }),
]);
