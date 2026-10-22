import {
  avatar,
  circle,
  cycle,
  group,
  POST_SIZE,
  photo,
  poly,
  rating,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

interface ReviewTheme {
  brand: string;
  ink: string;
  paper: string;
  accent: string;
  shade: string;
}

export const PLUM: ReviewTheme = {
  brand: '#8b5cf6',
  ink: '#140b24',
  paper: '#ffffff',
  accent: '#facc15',
  shade: '#2a1d45',
};

export const SPRUCE: ReviewTheme = {
  brand: '#14b8a6',
  ink: '#062925',
  paper: '#ffffff',
  accent: '#fb7185',
  shade: '#0d3b36',
};

const { width: W, height: H } = POST_SIZE;
const DISPLAY = 'Archivo Black';
const HEAD = 'Outfit';
const BODY = 'DM Sans';

interface Review {
  name: string;
  face: PosterPhotoName;
  quote: string;
}

const REVIEWS: readonly Review[] = [
  {
    name: 'Maya Lindqvist',
    face: 'woman-portrait-2',
    quote: 'They rebuilt our launch plan in a week and our bookings doubled within a month.',
  },
  {
    name: 'Tomas Reyes',
    face: 'man-portrait-1',
    quote: 'Clear strategy, fast replies and content our customers actually share.',
  },
  {
    name: 'Aisha Benton',
    face: 'woman-portrait-4',
    quote: 'The friendliest team we have hired. Every post felt exactly like us.',
  },
];

const review = (index: number): Review => cycle(REVIEWS, index);

const reviewCard = (theme: ReviewTheme, x: number, y: number, width: number, index: number) => {
  const item = review(index);
  return group(
    rect(x, y, width, 250, theme.paper, {
      name: 'Review card',
      cornerRadius: 16,
      ...shadow(28, 12, 'rgba(0,0,0,0.3)'),
    }),
    avatar(item.face, x + 62, y + 62, 36),
    text(item.name, x + 116, y + 30, width - 140, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 700,
      fill: theme.ink,
    }),
    rating(x + 116, y + 72, 24, 5, theme.accent),
    text(item.quote, x + 30, y + 124, width - 60, {
      fontFamily: BODY,
      fontSize: 25,
      fontWeight: 500,
      fill: '#4b5563',
      lineHeight: 1.4,
    }),
  );
};

const tag = (theme: ReviewTheme, x: number, y: number, degrees: number) =>
  rotateNodes(degrees, x, y, [
    rect(x, y, 300, 66, theme.paper, { name: 'Tag' }),
    text('#REVIEW', x, y + 12, 300, {
      fontFamily: DISPLAY,
      fontSize: 36,
      fontWeight: 400,
      fill: theme.brand,
      align: 'center',
      letterSpacing: 2,
    }),
  ]);

export const reviewWord = (theme: ReviewTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.ink, { name: 'Background' }),
    text('REV', 60, 170, 960, {
      fontFamily: DISPLAY,
      fontSize: 380,
      fontWeight: 400,
      fill: theme.brand,
      lineHeight: 1,
      rotation: -8,
    }),
    text('IEW', 150, 850, 920, {
      fontFamily: DISPLAY,
      fontSize: 380,
      fontWeight: 400,
      fill: theme.brand,
      lineHeight: 1,
      rotation: -8,
    }),
    tag(theme, 40, 820, -64),
    tag(theme, 900, 1290, -64),
    reviewCard(theme, 150, 520, 780, 0),
    star(5, 880, 60, 110, theme.paper, { innerRatio: 0.42 }),
    star(5, 90, 1180, 80, theme.paper, { innerRatio: 0.42 }),
    star(5, 560, 1220, 60, theme.accent, { innerRatio: 0.42 }),
  ]);

export const clientsSay = (theme: ReviewTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.brand, { name: 'Background' }),
    rect(170, 300, 760, 720, '#e9e4f5', { rotation: 5, name: 'Back sheet' }),
    rect(140, 330, 760, 720, '#f6f3fb', { rotation: -4, name: 'Middle sheet' }),
    rect(160, 320, 760, 720, theme.paper, { name: 'Front sheet', ...shadow(30, 14) }),
    rect(200, 360, 680, 92, theme.ink, { name: 'Header' }),
    text('What Our Clients Say', 200, 380, 680, {
      fontFamily: HEAD,
      fontSize: 46,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
    }),
    rect(200, 480, 440, 250, theme.paper, {
      stroke: theme.brand,
      strokeWidth: 6,
      name: 'Review box',
    }),
    avatar(review(1).face, 252, 534, 30),
    text(review(1).name, 296, 508, 330, {
      fontFamily: HEAD,
      fontSize: 26,
      fontWeight: 700,
      fill: theme.ink,
    }),
    rating(296, 546, 20, 5, theme.accent),
    text(review(1).quote, 224, 596, 396, {
      fontFamily: BODY,
      fontSize: 22,
      fontWeight: 500,
      fill: '#4b5563',
      lineHeight: 1.4,
    }),
    rect(670, 480, 210, 46, theme.ink, { name: 'Column head' }),
    text('RATED 4.9', 670, 488, 210, {
      fontFamily: HEAD,
      fontSize: 24,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
    }),
    Array.from({ length: 6 }, (_, index) =>
      rect(670, 548 + index * 32, 210, 14, theme.ink, { name: 'Column line' }),
    ),
    Array.from({ length: 4 }, (_, index) =>
      rect(200, 770 + index * 40, index === 3 ? 360 : 400, 18, theme.ink, { name: 'Body line' }),
    ),
    rect(640, 770, 240, 150, theme.brand, { name: 'Badge box' }),
    text('120+\nhappy brands', 640, 788, 240, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
      lineHeight: 1.15,
    }),
    rect(200, 950, 680, 50, theme.shade, { name: 'Footer bar' }),
    text('Real words from real clients', 0, 1130, W, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 800,
      fill: theme.paper,
      align: 'center',
    }),
    star(5, 90, 220, 100, theme.paper, { innerRatio: 0.42 }),
    star(5, 900, 990, 90, theme.paper, { innerRatio: 0.42 }),
    star(5, 930, 170, 60, theme.accent, { innerRatio: 0.42 }),
  ]);

export const photoQuote = (theme: ReviewTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.ink, { name: 'Background' }),
    photo('team-3', 0, 0, W, H),
    rect(0, 0, W, H, 'rgba(10,6,20,0.2)', { name: 'Tint' }),
    rect(100, 170, 880, 1010, 'rgba(0,0,0,0)', {
      stroke: theme.brand,
      strokeWidth: 30,
      name: 'Frame',
    }),
    rect(100, 120, 270, 74, theme.brand, { name: 'Tag' }),
    text('#REVIEW', 100, 136, 270, {
      fontFamily: DISPLAY,
      fontSize: 36,
      fontWeight: 400,
      fill: theme.paper,
      align: 'center',
    }),
    rect(790, 110, 190, 180, theme.brand, { name: 'Quote block' }),
    text('“', 790, 90, 190, {
      fontFamily: DISPLAY,
      fontSize: 280,
      fontWeight: 400,
      fill: theme.ink,
      align: 'center',
      lineHeight: 1,
    }),
    rect(150, 920, 780, 220, theme.ink, { name: 'Quote box' }),
    text(`“${review(2).quote}”`, 190, 950, 700, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: theme.paper,
      lineHeight: 1.4,
    }),
    text(`${review(2).name}, Founder`, 190, 1080, 700, {
      fontFamily: HEAD,
      fontSize: 28,
      fontWeight: 700,
      fill: theme.brand,
    }),
    star(5, 50, 1120, 100, theme.paper, { innerRatio: 0.42 }),
  ]);

export const typewriterScroll = (theme: ReviewTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.brand, { name: 'Background' }),
    rect(0, 860, W, H - 860, theme.ink, { name: 'Lower band' }),
    rect(130, 0, 360, 1010, '#fbfaf7', { name: 'Paper', ...shadow(24, 8) }),
    Array.from({ length: 5 }, (_, index) => {
      const y = 36 + index * 180;
      return [
        avatar(review(index).face, 180, y + 30, 24),
        rect(216, y + 14, 150, 14, theme.ink, { cornerRadius: 7, name: 'Name line' }),
        rating(216, y + 38, 16, 5, theme.accent),
        rect(160, y + 76, 300, 10, '#c4c0cc', { cornerRadius: 5, name: 'Text line' }),
        rect(160, y + 96, 300, 10, '#c4c0cc', { cornerRadius: 5, name: 'Text line' }),
        rect(160, y + 116, 220, 10, '#c4c0cc', { cornerRadius: 5, name: 'Text line' }),
      ];
    }),
    rect(80, 990, 460, 54, theme.shade, { cornerRadius: 27, name: 'Platen' }),
    circle(80, 1017, 34, theme.ink),
    circle(540, 1017, 34, theme.ink),
    poly(
      [
        [110, 1044],
        [510, 1044],
        [550, 1250],
        [70, 1250],
      ],
      theme.accent,
      { name: 'Typewriter body' },
    ),
    rect(120, 1110, 380, 120, theme.shade, { cornerRadius: 18, name: 'Keyboard' }),
    Array.from({ length: 21 }, (_, index) =>
      circle(150 + (index % 7) * 53, 1136 + Math.floor(index / 7) * 34, 12, theme.paper),
    ),
    rect(50, 1250, 520, 34, theme.shade, { cornerRadius: 12, name: 'Base' }),
    text('Marketing\nresults', 560, 260, 480, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: theme.paper,
      lineHeight: 1.08,
    }),
    text('that\nspeak', 560, 452, 480, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: theme.ink,
      lineHeight: 1.08,
    }),
    text('Five stars, written by\nthe people we serve.', 560, 670, 480, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 500,
      fill: theme.paper,
      lineHeight: 1.4,
    }),
    star(5, 820, 960, 120, theme.paper, { innerRatio: 0.42 }),
    star(5, 940, 120, 70, theme.accent, { innerRatio: 0.42 }),
  ]);

export const envelopeReviews = (theme: ReviewTheme) =>
  template(W, H, () => [
    rect(0, 0, W, H, theme.brand, { name: 'Background' }),
    text('CLIENT', 0, 80, W, {
      fontFamily: DISPLAY,
      fontSize: 130,
      fontWeight: 400,
      fill: theme.ink,
      align: 'center',
    }),
    text('reviews', 0, 240, W, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 600,
      fill: theme.paper,
      align: 'center',
    }),
    rect(200, 900, 680, 360, theme.shade, { cornerRadius: 30, name: 'Envelope back' }),
    poly(
      [
        [200, 920],
        [540, 700],
        [880, 920],
      ],
      theme.shade,
      { name: 'Open flap' },
    ),
    rotateNodes(-7, 200, 380, reviewCard(theme, 200, 380, 580, 0)),
    rotateNodes(5, 320, 560, reviewCard(theme, 320, 560, 580, 1)),
    rotateNodes(-3, 230, 760, reviewCard(theme, 230, 760, 580, 2)),
    poly(
      [
        [200, 1000],
        [540, 1150],
        [880, 1000],
        [880, 1260],
        [200, 1260],
      ],
      theme.ink,
      { name: 'Envelope pocket' },
    ),
    poly(
      [
        [200, 1260],
        [540, 1110],
        [880, 1260],
      ],
      '#000000',
      { name: 'Envelope fold', opacity: 0.35 },
    ),
    star(5, 110, 160, 90, theme.paper, { innerRatio: 0.42 }),
    star(5, 900, 1110, 100, theme.paper, { innerRatio: 0.42 }),
    star(5, 900, 300, 60, theme.accent, { innerRatio: 0.42 }),
  ]);

export const reviewStory = (theme: ReviewTheme) =>
  template(STORY_SIZE.width, STORY_SIZE.height, () => [
    rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, theme.brand, { name: 'Background' }),
    text('CLIENT\nLOVE', 80, 140, 920, {
      fontFamily: DISPLAY,
      fontSize: 200,
      fontWeight: 400,
      fill: theme.ink,
      lineHeight: 1,
    }),
    text('Swipe through what our\nclients say this month', 80, 580, 920, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 600,
      fill: theme.paper,
      lineHeight: 1.25,
    }),
    reviewCard(theme, 80, 800, 920, 0),
    reviewCard(theme, 80, 1100, 920, 1),
    reviewCard(theme, 80, 1400, 920, 2),
    star(5, 860, 120, 140, theme.paper, { innerRatio: 0.42 }),
    rect(80, 1730, 920, 100, theme.ink, { cornerRadius: 50, name: 'Button' }),
    text('Book your free call', 80, 1756, 920, {
      fontFamily: HEAD,
      fontSize: 42,
      fontWeight: 700,
      fill: theme.paper,
      align: 'center',
    }),
  ]);
