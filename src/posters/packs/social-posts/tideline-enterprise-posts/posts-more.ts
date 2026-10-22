import { linear } from '@/design';
import {
  avatar,
  ellipse,
  icon,
  poly,
  rating,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  aiSearch,
  analyticsBars,
  BODY,
  brandMark,
  eventsBoard,
  H,
  HEAD,
  ringArc,
  skillPoll,
  TIDE,
  W,
  websiteLive,
} from './posts';

const powerWords = template(W, H, () => [
  rect(0, 0, W, H, linear(160, TIDE.teal, TIDE.sea), { name: 'Background' }),
  ringArc(0, 1350, 300, 250, 270, 360, 'rgba(255,255,255,0.12)'),
  text('Power Words for', 0, 250, W, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 600,
    fill: TIDE.white,
    align: 'center',
  }),
  text('B2B Brands', 0, 330, W, {
    fontFamily: HEAD,
    fontSize: 100,
    fontWeight: 800,
    fill: TIDE.white,
    align: 'center',
  }),
  [
    'Proven',
    'Strategic',
    'Scalable',
    'Trusted',
    'Insightful',
    'Measurable',
    'Secure',
    'Adaptive',
    'Focused',
  ].map((word, index) => {
    const x = 90 + (index % 3) * 310;
    const y = 560 + Math.floor(index / 3) * 120;
    return [
      rect(x, y, 280, 88, 'rgba(255,255,255,0.12)', {
        name: 'Word tag',
        cornerRadius: 12,
        stroke: 'rgba(255,255,255,0.55)',
        strokeWidth: 2,
      }),
      text(word, x, y + 24, 280, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 600,
        fill: TIDE.white,
        align: 'center',
      }),
    ];
  }),
  brandMark(0, 1210, W, TIDE.white, 'center'),
]);

export const stayAhead = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#04211f', TIDE.night), { name: 'Background' }),
  rect(0, 0, 440, 16, TIDE.teal, { name: 'Progress bar' }),
  brandMark(80, 100, 600, TIDE.white),
  text('Stay ahead\nof the curve', 80, 190, 920, {
    fontFamily: HEAD,
    fontSize: 116,
    fontWeight: 800,
    fill: TIDE.white,
    lineHeight: 1.05,
  }),
  text('Because tomorrow belongs to teams\nthat learn faster than the market.', 80, 470, 900, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 400,
    fill: TIDE.grey,
    lineHeight: 1.4,
  }),
  ringArc(0, 1350, 640, 450, 270, 360, linear(45, TIDE.sea, TIDE.teal, TIDE.aqua)),
  poly(
    [
      [0, 1320],
      [30, 1350],
      [430, 930],
    ],
    linear(45, 'rgba(255,255,255,0.2)', TIDE.white),
    { name: 'Needle' },
  ),
  icon('arrow-right', 880, 1150, 110, TIDE.aqua, { strokeWidth: 2.5 }),
]);

const clientsSay = template(W, H, () => [
  rect(0, 0, W, H, linear(170, TIDE.deep, TIDE.night), { name: 'Background' }),
  ringArc(1080, 0, 330, 280, 90, 180, linear(90, TIDE.teal, TIDE.aqua)),
  ringArc(0, 1350, 260, 220, 270, 360, 'rgba(94,234,212,0.4)'),
  text('WHAT OUR', 0, 130, W, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 800,
    fill: TIDE.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('CLIENTS SAY', 0, 225, W, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 800,
    fill: TIDE.aqua,
    align: 'center',
    lineHeight: 1,
  }),
  [
    {
      name: 'Hana Okafor',
      quote: 'Onboarding took days, not months.\nOur pipeline doubled by Q3.',
      face: 'woman-portrait-1' as const,
    },
    {
      name: 'Luis Ferrand',
      quote: 'Clear reporting and a team that\nanswers within the hour.',
      face: 'man-portrait-1' as const,
    },
    {
      name: 'Mira Castell',
      quote: 'Exactly the partner we needed to\nscale into new regions.',
      face: 'woman-portrait-5' as const,
    },
  ].map((review, index) => {
    const y = 410 + index * 250;
    return [
      rect(110, y, 860, 210, 'rgba(255,255,255,0.96)', { name: 'Review card', cornerRadius: 28 }),
      avatar(review.face, 205, y + 105, 58, TIDE.teal),
      text(review.name, 295, y + 40, 360, {
        fontFamily: HEAD,
        fontSize: 32,
        fontWeight: 700,
        fill: TIDE.ink,
      }),
      rating(720, y + 44, 30, 5, '#f5a524'),
      text(review.quote, 295, y + 92, 640, {
        fontFamily: BODY,
        fontSize: 27,
        fontWeight: 400,
        fill: '#475b59',
        lineHeight: 1.35,
      }),
    ];
  }),
  brandMark(0, 1230, W, TIDE.white, 'center'),
]);

const boostSteps = template(W, H, () => [
  rect(0, 0, W, H, TIDE.night, { name: 'Background' }),
  Array.from({ length: 12 }, (_, index) =>
    rect(index * 90 + 45, 0, 2, H, 'rgba(94,234,212,0.07)', { name: 'Grid line' }),
  ),
  Array.from({ length: 15 }, (_, index) =>
    rect(0, index * 90 + 45, W, 2, 'rgba(94,234,212,0.07)', { name: 'Grid line' }),
  ),
  ellipse(140, 300, 800, 700, 'rgba(15,165,150,0.12)', { name: 'Glow' }),
  text('4 Steps to Lift', 0, 110, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: TIDE.white,
    align: 'center',
  }),
  text('Engagement', 0, 200, W, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 800,
    fill: TIDE.aqua,
    align: 'center',
  }),
  [
    'Map who you are talking to and the\nproblems they need solved first.',
    'Share useful insight, not pitches, so\nevery post earns attention.',
    'Ask questions and run quick polls to\nturn readers into conversations.',
    'Post on a steady rhythm so your brand\nfeels familiar and dependable.',
  ].map((step, index) => {
    const y = 380 + index * 200;
    return [
      rect(110, y, 860, 160, 'rgba(255,255,255,0.03)', {
        name: 'Step row',
        cornerRadius: 80,
        stroke: 'rgba(255,255,255,0.75)',
        strokeWidth: 3,
      }),
      ellipse(130, y + 20, 120, 120, 'rgba(15,165,150,0.25)', {
        name: 'Step number',
        stroke: TIDE.aqua,
        strokeWidth: 3,
      }),
      text(String(index + 1).padStart(2, '0'), 130, y + 52, 120, {
        fontFamily: HEAD,
        fontSize: 46,
        fontWeight: 800,
        fill: TIDE.white,
        align: 'center',
      }),
      text(step, 290, y + 40, 640, {
        fontFamily: BODY,
        fontSize: 28,
        fontWeight: 500,
        fill: TIDE.white,
        lineHeight: 1.35,
      }),
    ];
  }),
  icon('chevrons-right', 500, 1190, 80, TIDE.aqua),
]);

const statRing = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#f5f9f8', '#dfecea'), { name: 'Background' }),
  text('68%', 80, 90, 400, {
    fontFamily: HEAD,
    fontSize: 150,
    fontWeight: 800,
    fill: TIDE.teal,
    lineHeight: 1,
  }),
  text('of buyers expect a\ntailored journey.', 440, 110, 600, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 600,
    fill: TIDE.ink,
    lineHeight: 1.2,
  }),
  ringArc(540, 800, 340, 230, 0, 359.9, '#c3d3d0'),
  ringArc(540, 800, 340, 230, -90, 155, linear(120, TIDE.aqua, TIDE.teal, TIDE.sea)),
  text('Survey of 1,200\nB2B buyers', 340, 760, 400, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 600,
    fill: TIDE.sea,
    align: 'center',
    lineHeight: 1.3,
  }),
  rect(80, 1220, 240, 64, TIDE.ink, { name: 'Button', cornerRadius: 32 }),
  text('Learn More', 80, 1237, 240, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: TIDE.white,
    align: 'center',
  }),
  brandMark(560, 1236, 440, TIDE.sea, 'right'),
]);

const stickyNotes = (height: number) => {
  const dy = (height - H) / 2;
  const note = (label: string, x: number, y: number, rotation: number) =>
    rotateNodes(rotation, x, y + dy, [
      rect(x, y + dy, 220, 210, TIDE.amber, {
        name: 'Sticky note',
        ...shadow(18, 10, 'rgba(0,0,0,0.35)'),
      }),
      text(label, x, y + dy + 80, 220, {
        fontFamily: 'Caveat',
        fontSize: 46,
        fontWeight: 600,
        fill: TIDE.ink,
        align: 'center',
      }),
    ]);
  return template(W, height, () => [
    rect(0, 0, W, height, linear(180, '#0b1918', TIDE.night), { name: 'Background' }),
    text('Things to master in', 0, 150 + dy, W, {
      fontFamily: BODY,
      fontSize: 42,
      fontWeight: 500,
      fill: TIDE.amber,
      align: 'center',
    }),
    text('B2B', 0, 220 + dy, W, {
      fontFamily: HEAD,
      fontSize: 130,
      fontWeight: 800,
      fill: TIDE.white,
      align: 'center',
      lineHeight: 1,
    }),
    text('Growth', 0, 350 + dy, W, {
      fontFamily: HEAD,
      fontSize: 130,
      fontWeight: 800,
      fill: linear(90, TIDE.aqua, TIDE.teal),
      align: 'center',
      lineHeight: 1,
    }),
    note('Audience', 160, 590, -6),
    note('Trust', 430, 570, 4),
    note('Pipeline', 700, 590, -3),
    note('Value', 290, 850, 5),
    note('Retention', 580, 850, -4),
    brandMark(0, 1200 + dy, W, TIDE.white, 'center'),
  ]);
};

export const stickyPost = stickyNotes(H);
export const stickyStory = stickyNotes(STORY_SIZE.height);

export const POSTS = [
  eventsBoard,
  analyticsBars,
  aiSearch,
  websiteLive,
  skillPoll,
  statRing,
  powerWords,
  stickyPost,
  stayAhead,
  clientsSay,
  boostSteps,
];
