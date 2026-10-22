import { linear, radial } from '@/design';
import { circle, type Nodes, poly, rect, STORY_SIZE, shadow, template, text } from '../../../kit';
import { BODY, brandMark, button, darkBg, H, HEAD, VIO, violetGlow, W } from './posts';

const LINES = [
  { label: 'Build faster,', color: VIO.white },
  { label: 'think bigger,', color: VIO.bright },
  { label: 'and scale up', color: VIO.white },
  { label: 'with automation', color: VIO.bright },
];

export const buildFaster = template(W, H, () => [
  darkBg(H),
  brandMark(80, 90, 600, VIO.white, 'left'),
  LINES.map((line, index) =>
    text(line.label, 80, 200 + index * 96, 920, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 600,
      fill: line.color,
      lineHeight: 1.1,
    }),
  ),
  Array.from({ length: 10 }, (_, index) => {
    const column = index % 5;
    const row = Math.floor(index / 5);
    return rect(20 + column * 212, 820 + row * 212, 196, 196, 'rgba(255,255,255,0.03)', {
      name: 'Grid cell',
      cornerRadius: 40,
      stroke: 'rgba(255,255,255,0.22)',
      strokeWidth: 3,
    });
  }),
  violetGlow(320, 700, 440, 440, 0.6),
  rect(444, 820, 196, 196, linear(135, VIO.lilac, VIO.violet), {
    name: 'Active cell',
    cornerRadius: 40,
    ...shadow(70, 0, 'rgba(139,92,246,0.95)'),
  }),
  poly(
    [
      [505, 870],
      [590, 905],
      [553, 915],
      [548, 960],
    ],
    VIO.white,
    { name: 'Cursor' },
  ),
]);

const joinNodes = (height: number): Nodes[] => {
  const cy = height / 2;
  const radius = 500;
  return [
    rect(0, 0, W, height, linear(180, VIO.bright, VIO.violet, '#6d28d9'), { name: 'Background' }),
    circle(540, cy, radius, radial(VIO.night, VIO.ink, VIO.plum), {
      name: 'Dark disc',
      ...shadow(80, 0, 'rgba(7,4,15,0.6)'),
    }),
    brandMark(0, cy - 300, W, VIO.white),
    text('Join the Top 5%', 0, cy - 200, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 700,
      fill: VIO.white,
      align: 'center',
    }),
    text('of Product Builders', 0, cy - 100, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 800,
      fill: VIO.bright,
      align: 'center',
    }),
    text('A private circle shaping\nhow software gets made', 0, cy + 30, W, {
      fontFamily: BODY,
      fontSize: 34,
      fontWeight: 500,
      fill: VIO.muted,
      align: 'center',
      lineHeight: 1.4,
    }),
    button('Read More', 250, cy + 190, 270, false),
    button('Apply Now', 560, cy + 190, 270, true),
  ];
};

export const topFivePost = template(W, H, () => joinNodes(H));

export const topFiveStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  joinNodes(STORY_SIZE.height),
);

const quoteMark = (x: number, fill: string) =>
  poly(
    [
      [x + 110, 150],
      [x + 360, 150],
      [x + 250, 900],
      [x, 900],
    ],
    fill,
    { name: 'Quote mark' },
  );

export const quoteCloser = template(W, H, () => [
  darkBg(H),
  quoteMark(220, 'rgba(139,92,246,0.55)'),
  quoteMark(540, 'rgba(167,139,250,0.85)'),
  rect(0, 640, W, 280, linear(180, 'rgba(7,4,15,0)', VIO.night), { name: 'Fade' }),
  rect(140, 560, 800, 170, 'rgba(17,11,34,0.82)', {
    name: 'Quote pill',
    cornerRadius: 85,
    stroke: VIO.bright,
    strokeWidth: 3,
  }),
  text('Great tools bring great\npeople closer together', 140, 596, 800, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 600,
    fill: VIO.white,
    align: 'center',
    lineHeight: 1.3,
  }),
  text('Mara Quinlan', 0, 1000, W, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 700,
    fill: VIO.white,
    align: 'center',
  }),
  text('Head of Product', 0, 1050, W, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 500,
    fill: VIO.muted,
    align: 'center',
  }),
  brandMark(0, 1240, W, VIO.white),
]);
