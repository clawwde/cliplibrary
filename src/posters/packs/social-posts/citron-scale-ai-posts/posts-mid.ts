import { linear } from '@/design';
import {
  circle,
  icon,
  type Nodes,
  poly,
  rect,
  STORY_SIZE,
  shadow,
  template,
  text,
} from '../../../kit';
import { BODY, brandMark, button, CITRON, darkBg, H, HEAD, limeGlow, ringArc, W } from './posts';

export const roadmapShines = template(W, H, () => [
  rect(0, 0, W, H, CITRON.night, { name: 'Background' }),
  Array.from({ length: 14 }, (_, index) =>
    rect(index * 80, 0, 40, H, linear(180, 'rgba(163,230,53,0.1)', 'rgba(163,230,53,0)'), {
      name: 'Stripe',
    }),
  ),
  limeGlow(620, 0, 460, 900, 0.4),
  text('KESTREL AI', 80, 90, 600, {
    fontFamily: HEAD,
    fontSize: 28,
    fontWeight: 700,
    fill: CITRON.white,
    letterSpacing: 4,
  }),
  text('With AI, Your', 80, 500, 920, {
    fontFamily: HEAD,
    fontSize: 78,
    fontWeight: 500,
    fill: CITRON.white,
  }),
  rect(436, 600, 306, 104, 'rgba(163,230,53,0.28)', { name: 'Highlight', cornerRadius: 10 }),
  rect(742, 596, 8, 112, CITRON.lime, { name: 'Caret' }),
  text('Roadmap Shines', 80, 606, 920, {
    fontFamily: HEAD,
    fontSize: 78,
    fontWeight: 500,
    fill: CITRON.white,
  }),
  text('Grow your team with tools\nthat scale right alongside you', 80, 760, 800, {
    fontFamily: BODY,
    fontSize: 36,
    fontWeight: 500,
    fill: CITRON.muted,
    lineHeight: 1.4,
  }),
  button('Learn More', 80, 920, 260, true),
]);

const ENGINE_TICKS = [150, 190, 230, 270, 310, 350, 390];

export const smartEngines = template(W, H, () => [
  darkBg(H),
  limeGlow(240, 220, 600, 600, 0.25),
  circle(540, 520, 260, linear(180, '#25291b', '#121409'), {
    name: 'Gauge face',
    stroke: 'rgba(255,255,255,0.12)',
    strokeWidth: 4,
    ...shadow(60, 20, 'rgba(0,0,0,0.6)'),
  }),
  ringArc(540, 520, 240, 212, 135, 405, 'rgba(255,255,255,0.12)'),
  ringArc(540, 520, 240, 212, 135, 330, linear(90, CITRON.deep, CITRON.lime)),
  ENGINE_TICKS.map((angle) => {
    const radians = (angle * Math.PI) / 180;
    return circle(540 + 185 * Math.cos(radians), 520 + 185 * Math.sin(radians), 5, CITRON.muted);
  }),
  text('9200', 0, 440, W, {
    fontFamily: HEAD,
    fontSize: 110,
    fontWeight: 800,
    fill: CITRON.white,
    align: 'center',
    lineHeight: 1,
  }),
  text('tasks per min', 0, 570, W, {
    fontFamily: BODY,
    fontSize: 30,
    fontWeight: 600,
    fill: CITRON.lime,
    align: 'center',
  }),
  text('Smart Engines', 0, 840, W, {
    fontFamily: HEAD,
    fontSize: 96,
    fontWeight: 700,
    fill: CITRON.white,
    align: 'center',
  }),
  button('Learn More', 405, 990, 270, true),
  rect(140, 1160, 800, 6, 'rgba(255,255,255,0.18)', { name: 'Track', cornerRadius: 3 }),
  rect(140, 1160, 480, 6, CITRON.lime, { name: 'Progress', cornerRadius: 3 }),
  brandMark(1240),
]);

const ROWS = [
  { label: 'Smart Triggers', active: false },
  { label: 'Auto Task Routing', active: true },
  { label: 'Live Performance Insights', active: false },
];

const flowmindNodes = (height: number): Nodes[] => {
  const top = (height - H) / 2;
  return [
    rect(0, 0, W, height, CITRON.night, { name: 'Background' }),
    rect(0, top + 120, W, 2, 'rgba(255,255,255,0.08)', { name: 'Grid line' }),
    rect(150, 0, 2, height, 'rgba(255,255,255,0.06)', { name: 'Grid line' }),
    rect(928, 0, 2, height, 'rgba(255,255,255,0.06)', { name: 'Grid line' }),
    poly(
      [
        [400, top + 110],
        [680, top + 110],
        [960, top + 640],
        [120, top + 640],
      ],
      linear(180, 'rgba(163,230,53,0.28)', 'rgba(163,230,53,0)'),
      { name: 'Spotlight' },
    ),
    rect(400, top + 104, 280, 12, CITRON.lime, {
      name: 'Lamp',
      cornerRadius: 6,
      ...shadow(40, 0, CITRON.lime),
    }),
    icon('sparkles', 360, top + 186, 40, CITRON.white, { strokeWidth: 2 }),
    text('New AI Features', 412, top + 188, 400, {
      fontFamily: BODY,
      fontSize: 32,
      fontWeight: 600,
      fill: CITRON.white,
    }),
    text('Flowmind', 0, top + 250, W, {
      fontFamily: HEAD,
      fontSize: 170,
      fontWeight: 600,
      fill: linear(180, CITRON.bright, CITRON.lime),
      align: 'center',
      lineHeight: 1,
    }),
    text(
      'AI-driven automation that streamlines\nworkflows and lifts your output.',
      0,
      top + 470,
      W,
      {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 500,
        fill: CITRON.muted,
        align: 'center',
        lineHeight: 1.4,
      },
    ),
    rect(150, top + 650, 780, 480, 'rgba(255,255,255,0.04)', {
      name: 'Panel',
      cornerRadius: 40,
      stroke: 'rgba(255,255,255,0.16)',
      strokeWidth: 2,
    }),
    ROWS.map((row, index) => {
      const y = top + 720 + index * 130;
      return [
        rect(210, y, 660, 92, row.active ? linear(90, CITRON.bright, CITRON.lime) : '#262a1d', {
          name: 'Feature row',
          cornerRadius: 22,
          ...(row.active ? shadow(40, 0, 'rgba(163,230,53,0.5)') : {}),
        }),
        text(row.label, 210, y + 28, 660, {
          fontFamily: BODY,
          fontSize: 32,
          fontWeight: 600,
          fill: row.active ? CITRON.night : CITRON.white,
          align: 'center',
        }),
      ];
    }),
    brandMark(height - 110),
  ];
};

export const flowmindPost = template(W, H, () => flowmindNodes(H));

export const flowmindStory = template(STORY_SIZE.width, STORY_SIZE.height, () =>
  flowmindNodes(STORY_SIZE.height),
);
