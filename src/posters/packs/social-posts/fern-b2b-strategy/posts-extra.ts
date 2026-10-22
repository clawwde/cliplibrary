import {
  avatar,
  checklist,
  circle,
  group,
  POST_SIZE,
  path,
  phone,
  phoneScreen,
  rating,
  rect,
  rotateNodes,
  template,
  text,
} from '../../../kit';
import { FERN, forestBackdrop, HEAD, highlight } from './posts';

const { width: W, height: H } = POST_SIZE;

export const stillMatters = template(W, H, () => [
  forestBackdrop(),
  text('Why Branding', 90, 140, 900, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 500,
    fill: FERN.mint,
  }),
  text('Still Wins\nin 2027?', 90, 210, 900, {
    fontFamily: HEAD,
    fontSize: 108,
    fontWeight: 800,
    fill: FERN.white,
    lineHeight: 1.08,
  }),
  text(
    'Trust compounds. The brands that keep\nshowing up are the ones buyers remember.',
    90,
    470,
    900,
    {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 500,
      fill: FERN.mint,
      lineHeight: 1.4,
    },
  ),
  path(
    'M 95 540 A 425 425 0 0 1 945 540',
    20,
    810,
    1040,
    540,
    'rgba(0,0,0,0)',
    { width: 1040, height: 540 },
    { stroke: FERN.mint, strokeWidth: 150, name: 'Dial' },
  ),
  rotateNodes(-38, 540, 1350, [
    text('2026', 440, 893, 200, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 800,
      fill: FERN.sage,
      align: 'center',
    }),
  ]),
  text('2027', 440, 887, 200, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 800,
    fill: FERN.deep,
    align: 'center',
  }),
  rotateNodes(38, 540, 1350, [
    text('2028', 440, 893, 200, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 800,
      fill: FERN.sage,
      align: 'center',
    }),
  ]),
  path('M 0 0 L 60 0 L 30 44 Z', 510, 790, 60, 44, FERN.white, { width: 60, height: 44 }),
]);

const REVIEWS = [
  { name: 'Priya S.', avatar: 'woman-portrait-2' },
  { name: 'Tomas R.', avatar: 'man-portrait-1' },
  { name: 'Lena K.', avatar: 'woman-portrait-1' },
] as const;

export const clientFeedback = template(W, H, () => {
  const width = 360;
  const screen = phoneScreen(width);
  return [
    forestBackdrop(),
    rect(640, 220, 360, 1000, FERN.mint, { cornerRadius: 60, name: 'Panel' }),
    text('Client', 80, 180, 500, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 600,
      fill: FERN.mint,
    }),
    text('feed\nback', 80, 250, 520, {
      fontFamily: HEAD,
      fontSize: 150,
      fontWeight: 800,
      fill: FERN.white,
      lineHeight: 0.92,
    }),
    text('Here is what our\nclients keep saying', 80, 560, 520, {
      fontFamily: HEAD,
      fontSize: 40,
      fontWeight: 500,
      fill: FERN.white,
      lineHeight: 1.3,
    }),
    checklist(['Quick and focused', 'Always on schedule', 'Support every day'], 80, 760, 520, {
      color: FERN.white,
      iconColor: FERN.mint,
      icon: 'circle-check',
      fontSize: 36,
      gap: 76,
      fontFamily: HEAD,
      fontWeight: 600,
    }),
    phone(640, 300, width, {
      screen: FERN.deep,
      rotation: 8,
      content: REVIEWS.map((review, index) => {
        const y = 110 + index * 200;
        return group(
          rect(18, y, screen.width - 36, 180, FERN.forest, { cornerRadius: 20, name: 'Review' }),
          avatar(review.avatar, 60, y + 46, 26),
          text(review.name, 100, y + 30, 180, {
            fontFamily: HEAD,
            fontSize: 22,
            fontWeight: 700,
            fill: FERN.white,
          }),
          rating(100, y + 64, 18, 5, FERN.mint, 0.25),
          rect(40, y + 110, screen.width - 80, 12, FERN.sage, { cornerRadius: 6, name: 'Line' }),
          rect(40, y + 136, screen.width - 140, 12, FERN.sage, { cornerRadius: 6, name: 'Line' }),
        );
      }),
    }),
  ];
});

const REASONS = ['Brand awareness', 'Fast delivery', 'Built for B2B', 'Support all week'] as const;

export const whyChooseUs = template(W, H, () => [
  forestBackdrop(),
  text('Why Clients', 0, 150, W, {
    fontFamily: HEAD,
    fontSize: 70,
    fontWeight: 600,
    fill: FERN.white,
    align: 'center',
  }),
  highlight('Choose Fern', 290, 250, 500, 76),
  text('every single time', 0, 370, W, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 500,
    fill: FERN.mint,
    align: 'center',
  }),
  REASONS.map((reason, index) => {
    const y = 560 + index * 160;
    return group(
      rect(170, y, 740, 110, FERN.white, { cornerRadius: 55, name: 'Reason pill' }),
      rect(200, y + 25, 110, 60, FERN.forest, { cornerRadius: 30, name: 'Switch' }),
      circle(280, y + 55, 22, FERN.mint),
      text(reason, 350, y + 32, 540, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 700,
        fill: FERN.deep,
      }),
    );
  }),
]);
