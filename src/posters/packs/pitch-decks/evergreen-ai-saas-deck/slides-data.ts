import { linear } from '@/design';
import { circle, icon, rect, template } from '../../../kit';
import { body, darkBg, EV, glass, head, lightBg, SH, SW } from './theme';

const NODES = [
  { icon: 'workflow', label: 'Data\nPipelines', cx: 560 },
  { icon: 'cpu', label: 'Model\nOperations', cx: 960 },
  { icon: 'handshake', label: 'Partner\nAPIs', cx: 1360 },
] as const;

const wire = (x: number, y: number, width: number, height: number) =>
  rect(x, y, width, height, 'rgba(255,255,255,0.4)', { name: 'Connector' });

export const ecosystemSlide = template(SW, SH, () => [
  darkBg(),
  head('Integrated Platform Ecosystem', 0, 130, SW, 66, EV.white, { align: 'center' }),
  body(
    'A connected blueprint that turns scattered tools into one dependable system.',
    0,
    230,
    SW,
    30,
    EV.soft,
    {
      align: 'center',
    },
  ),
  wire(958, 330, 4, 90),
  wire(560, 418, 804, 4),
  NODES.map((node) => [
    wire(node.cx - 2, 420, 4, 80),
    glass(node.cx - 140, 500, 280, 300, 26),
    rect(node.cx - 50, 540, 100, 100, 'rgba(255,255,255,0.14)', {
      name: 'Icon chip',
      cornerRadius: 24,
    }),
    icon(node.icon, node.cx - 30, 560, 60, EV.white, { strokeWidth: 2 }),
    head(node.label, node.cx - 130, 680, 260, 34, EV.white, { align: 'center' }),
  ]),
  body('Connected by default, secured end to end.', 0, 880, SW, 26, EV.mint, { align: 'center' }),
]);

export const legacySlide = template(SW, SH, () => [
  lightBg(),
  head('$120B+', 140, 380, 900, 200, EV.ink, { fontWeight: 800 }),
  body('Lost every year to unplanned downtime', 150, 600, 760, 32, EV.muted),
  rect(150, 680, 120, 8, EV.emerald, { name: 'Rule', cornerRadius: 4 }),
  head('Legacy Systems', 1100, 170, 700, 60, EV.ink),
  head('Compounding Cost', 1100, 240, 700, 60, EV.emerald, { fontWeight: 500 }),
  body(
    'Old maintenance models stay reactive, so teams firefight instead of building. By the time a critical machine fails, the damage has already spread across schedules, budgets and customer trust.',
    1100,
    370,
    680,
    26,
    EV.muted,
  ),
  head('Fernbrook', 1100, 650, 680, 30, EV.ink),
  body(
    'flips the model from fixing to predicting, so every alert arrives before the outage does.',
    1100,
    695,
    680,
    26,
    EV.muted,
  ),
]);

const AXIS = [450, 400, 350, 300, 250, 200, 150, 100, 50, 0];
const BARS = [
  { label: 'Pilot', value: 410 },
  { label: 'Launch', value: 290 },
  { label: 'Scale', value: 160 },
  { label: 'Expand', value: 340 },
];
const BASE = 900;
const UNIT = 740 / 450;

export const accelerationSlide = template(SW, SH, () => [
  darkBg(),
  head('Product', 140, 150, 700, 72, EV.white),
  head('Acceleration', 140, 232, 700, 72, EV.mint, { fontWeight: 500 }),
  body(
    'Automation is no longer a nice extra. Offloading routine work lets teams move faster, stay accurate and scale without adding headcount.',
    140,
    380,
    640,
    30,
    EV.soft,
  ),
  AXIS.map((value) =>
    body(String(value), 960, BASE - value * UNIT - 16, 100, 26, EV.soft, { align: 'right' }),
  ),
  rect(1090, 160, 2, 740, 'rgba(255,255,255,0.25)', { name: 'Axis' }),
  BARS.map((bar, index) => {
    const x = 1140 + index * 170;
    const height = bar.value * UNIT;
    return [
      rect(x, BASE - height, 130, height, linear(180, EV.mint, 'rgba(47,158,124,0.12)'), {
        name: 'Bar',
        cornerRadius: 10,
      }),
      body(bar.label, x - 10, 925, 150, 24, EV.soft, { align: 'center' }),
    ];
  }),
]);

const QUADS = [
  { title: 'Orchestration', text: 'Group, sort and route work automatically.', x: 180, y: 190 },
  { title: 'Signals', text: 'Spot trends and risks before they land.', x: 1040, y: 190 },
  { title: 'Autopilot', text: 'Hand repeat tasks to agents and refocus.', x: 180, y: 640 },
  { title: 'Next Actions', text: 'Tailored suggestions for every team.', x: 1040, y: 640 },
];

export const quadrantSlide = template(SW, SH, () => [
  rect(0, 0, SW, SH, linear(135, EV.emerald, EV.forestMid), { name: 'Background' }),
  rect(958, 120, 4, 840, 'rgba(255,255,255,0.35)', { name: 'Divider' }),
  rect(140, 538, 1640, 4, 'rgba(255,255,255,0.35)', { name: 'Divider' }),
  QUADS.map((quad) => [
    icon('arrow-up-right', quad.x, quad.y, 64, EV.white, { strokeWidth: 2.4 }),
    head(quad.title, quad.x + 100, quad.y, 620, 54, EV.white),
    body(quad.text, quad.x + 100, quad.y + 80, 600, 30, 'rgba(255,255,255,0.86)'),
  ]),
]);

const QUARTERS = [
  { q: 'Q1', title: 'Discovery', text: 'Baseline models and\naudit current tools.' },
  { q: 'Q2', title: 'Build', text: 'Pilot automations with\ntwo core teams.' },
  { q: 'Q3', title: 'Expansion', text: 'Roll out across regions\nand partners.' },
  { q: 'Q4', title: 'Integration', text: 'Unify analytics into one\nlive command center.' },
];

export const quarterlySlide = template(SW, SH, () => [
  darkBg(),
  rect(960, 0, 420, SH, linear(180, EV.mint, EV.emerald), { name: 'Highlight column' }),
  head('Quarterly', 140, 140, 700, 72, EV.white),
  head('Roadmap', 140, 222, 700, 72, EV.mint, { fontWeight: 500 }),
  head('You are here', 990, 150, 360, 46, EV.forest),
  body('Scaling the rollout\nacross every region.', 990, 215, 360, 26, EV.forest),
  rect(140, 558, 1640, 4, 'rgba(255,255,255,0.45)', { name: 'Timeline' }),
  QUARTERS.map((quarter, index) => {
    const here = index === 2;
    const x = 140 + index * 420 + (here ? 20 : 0);
    const ink = here ? EV.forest : EV.white;
    return [
      circle(x + 30, 560, 18, ink),
      head(quarter.q, x, 620, 340, 80, ink, { fontWeight: 800 }),
      head(quarter.title, x, 720, 340, 34, here ? EV.forest : EV.mint),
      body(quarter.text, x, 775, 340, 24, here ? EV.forest : EV.soft),
    ];
  }),
]);

const MODULES = [
  { title: 'Semantic Intake', text: 'Reads requests in plain language.', dark: true },
  { title: 'Predictive Logic', text: 'Forecasts load before it peaks.', dark: false },
  { title: 'Edge Intelligence', text: 'Runs models close to the data.', dark: false },
  { title: 'Native API Mesh', text: 'Links every tool without glue code.', dark: false },
  { title: 'Prescriptive Ops', text: 'Suggests the best next step.', dark: true },
  { title: 'Closed-Loop Tuning', text: 'Learns from every outcome.', dark: false },
];

export const architectureSlide = template(SW, SH, () => [
  lightBg(),
  head('Intelligent Ecosystem Architecture', 0, 130, SW, 64, EV.ink, { align: 'center' }),
  body(
    'Six building blocks that keep intelligence and execution in step.',
    0,
    230,
    SW,
    30,
    EV.muted,
    {
      align: 'center',
    },
  ),
  MODULES.map((module, index) => {
    const x = 200 + (index % 3) * 520;
    const y = 390 + Math.floor(index / 3) * 290;
    return [
      rect(
        x,
        y,
        480,
        250,
        module.dark ? linear(135, EV.emerald, EV.forestMid) : linear(160, '#e3f6ef', '#bfe9da'),
        {
          name: 'Module card',
          cornerRadius: 22,
        },
      ),
      head(module.title, x + 36, y + 50, 410, 38, module.dark ? EV.white : EV.forest),
      body(module.text, x + 36, y + 120, 410, 26, module.dark ? EV.soft : EV.ink),
    ];
  }),
]);
