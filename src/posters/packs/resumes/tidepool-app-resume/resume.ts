import { type DesignIconName, type Fill, linear } from '@/design';
import { circle, icon as iconNode, line, photo, rect, star, template, text } from '../../../kit';

export const TIDE = {
  ink: '#0f1f1c',
  muted: '#5b6b68',
  paper: '#ffffff',
  card: '#eef5f3',
  tint: '#dcf2ec',
  edge: '#8fd3c3',
  teal: '#0f9d8a',
  deep: '#0b6b5e',
  coral: '#ff7a59',
  grey: '#c9d3d1',
};

export const LETTER = { width: 1275, height: 1650 } as const;
export const HEAD = 'Plus Jakarta Sans';
export const BODY = 'Inter';

export const TILE_FILLS: readonly Fill[] = [
  linear(135, '#ff8a65', '#f43f5e'),
  linear(135, '#6366f1', '#a855f7'),
  linear(135, '#14b8a6', '#0ea5e9'),
  linear(135, '#f59e0b', '#f97316'),
  linear(135, '#22c55e', '#0f9d8a'),
  linear(135, '#0ea5e9', '#2563eb'),
];

export const appTile = (x: number, y: number, size: number, fill: Fill, name: DesignIconName) => [
  rect(x, y, size, size, fill, { cornerRadius: size * 0.26, name: 'App tile' }),
  iconNode(name, x + size * 0.22, y + size * 0.22, size * 0.56, '#ffffff', { strokeWidth: 2.2 }),
];

export const statusBar = (width: number, label: string) => [
  text(label, 60, 36, 300, { fontFamily: BODY, fontSize: 24, fontWeight: 600, fill: TIDE.ink }),
  text('9:41 AM', 0, 36, width, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: TIDE.ink,
    align: 'center',
  }),
  [10, 14, 18, 22].map((height, index) =>
    rect(1060 + index * 12, 62 - height, 8, height, TIDE.ink, { cornerRadius: 2, name: 'Signal' }),
  ),
  iconNode('wifi', 1116, 36, 28, TIDE.ink, { strokeWidth: 2.6 }),
  rect(1158, 40, 50, 24, 'rgba(0,0,0,0)', {
    cornerRadius: 7,
    stroke: TIDE.ink,
    strokeWidth: 2,
    name: 'Battery',
  }),
  rect(1162, 44, 36, 16, TIDE.teal, { cornerRadius: 4, name: 'Battery level' }),
];

export const kicker = (label: string, title: string, x: number, y: number, width = 600) => [
  text(label, x, y, width, {
    fontFamily: BODY,
    fontSize: 20,
    fontWeight: 700,
    fill: TIDE.muted,
    letterSpacing: 2,
    uppercase: true,
  }),
  text(title, x, y + 30, width, {
    fontFamily: HEAD,
    fontSize: 40,
    fontWeight: 700,
    fill: TIDE.ink,
  }),
];

const yearPill = (label: string, x: number, y: number, fill: string, color: string) => [
  rect(x, y, 150, 40, fill, { cornerRadius: 20, name: 'Year pill' }),
  text(label, x, y + 8, 150, {
    fontFamily: BODY,
    fontSize: 20,
    fontWeight: 700,
    fill: color,
    align: 'center',
  }),
];

const stars = (x: number, y: number, filled: number) =>
  Array.from({ length: 5 }, (_, index) =>
    star(5, x + index * 30, y, 24, index < filled ? TIDE.teal : TIDE.grey, { innerRatio: 0.46 }),
  );

export const identity = (x: number, y: number) => [
  photo('woman-portrait-4', x, y, 380, 380, { cornerRadius: 36 }),
  text('Maya', x, y + 400, 400, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 800,
    fill: TIDE.ink,
    lineHeight: 1,
  }),
  text('Linden', x, y + 505, 400, {
    fontFamily: HEAD,
    fontSize: 104,
    fontWeight: 400,
    fill: TIDE.ink,
    lineHeight: 1,
  }),
  text('Product Designer', x, y + 625, 400, {
    fontFamily: BODY,
    fontSize: 34,
    fontWeight: 500,
    fill: TIDE.teal,
  }),
];

const contactBubble = (label: string, x: number, y: number) => [
  rect(x, y, 380, 56, linear(90, TIDE.teal, '#16b8a0'), { cornerRadius: 16, name: 'Contact' }),
  text(label, x + 24, y + 14, 340, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 600,
    fill: '#ffffff',
  }),
];

const skillRows = [
  { name: 'Interface Design', icon: 'palette', level: 5 },
  { name: 'Prototyping', icon: 'layers', level: 4 },
  { name: 'User Research', icon: 'search', level: 4 },
  { name: 'Motion Design', icon: 'sparkles', level: 5 },
] as const;

const jobs = [
  { role: 'Senior Product Designer', company: 'Harbor Health', years: '2022-2026' },
  { role: 'Product Designer', company: 'Quillwork Apps', years: '2019-2022' },
  { role: 'UI Designer', company: 'Brightloop Labs', years: '2017-2019' },
] as const;

const references = [
  { name: 'Dana Ortiz', role: 'Design Director, Harbor', phone: '(555) 310-2290' },
  { name: 'Leo Hartmann', role: 'CPO, Quillwork Apps', phone: '(555) 784-1123' },
] as const;

export const resumeMain = template(LETTER.width, LETTER.height, () => [
  rect(0, 0, LETTER.width, LETTER.height, TIDE.paper, { name: 'Background' }),
  statusBar(LETTER.width, 'Resume'),
  identity(60, 110),
  text("Let's Connect  >", 60, 800, 400, {
    fontFamily: HEAD,
    fontSize: 34,
    fontWeight: 700,
    fill: TIDE.ink,
  }),
  contactBubble('(555) 210-4477', 60, 860),
  contactBubble('maya@linden.studio', 60, 930),
  contactBubble('48 Harbor Lane', 60, 1000),
  rect(60, 1090, 380, 500, TIDE.tint, {
    cornerRadius: 24,
    stroke: TIDE.edge,
    strokeWidth: 3,
    name: 'Skills card',
  }),
  kicker('Expertise', 'Skills', 90, 1115, 330),
  skillRows.map((skill, index) => [
    appTile(90, 1230 + index * 88, 64, TILE_FILLS[index] ?? TIDE.teal, skill.icon),
    text(skill.name, 172, 1232 + index * 88, 260, {
      fontFamily: BODY,
      fontSize: 22,
      fontWeight: 700,
      fill: TIDE.ink,
    }),
    stars(172, 1268 + index * 88, skill.level),
  ]),
  rect(480, 110, 735, 360, TIDE.card, { cornerRadius: 28, name: 'About card' }),
  kicker('Profile', 'About Me', 515, 140),
  text(
    'I design calm, useful mobile products. Eight years of turning messy research into clear flows, friendly interfaces and design systems that teams love to build with.',
    515,
    230,
    665,
    { fontFamily: BODY, fontSize: 25, fontWeight: 400, fill: TIDE.muted, lineHeight: 1.45 },
  ),
  text('Read more  >', 900, 420, 280, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 600,
    fill: TIDE.teal,
    align: 'right',
  }),
  rect(480, 500, 735, 250, TIDE.tint, {
    cornerRadius: 28,
    stroke: TIDE.edge,
    strokeWidth: 3,
    name: 'Education card',
  }),
  kicker('Details', 'Education', 515, 530),
  appTile(515, 630, 76, linear(135, TIDE.teal, '#0ea5e9'), 'graduation-cap'),
  text('Westbrook Institute of Design', 610, 636, 420, {
    fontFamily: BODY,
    fontSize: 26,
    fontWeight: 700,
    fill: TIDE.ink,
  }),
  text('BA, Interaction Design', 610, 674, 420, {
    fontFamily: BODY,
    fontSize: 24,
    fontWeight: 400,
    fill: TIDE.muted,
  }),
  yearPill('2013-2017', 1040, 650, TIDE.deep, '#ffffff'),
  kicker('Highlights', 'Work Experience', 495, 790),
  jobs.map((job, index) => {
    const y = 890 + index * 120;
    return [
      appTile(495, y, 72, linear(135, '#4ade80', TIDE.teal), 'briefcase'),
      text(job.role, 590, y + 6, 440, {
        fontFamily: BODY,
        fontSize: 26,
        fontWeight: 700,
        fill: TIDE.ink,
      }),
      text(job.company, 590, y + 42, 440, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 400,
        fill: TIDE.muted,
      }),
      yearPill(job.years, 1050, y + 16, TIDE.card, TIDE.deep),
      line(495, y + 96, 720, '#dbe3e1', 2),
    ];
  }),
  rect(480, 1260, 735, 330, '#ffffff', {
    cornerRadius: 28,
    stroke: TIDE.grey,
    strokeWidth: 3,
    name: 'References card',
  }),
  kicker('Connections', 'References', 515, 1290),
  references.map((person, index) => {
    const x = 515 + index * 350;
    return [
      circle(x + 26, 1416, 26, TIDE.card),
      iconNode('user-round', x + 8, 1398, 36, TIDE.deep),
      text(person.name, x + 66, 1394, 270, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 700,
        fill: TIDE.ink,
      }),
      text(`${person.role}\n${person.phone}`, x + 66, 1430, 270, {
        fontFamily: BODY,
        fontSize: 19,
        fontWeight: 400,
        fill: TIDE.muted,
        lineHeight: 1.5,
      }),
    ];
  }),
]);
