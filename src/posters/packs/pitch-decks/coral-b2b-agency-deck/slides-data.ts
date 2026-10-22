import { circle, icon, pill, poly, rect, template } from '../../../kit';
import { donut } from './deck-listing';
import { backdrop, body, head, marker, NV, SH, SW } from './theme';

const BOLT = [
  [1500, 80],
  [1120, 610],
  [1390, 610],
  [1250, 1000],
  [1780, 420],
  [1500, 420],
  [1700, 80],
] as const;

export const poweringSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  poly(
    BOLT.map(([x, y]) => [x + 40, y - 30] as const),
    NV.plumSoft,
    { name: 'Bolt shadow' },
  ),
  poly(BOLT, NV.coral, { name: 'Bolt' }),
  head('Fuel your\nnext quarter.', 140, 180, 900, 120, NV.white, { fontWeight: 800 }),
  body('A forecast built for sustainable\nrevenue at scale.', 140, 480, 800, 36, NV.peach),
  rect(140, 700, 360, 220, NV.white, { name: 'Stat card', cornerRadius: 28 }),
  head('62.4K', 180, 735, 300, 84, NV.ink),
  body('Leads scored', 180, 845, 300, 28, NV.grey),
  rect(540, 700, 360, 220, NV.coral, { name: 'Stat card', cornerRadius: 28 }),
  head('18.9K', 580, 735, 300, 84, NV.white),
  body('Hours saved', 580, 845, 300, 28, NV.white),
]);

const CHANNELS = [
  { label: 'Paid search (54.2%)', value: 54.2, color: NV.plum },
  { label: 'Social (28.6%)', value: 28.6, color: NV.coral },
  { label: 'Email (17.2%)', value: 17.2, color: NV.peach },
];

export const campaignSlide = template(SW, SH, () => [
  backdrop(NV.white),
  marker(140, 140),
  head('Campaign\nresults', 140, 180, 800, 120, NV.ink, { fontWeight: 800 }),
  body('How each channel turned spend\ninto measurable growth.', 140, 460, 760, 36, NV.grey),
  CHANNELS.map((channel, index) => [
    rect(140, 660 + index * 90, 90, 44, channel.color, { name: 'Legend', cornerRadius: 10 }),
    body(channel.label, 260, 660 + index * 90, 600, 32, NV.ink, { fontWeight: 500 }),
  ]),
  donut(
    1380,
    540,
    360,
    200,
    CHANNELS.map((channel) => [channel.value, channel.color] as const),
  ),
  head('3.2x', 1180, 470, 400, 100, NV.ink, { align: 'center', fontWeight: 800 }),
  body('Return on spend', 1180, 580, 400, 30, NV.grey, { align: 'center' }),
]);

const insight = (label: string, copy: string, y: number) => [
  rect(140, y, 880, 220, NV.white, { name: 'Insight card', cornerRadius: 28 }),
  pill(label, 180, y + 30, { fill: NV.coral, color: NV.plum, fontSize: 26, fontFamily: 'DM Sans' }),
  body(copy, 180, y + 110, 800, 30, NV.ink),
];

export const impactSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  head('Real-world\nimpact', 140, 140, 900, 120, NV.white, { fontWeight: 800 }),
  insight('Challenge', 'Manual reporting slowed every launch and blurred attribution.', 470),
  insight('Result', 'Launch cycles fell from 21 days to 6 and MQL to SQL rates rose 38%.', 730),
  rect(1140, 140, 640, 810, NV.coral, { name: 'Quote card', cornerRadius: 40 }),
  pill('Priya N.  /  VP Marketing', 1190, 200, {
    fill: NV.plum,
    color: NV.white,
    fontSize: 28,
    fontFamily: 'DM Sans',
  }),
  icon('quote', 1190, 340, 90, NV.plum, { strokeWidth: 2.4 }),
  head(
    'Lost 12 hours\na week to manual\nreporting before\nNorthvale.',
    1190,
    480,
    560,
    56,
    NV.plum,
  ),
]);

const CRITERIA = ['Strategy', 'Onboarding', 'Reporting', 'Integrations', 'Pricing'];
const RIVALS = [
  { name: 'Northvale', marks: [true, true, true, true, true] },
  { name: 'Agency B', marks: [true, true, false, true, false] },
  { name: 'Agency C', marks: [false, true, false, false, true] },
];

export const matrixSlide = template(SW, SH, () => [
  backdrop(NV.cream),
  marker(140, 120),
  head('Competitive matrix', 140, 160, 1200, 110, NV.ink, { fontWeight: 800 }),
  rect(680, 330, 360, 670, NV.coral, { name: 'Highlight column', cornerRadius: 24 }),
  RIVALS.map((rival, column) => [
    head(rival.name, 680 + column * 380, 360, 360, 38, column === 0 ? NV.white : NV.ink, {
      align: 'center',
    }),
    rival.marks.map((mark, row) =>
      icon(
        mark ? 'check' : 'x',
        835 + column * 380,
        455 + row * 110,
        50,
        column === 0 ? NV.white : mark ? NV.ink : NV.grey,
        {
          strokeWidth: 3,
        },
      ),
    ),
  ]),
  CRITERIA.map((label, row) => [
    rect(140, 430 + row * 110, 1680, 2, NV.line, { name: 'Row rule' }),
    body(label, 140, 460 + row * 110, 500, 34, NV.ink, { fontWeight: 600 }),
  ]),
]);

const STEPS = [
  { icon: 'search', title: 'Onboarding & audit', text: 'We map your funnel, data and team.' },
  { icon: 'lightbulb', title: 'Strategy sprint', text: 'Audience, offers and channels locked in.' },
  { icon: 'rocket', title: 'Campaign launch', text: 'Roadmap, assets and tracking go live.' },
] as const;

export const processSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  head('How our\npartnership\nworks', 140, 160, 760, 110, NV.white, { fontWeight: 800 }),
  body(
    'A step-by-step roadmap that aligns teams, speeds up execution and proves ROI from week one.',
    140,
    600,
    720,
    34,
    NV.peach,
  ),
  rect(1040, 220, 6, 580, 'rgba(255,255,255,0.25)', { name: 'Timeline' }),
  STEPS.map((step, index) => {
    const y = 170 + index * 290;
    return [
      circle(1043, y + 50, 52, NV.coral),
      icon(step.icon, 1017, y + 24, 52, NV.plum, { strokeWidth: 2.2 }),
      head(step.title, 1140, y + 6, 660, 48, NV.white),
      body(step.text, 1140, y + 72, 660, 32, 'rgba(255,255,255,0.72)'),
    ];
  }),
]);

const PHASES = [
  {
    title: 'Scope & goals',
    icon: 'target',
    fill: NV.plum,
    ink: NV.white,
    qa: [
      ['What will we own?', 'Positioning, demand gen and reporting.'],
      ['How do we measure it?', 'Pipeline, CAC and payback, monthly.'],
    ],
  },
  {
    title: 'Speed & delivery',
    icon: 'timer',
    fill: NV.coral,
    ink: NV.plum,
    qa: [
      ['How fast do we start?', 'Kick-off within five working days.'],
      ['What about capacity?', 'A dedicated pod of four specialists.'],
    ],
  },
  {
    title: 'Commercials',
    icon: 'wallet',
    fill: NV.peach,
    ink: NV.plum,
    qa: [
      ['Is pricing flexible?', 'Monthly retainers, no lock-in.'],
      ['How is ROI reported?', 'A live dashboard shared with you.'],
    ],
  },
] as const;

export const onboardingSlide = template(SW, SH, () => [
  backdrop(NV.cream),
  head('Client onboarding\n& delivery model', 140, 110, 1300, 100, NV.ink, { fontWeight: 800 }),
  PHASES.map((phase, index) => {
    const x = 140 + index * 570;
    return [
      rect(x, 400, 530, 580, phase.fill, { name: 'Phase card', cornerRadius: 32 }),
      icon(phase.icon, x + 40, 440, 56, phase.ink, { strokeWidth: 2.2 }),
      head(phase.title, x + 120, 448, 380, 40, phase.ink),
      rect(x + 40, 540, 450, 2, phase.ink, { name: 'Rule', opacity: 0.3 }),
      phase.qa.map(([question, answer], row) => [
        body(question, x + 40, 580 + row * 190, 450, 30, phase.ink, { fontWeight: 700 }),
        body(answer, x + 40, 630 + row * 190, 450, 28, phase.ink, { opacity: 0.85 }),
      ]),
    ];
  }),
]);
