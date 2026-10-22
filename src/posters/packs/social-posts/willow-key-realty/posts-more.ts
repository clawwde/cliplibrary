import {
  circle,
  icon,
  photo,
  rating,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { AGENT, footerBar, H, KEY, SANS, SCRIPT, SERIF, W } from './palette';

const reviewNodes = (height: number) => {
  const top = height / 2 - 420;
  return [
    rect(0, 0, W, height, KEY.cream, { name: 'Background' }),
    photo('interior-1', 0, 0, W, height),
    rect(0, 0, W, height, 'rgba(247,245,239,0.35)', { name: 'Photo wash' }),
    text(AGENT.site, 0, top - 110, W, {
      fontFamily: SANS,
      fontSize: 30,
      fontWeight: 600,
      fill: KEY.forest,
      align: 'center',
      letterSpacing: 2,
    }),
    rect(140, top, 800, 840, 'rgba(247,245,239,0.95)', {
      cornerRadius: 30,
      name: 'Review card',
      ...shadow(50, 18, 'rgba(31,38,32,0.18)'),
    }),
    rating(368, top + 70, 52, 5, KEY.brass, 0.4),
    text('Client Review', 140, top + 160, 800, {
      fontFamily: SERIF,
      fontSize: 70,
      fontWeight: 500,
      fill: KEY.forest,
      align: 'center',
    }),
    text(
      '"Dana made selling our family home\nfeel calm and simple. She knew the\nneighbourhood, priced it right and had\nthree offers in the first weekend.\nWe could not have asked for a\nkinder or sharper agent."',
      180,
      top + 290,
      720,
      {
        fontFamily: SANS,
        fontSize: 30,
        fontWeight: 400,
        fill: KEY.ink,
        align: 'center',
        lineHeight: 1.55,
      },
    ),
    text('Priya & Tom Halden', 140, top + 640, 800, {
      fontFamily: SCRIPT,
      fontSize: 66,
      fontWeight: 400,
      fill: KEY.brass,
      align: 'center',
    }),
    text('SOLD IN 9 DAYS', 140, top + 750, 800, {
      fontFamily: SANS,
      fontSize: 24,
      fontWeight: 700,
      fill: KEY.sage,
      align: 'center',
      letterSpacing: 5,
    }),
  ];
};

export const clientReview = template(W, H, () => reviewNodes(H));

export const clientReviewStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  reviewNodes(STORY_SIZE.height),
);

const TIPS = [
  { label: 'Get pre-approved first', on: true },
  { label: 'Check your credit score', on: true },
  { label: 'Save for closing costs', on: true },
  { label: 'Budget for repairs', on: true },
  { label: 'Work with a local agent', on: true },
  { label: 'Skip the home inspection', on: false },
];

export const buyerChecklist = template(W, H, () => [
  rect(0, 0, W, H, KEY.mist, { name: 'Background' }),
  photo('interior-2', 0, 0, W, H),
  rect(0, 0, W, H, 'rgba(47,61,51,0.35)', { name: 'Photo tint' }),
  rect(120, 200, 840, 870, 'rgba(247,245,239,0.96)', {
    cornerRadius: 30,
    name: 'Checklist card',
    ...shadow(40, 16, 'rgba(0,0,0,0.25)'),
  }),
  text("First Home Buyer\nDo's and Don'ts", 120, 240, 840, {
    fontFamily: SERIF,
    fontSize: 58,
    fontWeight: 600,
    fill: KEY.forest,
    align: 'center',
    lineHeight: 1.15,
  }),
  TIPS.map((tip, index) => {
    const y = 470 + index * 100;
    return [
      text(tip.label, 190, y, 560, {
        fontFamily: SANS,
        fontSize: 32,
        fontWeight: 500,
        fill: KEY.ink,
      }),
      rect(780, y - 6, 100, 50, tip.on ? KEY.sage : '#cfd3cb', {
        cornerRadius: 25,
        name: 'Toggle',
      }),
      circle(tip.on ? 855 : 805, y + 19, 19, KEY.white),
      index < TIPS.length - 1
        ? rect(190, y + 70, 690, 2, 'rgba(31,38,32,0.1)', { name: 'Divider' })
        : [],
    ];
  }),
  text(AGENT.site, 0, 1190, W, {
    fontFamily: SANS,
    fontSize: 32,
    fontWeight: 600,
    fill: KEY.cream,
    align: 'center',
    letterSpacing: 2,
  }),
]);

const ROOMS = [
  { value: '3', label: 'Bedrooms' },
  { value: '2', label: 'Bathrooms' },
  { value: '1', label: 'Garage' },
];

export const townhomes = template(W, H, () => [
  rect(0, 0, W, H, KEY.sage, { name: 'Background' }),
  text('TOWNHOMES', 0, 90, W, {
    fontFamily: SANS,
    fontSize: 64,
    fontWeight: 800,
    fill: KEY.cream,
    align: 'center',
    letterSpacing: 10,
  }),
  text('For Sale!', 0, 170, W, {
    fontFamily: SCRIPT,
    fontSize: 140,
    fontWeight: 400,
    fill: KEY.cream,
    align: 'center',
  }),
  photo('house-2', 0, 400, W, 580),
  rect(290, 930, 500, 104, KEY.forest, { cornerRadius: 52, name: 'Price tag' }),
  text('$ 412,000', 290, 950, 500, {
    fontFamily: SANS,
    fontSize: 56,
    fontWeight: 800,
    fill: KEY.cream,
    align: 'center',
  }),
  ROOMS.map((room, index) => [
    text(room.value, 90 + index * 300, 1090, 300, {
      fontFamily: SERIF,
      fontSize: 72,
      fontWeight: 600,
      fill: KEY.cream,
      align: 'center',
      lineHeight: 1,
    }),
    text(room.label, 90 + index * 300, 1180, 300, {
      fontFamily: SANS,
      fontSize: 28,
      fontWeight: 600,
      fill: KEY.mist,
      align: 'center',
    }),
  ]),
  rect(388, 1100, 3, 130, 'rgba(247,245,239,0.5)', { name: 'Divider' }),
  rect(688, 1100, 3, 130, 'rgba(247,245,239,0.5)', { name: 'Divider' }),
]);

const QUESTIONS = [
  'What is the first step to buying?',
  'How much should I save for a deposit?',
  'Is now a good time to sell?',
  'What does an inspection cover?',
  'How do I know what my home is worth?',
  'How long does closing usually take?',
];

export const faqSearch = template(W, H, () => [
  rect(0, 0, W, H, KEY.cream, { name: 'Background' }),
  photo('interior-1', 0, 0, W, 520),
  rect(0, 0, W, 520, 'rgba(247,245,239,0.45)', { name: 'Photo wash' }),
  text(AGENT.site, 0, 80, W, {
    fontFamily: SANS,
    fontSize: 30,
    fontWeight: 600,
    fill: KEY.forest,
    align: 'center',
    letterSpacing: 2,
  }),
  rect(120, 210, 840, 104, KEY.white, {
    cornerRadius: 52,
    name: 'Search bar',
    ...shadow(30, 10, 'rgba(31,38,32,0.18)'),
  }),
  text('Home buying questions', 180, 240, 640, {
    fontFamily: SANS,
    fontSize: 36,
    fontWeight: 500,
    fill: KEY.ink,
  }),
  icon('search', 870, 236, 52, KEY.forest, { strokeWidth: 2.4 }),
  rect(120, 360, 840, 760, KEY.white, {
    cornerRadius: 30,
    name: 'Results card',
    ...shadow(30, 10, 'rgba(31,38,32,0.12)'),
  }),
  QUESTIONS.map((question, index) => {
    const y = 410 + index * 118;
    return [
      icon('search', 170, y + 4, 34, KEY.sage, { strokeWidth: 2.2 }),
      text(question, 230, y + 2, 660, {
        fontFamily: SANS,
        fontSize: 32,
        fontWeight: 500,
        fill: KEY.ink,
      }),
      index < QUESTIONS.length - 1
        ? rect(170, y + 74, 740, 2, 'rgba(31,38,32,0.08)', { name: 'Divider' })
        : [],
    ];
  }),
  footerBar(1200, 150, `Ask me anything at ${AGENT.phone}`),
]);
