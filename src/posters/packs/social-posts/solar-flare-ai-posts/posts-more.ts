import { linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
  laptop,
  POST_SIZE,
  path,
  photo,
  poly,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  blueprint,
  buildPatterns,
  builtForPower,
  CLEAR,
  FLARE,
  glow,
  gridFloor,
  H,
  HEAD,
  headline,
  percentCharged,
  solutionsAmber,
  W,
} from './posts';

export const adsGrowth = template(W, H, () => [
  rect(0, 0, W, H, linear(180, FLARE.black, '#140d07'), { name: 'Background' }),
  glow(920, 560, 150, 'rgba(255,182,72,0.35)'),
  text('Generate', 80, 140, 500, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 500,
    fill: FLARE.white,
  }),
  text('6x', 520, 140, 300, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 800,
    fill: FLARE.amber,
  }),
  headline('more results\nfrom your Ads', 240, 84, FLARE.white, 500, 80, 900, 'left'),
  gridFloor(1080, 1350, 'rgba(255,182,72,0.45)'),
  path(
    'M 0 1000 C 120 1040 200 1060 300 960 S 460 820 560 930 S 760 1000 820 820 S 900 600 940 560',
    0,
    0,
    W,
    H,
    CLEAR,
    POST_SIZE,
    { name: 'Growth line', stroke: FLARE.amber, strokeWidth: 10, ...shadow(24, 0, FLARE.orange) },
  ),
  circle(940, 560, 26, FLARE.white, {
    name: 'Peak',
    ...shadow(40, 0, 'rgba(255,182,72,1)'),
  }),
]);

const clockSaved = template(W, H, () => [
  rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
  glow(540, 620, 520, 'rgba(255,106,26,0.25)'),
  ['02', '47'].map((digits, index) => {
    const x = 120 + index * 460;
    return [
      rect(x, 440, 380, 330, linear(180, FLARE.panel, FLARE.coal), {
        name: 'Clock panel',
        cornerRadius: 28,
        stroke: 'rgba(255,255,255,0.3)',
        strokeWidth: 3,
        ...shadow(50, 20, 'rgba(0,0,0,0.6)'),
      }),
      text(digits, x, 440, 380, {
        fontFamily: 'VT323',
        fontSize: 330,
        fontWeight: 400,
        fill: FLARE.white,
        align: 'center',
        lineHeight: 1,
      }),
    ];
  }),
  rect(525, 550, 30, 30, FLARE.amber, { name: 'Colon dot', cornerRadius: 6 }),
  rect(525, 640, 30, 30, FLARE.amber, { name: 'Colon dot', cornerRadius: 6 }),
  text('Minutes', 120, 840, 330, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 700,
    fill: FLARE.amber,
    align: 'right',
  }),
  text('saved with AI', 470, 840, 520, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 500,
    fill: FLARE.white,
  }),
  text('per report, every single day', 0, 930, W, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 400,
    fill: FLARE.grey,
    align: 'center',
  }),
]);

export const fiveStages = template(W, H, () => [
  rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
  glow(540, 800, 520, 'rgba(255,140,40,0.3)'),
  headline('5 Stages of', 110, 72, FLARE.white, 400),
  headline('Enterprise AI', 200, 96, FLARE.amber, 800),
  text('5', 0, 330, W, {
    fontFamily: HEAD,
    fontSize: 860,
    fontWeight: 800,
    fill: linear(180, '#ffd79a', FLARE.orange, 'rgba(255,106,26,0.15)'),
    align: 'center',
    lineHeight: 1,
    ...shadow(60, 0, 'rgba(255,140,40,0.55)'),
  }),
  Array.from({ length: 7 }, (_, index) => {
    const width = 420 - index * 40;
    return rect(
      540 - width / 2,
      1310 - index * 34,
      width,
      26,
      linear(90, '#1c1714', '#3a312a', '#1c1714'),
      {
        name: 'Step',
        cornerRadius: 4,
      },
    );
  }),
]);

const quotePortrait = template(W, H, () => [
  rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
  photo('man-portrait-2', 520, 0, 560, H, {
    filters: {
      brightness: 0.9,
      contrast: 1.15,
      saturation: 1,
      hue: 0,
      blur: 0,
      grayscale: 1,
      sepia: 0,
      invert: 0,
    },
  }),
  rect(520, 0, 360, H, linear(90, FLARE.black, CLEAR), { name: 'Fade' }),
  rect(0, 1000, W, 350, linear(180, CLEAR, 'rgba(255,106,26,0.35)'), { name: 'Warm fade' }),
  icon('quote', 80, 380, 96, FLARE.amber, { strokeWidth: 2.4 }),
  headline('Artificial\nintelligence', 510, 72, FLARE.white, 600, 80, 700, 'left'),
  headline('is a tool,\nnot a threat.', 670, 72, FLARE.amber, 800, 80, 700, 'left'),
  rect(80, 880, 60, 4, FLARE.amber, { name: 'Rule' }),
  text('Dara Whitfield, Founder', 160, 866, 500, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: FLARE.grey,
  }),
]);

const newPage = template(W, H, () => [
  rect(0, 0, W, H, FLARE.black, { name: 'Background' }),
  glow(540, 760, 480, 'rgba(255,140,40,0.25)'),
  text('halogen.ai', 0, 90, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: FLARE.grey,
    align: 'center',
  }),
  headline('New Page', 160, 112, FLARE.white, 800),
  headline('is live now', 280, 112, FLARE.amber, 800),
  ellipse(200, 1090, 680, 110, '#1d1713', { name: 'Stand top' }),
  rect(200, 1145, 680, 140, linear(180, '#1d1713', FLARE.black), { name: 'Stand' }),
  laptop(250, 580, 580, {
    body: '#2a241f',
    content: [
      rect(0, 0, 551, 331, linear(180, '#ffcf8a', '#ff8a3d'), { name: 'Sky' }),
      circle(400, 120, 50, '#fff3dc', { name: 'Sun' }),
      poly(
        [
          [0, 230],
          [200, 160],
          [380, 220],
          [551, 170],
          [551, 331],
          [0, 331],
        ],
        '#7a3a1a',
        { name: 'Hill' },
      ),
      poly(
        [
          [0, 290],
          [300, 240],
          [551, 280],
          [551, 331],
          [0, 331],
        ],
        '#4a2312',
        { name: 'Hill' },
      ),
    ],
  }),
  rotateNodes(-12, 740, 560, [
    rect(740, 560, 230, 70, FLARE.amber, { name: 'Sticker', cornerRadius: 35 }),
    text('Visit today!', 740, 578, 230, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 700,
      fill: FLARE.black,
      align: 'center',
    }),
  ]),
]);

export const powerPost = builtForPower(H);
export const powerStory = builtForPower(STORY_SIZE.height);

export const POSTS = [
  percentCharged,
  buildPatterns,
  solutionsAmber,
  blueprint,
  powerPost,
  adsGrowth,
  clockSaved,
  fiveStages,
  quotePortrait,
  newPage,
];
