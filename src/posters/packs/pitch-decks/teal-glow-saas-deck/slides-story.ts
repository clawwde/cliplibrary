import { linear, NO_FILTERS } from '@/design';
import { icon, photo, rect, shadow, template } from '../../../kit';
import { backdrop, body, glow, HX, head, SH, SW } from './theme';

const GRAY = { filters: { ...NO_FILTERS, grayscale: 1 } };

export const coverSlide = template(SW, SH, () => [
  backdrop(),
  Array.from({ length: 40 }, (_, index) =>
    rect(12 + (index % 8) * 240, 12 + Math.floor(index / 8) * 216, 216, 192, '#0d1215', {
      name: 'Tile',
      cornerRadius: 32,
      stroke: '#182024',
      strokeWidth: 2,
    }),
  ),
  glow(960, 380, 370, 0.5),
  rect(0, 640, SW, 440, linear(180, 'rgba(7,9,11,0)', HX.night), { name: 'Fade' }),
  rect(860, 230, 200, 200, linear(135, HX.teal, HX.deep), {
    name: 'App tile',
    cornerRadius: 48,
    ...shadow(80, 0, 'rgba(25,227,196,0.7)'),
  }),
  icon('sparkles', 910, 280, 100, HX.white, { strokeWidth: 2 }),
  head('Cloud Platform', 0, 540, SW, 120, linear(90, HX.teal, '#7ff5e2'), {
    align: 'center',
    fontWeight: 800,
  }),
  head('Investor Deck', 0, 680, SW, 120, HX.white, { align: 'center', fontWeight: 800 }),
  body('HELIXA  /  SERIES B  /  2027', 0, 880, SW, 28, HX.muted, {
    align: 'center',
    letterSpacing: 6,
  }),
]);

const CHAPTERS = [
  'Intro',
  'Team',
  'Platform',
  'Metrics',
  'Finance',
  'Insights',
  'Pricing',
  'Roadmap',
  'Close',
];

export const contentsSlide = template(SW, SH, () => [
  backdrop(),
  glow(420, 700, 370, 0.4),
  head('Contents', 140, 140, 640, 96, HX.white),
  body('Nine short chapters,\none clear story.', 140, 270, 600, 32, HX.muted),
  CHAPTERS.map((label, index) => {
    const x = 860 + (index % 3) * 330;
    const y = 120 + Math.floor(index / 3) * 300;
    return [
      head(String(index + 1).padStart(2, '0'), x, y, 300, 150, linear(180, HX.white, '#55636a'), {
        fontWeight: 800,
      }),
      body(label, x + 6, y + 172, 300, 30, HX.muted),
    ];
  }),
]);

export const empoweringSlide = template(SW, SH, () => [
  backdrop(),
  glow(560, 540, 530, 0.5),
  rect(160, 140, 800, 800, linear(160, HX.teal, HX.deep), { name: 'Halo', cornerRadius: 400 }),
  photo('man-portrait-2', 230, 210, 660, 660, { cornerRadius: 330, ...GRAY }),
  head('Technology\nthat empowers', 1100, 220, 760, 90, HX.white),
  body(
    'Helixa gives modern teams one product-led\nplatform that turns scattered tools into\na single, reliable operating layer.',
    1100,
    460,
    680,
    32,
    HX.muted,
  ),
  body(
    'Onboarding takes days, not months, and every team gets value from the first login.',
    1100,
    720,
    680,
    32,
    HX.white,
  ),
]);

export const adoptionSlide = template(SW, SH, () => [
  backdrop(),
  glow(1400, 540, 520, 0.32),
  head('Three in four', 140, 150, 900, 96, HX.white),
  head('teams automate\ntheir reporting', 140, 254, 900, 96, HX.muted),
  rect(140, 640, 340, 200, HX.white, { name: 'Stat card', cornerRadius: 24 }),
  head('56.2K', 172, 672, 280, 72, HX.night),
  body('Hours reclaimed', 172, 774, 280, 26, '#4b5559'),
  rect(510, 640, 340, 200, linear(135, HX.teal, HX.deep), { name: 'Stat card', cornerRadius: 24 }),
  head('91.4K', 542, 672, 280, 72, HX.night),
  body('Reports automated', 542, 774, 280, 26, HX.night),
  Array.from({ length: 24 }, (_, index) => {
    const row = Math.floor(index / 6);
    const color = row === 0 ? HX.teal : row < 3 ? HX.white : 'rgba(255,255,255,0.22)';
    return icon('user', 1100 + (index % 6) * 120, 200 + row * 180, 100, color, {
      strokeWidth: 2.2,
    });
  }),
]);

export const potentialSlide = template(SW, SH, () => [
  backdrop(),
  glow(420, 700, 370, 0.38),
  head('Unlock full\npotential', 140, 170, 800, 96, HX.white),
  body(
    'Bring growth, security and operations into one view, so teams stop chasing data and start shipping outcomes.',
    140,
    420,
    740,
    32,
    HX.muted,
  ),
  body(
    'Fewer handoffs, faster answers and a calmer\nroadmap for everyone involved.',
    140,
    700,
    740,
    32,
    HX.white,
  ),
  photo('meeting-1', 1000, 140, 780, 800, { cornerRadius: 28, ...GRAY }),
]);

const PEOPLE = [
  { photo: 'woman-portrait-1', name: 'Lena Varga', role: 'Program Lead' },
  { photo: 'man-portrait-1', name: 'Omar Haddad', role: 'Systems Architect' },
  { photo: 'man-portrait-2', name: 'Felix Brandt', role: 'Head of Platform' },
  { photo: 'woman-portrait-5', name: 'Nadia Pires', role: 'Security Engineer' },
] as const;

export const teamSlide = template(SW, SH, () => [
  backdrop(),
  glow(960, 380, 370, 0.4),
  head('Meet the Team', 0, 110, SW, 88, HX.white, { align: 'center' }),
  body(
    'The engineers who turn complex data into quiet, dependable systems.',
    0,
    230,
    SW,
    30,
    HX.muted,
    {
      align: 'center',
    },
  ),
  PEOPLE.map((person, index) => {
    const x = 180 + index * 400;
    return [
      rect(x, 360, 360, 480, linear(180, HX.teal, HX.deep), { name: 'Card', cornerRadius: 28 }),
      photo(person.photo, x + 16, 376, 328, 448, { cornerRadius: 20 }),
      head(person.name, x, 872, 360, 32, HX.white, { align: 'center' }),
      body(person.role, x, 922, 360, 24, HX.muted, { align: 'center' }),
    ];
  }),
]);

const TRACKS = [
  { label: 'Product-led growth', start: 0, span: 1, note: '+40% activation', hot: true },
  { label: 'Compliance & scale', start: 0.6, span: 1.1, note: 'SOC 2 ready', hot: false },
  { label: 'Workflow retention', start: 1.2, span: 0.9, note: '+22% retention', hot: true },
  { label: 'Value realisation', start: 1.7, span: 1.3, note: '3x faster ROI', hot: false },
  { label: 'Platform value', start: 2.8, span: 1.2, note: '$12M ARR', hot: true },
];

export const roadmapSlide = template(SW, SH, () => [
  backdrop(),
  glow(1500, 700, 370, 0.3),
  head('Roadmap', 140, 110, 800, 88, HX.white),
  body(
    'A timeline that balances quick wins with long-term enterprise readiness.',
    140,
    225,
    1100,
    30,
    HX.muted,
  ),
  ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'].map((quarter, index) => [
    body(quarter, 640 + index * 285, 360, 285, 28, HX.white, { align: 'center', fontWeight: 600 }),
    rect(640 + index * 285, 340, 2, 620, HX.rule, { name: 'Column rule' }),
  ]),
  rect(140, 420, 1640, 2, HX.rule, { name: 'Header rule' }),
  TRACKS.map((track, row) => {
    const y = 470 + row * 98;
    const x = 640 + track.start * 285;
    return [
      body(track.label, 140, y + 4, 480, 30, HX.white),
      rect(
        x + 8,
        y,
        track.span * 285 - 16,
        50,
        track.hot ? linear(90, HX.deep, HX.teal) : HX.white,
        {
          name: 'Bar',
          cornerRadius: 10,
        },
      ),
      body(track.note, x + 28, y + 12, track.span * 285 - 40, 22, HX.night, { fontWeight: 600 }),
    ];
  }),
]);
