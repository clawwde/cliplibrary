import { linear } from '@/design';
import {
  avatar,
  card,
  circle,
  estimateTextWidth,
  icon,
  path,
  photo,
  pill,
  rect,
  template,
} from '../../../kit';
import { backdrop, body, head, marker, NV, SH, SW } from './theme';

export const coverSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  photo('team-1', 60, 60, 1800, 960, { cornerRadius: 40 }),
  rect(60, 60, 1800, 960, linear(90, 'rgba(43,18,54,0.94)', 'rgba(43,18,54,0.1)'), {
    name: 'Shade',
    cornerRadius: 40,
  }),
  pill('northvale.agency', 1440, 120, {
    fill: NV.white,
    color: NV.ink,
    fontSize: 30,
    fontFamily: 'DM Sans',
  }),
  rect(140, 150, 96, 96, NV.coral, { name: 'Logo mark', cornerRadius: 24 }),
  icon('zap', 164, 174, 48, NV.white),
  head('NORTHVALE', 264, 172, 600, 48, NV.white, { letterSpacing: 6 }),
  head('Growth\nPitch Deck', 140, 540, 1100, 170, NV.white, { fontWeight: 800, lineHeight: 0.98 }),
  marker(140, 900),
  body('B2B marketing strategy for 2027', 240, 880, 900, 40, NV.peach),
]);

const CHAPTERS = ['About us', 'Our work', 'Revenue plan', 'Value props', 'Next steps'];

export const contentsSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  marker(140, 170),
  head('Contents', 140, 210, 800, 150, NV.white, { fontWeight: 800 }),
  body('Five chapters, one clear plan.', 140, 390, 700, 38, NV.peach),
  CHAPTERS.map((chapter, index) =>
    head(
      chapter,
      1080,
      150 + index * 160,
      760,
      100,
      index === 2 ? NV.white : 'rgba(255,255,255,0.26)',
    ),
  ),
  icon('arrow-right', 950, 470, 100, NV.coral, { strokeWidth: 2.6 }),
]);

export const aboutSlide = template(SW, SH, () => [
  backdrop(NV.cream),
  marker(140, 150),
  head('About us', 140, 190, 900, 130, NV.ink, { fontWeight: 800 }),
  body(
    'We help ambitious B2B teams cut through the noise, turn complex offers into clear stories and build brand equity at every touchpoint.',
    140,
    380,
    880,
    38,
    NV.grey,
  ),
  rect(140, 700, 370, 220, NV.coral, { name: 'Stat card', cornerRadius: 28 }),
  head('9+ yrs', 180, 735, 310, 84, NV.white),
  body('Agency experience', 180, 845, 310, 28, NV.white),
  head('97%', 580, 735, 300, 84, NV.ink),
  body('Client retention', 580, 845, 300, 28, NV.grey),
  photo('meeting-1', 1140, 120, 660, 840, { cornerRadius: 40 }),
]);

const KEYWORDS = [
  ['seo', 'content', 'paid social'],
  ['abm', 'analytics', 'webinars'],
  ['intent data', 'crm', 'events'],
  ['nurture', 'pipeline', 'email'],
  ['outbound', 'ppc', 'attribution'],
  ['funnels', 'partners', 'retention'],
  ['ads', 'lifecycle', 'reviews'],
];

const HOT = ['seo', 'webinars', 'pipeline', 'attribution', 'lifecycle'];

const keywordRow = (words: readonly string[], row: number) => {
  const widths = words.map((word) => estimateTextWidth(word, 34) + 75);
  return words.map((word, index) => {
    const x = 1010 + (row % 2) * 70 + widths.slice(0, index).reduce((sum, w) => sum + w + 24, 0);
    const hot = HOT.includes(word);
    return pill(word, x, 90 + row * 130, {
      fill: hot ? NV.coral : 'rgba(0,0,0,0)',
      color: hot ? NV.plum : NV.white,
      stroke: NV.white,
      strokeWidth: hot ? 0 : 3,
      fontSize: 34,
      fontFamily: 'DM Sans',
      fontWeight: 500,
    });
  });
};

export const keywordSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  rect(140, 140, 120, 120, NV.coral, { name: 'Icon tile', cornerRadius: 30 }),
  icon('zap', 170, 170, 60, NV.white),
  head('Access the sharpest\ndemand-gen toolkit\nin B2B.', 140, 640, 860, 70, NV.white, {
    fontWeight: 800,
  }),
  KEYWORDS.map((words, row) => keywordRow(words, row)),
]);

const SERVICES = [
  {
    icon: 'pen-tool',
    title: 'Branding',
    text: 'Identity systems that put you at the top of every shortlist.',
  },
  {
    icon: 'monitor',
    title: 'Sales decks',
    text: 'Turn bullet-point slides into a story that buyers remember.',
  },
  {
    icon: 'globe',
    title: 'Websites',
    text: 'Fast, focused sites that turn visitors into qualified pipeline.',
  },
] as const;

export const workSlide = template(SW, SH, () => [
  backdrop(NV.cream),
  marker(140, 150),
  head('Our work', 140, 190, 900, 130, NV.ink, { fontWeight: 800 }),
  body('Three studios under one roof,\nbuilt for revenue teams.', 1100, 200, 700, 36, NV.grey),
  SERVICES.map((service, index) => {
    const x = 140 + index * 560;
    const lead = index === 0;
    return [
      card(x, 420, 520, 520, {
        fill: lead ? NV.coral : NV.white,
        radius: 32,
        stroke: NV.line,
        strokeWidth: lead ? 0 : 3,
        shadowBlur: 0,
      }),
      icon(service.icon, x + 50, 480, 72, lead ? NV.white : NV.coral, { strokeWidth: 2 }),
      head(service.title, x + 50, 620, 420, 54, lead ? NV.white : NV.ink),
      body(service.text, x + 50, 710, 420, 32, lead ? NV.white : NV.grey),
    ];
  }),
]);

const PEOPLE = [
  {
    photo: 'woman-portrait-2',
    name: 'Mira Okafor',
    role: 'Head of Strategy',
    bio: 'Shapes positioning\nand launch plans',
  },
  {
    photo: 'man-portrait-3',
    name: 'Theo Lindgren',
    role: 'Creative Director',
    bio: 'Leads brand, decks\nand campaign craft',
  },
  {
    photo: 'woman-portrait-4',
    name: 'Ana Sato',
    role: 'Growth Lead',
    bio: 'Runs experiments\nacross the funnel',
  },
  {
    photo: 'man-portrait-1',
    name: 'Dev Malhotra',
    role: 'Media Buyer',
    bio: 'Scales paid search\nand social budgets',
  },
] as const;

export const teamSlide = template(SW, SH, () => [
  backdrop(NV.plum),
  head('Meet the strategists', 0, 120, SW, 96, NV.white, { align: 'center', fontWeight: 800 }),
  body('A senior crew that ships campaigns, not just slides.', 0, 250, SW, 34, NV.peach, {
    align: 'center',
  }),
  PEOPLE.map((person, index) => {
    const cx = 360 + index * 400;
    return [
      circle(cx, 560, 160, NV.plumSoft),
      avatar(person.photo, cx, 540, 140, NV.coral),
      head(person.name, cx - 180, 740, 360, 40, NV.white, { align: 'center' }),
      body(person.role, cx - 180, 796, 360, 28, NV.coral, { align: 'center', fontWeight: 600 }),
      body(person.bio, cx - 180, 850, 360, 26, 'rgba(255,255,255,0.7)', {
        align: 'center',
      }),
    ];
  }),
]);

const FORECAST = [
  { x: 200, y: 820, value: '120K', year: '2025' },
  { x: 430, y: 770, value: '180K', year: '2026' },
  { x: 660, y: 700, value: '240K', year: '2027' },
  { x: 890, y: 600, value: '310K', year: '2028' },
];

export const revenueSlide = template(SW, SH, () => [
  backdrop(NV.cream),
  marker(140, 140),
  head('Revenue\nforecast', 140, 180, 900, 120, NV.ink, { fontWeight: 800 }),
  body('A data-led outlook for steady,\ncompounding growth.', 140, 460, 820, 36, NV.grey),
  path(
    `M${FORECAST.map((point) => `${point.x - 200} ${point.y - 600}`).join(' L')}`,
    340,
    600,
    690,
    220,
    'rgba(0,0,0,0)',
    { width: 690, height: 220 },
    { stroke: NV.coral, strokeWidth: 8, name: 'Trend line' },
  ),
  FORECAST.map((point) => [
    circle(point.x + 140, point.y, 18, NV.plum),
    body(point.value, point.x + 90, point.y - 70, 100, 26, NV.ink, {
      align: 'center',
      fontWeight: 700,
    }),
    pill(point.year, point.x + 80, 900, {
      fill: 'rgba(0,0,0,0)',
      color: NV.ink,
      stroke: NV.ink,
      strokeWidth: 3,
      fontSize: 30,
      fontFamily: 'DM Sans',
      width: 120,
    }),
  ]),
  rect(1180, 120, 600, 840, NV.plum, { name: 'Target card', cornerRadius: 40 }),
  head('$310K', 1180, 440, 600, 140, NV.white, { align: 'center', fontWeight: 800 }),
  body('Target pipeline, 2028', 1180, 610, 600, 36, NV.peach, { align: 'center' }),
]);
