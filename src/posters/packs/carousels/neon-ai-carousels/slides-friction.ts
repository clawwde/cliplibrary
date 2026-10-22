import type { DesignIconName } from '@/design';
import { avatar, icon, rect, template } from '../../../kit';
import { darkGlow, H, lightWash, NEON, say, site, W } from './palette';

const gridLines = () => [
  Array.from({ length: 12 }, (_, index) =>
    rect(40 + index * 92, 0, 2, H, 'rgba(199,186,217,0.1)', { name: 'Grid line' }),
  ),
  Array.from({ length: 15 }, (_, index) =>
    rect(0, 30 + index * 92, W, 2, 'rgba(199,186,217,0.1)', { name: 'Grid line' }),
  ),
];

const framedBox = (y: number, height: number, tag: string) => [
  rect(100, y, 880, height, 'rgba(7,4,13,0.86)', {
    name: 'Frame',
    stroke: NEON.lilac,
    strokeWidth: 3,
  }),
  rect(130, y - 26, 26 + tag.length * 17, 52, NEON.white, { name: 'Tag' }),
  say(tag, 143, y - 17, tag.length * 18, 28, NEON.ink, 700, { fontFamily: 'Space Mono' }),
];

const swipeFooter = () => [
  say('Swipe to continue', 100, 1200, 500, 32, NEON.white, 500),
  icon('move-right', 880, 1180, 80, NEON.white, { strokeWidth: 1.8 }),
];

export const automationCover = template(W, H, () => [
  darkGlow(),
  gridLines(),
  site(580, 90, NEON.white, 'right'),
  framedBox(520, 230, '#BuildSmarter'),
  say('Automation', 100, 570, 880, 118, NEON.white, 800, { align: 'center', lineHeight: 1.1 }),
  swipeFooter(),
]);

const automationStep = (tag: string, title: string, body: string) =>
  template(W, H, () => [
    darkGlow(),
    gridLines(),
    site(580, 90, NEON.white, 'right'),
    framedBox(330, 600, tag),
    say(title, 150, 400, 800, 70, NEON.white, 800, { lineHeight: 1.1 }),
    say(body, 150, 530, 780, 38, NEON.muted, 400, { lineHeight: 1.5 }),
    swipeFooter(),
  ]);

export const automationFriction = automationStep(
  '#Discovery',
  'Find the Friction',
  'Before writing a line of code,\nwalk through the human steps.\nThe moments people sigh are\nwhere automation helps most.',
);

export const automationFramework = automationStep(
  '#Framework',
  'Pick a Framework',
  'Balance machine speed with\nhuman judgement. A simple\nthree-step model keeps every\nworkflow calm and clear.',
);

export const automationQuiet = automationStep(
  '#Systems',
  'Quiet Systems',
  'The best automations run in\nthe background. Nobody should\ntrigger a small task that the\nsystem could have predicted.',
);

export const smoothCover = template(W, H, () => [
  lightWash(),
  avatar('woman-portrait-4', 140, 160, 56),
  say('Maya Ortiz', 220, 118, 400, 34, NEON.ink, 700),
  icon('badge-check', 420, 120, 34, NEON.pink, { strokeWidth: 2.2 }),
  say('@mayabuilds', 220, 164, 400, 28, '#6b5a80', 400),
  say('Automate', 80, 460, 900, 110, NEON.ink, 400, { lineHeight: 1.05 }),
  say('Without', 80, 580, 900, 110, NEON.pink, 800, { lineHeight: 1.05 }),
  say('Friction', 80, 700, 900, 110, NEON.ink, 400, { lineHeight: 1.05 }),
  icon('corner-down-right', 560, 860, 440, 'rgba(255,95,162,0.28)', { strokeWidth: 1.4 }),
  say('Swipe to read', 80, 1220, 400, 32, NEON.ink, 500),
]);

const smoothStep = (
  lead: string,
  accent: string,
  body: string,
  symbol: DesignIconName,
  dark: boolean,
) => {
  const panel = dark ? NEON.night : NEON.mist;
  const behind = dark ? NEON.mist : NEON.night;
  const ink = dark ? NEON.white : NEON.ink;
  return template(W, H, () => [
    rect(0, 0, W, H, behind, { name: 'Next slide' }),
    rect(0, 0, 1000, H, panel, { name: 'Panel', cornerRadius: 70 }),
    rect(0, 0, 120, H, panel, { name: 'Panel edge' }),
    icon(symbol, 300, 860, 420, dark ? 'rgba(230,217,255,0.14)' : 'rgba(42,23,72,0.1)', {
      strokeWidth: 1.2,
    }),
    say(lead, 80, 220, 880, 84, ink, 800, { lineHeight: 1.05 }),
    say(accent, 80, 310, 880, 84, NEON.pink, 800, { lineHeight: 1.05 }),
    say(body, 80, 470, 860, 44, dark ? NEON.lilac : '#3b2d4f', 400, { lineHeight: 1.45 }),
  ]);
};

export const smoothFeedback = smoothStep(
  'Live',
  'Feedback',
  'Treat AI as a creative partner.\nRefine the output in a real\nconversation and you get a\nresult no generic prompt can\nmatch.',
  'mic',
  true,
);

export const smoothContext = smoothStep(
  'Rich',
  'Context',
  'Great output needs great input.\nBefore the first word, define\nthe persona, the task and the\nlimits you care about.',
  'rocket',
  false,
);

export const smoothReview = smoothStep(
  'Built-in',
  'Review',
  'Use clear separators to split\nyour instructions from the\ndata, then ask the AI to check\nits own reasoning.',
  'shield-check',
  true,
);
