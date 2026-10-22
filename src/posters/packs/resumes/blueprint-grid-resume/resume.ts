import { type DesignIconName, IMAGE_FILTER_PRESETS } from '@/design';
import { circle, icon, line, photo, rect, star, template, text } from '../../../kit';
import type { PosterPhotoName } from '../../../photos';

export const GRID = {
  paper: '#edf2f8',
  line: 'rgba(26,31,54,0.07)',
  ink: '#1a1f36',
  muted: '#4a5068',
  accent: '#ff6a3d',
  soft: '#c5ccdb',
};

export const LETTER = { width: 1275, height: 1650 } as const;
export const HEAD = 'Bricolage Grotesque';
export const BODY = 'DM Sans';

export const gridPaper = (width: number, height: number, step = 50) => [
  rect(0, 0, width, height, GRID.paper, { name: 'Background' }),
  Array.from({ length: Math.floor(width / step) }, (_, index) =>
    rect((index + 1) * step, 0, 2, height, GRID.line, { name: 'Grid line' }),
  ),
  Array.from({ length: Math.floor(height / step) }, (_, index) =>
    rect(0, (index + 1) * step, width, 2, GRID.line, { name: 'Grid line' }),
  ),
];

export const selectionName = (
  label: string,
  x: number,
  y: number,
  width: number,
  height: number,
  size: number,
) => {
  const handle = Math.max(7, size * 0.09);
  return [
    rect(x, y, width, height, 'rgba(0,0,0,0)', {
      stroke: GRID.ink,
      strokeWidth: Math.max(2, size * 0.035),
      name: 'Selection box',
    }),
    [
      [x, y],
      [x + width, y],
      [x, y + height],
      [x + width, y + height],
    ].map(([cx = 0, cy = 0]) =>
      circle(cx, cy, handle, GRID.paper, {
        stroke: GRID.accent,
        strokeWidth: Math.max(2, size * 0.035),
        name: 'Handle',
      }),
    ),
    text(label, x, y + (height - size * 1.15) / 2, width, {
      fontFamily: HEAD,
      fontSize: size,
      fontWeight: 800,
      fill: GRID.ink,
      align: 'center',
      lineHeight: 1.15,
    }),
  ];
};

export const monoPhoto = (
  name: PosterPhotoName,
  x: number,
  y: number,
  width: number,
  height: number,
) => photo(name, x, y, width, height, { filters: IMAGE_FILTER_PRESETS.mono });

const verticalLabel = (label: string, x: number, bottom: number, size: number) =>
  text(label, x, bottom, 900, {
    fontFamily: HEAD,
    fontSize: size,
    fontWeight: 800,
    fill: GRID.ink,
    rotation: -90,
    lineHeight: 1,
  });

export const contactItems: readonly { icon: DesignIconName; label: string; value: string }[] = [
  { icon: 'phone', label: 'Phone', value: '(555) 402-1189' },
  { icon: 'mail', label: 'Email', value: 'hello@theomarlowe.co' },
  { icon: 'house', label: 'Studio', value: '19 Alder Row' },
];

const entry = (
  title: string,
  place: string,
  body: string,
  x: number,
  y: number,
  width: number,
  divider: boolean,
) => [
  text(title, x, y, width, { fontFamily: BODY, fontSize: 28, fontWeight: 700, fill: GRID.accent }),
  text(place, x, y + 40, width, {
    fontFamily: BODY,
    fontSize: 23,
    fontWeight: 700,
    fill: GRID.ink,
  }),
  text(body, x, y + 76, width, {
    fontFamily: BODY,
    fontSize: 22,
    fontWeight: 400,
    fill: GRID.muted,
    lineHeight: 1.45,
  }),
  divider ? line(x, y + 160, width, GRID.ink, 2) : [],
];

const jobs = [
  {
    title: 'Senior Brand Designer',
    place: 'Kestrel Studio / 2023-Present',
    body: 'Lead identity projects for food and travel brands, from strategy to launch.',
  },
  {
    title: 'Visual Designer',
    place: 'Fieldnote Agency / 2020-2023',
    body: 'Designed campaigns, social systems and packaging for twelve clients.',
  },
  {
    title: 'Junior Designer',
    place: 'Pressmark Print / 2018-2020',
    body: 'Prepared print-ready files and art directed catalogue photo shoots.',
  },
] as const;

const skills = [
  { name: 'Brand Strategy', level: 5 },
  { name: 'Typography', level: 5 },
  { name: 'Motion Graphics', level: 4 },
  { name: 'Packaging', level: 4 },
] as const;

const schools = [
  {
    title: 'MA Graphic Design',
    place: 'Northgate University / 2018',
    body: 'Thesis on modular type systems for small brands.',
  },
  {
    title: 'BA Visual Arts',
    place: 'Eastlake College / 2016',
    body: 'Focus on illustration, layout and print craft.',
  },
] as const;

export const resume = template(LETTER.width, LETTER.height, () => [
  gridPaper(LETTER.width, LETTER.height),
  selectionName('Theo Marlowe', 220, 90, 835, 170, 104),
  text('BRAND DESIGNER', 0, 292, LETTER.width, {
    fontFamily: HEAD,
    fontSize: 44,
    fontWeight: 800,
    fill: GRID.ink,
    align: 'center',
    letterSpacing: 3,
  }),
  verticalLabel('WORK EXPERIENCE', 80, 960, 66),
  jobs.map((job, index) =>
    entry(job.title, job.place, job.body, 190, 390 + index * 196, 520, index < 2),
  ),
  monoPhoto('man-portrait-3', 760, 390, 430, 560),
  text('SKILLS', 80, 1000, 600, {
    fontFamily: HEAD,
    fontSize: 84,
    fontWeight: 800,
    fill: GRID.ink,
    lineHeight: 1,
  }),
  skills.map((skill, index) => {
    const y = 1130 + index * 76;
    return [
      text(skill.name.toUpperCase(), 80, y, 380, {
        fontFamily: BODY,
        fontSize: 24,
        fontWeight: 700,
        fill: GRID.ink,
      }),
      Array.from({ length: 5 }, (_, starIndex) =>
        star(
          5,
          440 + starIndex * 42,
          y - 2,
          32,
          starIndex < skill.level ? GRID.accent : GRID.soft,
          {
            innerRatio: 0.46,
          },
        ),
      ),
    ];
  }),
  verticalLabel('EDUCATION', 680, 1430, 66),
  schools.map((school, index) =>
    entry(school.title, school.place, school.body, 770, 1000 + index * 220, 420, index === 0),
  ),
  line(80, 1470, 1115, GRID.ink, 2),
  contactItems.map((item, index) => {
    const x = 130 + index * 370;
    return [
      icon(item.icon, x, 1512, 42, GRID.accent, { strokeWidth: 2.4 }),
      text(item.label.toUpperCase(), x + 62, 1506, 290, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 700,
        fill: GRID.ink,
        letterSpacing: 1,
      }),
      text(item.value, x + 62, 1538, 290, {
        fontFamily: BODY,
        fontSize: 22,
        fontWeight: 400,
        fill: GRID.muted,
      }),
    ];
  }),
]);
