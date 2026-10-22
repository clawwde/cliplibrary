import { linear } from '@/design';
import {
  circle,
  estimateTextWidth,
  icon,
  pill,
  rect,
  STORY_SIZE,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  brand,
  COPPER,
  centered,
  copperText,
  glow,
  H,
  HEAD,
  mistakes,
  quotePost,
  statRows,
  toggles,
  W,
} from './posts';

const PRINCIPLES = [
  { label: 'Oversight', x: 100, y: 620, height: 360 },
  { label: 'Clarity', x: 330, y: 520, height: 320 },
  { label: 'Fairness', x: 560, y: 660, height: 320 },
  { label: 'Privacy', x: 790, y: 560, height: 360 },
];

const principles = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#28190f', COPPER.black), { name: 'Background' }),
  glow(540, 760, 460, 0.3),
  centered('What Makes AI', 150, 72, 500, COPPER.white),
  centered('Trustworthy?', 236, 96, 800, copperText),
  PRINCIPLES.map((item) => [
    rect(
      item.x,
      item.y,
      200,
      item.height,
      linear(180, 'rgba(255,138,61,0.6)', 'rgba(255,138,61,0.06)'),
      {
        cornerRadius: 26,
        stroke: 'rgba(255,192,122,0.55)',
        strokeWidth: 2,
        name: 'Principle card',
      },
    ),
    icon('arrow-up-right', item.x + 142, item.y + 20, 38, COPPER.white, { strokeWidth: 2.4 }),
    text(item.label, item.x, item.y + item.height - 64, 200, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 700,
      fill: COPPER.white,
      align: 'center',
    }),
  ]),
  brand(1220),
]);

const uploadFile = template(W, H, () => [
  rect(0, 0, W, H, COPPER.black, { name: 'Background' }),
  Array.from({ length: 10 }, (_, index) =>
    rect(index * 120 + 0, 0, 2, H, 'rgba(255,255,255,0.04)', { name: 'Grid line' }),
  ),
  glow(540, 680, 460, 0.3),
  centered('Introducing', 150, 74, 500, linear(180, COPPER.white, COPPER.grey)),
  centered('Autopilot', 240, 100, 800, copperText),
  rect(130, 470, 820, 400, 'rgba(255,255,255,0.05)', {
    cornerRadius: 34,
    stroke: 'rgba(255,192,122,0.45)',
    strokeWidth: 2,
    name: 'Upload panel',
  }),
  rect(190, 534, 70, 30, COPPER.burnt, { cornerRadius: 8, name: 'Folder tab' }),
  rect(190, 550, 150, 108, copperText, { cornerRadius: 14, name: 'Folder' }),
  text('autopilot_v3.zip', 380, 548, 460, {
    fontFamily: HEAD,
    fontSize: 44,
    fontWeight: 700,
    fill: COPPER.white,
  }),
  text('84.2 MB', 380, 610, 300, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 500,
    fill: COPPER.grey,
  }),
  icon('circle-x', 856, 506, 52, COPPER.grey, { strokeWidth: 2 }),
  rect(190, 730, 700, 74, 'rgba(255,255,255,0.06)', {
    cornerRadius: 37,
    stroke: 'rgba(255,192,122,0.35)',
    strokeWidth: 2,
    name: 'Progress track',
  }),
  rect(198, 738, 490, 58, copperText, { cornerRadius: 29, name: 'Progress' }),
  text('Uploading  72%', 230, 750, 420, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 700,
    fill: COPPER.ink,
  }),
  text('Ship updates without the wait.', 0, 960, W, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: COPPER.pale,
    align: 'center',
  }),
  brand(1220),
]);

const BARS = [
  { value: '35%', height: 300 },
  { value: '62%', height: 470 },
  { value: '88%', height: 640 },
];

const velocityBars = template(W, H, () => [
  rect(0, 0, W, H, linear(180, COPPER.black, '#24170e'), { name: 'Background' }),
  glow(780, 1000, 300, 0.35),
  text('Pipeline', 80, 130, 900, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: COPPER.white,
  }),
  text('Velocity', 80, 236, 900, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: copperText,
  }),
  text('Move deals from the first call to a signed\ncontract in record time.', 80, 372, 920, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 400,
    fill: COPPER.grey,
    lineHeight: 1.4,
  }),
  BARS.map((bar, index) => {
    const x = 220 + index * 230;
    const y = 1260 - bar.height;
    return [
      rect(x, y, 180, bar.height, linear(180, 'rgba(255,192,122,0.95)', 'rgba(255,138,61,0.2)'), {
        cornerRadius: 90,
        stroke: 'rgba(255,192,122,0.6)',
        strokeWidth: 2,
        name: 'Bar',
      }),
      text(bar.value, x, y + 66, 180, {
        fontFamily: HEAD,
        fontSize: 44,
        fontWeight: 800,
        fill: COPPER.ink,
        align: 'center',
      }),
    ];
  }),
]);

const pillRow = (labels: readonly [string, boolean][], y: number) => {
  const widths = labels.map(([label]) => estimateTextWidth(label, 30) + 66);
  const total = widths.reduce((sum, width) => sum + width, 0) + (labels.length - 1) * 24;
  let x = (W - total) / 2;
  return labels.map(([label, filled], index) => {
    const node = pill(label, x, y, {
      fill: filled ? copperText : 'rgba(0,0,0,0)',
      color: filled ? COPPER.ink : COPPER.white,
      stroke: COPPER.amber,
      strokeWidth: filled ? 0 : 2,
      fontSize: 30,
      fontFamily: BODY,
      fontWeight: 700,
      padX: 33,
    });
    x += (widths[index] ?? 0) + 24;
    return node;
  });
};

const whyUs = template(W, H, () => [
  rect(0, 0, W, H, linear(160, '#2a1a0f', COPPER.black), { name: 'Background' }),
  glow(540, 640, 420, 0.3),
  centered('Why Founders', 220, 74, 500, COPPER.white),
  centered('Pick Us', 306, 100, 800, copperText),
  pillRow(
    [
      ['Clear Pricing', false],
      ['Senior Strategy Team', true],
    ],
    520,
  ),
  pillRow(
    [
      ['Client-First Approach', true],
      ['Always-On Support', false],
    ],
    630,
  ),
  text(
    'We pair senior strategy with hands-on\ndelivery, so every launch ships on time.',
    0,
    800,
    W,
    {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 400,
      fill: COPPER.grey,
      align: 'center',
      lineHeight: 1.45,
    },
  ),
  brand(1220),
]);

const closeRate = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#1c120b', COPPER.black), { name: 'Background' }),
  glow(760, 980, 300, 0.35),
  text('Our close rate is', 80, 230, 900, {
    fontFamily: HEAD,
    fontSize: 58,
    fontWeight: 500,
    fill: COPPER.white,
  }),
  text('4x', 60, 290, 700, {
    fontFamily: HEAD,
    fontSize: 380,
    fontWeight: 800,
    fill: linear(180, COPPER.amber, COPPER.copper),
    lineHeight: 1,
  }),
  text('the industry norm.', 80, 700, 900, {
    fontFamily: HEAD,
    fontSize: 58,
    fontWeight: 500,
    fill: COPPER.white,
  }),
  icon('share-2', 560, 760, 460, COPPER.copper, { strokeWidth: 2.6, opacity: 0.85 }),
  text('KILNWORKS AI', 80, 1220, 500, {
    fontFamily: HEAD,
    fontSize: 30,
    fontWeight: 800,
    fill: COPPER.white,
    letterSpacing: 4,
  }),
]);

const workshop = (height: number) => {
  const cy = height / 2;
  return [
    rect(0, 0, W, height, COPPER.black, { name: 'Background' }),
    circle(540, cy, 520, linear(180, COPPER.copper, '#3d1f0b'), { name: 'Outer ring' }),
    circle(540, cy, 470, linear(180, '#1d130c', COPPER.black), { name: 'Ring hole' }),
    circle(540, cy, 420, 'rgba(0,0,0,0)', {
      stroke: 'rgba(255,138,61,0.25)',
      strokeWidth: 3,
      name: 'Ring',
    }),
    circle(540, cy, 360, 'rgba(0,0,0,0)', {
      stroke: 'rgba(255,138,61,0.15)',
      strokeWidth: 3,
      name: 'Ring',
    }),
    centered('AI Basics', cy - 300, 96, 800, COPPER.white),
    centered('for Founders', cy - 196, 84, 800, copperText),
    rect(400, cy - 70, 280, 56, copperText, { cornerRadius: 28, name: 'Chip' }),
    text('WORKSHOP', 400, cy - 58, 280, {
      fontFamily: BODY,
      fontSize: 26,
      fontWeight: 800,
      fill: COPPER.ink,
      align: 'center',
      letterSpacing: 3,
    }),
    text('New to AI but not sure where to start?\nLearn the essentials live.', 0, cy + 20, W, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 500,
      fill: COPPER.pale,
      align: 'center',
      lineHeight: 1.4,
    }),
    text('March 12, 2027\n6 PM GMT  |  1 PM EST', 0, cy + 140, W, {
      fontFamily: HEAD,
      fontSize: 38,
      fontWeight: 700,
      fill: COPPER.white,
      align: 'center',
      lineHeight: 1.3,
    }),
    brand(cy + 320),
    height > H
      ? [
          centered('LIVE ONLINE EVENT', 220, 40, 800, COPPER.amber),
          rect(340, height - 300, 400, 90, copperText, { cornerRadius: 45, name: 'Button' }),
          text('Save your seat', 340, height - 274, 400, {
            fontFamily: BODY,
            fontSize: 34,
            fontWeight: 800,
            fill: COPPER.ink,
            align: 'center',
          }),
        ]
      : [],
  ];
};

export const workshopPost = template(W, H, () => workshop(H));

export const workshopStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  workshop(STORY_SIZE.height),
);

export const POSTS = [
  quotePost,
  principles,
  uploadFile,
  toggles,
  mistakes,
  statRows,
  workshopPost,
  velocityBars,
  whyUs,
  closeRate,
];
