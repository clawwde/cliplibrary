import { linear, radial } from '@/design';
import { circle, icon, path, phone, phoneScreen, rect, template } from '../../../kit';
import { backdrop, body, fade, glow, head, K, mono, SH, SW } from './theme';

const AUDIT = [
  { icon: 'search', title: 'Audit', text: 'Map every manual hand-off in one week.', tone: 'white' },
  {
    icon: 'workflow',
    title: 'Sandbox',
    text: 'Test agents safely on live-like data.',
    tone: 'dark',
  },
  {
    icon: 'shield-check',
    title: 'SLA review',
    text: 'Lock in uptime and response targets.',
    tone: 'lime',
  },
] as const;

export const auditSlide = template(SW, SH, () => [
  backdrop(160),
  head('Process\nAudit', 100, 120, 760, 120, K.white),
  body('Three steps to spot the fastest automation wins.', 100, 400, 760, 32, K.muted),
  AUDIT.map((card, index) => {
    const x = 100 + index * 290;
    const ink = card.tone === 'dark' ? K.white : K.black;
    return [
      rect(
        x,
        540,
        270,
        420,
        card.tone === 'white' ? K.white : card.tone === 'lime' ? K.lime : K.panel,
        {
          name: 'Audit card',
          cornerRadius: 24,
          stroke: K.line,
          strokeWidth: card.tone === 'dark' ? 2 : 0,
        },
      ),
      icon(card.icon, x + 32, 576, 60, ink, { strokeWidth: 2 }),
      head(card.title, x + 32, 700, 220, 38, ink),
      body(card.text, x + 32, 764, 210, 26, card.tone === 'dark' ? K.muted : K.black),
    ];
  }),
  mono('laptop-analytics', 1000, 100, 820, 880, 32),
]);

export const assistSlide = template(SW, SH, () => {
  const screen = phoneScreen(300);
  return [
    backdrop(),
    glow(960, 880, 200, 0.45),
    head('Plan.', 0, 90, SW, 250, K.white, { align: 'center', lineHeight: 1 }),
    head('Build.', 0, 380, SW, 250, fade('rgba(255,255,255,0.85)'), {
      align: 'center',
      lineHeight: 1,
    }),
    head('Ship.', 0, 670, SW, 250, K.lime, { align: 'center', lineHeight: 1 }),
    phone(1010, 220, 300, {
      screen: linear(180, '#e6fdb0', K.lime, K.olive),
      rotation: 10,
      content: [
        rect(24, 110, screen.width - 48, 150, 'rgba(6,8,5,0.85)', {
          name: 'Agent card',
          cornerRadius: 20,
        }),
        icon('sparkles', 44, 130, 44, K.lime),
        rect(100, 140, 120, 12, K.white, { name: 'Line', cornerRadius: 6 }),
        rect(100, 166, 90, 12, 'rgba(255,255,255,0.5)', { name: 'Line', cornerRadius: 6 }),
        rect(44, 200, screen.width - 88, 34, K.lime, { name: 'Progress', cornerRadius: 17 }),
        [0, 1, 2].map((row) =>
          rect(24, 300 + row * 80, screen.width - 48, 60, 'rgba(255,255,255,0.55)', {
            name: 'Task row',
            cornerRadius: 16,
          }),
        ),
      ],
    }),
  ];
});

const STAGES = [
  { label: 'Baseline', value: '33%', x: 160 },
  { label: 'Current scale', value: '66%', x: 700 },
  { label: 'Target', value: '100%', x: 1460 },
];

const FEATURES = [
  { icon: 'workflow', title: 'Smart routing', text: 'Tickets reach the right agent in seconds.' },
  { icon: 'trending-up', title: 'Expansion runway', text: 'Capacity for three times the volume.' },
] as const;

export const velocitySlide = template(SW, SH, () => [
  backdrop(200),
  head('Execution Velocity', 0, 140, SW, 100, K.white, { align: 'center' }),
  STAGES.map((stage, index) => [
    body(stage.label, stage.x, 330, 300, 30, K.muted, {
      align: index === 0 ? 'left' : index === 2 ? 'right' : 'center',
    }),
    head(stage.value, stage.x, 380, 300, 64, K.white, {
      align: index === 0 ? 'left' : index === 2 ? 'right' : 'center',
    }),
  ]),
  Array.from({ length: 6 }, (_, index) =>
    rect(160 + index * 270, 510, 250, 110, index < 4 ? K.lime : K.white, {
      name: 'Progress segment',
      cornerRadius: 24,
    }),
  ),
  FEATURES.map((item, index) => {
    const x = 160 + index * 820;
    return [
      rect(x, 800, 80, 80, K.lime, { name: 'Icon tile', cornerRadius: 20 }),
      icon(item.icon, x + 18, 818, 44, K.black),
      head(item.title, x + 110, 800, 600, 40, K.white),
      body(item.text, x + 110, 860, 620, 30, K.muted),
    ];
  }),
]);

const STATS = [
  ['Sponsors', '140K'],
  ['Partners', '420K'],
  ['Repositories', '310M'],
  ['Contributors', '17.6K'],
  ['Searches', '88M'],
  ['Teams', '246K'],
  ['Milestones', '72K'],
  ['API hooks', '20.4K'],
] as const;

export const numbersSlide = template(SW, SH, () => [
  backdrop(),
  STATS.map(([label, value], index) => {
    const x = 220 + (index % 4) * 390;
    const y = 90 + Math.floor(index / 4) * 190;
    return [body(label, x, y, 360, 28, K.muted), head(value, x, y + 40, 360, 84, K.white)];
  }),
  head('Numbers', 0, 470, SW, 300, fade('rgba(255,255,255,0.55)'), { align: 'center' }),
  path('M0 380 A1032 1032 0 0 1 1600 380 Z', 160, 700, 1600, 380, 'rgba(184,245,49,0.18)', {
    width: 1600,
    height: 380,
  }),
  path(
    'M0 340 A1019 1019 0 0 1 1520 340 Z',
    200,
    740,
    1520,
    340,
    radial('#d6fb83', K.lime, K.olive, '#0b1105'),
    { width: 1520, height: 340 },
  ),
]);

export const conversionsSlide = template(SW, SH, () => [
  backdrop(200),
  head('Growth\nConversions', 100, 160, 820, 110, K.white),
  body(
    'Trend analysis shows a 41% link between faster page loads and paid conversions once Kestrel agents went live.',
    100,
    440,
    760,
    32,
    K.muted,
  ),
  rect(100, 720, 320, 180, K.white, { name: 'Stat chip', cornerRadius: 24 }),
  head('88%', 140, 750, 260, 72, K.black),
  body('Latency reduction', 140, 840, 260, 26, K.black, { fontWeight: 600 }),
  rect(460, 720, 380, 180, K.lime, { name: 'Stat chip', cornerRadius: 24 }),
  head('14K hrs', 500, 750, 320, 72, K.black),
  body('Saved annually', 500, 840, 320, 26, K.black, { fontWeight: 600 }),
  path(
    'M0 560 C200 560 220 300 360 340 S520 600 600 420 S680 120 760 60',
    1000,
    240,
    760,
    560,
    'rgba(0,0,0,0)',
    { width: 760, height: 560 },
    { stroke: 'rgba(255,255,255,0.75)', strokeWidth: 5, name: 'Trend curve' },
  ),
  glow(1760, 300, 110, 0.7),
  circle(1760, 300, 26, K.lime),
  circle(1760, 300, 10, K.white),
]);
