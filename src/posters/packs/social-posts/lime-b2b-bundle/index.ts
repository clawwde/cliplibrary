import { linear } from '@/design';
import {
  card,
  circle,
  fitBox,
  group,
  icon,
  mosaicCover,
  numbered,
  page,
  rect,
  type SlideTheme,
  shadow,
  type Template,
  text,
} from '../../../kit';
import { definePack, LANDSCAPE } from '../../../pack';
import {
  dosDonts,
  HEAD,
  hiringPost,
  LIME,
  leadersStats,
  mythFact,
  PEACH,
  saleMegaphone,
} from './posts';
import { checkComments, eventsList, quizTime, reviewWords } from './posts-more';

const { width: W } = LANDSCAPE;
const INK = LIME.ink;

const POSTS = [
  mythFact(LIME),
  checkComments,
  leadersStats,
  eventsList,
  dosDonts(LIME),
  saleMegaphone,
  quizTime,
  hiringPost,
  reviewWords,
];

const THEME: SlideTheme = {
  background: linear(135, '#7b5cff', '#4f2fd8'),
  text: '#ffffff',
  muted: '#d4d4d8',
  surface: '#ffffff',
  ink: INK,
  brand: LIME.accent,
  accent: LIME.primary,
  headFont: HEAD,
  bodyFont: 'Inter',
};

const CATEGORIES = [
  ['Client Reviews', 'Key Numbers'],
  ['Dates & Events', 'Year-End Promos'],
  ['Quick Quizzes', 'Hiring Posts'],
  ['Sales Data', 'Tips & Education'],
  ['Comment Boosters', 'Before & After'],
] as const;

const whatYouGet = () =>
  page(
    INK,
    text('WHAT YOU GET', 0, 80, W, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 500,
      fill: '#ffffff',
      align: 'center',
      letterSpacing: 6,
    }),
    text('50 Posts', 230, 180, 480, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: '#ffffff',
      align: 'center',
    }),
    circle(800, 238, 52, '#ffffff'),
    icon('plus', 770, 208, 60, INK, { strokeWidth: 3 }),
    text('50 Stories', 890, 180, 480, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: '#ffffff',
      align: 'center',
    }),
    rect(230, 312, 480, 4, '#ffffff', { dashed: true, name: 'Underline' }),
    rect(890, 312, 480, 4, '#ffffff', { dashed: true, name: 'Underline' }),
    CATEGORIES.map((row, rowIndex) =>
      row.map((label, column) => {
        const x = 370 + column * 460;
        const y = 390 + rowIndex * 150;
        return group(
          rect(x, y, 400, 110, linear(120, LIME.primary, '#7fe0b0'), {
            cornerRadius: 16,
            name: `${label} tag`,
          }),
          text(label, x, y + 32, 400, {
            fontFamily: HEAD,
            fontSize: 40,
            fontWeight: 800,
            fill: INK,
            align: 'center',
          }),
        );
      }),
    ),
  );

const arrowBubble = (cx: number, cy: number) => [
  circle(cx, cy, 52, '#ffffff'),
  icon('arrow-right', cx - 30, cy - 30, 60, LIME.accent, { strokeWidth: 3 }),
];

const framed = (item: Template, x: number, y: number) => [
  rect(x - 3, y - 3, 406, 506, 'rgba(0,0,0,0)', {
    stroke: 'rgba(255,255,255,0.35)',
    strokeWidth: 3,
    name: 'Frame',
  }),
  fitBox(item, x, y, 400, 500),
];

const editable = () =>
  page(
    INK,
    text('Editable\nB2B Posts,\nNo Extra\nSoftware', 80, 110, 540, {
      fontFamily: HEAD,
      fontSize: 92,
      fontWeight: 900,
      fill: '#ffffff',
      lineHeight: 1.08,
    }),
    rect(80, 560, 470, 4, '#ffffff', { dashed: true, name: 'Divider' }),
    text('Customize in\nminutes', 80, 610, 480, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 700,
      fill: '#ffffff',
      lineHeight: 1.15,
    }),
    text('100% editable', 80, 760, 480, {
      fontFamily: HEAD,
      fontSize: 52,
      fontWeight: 800,
      fill: LIME.primary,
    }),
    framed(mythFact(LIME), 640, 70),
    arrowBubble(1110, 320),
    framed(mythFact(PEACH), 1180, 70),
    framed(dosDonts(LIME), 640, 630),
    arrowBubble(1110, 880),
    framed(dosDonts(PEACH), 1180, 630),
  );

const howItWorks = () =>
  page(
    INK,
    text('How it works?', 120, 70, 1200, {
      fontFamily: HEAD,
      fontSize: 96,
      fontWeight: 900,
      fill: '#ffffff',
    }),
    card(120, 240, 1360, 860, { radius: 36 }),
    numbered(
      [
        'Instant download right after checkout',
        'Edit text, colours and branding in the built-in editor',
        'Export and post on every social channel',
      ],
      200,
      340,
      1200,
      { fontSize: 46, numberColor: LIME.accent, gap: 130, fontFamily: HEAD, color: INK },
    ),
    text('No design skills needed: everything runs in your browser.', 200, 740, 1200, {
      fontSize: 32,
      fontWeight: 500,
      fill: '#4b5563',
    }),
    text('Perfect for:', 200, 880, 400, {
      fontFamily: HEAD,
      fontSize: 50,
      fontWeight: 900,
      fill: INK,
    }),
    (['globe', 'briefcase', 'camera'] as const).map((name, index) => [
      circle(560 + index * 120, 912, 46, LIME.accent),
      icon(name, 534 + index * 120, 886, 52, '#ffffff'),
    ]),
  );

const brand = () =>
  page(
    INK,
    group(
      rect(140, 380, 600, 440, linear(135, LIME.primary, '#7fe0b0'), {
        cornerRadius: 40,
        ...shadow(50, 20, 'rgba(198,241,53,0.3)'),
      }),
      icon('folder', 200, 450, 150, INK, { strokeWidth: 1.6 }),
      text('Brand Kit', 390, 480, 320, {
        fontFamily: HEAD,
        fontSize: 52,
        fontWeight: 800,
        fill: INK,
      }),
      text('24.6 MB', 390, 548, 300, { fontSize: 30, fontWeight: 500, fill: '#1f2a0a' }),
      rect(200, 690, 440, 50, 'rgba(14,14,18,0.2)', { cornerRadius: 25, name: 'Progress track' }),
      rect(200, 690, 360, 50, INK, { cornerRadius: 25, name: 'Progress' }),
      icon('circle-check', 590, 680, 70, INK),
    ),
    text('This is', 820, 360, 700, {
      fontFamily: HEAD,
      fontSize: 84,
      fontWeight: 900,
      fill: '#ffffff',
    }),
    text('Kestrel', 820, 460, 700, {
      fontFamily: HEAD,
      fontSize: 100,
      fontWeight: 900,
      fill: '#ffffff',
    }),
    text('Studio', 820, 570, 700, {
      fontFamily: HEAD,
      fontSize: 100,
      fontWeight: 900,
      fill: LIME.primary,
    }),
    text('More than a template', 820, 700, 760, {
      fontFamily: HEAD,
      fontSize: 56,
      fontWeight: 800,
      fill: '#ffffff',
    }),
  );

export const limeB2bBundlePack = definePack({
  id: 'lime-b2b-bundle',
  title: 'Lime B2B Bundle',
  description:
    'Myth busters, events, quizzes, reviews and sale posts for B2B brands in black, lime and violet.',
  category: 'social-posts',
  tags: ['b2b', 'instagram', 'linkedin', 'story', 'quiz'],
  theme: 'dark',
  ...LANDSCAPE,
  pages: [
    mosaicCover(LANDSCAPE, THEME, POSTS, [], { columns: 8 }),
    whatYouGet,
    editable,
    howItWorks,
    brand,
  ],
});
