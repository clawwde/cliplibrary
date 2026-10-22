import type { DesignIconName, TextElement } from '@/design';
import { A4_SIZE, avatar, icon, rect, template, text } from '../../../kit';

export const GRAPHITE = {
  page: '#1e2126',
  panel: '#2e3239',
  deep: '#121418',
  crimson: '#d9434b',
  amber: '#ffc94d',
  tag: '#a3a9b2',
  light: '#e7e9ec',
  white: '#ffffff',
  muted: '#c9ced6',
};

export const copy = (
  content: string,
  x: number,
  y: number,
  width: number,
  fontSize: number,
  fill: string,
  style: Partial<TextElement> = {},
) =>
  text(content, x, y, width, {
    fontFamily: 'Montserrat',
    fontSize,
    fontWeight: 400,
    fill,
    lineHeight: 1.45,
    ...style,
  });

export const tile = (x: number, y: number, width: number, height: number, active: boolean) =>
  rect(x, y, width, height, GRAPHITE.panel, {
    stroke: GRAPHITE.amber,
    strokeWidth: active ? 3 : 0,
    name: 'Panel',
  });

export const roleTag = (x: number, y: number, width: number, size: number) => [
  rect(x, y, width, size * 2.2, GRAPHITE.tag, { name: 'Role tag' }),
  copy('ENGINEER', x, y + size * 0.55, width, size, GRAPHITE.page, {
    fontWeight: 700,
    align: 'center',
    letterSpacing: 1,
    lineHeight: 1.2,
  }),
];

const heading = (glyph: DesignIconName, label: string, x: number, y: number) => [
  icon(glyph, x, y + 2, 30, GRAPHITE.amber, { strokeWidth: 2 }),
  copy(label, x + 44, y, 480, 30, GRAPHITE.white, { fontWeight: 500 }),
];

const SCHOOLS = [
  ['2022\n2024', 'Granite State University', 'MSc Computer Science'],
  ['2018\n2022', 'Lakeshore Tech Institute', 'BSc Software Engineering'],
  ['2016\n2018', 'Northfield College', 'Diploma in Web Systems'],
] as const;

const WINS = [
  ['share-2', 'Realtime Collaboration', 'Shipped live cursors and comments used by 30k teams.'],
  ['gauge', 'Performance Push', 'Cut API response times in half with smarter caching.'],
  ['users-round', 'Mentoring Program', 'Coached six junior engineers through their first year.'],
  ['workflow', 'Release Automation', 'Built CI pipelines that made deploys a one click job.'],
] as const;

const SKILLS = [
  ['code', 'HTML & CSS'],
  ['terminal', 'TypeScript'],
  ['database', 'SQL & Data'],
  ['monitor', 'Responsive UI'],
  ['smartphone', 'Mobile Apps'],
  ['server-cog', 'REST APIs'],
] as const;

const job = (role: string, company: string, years: string, detail: string, x: number) => [
  tile(x, 360, 269, 230, x === 620),
  copy(role, x + 20, 380, 235, 21, GRAPHITE.amber, { fontWeight: 700, lineHeight: 1.25 }),
  copy(company, x + 20, 444, 235, 18, GRAPHITE.white, { fontWeight: 600 }),
  copy(years, x + 20, 474, 235, 18, GRAPHITE.amber),
  copy(detail, x + 20, 510, 235, 17, GRAPHITE.muted, { lineHeight: 1.4 }),
];

const { width: W, height: H } = A4_SIZE;

export const engineerResume = template(W, H, () => [
  rect(0, 0, W, H, GRAPHITE.page, { name: 'Background' }),
  avatar('man-portrait-1', 150, 160, 82, GRAPHITE.amber),
  copy('Theo Albright', 260, 118, 420, 50, GRAPHITE.white, { fontWeight: 500, lineHeight: 1.2 }),
  roleTag(264, 190, 170, 18),
  rect(860, 60, 320, 200, GRAPHITE.deep, { name: 'Contact box' }),
  (
    [
      ['mail', 'theo@albright.dev'],
      ['phone', '+1 (555) 719 3302'],
      ['map-pin', '8 Granite Row'],
    ] as const
  ).map(([glyph, value], index) => [
    icon(glyph, 888, 92 + index * 52, 28, GRAPHITE.amber, { strokeWidth: 2 }),
    copy(value, 930, 93 + index * 52, 240, 20, GRAPHITE.white, { fontWeight: 500 }),
  ]),
  heading('user', 'About Me', 70, 310),
  tile(70, 360, 490, 400, false),
  copy(
    'I am a software engineer who enjoys building calm, reliable products. I work across the stack in TypeScript, Node and SQL, care deeply about clean interfaces and love turning complex problems into simple tools that real people enjoy using every day.',
    100,
    392,
    430,
    24,
    GRAPHITE.white,
    { lineHeight: 1.6 },
  ),
  heading('graduation-cap', 'Education', 70, 810),
  SCHOOLS.map(([years, school, degree], index) => {
    const y = 860 + index * 116;
    return [
      tile(70, y, 490, 100, index === 0),
      rect(88, y + 16, 68, 68, GRAPHITE.light, { name: 'Year tile' }),
      copy(years, 88, y + 22, 68, 16, GRAPHITE.page, {
        fontWeight: 700,
        align: 'center',
        lineHeight: 1.3,
      }),
      copy(school, 176, y + 18, 370, 21, GRAPHITE.amber, { fontWeight: 700 }),
      copy(degree, 176, y + 54, 370, 18, GRAPHITE.white),
    ];
  }),
  heading('briefcase', 'Work Experience', 620, 310),
  job(
    'Senior Full-Stack Engineer',
    'Quarry Labs',
    '2023 - Present',
    'Leads the realtime editor team and its public API.',
    620,
  ),
  job(
    'Frontend Engineer',
    'Basalt Systems',
    '2021 - 2023',
    'Built the design system and billing dashboard.',
    901,
  ),
  tile(620, 610, 550, 150, false),
  copy('Software Engineer Intern', 640, 630, 330, 21, GRAPHITE.amber, { fontWeight: 700 }),
  copy('2020 - 2021', 950, 632, 200, 18, GRAPHITE.amber, { align: 'right' }),
  copy('Slate Media Group', 640, 666, 500, 18, GRAPHITE.white, { fontWeight: 600 }),
  copy('Prototyped internal tools and landing pages in React.', 640, 700, 510, 17, GRAPHITE.muted),
  heading('trophy', 'Achievements', 620, 810),
  WINS.map(([glyph, title, detail], index) => {
    const y = 860 + index * 116;
    return [
      tile(620, y, 96, 96, index === 0),
      icon(glyph, 646, y + 26, 44, GRAPHITE.white, { strokeWidth: 1.8 }),
      copy(title, 736, y + 6, 440, 21, GRAPHITE.amber, { fontWeight: 700 }),
      copy(detail, 736, y + 40, 430, 18, GRAPHITE.white, { lineHeight: 1.4 }),
    ];
  }),
  heading('settings', 'Skills', 70, 1370),
  SKILLS.map(([glyph, label], index) => {
    const x = 70 + index * 185;
    return [
      tile(x, 1420, 175, 200, index === 0),
      icon(glyph, x + 115, 1440, 40, GRAPHITE.white, { strokeWidth: 1.8 }),
      copy(label, x, 1570, 175, 18, GRAPHITE.white, { fontWeight: 600, align: 'center' }),
    ];
  }),
]);
