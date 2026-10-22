import { linear } from '@/design';
import { circle, icon, rect, shadow, type Template, template, text } from '../../../kit';
import {
  BODY,
  brandMark,
  CITRON,
  counterGrow,
  darkBg,
  H,
  HEAD,
  levelUp,
  limeGlow,
  versionLive,
  W,
} from './posts';
import { flowmindPost, roadmapShines, smartEngines } from './posts-mid';

const SPACES = [
  { icon: 'megaphone', label: 'Growth', count: '3' },
  { icon: 'palette', label: 'Product', count: '5' },
  { icon: 'code', label: 'Engineering', count: '2' },
  { icon: 'headphones', label: 'Support', count: '4' },
] as const;

const workspaces = template(W, H, () => [
  darkBg(H),
  limeGlow(500, 120, 580, 700, 0.3),
  rect(170, 320, 740, 680, linear(180, '#262a1d', '#14160e'), {
    name: 'Panel',
    cornerRadius: 40,
    stroke: 'rgba(255,255,255,0.2)',
    strokeWidth: 2,
    ...shadow(60, 24, 'rgba(0,0,0,0.6)'),
  }),
  text('Workspaces', 230, 380, 500, {
    fontFamily: HEAD,
    fontSize: 46,
    fontWeight: 600,
    fill: CITRON.white,
  }),
  icon('plus', 810, 384, 48, CITRON.white, { strokeWidth: 2.4 }),
  SPACES.map((space, index) => {
    const y = 520 + index * 118;
    const active = index === 1;
    return [
      active
        ? rect(200, y - 22, 680, 96, 'rgba(255,255,255,0.09)', {
            name: 'Active row',
            cornerRadius: 22,
          })
        : [],
      icon(space.icon, 240, y, 48, active ? CITRON.lime : CITRON.white, { strokeWidth: 2 }),
      text(space.label, 316, y + 4, 420, {
        fontFamily: BODY,
        fontSize: 38,
        fontWeight: 600,
        fill: CITRON.white,
      }),
      circle(830, y + 25, 22, active ? CITRON.lime : 'rgba(255,255,255,0.14)', {
        name: 'Badge',
      }),
      text(space.count, 808, y + 9, 44, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 700,
        fill: active ? CITRON.night : CITRON.white,
        align: 'center',
      }),
    ];
  }),
  brandMark(1240),
]);

const CAPSULES = [
  { x: 110, height: 320, active: false },
  { x: 350, height: 460, active: false },
  { x: 590, height: 720, active: true },
  { x: 830, height: 420, active: false },
];

const insightsBars = template(W, H, () => [
  darkBg(H),
  text('Insights', 80, 110, 920, {
    fontFamily: HEAD,
    fontSize: 116,
    fontWeight: 800,
    fill: CITRON.lime,
  }),
  text('Spot the patterns that sharpen\nevery decision you make', 80, 270, 920, {
    fontFamily: BODY,
    fontSize: 38,
    fontWeight: 500,
    fill: CITRON.muted,
    lineHeight: 1.4,
  }),
  CAPSULES.map((capsule) =>
    rect(
      capsule.x,
      1180 - capsule.height,
      150,
      capsule.height,
      capsule.active
        ? linear(180, CITRON.bright, CITRON.lime)
        : linear(180, '#3b4030', 'rgba(37,41,29,0.4)'),
      {
        name: 'Capsule',
        cornerRadius: 75,
        ...(capsule.active ? shadow(70, 0, 'rgba(163,230,53,0.55)') : {}),
      },
    ),
  ),
  brandMark(1250),
]);

export const POSTS: readonly Template[] = [
  levelUp,
  counterGrow,
  versionLive,
  roadmapShines,
  smartEngines,
  flowmindPost,
  workspaces,
  insightsBars,
];
