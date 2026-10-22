import { linear } from '@/design';
import {
  circle,
  ellipse,
  type Nodes,
  photo,
  poly,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { BODY, H, HEAD, hashtag, TAN, W } from './posts';

const spotlightNodes = (height: number): Nodes[] => {
  const top = (height - H) / 2;
  return [
    rect(0, 0, W, height, TAN.ink, { name: 'Background' }),
    Array.from({ length: 12 }, (_, index) =>
      rect(index * 96 + 12, 0, 2, height, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
    ),
    Array.from({ length: Math.ceil(height / 96) }, (_, index) =>
      rect(0, index * 96 + 30, W, 2, 'rgba(255,255,255,0.05)', { name: 'Grid line' }),
    ),
    poly(
      [
        [470, top + 990],
        [610, top + 990],
        [1040, top + 140],
        [40, top + 140],
      ],
      linear(0, 'rgba(255,244,232,0.45)', 'rgba(255,244,232,0.08)', 'rgba(255,244,232,0)'),
      { name: 'Light cone' },
    ),
    text('Spotlight Your', 0, top + 230, W, {
      fontFamily: HEAD,
      fontSize: 64,
      fontWeight: 800,
      fill: TAN.cream,
      align: 'center',
    }),
    text('Audience', 0, top + 300, W, {
      fontFamily: HEAD,
      fontSize: 168,
      fontWeight: 800,
      fill: linear(180, TAN.peach, TAN.tangerine),
      align: 'center',
    }),
    text('Discover what really converts', 0, top + 510, W, {
      fontFamily: BODY,
      fontSize: 38,
      fontWeight: 500,
      fill: TAN.white,
      align: 'center',
    }),
    ellipse(455, top + 965, 170, 54, TAN.white, {
      name: 'Lens',
      ...shadow(70, 0, 'rgba(255,244,232,0.95)'),
    }),
    rect(460, top + 990, 160, 100, linear(90, '#1c2747', '#46557e', '#1c2747'), {
      name: 'Torch head',
      cornerRadius: 14,
    }),
    rect(490, top + 1090, 100, height - top - 1090, linear(90, '#141d38', '#3a4a72', '#141d38'), {
      name: 'Torch body',
      cornerRadius: 8,
    }),
  ];
};

export const spotlightPost = template(W, H, () => spotlightNodes(H));

export const spotlightStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  spotlightNodes(STORY_SIZE.height),
);

interface PlanCopy {
  accent: string;
  light: string;
  question: string;
  answer: string;
  steps: readonly [string, string, string, string];
}

const gamePlan = (copy: PlanCopy) =>
  template(W, H, () => [
    rect(0, 0, W, H, linear(180, TAN.white, TAN.paper), { name: 'Background' }),
    photo('woman-portrait-4', 70, 130, 480, 590, { cornerRadius: 40 }),
    copy.steps.map((step, index) => {
      const y = 190 + index * 124;
      return [
        rect(520, y, 490, 96, linear(90, copy.accent, copy.light), {
          name: 'Step pill',
          cornerRadius: 48,
          ...shadow(24, 10, 'rgba(10,17,40,0.18)'),
        }),
        circle(570, y + 48, 32, TAN.white),
        text(String(index + 1), 538, y + 28, 64, {
          fontFamily: HEAD,
          fontSize: 34,
          fontWeight: 800,
          fill: copy.accent,
          align: 'center',
        }),
        text(step, 620, y + 28, 380, {
          fontFamily: BODY,
          fontSize: 32,
          fontWeight: 600,
          fill: TAN.white,
        }),
      ];
    }),
    text(copy.question, 0, 800, W, {
      fontFamily: HEAD,
      fontSize: 80,
      fontWeight: 700,
      fill: TAN.navy,
      align: 'center',
    }),
    text(copy.answer, 0, 890, W, {
      fontFamily: HEAD,
      fontSize: 138,
      fontWeight: 800,
      fill: copy.accent,
      align: 'center',
    }),
    hashtag(1130),
  ]);

export const gamePlanTangerine = gamePlan({
  accent: TAN.tangerine,
  light: TAN.peach,
  question: "What's your",
  answer: 'Game Plan?',
  steps: ['Paid ads', 'Social media', 'Content plans', 'Branding'],
});

export const gamePlanCobalt = gamePlan({
  accent: '#2f5bea',
  light: '#7aa2ff',
  question: 'How will you',
  answer: 'Scale Up?',
  steps: ['Smart funnels', 'Community', 'Video series', 'Partnerships'],
});
