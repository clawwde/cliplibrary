import { linear } from '@/design';
import { avatar, circle, icon, rect, STORY_SIZE, template, text } from '../../../kit';
import {
  amplifyBars,
  BODY,
  brand,
  docsFolders,
  glow,
  H,
  HEAD,
  headline,
  MINT,
  mintText,
  powerRings,
  W,
  worldReach,
} from './posts';

export const quoteBox = template(W, H, () => [
  rect(0, 0, W, H, linear(150, '#13291f', MINT.black), { name: 'Background' }),
  glow(760, 340, 320, 0.3),
  rect(170, 380, 740, 560, 'rgba(255,255,255,0.04)', {
    cornerRadius: 28,
    stroke: 'rgba(220,255,241,0.55)',
    strokeWidth: 3,
    name: 'Quote card',
  }),
  icon('quote', 270, 480, 190, MINT.white, { strokeWidth: 2.4, rotation: 180 }),
  icon('quote', 810, 840, 190, MINT.mint, { strokeWidth: 2.4 }),
  text('Great tools', 240, 470, 620, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 800,
    fill: mintText,
  }),
  text('disappear so\nyour people\ncan shine.', 240, 548, 620, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 400,
    fill: MINT.white,
    lineHeight: 1.18,
  }),
  text('Imani Cole, Product Lead', 240, 840, 620, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: MINT.grey,
  }),
  brand(1220),
]);

export const teamRing = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  glow(540, 675, 640, 0.3),
  circle(540, 675, 500, linear(160, MINT.mint, '#0b3d2b'), { name: 'Ring' }),
  circle(540, 675, 440, MINT.black, { name: 'Ring hole' }),
  circle(540, 675, 400, 'rgba(0,0,0,0)', {
    stroke: 'rgba(94,242,180,0.35)',
    strokeWidth: 3,
    name: 'Inner ring',
  }),
  headline('Software that', 'grows your team', 440, 72),
  rect(250, 680, 580, 130, linear(90, MINT.pale, MINT.mint), {
    cornerRadius: 65,
    name: 'Users pill',
  }),
  avatar('woman-portrait-1', 320, 745, 48, MINT.white),
  avatar('man-portrait-3', 396, 745, 48, MINT.white),
  avatar('woman-portrait-4', 472, 745, 48, MINT.white),
  circle(548, 745, 48, MINT.black),
  icon('plus', 524, 721, 48, MINT.white, { strokeWidth: 3 }),
  text('82K+', 616, 700, 200, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 800,
    fill: MINT.black,
  }),
  text('Active users', 618, 764, 200, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 600,
    fill: '#1f3a30',
  }),
  brand(1230),
]);

const countdown = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  glow(540, 900, 560, 0.3),
  text('98', 0, 90, W, {
    fontFamily: HEAD,
    fontSize: 300,
    fontWeight: 800,
    fill: '#17261f',
    align: 'center',
    lineHeight: 1,
  }),
  text('99', 0, 390, W, {
    fontFamily: HEAD,
    fontSize: 300,
    fontWeight: 800,
    fill: '#4f6d61',
    align: 'center',
    lineHeight: 1,
  }),
  text('100', 0, 690, W, {
    fontFamily: HEAD,
    fontSize: 300,
    fontWeight: 800,
    fill: linear(180, MINT.white, MINT.mint),
    align: 'center',
    lineHeight: 1,
  }),
  text('days of non-stop shipping', 0, 1060, W, {
    fontFamily: BODY,
    fontSize: 40,
    fontWeight: 600,
    fill: MINT.pale,
    align: 'center',
  }),
  brand(1230),
]);

const WORDS = ['Plan', 'Build', 'Deploy', 'Measure', 'Scale', 'Repeat'];
const WORD_ALPHA = [0.14, 0.32, 1, 0.32, 0.18, 0.08];

const wordList = template(W, H, () => [
  rect(0, 0, W, H, linear(180, '#0b1712', MINT.black), { name: 'Background' }),
  glow(420, 560, 460, 0.25),
  WORDS.map((word, index) =>
    text(word, 300, 110 + index * 190, 700, {
      fontFamily: HEAD,
      fontSize: 104,
      fontWeight: 800,
      fill: index === 2 ? MINT.white : MINT.grey,
      opacity: WORD_ALPHA[index] ?? 0.2,
    }),
  ),
  icon('arrow-right', 150, 512, 110, MINT.mint, { strokeWidth: 2.4 }),
  rect(300, 640, 120, 8, MINT.mint, { cornerRadius: 4, name: 'Underline' }),
]);

const PLANS = [
  { name: 'Starter', body: 'One workspace and core\nautomations for solo teams.', price: '$0/mo' },
  { name: 'Growth', body: 'Unlimited flows, analytics\nand priority support.', price: '$19/mo' },
  { name: 'Scale', body: 'SSO, audit logs and a\ndedicated success manager.', price: '$49/mo' },
];

const pricingPlans = template(W, H, () => [
  rect(0, 0, W, H, MINT.black, { name: 'Background' }),
  glow(540, 760, 560, 0.2),
  headline('Choose the plan', 'that fits you', 110, 76),
  PLANS.map((plan, index) => {
    const y = 380 + index * 260;
    const featured = index === 1;
    const ink = featured ? MINT.black : MINT.white;
    return [
      rect(90, y, 900, 220, featured ? linear(90, MINT.mint, MINT.pale) : MINT.panel, {
        cornerRadius: 28,
        stroke: 'rgba(94,242,180,0.3)',
        strokeWidth: featured ? 0 : 2,
        name: 'Plan card',
      }),
      text(plan.name, 140, y + 40, 400, {
        fontFamily: HEAD,
        fontSize: 42,
        fontWeight: 800,
        fill: ink,
      }),
      featured
        ? [
            rect(360, y + 46, 150, 44, MINT.black, { cornerRadius: 22, name: 'Badge' }),
            text('Popular', 360, y + 54, 150, {
              fontFamily: BODY,
              fontSize: 22,
              fontWeight: 700,
              fill: MINT.mint,
              align: 'center',
            }),
          ]
        : [],
      text(plan.body, 140, y + 108, 520, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 500,
        fill: featured ? '#1f3a30' : MINT.grey,
        lineHeight: 1.35,
      }),
      text(plan.price, 640, y + 76, 300, {
        fontFamily: HEAD,
        fontSize: 54,
        fontWeight: 800,
        fill: ink,
        align: 'right',
      }),
    ];
  }),
  brand(1230),
]);

const rocket = (height: number, top: number, size: number) => [
  rect(0, 0, W, height, MINT.black, { name: 'Background' }),
  glow(480, height - size * 0.72, 560, 0.35, height),
  brand(top - 130),
  text('Smart', 130, top, 520, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 800,
    fill: mintText,
  }),
  rect(590, top - 10, 130, 120, linear(150, MINT.pale, MINT.mint), {
    cornerRadius: 24,
    rotation: 10,
    name: 'Badge',
  }),
  text('UX', 590, top + 22, 120, {
    fontFamily: HEAD,
    fontSize: 54,
    fontWeight: 800,
    fill: MINT.black,
    align: 'center',
    rotation: 10,
  }),
  text('Design', 130, top + 150, 820, {
    fontFamily: HEAD,
    fontSize: 130,
    fontWeight: 400,
    fill: MINT.white,
  }),
  text('And it keeps getting sharper.', 136, top + 310, 820, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: MINT.grey,
  }),
  icon('rocket', 490 - size / 2, height - size - 140, size, MINT.mint, { strokeWidth: 1.1 }),
];

export const rocketPost = template(W, H, () => rocket(H, 220, 620));

export const rocketStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  rocket(STORY_SIZE.height, 420, 820),
);

export const POSTS = [
  powerRings,
  docsFolders,
  worldReach,
  amplifyBars,
  quoteBox,
  rocketPost,
  teamRing,
  countdown,
  wordList,
  pricingPlans,
];
