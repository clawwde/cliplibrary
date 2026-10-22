import { linear, radial } from '@/design';
import {
  circle,
  icon,
  POST_SIZE,
  path,
  poly,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  aiBeginners,
  automationCard,
  BODY,
  backdrop,
  bigWords,
  CLEAR,
  clientReviews,
  H,
  HEAD,
  launchPoster,
  SHINE,
  VOLT,
  W,
  wifiSpeed,
  words,
} from './posts';

const scaleGauge = template(W, H, () => [
  backdrop(H),
  rect(150, 150, 130, 130, linear(135, VOLT.sky, VOLT.blue), {
    name: 'Icon tile',
    cornerRadius: 32,
    ...shadow(40, 0, 'rgba(61,123,255,0.7)'),
  }),
  icon('sparkles', 180, 180, 70, VOLT.white),
  text('Scale AI across', 310, 160, 650, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 400,
    fill: VOLT.white,
  }),
  text('your business', 310, 216, 650, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 700,
    fill: VOLT.sky,
  }),
  Array.from({ length: 41 }, (_, index) => {
    const long = index % 5 === 0;
    const length = long ? 70 : 40;
    return rotateNodes(190 + index * 4, 540, 1000, [
      rect(540 + 440 - length, 998, length, 4, long ? VOLT.white : 'rgba(255,255,255,0.45)', {
        name: 'Tick',
      }),
    ]);
  }),
  words('72%', 740, 280, linear(180, VOLT.white, VOLT.sky), 800),
  text('faster rollouts with smart agents', 0, 1100, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: VOLT.grey,
    align: 'center',
  }),
]);

const statsGlobe = template(W, H, () => {
  const meridians = [110, 230, 340].map(
    (spread) => `M ${540 - spread} 1350 A ${spread} 420 0 0 1 ${540 + spread} 1350`,
  );
  const parallels = [0.3, 0.58, 0.82].map((ratio) => {
    const y = 1350 - 420 * ratio;
    const half = 420 * Math.sqrt(1 - ratio * ratio);
    return `M ${(540 - half).toFixed(1)} ${y.toFixed(1)} L ${(540 + half).toFixed(1)} ${y.toFixed(1)}`;
  });
  return [
    backdrop(H),
    [
      { label: 'Organisations', value: '512K' },
      { label: 'Repositories', value: '284M' },
      { label: 'Contributors', value: '21.4K' },
      { label: 'Integrations', value: '16.8K' },
    ].map((item, index) => {
      const x = 90 + (index % 2) * 470;
      const y = 150 + Math.floor(index / 2) * 260;
      return [
        text(item.label, x, y, 430, {
          fontFamily: BODY,
          fontSize: 34,
          fontWeight: 500,
          fill: VOLT.grey,
          align: 'center',
        }),
        words(item.value, y + 50, 130, linear(180, VOLT.white, VOLT.sky), 800, x, 430),
      ];
    }),
    path(
      'M 120 1350 A 420 420 0 0 1 960 1350 Z',
      0,
      0,
      W,
      H,
      linear(180, VOLT.blue, '#0a1440'),
      POST_SIZE,
      {
        name: 'Globe',
        stroke: VOLT.sky,
        strokeWidth: 4,
        ...shadow(80, 0, 'rgba(61,123,255,0.8)'),
      },
    ),
    path([...meridians, ...parallels].join(' '), 0, 0, W, H, CLEAR, POST_SIZE, {
      name: 'Globe lines',
      stroke: 'rgba(255,255,255,0.35)',
      strokeWidth: 3,
    }),
  ];
});

const nowList = template(W, H, () => [
  backdrop(H),
  words('When should your team\nstart using AI?', 170, 68, VOLT.white, 700),
  [
    { label: 'Next quarter', active: false },
    { label: 'Tomorrow', active: false },
    { label: 'Right NOW', active: true },
  ].map((row, index) => {
    const y = 560 + index * 170;
    return [
      circle(330, y + 40, 38, row.active ? radial(VOLT.white, VOLT.blue) : CLEAR, {
        name: 'Radio',
        stroke: row.active ? VOLT.sky : 'rgba(255,255,255,0.5)',
        strokeWidth: 5,
        ...(row.active ? shadow(40, 0, VOLT.blue) : {}),
      }),
      text(row.label, 410, y, 600, {
        fontFamily: HEAD,
        fontSize: 68,
        fontWeight: row.active ? 800 : 400,
        fill: row.active ? VOLT.white : VOLT.grey,
      }),
    ];
  }),
  text('kestrel.ai', 0, 1200, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 600,
    fill: VOLT.sky,
    align: 'center',
    letterSpacing: 2,
  }),
]);

const newWebsite = template(W, H, () => [
  backdrop(H),
  rotateNodes(-6, 540, 300, [
    rect(170, 240, 740, 116, VOLT.white, {
      name: 'Address bar',
      cornerRadius: 58,
      ...shadow(60, 10, 'rgba(61,123,255,0.8)'),
    }),
    icon('globe', 206, 276, 46, VOLT.blue),
    text('kestrel.ai', 272, 272, 420, {
      fontFamily: BODY,
      fontSize: 44,
      fontWeight: 600,
      fill: VOLT.ink,
    }),
    rect(778, 258, 112, 80, VOLT.blue, { name: 'Search button', cornerRadius: 40 }),
    icon('search', 812, 276, 44, VOLT.white),
  ]),
  poly(
    [
      [840, 360],
      [840, 440],
      [860, 422],
      [876, 456],
      [892, 449],
      [876, 416],
      [904, 416],
    ],
    VOLT.white,
    { name: 'Cursor', stroke: VOLT.ink, strokeWidth: 3 },
  ),
  words('New Website', 600, 116, VOLT.white, 800),
  words('is now live', 725, 116, SHINE, 800),
  rect(380, 920, 320, 90, CLEAR, {
    name: 'Visit button',
    cornerRadius: 45,
    stroke: VOLT.white,
    strokeWidth: 3,
  }),
  text('Visit Today', 380, 943, 320, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 600,
    fill: VOLT.white,
    align: 'center',
  }),
]);

export const architect = template(W, H, () => [
  backdrop(H),
  circle(540, 450, 340, radial('rgba(61,123,255,0.55)', CLEAR), { name: 'Glow' }),
  circle(540, 430, 190, radial('#f4f8ff', VOLT.sky, VOLT.blue), {
    name: 'Bulb',
    ...shadow(90, 0, 'rgba(61,123,255,1)'),
  }),
  path(
    'M 490 460 L 510 400 L 530 460 L 550 400 L 570 460 L 590 400',
    0,
    0,
    W,
    H,
    CLEAR,
    POST_SIZE,
    { name: 'Filament', stroke: VOLT.white, strokeWidth: 6 },
  ),
  [0, 1, 2].map((index) =>
    rect(460, 600 + index * 34, 160, 26, linear(90, '#5b6478', '#d5dbe6', '#5b6478'), {
      name: 'Bulb base',
      cornerRadius: 10,
    }),
  ),
  rect(500, 702, 80, 34, '#2a3142', { name: 'Bulb tip', cornerRadius: 14 }),
  icon('quote', 80, 830, 96, VOLT.sky, { strokeWidth: 2.4 }),
  words('Architect', 950, 100, VOLT.white, 800, 80, 900, 'left'),
  text('Designing scalable systems with\ndata-driven creative strategy.', 80, 1080, 900, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 400,
    fill: VOLT.grey,
    lineHeight: 1.4,
  }),
]);

export const wordsBlue = bigWords('Kestrel AI', VOLT.blue, '#14307d');
export const wordsGreen = bigWords('Vela AI', VOLT.mint, '#064e3b');
export const launchPost = launchPoster(H);
export const launchStory = launchPoster(STORY_SIZE.height);

export const POSTS = [
  aiBeginners,
  wifiSpeed,
  wordsBlue,
  newWebsite,
  scaleGauge,
  launchPost,
  nowList,
  automationCard,
  architect,
  clientReviews,
  statsGlobe,
];
