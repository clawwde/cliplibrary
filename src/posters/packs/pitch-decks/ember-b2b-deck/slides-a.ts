import type { DesignIconName } from '@/design';
import { circle, icon, rect, template, text } from '../../../kit';
import {
  BODY,
  background,
  body,
  EMBER,
  HEAD,
  heading,
  iconBadge,
  person,
  SH,
  SW,
  strong,
  tag,
} from './deck-kit';

const E = EMBER;

export const coverSlide = template(SW, SH, () => [
  background(E.accent),
  text('studioember.co', 100, 90, 600, {
    fontFamily: BODY,
    fontSize: 28,
    fontWeight: 600,
    fill: E.ink,
  }),
  icon('arrow-up-right', 1520, 60, 320, E.ink, { strokeWidth: 2.8 }),
  heading('Pitch Deck', 90, 630, 330, E.ink),
]);

const chapters = ['Overview', 'Services', 'Revenue', 'Projects', 'Business', 'Roadmap'] as const;

export const contentsSlide = template(SW, SH, () => [
  background(E.ink),
  heading('Contents', 100, 100, 140, E.paper),
  rect(614, 214, 30, 30, E.accent, { name: 'Full stop' }),
  strong('CONTACT US', 100, 760, 500, 26, E.accent),
  icon('phone', 100, 820, 34, E.paper),
  body('(555) 730-1180', 150, 818, 500, 28, E.paper),
  icon('mail', 100, 880, 34, E.paper),
  body('hello@studioember.co', 150, 878, 500, 28, E.paper),
  chapters.map((chapter, index) => [
    heading(String(index + 1).padStart(2, '0'), 1100, 110 + index * 140, 96, E.accent, 200),
    heading(chapter, 1260, 110 + index * 140, 96, index === 0 ? E.accent : E.paper, 600),
  ]),
]);

const offerings: readonly { icon: DesignIconName; title: string; body: string }[] = [
  {
    icon: 'gem',
    title: 'Branding',
    body: 'Complete visual identities that put your company at the top of the shortlist.',
  },
  {
    icon: 'monitor',
    title: 'Presentation',
    body: 'Executive storytelling that turns bullet points into confident decisions.',
  },
  {
    icon: 'globe',
    title: 'Website',
    body: 'Fast, focused sites built to show your best work and convert visitors.',
  },
];

export const offeringsSlide = template(SW, SH, () => [
  background(E.paper),
  heading('Core Offerings', 100, 90, 120, E.ink),
  offerings.map((offer, index) => {
    const x = 100 + index * 580;
    const featured = index === 0;
    return [
      featured ? rect(x, 300, 540, 660, E.accent, { cornerRadius: 32, name: 'Feature card' }) : [],
      icon(offer.icon, x + 50, 350, 100, E.ink, { strokeWidth: 1.8 }),
      heading(offer.title, x + 50, 500, 64, E.ink, 460),
      body(offer.body, x + 50, 600, 440, 30, featured ? E.ink : E.grey),
    ];
  }),
]);

export const marketSlide = template(SW, SH, () => [
  background(E.ink),
  heading('Market\nOpportunity', 100, 100, 130, E.paper),
  body(
    'Forecasts point to steady, compounding growth. Every new dollar of revenue costs less to acquire than the one before it.',
    100,
    400,
    760,
    30,
    '#c9cdd6',
  ),
  rect(100, 700, 320, 200, E.accent, { cornerRadius: 24, name: 'Stat' }),
  heading('56.2K', 130, 720, 100, E.ink, 280),
  strong('Hours saved', 130, 840, 280, 24, E.ink),
  rect(450, 700, 320, 200, E.paper, { cornerRadius: 24, name: 'Stat' }),
  heading('95.5K', 480, 720, 100, E.ink, 280),
  strong('Tasks automated', 480, 840, 280, 24, E.ink),
  icon('lightbulb', 1060, 120, 820, E.accent, { strokeWidth: 2.2 }),
]);

export const realWorldSlide = template(SW, SH, () => [
  background(E.paper),
  heading('Real-World\nApplication', 100, 100, 130, E.ink),
  tag('Solution', 100, 430, E.accent, E.ink),
  body(
    'Automate reporting and asset handoffs so approvals stop stalling launches.',
    100,
    510,
    900,
    32,
    E.ink,
  ),
  tag('Impact', 100, 680, E.ink, E.paper),
  body(
    'Kickoff time fell from 14 days to 3, and pipeline conversion climbed by 22%.',
    100,
    760,
    900,
    32,
    E.ink,
  ),
  rect(1180, 110, 640, 860, E.ink, { cornerRadius: 36, name: 'Quote card' }),
  tag('Lena, VP Growth', 1230, 170, E.accent, E.ink),
  text('Spends 15+ hours a week on manual reports, slowing every launch.', 1230, 320, 540, {
    fontFamily: HEAD,
    fontSize: 72,
    fontWeight: 400,
    fill: E.paper,
    lineHeight: 1.1,
    uppercase: true,
  }),
]);

export const accountsSlide = template(SW, SH, () => [
  background(E.ink),
  circle(115, 120, 15, E.accent),
  body('Engaged (58.3%)', 145, 100, 500, 28, E.paper),
  circle(115, 180, 15, E.grey),
  body('In nurture (41.7%)', 145, 160, 500, 28, E.paper),
  heading('250K', 100, 520, 280, E.paper, 900),
  body('Accounts opened this year', 100, 860, 800, 36, '#c9cdd6'),
  [0, 1, 2].map((row) =>
    [0, 1, 2, 3, 4].map((column) =>
      person(1000 + column * 175, 120 + row * 320, 160, row === 0 ? E.accent : E.dim),
    ),
  ),
  iconBadge('trending-up', 640, 610, 110, E.accent, E.ink),
]);
