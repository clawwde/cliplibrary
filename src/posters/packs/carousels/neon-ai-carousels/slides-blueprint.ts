import { avatar, icon, rect, template } from '../../../kit';
import { centered, darkGlow, H, lightWash, NEON, say, site, W } from './palette';

const swipeRow = (y: number) => [
  rect(330, y, 150, 50, 'rgba(0,0,0,0)', {
    name: 'Swipe chip',
    cornerRadius: 14,
    stroke: NEON.white,
    strokeWidth: 3,
  }),
  say('SWIPE', 330, y + 12, 150, 22, NEON.white, 700, { align: 'center', letterSpacing: 3 }),
  icon('move-right', 500, y + 2, 46, NEON.white, { strokeWidth: 2 }),
  say('01 02 03 04 05', 570, y + 10, 260, 26, NEON.white, 500, { letterSpacing: 2 }),
];

export const roadmapCover = template(W, H, () => [
  darkGlow(),
  centered('Your Roadmap', 300, 84, NEON.white, 700),
  centered('to AI-Powered\nGrowth', 400, 84, NEON.white, 300, { lineHeight: 1.15 }),
  swipeRow(680),
  say('loomwork.ai', 80, 1220, 400, 32, NEON.white, 600),
  say('Save for later', 620, 1220, 300, 32, NEON.white, 600, { align: 'right' }),
  icon('bookmark', 940, 1218, 40, NEON.white, { strokeWidth: 2 }),
]);

const roadmapStep = (title: string, body: string, flow: string) =>
  template(W, H, () => [
    darkGlow(),
    centered(title, 170, 70, NEON.white, 700, { lineHeight: 1.1 }),
    rect(110, 390, 860, 470, 'rgba(255,255,255,0.05)', {
      name: 'Frame',
      cornerRadius: 40,
      stroke: 'rgba(230,217,255,0.35)',
      strokeWidth: 3,
    }),
    say(body, 160, 450, 760, 40, NEON.lilac, 400, { align: 'center', lineHeight: 1.4 }),
    say(flow, 160, 760, 760, 38, NEON.white, 700, { align: 'center' }),
    swipeRow(930),
  ]);

export const roadmapAudit = roadmapStep(
  'Audit Your\nWorkflows',
  "You can't automate what you\nhaven't mapped. Find the\nrepetitive, low-value tasks\nthat drain your week.",
  'Spot > Map > Automate',
);

export const roadmapTeam = roadmapStep(
  'The Human +\nAI Team',
  'AI is your eager assistant,\nnot your replacement. Let it\ndraft the first version, then\nadd your taste and judgement.',
  'Brief > Draft > Polish',
);

export const roadmapScale = roadmapStep(
  'Scale Your\nOutput',
  'Consistency is the real edge.\nTurn one strong idea into a\npost, a thread, a newsletter\nand a short video script.',
  'Idea > Format > Reach',
);

const authorRow = (y: number, ink: string) => [
  rect(80, y, 920, 3, ink, { name: 'Rule', opacity: 0.4 }),
  say('Maya Ortiz', 80, y + 34, 400, 32, ink, 700),
  icon('badge-check', 280, y + 36, 34, NEON.pink, { strokeWidth: 2.2 }),
  rect(860, y + 26, 140, 56, 'rgba(0,0,0,0)', {
    name: 'Arrow chip',
    cornerRadius: 28,
    stroke: ink,
    strokeWidth: 3,
  }),
  icon('move-right', 905, y + 31, 48, ink, { strokeWidth: 2 }),
];

export const waysCover = template(W, H, () => [
  lightWash(),
  site(80, 90, NEON.ink, 'left'),
  say('3 Ways to', 80, 480, 800, 104, NEON.ink, 400, { lineHeight: 1.1 }),
  say('Grow With', 80, 598, 800, 104, NEON.ink, 700, { lineHeight: 1.1 }),
  say('Smart AI', 80, 716, 800, 104, NEON.pink, 700, { lineHeight: 1.1 }),
  avatar('woman-portrait-4', 900, 380, 80, NEON.white),
  icon('navigation', 790, 280, 60, NEON.ink, { strokeWidth: 2 }),
  authorRow(1130, NEON.ink),
]);

const tip = (number: string, lead: string, accent: string, body: string, dark: boolean) => {
  const ink = dark ? NEON.white : NEON.ink;
  return template(W, H, () => [
    dark ? darkGlow() : lightWash(),
    say(number, 380, 40, 680, 440, dark ? 'rgba(230,217,255,0.1)' : 'rgba(42,23,72,0.08)', 800, {
      align: 'right',
      lineHeight: 1,
    }),
    say(lead, 80, 560, 900, 80, ink, 700, { lineHeight: 1.1 }),
    say(accent, 80, 650, 900, 80, NEON.pink, 700, { lineHeight: 1.1 }),
    say(body, 80, 800, 880, 36, dark ? NEON.muted : '#4a3d5c', 400, { lineHeight: 1.5 }),
    authorRow(1130, ink),
  ]);
};

export const tipAgents = tip(
  '01',
  'Hand Off',
  'to Agents',
  'Stop using AI as a simple chat box. Let\nsmall agents sort leads, tidy data and\nrun first-pass research for you.',
  true,
);

export const tipPrompts = tip(
  '02',
  'Build a',
  'Prompt Library',
  'Consistency needs structure. Save the\nprompts that work so every draft sounds\nlike your brand from the first line.',
  false,
);

export const tipData = tip(
  '03',
  'Clean Up',
  'Your Data',
  'AI is only as sharp as what you feed it.\nAudit your inputs before you expect\nclear, useful insights back.',
  true,
);
