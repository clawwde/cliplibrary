import { linear, radial } from '@/design';
import { circle, ellipse, icon, pill, rect, template } from '../../../kit';
import { arcBand } from '../coral-b2b-agency-deck/deck-listing';
import { backdrop, body, glow, HX, head, SH, SW } from './theme';

const WIRE = { stroke: 'rgba(25,227,196,0.55)', strokeWidth: 2 };
const CLEAR = 'rgba(0,0,0,0)';

const globe = (cx: number, cy: number, radius: number) => [
  circle(cx, cy, radius, radial('rgba(25,227,196,0.22)', 'rgba(11,143,134,0.05)'), {
    stroke: HX.teal,
    strokeWidth: 3,
    name: 'Globe',
  }),
  [0.82, 0.56, 0.26].map((ratio) =>
    ellipse(cx - radius * ratio, cy - radius, radius * ratio * 2, radius * 2, CLEAR, {
      ...WIRE,
      name: 'Meridian',
    }),
  ),
  [-0.7, -0.36, 0, 0.36, 0.7].map((offset) => {
    const half = radius * Math.sqrt(1 - offset * offset);
    return ellipse(cx - half, cy + radius * offset - half * 0.12, half * 2, half * 0.24, CLEAR, {
      ...WIRE,
      name: 'Parallel',
    });
  }),
  [
    [-0.4, -0.3],
    [0.3, -0.5],
    [0.5, 0.2],
    [-0.2, 0.45],
  ].map(([dx = 0, dy = 0]) => circle(cx + dx * radius, cy + dy * radius, 12, HX.teal)),
];

const MARKET = [
  { label: 'Active users', value: '84M' },
  { label: 'Teams', value: '312K' },
  { label: 'Partners', value: '146K' },
  { label: 'Regions', value: '42' },
];

export const worldwideSlide = template(SW, SH, () => [
  backdrop(),
  glow(1420, 540, 500, 0.3),
  globe(1420, 560, 380),
  head('Worldwide Market', 140, 160, 900, 84, HX.white),
  body('Built for scale and trusted by teams on every continent.', 140, 280, 820, 30, HX.muted),
  MARKET.map((item, index) => {
    const x = 140 + (index % 2) * 380;
    const y = 500 + Math.floor(index / 2) * 230;
    return [
      body(item.label, x, y, 340, 28, HX.muted),
      head(item.value, x, y + 50, 340, 84, HX.white),
    ];
  }),
]);

export const growthSlide = template(SW, SH, () => [
  backdrop(),
  glow(960, 640, 430, 0.35),
  Array.from({ length: 16 }, (_, index) =>
    rect(
      300 + index * 84,
      120,
      48,
      300,
      index < 9 ? linear(180, HX.teal, HX.deep) : linear(180, '#5a666c', '#2a3236'),
      { name: 'Bar', cornerRadius: 24, opacity: index < 9 ? 1 - index * 0.06 : 0.7 },
    ),
  ),
  head('+318%', 0, 500, SW, 200, HX.white, { align: 'center', fontWeight: 800 }),
  body(
    'lift in trial-to-paid conversion within\nthe first quarter after rollout.',
    0,
    760,
    SW,
    38,
    HX.muted,
    { align: 'center' },
  ),
]);

const GAUGE = { cx: 1440, cy: 540 };

export const accelerationSlide = template(SW, SH, () => [
  backdrop(),
  glow(1440, 540, 470, 0.35),
  head('Product\nAcceleration', 140, 200, 800, 90, HX.white),
  body(
    'Helixa removes onboarding friction and automates the busywork, so new customers reach real value in days. Teams adopt faster and expand sooner.',
    140,
    440,
    720,
    30,
    HX.muted,
  ),
  circle(GAUGE.cx, GAUGE.cy, 320, HX.panel),
  arcBand(GAUGE.cx, GAUGE.cy, 290, 236, -130, 130, 'rgba(255,255,255,0.1)'),
  arcBand(GAUGE.cx, GAUGE.cy, 290, 236, -130, 60, linear(90, HX.deep, HX.teal)),
  circle(
    GAUGE.cx + 263 * Math.sin(Math.PI / 3),
    GAUGE.cy - 263 * Math.cos(Math.PI / 3),
    22,
    HX.white,
  ),
  circle(GAUGE.cx, GAUGE.cy, 190, '#0b1013'),
  head('7,200', GAUGE.cx - 190, GAUGE.cy - 64, 380, 84, HX.white, { align: 'center' }),
  body('Ops per second', GAUGE.cx - 190, GAUGE.cy + 40, 380, 28, HX.muted, { align: 'center' }),
]);

const SERVICES = ['Usage Billing', 'Team Workspaces', 'Enterprise SSO', 'Data Residency'];

export const servicesSlide = template(SW, SH, () => [
  backdrop(),
  glow(380, 700, 370, 0.4),
  glow(1500, 380, 370, 0.25),
  SERVICES.map((line, index) =>
    head(line, 0, 200 + index * 120, SW, 96, index % 2 === 0 ? HX.white : HX.teal, {
      align: 'center',
    }),
  ),
  body(
    'From the first invoice to global compliance, one platform keeps every workflow covered.',
    410,
    740,
    1100,
    30,
    HX.muted,
    { align: 'center' },
  ),
]);

const PROOF = [
  { value: '04min', label: 'Average time to launch\na new workflow' },
  { value: '170%', label: 'More output per team\nin the first month' },
  { value: '250M+', label: 'Tasks automated across\nall customers' },
];

export const standardSlide = template(SW, SH, () => [
  backdrop(),
  glow(960, 380, 370, 0.4),
  head('The new standard\nfor operations', 0, 160, SW, 90, HX.white, { align: 'center' }),
  body(
    'Built to carry the heavy lifting so your people can focus on what matters.',
    410,
    400,
    1100,
    30,
    HX.muted,
    { align: 'center' },
  ),
  PROOF.map((item, index) => [
    head(item.value, 370 + index * 400, 590, 380, 96, index === 0 ? HX.teal : HX.white, {
      align: 'center',
      fontWeight: 800,
    }),
    body(item.label, 370 + index * 400, 730, 380, 28, HX.muted, { align: 'center' }),
  ]),
]);

const QUARTERS = [
  { label: 'Q1', text: 'Pilot with five\ndesign partners' },
  { label: 'Q2', text: 'Self-serve launch\nand billing' },
  { label: 'Q3', text: 'Enterprise tier\nand SSO' },
  { label: 'Q4', text: 'Expansion into\nthree new regions' },
];

export const timelineSlide = template(SW, SH, () => [
  backdrop(),
  glow(960, 380, 370, 0.4),
  body('TIMELINE', 0, 140, SW, 34, HX.muted, { align: 'center', letterSpacing: 12 }),
  head('2027', 0, 200, SW, 300, linear(180, HX.white, 'rgba(255,255,255,0.12)'), {
    align: 'center',
    fontWeight: 800,
  }),
  rect(140, 640, 1640, 3, HX.rule, { name: 'Timeline' }),
  QUARTERS.map((quarter, index) => {
    const cx = 420 + index * 360;
    const hot = index === 2;
    return [
      circle(cx, 641, hot ? 20 : 15, hot ? HX.teal : HX.white),
      head(quarter.label, cx - 150, 690, 300, 44, hot ? HX.teal : HX.white, { align: 'center' }),
      body(quarter.text, cx - 150, 760, 300, 24, HX.muted, { align: 'center' }),
    ];
  }),
]);

const TIERS = [
  {
    name: 'Starter',
    seat: 176,
    price: '$0',
    text: 'Core automations for small teams.',
    items: ['3 workflows', 'Email support', 'Up to 5 users'],
  },
  {
    name: 'Pro',
    seat: 204,
    price: '$12',
    text: 'Advanced models and faster processing.',
    items: ['Unlimited workflows', 'Priority support', 'Up to 50 users'],
  },
  {
    name: 'Business',
    seat: 224,
    price: '$29',
    text: 'Scale with dedicated custom tuning.',
    items: ['Custom models', 'SSO and audit logs', 'Unlimited users'],
  },
];

export const pricingSlide = template(SW, SH, () => [
  backdrop(),
  glow(420, 380, 370, 0.35),
  head('Annual Pricing Plan', 140, 100, 1200, 80, HX.white),
  body(
    'Transparent pricing that grows with your team. No hidden fees.',
    140,
    210,
    1100,
    30,
    HX.muted,
  ),
  TIERS.map((tier, index) => {
    const x = 140 + index * 560;
    const lead = index === 1;
    const ink = lead ? HX.night : HX.white;
    const soft = lead ? '#4b5559' : HX.muted;
    return [
      rect(x, 320, 520, 690, lead ? HX.white : HX.panel, {
        name: 'Tier card',
        cornerRadius: 28,
        stroke: HX.rule,
        strokeWidth: lead ? 0 : 2,
      }),
      body(tier.name, x + 40, 364, 260, 28, soft, { fontWeight: 600 }),
      head(tier.price, x + 40, 410, 200, 84, ink),
      body('/ seat', x + tier.seat, 452, 160, 26, soft),
      lead
        ? pill('Most popular', x + 300, 356, {
            fill: HX.night,
            color: HX.teal,
            fontSize: 20,
            fontFamily: 'Inter',
          })
        : [],
      body(tier.text, x + 40, 530, 440, 28, soft),
      rect(x + 40, 620, 440, 68, linear(90, HX.deep, HX.teal), {
        name: 'Button',
        cornerRadius: 34,
      }),
      body('Start today', x + 40, 638, 440, 26, HX.night, { align: 'center', fontWeight: 700 }),
      tier.items.map((item, row) => [
        icon('check', x + 40, 740 + row * 76, 34, HX.teal, { strokeWidth: 3 }),
        body(item, x + 92, 740 + row * 76, 400, 28, ink),
      ]),
    ];
  }),
]);
