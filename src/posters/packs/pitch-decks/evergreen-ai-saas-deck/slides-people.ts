import { linear } from '@/design';
import { avatar, circle, icon, photo, rect, template } from '../../../kit';
import { body, darkBg, EV, GRAY, glass, head, lightBg, SH, SW } from './theme';

const CREW = [
  { photo: 'woman-portrait-1', name: 'Lena Varga', role: 'Chief Executive' },
  { photo: 'man-portrait-2', name: 'Omar Haddad', role: 'Head of AI' },
  { photo: 'woman-portrait-5', name: 'Priya Raman', role: 'Data Scientist' },
  { photo: 'man-portrait-1', name: 'Jonas Weber', role: 'Lead Engineer' },
] as const;

export const teamSlide = template(SW, SH, () => [
  lightBg(),
  head('Meet the Fernbrook Crew', 0, 110, SW, 72, EV.ink, { align: 'center' }),
  body('The people turning raw data into decisions you can act on.', 0, 210, SW, 30, EV.muted, {
    align: 'center',
  }),
  CREW.map((person, index) => {
    const x = 210 + index * 390;
    const lead = index === 1;
    return [
      photo(person.photo, x, 320, 330, 400, { cornerRadius: 18, ...GRAY }),
      rect(x, 740, 330, 130, lead ? linear(135, EV.emerald, EV.forestMid) : EV.white, {
        name: 'Name tag',
        cornerRadius: 18,
        stroke: EV.line,
        strokeWidth: lead ? 0 : 2,
      }),
      head(person.name, x + 28, 766, 260, 34, lead ? EV.white : EV.ink),
      body(person.role, x + 28, 814, 260, 24, lead ? EV.soft : EV.muted),
      rect(x + 254, 644, 56, 56, EV.white, { name: 'Icon chip', cornerRadius: 14 }),
      icon('arrow-up-right', x + 266, 656, 32, EV.emerald, { strokeWidth: 2.4 }),
    ];
  }),
]);

const ROW_ONE = [
  ['120', 'Interviews\nheld'],
  ['80+', 'Experts\nhired'],
  ['45', 'Awards\nwon'],
  ['96', 'Partners\nonboarded'],
  ['30', 'Countries\nserved'],
] as const;

const ROW_TWO = [
  ['6M', 'Tasks\nautomated'],
  ['350', 'Apps\nconnected'],
  ['90+', 'Teams\nlaunched'],
  ['12', 'Years\nbuilding'],
] as const;

const statPill = (value: string, label: string, x: number, y: number, opacity: number) => [
  rect(x, y, 330, 150, linear(180, 'rgba(95,211,168,0.5)', 'rgba(47,158,124,0.16)'), {
    name: 'Stat pill',
    cornerRadius: 22,
    stroke: 'rgba(255,255,255,0.22)',
    strokeWidth: 2,
    opacity,
  }),
  head(value, x + 28, y + 42, 150, 62, EV.white, { opacity }),
  body(label, x + 180, y + 42, 140, 22, EV.soft, { opacity, lineHeight: 1.3 }),
];

export const performanceSlide = template(SW, SH, () => [
  darkBg(),
  head('Performance by the Numbers', 0, 170, SW, 68, EV.white, { align: 'center' }),
  body(
    'Every figure tells a story of steady delivery, award-winning work and\nclients who stay with us year after year.',
    0,
    270,
    SW,
    30,
    EV.soft,
    { align: 'center' },
  ),
  ROW_ONE.map(([value, label], index) =>
    statPill(value, label, 60 + index * 365, 500, index === 0 || index === 4 ? 0.45 : 1),
  ),
  ROW_TWO.map(([value, label], index) =>
    statPill(value, label, 240 + index * 365, 710, index === 0 || index === 3 ? 0.45 : 1),
  ),
]);

const ORBIT = [
  { photo: 'man-portrait-3', cx: 610, cy: 360, r: 54 },
  { photo: 'woman-portrait-2', cx: 1250, cy: 380, r: 42 },
  { photo: 'woman-portrait-6', cx: 1420, cy: 560, r: 58 },
  { photo: 'woman-portrait-1', cx: 520, cy: 760, r: 46 },
  { photo: 'woman-portrait-4', cx: 1300, cy: 830, r: 62 },
  { photo: 'man-portrait-1', cx: 860, cy: 860, r: 32 },
] as const;

export const collaborationSlide = template(SW, SH, () => [
  lightBg(),
  head('AI Built for Collaborative Teams', 0, 110, SW, 64, EV.ink, { align: 'center' }),
  [
    [920, 460],
    [780, 350],
    [640, 250],
  ].map(([width = 0, height = 0]) =>
    rect(960 - width / 2, 610 - height / 2, width, height, 'rgba(0,0,0,0)', {
      name: 'Orbit ring',
      cornerRadius: height / 2,
      stroke: 'rgba(47,158,124,0.35)',
      strokeWidth: 3,
    }),
  ),
  rect(770, 565, 380, 90, linear(90, EV.emerald, EV.forestMid), {
    name: 'Button',
    cornerRadius: 45,
  }),
  head('Get Started', 790, 588, 280, 38, EV.white, { align: 'center' }),
  icon('arrow-right', 1080, 590, 40, EV.white, { strokeWidth: 2.4 }),
  ORBIT.map((item) => avatar(item.photo, item.cx, item.cy, item.r, EV.white)),
]);

const CONTINENTS = [
  [1060, 330, 170, 130],
  [1160, 650, 90, 170],
  [1420, 300, 110, 80],
  [1450, 560, 110, 150],
  [1660, 360, 160, 120],
  [1720, 690, 70, 50],
] as const;

const onLand = (x: number, y: number) =>
  CONTINENTS.some(([cx, cy, rx, ry]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1);

const MAP_DOTS = Array.from({ length: 34 * 30 }, (_, index) => ({
  x: 880 + (index % 34) * 28,
  y: 170 + Math.floor(index / 34) * 28,
})).filter((dot) => onLand(dot.x, dot.y));

const MARKETS = [
  { value: '$84.6M', label: 'North America 2026', growth: '+12%', x: 940, y: 200 },
  { value: '$1.92B', label: 'Europe 2026', growth: '+9%', x: 1450, y: 150 },
  { value: '$37.4M', label: 'South America 2026', growth: '+6%', x: 980, y: 720 },
  { value: '$14.8M', label: 'Africa 2026', growth: '+15%', x: 1440, y: 640 },
] as const;

export const worldwideSlide = template(SW, SH, () => [
  darkBg(),
  head('Worldwide', 140, 150, 700, 76, EV.white),
  head('Market', 140, 235, 700, 76, EV.mint, { fontWeight: 500 }),
  body(
    'Automation has moved past simple task swaps. Fernbrook brings predictive analytics and orchestration together so teams everywhere can ship faster with fewer handoffs.',
    140,
    380,
    640,
    28,
    EV.soft,
  ),
  MAP_DOTS.map((dot) => circle(dot.x, dot.y, 5, 'rgba(95,211,168,0.32)')),
  head('140+', 140, 780, 260, 72, EV.white),
  body('Cities live', 140, 870, 260, 26, EV.soft),
  head('62%', 440, 780, 260, 72, EV.mint),
  body('Faster rollouts', 440, 870, 260, 26, EV.soft),
  MARKETS.map((market) => [
    glass(market.x, market.y, 360, 160, 20),
    head(market.value, market.x + 26, market.y + 24, 290, 56, EV.white),
    body(market.label, market.x + 26, market.y + 100, 290, 22, EV.soft),
    rect(market.x + 256, market.y + 30, 80, 34, EV.mint, { name: 'Growth chip', cornerRadius: 17 }),
    body(market.growth, market.x + 256, market.y + 33, 80, 20, EV.forest, {
      align: 'center',
      fontWeight: 600,
    }),
  ]),
]);
