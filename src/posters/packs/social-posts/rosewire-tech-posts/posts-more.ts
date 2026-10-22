import { linear } from '@/design';
import {
  circle,
  ellipse,
  icon,
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
  BODY,
  blueprintKeys,
  brand,
  clientReviews,
  cursor,
  folderHero,
  glow,
  H,
  HEAD,
  modularClick,
  ROSE,
  roseText,
  W,
} from './posts';

const fileButton = (
  label: string,
  y: number,
  width: number,
  fill: string | ReturnType<typeof linear>,
  ink: string,
  struck: boolean,
) => [
  rect((W - width) / 2, y, width, 100, fill, {
    cornerRadius: 26,
    name: 'File',
    ...shadow(30, 12, 'rgba(0,0,0,0.45)'),
  }),
  text(label, (W - width) / 2, y + 28, width, {
    fontFamily: HEAD,
    fontSize: 38,
    fontWeight: 700,
    fill: ink,
    align: 'center',
    strikethrough: struck,
  }),
];

const newFeature = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#150e18', ROSE.black), { name: 'Background' }),
  glow(540, 860, 420, 0.4),
  brand(90, 'left'),
  text('Just Shipped', 80, 190, 920, {
    fontFamily: HEAD,
    fontSize: 80,
    fontWeight: 500,
    fill: ROSE.white,
  }),
  text('Smart Inbox', 80, 284, 920, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: roseText,
  }),
  text(
    'Our latest release sorts, tags and answers routine\nrequests, so your team can focus on real work.',
    80,
    430,
    920,
    { fontFamily: BODY, fontSize: 30, fontWeight: 400, fill: ROSE.grey, lineHeight: 1.45 },
  ),
  fileButton('inbox_final.app', 1000, 380, '#1e1722', '#6f6270', true),
  fileButton('inbox_v2.app', 880, 460, '#2a2130', ROSE.grey, true),
  fileButton('SmartInbox.app', 740, 580, roseText, ROSE.black, false),
  cursor(760, 800, 1.3, ROSE.white),
  rect(80, 1200, 230, 68, 'rgba(255,255,255,0.06)', {
    cornerRadius: 34,
    stroke: ROSE.pink,
    strokeWidth: 2,
    name: 'Button',
  }),
  text('Try it free', 80, 1218, 230, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: ROSE.white,
    align: 'center',
  }),
]);

const SUGGESTIONS = [
  'remote teams playbook',
  'remote teams onboarding',
  'remote teams tools',
  'remote teams rituals',
  'remote teams pricing',
];

const searchList = template(W, H, () => [
  rect(0, 0, W, H, ROSE.black, { name: 'Background' }),
  glow(540, 760, 460, 0.32),
  text('Search less,', 0, 130, W, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 500,
    fill: ROSE.white,
    align: 'center',
  }),
  text('build more.', 0, 214, W, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 800,
    fill: roseText,
    align: 'center',
  }),
  rect(120, 380, 840, 100, ROSE.pale, { cornerRadius: 50, name: 'Search bar' }),
  icon('search', 166, 408, 44, ROSE.black, { strokeWidth: 2.4 }),
  text('Remote teams', 236, 406, 600, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 600,
    fill: ROSE.black,
  }),
  rect(498, 404, 4, 52, ROSE.rose, { name: 'Caret' }),
  rect(120, 520, 840, 560, 'rgba(255,255,255,0.04)', {
    cornerRadius: 30,
    stroke: 'rgba(255,156,191,0.4)',
    strokeWidth: 2,
    name: 'Results',
  }),
  SUGGESTIONS.map((item, index) => {
    const y = 560 + index * 100;
    const active = index === 2;
    return [
      active
        ? rect(150, y - 6, 780, 84, 'rgba(255,79,139,0.28)', { cornerRadius: 18, name: 'Active' })
        : [],
      icon('search', 186, y + 18, 34, active ? ROSE.white : ROSE.grey, { strokeWidth: 2.2 }),
      text(item, 246, y + 16, 640, {
        fontFamily: BODY,
        fontSize: 34,
        fontWeight: active ? 700 : 500,
        fill: active ? ROSE.white : ROSE.pale,
      }),
    ];
  }),
  brand(1220),
]);

const newVersion = template(W, H, () => [
  rect(0, 0, W, H, linear(180, ROSE.white, '#fbe0ea'), { name: 'Background' }),
  ellipse(290, 590, 500, 50, 'rgba(61,40,52,0.16)', { name: 'Shadow' }),
  rotateNodes(-6, 540, 400, [
    rect(310, 220, 460, 340, '#3b2d36', { cornerRadius: 30, name: 'Screen frame' }),
    rect(334, 244, 412, 292, linear(150, ROSE.pink, ROSE.rose), {
      cornerRadius: 18,
      name: 'Screen',
    }),
    icon('sparkles', 480, 330, 120, ROSE.white, { strokeWidth: 1.8 }),
  ]),
  text('Version 4.0', 0, 680, W, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: roseText,
    align: 'center',
  }),
  text('is now available!', 0, 800, W, {
    fontFamily: HEAD,
    fontSize: 66,
    fontWeight: 500,
    fill: '#2a1d26',
    align: 'center',
  }),
  rect(200, 960, 320, 84, 'rgba(0,0,0,0)', {
    cornerRadius: 42,
    stroke: ROSE.rose,
    strokeWidth: 3,
    name: 'Secondary button',
  }),
  text("See what's new", 200, 984, 320, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: ROSE.rose,
    align: 'center',
  }),
  rect(560, 960, 320, 84, roseText, { cornerRadius: 42, name: 'Primary button' }),
  text('Update now', 560, 984, 320, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 700,
    fill: ROSE.white,
    align: 'center',
  }),
  brand(1220, 'center', '#2a1d26'),
]);

const STEPS = [
  { value: '15%', height: 200 },
  { value: '32%', height: 320 },
  { value: '54%', height: 440 },
  { value: '71%', height: 560 },
  { value: '90%', height: 680 },
];

const revenueBars = template(W, H, () => [
  rect(0, 0, W, H, ROSE.black, { name: 'Background' }),
  glow(760, 1000, 420, 0.4),
  text('Revenue', 0, 120, W, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: ROSE.white,
    align: 'center',
  }),
  text('Momentum', 0, 224, W, {
    fontFamily: HEAD,
    fontSize: 92,
    fontWeight: 800,
    fill: roseText,
    align: 'center',
  }),
  text('Turn every launch into steady, compounding growth.', 0, 370, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 400,
    fill: ROSE.grey,
    align: 'center',
  }),
  STEPS.map((step, index) => {
    const x = 120 + index * 172;
    const y = 1250 - step.height;
    return [
      rect(x, y, 150, step.height, linear(180, index < 2 ? ROSE.pale : ROSE.pink, ROSE.rose), {
        cornerRadius: 22,
        name: 'Bar',
        opacity: 0.55 + index * 0.1,
      }),
      text(step.value, x, y + 24, 150, {
        fontFamily: HEAD,
        fontSize: 36,
        fontWeight: 800,
        fill: ROSE.black,
        align: 'center',
      }),
    ];
  }),
]);

const boostGauge = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#130d16', ROSE.black), { name: 'Background' }),
  glow(800, 1080, 300, 0.45),
  brand(90, 'left'),
  text('Give Your\nStack a', 80, 190, 900, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 500,
    fill: ROSE.white,
    lineHeight: 1.1,
  }),
  text('Real Lift', 80, 402, 900, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 800,
    fill: roseText,
  }),
  text('Faster deploys, fewer outages.', 80, 540, 700, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: ROSE.grey,
  }),
  path(
    'M 500 1350 A 580 580 0 0 1 1080 770 L 1080 960 A 390 390 0 0 0 690 1350 Z',
    0,
    0,
    W,
    H,
    linear(135, ROSE.pale, ROSE.pink, ROSE.rose),
    { width: W, height: H },
    { name: 'Gauge' },
  ),
  poly(
    [
      [1066, 1336],
      [700, 960],
      [1080, 1320],
    ],
    ROSE.white,
    { name: 'Needle' },
  ),
  circle(1040, 1310, 36, ROSE.white, { name: 'Needle hub' }),
]);

const waves = (height: number) =>
  [0.12, 0.2, 0.3, 0.42, 0.55].map((alpha, index) => {
    const y = height * 0.32 + index * 70;
    return path(
      `M 0 ${y} C 300 ${y - 220} 700 ${y + 240} 1080 ${y - 90}`,
      0,
      0,
      W,
      height,
      'rgba(0,0,0,0)',
      { width: W, height },
      { stroke: `rgba(255,79,139,${alpha})`, strokeWidth: 3, name: 'Wave' },
    );
  });

const glassCard = (height: number, withBrand: boolean) => {
  const cy = height / 2;
  return [
    rect(0, 0, W, height, ROSE.black, { name: 'Background' }),
    glow(540, cy, 480, 0.3, height),
    waves(height),
    rotateNodes(-5, 540, cy, [
      rect(250, cy - 280, 580, 540, 'rgba(26,19,29,0.92)', {
        cornerRadius: 32,
        stroke: 'rgba(255,225,236,0.6)',
        strokeWidth: 3,
        name: 'Post card',
        ...shadow(40, 20, 'rgba(0,0,0,0.5)'),
      }),
      circle(310, cy - 216, 26, linear(135, ROSE.rose, ROSE.pink)),
      text('Rosewire Tech', 352, cy - 234, 360, {
        fontFamily: HEAD,
        fontSize: 28,
        fontWeight: 700,
        fill: ROSE.white,
      }),
      [0, 1, 2].map((index) => circle(790, cy - 236 + index * 14, 4, ROSE.white)),
      text('Great software', 270, cy - 110, 540, {
        fontFamily: HEAD,
        fontSize: 50,
        fontWeight: 600,
        fill: ROSE.white,
        align: 'center',
      }),
      text('multiplies what\npeople can do', 270, cy - 46, 540, {
        fontFamily: HEAD,
        fontSize: 50,
        fontWeight: 800,
        fill: roseText,
        align: 'center',
        lineHeight: 1.2,
      }),
      icon('heart', 290, cy + 180, 40, ROSE.rose),
      icon('message-circle', 346, cy + 180, 40, ROSE.white),
      icon('send', 402, cy + 180, 40, ROSE.white),
      icon('bookmark', 750, cy + 180, 40, ROSE.white),
    ]),
    withBrand ? brand(height - 140) : [],
  ];
};

export const glassPost = template(W, H, () => glassCard(H, true));

export const glassStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  glassCard(STORY_SIZE.height, false),
);

export const POSTS = [
  modularClick,
  blueprintKeys,
  clientReviews,
  folderHero,
  newFeature,
  glassPost,
  searchList,
  newVersion,
  revenueBars,
  boostGauge,
];
