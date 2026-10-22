import { linear } from '@/design';
import {
  avatar,
  card,
  circle,
  icon,
  path,
  phone,
  phoneScreen,
  photo,
  poly,
  rating,
  rect,
  STORY_SIZE,
  type Template,
  template,
} from '../../../kit';
import {
  bankingChoice,
  button,
  copy,
  fasterLoans,
  H,
  head,
  logo,
  NV,
  smarterPlans,
  W,
  webinarSteps,
} from './posts';

const hillPath = (width: number, height: number, corner: number) =>
  `M0 70 C ${width * 0.3} 0 ${width * 0.6} 10 ${width} 60 L${width} ${height - corner} Q${width} ${height} ${width - corner} ${height} L${corner} ${height} Q0 ${height} 0 ${height - corner} Z`;

const futureDigital = (height: number): Template =>
  template(W, height, () => {
    const tall = height > 1500;
    const top = tall ? 260 : 110;
    const phoneWidth = tall ? 440 : 330;
    const screen = phoneScreen(phoneWidth);
    return [
      rect(0, 0, W, height, NV.cream, { name: 'Background' }),
      head('The future of finance', 80, top, 940, 74, NV.teal, 600),
      head('is digital.', 80, top + 88, 940, 104, NV.coral, 800),
      copy(
        'Manage every account, card and goal\nright from your pocket.',
        80,
        top + 240,
        900,
        32,
        NV.ink,
      ),
      button('Get Started Free', 80, top + 360, NV.teal, NV.white),
      path(
        'M0 170 C 260 40 620 320 1080 90 L1080 520 L0 520 Z',
        0,
        height - 520,
        W,
        520,
        NV.coralSoft,
        { width: 1080, height: 520 },
        { name: 'Wave back' },
      ),
      path(
        'M0 300 C 320 160 700 420 1080 230 L1080 520 L0 520 Z',
        0,
        height - 520,
        W,
        520,
        linear(90, NV.coral, '#ff9a6b'),
        { width: 1080, height: 520 },
        { name: 'Wave front' },
      ),
      phone(tall ? 520 : 620, height - (tall ? 1180 : 860), phoneWidth, {
        rotation: 8,
        screen: linear(180, '#bfe6f2', '#f2fbff'),
        content: [
          path(
            hillPath(screen.width, screen.height * 0.38, phoneWidth * 0.12),
            0,
            screen.height * 0.62,
            screen.width,
            screen.height * 0.38,
            NV.teal,
            { width: screen.width, height: screen.height * 0.38 },
            { name: 'Hill' },
          ),
          circle(screen.width * 0.72, screen.height * 0.13, 40, NV.coral, { name: 'Sun' }),
          rect(30, screen.height * 0.36, screen.width - 60, 110, NV.white, {
            cornerRadius: 22,
            name: 'Balance card',
          }),
          copy('Savings', 52, screen.height * 0.36 + 14, 200, 22, NV.ink),
          head('+12.4%', 52, screen.height * 0.36 + 44, 220, 44, NV.teal, 800),
        ],
      }),
      logo(190, height - 120, NV.white),
    ];
  });

export const futureDigitalPost = futureDigital(H);
export const futureDigitalStory = futureDigital(STORY_SIZE.height);

const REVIEWS = [
  {
    photo: 'woman-portrait-2',
    name: 'Priya Malhotra',
    quote: 'Clear advice and quick answers.\nMy savings finally make sense.',
    x: 100,
  },
  {
    photo: 'man-portrait-3',
    name: 'Leon Barrett',
    quote: 'Simple to set up and easy to trust.\nHighly recommended.',
    x: 180,
  },
  {
    photo: 'woman-portrait-5',
    name: 'Ana Whitfield',
    quote: 'The smartest way I have ever\nplanned my money.',
    x: 120,
  },
] as const;

const testimonials = template(W, H, () => [
  rect(0, 0, W, H, linear(170, NV.teal, NV.deep), { name: 'Background' }),
  head('What clients say', 0, 100, W, 60, NV.white, 700, { align: 'center' }),
  REVIEWS.map((review, index) => {
    const y = 240 + index * 260;
    return [
      card(review.x, y, 800, 220, { fill: NV.white, radius: 32 }),
      avatar(review.photo, review.x + 90, y + 110, 56, NV.coralSoft),
      head(review.name, review.x + 175, y + 36, 380, 32, NV.deep, 700),
      rating(review.x + 590, y + 42, 26, 5, NV.coral, 0.2),
      copy(review.quote, review.x + 175, y + 90, 600, 26, NV.ink),
    ];
  }),
  icon('sparkles', 930, 150, 80, NV.coral, { strokeWidth: 2 }),
  icon('sparkles', 50, 1010, 64, NV.coralSoft, { strokeWidth: 2 }),
  logo(540, 1180, NV.white),
]);

const STATS = [
  { value: '27%', label: 'Higher\nsavings', fill: NV.teal },
  { value: '4x', label: 'More new\nclients', fill: NV.deep },
  { value: '98%', label: 'Client\nhappiness', fill: NV.coral },
] as const;

const dataInsights = template(W, H, () => [
  rect(0, 0, W, H, NV.mist, { name: 'Background' }),
  photo('woman-portrait-4', 0, 0, W, 560, { crop: { zoom: 1, focusX: 0.5, focusY: 0.3 } }),
  rect(0, 300, W, 262, linear(180, 'rgba(230,241,240,0)', NV.mist), { name: 'Fade' }),
  head('Turning\nFinancial Data', 80, 520, 920, 80, NV.deep, 700, { lineHeight: 1.1 }),
  head('into Insights', 80, 696, 920, 80, NV.coral, 800),
  STATS.map((item, index) => {
    const x = 80 + index * 325;
    return [
      rect(x, 840, 270, 230, item.fill, { cornerRadius: 30, name: 'Stat badge' }),
      poly(
        [
          [x + 105, 1068],
          [x + 165, 1068],
          [x + 135, 1106],
        ],
        item.fill,
        { name: 'Badge pointer' },
      ),
      head(item.value, x, 866, 270, 84, NV.white, 800, { align: 'center' }),
      copy(item.label, x, 970, 270, 26, NV.white, { align: 'center', lineHeight: 1.25 }),
    ];
  }),
  logo(540, 1190, NV.deep),
]);

const securityPost = template(W, H, () => [
  rect(0, 0, W, H, linear(180, NV.white, NV.mist), { name: 'Background' }),
  logo(540, 120, NV.deep),
  rect(120, 300, 840, 160, NV.deep, { cornerRadius: 28, name: 'Header box' }),
  rect(150, 330, 100, 100, NV.coral, { cornerRadius: 22, name: 'Header icon' }),
  icon('shield-check', 172, 352, 56, NV.white, { strokeWidth: 2.4 }),
  head('Your data stays protected', 280, 334, 660, 40, NV.white, 700),
  head('by bank-grade security', 280, 386, 660, 32, NV.coral, 600),
  (['lock', 'shield-check', 'key-round'] as const).map((name, index) => [
    rect(120 + index * 290, 540, 260, 260, linear(150, '#ff9a6b', NV.coral), {
      cornerRadius: 40,
      name: 'Security tile',
    }),
    icon(name, 185 + index * 290, 605, 130, NV.white, { strokeWidth: 1.8 }),
  ]),
  head('Encrypted & Secure Account Data.', 0, 900, W, 44, NV.deep, 800, { align: 'center' }),
  copy('We take your privacy seriously,\nso you never have to worry.', 0, 970, W, 34, NV.ink, {
    align: 'center',
  }),
  button('See How It Works', 395, 1140, NV.teal, NV.white),
]);

export const POSTS = [
  bankingChoice,
  securityPost,
  smarterPlans,
  futureDigitalPost,
  testimonials,
  dataInsights,
  fasterLoans,
  webinarSteps,
];
