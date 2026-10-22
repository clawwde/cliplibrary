import { type DesignIconName, linear } from '@/design';
import {
  bars,
  checklist,
  circle,
  icon,
  type Nodes,
  pill,
  rect,
  template,
  text,
} from '../../../kit';
import {
  BODY,
  chip,
  copy,
  type DeckTheme,
  darkBg,
  device,
  HEAD,
  iconTile,
  kicker,
  LAGOON,
  lightBg,
  SH,
  SW,
  title,
} from './deck-kit';

const T = LAGOON;

const notificationScreen = (theme: DeckTheme, width: number, height: number): Nodes[] => [
  rect(0, 0, width, height, linear(180, '#ffffff', theme.surface), {
    cornerRadius: width * 0.12,
    name: 'Screen',
  }),
  text('Notifications', width * 0.08, height * 0.08, width * 0.84, {
    fontFamily: HEAD,
    fontSize: width * 0.08,
    fontWeight: 800,
    fill: theme.ink,
  }),
  [0, 1, 2, 3].map((index) => {
    const y = height * (0.17 + index * 0.17);
    return [
      rect(width * 0.06, y, width * 0.88, height * 0.14, '#ffffff', {
        cornerRadius: width * 0.06,
        stroke: theme.soft,
        strokeWidth: 2,
        name: 'Notification',
      }),
      circle(
        width * 0.17,
        y + height * 0.07,
        width * 0.06,
        index % 2 === 0 ? theme.glow : theme.warm,
      ),
      rect(width * 0.28, y + height * 0.04, width * 0.5, height * 0.02, theme.ink, {
        cornerRadius: 4,
        name: 'Line',
      }),
      rect(width * 0.28, y + height * 0.08, width * 0.58, height * 0.016, theme.soft, {
        cornerRadius: 4,
        name: 'Line',
      }),
    ];
  }),
];

const alerts: readonly { icon: DesignIconName; title: string; body: string }[] = [
  {
    icon: 'bell',
    title: 'Real-Time Alerts',
    body: 'Time-critical updates delivered in under 300ms.',
  },
  {
    icon: 'user-check',
    title: 'Personal Context',
    body: 'Messages tailored to each user and moment.',
  },
  { icon: 'zap', title: 'One-Tap Actions', body: 'Deep links straight into the right workflow.' },
];

export const alertsSlide = template(SW, SH, () => [
  darkBg(T),
  title('Smart Alerts\nFramework', 120, 110, 900, 92, '#ffffff'),
  copy(
    'Context-aware nudges that keep users informed, active and moving.',
    120,
    340,
    720,
    30,
    T.soft,
  ),
  alerts.map((alert, index) => {
    const y = 520 + index * 140;
    return [
      iconTile(alert.icon, 120, y, 84, T.glow, T.deep),
      text(alert.title, 230, y + 4, 640, {
        fontFamily: HEAD,
        fontSize: 32,
        fontWeight: 800,
        fill: '#ffffff',
      }),
      copy(alert.body, 230, y + 48, 640, 24, T.soft),
    ];
  }),
  device(T, notificationScreen, 1150, 180, 360, 16),
  chip(T, 1400, 100, 420, 'Milestone Reached', 'Your team closed 1,000 tasks', 'trophy'),
  chip(T, 1480, 560, 380, 'Weekly Digest', 'Fresh insights are ready', 'bell'),
]);

const rows = ['Strategy', 'Onboarding', 'Performance', 'Integration', 'Pricing'] as const;
const rivals: readonly (readonly boolean[])[] = [
  [true, true, true, true, true],
  [true, true, false, true, false],
  [false, true, false, false, true],
];

export const matrixSlide = template(SW, SH, () => [
  lightBg(T),
  title('Competitive Matrix', 0, 80, SW, 84, T.ink, 'center'),
  rect(720, 220, 300, 790, T.soft, { cornerRadius: 28, name: 'Highlight column' }),
  ['Nimbo', 'Rival A', 'Rival B'].map((label, index) => [
    rect(730 + index * 320, 230, 280, 80, index === 0 ? T.mid : '#ffffff', {
      cornerRadius: 20,
      name: 'Header',
    }),
    text(label, 730 + index * 320, 252, 280, {
      fontFamily: HEAD,
      fontSize: 30,
      fontWeight: 800,
      fill: index === 0 ? '#ffffff' : T.ink,
      align: 'center',
    }),
  ]),
  rows.map((row, rowIndex) => {
    const y = 360 + rowIndex * 130;
    return [
      text(row, 320, y + 28, 380, {
        fontFamily: BODY,
        fontSize: 32,
        fontWeight: 600,
        fill: T.ink,
      }),
      rect(320, y + 110, 1300, 2, 'rgba(6,36,51,0.12)', { name: 'Row rule' }),
      rivals.map((marks, column) => {
        const yes = marks[rowIndex] ?? false;
        return icon(yes ? 'check' : 'x', 845 + column * 320, y + 22, 50, yes ? T.mid : '#e11d48', {
          strokeWidth: 3,
        });
      }),
    ];
  }),
]);

const plans = [
  { name: 'Starter', price: '$0', items: ['1 workspace', 'Core analytics', 'Email support'] },
  { name: 'Growth', price: '$19', items: ['10 workspaces', 'Smart alerts', 'Priority chat'] },
  { name: 'Scale', price: '$49', items: ['Unlimited seats', 'Custom models', 'Success manager'] },
] as const;

export const pricingSlide = template(SW, SH, () => [
  darkBg(T),
  title('Pricing Options', 0, 80, SW, 84, '#ffffff', 'center'),
  copy(
    'Simple plans that grow with your product. Switch any time.',
    0,
    190,
    SW,
    30,
    T.soft,
    'center',
  ),
  plans.map((plan, index) => {
    const featured = index === 1;
    const x = 290 + index * 470;
    const y = featured ? 300 : 340;
    return [
      rect(x, y, 400, featured ? 700 : 640, featured ? '#ffffff' : T.surface, {
        cornerRadius: 36,
        stroke: featured ? T.glow : T.surface,
        strokeWidth: featured ? 6 : 0,
        name: 'Plan card',
      }),
      text(plan.name, x, y + 50, 400, {
        fontFamily: HEAD,
        fontSize: 40,
        fontWeight: 800,
        fill: T.ink,
        align: 'center',
      }),
      text(plan.price, x, y + 120, 400, {
        fontFamily: HEAD,
        fontSize: 96,
        fontWeight: 800,
        fill: T.mid,
        align: 'center',
      }),
      text('per seat / month', x, y + 240, 400, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 500,
        fill: T.muted,
        align: 'center',
      }),
      checklist(plan.items, x + 60, y + 330, 320, {
        color: T.ink,
        iconColor: T.mid,
        fontSize: 26,
        gap: 66,
        fontFamily: BODY,
      }),
    ];
  }),
  pill('Most popular', 845, 270, {
    fill: T.warm,
    color: T.ink,
    fontSize: 24,
    fontFamily: BODY,
    fontWeight: 700,
  }),
]);

export const revenueSlide = template(SW, SH, () => [
  lightBg(T),
  title('Revenue\nProjections', 120, 130, 800, 96, T.ink),
  copy(
    'Recurring revenue compounds as teams expand seats, add workspaces and upgrade to Scale.',
    120,
    380,
    720,
    30,
    T.muted,
  ),
  rect(120, 700, 220, 130, T.mid, { cornerRadius: 24, name: 'Multiplier' }),
  text('2.5x', 120, 728, 220, {
    fontFamily: HEAD,
    fontSize: 64,
    fontWeight: 800,
    fill: '#ffffff',
    align: 'center',
  }),
  text('$250k', 390, 712, 400, { fontFamily: HEAD, fontSize: 72, fontWeight: 800, fill: T.ink }),
  copy('Year-two ARR target', 392, 800, 400, 24, T.muted),
  rect(1000, 0, 920, SH, linear(160, T.deep, T.mid), { name: 'Chart panel' }),
  [0, 1, 2, 3].map((index) =>
    rect(1120, 260 + index * 160, 700, 2, 'rgba(255,255,255,0.12)', { name: 'Grid' }),
  ),
  bars(1120, 300, 700, 560, [32, 50, 74, 100], linear(180, T.glow, T.mid), 0.4),
  ['2026', '2027', '2028', '2029'].map((year, index) =>
    text(year, 1120 + index * 175, 890, 175, {
      fontFamily: BODY,
      fontSize: 24,
      fontWeight: 600,
      fill: T.soft,
      align: 'center',
    }),
  ),
  kicker('Annual recurring revenue', 1120, 150, T.glow),
]);

const syncScreen = (theme: DeckTheme, width: number, height: number): Nodes[] => [
  rect(0, 0, width, height, linear(180, theme.deep, theme.mid), {
    cornerRadius: width * 0.12,
    name: 'Screen',
  }),
  circle(width / 2, height * 0.42, width * 0.26, 'rgba(255,255,255,0.12)'),
  icon('cloud-upload', width * 0.32, height * 0.42 - width * 0.18, width * 0.36, '#ffffff', {
    strokeWidth: 1.8,
  }),
  rect(width * 0.18, height * 0.62, width * 0.64, height * 0.07, theme.glow, {
    cornerRadius: height * 0.035,
    name: 'Status',
  }),
  text('Sync active', width * 0.18, height * 0.637, width * 0.64, {
    fontFamily: BODY,
    fontSize: width * 0.065,
    fontWeight: 700,
    fill: theme.deep,
    align: 'center',
  }),
];

const steps = [
  { tag: '01 / Capture', title: 'Live Metrics', body: 'Device data collected instantly.' },
  { tag: '02 / Secure', title: 'Zero-Trust Vault', body: 'Encrypted at rest and in transit.' },
  { tag: '03 / Process', title: 'Edge Parsing', body: 'Global nodes respond in 50ms.' },
  { tag: '04 / Deliver', title: 'Every Device', body: 'Seamless, real-time multi-device state.' },
] as const;

export const syncSlide = template(SW, SH, () => [
  lightBg(T),
  title('4-Step Sync Protocol', 0, 80, SW, 84, T.ink, 'center'),
  device(T, syncScreen, 810, 260, 300),
  steps.map((step, index) => {
    const right = index >= 2;
    const x = right ? 1220 : 200;
    const y = 360 + (index % 2) * 300;
    const align = right ? 'left' : 'right';
    return [
      text(step.tag.toUpperCase(), x, y, 500, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 700,
        fill: T.mid,
        letterSpacing: 2,
        align,
      }),
      text(step.title, x, y + 36, 500, {
        fontFamily: HEAD,
        fontSize: 42,
        fontWeight: 800,
        fill: T.ink,
        align,
      }),
      text(step.body, x, y + 96, 500, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 400,
        fill: T.muted,
        align,
      }),
    ];
  }),
]);
