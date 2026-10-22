import { linear } from '@/design';
import { avatar, checklist, circle, icon, photo, rect, rotateNodes, template } from '../../../kit';
import { backdrop, body, CV, glass, glow, halfRing, head, SH, SW, wash } from './theme';

const orbitPoint = (radius: number, degrees: number) => ({
  x: 960 + radius * Math.cos((degrees * Math.PI) / 180),
  y: 1080 - radius * Math.sin((degrees * Math.PI) / 180),
});

const plusNode = (radius: number, degrees: number) => {
  const { x, y } = orbitPoint(radius, degrees);
  return [circle(x, y, 22, CV.rose), icon('plus', x - 14, y - 14, 28, CV.wine, { strokeWidth: 3 })];
};

const orbitAvatar = (name: 'woman-portrait-1' | 'man-portrait-1', degrees: number) => {
  const { x, y } = orbitPoint(470, degrees);
  return avatar(name, x, y, 50, CV.blush);
};

export const coverSlide = template(SW, SH, () => [
  backdrop(),
  wash(0, 0.24),
  halfRing(960, 1080, 640, 636, 'rgba(255,214,223,0.35)'),
  halfRing(960, 1080, 472, 468, 'rgba(255,214,223,0.45)'),
  halfRing(960, 1080, 300, 0.01, linear(180, '#f6b3c3', CV.berry)),
  plusNode(636, 112),
  plusNode(636, 64),
  orbitAvatar('woman-portrait-1', 140),
  orbitAvatar('man-portrait-1', 38),
  head('Corvane Cloud', 0, 150, SW, 128, CV.white, { align: 'center' }),
  head('Investor Deck', 0, 290, SW, 128, CV.rose, { align: 'center' }),
]);

const CHAPTERS = [
  'Overview',
  'Our team',
  'Platform',
  'Pricing',
  'Key metrics',
  'Financials',
  'Roadmap',
  'Next steps',
];

export const contentsSlide = template(SW, SH, () => [
  backdrop(),
  wash(225, 0.16),
  head('Table of Contents', 140, 130, 1200, 72, CV.white),
  body('Eight short chapters, from vision to next steps.', 140, 230, 1000, 32, CV.muted),
  [1, 2, 3].map((column) =>
    rect(220 + column * 400 - 40, 400, 2, 520, CV.edge, { name: 'Divider' }),
  ),
  CHAPTERS.map((chapter, index) => {
    const x = 220 + (index % 4) * 400;
    const y = 400 + Math.floor(index / 4) * 280;
    return [
      head(String(index + 1).padStart(2, '0'), x, y, 320, 120, index === 0 ? CV.rose : CV.white),
      body(chapter, x, y + 150, 320, 32, CV.muted),
    ];
  }),
]);

const CHIPS = ['radio-tower', 'workflow', 'layers', 'rocket', 'database', 'send'] as const;

export const welcomeSlide = template(SW, SH, () => [
  backdrop(),
  head('Welcome to Corvane', 0, 110, SW, 76, CV.white, { align: 'center' }),
  body(
    'We turn scattered tools into one calm, connected platform, so enterprise teams spend\nless time stitching data together and more time shipping work that matters.',
    160,
    220,
    1600,
    32,
    CV.muted,
    { align: 'center' },
  ),
  glow(960, 700, 360, 0.35),
  [320, 240, 160].map((radius, index) =>
    circle(960, 700, radius, `rgba(241,155,176,${0.05 + index * 0.04})`, {
      stroke: CV.edge,
      strokeWidth: 2,
    }),
  ),
  circle(960, 700, 84, linear(160, CV.blush, CV.rose)),
  icon('plus', 920, 660, 80, CV.wine, { strokeWidth: 2.4 }),
  CHIPS.map((name, index) => {
    const slot = index < 3 ? index - 3 : index - 2;
    const cx = 960 + slot * 190;
    return [
      circle(cx, 700, 50, '#3d1424', { stroke: CV.edge, strokeWidth: 2 }),
      icon(name, cx - 22, 678, 44, CV.blush, { strokeWidth: 2 }),
    ];
  }),
]);

const PILLARS = [
  {
    icon: 'server',
    title: 'Infrastructure',
    text: 'Scalable clusters with managed upgrades built in.',
    light: true,
    tilt: -8,
  },
  {
    icon: 'workflow',
    title: 'Automation',
    text: 'Cut hand-offs by 45% with event-driven workflows.',
    light: false,
    tilt: 0,
  },
  {
    icon: 'shield-check',
    title: 'Security',
    text: 'Continuous monitoring with audit trails built in.',
    light: true,
    tilt: 7,
  },
] as const;

export const empoweringSlide = template(SW, SH, () => [
  backdrop(),
  wash(0, 0.18),
  head('Empowering Businesses\nThrough Digital Change', 0, 110, SW, 68, CV.white, {
    align: 'center',
    lineHeight: 1.15,
  }),
  PILLARS.map((pillar, index) => {
    const x = 330 + index * 440;
    const y = index === 1 ? 470 : 530;
    const ink = pillar.light ? CV.ink : CV.white;
    return rotateNodes(pillar.tilt, x + 220, y + 220, [
      rect(
        x,
        y,
        440,
        440,
        pillar.light ? linear(160, CV.white, CV.blush) : linear(160, '#4a1528', CV.ink),
        {
          name: 'Pillar card',
          cornerRadius: 32,
          stroke: CV.edge,
          strokeWidth: pillar.light ? 0 : 2,
        },
      ),
      rect(x + 40, y + 40, 84, 84, pillar.light ? CV.berry : CV.rose, {
        name: 'Icon tile',
        cornerRadius: 22,
      }),
      icon(pillar.icon, x + 60, y + 60, 44, pillar.light ? CV.white : CV.wine, { strokeWidth: 2 }),
      head(pillar.title, x + 40, y + 170, 360, 42, ink),
      body(pillar.text, x + 40, y + 240, 360, 28, ink, { opacity: 0.85 }),
    ]);
  }),
]);

const statCard = (value: string, label: string, x: number) => [
  glass(x, 90, 330, 250),
  head(value, x + 36, 130, 280, 70, CV.white),
  body(label, x + 36, 230, 280, 28, CV.muted),
];

export const coreFocusSlide = template(SW, SH, () => [
  backdrop(),
  photo('workspace-1', 830, 90, 1000, 900, { cornerRadius: 32 }),
  rect(830, 90, 1000, 900, linear(90, 'rgba(31,10,18,0.55)', 'rgba(58,16,32,0.1)'), {
    name: 'Photo tint',
    cornerRadius: 32,
  }),
  statCard('$4.8M+', 'Revenue managed', 90),
  statCard('210+', 'Enterprise clients', 450),
  rect(90, 380, 690, 610, linear(160, CV.white, CV.blush), {
    name: 'Focus card',
    cornerRadius: 32,
  }),
  head('Our Core Focus', 140, 440, 600, 56, CV.ink),
  body(
    'Tailored cloud strategy, resilient architecture and security that scales.',
    140,
    530,
    590,
    30,
    '#6b3a4b',
  ),
  checklist(['Cloud migration', 'Data governance', 'Round-the-clock support'], 140, 720, 590, {
    color: CV.ink,
    iconColor: CV.berry,
    fontSize: 30,
    gap: 76,
    fontFamily: 'Figtree',
  }),
]);
