import { linear } from '@/design';
import {
  circle,
  icon,
  type Nodes,
  poly,
  rect,
  STORY_SIZE,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  brandMark,
  darkBackdrop,
  engineeredToScale,
  H,
  HEAD,
  promptPipelines,
  ROSE,
  shipPlaybooks,
  standApart,
  W,
} from './posts';

const counterNodes = (height: number): Nodes[] => {
  const center = height * 0.44;
  const row = 240;
  const rolling = [
    { value: '80', step: -2 },
    { value: '81', step: -1 },
    { value: '83', step: 1 },
    { value: '84', step: 2 },
  ];
  return [
    darkBackdrop(height),
    rolling.map((item) =>
      text(item.value, 560, center - 120 + item.step * row, 420, {
        fontFamily: HEAD,
        fontSize: 220,
        fontWeight: 800,
        fill: `rgba(255,255,255,${Math.abs(item.step) === 1 ? 0.22 : 0.08})`,
        lineHeight: 1,
      }),
    ),
    text('31', 80, center - 120, 470, {
      fontFamily: HEAD,
      fontSize: 220,
      fontWeight: 800,
      fill: linear(180, ROSE.white, '#c9b4c0'),
      align: 'right',
      lineHeight: 1,
    }),
    text('82', 560, center - 120, 420, {
      fontFamily: HEAD,
      fontSize: 220,
      fontWeight: 800,
      fill: linear(180, ROSE.pink, ROSE.magenta),
      lineHeight: 1,
    }),
    text('New Teams', 180, center + 130, 400, {
      fontFamily: BODY,
      fontSize: 46,
      fontWeight: 500,
      fill: ROSE.white,
    }),
    text('joined this quarter', 180, center + 192, 380, {
      fontFamily: BODY,
      fontSize: 30,
      fontWeight: 400,
      fill: 'rgba(255,255,255,0.6)',
    }),
    brandMark(0, height - 140, W, ROSE.white, 'center'),
  ];
};

export const counterPost = template(W, H, () => counterNodes(H));

export const counterStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  counterNodes(STORY_SIZE.height),
);

const lessNoise = template(W, H, () => [
  rect(0, 0, W, H, linear(160, ROSE.paper, '#ffe4f0', '#ffc6de'), { name: 'Background' }),
  brandMark(80, 90, 600, ROSE.ink),
  text('Less noise.', 80, 220, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 700,
    fill: ROSE.pink,
    lineHeight: 1,
  }),
  text('More', 80, 340, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 700,
    fill: ROSE.magenta,
    lineHeight: 1,
  }),
  text('signal', 80, 460, 920, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 700,
    fill: ROSE.ink,
    lineHeight: 1,
  }),
  text('Let AI sort what\nmatters in your\nsales pipeline', 80, 680, 520, {
    fontFamily: BODY,
    fontSize: 44,
    fontWeight: 400,
    fill: ROSE.muted,
    lineHeight: 1.3,
  }),
  poly(
    [
      [560, 700],
      [640, 620],
      [900, 880],
      [820, 960],
    ],
    linear(135, '#ff9cc4', ROSE.magenta),
    { name: 'Arrow shaft' },
  ),
  poly(
    [
      [1000, 760],
      [1000, 1100],
      [660, 1100],
    ],
    linear(135, ROSE.pink, ROSE.magenta),
    { name: 'Arrow head' },
  ),
]);

const PLAYBOOKS = [
  'Lead Scoring',
  'Inbox Triage',
  'Churn Alerts',
  'Deal Forecasts',
  'Onboarding Flows',
];

const topFive = template(W, H, () => [
  rect(0, 0, W, H, linear(180, ROSE.paper, '#ffd0e4'), { name: 'Background' }),
  text('5', 400, 300, 660, {
    fontFamily: HEAD,
    fontSize: 900,
    fontWeight: 800,
    fill: 'rgba(214,36,110,0.1)',
    lineHeight: 1,
  }),
  text('Top 5', 0, 110, W, {
    fontFamily: HEAD,
    fontSize: 112,
    fontWeight: 800,
    fill: ROSE.ink,
    align: 'center',
    lineHeight: 1,
  }),
  text('Playbooks', 0, 230, W, {
    fontFamily: HEAD,
    fontSize: 100,
    fontWeight: 700,
    fill: ROSE.magenta,
    align: 'center',
    lineHeight: 1,
  }),
  PLAYBOOKS.map((label, index) => {
    const y = 420 + index * 124;
    return [
      rect(250, y, 580, 88, ROSE.white, {
        name: 'Row',
        cornerRadius: 44,
        ...shadow(24, 8, 'rgba(120,10,60,0.14)'),
      }),
      icon('arrow-up-right', 282, y + 24, 40, ROSE.magenta, { strokeWidth: 2.4 }),
      text(label, 346, y + 24, 460, {
        fontFamily: BODY,
        fontSize: 34,
        fontWeight: 600,
        fill: ROSE.ink,
      }),
    ];
  }),
  brandMark(0, 1210, W, ROSE.ink, 'center'),
]);

const agentChat = template(W, H, () => [
  darkBackdrop(H),
  text('Customer', 230, 600, 400, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: 'rgba(255,255,255,0.6)',
  }),
  circle(150, 690, 46, ROSE.white),
  icon('user', 124, 664, 52, ROSE.ink, { strokeWidth: 2.2 }),
  rect(230, 645, 700, 92, 'rgba(255,255,255,0.06)', {
    name: 'Message bubble',
    cornerRadius: 46,
    stroke: 'rgba(255,255,255,0.55)',
    strokeWidth: 2,
  }),
  text('Can you tidy up my backlog?', 230, 670, 700, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: ROSE.white,
    align: 'center',
  }),
  text('AI Agent', 640, 860, 300, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 500,
    fill: 'rgba(255,255,255,0.6)',
  }),
  [0, 1, 2].map((index) =>
    circle(
      660 + index * 34,
      960 - (index === 1 ? 12 : 0),
      11,
      `rgba(255,255,255,${0.5 + index * 0.2})`,
    ),
  ),
  circle(840, 960, 62, ROSE.white, { ...shadow(50, 0, 'rgba(255,111,168,0.9)') }),
  icon('sparkles', 806, 926, 68, ROSE.magenta, { strokeWidth: 2 }),
  brandMark(0, 1210, W, ROSE.white, 'center'),
]);

export const POSTS: readonly Template[] = [
  promptPipelines,
  engineeredToScale,
  standApart,
  counterPost,
  shipPlaybooks,
  lessNoise,
  agentChat,
  topFive,
];
