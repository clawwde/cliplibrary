import type { DesignIconName, TextElement } from '@/design';
import { A4_SIZE, avatar, circle, icon, line, poly, rect, template, text } from '../../../kit';

export const SKY = {
  navy: '#17213d',
  cyan: '#1fb2c9',
  haze: '#e3ebf3',
  paper: '#f7f9fc',
  text: '#1d2740',
  muted: '#5a6478',
  white: '#ffffff',
  soft: '#b9c6db',
};

const { width: W, height: H } = A4_SIZE;

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
    fontFamily: 'Poppins',
    fontSize,
    fontWeight: 400,
    fill,
    lineHeight: 1.45,
    ...style,
  });

const sideHeader = (glyph: DesignIconName, label: string, y: number) => [
  circle(76, y + 22, 24, SKY.white),
  icon(glyph, 62, y + 8, 28, SKY.navy, { strokeWidth: 2.2 }),
  copy(label, 118, y + 2, 300, 30, SKY.white, { fontWeight: 700, letterSpacing: 1 }),
];

const divider = (y: number) =>
  line(52, y, 340, 'rgba(255,255,255,0.45)', 2, { dashed: true, name: 'Divider' });

const mainHeader = (label: string, y: number) => [
  circle(503, y + 24, 14, SKY.cyan),
  copy(label, 548, y, 600, 34, SKY.navy, { fontWeight: 700, letterSpacing: 1 }),
];

const job = (role: string, dates: string, company: string, detail: string, y: number) => [
  copy(role, 548, y, 420, 25, SKY.cyan, { fontWeight: 700, letterSpacing: 1 }),
  copy(dates, 900, y + 2, 270, 22, SKY.muted, { align: 'right' }),
  copy(company, 548, y + 40, 600, 23, SKY.text, { fontWeight: 600 }),
  copy(detail, 548, y + 80, 620, 21, SKY.muted),
];

const SKILLS = ['HTML & CSS', 'TYPESCRIPT', 'REACT', 'ACCESSIBILITY', 'GIT WORKFLOW'];

const skillPills = (x: number, y: number, maxRight: number) => {
  const placed: { label: string; x: number; y: number; width: number }[] = [];
  let cursorX = x;
  let cursorY = y;
  for (const label of SKILLS) {
    const width = label.length * 12.4 + 48;
    if (cursorX + width > maxRight) {
      cursorX = x;
      cursorY += 70;
    }
    placed.push({ label, x: cursorX, y: cursorY, width });
    cursorX += width + 16;
  }
  return placed.map((item) => [
    rect(item.x, item.y, item.width, 50, SKY.cyan, {
      cornerRadius: 25,
      name: `${item.label} pill`,
    }),
    copy(item.label, item.x, item.y + 12, item.width, 20, SKY.white, {
      fontWeight: 600,
      align: 'center',
      lineHeight: 1.2,
    }),
  ]);
};

export const developerResume = template(W, H, () => [
  rect(0, 0, W, H, SKY.paper, { name: 'Background' }),
  rect(0, 0, 440, H, SKY.navy, { name: 'Sidebar' }),
  poly(
    [
      [0, 0],
      [440, 0],
      [0, 520],
    ],
    SKY.cyan,
    { name: 'Corner wedge' },
  ),
  avatar('man-portrait-3', 220, 250, 140, SKY.white),
  rect(440, 90, 800, 290, SKY.haze, { name: 'Name band' }),
  rect(500, 0, 6, H, SKY.soft, { name: 'Timeline' }),
  rect(500, 110, 6, 250, SKY.cyan, { name: 'Timeline accent' }),
  copy('KAI', 548, 140, 200, 84, SKY.navy, { fontWeight: 700, lineHeight: 1.1 }),
  copy('MORENO', 714, 140, 480, 84, SKY.cyan, { fontWeight: 700, lineHeight: 1.1 }),
  copy('FRONTEND DEVELOPER', 552, 258, 600, 32, SKY.text, { letterSpacing: 4 }),
  sideHeader('user', 'CONTACT', 470),
  (
    [
      ['mail', 'kai@moreno.dev'],
      ['phone', '+1 (555) 300 1290'],
      ['map-pin', '12 Lisbon Street'],
    ] as const
  ).map(([glyph, value], index) => [
    icon(glyph, 56, 548 + index * 54, 28, SKY.cyan, { strokeWidth: 2 }),
    copy(value, 100, 547 + index * 54, 320, 22, SKY.white),
  ]),
  divider(724),
  sideHeader('users', 'REFERENCES', 762),
  (
    [
      ['Lena Hartmann', 'Lead Engineer, Northbeam Labs', 'lena@northbeam.io'],
      ['Omar Velasco', 'Design Director, Fernway', 'omar@fernway.co'],
    ] as const
  ).map(([name, role, mail], index) => {
    const y = 836 + index * 150;
    return [
      copy(name, 56, y, 360, 23, SKY.cyan, { fontWeight: 700 }),
      copy(role, 56, y + 36, 360, 20, SKY.white),
      copy(mail, 56, y + 68, 360, 20, SKY.soft),
    ];
  }),
  divider(1130),
  sideHeader('graduation-cap', 'EDUCATION', 1168),
  (
    [
      ['COASTAL TECH UNIVERSITY', 'MSc Software Engineering', '2020 - 2022'],
      ['RIVERBEND COLLEGE', 'BSc Computer Science', '2016 - 2020'],
    ] as const
  ).map(([school, degree, years], index) => {
    const y = 1244 + index * 150;
    return [
      copy(school, 56, y, 360, 22, SKY.cyan, { fontWeight: 700 }),
      copy(degree, 56, y + 36, 360, 20, SKY.white),
      copy(years, 56, y + 68, 360, 20, SKY.soft),
    ];
  }),
  divider(1560),
  sideHeader('languages', 'LANGUAGES', 1598),
  copy('English, Portuguese, Spanish', 56, 1668, 360, 20, SKY.white),
  mainHeader('ABOUT ME', 450),
  copy(
    'Frontend developer who loves turning rough ideas into fast, friendly interfaces. I build accessible layouts in TypeScript and React, sweat the small details of every interaction and enjoy pairing with designers to ship products people genuinely like using.',
    548,
    512,
    620,
    23,
    SKY.muted,
  ),
  mainHeader('WORK EXPERIENCE', 790),
  job(
    'UI ENGINEER',
    '2022 - Present',
    'Northbeam Labs',
    'Rebuilt the customer dashboard as a component library, cutting page load time by 40% and shipping a shared design system.',
    862,
  ),
  job(
    'JUNIOR WEB DEVELOPER',
    '2019 - 2022',
    'Fernway Studio',
    'Built responsive marketing sites and landing pages for retail and travel clients using modern CSS.',
    1092,
  ),
  mainHeader('SKILLS', 1330),
  skillPills(548, 1400, 1180),
  mainHeader('SELECTED PROJECTS', 1570),
  copy('Tidepool: an open source accessible date picker', 548, 1636, 620, 22, SKY.text, {
    fontWeight: 600,
  }),
  copy('Gridline: a tiny CSS layout toolkit with 2k stars', 548, 1680, 620, 22, SKY.text, {
    fontWeight: 600,
  }),
]);
