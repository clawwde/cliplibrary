import { type DesignIconName, linear } from '@/design';
import { icon, rect, shadow, template } from '../../../kit';
import { centered, darkGlow, H, NEON, say, site, W } from './palette';

const glowLine = (y: number) =>
  rect(0, y, W, 4, linear(90, 'rgba(230,217,255,0)', NEON.rose, 'rgba(230,217,255,0)'), {
    name: 'Glow line',
  });

export const impactCover = template(W, H, () => [
  darkGlow(),
  site(80, 90, NEON.white, 'left'),
  say('Ways\nTo Build', 80, 380, 800, 92, NEON.lilac, 300, { lineHeight: 1.1 }),
  say('Impact', 80, 590, 800, 140, NEON.white, 800, { lineHeight: 1 }),
  rect(620, 668, 460, 4, linear(90, NEON.rose, 'rgba(255,179,209,0)'), { name: 'Glow line' }),
  say('in a fast moving\nAI industry', 80, 790, 800, 40, NEON.muted, 400),
  rect(860, 1130, 120, 120, NEON.white, { name: 'Arrow button', cornerRadius: 28 }),
  icon('arrow-right', 885, 1155, 70, NEON.ink, { strokeWidth: 2.4 }),
]);

const impactStep = (symbol: DesignIconName, title: string, body: string) =>
  template(W, H, () => [
    darkGlow(),
    glowLine(640),
    rect(538, 400, 4, 240, 'rgba(255,179,209,0.6)', { name: 'Stem' }),
    rect(455, 240, 170, 170, NEON.white, {
      name: 'Icon tile',
      cornerRadius: 36,
      ...shadow(60, 0, 'rgba(255,95,162,0.65)'),
    }),
    icon(symbol, 490, 275, 100, NEON.ink, { strokeWidth: 2 }),
    centered(title, 720, 70, NEON.white, 700),
    centered(body, 840, 36, NEON.muted, 400, { lineHeight: 1.5 }),
  ]);

export const impactSystems = impactStep(
  'workflow',
  'Ship Small Systems',
  'Build AI tools that remove friction\nand respect how people work. Small,\nreliable wins beat big promises.',
);

export const impactCurious = impactStep(
  'lightbulb',
  'Stay Curious',
  "Don't just read about new tools.\nPrototype with them every week to\nbuild a real feel for what works.",
);

export const impactAgents = impactStep(
  'bot',
  'Lead the Agents',
  'Learn to frame clear problems and\nhand them to agents that can solve\nthem while you focus on strategy.',
);

const stackedCard = () => [
  rect(0, 160, 64, 1030, 'rgba(230,217,255,0.16)', { name: 'Stack edge', cornerRadius: 30 }),
  rect(1016, 160, 64, 1030, 'rgba(230,217,255,0.16)', { name: 'Stack edge', cornerRadius: 30 }),
  rect(180, 0, 720, 70, 'rgba(230,217,255,0.16)', { name: 'Stack edge', cornerRadius: 26 }),
  rect(180, 1280, 720, 70, 'rgba(230,217,255,0.16)', { name: 'Stack edge', cornerRadius: 26 }),
  rect(100, 100, 880, 1150, linear(180, NEON.white, NEON.lilac), {
    name: 'Card',
    cornerRadius: 64,
    ...shadow(50, 10, 'rgba(255,95,162,0.35)'),
  }),
];

const darkPill = (label: string, x: number, y: number, width: number) => [
  rect(x, y, width, 80, NEON.ink, { name: 'Dark pill', cornerRadius: 40 }),
  say(label, x, y + 21, width, 30, NEON.white, 600, { align: 'center' }),
];

export const flowCover = template(W, H, () => [
  darkGlow(),
  stackedCard(),
  centered('loomwork.ai', 170, 30, NEON.ink, 500),
  darkPill('Learn How', 410, 330, 260),
  centered('To Automate\nUser Friendly', 460, 80, NEON.ink, 400, { lineHeight: 1.1 }),
  centered('Workflows', 640, 96, NEON.pink, 800),
  darkPill('Swipe to continue  →', 310, 830, 460),
]);

const flowStep = (number: string, lead: string, accent: string, body: string) =>
  template(W, H, () => [
    darkGlow(),
    stackedCard(),
    rect(470, 250, 140, 140, NEON.ink, { name: 'Number tile', cornerRadius: 28 }),
    say(number, 470, 288, 140, 56, NEON.white, 700, { align: 'center', lineHeight: 1.1 }),
    centered(lead, 460, 72, NEON.ink, 700, { lineHeight: 1.1 }),
    centered(accent, 545, 72, NEON.pink, 700, { lineHeight: 1.1 }),
    say(body, 170, 690, 740, 36, '#4a3d5c', 400, { align: 'center', lineHeight: 1.5 }),
    rect(440, 1010, 200, 80, NEON.ink, { name: 'Arrow pill', cornerRadius: 40 }),
    icon('arrow-right', 510, 1020, 60, NEON.white, { strokeWidth: 2.4 }),
  ]);

export const flowJourney = flowStep(
  '01',
  'Sketch the',
  'Whole Journey',
  'Before choosing a tool, draw every\nstep a person takes from the first\nclick to the finished task.',
);

export const flowPrompts = flowStep(
  '02',
  'Sharper Prompts,',
  'Sharper Output',
  'The more specific your request,\nthe more useful the result.\nContext is the shortcut.',
);

export const flowFeedback = flowStep(
  '03',
  'Close the',
  'Feedback Loop',
  'Always show people what the\nsystem just did, with a simple\nstatus or a confirmation.',
);
