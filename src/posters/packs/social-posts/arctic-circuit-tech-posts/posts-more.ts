import { linear, radial } from '@/design';
import {
  circle,
  icon,
  type Nodes,
  path,
  photo,
  rect,
  rotateNodes,
  STORY_SIZE,
  shadow,
  type Template,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  brandMark,
  button,
  darkBg,
  H,
  HEAD,
  ICE,
  planBuildShip,
  riseOfAutopilot,
  topThree,
  W,
} from './posts';
import { mythFact, precisionTracking, quoteRival } from './posts-mid';

const adSpend = template(W, H, () => [
  darkBg(H),
  text('Sharpen Your', 0, 250, W, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 400,
    fill: ICE.white,
    align: 'center',
  }),
  text('Ad Spend', 0, 350, W, {
    fontFamily: HEAD,
    fontSize: 110,
    fontWeight: 800,
    fill: ICE.cyan,
    align: 'center',
  }),
  text('Get 4x more qualified clicks', 0, 510, W, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 500,
    fill: ICE.muted,
    align: 'center',
  }),
  path(
    'M 0 1120 C 200 1120 220 700 360 760 S 480 1180 600 1050 S 820 760 1080 820',
    0,
    0,
    W,
    H,
    'rgba(0,0,0,0)',
    { width: W, height: H },
    { name: 'Trend curve', stroke: 'rgba(255,255,255,0.85)', strokeWidth: 4 },
  ),
  circle(600, 1050, 80, radial('rgba(34,211,238,0.45)', 'rgba(34,211,238,0)'), { name: 'Halo' }),
  circle(600, 1050, 26, ICE.white, { name: 'Point', ...shadow(40, 0, ICE.cyan) }),
  brandMark(0, 1240, W, ICE.white),
]);

const breakthroughNodes = (height: number): Nodes[] => {
  const photoHeight = height * 0.56;
  const top = photoHeight + 20;
  return [
    rect(0, 0, W, height, ICE.night, { name: 'Background' }),
    photo('desk-imac', 0, 0, W, photoHeight),
    rect(0, 0, W, photoHeight, 'rgba(14,165,233,0.28)', { name: 'Tint' }),
    rect(
      0,
      photoHeight * 0.45,
      W,
      photoHeight * 0.55 + 2,
      linear(180, 'rgba(3,10,20,0)', ICE.night),
      {
        name: 'Fade',
      },
    ),
    text('Looking for the', 0, top, W, {
      fontFamily: HEAD,
      fontSize: 68,
      fontWeight: 300,
      fill: ICE.white,
      align: 'center',
    }),
    text('next Breakthrough?', 0, top + 84, W, {
      fontFamily: HEAD,
      fontSize: 76,
      fontWeight: 800,
      fill: ICE.cyan,
      align: 'center',
    }),
    button('Learn More', 250, top + 230, 270, false),
    button('Contact Us', 560, top + 230, 270, true),
    brandMark(0, height - 110, W, ICE.white),
  ];
};

export const breakthroughPost = template(W, H, () => breakthroughNodes(H));

export const breakthroughStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  breakthroughNodes(STORY_SIZE.height),
);

interface WorkCopy {
  accent: string;
  light: string;
  glowColor: string;
  lines: readonly [string, string, string];
}

const busywork = (copy: WorkCopy) =>
  template(W, H, () => [
    rect(0, 0, W, H, ICE.night, { name: 'Background' }),
    rect(700, 40, 240, 200, linear(180, 'rgba(255,255,255,0)', 'rgba(255,255,255,0.32)'), {
      name: 'Tile',
      cornerRadius: 36,
    }),
    rect(700, 280, 240, 280, linear(180, 'rgba(255,255,255,0.6)', copy.light), {
      name: 'Tile',
      cornerRadius: 36,
    }),
    rect(700, 900, 240, 280, linear(180, copy.light, 'rgba(255,255,255,0.15)'), {
      name: 'Tile',
      cornerRadius: 36,
    }),
    rect(700, 1220, 240, 100, linear(180, 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)'), {
      name: 'Tile',
      cornerRadius: 36,
    }),
    rotateNodes(-12, 795, 735, [
      rect(650, 590, 290, 290, linear(135, copy.light, copy.accent), {
        name: 'Glowing tile',
        cornerRadius: 56,
        ...shadow(80, 0, copy.glowColor),
      }),
      icon('sparkles', 730, 670, 130, ICE.white, { strokeWidth: 1.8 }),
    ]),
    text(copy.lines[0], 80, 430, 600, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 400,
      fill: ICE.white,
      lineHeight: 1,
    }),
    text(copy.lines[1], 80, 530, 600, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 800,
      fill: copy.accent,
      lineHeight: 1,
    }),
    text(copy.lines[2], 80, 630, 600, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 400,
      fill: ICE.white,
      lineHeight: 1,
    }),
    rect(80, 790, 250, 72, copy.light, { name: 'Button', cornerRadius: 36 }),
    text('Learn More', 80, 810, 250, {
      fontFamily: BODY,
      fontSize: 28,
      fontWeight: 600,
      fill: ICE.night,
      align: 'center',
    }),
  ]);

export const busyworkCyan = busywork({
  accent: ICE.cyan,
  light: '#a5f3fc',
  glowColor: 'rgba(34,211,238,0.85)',
  lines: ['Let AI take', 'the busywork', 'off your desk'],
});

export const busyworkAmber = busywork({
  accent: '#fbbf24',
  light: '#fde68a',
  glowColor: 'rgba(251,191,36,0.85)',
  lines: ['Use AI to', 'move faster', 'every day'],
});

export const POSTS: readonly Template[] = [
  planBuildShip,
  riseOfAutopilot,
  topThree,
  precisionTracking,
  mythFact,
  quoteRival,
  adSpend,
  breakthroughPost,
  busyworkCyan,
];
