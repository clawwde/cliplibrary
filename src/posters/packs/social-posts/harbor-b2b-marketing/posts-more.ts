import {
  arrow,
  circle,
  icon,
  POST_SIZE,
  photo,
  pill,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  star,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  chargedBolt,
  creativeTeams,
  growMore,
  HARBOR,
  HEAD,
  navyBackground,
  strategyMotion,
  targetGoals,
  testimonial,
  transforming,
} from './posts';

const { width: W, height: H } = POST_SIZE;

const beYourself = template(W, H, () => [
  navyBackground(),
  text('Be yourself, be unique', 0, 300, W, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 600,
    fill: HARBOR.white,
    align: 'center',
  }),
  arrow(400, 400, 150, HARBOR.white, 6, { rotation: 90 }),
  [0, 1, 2, 3, 4].map((index) => {
    const cx = 140 + index * 200;
    return index === 1
      ? [
          circle(cx, 660, 82, HARBOR.coral),
          icon('scan-face', cx - 50, 610, 100, HARBOR.navy, { strokeWidth: 2.2 }),
        ]
      : circle(cx, 660, 74, HARBOR.white);
  }),
  arrow(740, 930, 150, HARBOR.white, 6, { rotation: -90 }),
  text('Don’t follow the crowd', 0, 960, W, {
    fontFamily: HEAD,
    fontSize: 52,
    fontWeight: 600,
    fill: HARBOR.white,
    align: 'center',
  }),
]);

const messagingCard = (x: number, y: number, width: number, height: number) => [
  rect(x, y, width, height, HARBOR.white, { name: 'Card', cornerRadius: 36, ...shadow(40, 16) }),
  text('Marketing\nMessaging', x + 50, y + 50, width - 100, {
    fontFamily: HEAD,
    fontSize: 76,
    fontWeight: 700,
    fill: HARBOR.navy,
    lineHeight: 1.12,
  }),
  text(
    'Line up your brand, message and\naudience at every touchpoint.',
    x + 50,
    y + 250,
    width - 100,
    {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 400,
      fill: '#475569',
      lineHeight: 1.4,
    },
  ),
  photo('meeting-1', x + 50, y + 360, width - 100, height - 410, { cornerRadius: 24 }),
  rotateNodes(-8, x + width - 330, y + 330, [
    pill('Ideas welcome', x + width - 330, y + 330, {
      fill: HARBOR.coral,
      color: HARBOR.navy,
      fontSize: 30,
      fontFamily: HEAD,
      fontWeight: 700,
    }),
  ]),
];

export const messaging = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.navy, { name: 'Background' }),
  photo('team-2', 0, 0, W, H),
  rect(0, 0, W, H, 'rgba(10,20,41,0.55)', { name: 'Shade' }),
  messagingCard(150, 140, 780, 1070),
]);

const TAGS = [
  ['Branding', 380, 120, 'fill'],
  ['Analytics', 120, 270, 'white'],
  ['Conversion', 560, 270, 'outline'],
  ['Engagement', 200, 420, 'fill'],
  ['Advertising', 630, 420, 'outline'],
  ['Strategy', 90, 570, 'outline'],
  ['Social Media', 440, 570, 'white'],
  ['Growth', 260, 720, 'fill'],
  ['Content', 640, 720, 'white'],
  ['Target Audience', 260, 870, 'outline'],
] as const;

const tagCloud = template(W, H, () => [
  navyBackground(),
  TAGS.map(([label, x, y, kind]) =>
    pill(label, x, y, {
      fill: kind === 'fill' ? HARBOR.coral : kind === 'white' ? HARBOR.white : 'rgba(0,0,0,0)',
      stroke: HARBOR.coral,
      strokeWidth: kind === 'outline' ? 4 : 0,
      color: kind === 'outline' ? HARBOR.white : HARBOR.navy,
      fontSize: 42,
      fontFamily: HEAD,
      fontWeight: 600,
    }),
  ),
  text('Which one is your focus this quarter?', 0, 1130, W, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: HARBOR.mist,
    align: 'center',
  }),
]);

const paceQuote = template(W, H, () => [
  rect(0, 0, W, H, HARBOR.coral, { name: 'Background' }),
  text('“', 80, 60, 300, {
    fontFamily: 'Archivo Black',
    fontSize: 340,
    fontWeight: 400,
    fill: HARBOR.navy,
    lineHeight: 1,
  }),
  rect(80, 470, 900, 330, HARBOR.navy, { name: 'Quote box' }),
  text('Build at your own pace.\nProgress beats perfect.', 130, 520, 820, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 700,
    fill: HARBOR.cream,
    lineHeight: 1.3,
  }),
  text('Elena Ward', 90, 900, 600, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 700,
    fill: HARBOR.navy,
  }),
  text('Founder, Northbeam', 90, 960, 600, {
    fontFamily: BODY,
    fontSize: 32,
    fontWeight: 500,
    fill: HARBOR.navy,
  }),
  star(5, 860, 1130, 150, HARBOR.navy, { innerRatio: 0.42 }),
]);

export const messagingStory = template(STORY_SIZE.width, STORY_SIZE.height, () => [
  rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, HARBOR.navy, { name: 'Background' }),
  photo('team-2', 0, 0, STORY_SIZE.width, STORY_SIZE.height),
  rect(0, 0, STORY_SIZE.width, STORY_SIZE.height, 'rgba(10,20,41,0.55)', { name: 'Shade' }),
  messagingCard(110, 300, 860, 1300),
]);

export const POSTS = [
  transforming,
  creativeTeams,
  growMore,
  strategyMotion,
  targetGoals,
  chargedBolt,
  testimonial,
  beYourself,
  messaging,
  tagCloud,
  paceQuote,
];
