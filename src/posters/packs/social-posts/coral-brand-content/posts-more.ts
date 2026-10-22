import { linear } from '@/design';
import { icon, photo, poly, polygon, rect, template, text } from '../../../kit';
import { bold, CORAL, type CoralPalette, HEAD, S, site } from './posts';

export const creativity = template(S, S, () => [
  rect(0, 0, S, S, CORAL.paper, { name: 'Background' }),
  rect(450, 70, 180, 330, CORAL.ink, { cornerRadius: 22, name: 'Pillar' }),
  bold('CREATIVITY', 0, 300, 124, CORAL.primary, 'center', S),
  text('is not talent', 80, 470, 300, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 600,
    fill: CORAL.ink,
  }),
  text('but attitude', 700, 470, 300, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 600,
    fill: CORAL.ink,
    align: 'right',
  }),
  photo('woman-portrait-3', 330, 540, 420, 540, { cornerRadius: 30 }),
  site(80, 980, '#6b6470'),
]);

export const takeTheSeat = template(S, S, () => [
  rect(0, 0, S, S, CORAL.ink, { name: 'Background' }),
  polygon(3, 120, 40, 520, 960, linear(180, 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0.3)'), {
    rotation: -12,
    name: 'Spotlight',
  }),
  icon('armchair', 210, 690, 280, CORAL.paper, { strokeWidth: 1.4 }),
  rect(600, 120, 170, 76, CORAL.paper, { name: 'Label' }),
  text("IT'S", 600, 128, 170, {
    fontFamily: 'Anton',
    fontSize: 52,
    fontWeight: 400,
    fill: CORAL.ink,
    align: 'center',
  }),
  rect(600, 210, 240, 96, CORAL.primary, { name: 'Label' }),
  text('TIME', 600, 214, 240, {
    fontFamily: 'Anton',
    fontSize: 76,
    fontWeight: 400,
    fill: CORAL.paper,
    align: 'center',
  }),
  text('TO TAKE\nTHAT SEAT', 600, 320, 420, {
    fontFamily: 'Anton',
    fontSize: 96,
    fontWeight: 400,
    fill: CORAL.paper,
    lineHeight: 1,
  }),
  text('Lead the room. We build the\nbrand that gets you invited.', 600, 560, 440, {
    fontSize: 28,
    fontWeight: 400,
    fill: '#cfc8d4',
    lineHeight: 1.45,
  }),
  site(600, 960, CORAL.primary),
]);

export const everyMoment = (p: CoralPalette) =>
  template(S, S, () => [
    rect(0, 0, S, S, p.paper, { name: 'Background' }),
    icon('hourglass', 20, 130, 560, p.ink, { strokeWidth: 1.1 }),
    bold('EVERY MOMENT\nCOUNTS', 560, 300, 54, p.ink, 'left', 460),
    text('Being on time is not just polite.\nIt is a competitive edge.', 560, 440, 470, {
      fontSize: 27,
      fontWeight: 500,
      fill: p.ink,
      lineHeight: 1.45,
    }),
    rect(560, 560, 120, 6, p.primary, {
      name: 'Accent rule',
    }),
    rect(780, 860, 150, 60, p.ink, { cornerRadius: 10, name: 'Label' }),
    text('TRUST', 780, 870, 150, {
      fontFamily: HEAD,
      fontSize: 32,
      fontWeight: 800,
      fill: p.paper,
      align: 'center',
    }),
    bold('US.', 860, 920, 90, p.primary, 'left', 200),
  ]);

export const seoInsights = (p: CoralPalette) =>
  template(S, S, () => [
    rect(0, 0, S, S, p.paper, { name: 'Background' }),
    rect(70, 0, 190, S, p.primary, { name: 'Band' }),
    text('SEO  SEO  SEO', 105, 1050, 1020, {
      fontFamily: 'Anton',
      fontSize: 150,
      fontWeight: 400,
      fill: p.paper,
      rotation: -90,
      lineHeight: 1,
    }),
    photo('woman-portrait-1', 330, 80, 680, 560, { cornerRadius: 30 }),
    bold('Gain Valuable', 330, 690, 72, p.ink),
    bold('Insights', 330, 772, 72, p.primary),
    text('Spark, sharpen and scale\nyour conversions.', 330, 890, 680, {
      fontSize: 32,
      fontWeight: 500,
      fill: p.ink,
      lineHeight: 1.4,
    }),
  ]);

export const nextLevel = template(S, S, () => [
  rect(0, 0, S, S, CORAL.primary, { name: 'Background' }),
  [300, 540, 780].map((x, index) => [
    rect(x - 2, 0, 4, 210, CORAL.ink, { name: 'Cord' }),
    icon('lightbulb', x + 65, 340, 130, index === 2 ? CORAL.ink : CORAL.paper, {
      rotation: 180,
      strokeWidth: 1.8,
    }),
  ]),
  rect(80, 560, 760, 96, CORAL.ink, { cornerRadius: 10, name: 'Label' }),
  text('TAKE YOUR BUSINESS TO', 104, 578, 720, {
    fontFamily: HEAD,
    fontSize: 50,
    fontWeight: 800,
    fill: CORAL.paper,
  }),
  bold('NEXT LEVEL', 80, 680, 140, CORAL.ink),
  text('Join Halcyon Studio', 80, 950, 600, {
    fontFamily: HEAD,
    fontSize: 32,
    fontWeight: 600,
    fill: CORAL.ink,
  }),
]);

export const didYouKnow = template(S, S, () => [
  rect(0, 0, S, S, CORAL.ink, { name: 'Background' }),
  bold('DID YOU\nKNOW?', 80, 100, 116, CORAL.paper, 'left', 640),
  text('?', 780, 40, 260, {
    fontFamily: HEAD,
    fontSize: 300,
    fontWeight: 900,
    fill: CORAL.primary,
    align: 'center',
  }),
  photo('woman-portrait-2', 560, 380, 440, 620, { cornerRadius: 30 }),
  rect(80, 470, 520, 300, CORAL.paper, { cornerRadius: 28, name: 'Speech card' }),
  poly(
    [
      [480, 760],
      [580, 760],
      [600, 840],
    ],
    CORAL.paper,
    { name: 'Speech tail' },
  ),
  text('Brands that post every week\nwin 3x more inbound leads.', 120, 530, 450, {
    fontFamily: HEAD,
    fontSize: 36,
    fontWeight: 700,
    fill: CORAL.ink,
    lineHeight: 1.35,
  }),
  site(80, 980, CORAL.primary),
]);
