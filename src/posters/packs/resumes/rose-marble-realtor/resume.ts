import { A4_SIZE, circle, icon, photo, rect, template } from '../../../kit';
import { copy, marble, outline, ROSE } from './art';

const { width: W, height: H } = A4_SIZE;
const PANEL = 700;
const PANEL_WIDTH = W - PANEL;

const SKILLS = [
  ['Market Analysis', 7],
  ['Negotiation', 6],
  ['Open House Events', 8],
  ['Client Relations', 7],
] as const;

const job = (heading: string, notes: readonly string[], y: number) => [
  circle(122, y + 15, 6, ROSE.navy),
  copy(heading, 140, y, 520, 22, ROSE.navy, { fontWeight: 700, letterSpacing: 0.5 }),
  copy(notes.join('\n\n'), 140, y + 42, 520, 20, ROSE.ink, { lineHeight: 1.45 }),
];

const centered = (content: string, y: number, size: number, fill: string, weight = 400) =>
  copy(content, PANEL, y, PANEL_WIDTH, size, fill, { fontWeight: weight, align: 'center' });

export const realtorResume = template(W, H, () => [
  rect(0, 0, W, H, ROSE.blush, { name: 'Background' }),
  marble(PANEL, 0, PANEL_WIDTH, H),
  rect(60, 60, 46, 46, ROSE.navy, { name: 'Corner block' }),
  rect(0, 1010, 22, 600, ROSE.navy, { name: 'Edge bar' }),
  copy('AMARA', 112, 120, 560, 92, ROSE.navy, { fontWeight: 300, lineHeight: 1.05 }),
  copy('QUINN', 112, 214, 560, 116, ROSE.navy, { fontWeight: 800, lineHeight: 1.05 }),
  copy('REAL ESTATE ADVISOR', 116, 368, 560, 28, ROSE.navy, { fontWeight: 700, letterSpacing: 2 }),
  copy(
    'I help families and first-time buyers find a place that truly feels like home. With a sharp read on local market trends, calm negotiation and genuine care for every client, I make each step of buying or selling clear, simple and even enjoyable.',
    116,
    430,
    540,
    22,
    ROSE.ink,
  ),
  icon('mail', 116, 728, 26, ROSE.navy, { strokeWidth: 2 }),
  copy('amara@quinnhomes.co', 152, 727, 270, 20, ROSE.navy),
  icon('phone', 436, 728, 26, ROSE.navy, { strokeWidth: 2 }),
  copy('+1 (555) 482 1170', 472, 727, 200, 20, ROSE.navy),
  rect(116, 790, 540, 2, 'rgba(19,32,58,0.45)', { name: 'Divider' }),
  copy('WORKING EXPERIENCE', 116, 830, 560, 34, ROSE.navy, { fontWeight: 700 }),
  job(
    'HARBORVIEW REALTY  |  2021 - NOW',
    [
      'Guided more than 60 households through smooth purchases and sales, regularly beating quarterly targets.',
      'Planned listing photography, video tours and social campaigns that shortened time on market.',
    ],
    900,
  ),
  job(
    'MAPLE & STONE HOMES  |  2017 - 2021',
    [
      'Supported senior agents with listings, viewings and open house events across the coast.',
      'Prepared market reports and pricing guides that helped clients make confident decisions.',
    ],
    1230,
  ),
  copy('References available on request', 116, 1620, 540, 20, ROSE.navy, {
    fontWeight: 500,
    italic: true,
  }),
  outline(830, 44, 370, 540, 3),
  outline(806, 70, 380, 540, 4),
  photo('woman-portrait-1', 762, 110, 400, 540, { cornerRadius: 18 }),
  centered('EDUCATION', 720, 34, ROSE.white, 700),
  centered('Bachelor of Property Studies', 784, 22, ROSE.blush, 600),
  centered('Westbrook University', 820, 22, ROSE.white, 700),
  centered('2013 - 2017', 856, 20, ROSE.white),
  rect(760, 920, 420, 3, ROSE.blush, { name: 'Panel divider' }),
  centered('SKILLS', 956, 34, ROSE.white, 700),
  SKILLS.map(([label, level], index) => {
    const y = 1030 + index * 92;
    return [
      copy(label, 770, y, 420, 22, ROSE.white),
      Array.from({ length: 8 }, (_, segment) =>
        rect(770 + segment * 51, y + 42, 43, 8, segment < level ? ROSE.blush : ROSE.soft, {
          cornerRadius: 4,
          name: 'Skill segment',
        }),
      ),
    ];
  }),
  rect(760, 1420, 420, 3, ROSE.blush, { name: 'Panel divider' }),
  centered('AWARDS', 1456, 34, ROSE.white, 700),
  centered('Top Listing Agent 2025\nClient Choice Award 2024', 1520, 21, ROSE.white),
]);
