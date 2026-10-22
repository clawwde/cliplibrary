import { type DesignIconName, linear } from '@/design';
import { avatar, circle, icon, photo, rect, template, text } from '../../../kit';
import {
  BODY,
  chartScreen,
  chip,
  copy,
  type DeckTheme,
  darkBg,
  dashboardScreen,
  device,
  HEAD,
  iconTile,
  kicker,
  LAGOON,
  lightBg,
  profileScreen,
  SH,
  SW,
  statCard,
  title,
  wordmark,
} from './deck-kit';

const T = LAGOON;

export const coverSlide = template(SW, SH, () => [
  lightBg(T),
  rect(70, 70, 1780, 940, linear(125, T.deep, T.mid), { cornerRadius: 48, name: 'Panel' }),
  wordmark(150, 150, 64, '#ffffff', T.glow),
  title('Mobile Product\nPitch Deck', 150, 320, 1000, 112, '#ffffff'),
  copy(
    'A next-generation engagement platform built for speed, retention and happier customers.',
    150,
    600,
    760,
    32,
    T.soft,
  ),
  device(T, chartScreen, 1110, 130, 330, -8),
  device(T, dashboardScreen, 1390, 210, 300, 7),
  rect(1690, 850, 110, 110, '#ffffff', { cornerRadius: 26, name: 'Arrow button' }),
  icon('arrow-up-right', 1715, 875, 60, T.ink, { strokeWidth: 2.6 }),
]);

const progress = (label: string, value: number, y: number) => [
  rect(120, y, 780, 60, 'rgba(255,255,255,0.12)', { cornerRadius: 30, name: 'Track' }),
  rect(120, y, 780 * value, 60, linear(90, T.mid, T.glow), { cornerRadius: 30, name: 'Fill' }),
  text(label, 150, y + 15, 500, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 600,
    fill: '#ffffff',
  }),
  circle(120 + 780 * value, y + 30, 40, '#ffffff'),
  text(`${Math.round(value * 100)}%`, 80 + 780 * value, y + 17, 80, {
    fontFamily: HEAD,
    fontSize: 24,
    fontWeight: 800,
    fill: T.ink,
    align: 'center',
  }),
];

export const spotlightSlide = template(SW, SH, () => [
  darkBg(T),
  photo('man-portrait-3', 1060, 0, 860, SH),
  rect(1060, 0, 360, SH, linear(90, T.deep, 'rgba(4,38,58,0)'), { name: 'Fade' }),
  kicker('Customer spotlight', 120, 130, T.glow),
  title('Head of Product', 120, 175, 900, 96, '#ffffff'),
  copy(
    '"Nimbo reshaped our onboarding in six weeks. Setup friction dropped and daily active use climbed faster than any launch we have run."',
    120,
    320,
    840,
    30,
    T.soft,
  ),
  progress('Onboarding completion', 0.84, 560),
  progress('Feature adoption', 0.68, 660),
  progress('Weekly productivity', 0.91, 760),
  chip(T, 1240, 780, 480, '+35% Sprint Velocity', 'Ahead of Q3 targets', 'trending-up'),
]);

const pillars: readonly { icon: DesignIconName; title: string; body: string }[] = [
  {
    icon: 'shield-check',
    title: 'Bank-Grade Security',
    body: 'End-to-end encryption with audit-ready logs.',
  },
  { icon: 'gauge', title: 'Sub-50ms Sync', body: 'Real-time data on every device, worldwide.' },
  {
    icon: 'brain',
    title: 'Predictive Engine',
    body: 'Models that learn what each user needs next.',
  },
];

export const pillarsSlide = template(SW, SH, () => [
  lightBg(T),
  title('Built on Three Pillars', 0, 100, SW, 88, T.ink, 'center'),
  copy(
    'How our core platform removes friction, drives daily engagement and scales without manual work.',
    360,
    220,
    1200,
    30,
    T.muted,
    'center',
  ),
  pillars.map((pillar, index) => {
    const x = 300 + index * 460;
    return [
      rect(x, 420, 360, 660, linear(180, T.deep, T.mid), { cornerRadius: 56, name: 'Phone top' }),
      rect(x + 135, 440, 90, 26, '#000000', { cornerRadius: 13, name: 'Island' }),
      iconTile(pillar.icon, x + 135, 540, 90, 'rgba(255,255,255,0.14)'),
      text(pillar.title, x + 10, 670, 340, {
        fontFamily: HEAD,
        fontSize: 30,
        fontWeight: 800,
        fill: '#ffffff',
        align: 'center',
      }),
      copy(pillar.body, x + 40, 725, 280, 22, T.soft, 'center'),
    ];
  }),
]);

export const serviceSlide = (theme: DeckTheme) =>
  template(SW, SH, () => [
    darkBg(theme),
    device(theme, dashboardScreen, 150, 110, 330),
    device(theme, profileScreen, 420, 300, 330),
    title('Service That\nFeels Personal', 900, 170, 900, 100, '#ffffff'),
    copy(
      'Every user gets a guided, human experience: instant answers, proactive alerts and support that knows their history before they ask.',
      900,
      430,
      860,
      30,
      theme.soft,
    ),
    rect(900, 760, 700, 140, 'rgba(0,0,0,0.25)', { cornerRadius: 70, name: 'Members pill' }),
    avatar('woman-portrait-5', 980, 830, 46, theme.glow),
    avatar('man-portrait-1', 1060, 830, 46, theme.glow),
    avatar('woman-portrait-2', 1140, 830, 46, theme.glow),
    circle(1220, 830, 46, theme.glow),
    icon('plus', 1196, 806, 48, theme.deep, { strokeWidth: 3 }),
    text('Join 12,000+\nhappy members', 1300, 788, 300, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 800,
      fill: '#ffffff',
      lineHeight: 1.15,
    }),
  ]);

export const impactSlide = template(SW, SH, () => [
  lightBg(T),
  title('Scalable\nImpact', 120, 110, 700, 100, T.ink),
  copy(
    'Teams automate routine work, personalise every flow and see results within the first month of rollout.',
    120,
    360,
    640,
    30,
    T.muted,
  ),
  chip(T, 120, 760, 520, '+35% Sprint Velocity', 'Ahead of Q3 targets', 'trending-up'),
  device(T, chartScreen, 1100, 90, 420, 12),
  statCard(T, 830, 240, '56K', 'Hours saved'),
  statCard(T, 900, 720, '3.2x', 'Efficiency gain', true),
  statCard(T, 1580, 660, '94%', 'Task accuracy', true),
]);
