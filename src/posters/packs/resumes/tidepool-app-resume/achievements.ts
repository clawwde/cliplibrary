import { type DesignIconName, linear } from '@/design';
import { ellipse, icon, line, path, rect, template, text } from '../../../kit';
import { BODY, identity, kicker, LETTER, statusBar, TIDE, TILE_FILLS } from './resume';

const wins: readonly { label: string; icon: DesignIconName }[] = [
  { label: 'Cut onboarding\ntime by 35%', icon: 'trending-up' },
  { label: 'Shipped 14 app\nreleases in a year', icon: 'rocket' },
  { label: 'Raised task\nsuccess to 92%', icon: 'target' },
  { label: 'Built a 120-part\ndesign system', icon: 'layers' },
  { label: 'Interviewed over\n60 customers', icon: 'users' },
  { label: 'Grew trial\nsign-ups by 28%', icon: 'chart-line' },
];

const landscape = (x: number, y: number, width: number, height: number) => [
  rect(x, y, width, height, linear(180, '#bfe9f2', '#eaf8f4'), { name: 'Sky' }),
  ellipse(x + width * 0.08, y + height * 0.16, width * 0.18, height * 0.14, '#ffffff', {
    name: 'Cloud',
  }),
  ellipse(x + width * 0.42, y + height * 0.1, width * 0.22, height * 0.18, '#ffffff', {
    name: 'Cloud',
  }),
  ellipse(x + width * 0.74, y + height * 0.2, width * 0.12, width * 0.12, '#ffb199', {
    name: 'Sun',
  }),
  path(
    'M0 70 Q 90 20 180 58 T 360 46 L360 120 L0 120 Z',
    x,
    y + height * 0.5,
    width,
    height * 0.5,
    '#7fd1bf',
    { width: 360, height: 120 },
  ),
  path(
    'M0 90 Q 120 50 240 84 T 360 80 L360 120 L0 120 Z',
    x,
    y + height * 0.5,
    width,
    height * 0.5,
    TIDE.teal,
    { width: 360, height: 120 },
  ),
];

const projects = [
  {
    title: 'Clinic Booking App',
    body: 'Redesigned booking for 40 clinics, halving drop-off at the payment step.',
  },
  {
    title: 'Habit Tracker',
    body: 'Built a playful streak system and widgets for a 2M-user wellness app.',
  },
  {
    title: 'Banking Onboarding',
    body: 'Mapped the sign-up journey and shipped a five-step identity flow.',
  },
] as const;

const certificates = [
  'Advanced Interaction\nDesign Certificate',
  'Accessibility\nSpecialist (Level 2)',
  'Mobile Design\nSystems Course',
  'Certified Research\nPractitioner',
] as const;

export const resumeWins = template(LETTER.width, LETTER.height, () => [
  rect(0, 0, LETTER.width, LETTER.height, TIDE.paper, { name: 'Background' }),
  statusBar(LETTER.width, 'Resume'),
  identity(60, 110),
  rect(480, 110, 735, 760, TIDE.card, { cornerRadius: 28, name: 'Achievements card' }),
  kicker('Impact', 'Achievements', 515, 140),
  wins.map((win, index) => {
    const x = 515 + (index % 2) * 345;
    const y = 250 + Math.floor(index / 2) * 200;
    return [
      rect(x, y, 320, 180, TILE_FILLS[index] ?? TIDE.teal, {
        cornerRadius: 22,
        name: 'Achievement tile',
      }),
      icon(win.icon, x + 260, y + 20, 38, '#ffffff', { strokeWidth: 2.4 }),
      text(win.label, x + 26, y + 92, 280, {
        fontFamily: BODY,
        fontSize: 25,
        fontWeight: 700,
        fill: '#ffffff',
        lineHeight: 1.25,
      }),
    ];
  }),
  kicker('Portfolio', 'Projects', 60, 900),
  projects.map((project, index) => {
    const x = 60 + index * 395;
    return [
      rect(x, 1000, 365, 360, TIDE.card, { name: 'Project card' }),
      landscape(x, 1000, 365, 170),
      rect(x + 200, 1130, 150, 38, TIDE.deep, { cornerRadius: 19, name: 'Year pill' }),
      text('2024-2025', x + 200, 1138, 150, {
        fontFamily: BODY,
        fontSize: 19,
        fontWeight: 700,
        fill: '#ffffff',
        align: 'center',
      }),
      text(project.title, x + 24, 1192, 320, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 700,
        fill: TIDE.ink,
      }),
      text(project.body, x + 24, 1236, 320, {
        fontFamily: BODY,
        fontSize: 21,
        fontWeight: 400,
        fill: TIDE.muted,
        lineHeight: 1.45,
      }),
    ];
  }),
  kicker('Learning', 'Certifications', 60, 1395),
  certificates.map((label, index) => {
    const x = 60 + index * 290;
    return [
      icon('badge-check', x + 115, 1500, 50, TIDE.teal, { strokeWidth: 2.2 }),
      text(label, x, 1566, 280, {
        fontFamily: BODY,
        fontSize: 19,
        fontWeight: 500,
        fill: TIDE.ink,
        align: 'center',
        lineHeight: 1.3,
      }),
      index === 0 ? [] : line(x - 5, 1505, 105, TIDE.grey, 2, { rotation: 90 }),
    ];
  }),
]);
