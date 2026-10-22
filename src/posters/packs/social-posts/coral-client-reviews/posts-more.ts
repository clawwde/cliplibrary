import {
  circle,
  ellipse,
  poly,
  rating,
  rect,
  rotateNodes,
  star,
  type Template,
  template,
  text,
} from '../../../kit';
import { H, HEAD, type ReviewPalette, reviewCard, W } from './posts';

export const typewriterScroll = (p: ReviewPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.deep, { name: 'Background' }),
    rect(0, 0, W, 780, p.brand, { name: 'Top block' }),
    rect(150, 50, 340, 860, '#fdf3e4', {
      name: 'Paper scroll',
      shadow: { color: 'rgba(0,0,0,0.25)', blur: 24, offsetX: 0, offsetY: 8 },
    }),
    Array.from({ length: 5 }, (_, index) => {
      const y = 90 + index * 158;
      return [
        rect(176, y, 288, 132, '#ffffff', { cornerRadius: 10, name: 'Scroll review' }),
        circle(206, y + 30, 16, p.brand),
        rect(234, y + 22, 120, 14, p.ink, { cornerRadius: 7, name: 'Reviewer' }),
        rating(196, y + 56, 20, 5, '#f5b400', 0.2),
        rect(196, y + 92, 248, 10, '#e7e5e4', { cornerRadius: 5, name: 'Review line' }),
        rect(196, y + 110, 170, 10, '#e7e5e4', { cornerRadius: 5, name: 'Review line' }),
      ];
    }),
    rect(110, 880, 420, 54, '#2b2f3a', { cornerRadius: 27, name: 'Roller' }),
    circle(100, 907, 30, '#1f232c'),
    circle(540, 907, 30, '#1f232c'),
    poly(
      [
        [130, 940],
        [510, 940],
        [580, 1180],
        [60, 1180],
      ],
      p.brand,
      { name: 'Typewriter body' },
    ),
    rect(40, 1170, 560, 60, '#e8e3dc', { cornerRadius: 16, name: 'Typewriter base' }),
    [0, 1, 2].map((row) =>
      Array.from({ length: 9 - row }, (_, index) =>
        circle(150 + row * 22 + index * 44, 1000 + row * 52, 17, '#fdf3e4', {
          stroke: p.ink,
          strokeWidth: 4,
        }),
      ),
    ),
    rect(220, 1140, 200, 20, '#fdf3e4', { cornerRadius: 10, name: 'Space bar' }),
    text(['Digital', 'Growth', 'Results'].join('\n'), 590, 250, 450, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: p.paper,
      lineHeight: 1.04,
    }),
    text('that speak', 590, 512, 450, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: p.deep,
    }),
    star(5, 860, 90, 110, p.paper, { innerRatio: 0.45 }),
    star(5, 860, 960, 120, p.paper, { innerRatio: 0.45 }),
    text('48 five star\nreviews in 2026', 640, 1110, 400, {
      fontFamily: HEAD,
      fontSize: 34,
      fontWeight: 600,
      fill: p.paper,
      lineHeight: 1.25,
    }),
  ]);

export const envelopeReviews = (p: ReviewPalette): Template =>
  template(W, H, () => [
    rect(0, 0, W, H, p.brand, { name: 'Background' }),
    text('CLIENT', 0, 110, W, {
      fontFamily: HEAD,
      fontSize: 140,
      fontWeight: 800,
      fill: p.deep,
      align: 'center',
      letterSpacing: 4,
    }),
    text('reviews', 0, 270, W, {
      fontFamily: HEAD,
      fontSize: 60,
      fontWeight: 500,
      fill: p.paper,
      align: 'center',
    }),
    ellipse(240, 1180, 600, 70, 'rgba(0,0,0,0.18)', { name: 'Envelope shadow' }),
    rect(250, 760, 580, 420, p.deep, { cornerRadius: 40, name: 'Envelope back' }),
    rotateNodes(-8, 400, 720, reviewCard(150, 610, 520, 'Priya Shah', p, 2)),
    rotateNodes(6, 700, 820, reviewCard(400, 730, 520, 'Marco Lind', p, 2)),
    poly(
      [
        [250, 840],
        [540, 1010],
        [830, 840],
        [830, 1140],
        [250, 1140],
      ],
      '#232a4d',
      { name: 'Envelope pocket' },
    ),
    rect(250, 1100, 580, 80, '#232a4d', { cornerRadius: 40, name: 'Envelope base' }),
    star(5, 110, 500, 90, p.deep, { innerRatio: 0.45 }),
    star(5, 880, 1060, 120, p.paper, { innerRatio: 0.45 }),
  ]);
